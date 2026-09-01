'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from './Button';
import { Container } from './Section';
import { BROWSE_JOBS_URL, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // A plain window event rather than prop-drilling or context — the sticky
  // mobile CTA (a sibling under layout.tsx, not a descendant) needs to know
  // the drawer is open so it can hide itself; this is the simplest link
  // between two components with no shared parent to lift state into.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('w2w:menu-toggle', { detail: open }));
  }, [open]);

  // Lock page scroll behind the open drawer, move focus in, and return it
  // to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      // Simple focus trap: keep Tab cycling within the drawer.
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        'w2w-navbar fixed inset-x-0 top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur-xl transition-shadow duration-300',
        scrolled && 'shadow-[0_12px_35px_rgba(15,35,75,0.07)]',
      )}
    >
      <Container size="wide">
        <nav className="flex h-16 items-center justify-between md:h-[84px]" aria-label="Primary">
          <div className="flex items-center gap-5">
            <Logo />
            <span className="hidden border-l border-ink-200 pl-5 text-xs font-medium leading-5 text-ink-500 xl:block">
              Driver &amp; delivery<br />opportunities across the U.S.
            </span>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-4 py-2.5 text-[15px] font-semibold text-ink-700 transition hover:bg-electric-50 hover:text-electric-800"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <span className="h-7 w-px bg-ink-200" aria-hidden />
            <Button
              href={BROWSE_JOBS_URL}
              external
              size="md"
              withArrow
              data-cta="navbar_find_jobs"
              className="min-w-[142px]"
            >
              Browse jobs
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition hover:bg-ink-100 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                  <X className="h-5 w-5" aria-hidden />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                  <Menu className="h-5 w-5" aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="w2w-nav-backdrop md:hidden"
            />
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w2w-nav-drawer md:hidden"
            >
              <ul className="w2w-nav-drawer__links">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.href}>
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                      <span aria-hidden>0{index + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="w2w-nav-drawer__cta">
                <Button
                  href={BROWSE_JOBS_URL}
                  external
                  size="lg"
                  withArrow
                  className="w-full"
                  data-cta="mobile_nav_find_jobs"
                  onClick={() => setOpen(false)}
                >
                  Browse open jobs
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
