import { useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { CurriculumSidebar } from '../components/CurriculumSidebar';
import { LessonBlock } from '../components/LessonBlock';
import { getNextLesson, getPrevLesson, findLesson, flattenLessons } from '../hooks/useNextLesson';

export function LessonViewerPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getCourseProgress, completeLesson, setCurrentLesson, enroll } = useProgress();

  const course = courses.find((c) => c.id === id);

  // Always call hooks before any early return
  const progress = getCourseProgress(course?.id ?? '');

  // ── Guard: unknown course ──────────────────────────────────────────────────
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-6xl font-extrabold text-gray-700 mb-4">404</p>
        <p className="text-gray-400 mb-6">Course not found.</p>
        <Link to="/" className="btn-primary">Browse courses</Link>
      </div>
    );
  }

  // ── Guard: not enrolled ────────────────────────────────────────────────────
  if (!progress.enrolled) {
    // Auto-enroll and redirect so deep-links still work
    const firstLessonId = course.sections[0]?.lessons[0]?.id ?? '';
    enroll(course.id, firstLessonId);
  }

  const flat = flattenLessons(course.sections);
  const totalLessons = flat.length;

  // Resolve active lesson from query param → current stored → first lesson
  const lessonIdFromQuery = searchParams.get('lesson');
  const resolvedLessonId =
    (lessonIdFromQuery && findLesson(course.sections, lessonIdFromQuery))
      ? lessonIdFromQuery
      : progress.currentLessonId ?? flat[0]?.lesson.id ?? '';

  const activeLesson = findLesson(course.sections, resolvedLessonId);
  const nextLesson = getNextLesson(course.sections, resolvedLessonId);
  const prevLesson = getPrevLesson(course.sections, resolvedLessonId);
  const allLessonsComplete = progress.completedLessons.length === totalLessons && totalLessons > 0;

  // Sync current lesson to context whenever URL lesson param changes
  useEffect(() => {
    if (resolvedLessonId && course) {
      setCurrentLesson(course.id, resolvedLessonId);
    }
  }, [resolvedLessonId, course, setCurrentLesson]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const goToLesson = useCallback(
    (lessonId: string) => {
      setSearchParams({ lesson: lessonId });
    },
    [setSearchParams],
  );

  // course is guaranteed defined here — early returns above handle the undefined case
  const safeCourse = course;

  function handleMarkComplete() {
    if (!activeLesson) return;
    const next = getNextLesson(safeCourse.sections, activeLesson.id);
    completeLesson(safeCourse.id, activeLesson.id, next?.id ?? null);
    if (next) {
      goToLesson(next.id);
    }
  }

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Ignore when focus is inside an input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' && nextLesson) goToLesson(nextLesson.id);
      if (e.key === 'ArrowLeft' && prevLesson) goToLesson(prevLesson.id);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextLesson, prevLesson, goToLesson]);

  // ── Guard: no lessons in course ────────────────────────────────────────────
  if (!activeLesson) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-gray-400">This course has no lessons yet.</p>
        <Link to={`/courses/${course.id}`} className="btn-secondary mt-4">Back to course</Link>
      </div>
    );
  }

  const isCurrentLessonDone = progress.completedLessons.includes(resolvedLessonId);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex md:w-72 lg:w-80 shrink-0 flex-col">
        <CurriculumSidebar
          courseId={course.id}
          sections={course.sections}
          activeLessonId={resolvedLessonId}
          completedLessonIds={progress.completedLessons}
          allLessonsComplete={allLessonsComplete}
          onLessonClick={goToLesson}
        />
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Top nav */}
          <div className="flex items-center justify-between">
            <Link
              to={`/courses/${course.id}`}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {course.title}
            </Link>

            {/* Keyboard hint */}
            <p className="hidden sm:block text-xs text-gray-700 select-none">
              ← → to navigate lessons
            </p>
          </div>

          {/* Lesson content */}
          <LessonBlock lesson={activeLesson} course={course} />

          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-800">
            {/* Prev */}
            <button
              onClick={() => prevLesson && goToLesson(prevLesson.id)}
              disabled={!prevLesson}
              aria-label="Previous lesson"
              className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {/* Mark complete / next */}
            <div className="flex items-center gap-3">
              {allLessonsComplete ? (
                <button
                  onClick={() => navigate(`/courses/${course.id}/quiz`)}
                  className="btn-primary"
                >
                  🎓 Take Final Quiz
                </button>
              ) : isCurrentLessonDone ? (
                <button
                  onClick={() => nextLesson && goToLesson(nextLesson.id)}
                  disabled={!nextLesson}
                  className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next lesson →
                </button>
              ) : (
                <button onClick={handleMarkComplete} className="btn-primary">
                  ✓ Mark Complete
                </button>
              )}
            </div>
          </div>

          {/* Mobile: curriculum list toggle */}
          <details className="md:hidden card">
            <summary className="px-4 py-3 text-sm font-semibold text-gray-300 cursor-pointer list-none flex items-center justify-between">
              <span>Course curriculum</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="border-t border-gray-800">
              <CurriculumSidebar
                courseId={course.id}
                sections={course.sections}
                activeLessonId={resolvedLessonId}
                completedLessonIds={progress.completedLessons}
                allLessonsComplete={allLessonsComplete}
                onLessonClick={goToLesson}
              />
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
