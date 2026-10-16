// 구분선 없이 여백으로 분리하고, 가운데 한 줄만 둔다.
// 연락처(GitHub·이메일)는 공개 범위가 정해지면 추가한다.
export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-center px-5 text-[13px] text-meta md:px-8">
        <p>© 2026 SOO</p>
      </div>
    </footer>
  );
}
