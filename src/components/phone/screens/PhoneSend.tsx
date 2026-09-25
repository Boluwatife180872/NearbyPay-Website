import { ArrowLeft, Check, ScanLine, Send, ShieldCheck } from 'lucide-react';
import { InitialAvatar, StatusBar, VerifiedBadge } from '../PhoneFrame';

const AMOUNTS = ['₦1,000', '₦2,000', '₦5,000', '₦10,000'] as const;

/** Replica of the app's Send flow (src/components/screens/send-screen.tsx). */
export function PhoneSend() {
  return (
    <div className="flex h-full flex-col bg-page">
      <div className="shrink-0 px-4 pb-3">
        <StatusBar tone="dark" />
        <div className="flex items-center justify-between pt-2.5">
          <span className="flex size-8 items-center justify-center rounded-full border border-line bg-white">
            <ArrowLeft size={13} className="text-ink" />
          </span>
          <p className="text-[12.5px] font-bold text-ink">Send Money</p>
          <span className="flex size-8 items-center justify-center rounded-full border border-line bg-white">
            <ScanLine size={13} className="text-brand" />
          </span>
        </div>

        {/* mode toggle — Nearby tag / Bank */}
        <div className="mt-3.5 grid grid-cols-2 gap-1 rounded-full bg-chip p-1">
          <span className="rounded-full bg-white py-1.5 text-center text-[8.5px] font-bold text-brand shadow-sm">
            To Nearby Tag
          </span>
          <span className="py-1.5 text-center text-[8.5px] font-semibold text-ink-soft">To Bank</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden px-4 pt-1">
        {/* recipient cashtag */}
        <div className="flex items-center justify-between">
          <p className="text-[9.5px] font-semibold text-ink">Recipient Cashtag</p>
          <span className="flex items-center gap-1 text-[8px] font-bold text-brand">
            <ScanLine size={9} /> Read QR
          </span>
        </div>

        <div className="flex items-center gap-2.5 rounded-[13px] border-2 border-brand bg-white p-2.5">
          <InitialAvatar initials="AO" size={34} />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 text-[10.5px] font-bold text-ink">
              Ada Obi <VerifiedBadge />
            </p>
            <p className="text-[9px] font-semibold text-brand">@ada</p>
          </div>
          <span className="flex size-5 items-center justify-center rounded-full bg-brand">
            <Check size={11} className="text-white" strokeWidth={3} />
          </span>
        </div>

        {/* amount */}
        <div className="rounded-[15px] border border-line bg-white p-3.5 text-center">
          <p className="text-[8.5px] font-semibold text-ink-soft">Enter Amount to Send</p>
          <p className="pt-1 text-[24px] font-bold tracking-tight text-ink">₦10,000.00</p>
          <div className="mt-2.5 grid grid-cols-4 gap-1.5">
            {AMOUNTS.map((amount) => (
              <span
                key={amount}
                className={`rounded-full py-1.5 text-[8px] font-bold ${
                  amount === '₦10,000'
                    ? 'bg-brand text-white shadow-[0_4px_10px_-3px_rgba(46,69,244,0.55)]'
                    : 'bg-chip text-ink-soft'
                }`}
              >
                {amount}
              </span>
            ))}
          </div>
        </div>

        {/* note */}
        <div className="rounded-[12px] border border-line bg-white px-3 py-2.5 text-[9px] font-medium text-ink-soft">
          Add a note <span className="text-ink-soft/50">· “Lunch money 🍜”</span>
        </div>

        {/* CTA */}
        <button className="flex h-11 w-full items-center justify-center gap-1.5 rounded-[14px] bg-brand text-[11.5px] font-bold text-white shadow-[0_10px_22px_-8px_rgba(46,69,244,0.65)]">
          <Send size={12} /> Send ₦10,000
        </button>
        <p className="flex items-center justify-center gap-1 text-center text-[7.5px] font-medium text-ink-soft">
          <ShieldCheck size={9} className="text-good" />
          Directly debited and credited to recipient Cashtag instantly.
        </p>
      </div>
    </div>
  );
}
