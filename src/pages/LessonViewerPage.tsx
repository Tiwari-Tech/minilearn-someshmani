import { useEffect, useCallback, useRef, useState } from 'react';
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
  const progress = getCourseProgress(course?.id ?? '');

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-6xl font-extrabold text-[#1c1d1f] mb-4">404</p>
        <p className="text-[#6a6f73] mb-6">Course not found.</p>
        <Link to="/" className="btn-primary">Browse courses</Link>
      </div>
    );
  }

  if (!progress.enrolled) {
    const firstLessonId = course.sections[0]?.lessons[0]?.id ?? '';
    enroll(course.id, firstLessonId);
  }

  const safeCourse = course;
  const flat = flattenLessons(safeCourse.sections);
  const totalLessons = flat.length;

  const lessonIdFromQuery = searchParams.get('lesson');
  const resolvedLessonId =
    lessonIdFromQuery && findLesson(safeCourse.sections, lessonIdFromQuery)
      ? lessonIdFromQuery
      : progress.currentLessonId ?? flat[0]?.lesson.id ?? '';

  const activeLesson = findLesson(safeCourse.sections, resolvedLessonId);
  const nextLesson = getNextLesson(safeCourse.sections, resolvedLessonId);
  const prevLesson = getPrevLesson(safeCourse.sections, resolvedLessonId);
  const allLessonsComplete =
    progress.completedLessons.length === totalLessons && totalLessons > 0;

  useEffect(() => {
    if (resolvedLessonId) setCurrentLesson(safeCourse.id, resolvedLessonId);
  }, [resolvedLessonId, safeCourse.id, setCurrentLesson]);

  const goToLesson = useCallback(
    (lessonId: string) => setSearchParams({ lesson: lessonId }),
    [setSearchParams],
  );

  const [mobileCurriculumOpen, setMobileCurriculumOpen] = useState(false);
  const closeMobileBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!mobileCurriculumOpen) return;
    // focus the close button when dialog opens
    closeMobileBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileCurriculumOpen(false);
    }
    document.addEventListener('keydown', onKey);

    // prevent background scrolling
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileCurriculumOpen]);

  function handleMarkComplete() {
    if (!activeLesson) return;
    const next = getNextLesson(safeCourse.sections, activeLesson.id);
    completeLesson(safeCourse.id, activeLesson.id, next?.id ?? null);
    if (next) goToLesson(next.id);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'ArrowRight' && nextLesson) goToLesson(nextLesson.id);
      if (e.key === 'ArrowLeft' && prevLesson) goToLesson(prevLesson.id);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextLesson, prevLesson, goToLesson]);

  if (!activeLesson) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-[#6a6f73]">This course has no lessons yet.</p>
        <Link to={`/courses/${safeCourse.id}`} className="btn-secondary mt-4">Back to course</Link>
      </div>
    );
  }

  const isCurrentLessonDone = progress.completedLessons.includes(resolvedLessonId);

  return (
    /* Udemy layout: video+content LEFT, sidebar RIGHT */
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-white">

      {/* ── Main content (left) ───────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar removed: use global Navbar instead */}

        {/* Lesson body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <LessonBlock lesson={activeLesson} course={safeCourse} />

          {/* Navigation bar — Udemy bottom prev/next + mark complete */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#d1d7dc]">
            <button
              onClick={() => prevLesson && goToLesson(prevLesson.id)}
              disabled={!prevLesson}
              aria-label="Previous lesson"
              className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-3">
              {allLessonsComplete ? (
                <button
                  onClick={() => navigate(`/courses/${safeCourse.id}/quiz`)}
                  className="btn-primary text-sm"
                >
                  Take Final Quiz →
                </button>
              ) : isCurrentLessonDone ? (
                <button
                  onClick={() => nextLesson && goToLesson(nextLesson.id)}
                  disabled={!nextLesson}
                  className="btn-primary text-sm disabled:opacity-30"
                >
                  Next lecture →
                </button>
              ) : (
                <button onClick={handleMarkComplete} className="btn-primary text-sm">
                  Mark as complete
                </button>
              )}
            </div>
          </div>

          {/* Mobile curriculum: accessible full-screen dialog */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileCurriculumOpen(true)}
              className="w-full text-left px-4 py-3 text-sm font-bold text-[#1c1d1f] bg-[#f7f9fa] border border-[#d1d7dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0]"
              aria-controls="mobile-curriculum"
              aria-expanded={mobileCurriculumOpen}
            >
              Course content
            </button>

            {mobileCurriculumOpen && (
              <div
                id="mobile-curriculum"
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex flex-col bg-white"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8]">
                  <h3 className="text-sm font-bold text-[#1c1d1f]">Course content</h3>
                  <button
                    ref={closeMobileBtnRef}
                    onClick={() => setMobileCurriculumOpen(false)}
                    className="text-sm text-[#6a6f73] px-3 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0]"
                    aria-label="Close course content"
                  >
                    Close
                  </button>
                </div>

                <div className="overflow-y-auto flex-1">
                  <CurriculumSidebar
                    courseId={safeCourse.id}
                    sections={safeCourse.sections}
                    activeLessonId={resolvedLessonId}
                    completedLessonIds={progress.completedLessons}
                    allLessonsComplete={allLessonsComplete}
                    onLessonClick={(lessonId) => { goToLesson(lessonId); setMobileCurriculumOpen(false); }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Sidebar (right) — Udemy puts curriculum on the right ─────────── */}
      <div className="hidden md:flex md:w-72 lg:w-80 shrink-0 flex-col border-l border-[#d1d7dc]">
        <CurriculumSidebar
          courseId={safeCourse.id}
          sections={safeCourse.sections}
          activeLessonId={resolvedLessonId}
          completedLessonIds={progress.completedLessons}
          allLessonsComplete={allLessonsComplete}
          onLessonClick={goToLesson}
        />
      </div>
    </div>
  );
}
