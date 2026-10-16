import type { ReactNode } from 'react';
import type { Evidence } from '@/content/types';

/**
 * 미확인 콘텐츠 표시. 프로덕션 빌드에서는 미확인 항목이 이미 제거되므로,
 * 이 표시는 개발 모드에서만 보인다.
 */
export function Draft({ evidence, children }: { evidence: Evidence; children: ReactNode }) {
  if (evidence !== 'unverified') return <>{children}</>;
  return (
    <div className="relative rounded-sm outline-2 outline-offset-4 outline-dashed outline-[#b45309]">
      <span className="absolute -top-3 right-0 bg-white px-1 font-mono text-[11px] font-semibold text-[#b45309]">
        미확인 · 공개 빌드에서 제외
      </span>
      {children}
    </div>
  );
}
