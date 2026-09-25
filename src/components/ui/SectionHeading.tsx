import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** 'light' = dark section (light text), 'dark' = light section (dark text) */
  tone?: 'light' | 'dark';
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p
        className={cn(
          'text-xs font-bold tracking-[0.22em] uppercase',
          tone === 'light' ? 'text-brand-light' : 'text-brand',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]',
          tone === 'light' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-[15px] leading-relaxed font-medium text-pretty sm:text-base',
            tone === 'light' ? 'text-white/60' : 'text-ink-soft',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
