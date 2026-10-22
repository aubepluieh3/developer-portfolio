/**
 * 소개 페이지 기술 카드의 로고. 외부 이미지 없이 단순화한 인라인 SVG로 그린다.
 * 장식이므로 모두 aria-hidden (카드 버튼에 기술명이 텍스트로 있다).
 */

const box = 'h-[22px] w-[22px] shrink-0 sm:h-[26px] sm:w-[26px]';

const ReactLogo = () => (
  <svg aria-hidden viewBox="0 0 32 32" className={box} fill="none" stroke="#149eca" strokeWidth="1.6">
    <ellipse cx="16" cy="16" rx="13" ry="5" />
    <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
    <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
    <circle cx="16" cy="16" r="2.4" fill="#149eca" stroke="none" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg aria-hidden viewBox="0 0 32 32" className={box}>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="#3178c6" />
    <text x="27" y="26.5" textAnchor="end" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13" fill="#fff">
      TS
    </text>
  </svg>
);

const JavaScriptLogo = () => (
  <svg aria-hidden viewBox="0 0 32 32" className={box}>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="#f7df1e" />
    <text x="27" y="26.5" textAnchor="end" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13" fill="#1a1a1a">
      JS
    </text>
  </svg>
);

const SpringLogo = () => (
  <svg aria-hidden viewBox="0 0 32 32" className={box}>
    <circle cx="16" cy="16" r="14" fill="#6db33f" />
    <path d="M9 23c-.6-7.4 4.6-13 14-13.6-.2 8.6-5.6 13.8-14 13.6Z" fill="#fff" />
    <path d="M9.5 22.5c3-3.4 6.4-6 10-8" stroke="#6db33f" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
);

const JavaLogo = () => (
  <svg aria-hidden viewBox="0 0 32 32" className={box} fill="none" strokeLinecap="round">
    <path d="M15 3.5c2.6 2.4-2.4 3.8 0 6.6M18.6 6c1.6 1.6-1.4 2.6.2 4.4" stroke="#e76f00" strokeWidth="1.6" />
    <path d="M8 14h15v4.5a6.5 6.5 0 0 1-6.5 6.5h-2A6.5 6.5 0 0 1 8 18.5Z" stroke="#5382a1" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M23 15.5h1.6a2.6 2.6 0 0 1 0 5.2H22.4" stroke="#5382a1" strokeWidth="1.6" />
    <path d="M6 28h19" stroke="#5382a1" strokeWidth="1.6" />
  </svg>
);

// 주황 별 모양 (공식 로고를 단순화)
const ClaudeLogo = () => (
  <svg aria-hidden viewBox="0 0 32 32" className={box} stroke="#d97757" strokeWidth="3" strokeLinecap="round">
    {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => (
      <line key={deg} x1="16" y1="16" x2="16" y2={i % 2 ? 4.5 : 2.5} transform={`rotate(${deg} 16 16)`} />
    ))}
  </svg>
);

export const TECH_LOGO = {
  react: ReactLogo,
  typescript: TypeScriptLogo,
  javascript: JavaScriptLogo,
  spring: SpringLogo,
  java: JavaLogo,
  claude: ClaudeLogo,
} as const;
