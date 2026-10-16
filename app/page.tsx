import Link from 'next/link';
import { getProjects } from '@/content/projects';

// 메인: Editorial Project List. 썸네일·카드·그림자 없이 번호·타이포·여백으로 구성한다.
export default function Home() {
  const projects = getProjects();

  return (
    <main id="projects" className="mx-auto max-w-[1280px] px-5 pt-16 pb-28 md:px-8 md:pt-24">
      <div className="flex items-baseline justify-between border-b border-ink pb-4">
        <h1 className="text-[28px]/[36px] font-bold text-ink md:text-[36px]/[44px]">프로젝트</h1>
        <span className="font-mono text-[13px] text-meta">{String(projects.length).padStart(2, '0')}</span>
      </div>

      <ol>
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/projects/${project.slug}`}
              data-project-row
              className="group relative -mx-5 grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 px-5 py-8 transition-colors duration-150 hover:bg-tint focus-visible:bg-tint md:-mx-6 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-x-6 md:px-6 md:py-10"
            >
              <span className="pt-1 font-mono text-[14px] font-medium text-meta md:pt-1.5">{String(i + 1).padStart(2, '0')}</span>

              <div className="min-w-0 pr-8 md:pr-0">
                <h2 className="text-[20px]/[29px] font-semibold text-ink transition-colors duration-150 group-hover:text-link md:text-[26px]/[36px]">
                  {project.title}
                </h2>
                <p className="mt-2.5 max-w-[680px] text-[15px]/[26px] text-sub md:text-[16px]/[28px]">{project.listing.description}</p>
                <p className="mt-4 text-[13px]/[21px] text-meta">
                  <span className="mr-2 font-mono text-ink">{project.listing.year}</span>
                  {project.listing.stack.join(' · ')}
                </p>
                {project.listing.status && (
                  <p className="mt-2 text-[13px]/[20px] text-sub">
                    <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-edge" />
                    {project.listing.status}
                  </p>
                )}
              </div>

              <span
                aria-hidden
                className="absolute top-8 right-5 text-[20px] leading-none text-meta transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-link motion-reduce:transform-none md:static md:pt-1.5 md:text-[24px]"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
