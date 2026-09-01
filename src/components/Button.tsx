import Link from 'next/link';
import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white whitespace-nowrap select-none hover:-translate-y-0.5';

const variants: Record<Variant, string> = {
  primary:
    'bg-electric-600 text-white hover:bg-electric-700 active:bg-electric-800',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50',
  ghost:
    'text-ink-900 hover:bg-ink-100',
  dark:
    'bg-ink-900 text-white hover:bg-ink-800',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[15px] sm:h-14 sm:px-8 sm:text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  'data-cta'?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>;

type ButtonProps = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

type Props = AnchorProps | ButtonProps;

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      withArrow = false,
      className,
      children,
    } = props;

    const cls = cn(base, variants[variant], sizes[size], className);

    const inner = (
      <>
        <span>{children}</span>
        {withArrow && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        )}
      </>
    );

    if ('href' in props && props.href) {
      const { href, external, variant: _v, size: _s, withArrow: _w, className: _c, children: _ch, ...rest } = props;
      // External link or hash anchor: render as <a>
      if (external || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={cn(cls, 'group')}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            {...rest}
          >
            {inner}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(cls, 'group')}
          {...rest}
        >
          {inner}
        </Link>
      );
    }

    const { variant: _v, size: _s, withArrow: _w, className: _c, children: _ch, ...rest } = props as ButtonProps;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(cls, 'group')}
        {...rest}
      >
        {inner}
      </button>
    );
  }
);
