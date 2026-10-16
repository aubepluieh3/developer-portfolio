'use client';

import { useEffect, useRef, useState } from 'react';

export interface TocItem {
  id: string;
  num: string;
  label: string;
  short: string;
}

/**
 * 스크롤 위치에 따라 현재 섹션을 강조하는 목차.
 * - side: 데스크톱 좌측 sticky 목록
 * - bar: 1023px 이하 상단 가로 바 (이 행만 가로 스크롤)
 * 판정 기준: 고정 헤더 바로 아래부터 화면 위쪽 40% 구간에 걸친 첫 섹션 (docs §5.3)
 */
export function Toc({ items, variant }: { items: TocItem[]; variant: 'side' | 'bar' }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLOListElement>(null);
  // 클릭 직후에는 클릭한 항목을 유지한다. 페이지 끝 근처 짧은 섹션도 클릭한 대로 표시하기 위해서다.
  const clickLock = useRef<{ id: string; until: number } | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Map<string, boolean>();
    const top = window.matchMedia('(min-width: 1024px)').matches ? 80 : 124;

    const update = () => {
      const lock = clickLock.current;
      if (lock && Date.now() < lock.until) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && !lock) {
        setActive(items[items.length - 1].id);
        return;
      }
      const first = items.find((item) => visible.get(item.id));
      if (first) setActive(first.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        update();
      },
      { rootMargin: `-${top}px 0px -60% 0px` },
    );
    sections.forEach((el) => observer.observe(el));

    // 사용자가 직접 스크롤하면 클릭 고정을 푼다
    const release = () => {
      if (clickLock.current && Date.now() >= clickLock.current.until) clickLock.current = null;
    };
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('touchmove', release, { passive: true });
    window.addEventListener('keydown', release);
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchmove', release);
      window.removeEventListener('keydown', release);
    };
  }, [items]);

  // 가로 바에서는 현재 항목이 보이도록 바만 스크롤한다 (페이지는 움직이지 않음)
  useEffect(() => {
    if (variant !== 'bar') return;
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && el) list.scrollTo({ left: el.offsetLeft - 20, behavior: 'smooth' });
  }, [active, variant]);

  const onClick = (id: string) => {
    clickLock.current = { id, until: Date.now() + 900 };
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };

  if (variant === 'bar') {
    return (
      <nav aria-label="목차" data-toc="bar" className="border-b border-line bg-white/95 backdrop-blur-sm">
        <ol
          ref={listRef}
          data-allow-overflow
          className="flex h-11 items-stretch gap-1 overflow-x-auto px-3 [scrollbar-width:none]"
        >
          {items.map((item) => {
            const current = item.id === active;
            return (
              <li key={item.id} data-id={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={current ? 'true' : undefined}
                  onClick={() => onClick(item.id)}
                  className={`flex h-full items-center border-b-2 px-2.5 text-[14px] whitespace-nowrap ${
                    current ? 'border-accent font-semibold text-ink' : 'border-transparent text-sub'
                  }`}
                >
                  {item.short}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="목차" data-toc="side">
      <p className="mb-3 text-[13px] font-medium text-meta">목차</p>
      <ol className="space-y-1">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? 'true' : undefined}
                onClick={() => onClick(item.id)}
                className={`flex gap-2.5 border-l-2 py-1.5 pr-2 pl-3.5 text-[14px]/[20px] ${
                  current ? 'border-accent font-semibold text-ink' : 'border-transparent text-sub hover:text-ink'
                }`}
              >
                <span className="font-mono text-[12px] font-medium text-meta">{item.num}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
