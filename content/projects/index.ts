import { findUnverified, stripUnverified } from '../evidence';
import type { Project } from '../types';
import { project as firstProject } from './contract-billing';
import { project as secondProject } from './pg-payment-integration';

const projects: Project[] = [firstProject, secondProject];

const isProduction = process.env.NODE_ENV === 'production';

/**
 * 개발: 미확인 항목을 그대로 두고 경고한다 (화면에는 "미확인" 표시).
 * 빌드: 미확인 항목을 제거한다. 공개 배포 차단은 scripts/check-unverified.mjs 가 맡는다.
 */
export function getProject(slug: string): Project | undefined {
  const raw = projects.find((p) => p.slug === slug);
  if (!raw) return undefined;

  const hits = findUnverified(raw);
  if (hits.length > 0) {
    const list = hits.map((h) => `  - ${h.path}: ${h.preview}`).join('\n');
    console.warn(
      isProduction
        ? `[content] ${slug}: 미확인 ${hits.length}건을 빌드에서 제외했습니다.\n${list}`
        : `[content] ${slug}: 미확인 ${hits.length}건이 있습니다 (개발 모드에서만 표시).\n${list}`,
    );
  }
  if (!isProduction) return raw;

  const clean = stripUnverified(raw);
  // 노드가 빠졌으면 그 노드에 걸린 연결선·흐름 단계도 함께 뺀다
  const ids = new Set(clean.architecture.nodes.map((n) => n.id));
  clean.architecture.edges = clean.architecture.edges.filter((e) => ids.has(e.from) && ids.has(e.to));
  clean.architecture.flows = clean.architecture.flows.map((f) => ({
    ...f,
    path: f.path.filter(([a, b]) => ids.has(a) && ids.has(b)),
    steps: f.steps.filter((s) => ids.has(s.node)),
  }));
  return clean;
}

/** 메인 목록용: 등록 순서대로 */
export function getProjects(): Project[] {
  return projects.map((p) => getProject(p.slug)).filter((p): p is Project => p !== undefined);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
