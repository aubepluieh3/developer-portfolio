import Link from 'next/link';

// Home 은 다음 단계에서 구현한다. 프로토타입에서는 상세 페이지로 가는 링크만 둔다.
export default function Home() {
  return (
    <main className="mx-auto max-w-[1280px] px-5 py-20 md:px-8">
      <p className="text-sm text-meta">프로토타입</p>
      <h1 className="mt-3 text-[28px]/[36px] font-bold">프로젝트</h1>
      <ul className="mt-8 border-t border-line">
        <li className="border-b border-line py-5">
          <Link href="/projects/contract-billing" className="text-lg font-semibold text-link hover:underline">
            선불형 기업 요금제 개발
          </Link>
        </li>
      </ul>
    </main>
  );
}
