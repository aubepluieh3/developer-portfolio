import type { Ownership } from '@/content/types';

export const OWNERSHIP_TEXT: Record<Ownership, string> = {
  new: '신규',
  extended: '확장',
  existing: '기존 활용',
};

const TONE: Record<Ownership, string> = {
  new: 'font-semibold text-ink',
  extended: 'font-medium text-link',
  existing: 'text-meta',
};

const BADGE: Record<Ownership, string> = {
  new: 'bg-tint text-link',
  extended: 'border border-sky text-link',
  existing: 'bg-[#f1f3f5] text-sub',
};

/** 주요 개발 내용(04)용 작은 배지. 하늘색 채움 / 하늘색 테두리 / 연회색으로만 구분한다 */
export function OwnershipBadges({ values }: { values: Ownership[] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {values.map((v) => (
        <span
          key={v}
          className={`inline-flex h-[22px] items-center rounded px-1.5 text-[12px] font-medium whitespace-nowrap ${BADGE[v]}`}
        >
          {OWNERSHIP_TEXT[v]}
        </span>
      ))}
    </span>
  );
}

/** 기여 구분 라벨. 배지 모양 대신 텍스트로만 표시한다 (docs §4.4) */
export function OwnershipLabel({ values, className = '' }: { values: Ownership[]; className?: string }) {
  if (values.length === 0) return null;
  return (
    <span className={className}>
      {values.map((v, i) => (
        <span key={v}>
          {i > 0 && <span className="text-meta"> · </span>}
          <span className={TONE[v]}>{OWNERSHIP_TEXT[v]}</span>
        </span>
      ))}
    </span>
  );
}
