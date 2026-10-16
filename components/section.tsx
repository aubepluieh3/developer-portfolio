import type { ReactNode } from 'react';

/**
 * 목차가 따라가는 섹션. scroll-margin 은 고정 헤더(56px)와 모바일 목차 바(44px) 높이만큼 준다.
 * 제목이 데스크톱은 80px(56 + 24), 1023px 이하는 124px(56 + 44 + 24)에 오도록,
 * 섹션 위 여백(pt)만큼 뺀 값을 scroll-margin 으로 준다. 대분류 구분은 가로선 없이 여백과 제목으로 한다.
 */
export function Section({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-section
      className="scroll-mt-[44px] pt-20 pb-4 md:scroll-mt-[12px] md:pt-28 lg:scroll-mt-[-32px]"
    >
      <h2 id={`${id}-title`} className="flex items-baseline gap-3 text-[23px]/[32px] font-bold text-ink md:text-[28px]/[38px]">
        <span className="font-mono text-[13px] font-medium text-meta">{num}</span>
        {title}
      </h2>
      <div className="mt-8 md:mt-10">{children}</div>
    </section>
  );
}
