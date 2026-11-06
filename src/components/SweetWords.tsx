import { SWEET_WORDS, SWEET_WORDS_SIGNOFF } from '@/lib/birthday';

export default function SweetWords() {
  return (
    <div className="flex flex-col items-center gap-6">
      {SWEET_WORDS.map((line, index) => (
        <p
          key={line}
          className="animate-fade-up text-xl leading-relaxed text-sky-50 sm:text-2xl"
          style={{ animationDelay: `${0.3 + index * 0.7}s` }}
        >
          {line}
        </p>
      ))}
      <p
        className="animate-fade-up mt-4 text-lg font-semibold italic text-yellow-300"
        style={{ animationDelay: `${0.3 + SWEET_WORDS.length * 0.7}s` }}
      >
        {SWEET_WORDS_SIGNOFF}
      </p>
    </div>
  );
}
