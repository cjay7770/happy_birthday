import { useEffect, useState } from 'react';
import { Flame, Trophy } from 'lucide-react';
import Confetti from '@/components/Confetti';
import {
  GOALS_TO_WIN,
  GOAL_COLUMNS,
  GOAL_LINES,
  SAVE_LINES,
  pickKeeperColumn,
  pickLine,
} from '@/lib/penalty';

interface PenaltyShootoutProps {
  onWin: () => void;
}

interface Shot {
  row: number;
  col: number;
  keeperCol: number;
}

type Phase = 'aiming' | 'shooting' | 'result';

const SHOT_DURATION_MS = 900;
const WIN_DELAY_MS = 1600;
const BURST_DURATION_MS = 2600;
const BURST_PIECES = 70;
const STREAK_BADGE_MIN = 2;
const SPOT = { x: 50, y: 84 };
const KEEPER_Y = 44;
const ROW_NAMES = ['top', 'bottom'];
const COL_NAMES = ['left', 'center', 'right'];

const goalX = (col: number) => 30 + col * 20;
const goalY = (row: number) => 22 + row * 20;

const keeperTilt = (keeperCol: number) => {
  if (keeperCol === 0) return -30;
  if (keeperCol === GOAL_COLUMNS - 1) return 30;
  return 0;
};

const NET_STYLE = {
  backgroundImage:
    'repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 14px)',
};

const PITCH_STYLE = {
  backgroundImage:
    'repeating-linear-gradient(0deg, #065f46 0 48px, #047857 48px 96px)',
};

