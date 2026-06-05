import type { Lesson, Course } from '../types';

interface LessonBlockProps {
  lesson: Lesson;
  course: Course;
}

export function LessonBlock({ lesson, course }: LessonBlockProps) {
  return (
    <div className="space-y-6">
      {/* Lesson title */}
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          Now Playing
        </p>
        <h1 className="text-2xl font-extrabold text-gray-100 leading-snug">
          {lesson.title}
        </h1>
      </div>

      {/* Video placeholder */}
      <div className={`relative w-full aspect-video rounded-2xl bg-gradient-to-br ${course.gradient} overflow-hidden flex flex-col items-center justify-center gap-3 select-none`}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3 blur-xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/20 translate-y-1/3 -translate-x-1/3 blur-lg" />

        {/* Play button */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
          <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>

        {/* Duration badge */}
        <div className="relative z-10 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-white text-sm font-semibold">{lesson.duration}</span>
        </div>

        {/* Video label */}
        <p className="relative z-10 text-white/50 text-xs">Video lesson · playback not available in demo</p>
      </div>

      {/* Lesson description */}
      <div className="card p-6">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">
          About this lesson
        </h2>
        <p className="text-gray-400 leading-relaxed">
          {lesson.description ??
            `In this lesson you will explore ${lesson.title.toLowerCase()}. Follow along with the video above, take notes, and mark the lesson complete when you are ready to move on.`}
        </p>
      </div>
    </div>
  );
}
