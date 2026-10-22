// 레이아웃 검사: 빌드 결과(out/)를 로컬에서 띄우고, 설치된 Edge(없으면 Chrome)로 모든 프로젝트 페이지를 확인한다.
//  1) 375 / 768 / 1024 / 1263(1280 - 스크롤바) / 1280 에서 가로 넘침이 없는지 (펼쳐 보기를 모두 연 상태 포함)
//  2) 목차를 클릭하면 해당 섹션 제목이 고정 헤더 아래에 보이고, 목차의 현재 항목이 바뀌는지
//  3) 1280 첫 화면에 프로젝트명·한 줄 설명·담당·주요 기여가 보이는지
//  4) 키보드(Tab/Enter)로 다이어그램 노드를 선택할 수 있는지
//  5) 흐름 칩: 기본 상태에 흐름 요약이 보이고, 각 흐름을 고르면 콘텐츠의 단계 수만큼 단계가 나오는지
//  6) 노드의 "주요 개발 내용에서 자세히 보기" 링크가 대상 개발 단위로 이동하는지
// 기대값(흐름·단계 수)은 콘텐츠 파일에서 읽는다. 스크린샷은 screenshots/ 에 저장한다 (git 제외).
import { createReadStream, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');
const shotDir = path.join(root, 'screenshots');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

if (!existsSync(outDir)) {
  console.error('[check:layout] out/ 이 없습니다. 먼저 npm run build 를 실행하세요.');
  process.exit(1);
}
mkdirSync(shotDir, { recursive: true });

// 콘텐츠에서 페이지 목록과 흐름 기대값을 읽는다 (Node 타입 제거 실행 필요: package.json 의 check:layout 참고)
const projectsDir = path.join(root, 'content', 'projects');
const projects = [];
for (const file of readdirSync(projectsDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const mod = await import(pathToFileURL(path.join(projectsDir, file)).href);
  projects.push(mod.project);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const candidates = [url, `${url}.html`, path.join(url, 'index.html')].map((p) => path.join(outDir, p));
  const file = candidates.find((p) => p.startsWith(outDir) && existsSync(p) && statSync(p).isFile());
  if (!file) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

let browser;
for (const channel of ['msedge', 'chrome']) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {
    // 다음 브라우저 시도
  }
}
if (!browser) {
  console.error('[check:layout] Edge/Chrome 을 찾지 못했습니다.');
  process.exit(1);
}

const failures = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
  failures.push(msg);
  console.error(`  ✗ ${msg}`);
};

async function openPage(url, width, height = 800) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' }); // 스크롤 애니메이션 없이 즉시 이동
  await page.goto(base + url, { waitUntil: 'networkidle' });
  return page;
}

async function overflow(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > vw + 1 && !el.closest('[data-allow-overflow]'))
      .slice(0, 3)
      .map((el) => `${el.tagName.toLowerCase()} ${(el.textContent || '').trim().slice(0, 20)}`);
    return { scrollW: document.documentElement.scrollWidth, clientW: vw, offenders };
  });
}

