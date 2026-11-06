import { useMemo } from 'react';

const COLORS = ['#38bdf8', '#7dd3fc', '#e0f2fe', '#facc15', '#f9a8d4', '#34d399', '#ffffff'];
const DEFAULT_PIECE_COUNT = 140;

interface ConfettiProps {
  pieceCount?: number;
}

export default function Confetti({ pieceCount = DEFAULT_PIECE_COUNT }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: pieceCount }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3.5 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540),
        width: 6 + Math.random() * 8,
        height: 10 + Math.random() * 10,
        color: COLORS[index % COLORS.length],
        round: Math.random() > 0.7,
      })),
    [pieceCount]
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-0 block"
          style={{
            left: `${piece.left}%`,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.color,
            borderRadius: piece.round ? '9999px' : '2px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            ['--drift' as string]: `${piece.drift}px`,
            ['--spin' as string]: `${piece.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
