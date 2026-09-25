import { Radio } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import people from '@/assets/brand/people.webp';

export function WhyNearbyPay() {
  return (
    <section id="why" className="scroll-mt-24 overflow-hidden bg-page py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why NearbyPay"
            title="Built for the way Nigeria actually pays."
            className="max-w-none"
          />
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed font-medium text-ink-soft sm:text-base">
              <p>
                Bank apps crawl when the network is bad. USSD codes time out. And sending ₦5,000
                to your sibling shouldn&apos;t feel like filling out a form.
              </p>
              <p>
                NearbyPay flips the model: instead of accounts and digits, it&apos;s built around
                people. A Cashtag, a QR code, a tap — and every naira moves with a receipt, so you
                always know where it went.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 max-w-lg rounded-2xl border border-tint-strong bg-white p-5 shadow-[0_16px_40px_-28px_rgba(10,30,60,0.4)]">
              <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-brand uppercase">
                <Radio size={13} /> On the roadmap
              </p>
              <p className="mt-2 text-[14.5px] leading-relaxed font-semibold text-ink/90">
                Device-to-device transfers that keep working when the network doesn&apos;t — the
                &ldquo;Nearby&rdquo; in NearbyPay.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div
            aria-hidden
            className="absolute inset-6 -z-0 rounded-[2.5rem] bg-gradient-to-br from-tint via-white to-tint-strong"
          />
          <img
            src={people}
            alt="Two people holding their phones with NearbyPay on screen"
            loading="lazy"
            className="relative z-10 mx-auto w-full max-w-[520px] drop-shadow-[0_32px_48px_rgba(10,30,60,0.28)] [mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