for (const project of projects) {
  const URL_ = `/projects/${project.slug}`;
  const tag = project.slug;
  console.log(`\n[${tag}]`);

  // 1) 가로 넘침 + 스크린샷, 펼쳐 보기 전체 열림 상태
  for (const width of [375, 768, 1024, 1263, 1280]) {
    const page = await openPage(URL_, width, width < 768 ? 812 : 800);
    let r = await overflow(page);
    if (r.scrollW <= r.clientW) ok(`${width}px 가로 넘침 없음`);
    else fail(`${tag} ${width}px 가로 넘침 (${r.scrollW} > ${r.clientW}) ${r.offenders.join(', ')}`);
    await page.screenshot({ path: path.join(shotDir, `${tag}-first-${width}.png`) });
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    r = await overflow(page);
    if (r.scrollW <= r.clientW && r.offenders.length === 0) ok(`${width}px 펼쳐 보기 전체 열림 상태 넘침 없음`);
    else fail(`${tag} ${width}px 펼쳐 보기 열림 상태 넘침: ${r.offenders.join(' | ')}`);
    await page.screenshot({ path: path.join(shotDir, `${tag}-full-${width}.png`), fullPage: true });
    await page.close();
  }

  // 2) 목차 클릭 → 제목이 헤더에 가리지 않는지, 현재 항목 표시
  for (const width of [1280, 375]) {
    const page = await openPage(URL_, width, width < 768 ? 812 : 800);
    const nav = width >= 1024 ? 'nav[data-toc="side"]' : 'nav[data-toc="bar"]';
    const links = await page.locator(`${nav} a`).all();
    if (links.length !== 7) fail(`${tag} ${width}px 목차 항목 수 ${links.length} (7이어야 함)`);
    let passed = 0;
    for (const link of links) {
      const id = (await link.getAttribute('href')).slice(1);
      await link.click();
      await page.waitForTimeout(1500); // 클릭 직후 고정 시간이 끝난 뒤의 상태를 본다
      const r = await page.evaluate((sid) => {
        const h = document.getElementById(`${sid}-title`).getBoundingClientRect();
        const stickyBottom = Math.max(...[...document.querySelectorAll('[data-sticky]')].map((el) => el.getBoundingClientRect().bottom));
        return { top: h.top, stickyBottom, vh: window.innerHeight };
      }, id);
      const current = await page.locator(`${nav} a[aria-current="true"]`).getAttribute('href');
      if (r.top >= r.stickyBottom - 1 && r.top < r.vh / 2 && current === `#${id}`) passed += 1;
      else fail(`${tag} ${width}px #${id}: 제목 top ${Math.round(r.top)}, 헤더 ${Math.round(r.stickyBottom)}, 현재 항목 ${current}`);
    }
    if (passed === links.length) ok(`${width}px 목차 ${passed}개 이동·현재 항목 표시 정상`);
    await page.close();
  }

  // 2-1) 실제 브라우저처럼 부드러운 스크롤을 켠 상태에서 마지막 항목(회고) 클릭
  for (const width of [1280, 375]) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 812 : 800 } });
    await page.goto(base + URL_, { waitUntil: 'networkidle' });
    const nav = width >= 1024 ? 'nav[data-toc="side"]' : 'nav[data-toc="bar"]';
    await page.locator(`${nav} a[href="#retrospective"]`).click();
    await page.waitForTimeout(3000);
    const current = await page.locator(`${nav} a[aria-current="true"]`).getAttribute('href');
    if (current === '#retrospective') ok(`${width}px 부드러운 스크롤로 회고 클릭 시 회고가 현재 항목`);
    else fail(`${tag} ${width}px 부드러운 스크롤로 회고 클릭 후 현재 항목 ${current} (#retrospective 여야 함)`);
    await page.close();
  }

  // 2-2) 휠 없이(스크롤바 드래그처럼) 페이지 맨 아래까지 스크롤하면 마지막 섹션(회고)이 현재 항목이 되는지
  for (const width of [1280, 375]) {
    const page = await openPage(URL_, width, width < 768 ? 812 : 800);
    const nav = width >= 1024 ? 'nav[data-toc="side"]' : 'nav[data-toc="bar"]';
    // 중간 섹션을 클릭해 둔 뒤 맨 아래로 이동 (클릭 고정이 풀리는지까지 함께 본다)
    await page.locator(`${nav} a[href="#development"]`).click();
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(800);
    const current = await page.locator(`${nav} a[aria-current="true"]`).getAttribute('href');
    if (current === '#retrospective') ok(`${width}px 맨 아래 스크롤 시 회고가 현재 항목`);
    else fail(`${tag} ${width}px 맨 아래 스크롤 시 현재 항목 ${current} (#retrospective 여야 함)`);
    await page.close();
  }

  // 3) 1280 첫 화면 핵심 정보, 4) 키보드로 노드 선택
  {
    const page = await openPage(URL_, 1280, 800);
    const missing = [];
    for (const sel of ['title', 'summary', 'role', 'highlights']) {
      const box = await page.locator(`[data-hero="${sel}"]`).boundingBox();
      if (!box || box.y + box.height > 800) missing.push(sel);
    }
    if (missing.length === 0) ok('1280 첫 화면에 프로젝트명·설명·담당·주요 기여 보임');
    else fail(`${tag} 1280 첫 화면에 안 보임: ${missing.join(', ')}`);
    const first = page.locator('[data-node]').first();
    await first.focus();
    await page.keyboard.press('Enter');
    const name = await first.getAttribute('data-node-name');
    const panel = await page.locator('[data-node-panel]').innerText();
    if ((await first.getAttribute('aria-pressed')) === 'true' && panel.includes(name)) ok(`키보드 Enter로 노드 "${name}" 선택`);
    else fail(`${tag} 키보드 노드 선택 실패`);
    await page.close();
  }

  // 5) 흐름 칩
  const flows = project.architecture.flows;
  for (const width of [1280, 375]) {
    const page = await openPage(URL_, width, width < 768 ? 812 : 800);
    const overview = await page.locator('[data-node-panel] li').count();
    if (overview === flows.length) ok(`${width}px 기본 상태에 흐름 요약 ${overview}개`);
    else fail(`${tag} ${width}px 기본 상태 흐름 요약 ${overview}개 (${flows.length}이어야 함)`);
    for (const flow of flows) {
      await page.locator(`[data-flow="${flow.id}"]`).click();
      const steps = await page.locator('[data-node-panel] ol > li').count();
      const uniqueNodes = new Set(flow.steps.map((s) => s.node)).size;
      const numbered = width >= 768 ? await page.locator('[data-node] > span[aria-hidden]').count() : uniqueNodes;
      if (steps === flow.steps.length && numbered === uniqueNodes) ok(`${width}px "${flow.title}" 단계 ${steps}개${width >= 768 ? `, 노드 번호 ${numbered}개` : ''}`);
      else fail(`${tag} ${width}px "${flow.title}" 단계 ${steps}/${flow.steps.length}, 번호 ${numbered}/${uniqueNodes}`);
    }
    await page.close();
  }

  // 6) 노드 → 주요 개발 내용 링크
  {
    const page = await openPage(URL_, 1280, 800);
    const names = await page.locator('[data-node]').evaluateAll((els) => els.map((e) => e.getAttribute('data-node-name')));
    let linked = 0;
    for (const name of names) {
      await page.locator('[data-flow="all"]').click();
      await page.locator(`[data-node-name="${name}"]`).click();
      const link = page.locator('[data-node-panel] a[href^="#dev-"]');
      if ((await link.count()) === 0) continue; // 외부·사람 노드 등 링크 없는 노드
      const href = await link.getAttribute('href');
      await link.click();
      await page.waitForTimeout(300);
      const r = await page.evaluate((h) => {
        const el = document.querySelector(h);
        return el ? { top: Math.round(el.getBoundingClientRect().top), title: el.querySelector('h3, h4')?.textContent?.trim() ?? '' } : null;
      }, href);
      if (r && r.top >= 55 && r.top < 400) {
        linked += 1;
        console.log(`    · ${name} → ${href} (${r.title})`);
      } else fail(`${tag} 노드 "${name}" → ${href} 이동 실패 ${JSON.stringify(r)}`);
      await page.evaluate(() => document.getElementById('architecture').scrollIntoView());
    }
    ok(`노드 링크 ${linked}개 이동 정상`);
    await page.close();
  }
}

