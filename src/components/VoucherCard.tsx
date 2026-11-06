import { Check, Ticket } from 'lucide-react';
import { VOUCHER } from '@/lib/birthday';

export default function VoucherCard() {
  return (
    <article className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950 via-blue-950 to-black text-left shadow-2xl ring-1 ring-yellow-300/40">
      <div className="flex items-center justify-between bg-[#DA291C] px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <Ticket className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-[0.2em]">{VOUCHER.title}</span>
        </div>
        <span className="text-xs font-medium opacity-90">{VOUCHER.number}</span>
      </div>

      <div className="flex flex-col gap-5 px-6 py-7">
        <h3 className="text-3xl font-bold leading-tight text-yellow-300">{VOUCHER.headline}</h3>
        <ul className="flex flex-col gap-3">
          {VOUCHER.details.map((detail) => (
            <li key={detail} className="flex items-start gap-3 text-sky-100">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sky-400/20 ring-1 ring-sky-300/60">
                <Check className="h-3 w-3 text-sky-200" aria-hidden="true" />
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-dashed border-yellow-300/40 px-6 py-4 text-sm text-sky-200/80">
        {VOUCHER.expiry}
      </div>
    </article>
  );
}
