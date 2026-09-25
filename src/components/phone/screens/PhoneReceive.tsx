import { ArrowLeft, Copy, Link2, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { StatusBar } from '../PhoneFrame';
import { QrPattern } from '@/components/ui/QrPattern';

const SHARE_TARGETS = [
  { icon: MessageCircle, bg: 'bg-[#22c55e]', label: 'WhatsApp' },
  { icon: Send, bg: 'bg-[#38bdf8]', label: 'Telegram' },
  { icon: Link2, bg: 'bg-[#10b981]', label: 'Copy link' },
  { icon: MoreHorizontal, bg: 'bg-[#1e293b]', label: 'More' },
] as const;

/** Replica of the app's Receive screen (src/components/screens/receive-screen.tsx). */
export function PhoneReceive() {
  return (
    <div className="flex h-full flex-col bg-page">
      <div className="shrink-0 px-4 pb-3">
        <StatusBar tone="dark" />
        <div className="flex items-center justify-between pt-2.5">
          <span className="flex size-8 items-center justify-center rounded-full border border-line bg-white">
            <ArrowLeft size={13} className="text-ink" />
          </span>
          <p className="text-[12.5px] font-bold text-ink">Receive Money</p>
          <span className="size-8" />
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden px-4 pt-1">
        {/* QR card */}
        <div className="flex flex-col items-center rounded-[18px] border border-line bg-white p-4">
          <div className="rounded-xl border border-line p-1.5">
            <QrPattern />
          </div>
          <p className="pt-2.5 text-[10.5px] font-bold text-ink">Scan to pay me</p>
          <span className="mt-2 flex items-center gap-1.5 rounded-full bg-tint px-3 py-1.5 text-[10px] font-bold text-brand">
            @chinedu <Copy size={9} />
          </span>
        </div>

        {/* cashtag link */}
        <div className="flex items-center gap-2 rounded-[13px] border border-line bg-white px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[7.5px] font-semibold text-ink-soft uppercase">Cashtag link</p>
            <p className="truncate text-[9px] font-semibold text-ink">nearbypay.app/@chinedu</p>
          </div>
          <Copy size={12} className="shrink-0 text-brand" />
        </div>

        {/* share targets — same accent colors as the in-app share row */}
        <div>
          <p className="pb-2 text-[8.5px] font-semibold text-ink-soft">Share to</p>
          <div className="flex items-center justify-between px-1">
            {SHARE_TARGETS.map(({ icon: Icon, bg, label }) => (
              <span key={label} className="flex flex-col items-center gap-1.5">
                <span className={`flex size-9 items-center justify-center rounded-full ${bg}`}>
                  <Icon size={14} className="text-white" />
                </span>
                <span className="text-[7px] font-semibold text-ink-soft">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