// 7) 홈 목록 아래쪽에서 프로젝트를 열면 상세 페이지가 맨 위에서 바로 시작하는지
//    (부드러운 스크롤이 켜진 실제 브라우저 조건: 페이지 이동 때 맨 아래에서 위로 굴러 올라가면 안 된다)
console.log('\n[home → 상세 이동]');
for (const width of [1280, 375]) {
  for (const project of projects) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 812 : 800 } });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const link = page.locator(`a[href="/projects/${project.slug}"]`).first();
    await link.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await link.click();
    await page.waitForURL(`**/projects/${project.slug}`);
    await page.waitForTimeout(120); // 이동 직후. 스크롤 애니메이션 중이면 여기서 0이 아니다
    const y = await page.evaluate(() => window.scrollY);
    if (y === 0) ok(`${width}px ${project.slug} 상세 진입 시 맨 위에서 시작`);
    else fail(`${project.slug} ${width}px 상세 진입 120ms 뒤 scrollY ${Math.round(y)} (0이어야 함)`);
    await page.close();
  }
}

// 8) 소개(/about): 기술 카드·명함 뒤집기, 키보드·터치·움직임 줄이기·인쇄
console.log('\n[about]');
{
  const ABOUT = '/about';
  const ctxPage = async (width, opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 812 : 900 }, ...opts });
    const page = await ctx.newPage();
    await page.goto(base + ABOUT, { waitUntil: 'networkidle' });
    return { page, ctx };
  };

  // 명함은 비스듬히 놓여 있어 외곽 상자 모서리는 카드 밖이다. 버튼이 없는 가운데 왼쪽을 누른다
  const cardPoint = async (page) => {
    const b = await page.locator('[data-card]').boundingBox();
    return { x: b.width * 0.35, y: b.height * 0.45 };
  };

  // 헤더 소개 메뉴로 이동
  {
    const page = await openPage('/', 1280, 800);
    await page.locator('header a[href="/about"]').click();
    await page.waitForURL('**/about');
    ok('헤더 소개 메뉴로 이동');
    await page.close();
  }

  // 화면 폭별: 가로 넘침, 44px 조작 지점, 바로가기, 프로젝트 카드 제목 가림
  for (const width of [375, 768, 1440]) {
    const { page, ctx } = await ctxPage(width, { reducedMotion: 'reduce' });
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const small = [...document.querySelectorAll('[data-target]')]
        .filter((el) => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height < 44)
        .map((el) => el.textContent?.trim().slice(0, 12));
      return { overflow: document.documentElement.scrollWidth - vw, small, github: !!document.querySelector('a[href*="github.com"]'), email: !!document.querySelector('[data-copy-email]'), projects: !!document.querySelector('a[href="/"]') };
    });
    if (r.overflow <= 0 && r.small.length === 0 && !r.github && r.email && r.projects)
      ok(`${width}px 넘침 없음, 조작 지점 44px 이상, 프로젝트·이메일 바로 보임, GitHub 링크 없음`);
    else fail(`about ${width}px ${JSON.stringify(r)}`);
    await page.screenshot({ path: path.join(shotDir, `about-${width}.png`), fullPage: true });
    await ctx.close();
  }

  // 기술 카드: hover 떠오름, 포인터 반응, 클릭 설명, Esc
  {
    const { page, ctx } = await ctxPage(1440);
    const card = page.locator('[data-tech="react"]');
    await card.hover();
    await page.waitForTimeout(300);
    const hoverTf = await card.evaluate((el) => el.style.transform);
    const orbit = page.locator('[data-orbit]');
    const box = await orbit.boundingBox();
    await page.mouse.move(box.x + box.width * 0.95, box.y + box.height * 0.9);
    await page.waitForTimeout(400);
    const px = await orbit.evaluate((el) => el.style.getPropertyValue('--px'));
    await page.locator('[data-tech="typescript"]').click();
    const note = await page.locator('#orbit-note').innerText();
    await page.keyboard.press('Escape');
    const cleared = await page.locator('#orbit-note').innerText();
    if (hoverTf.includes('translateY(-6px)') && Number(px) > 0.3 && note.includes('TypeScript') && note.includes('데이터 구조') && !cleared.includes('데이터 구조'))
      ok(`기술 카드 hover 떠오름, 포인터 반응(--px ${px}), 클릭 설명, Esc 해제`);
    else fail(`about 기술 카드 ${JSON.stringify({ hoverTf, px, note, cleared })}`);
    await ctx.close();
  }

  // 명함: hover 로는 안 뒤집힘, 클릭 → 뒷면, 다시 클릭 → 앞면, 숨은 면 inert
  {
    const { page, ctx } = await ctxPage(1440);
    await page.locator('#about-contact').scrollIntoViewIfNeeded();
    const side = () => page.locator('[data-card]').getAttribute('data-side');
    await page.locator('[data-card]').hover({ position: await cardPoint(page) });
    await page.waitForTimeout(300);
    const afterHover = await side();
    await page.locator('[data-card]').click({ position: await cardPoint(page) });
    const a = await side();
    const frontInert = await page.locator('section[aria-label="명함 앞면"]').evaluate((el) => el.inert);
    const tf = await page.locator('[data-card]').evaluate((el) => el.style.transform);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(shotDir, 'about-card-back.png') });
    await page.locator('[data-card]').click({ position: await cardPoint(page) });
    const b = await side();
    if (afterHover === 'front' && a === 'back' && frontInert && tf.includes('180deg') && b === 'front')
      ok('명함: hover 로는 안 뒤집힘, 클릭→뒷면(Y축 180°), 다시 클릭→앞면, 숨은 면 inert');
    else fail(`about 명함 ${JSON.stringify({ afterHover, a, frontInert, tf, b })}`);
    await ctx.close();
  }

  // 명함 버튼 마우스 클릭: 기운 카드 안 버튼이 hover 중 흔들리지 않고, 눌렀다 뗀 곳이 버튼이어야 뒤집힌다
  {
    const { page, ctx } = await ctxPage(1440);
    await page.locator('#about-contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const btn = page.locator('[data-flip-button]').first();
    const b0 = await btn.boundingBox();
    const cx = b0.x + b0.width / 2;
    const cy = b0.y + b0.height / 2;
    await page.mouse.move(cx - 60, cy - 40);
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(500);
    const targets = [];
    await page.exposeFunction('__flipLog', (t) => targets.push(t));
    await page.evaluate(() => {
      for (const t of ['pointerdown', 'pointerup'])
        document.addEventListener(t, (e) => window.__flipLog(`${t}:${e.target.closest('[data-flip-button]') ? 'btn' : 'other'}`), true);
    });
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(900);
    const side = await page.locator('[data-card]').getAttribute('data-side');
    if (targets.join(',') === 'pointerdown:btn,pointerup:btn' && side === 'back') ok('명함 버튼 마우스 클릭: 누른 곳·뗀 곳 모두 버튼, 뒷면으로 뒤집힘');
    else fail(`about 명함 버튼 클릭 ${JSON.stringify({ targets, side })}`);
    await ctx.close();
  }

  // 키보드: 기술 카드 Enter, 명함 › 버튼 Enter
  {
    const { page, ctx } = await ctxPage(1440);
    let tech = null;
    for (let i = 0; i < 25 && !tech; i++) {
      await page.keyboard.press('Tab');
      tech = await page.evaluate(() => document.activeElement?.getAttribute('data-tech'));
    }
    await page.keyboard.press('Enter');
    const pressed = tech && (await page.locator(`[data-tech="${tech}"]`).getAttribute('aria-pressed'));
    let flipBtn = false;
    for (let i = 0; i < 40 && !flipBtn; i++) {
      await page.keyboard.press('Tab');
      flipBtn = await page.evaluate(() => document.activeElement?.hasAttribute('data-flip-button') ?? false);
    }
    await page.keyboard.press('Enter');
    const s = await page.locator('[data-card]').getAttribute('data-side');
    if (tech && pressed === 'true' && flipBtn && s === 'back') ok(`키보드: "${tech}" 카드 Enter, 명함 › 버튼 Enter 로 뒤집기`);
    else fail(`about 키보드 ${JSON.stringify({ tech, pressed, flipBtn, s })}`);
    await ctx.close();
  }

  // 터치
  {
    const { page, ctx } = await ctxPage(375, { hasTouch: true, isMobile: true });
    await page.locator('[data-tech="java"]').tap();
    const note = await page.locator('#orbit-note').innerText();
    await page.locator('#about-contact').scrollIntoViewIfNeeded();
    await page.locator('[data-card]').tap({ position: await cardPoint(page) });
    const s = await page.locator('[data-card]').getAttribute('data-side');
    if (note.includes('Java') && note.includes('서버 처리 로직') && s === 'back') ok('375px 터치: 기술 설명 표시, 명함 탭으로 뒤집힘');
    else fail(`about 터치 ${JSON.stringify({ note, s })}`);
    await ctx.close();
  }

  // 움직임 줄이기
  {
    const { page, ctx } = await ctxPage(1440, { reducedMotion: 'reduce' });
    await page.locator('[data-tech="react"]').hover();
    const tf = await page.locator('[data-tech="react"]').evaluate((el) => el.style.transform);
    await page.locator('[data-flip-button]').first().click();
    const card = await page.locator('[data-card]').evaluate((el) => ({ tf: el.style.transform, side: el.getAttribute('data-side') }));
    if (!tf.includes('translateY') && card.tf === 'none' && card.side === 'back')
      ok('움직임 줄이기: 떠오름·기울기·회전 없이 바로 바뀜');
    else fail(`about reduced motion ${JSON.stringify({ tf, card })}`);
    await ctx.close();
  }

  // 인쇄: 인터랙티브 요소 숨김, 명함 뒷면 내용까지 평면으로 출력
  {
    const { page, ctx } = await ctxPage(1440);
    await page.emulateMedia({ media: 'print' });
    const r = await page.evaluate(() => ({
      flat: (document.querySelector('[data-print-profile]')?.getBoundingClientRect().height ?? 0) > 0,
      orbit: (document.querySelector('[data-orbit]')?.getBoundingClientRect().height ?? 0) > 0,
      text: document.body.innerText,
    }));
    const must = ['aubepluieh3@naver.com', '현업 담당자와 직접', '2023.01', 'TypeScript'];
    const missing = must.filter((m) => !r.text.includes(m));
    if (r.flat && !r.orbit && missing.length === 0) ok('인쇄: 궤도·명함 숨김, 평면 소개(명함 뒷면 내용 포함) 출력');
    else fail(`about 인쇄 ${JSON.stringify({ flat: r.flat, orbit: r.orbit, missing })}`);
    await page.pdf({ path: path.join(shotDir, 'about-print.pdf'), format: 'A4' }).catch(() => {});
    await ctx.close();
  }
}

await browser.close();
server.close();

if (failures.length > 0) {
  console.error(`\n[check:layout] 실패 ${failures.length}건`);
  process.exit(1);
}
console.log(`\n[check:layout] 통과 — 프로젝트 ${projects.length}개, 스크린샷: ${path.relative(root, shotDir)}/`);
