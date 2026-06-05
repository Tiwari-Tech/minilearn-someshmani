import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Section } from '../types';
import { flattenLessons } from '../hooks/useNextLesson';

interface CurriculumSidebarProps {
  courseId: string;
  sections: Section[];
  activeLessonId: string;
  completedLessonIds: string[];
  allLessonsComplete: boolean;
  /** Override the default navigate behaviour — used by LessonViewerPage to update query param */
  onLessonClick?: (lessonId: string) => void;
}

export function CurriculumSidebar({
  courseId,
  sections,
  activeLessonId,
  completedLessonIds,
  allLessonsComplete,
  onLessonClick,
}: CurriculumSidebarProps) {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(sections.map((s) => s.id)),
  );

  const flat = flattenLessons(sections);
  const totalLessons = flat.length;
  const completedCount = completedLessonIds.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  function toggleSection(sectionId: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  }

  function goToLesson(lessonId: string) {
    if (onLessonClick) {
      onLessonClick(lessonId);
    } else {
      navigate(`/courses/${courseId}/learn?lesson=${lessonId}`);
    }
  }

  return (
    <aside className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-800 shrink-0">
        <h2 className="text-sm font-bold text-gray-100 mb-3">Course Content</h2>
        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{completedCount}/{totalLessons} lessons</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable curriculum */}
      <nav className="flex-1 overflow-y-auto py-2" aria-label="Course curriculum">
        {sections.map((section, idx) => {
          const isOpen = openSections.has(section.id);
          const completedInSection = section.lessons.filter((l) =>
            completedLessonIds.includes(l.id),
          ).length;

          return (
            <div key={section.id}>
              {/* Section toggle */}
              <button
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-bold text-gray-600 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold text-gray-300 truncate">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs text-gray-600">
                    {completedInSection}/{section.lessons.length}
                  </span>
                  <svg
                    className={`w-3 h-3 text-gray-600 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Lessons */}
              {isOpen && (
                <ul>
                  {section.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => goToLesson(lesson.id)}
                          aria-current={isActive ? 'step' : undefined}
                          className={`w-full flex items-start gap-2.5 px-4 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 ${
                            isActive
                              ? 'bg-indigo-950/60 border-l-2 border-indigo-500'
                              : 'hover:bg-gray-800/40 border-l-2 border-transparent'
                          }`}
                        >
                          {/* Completion circle */}
                          <span className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isDone
                              ? 'bg-indigo-600 border-indigo-600'
                              : isActive
                              ? 'border-indigo-400'
                              : 'border-gray-700'
                          }`}>
                            {isDone && (
                              <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {isActive && !isDone && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            )}
                          </span>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-snug ${
                              isActive ? 'text-indigo-300 font-medium' : isDone ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-700 mt-0.5">{lesson.duration}</p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Take quiz CTA — appears when all lessons done */}
      {allLessonsComplete && (
        <div className="px-4 py-4 border-t border-gray-800 shrink-0">
          <div className="bg-indigo-950/60 border border-indigo-800/50 rounded-xl p-3 text-center space-y-2">
            <p className="text-xs font-semibold text-indigo-300">🎉 All lessons complete!</p>
            <button
              onClick={() => navigate(`/courses/${courseId}/quiz`)}
              className="btn-primary w-full text-xs py-2"
            >
              Take Final Quiz
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
