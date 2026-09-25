import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  Copy,
  Link2,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Send,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import logoMark from '@/assets/brand/logo-mark.webp';
import { InitialAvatar, PhoneTabBar, StatusBar } from '../PhoneFrame';
import { QrPattern } from '@/components/ui/QrPattern';

const SHARE_TARGETS = [
  { icon: MessageCircle, bg: 'bg-[#22c55e]', label: 'WhatsApp' },
  { icon: Send, bg: 'bg-[#38bdf8]', label: 'Telegram' },
  { icon: MessageSquare, bg: 'bg-[#10b981]', label: 'Messages' },
  { icon: MoreHorizontal, bg: 'bg-[#1e293b]', label: 'More' },
] as const;

/** Replica of the app's current Receive screen (src/components/screens/receive-screen.tsx). */
export function PhoneReceive() {
  return (
    <div className="flex h-full flex-col bg-page">
      <div className="shrink-0 px-4 pb-2.5">
        <StatusBar tone="dark" />
        <div className="flex items-center justify-between pt-2">
          <span className="flex size-7 items-center justify-center rounded-full border border-line bg-white">
            <ArrowLeft size={12} className="text-ink" />
          </span>
          <p className="text-[12px] font-bold text-ink">Receive Money</p>
          <span className="flex size-7 items-center justify-center rounded-full border border-line bg-white">
            <CircleHelp size={12} className="text-ink" />
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 pt-1">
        {/* main gradient QR card — GRADIENT_STOPS #3D66F7 → #4634EE */}
        <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-br from-gradient-from to-gradient-to p-3.5">
          {/* header: N emblem + wordmark + subtitle */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="flex size-[21px] items-center justify-center rounded-full bg-white/25">
                <svg width="11" height="11" viewBox="0 0 32 32" fill="none" aria-hidden>
                  <path
                    d="M10 22V10L22 22V10"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[14px] font-bold text-white">NearbyPay</span>
            </div>
            <p className="pt-1 text-center text-[8px] leading-snug font-medium text-white/85">
              Scan this QR code with NearbyPay to send to @chinedu
            </p>
          </div>

          {/* user tag badge */}
          <div className="mx-auto mt-2 flex w-max items-center gap-1.5 rounded-full bg-white/15 py-1 pr-2.5 pl-1">
            <InitialAvatar initials="CO" size={20} />
            <span>
              <span className="block text-[8.5px] leading-tight font-bold text-white">
                Chinedu Okafor
              </span>
              <span className="block text-[7.5px] leading-tight font-medium text-white/85">
                @chinedu
              </span>
            </span>
          </div>

          {/* QR with center logo badge */}
          <div className="relative mx-auto mt-2.5 w-max rounded-[14px] bg-white p-3">
            <QrPattern size={130} />
            <span className="absolute top-1/2 left-1/2 flex size-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[8px] border border-line bg-white shadow-sm">
              <img src={logoMark} alt="" className="size-[19px] object-contain" />
            </span>
          </div>

          {/* card action buttons */}
          <div className="mt-3 flex gap-2">
            <span className="flex h-[30px] flex-1 items-center justify-center gap-1.5 rounded-[10px] bg-white text-[9px] font-semibold text-[#101a5a]">
              <Copy size={11} /> Copy Cashtag
            </span>
            <span className="flex h-[30px] flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-white/35 bg-white/20 text-[9px] font-semibold text-white">
              <Share2 size={11} /> Share
            </span>
          </div>
        </div>

        {/* your cashtag link */}
        <p className="pt-2.5 pb-1.5 text-[10px] font-bold text-ink">Your Cashtag Link</p>
        <div className="flex items-center gap-2 rounded-[11px] border border-line bg-white px-2.5 py-2">
          <Link2 size={12} className="shrink-0 text-brand" />
          <span className="min-w-0 flex-1 truncate text-[8.5px] font-semibold text-ink">
            nearbypay.app/@chinedu
          </span>
          <Copy size={11} className="shrink-0 text-ink" />
        </div>

        {/* quick share */}
        <p className="pt-2.5 pb-1.5 text-[10px] font-bold text-ink">Quick Share</p>
        <div className="flex items-start justify-between px-1">
          {SHARE_TARGETS.map(({ icon: Icon, bg, label }) => (
            <span key={label} className="flex w-[46px] flex-col items-center gap-1">
              <span className={`flex size-[32px] items-center justify-center rounded-full ${bg}`}>
                <Icon size={13} className="text-white" />
              </span>
              <span className="text-[7px] font-semibold text-ink">{label}</span>
            </span>
          ))}
        </div>

        {/* info banner (partially below the fold, as in the app's scroll state) */}
        <div className="mt-2.5 flex items-center gap-2 rounded-[13px] border border-tint-strong bg-tint p-2">
          <span className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-tint-strong">
            <ShieldCheck size={13} className="text-brand" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[9px] font-bold text-ink">Receive Money</span>
            <span className="block truncate text-[7.5px] font-medium text-ink-soft">
              No fees. No stress. Just share and get paid.
            </span>
          </span>
          <ArrowRight size={12} className="shrink-0 text-brand" />
        </div>
      </div>

      <PhoneTabBar active="receive" />
    </div>
  );
}
