import { Link } from 'react-router-dom';
import type { Course } from '../types';
import { StarRating } from './StarRating';
import { useProgress } from '../context/ProgressContext';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseProgress } = useProgress();
  const { enrolled, completedLessons } = getCourseProgress(course.id);
  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const progressPct = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex flex-col bg-white rounded-lg border border-[#e8e8e8] hover:shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0]"
    >
      {/* Thumbnail */}
      <div className={`relative w-full aspect-video bg-gradient-to-br ${course.gradient} overflow-hidden rounded-t-lg`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {enrolled && (
            <span className="px-2 py-0.5 bg-[#a435f0] text-white text-[10px] font-bold uppercase tracking-wide rounded-sm">
              Enrolled
            </span>
          )}
          <span className="px-2 py-0.5 bg-black/50 text-white text-[10px] font-bold uppercase tracking-wide rounded-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <h3 className="font-bold text-[#1c1d1f] text-sm leading-snug line-clamp-2 group-hover:text-[#a435f0] transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-[#6a6f73]">{course.instructor.name}</p>
        <StarRating rating={course.rating} showCount={course.students} />
        <p className="text-xs text-[#6a6f73] mt-0.5">
          {course.totalHours} total hours · {totalLessons} lessons
        </p>

        {enrolled && (
          <div className="mt-2 space-y-1">
            <div className="h-1.5 bg-[#e8e8e8] w-full rounded-full overflow-hidden">
              <div
                className="h-full bg-[#a435f0] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[10px] text-[#6a6f73]">{progressPct}% complete</p>
          </div>
        )}
      </div>
    </Link>
  );
}
