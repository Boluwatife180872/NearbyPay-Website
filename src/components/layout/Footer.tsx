import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { navLinks, site } from '@/site-config';

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [...navLinks.map((l) => ({ label: l.label, href: l.href })), { label: 'Download', href: '#download' }],
  },
  {
    title: 'Account',
    links: [
      // Password-reset emails point at /reset-password; keep it reachable from here too.
      { label: 'Reset password', href: '/reset-password' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-promo-to">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed font-medium text-white/50">
              {site.description}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11.5px] font-semibold text-white/60">
              <span className="size-1.5 rounded-full bg-good" />
              Available on Android · iOS coming soon
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold tracking-[0.2em] text-white/35 uppercase">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) =>
                  link.href.startsWith('/') ? (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[13.5px] font-semibold text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] font-semibold text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/35 uppercase">Support</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={13} />
                  {site.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href="#top"
                  className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-white"
                >
                  Back to top <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center">
          <p className="text-[12.5px] font-medium text-white/35">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-[12.5px] font-medium text-white/35">Made for Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}
