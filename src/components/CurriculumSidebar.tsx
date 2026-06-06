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
  onLessonClick?: (lessonId: string) => void;
}

export function CurriculumSidebar({
  courseId, sections, activeLessonId, completedLessonIds, allLessonsComplete, onLessonClick,
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
    if (onLessonClick) { onLessonClick(lessonId); }
    else { navigate(`/courses/${courseId}/learn?lesson=${lessonId}`); }
  }

  return (
    <aside className="flex flex-col h-full bg-white border-l border-[#e8e8e8]">
      {/* Header — dark like Udemy */}
      <div className="px-4 py-4 border-b border-[#2d2d2d] bg-[#1c1d1f] shrink-0">
        <h2 className="text-sm font-bold text-white mb-3">Course content</h2>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[#a8a8a8]">
            <span>{completedCount}/{totalLessons} completed</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-[#3d3d3d] w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-[#a435f0] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <nav className="flex-1 overflow-y-auto bg-white" aria-label="Course curriculum">
        {sections.map((section, idx) => {
          const isOpen = openSections.has(section.id);
          const completedInSection = section.lessons.filter((l) =>
            completedLessonIds.includes(l.id),
          ).length;

          return (
            <div key={section.id} className="border-b border-[#e8e8e8]">
              <button
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-[#f7f9fa] hover:bg-[#f0f0f0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#a435f0]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg
                    className={`w-3.5 h-3.5 text-[#1c1d1f] shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-xs font-bold text-[#1c1d1f] truncate">
                    Section {idx + 1}: {section.title}
                  </span>
                </div>
                <span className="text-xs text-[#6a6f73] shrink-0 ml-2">
                  {completedInSection}/{section.lessons.length}
                </span>
              </button>

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
                          className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#a435f0] ${
                            isActive ? 'bg-[#f0e6ff] border-l-2 border-[#a435f0]' : 'hover:bg-[#f7f9fa] border-l-2 border-transparent'
                          }`}
                        >
                          <span className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            isDone ? 'bg-[#a435f0] border-[#a435f0]' : 'border-[#6a6f73]'
                          }`}>
                            {isDone && (
                              <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-snug ${
                              isActive ? 'text-[#a435f0] font-bold' : isDone ? 'text-[#6a6f73]' : 'text-[#1c1d1f]'
                            }`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <svg className="w-2.5 h-2.5 text-[#6a6f73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                              </svg>
                              <span className="text-[10px] text-[#6a6f73]">{lesson.duration}</span>
                            </div>
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

      {/* Quiz CTA */}
      {allLessonsComplete && (
        <div className="px-4 py-4 border-t border-[#e8e8e8] bg-[#f7f9fa] shrink-0">
          <p className="text-xs font-bold text-[#1c1d1f] mb-2">🎉 All lectures complete!</p>
          <button
            onClick={() => navigate(`/courses/${courseId}/quiz`)}
            className="btn-primary w-full text-xs py-2.5 rounded-lg"
          >
            Take Final Quiz
          </button>
        </div>
      )}
    </aside>
  );
}
