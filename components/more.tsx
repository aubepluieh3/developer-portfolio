import type { More as MoreContent } from '@/content/types';

/** 펼쳐 보기. <details> 라서 JS 없이 동작한다. 접힌 상태에서도 summary 한 줄이 요약 역할을 한다. */
export function More({ more }: { more: MoreContent }) {
  return (
    <details className="mt-3">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[14px] text-link hover:underline">
        <span aria-hidden className="chevron inline-block transition-transform duration-150">
          ›
        </span>
        {more.summary}
      </summary>
      <div className="mt-3 space-y-3 border-l border-line pl-4 text-[15px]/[26px] text-sub">
        {more.paragraphs?.map((p) => <p key={p}>{p}</p>)}
        {more.rows && (
          <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
            {more.rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-medium text-ink">{k}</dt>
                <dd className="mb-2 sm:mb-0">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {more.code && (
          <figure>
            <pre
              data-allow-overflow
              className="overflow-x-auto rounded-md bg-soft p-4 font-mono text-[13px]/[20px] text-ink [overflow-wrap:normal] [word-break:normal]"
            >
              <code>{more.code}</code>
            </pre>
            {more.codeCaption && <figcaption className="mt-2 text-[13px] text-meta">{more.codeCaption}</figcaption>}
          </figure>
        )}
      </div>
    </details>
  );
}
