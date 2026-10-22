import type { Profile } from '@/content/profile';

/** 인쇄 전용 평면 소개. 화면에서는 숨기고, 인쇄에서는 인터랙티브 요소 대신 이 내용이 나온다. */
export function PrintProfile({ profile }: { profile: Profile }) {
  const { name, title, intro, skills, workStyle, values, career, contacts } = profile;
  return (
    <section aria-label="소개 (인쇄용)" data-print-profile className="hidden text-[13px]/[22px] text-ink print:block">
      <p className="text-[24px] font-bold">{name}</p>
      <p className="font-mono text-[12px] text-meta">{title}</p>
      <p className="mt-3">{intro.text}</p>
      <dl className="mt-3 grid grid-cols-[6rem_minmax(0,1fr)] gap-y-1">
        {skills.map((s) => (
          <div key={s.area} className="contents">
            <dt className="font-mono text-meta">{s.area}</dt>
            <dd>{s.items.join(' · ')}</dd>
          </div>
        ))}
        {career.map((c) => (
          <div key={c.period} className="contents">
            <dt className="font-mono text-meta">경력</dt>
            <dd>
              {c.period}
              {c.company && ` · ${c.company}`}
            </dd>
          </div>
        ))}
        {contacts.map((c) => (
          <div key={c.label} className="contents">
            <dt className="font-mono text-meta">{c.label}</dt>
            <dd>{c.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 font-mono text-[12px] text-meta">일하는 방식</p>
      <ul className="mt-1 list-disc pl-5">
        {[...workStyle, ...values].map((l) => (
          <li key={l.text}>{l.text}</li>
        ))}
      </ul>
    </section>
  );
}
