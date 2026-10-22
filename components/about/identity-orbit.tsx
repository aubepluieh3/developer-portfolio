'use client';

import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import type { Profile } from '@/content/profile';
import { CopyEmail } from './copy-email';
import { NameCard } from './name-card';
import { TECH_LOGO } from './tech-logos';
import { usePointerField } from './use-pointer-field';

/**
 * 소개 페이지 (A안 Interactive Identity + Contact 에 B안 명함).
 * 왼쪽은 큰 타이틀과 소개, 오른쪽은 기울어진 궤도 위에 떠 있는 기술 카드.
 * 인터랙션은 사용자가 움직일 때만 반응한다 (상시 반복 애니메이션 없음):
 *  1) 포인터를 움직이면 궤도·카드·가운데 점이 깊이에 따라 조금씩 다르게 따라오고, 카드는 아주 약하게 기운다
 *  2) 카드에 올리면 살짝 떠오르고, 누르면 가운데에 그 기술 설명이 나타난다
 */

type TechId = keyof typeof TECH_LOGO;
type Tech = { id: TechId; name: string; x: number; mx: number; y: number; depth: number; note: string };

// 위치는 오른쪽 영역(가로 560 × 세로 460) 기준 카드 중심 %. x 는 1024px 이상, mx 는 그보다 좁은 화면.
// note 는 실제 프로젝트에서 확인된 사용 범위
const TECH: Tech[] = [
  { id: 'react', name: 'React', x: 72, mx: 70, y: 12, depth: 18, note: 'OP2 업무 화면을 React와 TanStack Query로 만들었습니다.' },
  { id: 'typescript', name: 'TypeScript', x: 20, mx: 25, y: 30, depth: 26, note: '보안서약서 관리 시스템의 일괄 결재·캠페인 화면을 TypeScript로 개발했습니다.' },
  { id: 'spring', name: 'Spring', x: 89, mx: 77, y: 41, depth: 22, note: 'Spring Boot·Spring MVC 기반 API와 MyBatis·JPA·jOOQ 데이터 처리를 다뤘습니다.' },
  { id: 'javascript', name: 'JavaScript', x: 21, mx: 24, y: 73, depth: 30, note: '운영관리시스템과 고객 화면을 JavaScript로 개발했습니다.' },
  { id: 'java', name: 'Java', x: 64, mx: 66, y: 86, depth: 20, note: '요금제·결제 연동·악용 방지 기능의 서버 로직을 Java로 구현했습니다.' },
  { id: 'claude', name: 'Claude Code', x: 30, mx: 26, y: 1, depth: 16, note: 'Claude AI를 활용해서 개발했습니다.' },
];
const W = 560;
const H = 460;
const CENTER = { x: 46, y: 48 };
const C = { x: (CENTER.x / 100) * W, y: (CENTER.y / 100) * H };
// 궤도 (반지름 x·y)와 그 위의 작은 점 (각도)
const RINGS = [
  { rx: 272, ry: 182, stroke: '#d5e4f7', dots: [200, 338] },
  { rx: 200, ry: 132, stroke: '#c9dcf5', dots: [28, 250] },
  { rx: 122, ry: 80, stroke: '#dbe7f8', dots: [120] },
];
const TILT = -14;

const IconMail = () => (
  <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
    <path d="m3.5 6 6.5 5 6.5-5" />
  </svg>
);
const IconCalendar = () => (
  <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
    <path d="M3 8.5h14M7 2.75v3.5M13 2.75v3.5" strokeLinecap="round" />
  </svg>
);

