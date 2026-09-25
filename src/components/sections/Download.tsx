import { Apple, Download as DownloadIcon, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/site-config';
import phoneCoins from '@/assets/brand/phone-coins-3d.webp';

export function Download() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="download" className="relative scroll-mt-24 overflow-hidden bg-promo-to py-24 sm:py-32">
      <div className="bg-grid-dark absolute inset-0 opacity-50" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_45%,rgba(46,69,244,0.22),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="text-xs font-bold tracking-[0.22em] text-brand-light uppercase">
              Get NearbyPay
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              Your people are one <span className="text-brand-gradient">tap</span> away.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed font-medium text-pretty text-white/60 sm:text-base">
              NearbyPay is rolling out on Android first. Grab the APK, install it, and start
              sending money the closer way.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {site.apkUrl ? (
                <a
                  href={site.apkUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_16px_40px_-12px_rgba(61,102,247,0.75)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <DownloadIcon size={17} />
                  Download APK
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="The first public APK will be linked here"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white/60 ring-1 ring-white/15 ring-inset"
                >
                  <DownloadIcon size={17} />
                  APK coming soon
                </button>
              )}
            </div>
            {!site.apkUrl && (
              <p className="mt-3 text-[13px] font-medium text-white/40">
                The first public build will be linked right here.
              </p>
            )}
          </Reveal>

          {/* store badges — honest "coming soon" state */}
          <Reveal delay={0.16}>
            <p className="mt-10 mb-3 text-[13px] font-semibold text-white/45">
              Coming soon to the App Store and Google Play
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 opacity-75 transition-opacity hover:opacity-100">
                <Apple size={22} className="text-white" />
                <span>
                  <span className="block text-[9px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    Coming soon
                  </span>
                  <span className="block text-[15px] font-bold text-white">App Store</span>
                </span>
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 opacity-75 transition-opacity hover:opacity-100">
                <Play size={20} className="fill-white text-white" />
                <span>
                  <span className="block text-[9px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    Coming soon
                  </span>
                  <span className="block text-[15px] font-bold text-white">Google Play</span>
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* 3D art from the app's promo card */}
        <Reveal delay={0.12} className="relative mx-auto lg:mx-0">
          <div
            aria-hidden
            className="absolute inset-4 rounded-full bg-gradient-to-br from-gradient-from/30 to-gradient-to/30 blur-3xl"
          />
          <img
            src={phoneCoins}
            alt="Illustration of a phone with NearbyPay on screen, surrounded by naira coins"
            loading="lazy"
            className={`relative mx-auto w-full max-w-[420px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)] ${
              reduceMotion ? '' : 'animate-[float_7s_ease-in-out_infinite]'
            }`}
          />
        </Reveal>
      </div>
    </section>
  );
}
