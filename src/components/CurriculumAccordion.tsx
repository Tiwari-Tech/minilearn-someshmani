import { useState } from 'react';
import type { Section } from '../types';

interface CurriculumAccordionProps {
  sections: Section[];
  activeLessonId?: string;
  completedLessonIds?: string[];
  onLessonClick?: (lessonId: string) => void;
}

export function CurriculumAccordion({
  sections,
  activeLessonId,
  completedLessonIds = [],
  onLessonClick,
}: CurriculumAccordionProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(sections.map((s) => s.id)),
  );

  function toggleSection(sectionId: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {sections.map((section, idx) => {
        const isOpen = openSections.has(section.id);
        const completedInSection = section.lessons.filter((l) =>
          completedLessonIds.includes(l.id),
        ).length;

        return (
          <div key={section.id} className="border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-900 hover:bg-gray-800/70 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-bold text-gray-600 w-5 text-center shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold text-gray-200 text-sm truncate">
                  {section.title}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-xs text-gray-500">
                  {completedInSection > 0
                    ? `${completedInSection}/${section.lessons.length}`
                    : `${section.lessons.length} lessons`}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <ul className="divide-y divide-gray-800/60">
                {section.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessonIds.includes(lesson.id);
                  const isClickable = !!onLessonClick;

                  const content = (
                    <>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isDone ? 'bg-indigo-600 border-indigo-600' : isActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700'
                      }`}>
                        {isDone && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isActive && !isDone && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                      </span>
                      <svg className="w-3.5 h-3.5 text-gray-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span className={`text-sm flex-1 min-w-0 truncate ${
                        isActive ? 'text-indigo-300 font-medium' : isDone ? 'text-gray-500' : 'text-gray-300'
                      }`}>
                        {lesson.title}
                      </span>
                      <span className="text-xs text-gray-600 shrink-0">{lesson.duration}</span>
                    </>
                  );

                  return isClickable ? (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onLessonClick(lesson.id)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 ${
                          isActive ? 'bg-indigo-950/40' : 'hover:bg-gray-800/40'
                        }`}
                      >
                        {content}
                      </button>
                    </li>
                  ) : (
                    <li key={lesson.id} className="flex items-center gap-3 px-5 py-3">
                      {content}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
