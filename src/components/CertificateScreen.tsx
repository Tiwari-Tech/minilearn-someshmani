import { useNavigate } from 'react-router-dom';
import type { Course } from '../types';

interface CertificateScreenProps {
  course: Course;
  score: number;
  total: number;
  completedAt: string;
  learnerName: string;
}

export function CertificateScreen({
  course,
  score,
  total,
  completedAt,
  learnerName,
}: CertificateScreenProps) {
  const navigate = useNavigate();
  const pct = Math.round((score / total) * 100);
  const date = new Date(completedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center">
      {/* Confetti-style emoji burst */}
      <div className="text-4xl mb-6 select-none">🎉</div>

      {/* Certificate card */}
      <div className="w-full max-w-lg relative">
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-40" />

        <div className="relative card p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Certificate of Completion
            </p>
            <div className="w-12 h-0.5 bg-indigo-500 mx-auto" />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">This certifies that</p>
            <p className="text-2xl font-extrabold text-white">{learnerName}</p>
            <p className="text-sm text-gray-500">has successfully completed</p>
            <p className="text-xl font-bold text-indigo-300 leading-snug">{course.title}</p>
          </div>

          {/* Score badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-indigo-300">
              Quiz score: {score}/{total} · {pct}%
            </span>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10" className="text-white">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-500">MiniLearn</span>
            </div>
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary"
        >
          Browse more courses
        </button>
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="btn-primary"
        >
          Back to course
        </button>
      </div>
    </div>
  );
}
