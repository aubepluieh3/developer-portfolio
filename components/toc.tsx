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
 * 판정 기준: 섹션 제목이 고정 헤더 아래 화면 위쪽 40% 선을 지난 마지막 섹션.
 * 페이지 맨 아래에 닿으면 마지막 섹션으로 본다 (짧은 마지막 섹션은 제목이 위로 올라오지 못하므로).
 * 클릭한 항목은 그 클릭으로 시작된 스크롤이 끝날 때까지 유지하고, 그 뒤의 스크롤부터 다시 계산한다.
 */
export function Toc({ items, variant }: { items: TocItem[]; variant: 'side' | 'bar' }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLOListElement>(null);
  const clickLock = useRef<{ settled: boolean; timer: number } | null>(null);

  useEffect(() => {
    const headerOffset = () => (window.matchMedia('(min-width: 1024px)').matches ? 80 : 124);

    const compute = () => {
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActive(items[items.length - 1].id);
        return;
      }
      const line = headerOffset() + (window.innerHeight - headerOffset()) * 0.4;
      let current = items[0].id;
      for (const item of items) {
        const heading = document.getElementById(`${item.id}-title`);
        if (heading && heading.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };

    let frame = 0;
    const onScroll = () => {
      const lock = clickLock.current;
      if (lock) {
        if (!lock.settled) {
          // 클릭으로 시작된 스크롤이 이어지는 동안은 고정. 스크롤이 200ms 멈추면 고정 해제 준비.
          window.clearTimeout(lock.timer);
          lock.timer = window.setTimeout(() => {
            if (clickLock.current) clickLock.current.settled = true;
          }, 200);
          return;
        }
        clickLock.current = null; // 클릭 스크롤이 끝난 뒤의 새 스크롤 → 다시 계산
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
    if (clickLock.current) window.clearTimeout(clickLock.current.timer);
    // 스크롤이 전혀 일어나지 않는 클릭(이미 그 위치)도 고정이 풀리도록 기본 타이머를 둔다
    const timer = window.setTimeout(() => {
      if (clickLock.current) clickLock.current.settled = true;
    }, 300);
    clickLock.current = { settled: false, timer };
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
