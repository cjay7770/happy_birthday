const SPRINKLES = [
  { left: '12%', top: '30%', color: '#38bdf8', rotate: 20 },
  { left: '24%', top: '62%', color: '#facc15', rotate: -35 },
  { left: '38%', top: '34%', color: '#f9a8d4', rotate: 60 },
  { left: '52%', top: '70%', color: '#38bdf8', rotate: 10 },
  { left: '66%', top: '40%', color: '#34d399', rotate: -20 },
  { left: '80%', top: '66%', color: '#facc15', rotate: 45 },
  { left: '18%', top: '82%', color: '#0ea5e9', rotate: -60 },
  { left: '72%', top: '84%', color: '#f9a8d4', rotate: 30 },
];

const DRIPS = [8, 18, 30, 44, 58, 70, 84, 92];
const CANDLE_OFFSETS = ['-translate-x-10', '', 'translate-x-10'];
const CANDLE_COLORS = ['bg-sky-300', 'bg-white', 'bg-yellow-200'];

function Tier({ widthClass, heightClass, className }: { widthClass: string; heightClass: string; className?: string }) {
  return (
    <div className={`relative ${widthClass} ${heightClass} ${className ?? ''}`}>
      <div className="absolute inset-0 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-sky-100 via-white to-sky-200 shadow-[inset_0_-10px_20px_rgba(14,116,144,0.25)]" />
      <div className="absolute -top-1 left-0 right-0 h-6 rounded-t-lg bg-white shadow-sm">
        {DRIPS.map((left) => (
          <span
            key={left}
            className="absolute top-4 h-5 w-3 rounded-b-full bg-white"
            style={{ left: `${left}%`, height: `${12 + ((left * 7) % 14)}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Cake() {
  return (
    <div className="animate-cake-rise relative flex flex-col items-center">
      <div className="relative flex w-72 flex-col items-center">
        <div className="relative flex w-full flex-col items-center">
          <div className="relative flex h-16 w-full items-end justify-center">
            <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-6">
              {CANDLE_COLORS.map((color, index) => (
                <div key={color} className={`relative flex flex-col items-center ${CANDLE_OFFSETS[index]}`}>
                  <div className="animate-flicker absolute -top-6 h-5 w-3 rounded-full bg-gradient-to-t from-amber-400 to-yellow-100 shadow-[0_0_14px_6px_rgba(250,204,21,0.45)]" />
                  <div className={`h-10 w-2.5 rounded-sm ${color}`} />
                </div>
              ))}
            </div>
          </div>
          <Tier widthClass="w-40" heightClass="h-24" className="z-10" />
          <Tier widthClass="w-64" heightClass="h-28" className="-mt-2" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-3 rounded-full bg-sky-950/60 blur-md" />
      </div>
      <div className="relative -mt-4 h-4 w-80 rounded-full bg-gradient-to-r from-sky-800 via-sky-600 to-sky-800 shadow-lg" />
      {SPRINKLES.map((sprinkle, index) => (
        <span
          key={index}
          className="absolute h-1 w-3 rounded-full"
          style={{
            left: sprinkle.left,
            top: sprinkle.top,
            backgroundColor: sprinkle.color,
            transform: `rotate(${sprinkle.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
