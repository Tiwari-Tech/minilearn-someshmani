import type { Section, Lesson } from '../types';

export interface FlatLesson {
  lesson: Lesson;
  sectionId: string;
  sectionTitle: string;
  globalIndex: number;
}

/** Flatten all lessons across sections into a single ordered array */
export function flattenLessons(sections: Section[]): FlatLesson[] {
  const result: FlatLesson[] = [];
  let globalIndex = 0;
  for (const section of sections) {
    for (const lesson of section.lessons) {
      result.push({ lesson, sectionId: section.id, sectionTitle: section.title, globalIndex });
      globalIndex++;
    }
  }
  return result;
}

/** Return the lesson after the given lessonId, or null if it is the last one */
export function getNextLesson(sections: Section[], currentLessonId: string): Lesson | null {
  const flat = flattenLessons(sections);
  const idx = flat.findIndex((f) => f.lesson.id === currentLessonId);
  if (idx === -1 || idx === flat.length - 1) return null;
  return flat[idx + 1].lesson;
}

/** Return the lesson before the given lessonId, or null if it is the first one */
export function getPrevLesson(sections: Section[], currentLessonId: string): Lesson | null {
  const flat = flattenLessons(sections);
  const idx = flat.findIndex((f) => f.lesson.id === currentLessonId);
  if (idx <= 0) return null;
  return flat[idx - 1].lesson;
}

/** Find a lesson object by id across all sections */
export function findLesson(sections: Section[], lessonId: string): Lesson | null {
  for (const section of sections) {
    const lesson = section.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}
