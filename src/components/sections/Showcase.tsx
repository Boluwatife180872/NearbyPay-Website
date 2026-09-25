import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownToLine,
  Check,
  Clock,
  House,
  QrCode,
  ScanLine,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { PhoneFrame } from '@/components/phone/PhoneFrame';
import { PhoneHome } from '@/components/phone/screens/PhoneHome';
import { PhoneSend } from '@/components/phone/screens/PhoneSend';
import { PhoneReceive } from '@/components/phone/screens/PhoneReceive';
import { PhoneHistory } from '@/components/phone/screens/PhoneHistory';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

type ScreenKey = 'home' | 'send' | 'receive' | 'history';

interface ScreenDef {
  key: ScreenKey;
  tab: string;
  icon: LucideIcon;
  title: string;
  copy: string;
  points: string[];
}

const SCREENS: ScreenDef[] = [
  {
    key: 'home',
    tab: 'Home',
    icon: House,
    title: 'Your money at a glance',
    copy: 'Balance, quick actions and the people you pay most — all on one calm dashboard that opens in under a second.',
    points: [
      'Total and available balance, always in view',
      'Send, Receive, History and More, one tap away',
      'The last three transactions, no digging required',
    ],
  },
  {
    key: 'send',
    tab: 'Send',
    icon: Send,
    title: 'Send to any Cashtag',
    copy: 'Type an @tag, pick an amount, confirm with your PIN. Money moves instantly — and lands straight in the recipient’s Cashtag.',
    points: [
      'Pay nearby tags or any Nigerian bank account',
      'Quick amounts for the sums you send on repeat',
      'Scan a recipient’s QR instead of typing their tag',
    ],
  },
  {
    key: 'receive',
    tab: 'Receive',
    icon: QrCode,
    title: 'One QR, every payment',
    copy: 'Your Cashtag and QR code are your payment identity. Show your screen, share your link — get paid without reciting digits.',
    points: [
      'A personal QR code anyone can scan to pay you',
      'Cashtag link that works on any chat app',
      'Share straight to WhatsApp, Telegram and more',
    ],
  },
  {
    key: 'history',
    tab: 'History',
    icon: Clock,
    title: 'A history you can actually read',
    copy: 'Every transaction, grouped by day, searchable and filterable. Tap any row for status, channel and reference.',
    points: [
      'Search and filter by All, Sent or Received',
      'Grouped by day like a chat history',
      'Full details and receipt for every payment',
    ],
  },
];

export function Showcase() {
  const [active, setActive] = useState<ScreenKey>('home');
  const reduceMotion = useReducedMotion();
  const screen = SCREENS.find((s) => s.key === active) ?? SCREENS[0]!;

  return (
    <section id="showcase" className="relative scroll-mt-24 bg-page py-24 sm:py-32">
      <div className="bg-grid-light mask-fade-b absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Product tour"
          title={
            <>
              The whole app, <span className="text-brand-gradient-light">one glance.</span>
            </>
          }
          description="These are the real NearbyPay screens. Tap through the flow you'd use every day."
        />

        {/* screen switcher — 4 equal columns on mobile, pill row on desktop */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div className="grid w-full max-w-md grid-cols-4 gap-1 rounded-2xl border border-line bg-white p-1.5 shadow-[0_12px_32px_-18px_rgba(10,30,60,0.35)] sm:inline-flex sm:w-auto sm:rounded-full">
            {SCREENS.map(({ key, tab, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                aria-pressed={active === key}
                className={cn(
                  'flex items-center justify-center gap-1.5 rounded-xl px-1 py-2.5 text-[12px] font-bold whitespace-nowrap transition-all duration-200 sm:rounded-full sm:px-5 sm:py-2 sm:text-[13px]',
                  active === key
                    ? 'bg-gradient-to-r from-gradient-from to-gradient-to text-white shadow-[0_8px_20px_-8px_rgba(46,69,244,0.7)]'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                <Icon size={14} className="shrink-0" />
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* phone */}
          <Reveal className="mx-auto">
            <div className="relative">
              <div className="absolute inset-8 -z-10 rounded-full bg-gradient-to-br from-gradient-from/25 to-gradient-to/25 blur-3xl" aria-hidden />
              <PhoneFrame className="max-w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 26, rotateY: 8 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -26, rotateY: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    {active === 'home' && <PhoneHome />}
                    {active === 'send' && <PhoneSend />}
                    {active === 'receive' && <PhoneReceive />}
                    {active === 'history' && <PhoneHistory />}
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </Reveal>

          {/* description */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-brand uppercase">
                  <ScanLine size={14} /> Screen {SCREENS.findIndex((s) => s.key === active) + 1} of 4
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-[2rem] sm:leading-[1.2]">
                  {screen.title}
                </h3>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed font-medium text-ink-soft sm:text-base">
                  {screen.copy}
                </p>
                <ul className="mt-7 space-y-3.5">
                  {screen.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-tint">
                        <Check size={11} className="text-brand" strokeWidth={3} />
                      </span>
                      <span className="text-[14.5px] font-semibold text-ink/85">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* secondary floating phones hint */}
        <Reveal delay={0.15} className="mt-16 hidden justify-center sm:flex">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft/80">
            <ArrowDownToLine size={14} className="text-brand" />
            Every screen ships in light &amp; dark mode
          </p>
        </Reveal>
      </div>
    </section>
  );
}
