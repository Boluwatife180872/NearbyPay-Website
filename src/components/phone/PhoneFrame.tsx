import type { ReactNode } from 'react';
import { BatteryFull, Wifi } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Device chrome for the website's phone mockups. The screens rendered inside
 * are 1:1 CSS replicas of the real NearbyPayV2 screens (same colors, copy and
 * layout as src/components in the app).
 */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative w-[290px] select-none', className)}>
      {/* side buttons */}
      <div className="absolute top-[104px] -right-[2.5px] h-14 w-[3px] rounded-full bg-[#1b1a33]" />
      <div className="absolute top-[168px] -right-[2.5px] h-9 w-[3px] rounded-full bg-[#1b1a33]" />
      <div className="absolute top-[92px] -left-[2.5px] h-10 w-[3px] rounded-full bg-[#1b1a33]" />

      <div className="rounded-[3rem] border-[7px] border-[#0d0c22] bg-[#0d0c22] shadow-[0_40px_80px_-24px_rgba(7,6,31,0.55),0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative aspect-[9/19.2] w-full overflow-hidden rounded-[2.45rem] bg-page">
          {/* dynamic island */}
          <div className="absolute top-[9px] left-1/2 z-20 h-[21px] w-[82px] -translate-x-1/2 rounded-full bg-[#0d0c22]" />
          {children}
        </div>
      </div>
    </div>
  );
}

/** iOS-style status bar; `tone` follows the surface underneath. */
export function StatusBar({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        'relative z-10 flex items-center justify-between px-6 pt-[11px] text-[10px] font-semibold',
        tone === 'light' ? 'text-white' : 'text-ink',
      )}
    >
      <span className="tracking-wide">9:41</span>
      <span className="flex items-center gap-1">
        {/* signal bars */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
          <rect x="0" y="6" width="2.4" height="4" rx="0.8" />
          <rect x="3.8" y="4" width="2.4" height="6" rx="0.8" />
          <rect x="7.6" y="2" width="2.4" height="8" rx="0.8" />
          <rect x="11.4" y="0" width="2.4" height="10" rx="0.8" opacity="0.35" />
        </svg>
        <Wifi size={11} strokeWidth={2.6} />
        <BatteryFull size={15} strokeWidth={2} />
      </span>
    </div>
  );
}

/** Blue verified tick used next to the user's name in-app. */
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-[11px] items-center justify-center rounded-full bg-brand',
        className,
      )}
    >
      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 13l4 4L19 7"
          stroke="white"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Gradient avatar with initials — mirrors the in-app avatar fallback. */
export function InitialAvatar({
  initials,
  size = 36,
  className,
}: {
  initials: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gradient-from to-gradient-to font-bold text-white',
        className,
      )}
    >
      {initials}
    </span>
  );
}
