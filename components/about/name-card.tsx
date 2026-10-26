'use client';

import { useEffect, useRef, useState } from 'react';
import type { Profile } from '@/content/profile';
import { usePointerField } from './use-pointer-field';

/**
 * 소개 페이지 Contact 의 명함 (뒤에 연한 블루 카드가 한 장 겹쳐 있다).
 *  1) 포인터를 움직이면 놓인 각도에서 아주 약하게 더 기운다
 *  2) 카드나 → 버튼을 누르면 Y축으로 뒤집히고, 도는 동안 살짝 들렸다 내려앉는다. 다시 누르면 돌아온다
 * 터치에서는 탭, 움직임 줄이기 설정에서는 회전 대신 짧은 페이드로 면을 바꾼다.
 */

const FLIP_MS = 720;
const REST = { x: 6, y: -8, z: -6 }; // 비스듬히 놓인 각도

const IconMail = () => (
  <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
    <path d="m3.5 6 6.5 5 6.5-5" />
  </svg>
);
const IconArrow = ({ back }: { back: boolean }) => (
  <svg aria-hidden viewBox="0 0 20 20" className={`h-5 w-5 ${back ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5" />
  </svg>
);

export function NameCard({ profile }: { profile: Profile }) {
  const field = usePointerField<HTMLDivElement>(0.12);
  const [back, setBack] = useState(false);
  const [lift, setLift] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [touched, setTouched] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flip = () => {
    setBack((b) => !b);
    setTouched(true);
    if (field.reduced) return;
    setLift(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLift(false), FLIP_MS / 2);
  };
  const isControl = (e: React.SyntheticEvent) => !!(e.target as HTMLElement).closest('a, button');

  const [email] = profile.contacts;
  const skills = ['Java', 'Spring', 'React', 'JavaScript'];
  const face =
    'absolute inset-0 flex flex-col rounded-[22px] bg-white px-[7.5%] pt-[6.5%] pb-[6%] shadow-[0_44px_70px_-34px_rgba(30,64,120,0.38),0_2px_10px_rgba(30,64,120,0.06)] [backface-visibility:hidden]';
  const label = 'flex items-start justify-between font-mono text-[clamp(9px,2cqw,11px)] tracking-[0.18em] text-[#6b7686]';
  const fade = (visible: boolean) => (field.reduced ? `transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}` : '');
  // 3D로 기운 카드 안에서 버튼에 transform(hover 확대 등)을 주면 그 순간 포인터 판정이 버튼을 벗어나
  // hover가 깜빡이고 클릭이 카드로 넘어간다. 그래서 반응은 밝기·그림자로만 준다.
  const flipButton = (text: string) => (
    <button
      type="button"
      onClick={flip}
      aria-label={text}
      data-flip-button
      data-target
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#60a5fa,#2563eb)] text-white shadow-[0_10px_22px_-8px_rgba(37,99,235,0.6)] transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_12px_26px_-8px_rgba(37,99,235,0.7)] active:brightness-95 sm:h-[52px] sm:w-[52px]"
    >
      <IconArrow back={back} />
    </button>
  );

  return (
    <div ref={field.ref} {...field.handlers} className="flex flex-col items-center py-6 md:py-10">
      <div className="relative mr-[7%] w-[min(76vw,500px)] [container-type:inline-size] [perspective:1400px] sm:mr-[9%]">
        {/* 뒤에 겹친 연한 블루 카드 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/70 bg-[linear-gradient(140deg,#dbeafe_0%,#bcd6fb_100%)] shadow-[0_30px_60px_-30px_rgba(37,99,235,0.35)]"
          style={{
            transform: field.reduced
              ? 'translate(9%, -9%) rotate(6deg)'
              : 'translate(calc(9% + var(--px, 0) * 4px), calc(-9% + var(--py, 0) * 4px)) rotate(6deg)',
          }}
        />
        <div
          data-card
          data-side={back ? 'back' : 'front'}
          onPointerDown={(e) => !isControl(e) && setPressed(true)}
          onPointerUp={(e) => {
            if (!pressed) return;
            setPressed(false);
            if (!isControl(e)) flip();
          }}
          onPointerLeave={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
          className="relative aspect-[1.45] w-full sm:aspect-[1.72] cursor-pointer touch-manipulation select-none [transform-style:preserve-3d]"
          style={{
            transform: field.reduced
              ? 'none'
              : `rotateX(calc(${REST.x}deg - var(--py, 0) * 5deg)) rotateY(calc(${REST.y}deg + var(--px, 0) * 6deg + ${back ? 180 : 0}deg)) rotateZ(${REST.z}deg) translateZ(${lift ? 40 : 0}px) scale(${pressed ? 0.985 : 1})`,
            transition: `transform ${FLIP_MS}ms cubic-bezier(0.25, 0.9, 0.25, 1)`,
          }}
        >
          {/* 앞면 */}
          <section aria-label="명함 앞면" inert={back} className={`${face} ${fade(!back)}`}>
            <div className={label}>
              <span>DEVELOPER</span>
              <span>01 / 02</span>
            </div>
            <p className="mt-auto text-[clamp(22px,7cqw,36px)]/[1.05] font-bold tracking-[-0.01em] text-[#0b1630]">SOOHYUN PARK</p>
            <p className="mt-[2.2%] text-[clamp(11.5px,3.1cqw,15px)] text-[#4b5566]">{profile.title}</p>
            <div className="mt-[5.5%] flex items-center justify-between gap-3 border-t border-[#e6ebf2] pt-[4.5%]">
              <ul className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="핵심 기술">
                {skills.map((s) => (
                  <li key={s} className="rounded-full bg-[#f1f5fb] px-[0.75em] py-[0.3em] text-[clamp(10.5px,2.6cqw,13px)] font-medium text-[#33405a]">
                    {s}
                  </li>
                ))}
              </ul>
              {flipButton('뒷면 보기')}
            </div>
          </section>

          {/* 뒷면 */}
          <section aria-label="명함 뒷면" inert={!back} className={`${face} ${field.reduced ? fade(back) : '[transform:rotateY(180deg)]'}`}>
            <div className={label}>
              <span>ABOUT ME</span>
              <span>02 / 02</span>
            </div>
            <p className="mt-[5%] text-[clamp(12px,3.2cqw,15.5px)]/[1.7] text-[#1f2a40]">
              프론트엔드와 백엔드를 모두 경험하며 웹 서비스를 개발해 왔습니다.
              <br />
              변화하는 기술 속에서 즐거운 마음으로 새로움을 받아들이며 꾸준히 발전해 나가고 싶습니다.
            </p>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e6ebf2] pt-[4.5%]">
              <a
                href={email.href}
                className="flex min-w-0 items-center gap-2 text-[clamp(11.5px,3cqw,14.5px)] text-[#14203a] hover:text-[#1d4ed8] hover:underline"
              >
                <IconMail />
                <span className="truncate">{email.value}</span>
              </a>
              {flipButton('앞면 보기')}
            </div>
          </section>
        </div>
      </div>

      {/* 화면 안내 문구는 두지 않고, 뒤집힌 면만 화면 낭독기에 알린다 */}
      <p aria-live="polite" className="sr-only">
        {touched ? (back ? '명함 뒷면' : '명함 앞면') : ''}
      </p>
    </div>
  );
}
