interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
  showCount?: number;
}

export function StarRating({ rating, size = 'sm', showCount }: StarRatingProps) {
  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <span className="font-bold text-[#b4690e] text-sm leading-none">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const partial = !filled && rating > star - 1;
          const fill = filled ? 100 : partial ? Math.round((rating - (star - 1)) * 100) : 0;

          return (
            <span key={star} className="relative inline-block">
              <svg className={`${starSize} text-[#d1d7dc]`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {fill > 0 && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
                  <svg className={`${starSize} text-[#f4c430]`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount !== undefined && (
        <span className="text-xs text-[#6a6f73]">({showCount.toLocaleString()})</span>
      )}
    </div>
  );
}
