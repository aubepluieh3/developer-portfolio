import Link from 'next/link';

// 이름과 메뉴 연결은 다음 단계에서 정한다. 프로토타입에서는 자리만 둔다.
export function SiteHeader() {
  return (
    <header data-sticky className="sticky top-0 z-30 h-14 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="text-[15px] font-bold text-ink">
          포트폴리오
        </Link>
        <nav aria-label="사이트 메뉴" className="flex gap-5 text-[14px] text-sub md:gap-7">
          <Link href="/" className="hover:text-ink">
            프로젝트
          </Link>
          <span aria-disabled="true" title="준비 중" className="cursor-default text-meta">
            이력서
          </span>
          <span aria-disabled="true" title="준비 중" className="cursor-default text-meta">
            연락처
          </span>
        </nav>
      </div>
    </header>
  );
}
