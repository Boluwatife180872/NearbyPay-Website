import { ArrowRight, ArrowDownToLine, Bell, Eye, History, House, Send, User, Ellipsis } from 'lucide-react';
import wallet3d from '@/assets/brand/wallet-3d.webp';
import { InitialAvatar, StatusBar, VerifiedBadge } from '../PhoneFrame';

const QUICK_ACTIONS = [
  { id: 'send', label: 'Send', icon: Send },
  { id: 'receive', label: 'Receive', icon: ArrowDownToLine },
  { id: 'history', label: 'History', icon: History },
  { id: 'more', label: 'More', icon: Ellipsis },
] as const;

const RECENT = [
  { name: 'Chiamaka E.', date: 'Today, 09:12', amount: '+₦15,000', received: true },
  { name: 'Tunde Bakare', date: 'Today, 08:47', amount: '-₦8,500', received: false },
] as const;

/** Replica of the app's Home dashboard (src/components/home-dashboard.tsx). */
export function PhoneHome() {
  return (
    <div className="flex h-full flex-col bg-page">
      {/* Dark indigo hero — HERO_STOPS #1C1A55 → #2F2882 */}
      <div className="relative shrink-0 overflow-hidden rounded-b-[22px] bg-gradient-to-br from-hero-from to-hero-to pb-3.5">
        <StatusBar tone="light" />

        <div className="flex items-center justify-between px-4 pt-2.5">
          <div className="flex items-center gap-1.5">
            <img src={wallet3d} alt="" className="size-6 object-contain" />
            <span className="text-[12.5px] font-bold text-white">NearbyPay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-white/10">
              <Bell size={12} className="text-white" />
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-bad" />
            </span>
            <InitialAvatar initials="CO" size={27} />
          </div>
        </div>

        <div className="px-4 pt-2.5">
          <p className="text-[10px] font-medium text-white/70">Good morning,</p>
          <p className="flex items-center gap-1.5 pt-0.5 text-[15px] font-bold text-white">
            Chinedu Okafor
            <VerifiedBadge />
          </p>
          <p className="pt-0.5 text-[9px] font-medium text-white/60">Send. Receive. Stay Close.</p>
        </div>

        {/* Gradient balance card — GRADIENT_STOPS #3D66F7 → #4634EE */}
        <div className="relative mx-4 mt-2.5 overflow-hidden rounded-[16px] bg-gradient-to-br from-gradient-from to-gradient-to p-3">
          <img
            src={wallet3d}
            alt=""
            className="absolute top-1.5 right-1.5 w-12 opacity-90 mix-blend-screen"
          />
          {/* twinkling stars */}
          {[
            { left: '62%', top: '22%', size: 3, delay: '0s' },
            { left: '74%', top: '48%', size: 2.5, delay: '1.1s' },
            { left: '55%', top: '62%', size: 2, delay: '2.2s' },
            { left: '84%', top: '30%', size: 3.5, delay: '1.7s' },
          ].map((s, i) => (
            <span
              key={i}
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
              className="absolute animate-pulse rounded-full bg-white/90 blur-[0.5px]"
            />
          ))}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold text-white/75">Total Balance</span>
            <Eye size={11} className="text-white/80" />
          </div>
          <p className="pt-0.5 text-[22px] font-bold tracking-tight text-white">₦245,680.75</p>
          <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-2">
            <div>
              <p className="text-[8px] font-medium text-white/60">Available Balance</p>
              <p className="text-[11px] font-semibold text-white">₦245,680.75</p>
            </div>
            <ArrowRight size={12} className="text-white/85" />
          </div>
        </div>
      </div>

      {/* Body on #EEF3FC */}
      <div className="flex-1 space-y-2 overflow-hidden px-4 pt-2.5">
        {/* quick actions */}
        <div className="grid grid-cols-4 gap-1.5">
          {QUICK_ACTIONS.map(({ id, label, icon: Icon }) => (
            <div
              key={id}
              className="flex flex-col items-center gap-1.5 rounded-[13px] border border-line bg-white py-2"
            >
              <span className="flex size-7 items-center justify-center rounded-[9px] bg-tint">
                <Icon size={13} className="text-brand" />
              </span>
              <span className="text-[8px] font-semibold text-ink">{label}</span>
            </div>
          ))}
        </div>

        {/* promo card — PROMO_STOPS #101446 → #05081E */}
        <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-br from-promo-from via-promo-mid to-promo-to p-2.5">
          <span className="absolute -top-6 -right-5 size-20 rounded-full bg-brand/30 blur-2xl" />
          <img
            src={wallet3d}
            alt=""
            className="absolute -right-1 -bottom-2 w-14 opacity-95 mix-blend-screen"
          />
          <p className="text-[11.5px] leading-snug font-bold text-white">
            One App.
            <br />
            All Your People.
          </p>
          <p className="pt-1 text-[7.5px] leading-snug font-medium text-white/55">
            Send money, split bills,
            <br />
            collect payments and more.
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[7.5px] font-bold text-white">
            Explore NearbyPay <ArrowRight size={8} />
          </span>
        </div>

        {/* recent transactions */}
        <div>
          <div className="flex items-center justify-between pb-1.5">
            <p className="text-[11px] font-bold text-ink">Recent Transactions</p>
            <p className="text-[8.5px] font-semibold text-brand">See all</p>
          </div>
          <div className="space-y-1">
            {RECENT.map((tx) => (
              <div key={tx.name} className="flex items-center gap-2 border-b border-line/70 py-1.5 last:border-0">
                <span
                  className={`flex size-7 items-center justify-center rounded-[9px] ${
                    tx.received ? 'bg-good-tint' : 'bg-tint'
                  }`}
                >
                  <ArrowDownToLine size={12} className={tx.received ? 'text-good' : 'text-brand'} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9.5px] font-semibold text-ink">{tx.name}</p>
                  <p className="text-[7.5px] font-medium text-ink-soft">{tx.date}</p>
                </div>
                <p className={`text-[9.5px] font-bold ${tx.received ? 'text-good' : 'text-bad'}`}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom nav with floating Send FAB */}
      <div className="relative z-10 flex shrink-0 items-center justify-around border-t border-line bg-white px-2 pt-2 pb-3.5">
        <NavTab icon={House} label="Home" active />
        <NavTab icon={ArrowDownToLine} label="Receive" />
        <span className="w-10" />
        <NavTab icon={History} label="History" />
        <NavTab icon={User} label="Profile" />
        <span className="absolute -top-[22px] left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gradient-from to-gradient-to shadow-[0_10px_20px_-6px_rgba(46,69,244,0.6)] ring-[5px] ring-page">
          <Send size={16} className="translate-x-[1px] text-white" />
        </span>
      </div>
    </div>
  );
}

function NavTab({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof House;
  label: string;
  active?: boolean;
}) {
  return (
    <span className={`flex flex-col items-center gap-0.5 ${active ? 'text-brand' : 'text-[#8a99b5]'}`}>
      <Icon size={15} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[7px] font-semibold">{label}</span>
    </span>
  );
}
