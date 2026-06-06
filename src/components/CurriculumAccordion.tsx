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
    <div className="border border-[#e8e8e8] rounded-lg overflow-hidden">
      {sections.map((section, idx) => {
        const isOpen = openSections.has(section.id);
        const completedInSection = section.lessons.filter((l) =>
          completedLessonIds.includes(l.id),
        ).length;

        return (
          <div key={section.id} className="border-b border-[#e8e8e8] last:border-b-0">
            {/* Section header */}
            <button
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-5 py-4 bg-[#f7f9fa] hover:bg-[#f0f0f0] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#a435f0]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg
                  className={`w-4 h-4 text-[#1c1d1f] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="font-bold text-[#1c1d1f] text-sm">
                  Section {idx + 1}: {section.title}
                </span>
              </div>
              <span className="text-xs text-[#6a6f73] shrink-0 ml-3">
                {completedInSection > 0
                  ? `${completedInSection}/${section.lessons.length}`
                  : `${section.lessons.length} lectures`}
              </span>
            </button>

            {/* Lessons */}
            {isOpen && (
              <ul className="divide-y divide-[#e8e8e8]">
                {section.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessonIds.includes(lesson.id);
                  const isClickable = !!onLessonClick;

                  const content = (
                    <>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isDone ? 'bg-[#a435f0] border-[#a435f0]' : 'border-[#6a6f73]'
                      }`}>
                        {isDone && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <svg className="w-3.5 h-3.5 text-[#6a6f73] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                      <span className={`text-sm flex-1 min-w-0 truncate ${
                        isActive ? 'text-[#a435f0] font-semibold' : isDone ? 'text-[#6a6f73]' : 'text-[#1c1d1f]'
                      }`}>
                        {lesson.title}
                      </span>
                      <span className="text-xs text-[#6a6f73] shrink-0">{lesson.duration}</span>
                    </>
                  );

                  return isClickable ? (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onLessonClick(lesson.id)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#a435f0] ${
                          isActive ? 'bg-[#f0e6ff]' : 'hover:bg-[#f7f9fa]'
                        }`}
                      >
                        {content}
                      </button>
                    </li>
                  ) : (
                    <li key={lesson.id} className="flex items-center gap-3 px-5 py-3 bg-white">
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
