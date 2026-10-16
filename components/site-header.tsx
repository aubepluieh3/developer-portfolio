import Link from 'next/link';

// 이름과 소개·연락처는 내용이 정해지면 추가한다. 내용 없는 빈 링크는 만들지 않는다.
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
        </nav>
      </div>
    </header>
  );
}
