import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownToLine, ArrowDownRight, ArrowUpRight, MousePointerClick } from 'lucide-react';
import { PhoneFrame } from '@/components/phone/PhoneFrame';
import { PhoneHome } from '@/components/phone/screens/PhoneHome';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const float = (delay = 0, distance = 10) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
        };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-night">
      {/* backdrop: blueprint grid + brand glows */}
      <div className="bg-grid-dark mask-fade-b absolute inset-0" aria-hidden />
      <motion.div style={{ y: glowY }} className="absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-r from-gradient-from/40 to-gradient-to/40 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 size-[480px] rounded-full bg-hero-to/40 blur-[160px]" />
        <div className="absolute right-[-160px] bottom-[-80px] size-[420px] rounded-full bg-brand/25 blur-[160px]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 pt-36 pb-24 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:pt-44 lg:pb-28">
        {/* copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-4 pl-2.5 text-[12px] font-semibold text-white/75">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-good opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-good" />
              </span>
              Open beta · now on Android
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 max-w-xl text-[2.75rem] leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-6xl lg:text-[4.2rem]"
          >
            Payments, made <span className="text-brand-gradient">closer.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-[15.5px] leading-relaxed font-medium text-pretty text-white/60 sm:text-lg"
          >
            NearbyPay is the payments app built around people, not accounts. Send money to a
            Cashtag, receive with a QR code, and see every naira clearly — even on days the
            network isn&apos;t.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#download"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_16px_40px_-12px_rgba(61,102,247,0.75)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <ArrowDownToLine size={17} className="transition-transform duration-200 group-hover:translate-y-0.5" />
              Get the App
            </a>
            <a
              href="#showcase"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-bold text-white/85 transition-colors hover:border-white/30 hover:text-white"
            >
              See it in action
              <MousePointerClick size={16} className="text-brand-light transition-transform duration-200 group-hover:scale-110" />
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-7 text-[13px] font-medium text-white/40">
            Free on Android · App Store &amp; Google Play coming soon
          </motion.p>
        </motion.div>

        {/* phone + floating transaction chips */}
        <div className="relative mx-auto lg:mx-0 lg:justify-self-end">
          <motion.div
            style={reduceMotion ? undefined : { y: phoneY }}
            initial={{ opacity: 0, y: 56, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="relative"
          >
            <motion.div {...float(0, 9)}>
              <PhoneFrame>
                <PhoneHome />
              </PhoneFrame>
            </motion.div>

            {/* received chip */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
              className="absolute top-24 -right-6 sm:-right-10"
            >
              <motion.div
                {...float(0.6, 8)}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] py-2.5 pr-4 pl-3 shadow-[0_20px_50px_-20px_rgba(7,6,31,0.9)] backdrop-blur-xl"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-good-tint">
                  <ArrowDownRight size={15} className="text-good" />
                </span>
                <span>
                  <span className="block text-[12.5px] font-bold text-white">+₦15,000</span>
                  <span className="block text-[10.5px] font-medium text-white/50">from @chiamaka</span>
                </span>
              </motion.div>
            </motion.div>

            {/* sent chip */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.25, ease: EASE }}
              className="absolute bottom-14 -left-4 sm:-left-16 lg:-left-28"
            >
              <motion.div
                {...float(1.4, 8)}
                className="hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] py-2.5 pr-4 pl-3 shadow-[0_20px_50px_-20px_rgba(7,6,31,0.9)] backdrop-blur-xl sm:flex"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-gradient-from to-gradient-to">
                  <ArrowUpRight size={15} className="text-white" />
                </span>
                <span>
                  <span className="block text-[12.5px] font-bold text-white">Sent to @tunde</span>
                  <span className="block text-[10.5px] font-medium text-white/50">₦8,500 · Instant</span>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
