'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 이메일 복사. 라벨이 제자리에서 "복사됨"으로 바뀌었다가 돌아온다 (150ms 투명도 전환).
 * 복사가 막힌 환경에서는 mailto 로 넘어간다.
 */
export function CopyEmail({ email, label = 'Email', className = '' }: { email: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-copy-email
      data-target
      aria-label={copied ? `${email} 복사됨` : `${email} 복사`}
      title={email}
      className={`relative inline-grid min-h-11 items-center ${className}`}
    >
      <span className={`col-start-1 row-start-1 transition-opacity duration-150 ease-in-out ${copied ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
      <span aria-hidden className={`col-start-1 row-start-1 text-link transition-opacity duration-150 ease-in-out ${copied ? 'opacity-100' : 'opacity-0'}`}>
        복사됨
      </span>
    </button>
  );
}
