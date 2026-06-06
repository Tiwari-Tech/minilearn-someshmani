interface QuizQuestionProps {
  question: string;
  options: readonly string[];
  selectedOption: string | null;
  revealedAnswer: string | null; // set after Submit is clicked
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
      {/* Question text */}
      <p className="text-lg font-semibold text-gray-100 leading-snug">{question}</p>

      {/* Options */}
      <ul className="space-y-3" role="radiogroup" aria-label="Answer options">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrect = revealedAnswer === option;
          const isWrongPick = revealedAnswer !== null && isSelected && !isCorrect;

          let stateClasses = '';
          if (revealedAnswer !== null) {
            if (isCorrect) {
              stateClasses = 'border-emerald-500 bg-emerald-500/10 text-emerald-300';
            } else if (isWrongPick) {
              stateClasses = 'border-red-500 bg-red-500/10 text-red-300';
            } else {
              stateClasses = 'border-gray-800 bg-gray-900/50 text-gray-600 cursor-default';
            }
          } else if (isSelected) {
            stateClasses = 'border-indigo-500 bg-indigo-500/10 text-indigo-200';
          } else {
            stateClasses = 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500 hover:bg-gray-800/60 cursor-pointer';
          }

          return (
            <li key={option}>
              <button
                role="radio"
                aria-checked={isSelected}
                disabled={revealedAnswer !== null}
                onClick={() => onSelect(option)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-default ${stateClasses}`}
              >
                {/* Radio circle */}
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isCorrect && revealedAnswer !== null
                    ? 'border-emerald-500 bg-emerald-500'
                    : isWrongPick
                    ? 'border-red-500 bg-red-500'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-600'
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
        <div className={`flex items-start gap-2 px-4 py-3 rounded-lg text-sm ${
          selectedOption === revealedAnswer
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          <span className="text-base shrink-0">
            {selectedOption === revealedAnswer ? '✓' : '✗'}
          </span>
          <span>
            {selectedOption === revealedAnswer
              ? 'Correct!'
              : `Incorrect. The correct answer is "${revealedAnswer}".`}
          </span>
        </div>
      )}
    </div>
  );
}
