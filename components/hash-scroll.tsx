'use client';

import { useEffect } from 'react';

/**
 * 주소에 #섹션 을 붙여 새로 열면(새로고침·공유 링크) 브라우저는 웹폰트가 오기 전 대체 글꼴 기준으로 위치를 잡는다.
 * 웹폰트로 바뀌면 위쪽 본문이 짧아져 제목이 고정 바 밑으로 올라가므로, 글꼴이 준비된 뒤 한 번 더 맞춘다.
 * 그 사이 사용자가 직접 스크롤했으면 건드리지 않는다.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let userMoved = false;
    const onUser = () => {
      userMoved = true;
    };
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    events.forEach((e) => window.addEventListener(e, onUser, { passive: true, once: true }));
    let frame = 0;
    document.fonts.ready.then(() => {
      frame = requestAnimationFrame(() => {
        if (!userMoved) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      events.forEach((e) => window.removeEventListener(e, onUser));
    };
  }, []);
  return null;
}
