import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navLinks } from '@/site-config';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <motion.nav
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-colors duration-300 sm:px-5',
          scrolled || open
            ? 'border-white/10 bg-night/85 shadow-[0_16px_40px_-16px_rgba(7,6,31,0.8)] backdrop-blur-xl'
            : 'border-white/5 bg-white/[0.03] backdrop-blur-md',
        )}
      >
        <a href="#top" aria-label="NearbyPay home">
          <Logo />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-white/65 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#download"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-4.5 py-2 text-[13px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(61,102,247,0.7)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
          >
            <ArrowDownToLine size={14} />
            Get the App
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-night/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-white/75 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gradient-from to-gradient-to px-4 py-3 text-[15px] font-bold text-white"
            >
              <ArrowDownToLine size={16} />
              Get the App
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
