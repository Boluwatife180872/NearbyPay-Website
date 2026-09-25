import { AtSign, ScanLine, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  {
    n: '01',
    icon: AtSign,
    title: 'Claim your Cashtag',
    copy: 'Create a free account and pick the @tag your people will use to pay you — no account numbers to memorise.',
  },
  {
    n: '02',
    icon: ScanLine,
    title: 'Find your person',
    copy: 'Search their Cashtag, scan their QR code, or send straight to any Nigerian bank account.',
  },
  {
    n: '03',
    icon: Zap,
    title: 'Confirm. Done.',
    copy: 'Approve with your PIN and the money lands instantly — with a reference and receipt for every transfer.',
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Three steps. <span className="text-brand-gradient-light">That&apos;s the whole thing.</span>
            </>
          }
          description="NearbyPay strips payments down to the part that matters — the people you're paying."
        />

        <div className="relative mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
          {/* connector line (desktop) */}
          <div
            aria-hidden
            className="absolute top-[52px] right-[16%] left-[16%] hidden border-t-2 border-dashed border-tint-strong md:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12}>
              <div className="group relative h-full rounded-3xl border border-line bg-page-soft p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-tint-strong hover:shadow-[0_24px_48px_-24px_rgba(10,30,60,0.25)] sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-from to-gradient-to text-white shadow-[0_14px_28px_-10px_rgba(46,69,244,0.6)] transition-transform duration-300 group-hover:scale-105">
                    <step.icon size={22} />
                  </span>
                  <span className="text-[44px] leading-none font-extrabold tracking-tight text-tint-strong select-none">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed font-medium text-ink-soft">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
