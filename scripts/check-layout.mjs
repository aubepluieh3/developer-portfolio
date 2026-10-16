// 레이아웃 검사: 빌드 결과(out/)를 로컬에서 띄우고, 설치된 Edge(없으면 Chrome)로 확인한다.
//  1) 375 / 768 / 1024 / 1263(1280 - 스크롤바) / 1280 에서 가로 넘침이 없는지
//  2) 목차를 클릭하면 해당 섹션 제목이 고정 헤더 아래에 보이고, 목차의 현재 항목이 바뀌는지
//  3) 1280 첫 화면에 프로젝트명·한 줄 설명·담당·주요 기여가 보이는지
//  4) 키보드(Tab/Enter)로 다이어그램 노드를 선택할 수 있는지
// 스크린샷은 screenshots/ 에 저장한다 (git 제외).
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');
const shotDir = path.join(root, 'screenshots');
const PAGE = '/projects/prepaid-enterprise-plan';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

if (!existsSync(outDir)) {
  console.error('[check:layout] out/ 이 없습니다. 먼저 npm run build 를 실행하세요.');
  process.exit(1);
}
mkdirSync(shotDir, { recursive: true });

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

async function openPage(width, height = 800) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' }); // 스크롤 애니메이션 없이 즉시 이동
  await page.goto(base + PAGE, { waitUntil: 'networkidle' });
  return page;
}

// 1) 가로 넘침 + 스크린샷
for (const width of [375, 768, 1024, 1263, 1280]) {
  const page = await openPage(width, width < 768 ? 812 : 800);
  const { scrollW, clientW, offenders } = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > vw + 1 && !el.closest('[data-allow-overflow]'))
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
    return { scrollW: document.documentElement.scrollWidth, clientW: vw, offenders };
  });
  if (scrollW <= clientW) ok(`${width}px 가로 넘침 없음 (scrollWidth ${scrollW} ≤ ${clientW})`);
  else fail(`${width}px 가로 넘침 (scrollWidth ${scrollW} > ${clientW}) ${offenders.join(', ')}`);
  await page.screenshot({ path: path.join(shotDir, `first-${width}.png`) });
  await page.screenshot({ path: path.join(shotDir, `full-${width}.png`), fullPage: true });
  await page.close();
}

// 1-2) 펼쳐 보기를 모두 연 상태에서도 가로 넘침이 없는지 (긴 코드 블록이 본문 폭을 밀어내는지)
for (const width of [375, 768, 1280]) {
  const page = await openPage(width, 812);
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
  const { scrollW, clientW, offenders } = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('main *')]
      .filter((el) => el.getBoundingClientRect().right > vw + 1 && !el.closest('[data-allow-overflow]'))
      .slice(0, 3)
      .map((el) => el.tagName.toLowerCase() + ' ' + (el.textContent || '').trim().slice(0, 20));
    return { scrollW: document.documentElement.scrollWidth, clientW: vw, offenders };
  });
  if (scrollW <= clientW && offenders.length === 0) ok(`${width}px 펼쳐 보기 전체 열림 상태에서 넘침 없음`);
  else fail(`${width}px 펼쳐 보기 열림 상태 넘침 (scrollWidth ${scrollW} / ${clientW}): ${offenders.join(' | ')}`);
  await page.close();
}

// 2) 목차 클릭 → 제목이 헤더에 가리지 않는지, 현재 항목 표시
for (const width of [1280, 375]) {
  const page = await openPage(width, width < 768 ? 812 : 800);
  const nav = width >= 1024 ? 'nav[data-toc="side"]' : 'nav[data-toc="bar"]';
  const links = await page.locator(`${nav} a`).all();
  if (links.length !== 7) fail(`${width}px 목차 항목 수 ${links.length} (7이어야 함)`);
  for (const link of links) {
    const id = (await link.getAttribute('href')).slice(1);
    await link.click();
    await page.waitForTimeout(400);
    const r = await page.evaluate((sid) => {
      const h = document.getElementById(`${sid}-title`).getBoundingClientRect();
      const stickyBottom = Math.max(
        ...[...document.querySelectorAll('[data-sticky]')].map((el) => el.getBoundingClientRect().bottom),
      );
      return { top: h.top, stickyBottom, vh: window.innerHeight };
    }, id);
    const current = await page.locator(`${nav} a[aria-current="true"]`).getAttribute('href');
    const visible = r.top >= r.stickyBottom - 1 && r.top < r.vh / 2;
    if (visible && current === `#${id}`) ok(`${width}px #${id}: 제목 top ${Math.round(r.top)} ≥ 헤더 ${Math.round(r.stickyBottom)}, 현재 항목 표시`);
    else fail(`${width}px #${id}: 제목 top ${Math.round(r.top)}, 헤더 ${Math.round(r.stickyBottom)}, 현재 항목 ${current}`);
  }
  await page.close();
}

// 3) 1280 첫 화면 핵심 정보
{
  const page = await openPage(1280, 800);
  for (const sel of ['[data-hero="title"]', '[data-hero="summary"]', '[data-hero="role"]', '[data-hero="highlights"]']) {
    const box = await page.locator(sel).boundingBox();
    if (box && box.y + box.height <= 800) ok(`1280 첫 화면에 ${sel} 보임`);
    else fail(`1280 첫 화면에 ${sel} 안 보임`);
  }
  // 4) 키보드로 노드 선택
  const first = page.locator('[data-node]').first();
  await first.focus();
  await page.keyboard.press('Enter');
  const pressed = await first.getAttribute('aria-pressed');
  const panel = await page.locator('[data-node-panel]').innerText();
  const name = await first.getAttribute('data-node-name');
  if (pressed === 'true' && panel.includes(name)) ok(`키보드 Enter로 노드 "${name}" 선택, 상세 패널 표시`);
  else fail(`키보드 노드 선택 실패 (aria-pressed=${pressed})`);
  await page.close();
}

// 5) 시나리오 선택: 기본 상태에 흐름 요약 4개, 선택하면 단계 흐름과 노드 번호 표시 (데스크톱·모바일)
for (const width of [1280, 375]) {
  const page = await openPage(width, width < 768 ? 812 : 800);
  const overview = await page.locator('[data-node-panel] li').count();
  if (overview === 4) ok(`${width}px 기본 상태에 흐름 요약 4개`);
  else fail(`${width}px 기본 상태 흐름 요약 ${overview}개 (4여야 함)`);
  await page.locator('[data-flow="topup"]').click();
  const steps = await page.locator('[data-node-panel] ol > li').count();
  const numbered = width >= 768 ? await page.locator('[data-node] > span[aria-hidden]').count() : steps;
  // 데스크톱은 같은 노드(운영 서버)가 두 번 나와 번호 배지가 5개, 모바일은 다이어그램이 없어 단계 수로 센다
  if (steps === 6 && numbered === (width >= 768 ? 5 : 6)) ok(`${width}px "충전" 선택 → 단계 ${steps}개${width >= 768 ? `, 다이어그램 번호 ${numbered}개` : ''}`);
  else fail(`${width}px "충전" 선택 → 단계 ${steps}개, 번호 ${numbered}개 (단계 6, 번호 5여야 함)`);
  await page.close();
}

await browser.close();
server.close();

if (failures.length > 0) {
  console.error(`\n[check:layout] 실패 ${failures.length}건`);
  process.exit(1);
}
console.log(`\n[check:layout] 통과 — 스크린샷: ${path.relative(root, shotDir)}/`);
