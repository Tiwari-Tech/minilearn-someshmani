interface QuizQuestionProps {
  question: string;
  options: readonly string[];
  selectedOption: string | null;
  revealedAnswer: string | null;
  onSelect: (option: string) => void;
}

export function QuizQuestion({
  question,
  options,
  selectedOption,
  revealedAnswer,
  onSelect,
}: QuizQuestionProps) {
  return (
    <div className="space-y-5">
      <p className="text-lg font-bold text-[#1c1d1f] leading-snug">{question}</p>

      <ul className="space-y-3" role="radiogroup" aria-label="Answer options">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrect = revealedAnswer === option;
          const isWrongPick = revealedAnswer !== null && isSelected && !isCorrect;

          let border = 'border-[#d1d7dc] hover:border-[#1c1d1f]';
          let bg = 'bg-white';
          let text = 'text-[#1c1d1f]';

          if (revealedAnswer !== null) {
            if (isCorrect) {
              border = 'border-[#1e6055]'; bg = 'bg-[#e5f5f3]'; text = 'text-[#1e6055]';
            } else if (isWrongPick) {
              border = 'border-[#c0392b]'; bg = 'bg-[#fdf2f0]'; text = 'text-[#c0392b]';
            } else {
              border = 'border-[#d1d7dc]'; bg = 'bg-white'; text = 'text-[#6a6f73]';
            }
          } else if (isSelected) {
            border = 'border-[#a435f0]'; bg = 'bg-[#f0e6ff]'; text = 'text-[#a435f0]';
          }

          return (
            <li key={option}>
              <button
                role="radio"
                aria-checked={isSelected}
                disabled={revealedAnswer !== null}
                onClick={() => onSelect(option)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 border-2 text-left text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0] disabled:cursor-default ${border} ${bg} ${text}`}
              >
                {/* Radio indicator */}
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isCorrect && revealedAnswer !== null
                    ? 'border-[#1e6055] bg-[#1e6055]'
                    : isWrongPick
                    ? 'border-[#c0392b] bg-[#c0392b]'
                    : isSelected
                    ? 'border-[#a435f0] bg-[#a435f0]'
                    : 'border-[#6a6f73]'
                }`}>
                  {(isSelected || (isCorrect && revealedAnswer !== null)) && (
                    isWrongPick ? (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )
                  )}
                </span>
                {option}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Inline feedback */}
      {revealedAnswer !== null && (
        <div className={`flex items-start gap-2 px-4 py-3 border text-sm font-medium ${
          selectedOption === revealedAnswer
            ? 'bg-[#e5f5f3] border-[#1e6055] text-[#1e6055]'
            : 'bg-[#fdf2f0] border-[#c0392b] text-[#c0392b]'
        }`}>
          <span className="shrink-0 font-bold">
            {selectedOption === revealedAnswer ? '✓ Correct!' : '✗ Incorrect.'}
          </span>
          {selectedOption !== revealedAnswer && (
            <span>The correct answer is <strong>"{revealedAnswer}"</strong>.</span>
          )}
        </div>
      )}
    </div>
  );
}
