// 공개 배포 전 검사 2: 빌드 결과(out/)에 회사·내부 식별자가 있으면 실패한다.
// 금지어 목록은 목록 자체가 비공개 정보라서 저장소 밖에 둔다.
//   기본 위치: ../portfolio-private/denylist.txt  (PRIVATE_DENYLIST 환경 변수로 변경 가능)
//   형식: 한 줄에 하나. '#' 주석, 're:' 로 시작하면 정규식, 그 외는 대소문자 무시 부분 일치.
// 저장소에 커밋된 파일도 같은 목록으로 검사하되, 이쪽은 경고만 한다 (레포는 비공개 상태).
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listPath = process.env.PRIVATE_DENYLIST ?? path.resolve(root, '..', 'portfolio-private', 'denylist.txt');
const outDir = path.join(root, 'out');
const TEXT_EXT = new Set(['.html', '.txt', '.js', '.css', '.json', '.xml', '.svg', '.map', '.md', '.ts', '.tsx', '.mjs']);

if (!existsSync(listPath)) {
  console.error(`[check:private] 금지어 목록이 없습니다: ${listPath}\n검사 없이 배포되는 경로를 막기 위해 실패 처리합니다.`);
  process.exit(1);
}
if (!existsSync(outDir)) {
  console.error('[check:private] out/ 이 없습니다. 먼저 next build 를 실행하세요.');
  process.exit(1);
}

const rules = readFileSync(listPath, 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) =>
    l.startsWith('re:')
      ? { label: l, re: new RegExp(l.slice(3), 'giu') }
      : { label: l, re: new RegExp(l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'giu') },
  );

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function scan(files) {
  const found = [];
  for (const file of files) {
    if (!TEXT_EXT.has(path.extname(file))) continue;
    const text = readFileSync(file, 'utf8');
    for (const { label, re } of rules) {
      re.lastIndex = 0;
      const count = text.match(re)?.length ?? 0;
      if (count > 0) found.push({ file: path.relative(root, file), label, count });
    }
  }
  return found;
}

const outHits = scan(walk(outDir));

let tracked = [];
try {
  tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map((f) => path.join(root, f));
} catch {
  // git 이 없으면 저장소 검사는 건너뛴다
}
const repoHits = scan(tracked);

for (const h of repoHits) console.warn(`  ! (저장소) ${h.file}: "${h.label}" ${h.count}회`);
if (repoHits.length > 0) console.warn(`[check:private] 경고 — 저장소 파일 ${repoHits.length}건. 레포를 공개로 바꾸기 전에 정리하세요.\n`);

if (outHits.length > 0) {
  for (const h of outHits) console.error(`  ✗ ${h.file}: "${h.label}" ${h.count}회`);
  console.error(`\n[check:private] 실패 — 공개 빌드에 금지어 ${outHits.length}건.`);
  process.exit(1);
}
console.log(`[check:private] 통과 — 규칙 ${rules.length}개, 빌드 결과에서 금지어 0건`);
