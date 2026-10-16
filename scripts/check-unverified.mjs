// 공개 배포 전 검사 1: 미확인(evidence: 'unverified') 콘텐츠가 남아 있으면 실패한다.
// 실행: node --experimental-strip-types scripts/check-unverified.mjs  (npm run check:unverified)
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(root, 'content', 'projects');
const { findUnverified } = await import(pathToFileURL(path.join(root, 'content', 'evidence.ts')).href);

const files = (await readdir(projectsDir)).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
let total = 0;

for (const file of files) {
  const mod = await import(pathToFileURL(path.join(projectsDir, file)).href);
  const hits = findUnverified(mod.project);
  total += hits.length;
  for (const hit of hits) console.error(`  ✗ ${file} ${hit.path}: ${hit.preview}`);
}

if (total > 0) {
  console.error(`\n[check:unverified] 미확인 콘텐츠 ${total}건. 근거를 확인해 evidence를 바꾸거나 항목을 지운 뒤 다시 실행하세요.`);
  process.exit(1);
}
console.log(`[check:unverified] 통과 — 프로젝트 ${files.length}개, 미확인 0건`);