export function IdentityOrbit({ profile }: { profile: Profile }) {
  const field = usePointerField<HTMLDivElement>(0.1);
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = TECH.find((t) => t.id === (selected ?? hover));
  const chosen = TECH.find((t) => t.id === selected);
  const [email] = profile.contacts;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const shift = (depth: number) => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.7}px), 0)`,
  });
  // 카드가 포인터 쪽으로 아주 약하게 기운다 (움직임 줄이기에서는 --px 가 없어 0)
  const tilt = 'perspective(700px) rotateX(calc(var(--py, 0) * -7deg)) rotateY(calc(var(--px, 0) * 7deg))';

  return (
    <div className="print:hidden">
      {/* 첫 화면 */}
      <section
        aria-labelledby="identity-title"
        className="relative overflow-x-clip bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fe_100%)]"
      >
        {/* 은은한 블루 번짐 */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.30),transparent_65%)]" />
          <div className="absolute top-[56%] left-[38%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.12),transparent_65%)]" />
          <div className="absolute bottom-28 -left-28 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(191,219,254,0.22),transparent_65%)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid items-center gap-6 pt-12 pb-20 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-8 md:pt-20 md:pb-40 lg:pt-24">
            {/* 왼쪽: 타이틀과 소개 */}
            <div>
              <p className="flex items-center gap-3 text-[12px] font-medium tracking-[0.2em] text-[#5b6577] sm:text-[13px]">
                SOOHYUN PARK <span aria-hidden className="inline-block h-px w-6 bg-[#b6c0cd]" />
              </p>
              <h1
                id="identity-title"
                className="mt-6 text-[clamp(38px,5.3vw,66px)]/[1.12] font-bold tracking-[-0.035em] text-[#0b1630]"
              >
                Full-stack
                <br />
                <span className="relative inline-block">
                  <span className="bg-[linear-gradient(90deg,#3b82f6,#2563eb)] bg-clip-text text-transparent">Developer</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.06em] left-[-2%] h-[0.2em] w-[104%]"
                    fill="none"
                  >
                    <path d="M2 9C50 3 130 2 198 6" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  </svg>
                </span>
              </h1>
              <p className="mt-7 max-w-[480px] text-[15px]/[1.8] text-[#3f4a5c] sm:text-[16.5px]/[1.8]">
                Java·Spring 기반 백엔드와 JavaScript·TypeScript·React 기반 화면을 함께 개발해 왔습니다. 요구사항 분석부터
                설계·구현·검증까지 이어서 맡아 왔고, 현업 담당자와 직접 소통하며 기능을 구체화하는 것을 좋아합니다.
              </p>
              <Link
                href="/"
                data-target
                className="group mt-9 inline-flex min-h-11 items-center gap-2 border-b-2 border-[#2563eb] text-[16px] font-semibold text-[#1d4ed8]"
              >
                프로젝트 보기
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </Link>
            </div>

            {/* 오른쪽: 궤도와 기술 카드 */}
            <div
              ref={field.ref}
              {...field.handlers}
              data-orbit
              className="relative mx-auto mt-6 aspect-[560/460] w-full max-w-[560px] md:mt-0"
            >
              <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" style={shift(6)}>
                <g transform={`rotate(${TILT} ${C.x} ${C.y})`}>
                  {RINGS.map((r) => (
                    <g key={r.rx}>
                      <ellipse cx={C.x} cy={C.y} rx={r.rx} ry={r.ry} fill="none" stroke={r.stroke} strokeWidth="1.2" />
                      {r.dots.map((deg) => {
                        const a = (deg * Math.PI) / 180;
                        return <circle key={deg} cx={C.x + r.rx * Math.cos(a)} cy={C.y + r.ry * Math.sin(a)} r="3.6" fill="#60a5fa" />;
                      })}
                    </g>
                  ))}
                </g>
                {TECH.map((t) => (
                  <g key={t.id} stroke={active?.id === t.id ? '#93c5fd' : '#dde8f6'} strokeWidth={active?.id === t.id ? 1.5 : 1} className="transition-[stroke] duration-200">
                    <line className="lg:hidden" x1={C.x} y1={C.y} x2={(t.mx / 100) * W} y2={(t.y / 100) * H} />
                    <line className="hidden lg:inline" x1={C.x} y1={C.y} x2={(t.x / 100) * W} y2={(t.y / 100) * H} />
                  </g>
                ))}
              </svg>

              {/* 가운데 점: 포인터 쪽으로 조금 더 많이 움직인다 */}
              <div className="pointer-events-none absolute" style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, ...shift(14) }}>
                <span aria-hidden className="absolute -top-8 -left-8 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28),transparent_70%)]" />
                <span
                  aria-hidden
                  className="absolute -top-[15px] -left-[15px] h-[30px] w-[30px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#a5d0ff,#3b82f6_70%)] shadow-[0_6px_16px_rgba(59,130,246,0.35)]"
                />
                <p
                  id="orbit-note"
                  aria-live="polite"
                  className="absolute top-7 left-2 w-[clamp(150px,22vw,230px)] text-[12.5px]/[20px] text-[#4b5566] lg:left-[-6px]"
                >
                  {chosen ? (
                    <span key={chosen.id} className="block motion-safe:animate-[note-in_220ms_cubic-bezier(0.2,0.8,0.2,1)]">
                      <span className="mb-0.5 block font-mono text-[11px] text-[#1d4ed8]">{chosen.name}</span>
                      {chosen.note}
                    </span>
                  ) : (
                    <>
                      화면과 서버를
                      <br />
                      함께 만듭니다.
                    </>
                  )}
                </p>
              </div>

              {TECH.map((t) => {
                const on = active?.id === t.id;
                const Logo = TECH_LOGO[t.id];
                return (
                  <div
                    key={t.id}
                    className="absolute left-(--mx) h-0 w-0 lg:left-(--x)"
                    style={{ '--x': `${t.x}%`, '--mx': `${t.mx}%`, top: `${t.y}%`, ...shift(t.depth) } as CSSProperties}
                  >
                    <div className="absolute w-max" style={{ transform: `translate(-50%, -50%) ${tilt}` }}>
                      <button
                        type="button"
                        data-tech={t.id}
                        data-target
                        aria-pressed={selected === t.id}
                        aria-describedby="orbit-note"
                        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(t.id)}
                        onPointerLeave={() => setHover(null)}
                        onFocus={() => setHover(t.id)}
                        onBlur={() => setHover(null)}
                        onClick={() => setSelected((s) => (s === t.id ? null : t.id))}
                        className={`flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-[14px] border bg-white px-3.5 py-2.5 text-[14px] font-semibold text-[#14203a] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none sm:gap-3 sm:rounded-[16px] sm:px-5 sm:py-3.5 sm:text-[16px] ${
                          selected === t.id ? 'border-[#93c5fd]' : 'border-white'
                        } ${
                          on
                            ? 'shadow-[0_18px_36px_-14px_rgba(30,64,120,0.30),0_0_0_6px_rgba(147,197,253,0.20)]'
                            : 'shadow-[0_10px_30px_-12px_rgba(30,64,120,0.22),0_1px_3px_rgba(30,64,120,0.06)]'
                        }`}
                        style={{ transform: on && !field.reduced ? 'translateY(-6px)' : 'none' }}
                      >
                        <Logo />
                        {t.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="absolute bottom-24 left-[max(20px,calc((100vw-1200px)/2+32px))] hidden flex-col items-start gap-2 text-[11px] font-medium tracking-[0.2em] text-[#5b6577] md:flex">
          SCROLL
          <span aria-hidden className="relative ml-1.5 block h-7 w-px bg-[#b6c0cd]">
            <span className="absolute -bottom-1 -left-[2.5px] h-1.5 w-1.5 rounded-full bg-[#7b8698]" />
          </span>
        </p>

        {/* Intro → Contact 를 잇는 완만한 곡선 */}
        <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[60px] w-full md:h-[110px]">
          <path d="M0 64C300 8 760 4 1440 84V120H0Z" fill="#fbfdff" />
          <path d="M0 64C300 8 760 4 1440 84" fill="none" stroke="#e4eefb" strokeWidth="1.2" />
        </svg>
      </section>

      {/* Contact: 명함이 중심. 연락처는 명함 밖에서도 항상 보인다 */}
      <section
        id="about-contact"
        aria-labelledby="about-contact-title"
        className="relative scroll-mt-20 overflow-x-clip bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
          <div className="absolute top-[4%] right-[-4%] h-[520px] w-[520px] rounded-full border border-[#e8f0fb]" />
          <div className="absolute top-[16%] right-[6%] h-[360px] w-[360px] rounded-full border border-[#eef4fc]" />
        </div>

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 pt-10 pb-20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:px-8 md:pt-16 md:pb-28">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-medium tracking-[0.2em] text-[#5b6577] sm:text-[13px]">
              LET&apos;S CONNECT <span aria-hidden className="inline-block h-px w-6 bg-[#b6c0cd]" />
            </p>
            <h2 id="about-contact-title" className="mt-5 text-[clamp(42px,5.6vw,72px)]/[1.05] font-bold tracking-[-0.035em] text-[#0b1630]">
              Contact
            </h2>
            <ul className="mt-10 space-y-3 text-[16px] text-[#14203a] sm:text-[17px]">
              <li className="flex items-center gap-4">
                <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eaf2fd] text-[#2563eb]">
                  <IconMail />
                </span>
                <CopyEmail email={email.value} label={email.value} className="hover:text-[#1d4ed8]" />
              </li>
              <li className="flex items-center gap-4">
                <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eaf2fd] text-[#2563eb]">
                  <IconCalendar />
                </span>
                <span>
                  <span className="sr-only">경력 기간 </span>
                  {profile.career[0]?.period}
                </span>
              </li>
            </ul>
            <span aria-hidden className="mt-8 block h-px w-40 bg-[#dfe6ef]" />
          </div>
          <NameCard profile={profile} />
        </div>
      </section>
    </div>
  );
}
