import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArchitectureExplorer } from '@/components/architecture-diagram';
import { Draft } from '@/components/draft';
import { More } from '@/components/more';
import { Section } from '@/components/section';
import { Toc, type TocItem } from '@/components/toc';
import { getProject, getProjectSlugs } from '@/content/projects';
import type { Project, TextItem } from '@/content/types';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project ? `${project.title} · 포트폴리오` : '포트폴리오', description: project?.summary };
}

const TOC: TocItem[] = [
  { id: 'summary', num: '01', label: '프로젝트 요약', short: '요약' },
  { id: 'background', num: '02', label: '프로젝트 배경', short: '배경' },
  { id: 'architecture', num: '03', label: '시스템 구조', short: '구조' },
  { id: 'development', num: '04', label: '주요 개발 내용', short: '개발 내용' },
  { id: 'problem-solving', num: '05', label: '기술적 문제 해결', short: '문제 해결' },
  { id: 'validation', num: '06', label: '검증 및 결과', short: '검증·결과' },
  { id: 'retrospective', num: '07', label: '회고', short: '회고' },
];

const prose = 'max-w-[680px] text-[16px]/[28px] text-ink';

function Bullets({ items, className = '' }: { items: TextItem[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="relative pl-4 before:absolute before:top-[0.75em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-edge">
          <Draft evidence={item.evidence}>{item.text}</Draft>
        </li>
      ))}
    </ul>
  );
}

/** 문장 안의 한 구절만 하늘색 밑줄로 살짝 강조한다 */
function Emphasized({ text, phrase }: { text: string; phrase: string }) {
  const i = text.indexOf(phrase);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <strong
        className="font-semibold text-ink"
        style={{ background: 'linear-gradient(transparent 62%, rgba(125, 211, 252, 0.55) 62%)' }}
      >
        {phrase}
      </strong>
      {text.slice(i + phrase.length)}
    </>
  );
}

