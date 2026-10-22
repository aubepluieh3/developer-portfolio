import type { Metadata } from 'next';
import { IdentityOrbit } from '@/components/about/identity-orbit';
import { PrintProfile } from '@/components/about/print-profile';
import { profile } from '@/content/profile';

// 소개 페이지. 웹에서는 궤도 위 기술 카드와 명함 인터랙션, 인쇄에서는 평면 소개로 출력한다.
export const metadata: Metadata = { title: '소개 · 포트폴리오', description: `${profile.name} · ${profile.title}` };

export default function AboutPage() {
  return (
    <main>
      <IdentityOrbit profile={profile} />
      <div className="mx-auto max-w-[1120px] px-5">
        <PrintProfile profile={profile} />
      </div>
    </main>
  );
}
