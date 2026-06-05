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

  const formatStudents = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group card flex flex-col hover:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${course.gradient} flex items-end p-4 overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2" />

        {/* Level badge */}
        <span className="relative z-10 px-2.5 py-1 bg-black/30 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
          {course.level}
        </span>

        {/* Enrolled badge */}
        {enrolled && (
          <span className="relative z-10 ml-2 px-2.5 py-1 bg-indigo-600/90 text-white text-xs font-semibold rounded-full">
            Enrolled
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category */}
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-gray-100 text-base leading-snug group-hover:text-white line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-400">{course.instructor.name}</p>

        {/* Rating */}
        <StarRating rating={course.rating} />

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-2 border-t border-gray-800">
          <span>{formatStudents(course.students)} students</span>
          <span>·</span>
          <span>{course.totalHours}h total</span>
          <span>·</span>
          <span>{totalLessons} lessons</span>
        </div>

        {/* Progress bar (if enrolled) */}
        {enrolled && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
