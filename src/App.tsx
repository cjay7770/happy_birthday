import { useCallback, useState } from 'react';
import { ArrowRight, Gift, Mail, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import PenaltyShootout from '@/components/PenaltyShootout';
import Confetti from '@/components/Confetti';
import Cake from '@/components/Cake';
import Envelope from '@/components/Envelope';
import SweetWords from '@/components/SweetWords';
import VoucherCard from '@/components/VoucherCard';
import { BIRTHDAY_PHOTO_URL, DOG_PHOTO_URL } from '@/lib/birthday';

type Stage = 'intro' | 'game' | 'reveal' | 'letter' | 'envelope';

const primaryButton =
  'group inline-flex items-center gap-3 rounded-full bg-[#DA291C] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-900/40 transition hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-0';

const secondaryButton =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-sky-200 transition hover:bg-white/10 hover:text-white';

function App() {
  const [stage, setStage] = useState<Stage>('intro');
  const handleWin = useCallback(() => setStage('reveal'), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-950 via-blue-950 to-black text-sky-50">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        {stage === 'intro' && (
          <section className="animate-fade-up flex flex-col items-center gap-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#DA291C]/20 ring-1 ring-[#DA291C]/60 animate-float">
              <Trophy className="h-10 w-10 text-yellow-300" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-yellow-300">A little surprise</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
                Score three goals,
                <br />
                unlock your cake
              </h1>
              <p className="mx-auto max-w-md text-base leading-relaxed text-sky-200/80">
                Step up to the penalty spot for a Manchester United shootout. Hit the net three times to claim your birthday treat.
              </p>
            </div>
            <button type="button" onClick={() => setStage('game')} className={primaryButton}>
              <Gift className="h-5 w-5 transition group-hover:rotate-12" aria-hidden="true" />
              Take the penalty
            </button>
          </section>
        )}

        {stage === 'game' && (
          <section className="animate-fade-up flex w-full flex-col items-center gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold sm:text-4xl">Penalty shootout</h2>
              <p className="text-sky-200/80">Aim for a corner. The keeper is guessing too.</p>
            </div>
            <PenaltyShootout onWin={handleWin} />
          </section>
        )}

        {stage === 'reveal' && (
          <section className="flex w-full flex-col items-center gap-10">
            <Confetti />
            <div className="animate-fade-up flex flex-col items-center gap-6">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-twinkle" aria-hidden="true" />
              <h2 className="text-5xl font-bold leading-tight sm:text-7xl">
                Happy Birthday
                <br />
                <span className="text-sky-300">to you!</span>
              </h2>
            </div>
            <div className="animate-fade-up-delayed relative">
              <div className="absolute -inset-3 rounded-full bg-sky-400/20 blur-xl animate-pulse-glow" />
              <img
                src={BIRTHDAY_PHOTO_URL}
                alt="Birthday star"
                className="relative h-48 w-48 rounded-full object-cover ring-4 ring-sky-300/70 shadow-2xl sm:h-56 sm:w-56"
              />
            </div>
            <div className="animate-fade-up-late pt-4">
              <Cake />
            </div>
            <button type="button" onClick={() => setStage('letter')} className={primaryButton}>
              Read your note
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </section>
        )}

        {stage === 'letter' && (
          <section className="animate-fade-up flex w-full flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-yellow-300">From the bottom of my heart</p>
              <SweetWords />
            </div>
            <figure className="relative w-72 -rotate-2 bg-sky-100 p-4 pb-12 shadow-2xl transition duration-500 hover:rotate-0 sm:w-80">
              <img
                src={DOG_PHOTO_URL}
                alt="A black dog running through a field with a stick"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-3 font-semibold text-slate-900">
                Every champion needs a treat 😂😂😂
              </figcaption>
            </figure>
            <button type="button" onClick={() => setStage('envelope')} className={primaryButton}>
              <Mail className="h-5 w-5 transition group-hover:-rotate-6" aria-hidden="true" />
              Open your envelope
            </button>
          </section>
        )}

        {stage === 'envelope' && (
          <section className="animate-fade-up flex w-full flex-col items-center gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold sm:text-4xl">One last surprise</h2>
              <p className="text-sky-200/80">Tap the seal to see what is inside.</p>
            </div>
            <Envelope>
              <VoucherCard />
            </Envelope>
            <button type="button" onClick={() => setStage('intro')} className={secondaryButton}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Play again
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
