'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 포인터 위치를 -1~1 값으로 읽어 CSS 변수(--px, --py)에 천천히 따라가게 쓴다.
 * 매 프레임 리렌더하지 않고 style 에 직접 쓴다. 터치 기기와 움직임 줄이기 설정에서는 꺼진다.
 */
export function usePointerField<T extends HTMLElement>(ease = 0.12) {
  const ref = useRef<T>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setEnabled(fine.matches && !rm.matches);
      setReduced(rm.matches);
    };
    sync();
    fine.addEventListener('change', sync);
    rm.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      rm.removeEventListener('change', sync);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const tick = useCallback(() => {
    const c = cur.current;
    const t = target.current;
    c.x += (t.x - c.x) * ease;
    c.y += (t.y - c.y) * ease;
    const el = ref.current;
    if (el) {
      el.style.setProperty('--px', c.x.toFixed(4));
      el.style.setProperty('--py', c.y.toFixed(4));
    }
    if (Math.abs(t.x - c.x) > 0.001 || Math.abs(t.y - c.y) > 0.001) raf.current = requestAnimationFrame(tick);
    else raf.current = 0;
  }, [ease]);

  const aim = useCallback(
    (x: number, y: number) => {
      target.current = { x, y };
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    },
    [tick],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!enabled || e.pointerType !== 'mouse' || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      aim(
        Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)),
        Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)),
      );
    },
    [aim, enabled],
  );

  const onPointerLeave = useCallback(() => enabled && aim(0, 0), [aim, enabled]);

  return { ref, enabled, reduced, aim, handlers: { onPointerMove, onPointerLeave } };
}
