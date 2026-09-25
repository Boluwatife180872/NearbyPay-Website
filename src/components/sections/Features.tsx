import { Copy, Gift, History, Landmark, QrCode, Send, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { QrPattern } from '@/components/ui/QrPattern';
import type { ReactNode } from 'react';

function FeatureCard({
  icon: Icon,
  title,
  copy,
  visual,
  className,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] sm:p-8 ${className ?? ''}`}
    >
      <span
        aria-hidden
        className="absolute -top-16 -right-16 size-40 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 ring-1 ring-brand/25 ring-inset">
        <Icon size={20} className="text-brand-light" />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-2 max-w-md text-[14.5px] leading-relaxed font-medium text-white/55">{copy}</p>
      {visual}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 overflow-hidden bg-night py-24 sm:py-32">
      <div className="bg-grid-dark absolute inset-0 opacity-70" aria-hidden />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-gradient-from/25 to-gradient-to/25 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Features"
          title={
            <>
              Everything you need. <span className="text-brand-gradient">Nothing you don&apos;t.</span>
            </>
          }
          description="What&apos;s shipping in the app today — built for how money actually moves between people."
        />

        <div className="mt-16 grid gap-4 sm:gap-5 md:grid-cols-3">
          {/* Send — wide card with mini amount UI */}
          <Reveal className="md:col-span-2">
            <FeatureCard
              icon={Send}
              title="Send to any Cashtag"
              copy="Type an @tag or scan a QR, enter an amount, confirm with your PIN. Instant transfers — with a reference you can share."
              visual={
                <div className="mt-7 max-w-xs rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-center text-xl font-bold tracking-tight text-white">₦10,000.00</p>
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {['₦1,000', '₦2,000', '₦5,000', '₦10,000'].map((amount, i) => (
                      <span
                        key={amount}
                        className={`rounded-full py-1.5 text-center text-[10px] font-bold ${
                          i === 3 ? 'bg-gradient-to-r from-gradient-from to-gradient-to text-white' : 'bg-white/[0.06] text-white/50'
                        }`}
                      >
                        {amount}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gradient-from to-gradient-to text-[12.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(61,102,247,0.8)]">
                    <Send size={12} /> Send ₦10,000
                  </div>
                </div>
              }
            />
          </Reveal>

          {/* Receive — spans two rows so the grid stays full; QR centered in the slack */}
          <Reveal delay={0.08} className="md:row-span-2">
            <FeatureCard
              icon={QrCode}
              title="Receive with a QR"
              copy="Your QR code and Cashtag link are your payment identity. One scan, and the money finds you."
              visual={
                <div className="my-auto flex flex-col items-center pt-8 pb-1">
                  <div className="rounded-2xl bg-white p-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]">
                    <QrPattern size={140} />
                  </div>
                  <span className="mt-3.5 flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1.5 text-[11px] font-bold text-brand-light ring-1 ring-brand/30 ring-inset">
                    @chinedu <Copy size={10} />
                  </span>
                </div>
              }
            />
          </Reveal>

          <Reveal delay={0.05}>
            <FeatureCard
              icon={History}
              title="History you can read"
              copy="Grouped by day like a chat log, searchable, filterable — with full details on every row."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <FeatureCard
              icon={Landmark}
              title="Bank transfers too"
              copy="Not on NearbyPay yet? Send straight to any Nigerian bank account, right beside Cashtag transfers."
            />
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <FeatureCard
              icon={Gift}
              title="Daily check-in rewards"
              copy="Open the app, check in, spin — and collect a surprise reward just for showing up. Loyalty, made playful."
              visual={
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold text-white/80">
                    🔥 3-day streak
                  </span>
                  <span className="rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-3.5 py-1.5 text-[11px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(61,102,247,0.8)]">
                    Spin today&apos;s reward
                  </span>
                </div>
              }
            />
          </Reveal>

          <Reveal delay={0.2}>
            <FeatureCard
              icon={ShieldCheck}
              title="Locked with your PIN"
              copy="A personal PIN guards every send. Your sessions stay verified, your balance stays yours."
              visual={
                <div className="mt-6 flex items-center gap-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`size-2.5 rounded-full ${i < 3 ? 'bg-brand-light' : 'bg-white/15'}`}
                    />
                  ))}
                  <span className="pl-1 text-[11px] font-semibold text-white/40">PIN verified</span>
                </div>
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
