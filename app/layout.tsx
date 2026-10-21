import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: '포트폴리오',
  description: '풀스택 개발자 포트폴리오',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen bg-white text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
