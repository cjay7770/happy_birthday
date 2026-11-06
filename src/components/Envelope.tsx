import { useState, type ReactNode } from 'react';
import { Trophy } from 'lucide-react';

interface EnvelopeProps {
  children: ReactNode;
}

export default function Envelope({ children }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isOpen}
        aria-label="Open the envelope"
        aria-expanded={isOpen}
        className="group relative h-56 w-80 cursor-pointer [perspective:1200px] disabled:cursor-default sm:h-64 sm:w-96"
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-900 via-slate-900 to-black ring-1 ring-sky-400/40 shadow-2xl transition duration-300 group-enabled:group-hover:-translate-y-1 group-enabled:group-hover:shadow-sky-500/30" />

        <div
          className={`absolute inset-x-0 top-0 h-1/2 origin-top bg-gradient-to-b from-sky-700 to-sky-800 transition-transform duration-700 ease-in-out [clip-path:polygon(0_0,100%_0,50%_100%)] ${
            isOpen ? 'z-0 [transform:rotateX(180deg)]' : 'z-20'
          }`}
        />

        <div
          className={`absolute left-1/2 top-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DA291C] shadow-lg ring-4 ring-red-950/60 transition duration-500 ${
            isOpen ? 'scale-0 opacity-0' : 'animate-pulse-glow'
          }`}
        >
          <Trophy className="h-6 w-6 text-yellow-300" aria-hidden="true" />
        </div>

        <div className="absolute inset-x-6 bottom-4 flex items-center justify-between text-xs font-medium uppercase tracking-[0.25em] text-sky-200/70">
          <span>Special delivery</span>
          <span>{isOpen ? 'Opened' : 'Tap to open'}</span>
        </div>
      </button>

      {isOpen && <div className="animate-fade-up w-full">{children}</div>}
    </div>
  );
}
