// 미확인 콘텐츠를 찾고 걸러내는 함수. 페이지(Next)와 검증 스크립트(Node)가 함께 쓴다.

export interface UnverifiedHit {
  path: string;
  preview: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isUnverified(value: unknown): boolean {
  return isRecord(value) && value.evidence === 'unverified';
}

function previewOf(value: Record<string, unknown>): string {
  const text = value.text ?? value.title ?? value.name ?? value.label ?? '';
  return String(text).slice(0, 60);
}

/** 콘텐츠 트리 전체에서 evidence가 'unverified'인 항목을 찾는다 */
export function findUnverified(value: unknown, path = ''): UnverifiedHit[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => findUnverified(item, `${path}[${i}]`));
  }
  if (!isRecord(value)) return [];
  const hits: UnverifiedHit[] = isUnverified(value) ? [{ path, preview: previewOf(value) }] : [];
  for (const [key, child] of Object.entries(value)) {
    hits.push(...findUnverified(child, path ? `${path}.${key}` : key));
  }
  return hits;
}

/** 배열 안의 미확인 항목을 깊게 제거한 복사본을 만든다 */
export function stripUnverified<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.filter((item) => !isUnverified(item)).map((item) => stripUnverified(item)) as T;
  }
  if (!isRecord(value)) return value;
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) out[key] = stripUnverified(child);
  return out as T;
}
