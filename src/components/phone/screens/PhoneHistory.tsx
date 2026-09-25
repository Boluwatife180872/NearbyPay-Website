import { ArrowDownToLine, ArrowLeft, Search, Send } from 'lucide-react';
import { StatusBar } from '../PhoneFrame';

type Tx = {
  name: string;
  detail: string;
  amount: string;
  received: boolean;
  initials: string;
};

const TODAY: Tx[] = [
  { name: 'Chiamaka Eze', detail: 'Received · @chiamaka', amount: '+₦15,000', received: true, initials: 'CE' },
  { name: 'Tunde Bakare', detail: 'Sent · @tundeb', amount: '-₦8,500', received: false, initials: 'TB' },
  { name: 'Data top-up', detail: 'Sent · Bill payment', amount: '-₦5,000', received: false, initials: 'DT' },
];

const YESTERDAY: Tx[] = [
  { name: 'Emeka Okafor', detail: 'Received · @emeka_o', amount: '+₦20,000', received: true, initials: 'EO' },
  { name: 'Zainab Aliyu', detail: 'Sent · @zainab', amount: '-₦12,300', received: false, initials: 'ZA' },
  { name: 'Kelechi N.', detail: 'Received · @kelechi', amount: '+₦7,750', received: true, initials: 'KN' },
];

/** Replica of the app's History screen (src/components/transaction-history.tsx). */
export function PhoneHistory() {
  return (
    <div className="flex h-full flex-col bg-page">
      <div className="shrink-0 px-4 pb-3">
        <StatusBar tone="dark" />
        <div className="flex items-center justify-between pt-2.5">
          <span className="flex size-8 items-center justify-center rounded-full border border-line bg-white">
            <ArrowLeft size={13} className="text-ink" />
          </span>
          <p className="text-[12.5px] font-bold text-ink">Transactions</p>
          <span className="size-8" />
        </div>

        {/* search */}
        <div className="mt-3.5 flex items-center gap-1.5 rounded-[11px] border border-line bg-white px-3 py-2">
          <Search size={11} className="text-ink-soft" />
          <span className="text-[9px] font-medium text-ink-soft">Search transactions</span>
        </div>

        {/* filter — All / Sent / Received */}
        <div className="mt-2.5 grid grid-cols-3 gap-1 rounded-full bg-chip p-1">
          <span className="rounded-full bg-white py-1.5 text-center text-[8.5px] font-bold text-brand shadow-sm">
            All
          </span>
          <span className="py-1.5 text-center text-[8.5px] font-semibold text-ink-soft">Sent</span>
          <span className="py-1.5 text-center text-[8.5px] font-semibold text-ink-soft">Received</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4">
        <TxGroup label="Today" items={TODAY} />
        <TxGroup label="Yesterday" items={YESTERDAY} />
      </div>
    </div>
  );
}

function TxGroup({ label, items }: { label: string; items: Tx[] }) {
  return (
    <div className="pt-2">
      <p className="pb-1 text-[8.5px] font-bold tracking-wide text-ink-soft uppercase">{label}</p>
      <div className="rounded-[14px] border border-line bg-white">
        {items.map((tx, i) => (
          <div
            key={tx.name}
            className={`flex items-center gap-2.5 px-3 py-2.5 ${i > 0 ? 'border-t border-line/70' : ''}`}
          >
            <span
              className={`flex size-8 items-center justify-center rounded-full ${
                tx.received ? 'bg-good-tint' : 'bg-tint'
              }`}
            >
              {tx.received ? (
                <ArrowDownToLine size={13} className="text-good" />
              ) : (
                <Send size={12} className="text-brand" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-ink">{tx.name}</p>
              <p className="truncate text-[7.5px] font-medium text-ink-soft">{tx.detail}</p>
            </div>
            <p className={`text-[10px] font-bold ${tx.received ? 'text-good' : 'text-bad'}`}>
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
