import { cn } from '@/lib/cn';
import logoTile from '@/assets/brand/logo-tile-256.webp';

interface LogoProps {
  /** 'light' = for dark backgrounds, 'dark' = for light backgrounds */
  tone?: 'light' | 'dark';
  className?: string;
  /** Hide the wordmark and show only the mark */
  markOnly?: boolean;
}

/** The real NearbyPay app icon in a rounded tile + Montserrat wordmark. */
export function Logo({ tone = 'light', className, markOnly = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src={logoTile}
        alt="NearbyPay logo"
        className="h-8 w-8 rounded-[10px] object-cover shadow-[0_2px_10px_rgba(46,69,244,0.35)]"
        width={32}
        height={32}
      />
      {!markOnly && (
        <span
          className={cn(
            'text-[17px] font-bold tracking-tight',
            tone === 'light' ? 'text-white' : 'text-ink',
          )}
        >
          NearbyPay
        </span>
      )}
    </span>
  );
}
