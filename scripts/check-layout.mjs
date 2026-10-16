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
      await page.waitForTimeout(400);
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

await browser.close();
server.close();

if (failures.length > 0) {
  console.error(`\n[check:layout] 실패 ${failures.length}건`);
  process.exit(1);
}
console.log(`\n[check:layout] 통과 — 프로젝트 ${projects.length}개, 스크린샷: ${path.relative(root, shotDir)}/`);
