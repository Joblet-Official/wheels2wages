import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Building2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { getAllJobs } from '@/lib/jobs';
import { BROWSE_JOBS_URL } from '@/lib/constants';
import '@/components/FindJobs.css';

export const metadata: Metadata = {
  title: 'Find Jobs',
  description:
    'Browse current open roles pulled live from the job feed. Free for applicants, apply directly with the employer.',
  alternates: { canonical: '/find-jobs' },
};

// Keep the rendered list in step with the feed's own refresh cadence.
export const revalidate = 3600;

const PAGE_SIZE = 12;

function formatPosted(postedAt: string | null): string | null {
  if (!postedAt) return null;
  // Feed dates look like "2026-09-17 13:08:39.283 UTC" — take the date part
  // and format it without pulling in a date library.
  const parsed = new Date(postedAt.replace(' UTC', 'Z').replace(' ', 'T'));
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Windowed page list: always show first, last, and the current page with its
 *  immediate neighbours; collapse the rest into 'gap' markers. */
function paginationItems(current: number, total: number): Array<number | 'gap'> {
  const items: Array<number | 'gap'> = [];
  for (let page = 1; page <= total; page += 1) {
    const isEdge = page === 1 || page === total;
    const isNearCurrent = page >= current - 1 && page <= current + 1;
    if (isEdge || isNearCurrent) {
      items.push(page);
    } else if (items[items.length - 1] !== 'gap') {
      items.push('gap');
    }
  }
  return items;
}

type FindJobsPageProps = {
  searchParams?: { page?: string };
};

export default async function FindJobsPage({ searchParams }: FindJobsPageProps) {
  const jobs = await getAllJobs();
  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));

  const requestedPage = Number.parseInt(searchParams?.page ?? '1', 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageJobs = jobs.slice(start, start + PAGE_SIZE);
  const hrefFor = (page: number) => (page === 1 ? '/find-jobs' : `/find-jobs?page=${page}`);

  return (
    <>
      <section className="w2w-jobs-hero" aria-labelledby="find-jobs-title">
        <div className="w2w-jobs-shell">
          <span className="w2w-jobs-kicker">Open roles</span>
          <h1 id="find-jobs-title">Find your next job.</h1>
          <p>
            A live look at current openings pulled straight from the job feed.
            Each role opens the employer&apos;s own application, free for
            applicants, no account required.
          </p>
        </div>
      </section>

      <section className="w2w-jobs-list" aria-label="Open roles">
        <div className="w2w-jobs-shell">
          {jobs.length > 0 ? (
            <>
              <div className="w2w-jobs-grid">
                {pageJobs.map((job) => {
                  const posted = formatPosted(job.postedAt);
                  return (
                    <a
                      key={job.id}
                      className="w2w-job-card"
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w2w-job-card__top">
                        <span className="w2w-job-card__company">
                          <Building2 aria-hidden />
                          {job.company || 'Employer'}
                        </span>
                        {job.category && (
                          <span className="w2w-job-card__category">{job.category}</span>
                        )}
                      </div>

                      <h2 className="w2w-job-card__title">{job.title}</h2>

                      {job.location && (
                        <span className="w2w-job-card__location">
                          <MapPin aria-hidden />
                          {job.location}
                        </span>
                      )}

                      <div className="w2w-job-card__foot">
                        <span className="w2w-job-card__cta">
                          View role <ArrowUpRight aria-hidden />
                        </span>
                        {posted && (
                          <span className="w2w-job-card__posted">Posted {posted}</span>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav className="w2w-jobs-pagination" aria-label="Pagination">
                  {currentPage > 1 ? (
                    <Link
                      className="w2w-jobs-pagination__nav"
                      href={hrefFor(currentPage - 1)}
                      rel="prev"
                      aria-label="Previous page"
                    >
                      <ChevronLeft aria-hidden />
                    </Link>
                  ) : (
                    <span
                      className="w2w-jobs-pagination__nav w2w-jobs-pagination__nav--disabled"
                      aria-hidden
                    >
                      <ChevronLeft aria-hidden />
                    </span>
                  )}

                  {paginationItems(currentPage, totalPages).map((item, index) =>
                    item === 'gap' ? (
                      <span
                        className="w2w-jobs-pagination__gap"
                        key={`gap-${index}`}
                        aria-hidden
                      >
                        …
                      </span>
                    ) : item === currentPage ? (
                      <span key={item} aria-current="page">
                        {item}
                      </span>
                    ) : (
                      <Link key={item} href={hrefFor(item)} aria-label={`Page ${item}`}>
                        {item}
                      </Link>
                    ),
                  )}

                  {currentPage < totalPages ? (
                    <Link
                      className="w2w-jobs-pagination__nav"
                      href={hrefFor(currentPage + 1)}
                      rel="next"
                      aria-label="Next page"
                    >
                      <ChevronRight aria-hidden />
                    </Link>
                  ) : (
                    <span
                      className="w2w-jobs-pagination__nav w2w-jobs-pagination__nav--disabled"
                      aria-hidden
                    >
                      <ChevronRight aria-hidden />
                    </span>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="w2w-jobs-empty">
              <p>
                We couldn&apos;t load open roles right now. Please try again
                shortly, or{' '}
                <a href={BROWSE_JOBS_URL} target="_blank" rel="noopener noreferrer">
                  browse jobs on Joblet
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
