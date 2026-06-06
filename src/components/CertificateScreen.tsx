import { useNavigate } from 'react-router-dom';
import type { Course } from '../types';

interface CertificateScreenProps {
  course: Course;
  score: number;
  total: number;
  completedAt: string;
  learnerName: string;
}

export function CertificateScreen({ course, score, total, completedAt, learnerName }: CertificateScreenProps) {
  const navigate = useNavigate();
  const pct = Math.round((score / total) * 100);
  const date = new Date(completedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center">
      <div className="text-5xl mb-6 select-none">🎉</div>

      {/* Certificate — Udemy uses a bordered parchment style */}
      <div className="w-full max-w-lg border-4 border-[#a435f0] bg-white p-10 space-y-5 shadow-xl rounded-lg">
        {/* Top label */}
        <div className="space-y-1">
          <p className="text-xs font-extrabold text-[#6a6f73] uppercase tracking-[0.2em]">
            Certificate of Completion
          </p>
          <div className="w-16 h-0.5 bg-[#a435f0] mx-auto" />
        </div>

        <p className="text-sm text-[#6a6f73]">This is to certify that</p>
        <p className="text-3xl font-extrabold text-[#1c1d1f]">{learnerName}</p>
        <p className="text-sm text-[#6a6f73]">has successfully completed the course</p>
        <p className="text-xl font-bold text-[#a435f0] leading-snug">{course.title}</p>

        {/* Score */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f7f9fa] border border-[#d1d7dc] rounded-lg">
          <svg className="w-4 h-4 text-[#1e6055]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-bold text-[#1c1d1f]">
            Quiz score: {score}/{total} · {pct}%
          </span>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#d1d7dc] flex items-center justify-between text-xs text-[#6a6f73]">
          <span className="font-extrabold text-[#1c1d1f]">
            mini<span className="text-[#a435f0]">learn</span>
          </span>
          <span>{date}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <button onClick={() => navigate('/')} className="btn-secondary">
          Browse more courses
        </button>
        <button onClick={() => navigate(`/courses/${course.id}`)} className="btn-primary">
          Back to course
        </button>
      </div>
    </div>
  );
}
