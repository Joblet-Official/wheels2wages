import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
};

export function Container({ children, className, size = 'default' }: ContainerProps) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8', widths[size], className)}>
      {children}
    </div>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-electric-200 bg-electric-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-electric-700">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-display text-ink-900">
        {title}
      </h2>
      {description && (
        <p className={cn('text-base sm:text-lg text-ink-500 max-w-2xl', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