export default function PenaltyShootout({ onWin }: PenaltyShootoutProps) {
  const [phase, setPhase] = useState<Phase>('aiming');
  const [shot, setShot] = useState<Shot | null>(null);
  const [score, setScore] = useState(0);
  const [kicks, setKicks] = useState(0);
  const [streak, setStreak] = useState(0);
  const [commentary, setCommentary] = useState('');
  const [burstId, setBurstId] = useState<number | null>(null);

  const saved = shot !== null && shot.keeperCol === shot.col;

  useEffect(() => {
    if (phase !== 'shooting' || !shot) return;
    const timer = window.setTimeout(() => {
      if (shot.keeperCol === shot.col) {
        setStreak(0);
        setCommentary(pickLine(SAVE_LINES));
      } else {
        setScore((value) => value + 1);
        setStreak((value) => value + 1);
        setCommentary(pickLine(GOAL_LINES));
        setBurstId(kicks);
      }
      setPhase('result');
    }, SHOT_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [phase, shot, kicks]);

  useEffect(() => {
    if (burstId === null) return;
    const timer = window.setTimeout(() => setBurstId(null), BURST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [burstId]);

  useEffect(() => {
    if (phase !== 'result' || score < GOALS_TO_WIN) return;
    const timer = window.setTimeout(onWin, WIN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [phase, score, onWin]);

  const takeShot = (row: number, col: number) => {
    if (phase !== 'aiming') return;
    setShot({ row, col, keeperCol: pickKeeperColumn() });
    setKicks((count) => count + 1);
    setPhase('shooting');
  };

  const nextKick = () => {
    setShot(null);
    setPhase('aiming');
  };

  const ballTarget = shot && phase !== 'aiming' ? { x: goalX(shot.col), y: goalY(shot.row) } : SPOT;
  const keeperX = shot && phase !== 'aiming' ? goalX(shot.keeperCol) : 50;
  const keeperRotation = shot && phase !== 'aiming' ? keeperTilt(shot.keeperCol) : 0;
  const keeperCelebrates = phase === 'result' && saved;

  const resultText = phase === 'result' && shot ? (saved ? 'Saved!' : 'GOAL!') : null;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full max-w-lg items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: GOALS_TO_WIN }, (_, index) => (
            <span
              key={index}
              className={`h-4 w-4 rounded-full ring-2 ring-white/70 transition-colors duration-500 ${
                index < score ? 'bg-yellow-300' : 'bg-transparent'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-sky-100">
            {score} / {GOALS_TO_WIN} goals
          </span>
        </div>
        <div className="flex items-center gap-2">
          {streak >= STREAK_BADGE_MIN && (
            <span className="animate-pop inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1.5 text-sm font-bold text-white shadow-md">
              <Flame className="h-4 w-4" aria-hidden="true" />
              On fire x{streak}
            </span>
          )}
          <span className="rounded-full bg-[#DA291C] px-4 py-1.5 text-sm font-semibold text-white shadow-md">
            Kick {kicks || 1}
          </span>
        </div>
      </div>

      <div
        className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl ring-1 ring-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        style={PITCH_STYLE}
      >
        <div
          className="absolute left-[20%] top-[12%] h-[40%] w-[60%] border-x-4 border-t-4 border-white"
          style={NET_STYLE}
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
            {ROW_NAMES.map((rowName, row) =>
              COL_NAMES.map((colName, col) => (
                <button
                  key={`${row}-${col}`}
                  type="button"
                  disabled={phase !== 'aiming'}
                  onClick={() => takeShot(row, col)}
                  aria-label={`Shoot ${rowName} ${colName}`}
                  className="group relative focus:outline-none disabled:cursor-default"
                >
                  <span className="absolute inset-2 rounded-lg bg-[#DA291C]/0 transition duration-150 group-enabled:group-hover:bg-[#DA291C]/40 group-enabled:group-focus-visible:bg-[#DA291C]/40" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-300 opacity-0 transition duration-150 group-enabled:group-hover:opacity-100" />
                </button>
              ))
            )}
          </div>
        </div>

        <div
          className="absolute h-14 w-8 transition-all duration-500 ease-out"
          style={{
            left: `${keeperX}%`,
            top: `${KEEPER_Y}%`,
            transform: `translate(-50%, -50%) rotate(${keeperRotation}deg)`,
          }}
          aria-hidden="true"
        >
          <div className={keeperCelebrates ? 'animate-bounce' : ''}>
            <div className="mx-auto h-3.5 w-3.5 rounded-full bg-amber-200" />
            <div className="mx-auto -mt-0.5 h-5 w-7 rounded-t-lg bg-[#DA291C] shadow-md" />
            <div className="mx-auto h-3 w-7 bg-black" />
            <div className="mx-auto flex h-3 w-6 justify-between">
              <span className="w-2.5 bg-amber-200" />
              <span className="w-2.5 bg-amber-200" />
            </div>
          </div>
        </div>

        <span
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
          style={{ left: `${SPOT.x}%`, top: `${SPOT.y}%` }}
          aria-hidden="true"
        />

        <div
          className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ left: `${ballTarget.x}%`, top: `${ballTarget.y}%` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-lg">
            <circle cx="12" cy="12" r="11" fill="#ffffff" stroke="#111827" strokeWidth="1" />
            <path d="M12 7.5 L16 10.4 L14.5 15.1 L9.5 15.1 L8 10.4 Z" fill="#111827" />
          </svg>
        </div>

        {resultText && (
          <div className="pointer-events-none absolute inset-x-0 top-[58%] flex justify-center">
            <span
              className={`animate-pop rounded-2xl px-6 py-2 text-3xl font-bold shadow-xl ${
                saved ? 'bg-white text-slate-900' : 'bg-yellow-300 text-[#7f1d1d]'
              }`}
            >
              {resultText}
            </span>
          </div>
        )}
      </div>

      {burstId !== null && <Confetti key={burstId} pieceCount={BURST_PIECES} />}

      <div className="flex min-h-[3.5rem] flex-col items-center gap-3">
        {phase === 'aiming' && (
          <p className="text-sky-100/90">Pick a corner of the goal and take the penalty.</p>
        )}
        {phase === 'shooting' && <p className="text-sky-100/90">Here it comes...</p>}
        {phase === 'result' && (
          <p className="animate-fade-up text-lg font-semibold italic text-yellow-200">{commentary}</p>
        )}
        {phase === 'result' && score < GOALS_TO_WIN && (
          <button
            type="button"
            onClick={nextKick}
            className="inline-flex items-center gap-2 rounded-full bg-[#DA291C] px-6 py-3 font-semibold text-white shadow-lg shadow-red-900/40 transition hover:-translate-y-0.5 hover:bg-red-500"
          >
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Next penalty
          </button>
        )}
        {phase === 'result' && score >= GOALS_TO_WIN && (
          <p className="font-semibold text-yellow-300">Hat-trick! Glory, glory Man United!</p>
        )}
      </div>
    </div>
  );
}