function Hero({ project }: { project: Project }) {
  return (
    <div className="pt-12 pb-12 md:pt-16 md:pb-14">
      <p className="text-[14px] text-meta">{project.meta}</p>
      <h1 data-hero="title" className="mt-3 text-[28px]/[36px] font-bold tracking-[-0.01em] text-ink md:text-[36px]/[46px]">
        {project.title}
      </h1>
      <ul aria-label="핵심 역량" className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="inline-flex h-7 items-center rounded-md bg-tint px-2.5 text-[13px] font-medium text-link">
            {tag}
          </li>
        ))}
      </ul>
      <p data-hero="summary" className="mt-4 max-w-[680px] text-[17px]/[28px] text-sub md:text-[19px]/[31px]">
        {project.summary}
      </p>
      <dl className="mt-8 grid max-w-[680px] grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 text-[15px]/[25px]">
        <dt className="text-meta">담당</dt>
        <dd data-hero="role" className="font-medium text-ink">
          {project.role}
        </dd>
        <dt className="text-meta">주요 기여</dt>
        <dd data-hero="highlights">
          <Bullets items={project.highlights} className="space-y-1" />
        </dd>
      </dl>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { overview, background, architecture, contributions, cases, validation } = project;

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Hero project={project} />
      </div>

      <div data-sticky className="sticky top-14 z-20 lg:hidden">
        <Toc items={TOC} variant="bar" />
      </div>

      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-20 pt-14">
            <Toc items={TOC} variant="side" />
          </div>
        </aside>

        <main className="min-w-0">
          {/* 01 */}
          <Section id="summary" num="01" title="프로젝트 요약">
            <dl className="grid max-w-[820px] gap-x-6 gap-y-4 text-[15px]/[26px] sm:grid-cols-[10rem_minmax(0,1fr)]">
              {overview.rows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-meta">{k}</dt>
                  <dd className="-mt-3 text-ink sm:mt-0">{v}</dd>
                </div>
              ))}
              <dt className="text-meta">기술 스택</dt>
              <dd className="-mt-3 space-y-1 text-ink sm:mt-0">
                {overview.stacks.map((s) => (
                  <p key={s.system}>
                    <span className="text-sub">{s.system}</span>
                    <span className="text-meta"> — </span>
                    {s.items.join(', ')}
                  </p>
                ))}
              </dd>
              <dt className="text-meta">{overview.collaborationLabel ?? '협업 및 기존 구조 활용'}</dt>
              <dd className="-mt-3 space-y-1 text-sub sm:mt-0">
                {overview.collaboration.map((c) => (
                  <Draft key={c.text} evidence={c.evidence}>
                    <p>{c.text}</p>
                  </Draft>
                ))}
              </dd>
            </dl>
          </Section>

          {/* 02 */}
          <Section id="background" num="02" title="프로젝트 배경">
            <div className={`${prose} mb-8`}>
              {background.approach.map((a) => (
                <Draft key={a.text} evidence={a.evidence}>
                  <p>{a.text}</p>
                </Draft>
              ))}
            </div>
            <div className="max-w-[860px]">
              {/* 기존 → 개선 비교. 카드 없이 행 구분선만 쓴다 */}
              <div
                aria-hidden
                className="hidden grid-cols-[7.5rem_minmax(0,1fr)_2rem_minmax(0,1fr)] gap-x-4 pb-2 text-[13px] font-medium md:grid"
              >
                <span />
                <span className="text-meta">기존</span>
                <span />
                <span className="text-link">개선</span>
              </div>
              <ul className="border-t border-line">
                {background.comparisons.map((c) => (
                  <li key={c.topic} className="border-b border-line py-5">
                    <Draft evidence={c.evidence}>
                      <div className="grid gap-y-2 md:grid-cols-[7.5rem_minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-x-4">
                        <p className="text-[15px]/[26px] font-semibold text-ink">{c.topic}</p>
                        <p className="text-[15px]/[26px] text-sub">
                          <span className="mr-2 text-[13px] font-medium text-meta md:sr-only">기존</span>
                          {c.before}
                        </p>
                        <span aria-hidden className="hidden text-center text-[15px]/[26px] text-accent md:block">
                          →
                        </span>
                        <p className="text-[15px]/[26px] text-ink">
                          <span className="mr-2 text-[13px] font-medium text-link md:sr-only">개선</span>
                          {c.after}
                        </p>
                      </div>
                    </Draft>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* 03 */}
          <Section id="architecture" num="03" title="시스템 구조">
            <dl className="mb-8 grid max-w-[760px] gap-x-6 gap-y-2 text-[15px]/[26px] sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-y-3">
              {architecture.roles.map((r) => (
                <div key={r.label} className="contents">
                  <dt className="font-semibold text-ink">{r.label}</dt>
                  <dd className="mb-2 text-sub sm:mb-0">{r.text}</dd>
                </div>
              ))}
            </dl>

            <ArchitectureExplorer architecture={architecture} />

          </Section>

          {/* 04 */}
          <Section id="development" num="04" title="주요 개발 내용">
            <div className="max-w-[760px] space-y-16">
              {contributions.map((group, gi) => (
                <div key={group.id} id={`dev-${group.id}`} className="scroll-mt-[124px] lg:scroll-mt-20">
                  <h3 className="flex items-baseline gap-3 text-[19px]/[28px] font-semibold text-ink">
                    <span className="font-mono text-[13px] font-medium text-meta">4.{gi + 1}</span>
                    {group.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-meta">{group.system}</p>
                  <p className="mt-4 max-w-[680px] text-[16px]/[28px] text-ink">
                    {group.emphasis ? <Emphasized text={group.summary} phrase={group.emphasis} /> : group.summary}
                  </p>

                  {group.apis && (
                    <ul aria-label="API 4종" className="mt-6 divide-y divide-line-soft rounded-md bg-soft px-4 text-[15px]/[25px]">
                      {group.apis.map((api) => (
                        <li key={api.name} className="grid gap-x-4 py-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
                          <Draft evidence={api.evidence}>
                            <span className="font-medium text-ink">{api.name}</span>
                          </Draft>
                          <span className="text-sub">{api.role}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 divide-y divide-line border-t border-rule">
                    {group.units.map((unit) => (
                      <div
                        key={unit.title}
                        id={unit.anchor ? `dev-${unit.anchor}` : undefined}
                        className="scroll-mt-[124px] py-5 lg:scroll-mt-20"
                      >
                        <Draft evidence={unit.evidence}>
                          <h4 className="text-[16px]/[26px] font-semibold text-ink">{unit.title}</h4>
                          <p className="mt-1.5 text-[15px]/[26px] text-sub">
                            {unit.emphasis ? <Emphasized text={unit.body} phrase={unit.emphasis} /> : unit.body}
                          </p>
                          {unit.more && <More more={unit.more} />}
                        </Draft>
                      </div>
                    ))}
                  </div>

                  {group.note && <p className="mt-3 text-[14px]/[22px] text-meta">기존 구조 활용 · {group.note}</p>}
                </div>
              ))}
            </div>
          </Section>

          {/* 05 */}
          <Section id="problem-solving" num="05" title="기술적 문제 해결">
            <div className="max-w-[760px] space-y-24 md:space-y-28">
              {cases.map((c, i) => (
                <Draft key={c.title} evidence={c.evidence}>
                  <article>
                    <h3 className="flex items-baseline gap-3 text-[19px]/[28px] font-semibold text-ink">
                      <span className="shrink-0 font-mono text-[13px] font-medium whitespace-nowrap text-meta">5.{i + 1}</span>
                      {c.title}
                    </h3>
                    {/* 요구사항 · 기존 구조는 회색, 구현은 하늘색 기준선과 진한 글씨로 구분한다 */}
                    <dl className="mt-6 space-y-5 text-[15px]/[26px]">
                      <div className="grid grid-cols-[minmax(0,1fr)] gap-1 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
                        <dt className="text-[13px]/[26px] font-medium text-meta">요구사항</dt>
                        <dd className="text-sub">{c.requirement}</dd>
                      </div>
                      <div className="grid grid-cols-[minmax(0,1fr)] gap-1 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
                        <dt className="text-[13px]/[26px] font-medium text-meta">기존 구조</dt>
                        <dd className="text-sub">{c.existing}</dd>
                      </div>
                      <div className="grid grid-cols-[minmax(0,1fr)] gap-1 pt-1 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
                        <dt className="text-[13px]/[26px] font-semibold text-link">구현</dt>
                        <dd className="min-w-0 border-l-2 border-sky pl-4">
                          <ul className="space-y-2">
                            {c.implementation.map((line) =>
                              typeof line === 'string' ? (
                                <li key={line} className="text-ink">
                                  {line}
                                </li>
                              ) : (
                                <li key={line.label} className="text-ink">
                                  <span className="font-semibold">{line.label}:</span> {line.text}
                                </li>
                              ),
                            )}
                          </ul>
                          {c.table && (
                            <table className="mt-5 w-full table-fixed border-collapse text-left text-[14px]/[22px]">
                              {c.table.caption && (
                                <caption className="mb-2 text-left text-[14px] font-semibold text-ink">{c.table.caption}</caption>
                              )}
                              <colgroup>
                                <col className="w-[6.5rem]" />
                              </colgroup>
                              <thead>
                                <tr className="border-b border-rule">
                                  {c.table.columns.map((col) => (
                                    <th key={col} scope="col" className="py-2 pr-3 font-medium text-meta">
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {c.table.rows.map((row) => (
                                  <tr key={row[0]} className="border-b border-line-soft last:border-line">
                                    {row.map((cell, ci) => (
                                      <td key={cell} className={`py-2 pr-3 align-top ${ci === 0 ? 'font-medium text-ink' : 'text-sub'}`}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {c.more && <More more={c.more} />}
                        </dd>
                      </div>
                    </dl>
                  </article>
                </Draft>
              ))}
            </div>
          </Section>

          {/* 06 */}
          <Section id="validation" num="06" title="검증 및 결과">
            <div className="max-w-[680px] space-y-10">
              {validation.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[17px]/[26px] font-semibold text-ink">{group.title}</h3>
                  <div className="mt-3 space-y-3 text-[16px]/[28px] text-ink">
                    {group.paragraphs.map((p) => (
                      <Draft key={p.text} evidence={p.evidence}>
                        <p>{group.emphasis ? <Emphasized text={p.text} phrase={group.emphasis} /> : p.text}</p>
                      </Draft>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 07 */}
          <Section id="retrospective" num="07" title="회고">
            <div className={`${prose} space-y-4`}>
              {project.retrospective.map((r) => (
                <Draft key={r.text} evidence={r.evidence}>
                  <p>{r.text}</p>
                </Draft>
              ))}
            </div>
          </Section>

          {/* 마지막 섹션도 목차에서 위로 올라올 수 있도록 남기는 여백 */}
          <div aria-hidden className="pb-[30vh]" />
        </main>
      </div>
    </>
  );
}
