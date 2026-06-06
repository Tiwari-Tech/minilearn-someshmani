import type { Lesson, Course } from '../types';

interface LessonBlockProps {
  lesson: Lesson;
  course: Course;
}

export function LessonBlock({ lesson, course }: LessonBlockProps) {
  return (
    <div className="space-y-5">
      {/* Lesson title */}
      <div>
        <p className="text-xs font-semibold text-[#6a6f73] uppercase tracking-wider mb-1">Now Playing</p>
        <h1 className="text-2xl font-extrabold text-[#1c1d1f] leading-snug">{lesson.title}</h1>
      </div>

      {/* Video placeholder — Udemy black player */}
      <div className={`relative w-full aspect-video bg-gradient-to-br ${course.gradient} overflow-hidden flex flex-col items-center justify-center gap-3 select-none`}>
        <div className="absolute inset-0 bg-black/60" />

        {/* Play button */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center backdrop-blur-sm">
          <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>

        {/* Duration */}
        <div className="relative z-10 px-3 py-1 bg-black/60 rounded">
          <span className="text-white text-sm font-semibold">{lesson.duration}</span>
        </div>

        <p className="relative z-10 text-white/40 text-xs">Video · demo mode</p>
      </div>

      {/* About this lecture — Udemy calls it this */}
      <div className="border border-[#d1d7dc] p-5">
        <h2 className="text-sm font-bold text-[#1c1d1f] mb-2">About this lecture</h2>
        <p className="text-sm text-[#1c1d1f] leading-relaxed">
          {lesson.description ??
            `In this lecture you will explore ${lesson.title.toLowerCase()}. Follow along with the video above, take notes, and mark the lecture complete when you are ready to move on.`}
        </p>
      </div>
    </div>
  );
}
