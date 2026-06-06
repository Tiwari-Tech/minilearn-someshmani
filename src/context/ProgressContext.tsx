import React, { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';
import type { UserProgress, CourseProgress, QuizAttempt } from '../types';

// ─── Constants ────────────────────────────────────────────────────────────────

const USER_ID = 'demo-user';
const STORAGE_KEY = `minilearn:${USER_ID}:progress`;

const DEFAULT_COURSE_PROGRESS: CourseProgress = {
  enrolled: false,
  completedLessons: [],
  currentLessonId: null,
  quizAttempt: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'ENROLL'; courseId: string; firstLessonId: string }
  | { type: 'COMPLETE_LESSON'; courseId: string; lessonId: string; nextLessonId: string | null }
  | { type: 'SET_CURRENT_LESSON'; courseId: string; lessonId: string }
  | { type: 'SAVE_QUIZ_ATTEMPT'; courseId: string; attempt: QuizAttempt }
  | { type: 'HYDRATE'; state: UserProgress };

function progressReducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;

    case 'ENROLL': {
      const existing = state[action.courseId] ?? DEFAULT_COURSE_PROGRESS;
      return {
        ...state,
        [action.courseId]: {
          ...existing,
          enrolled: true,
          currentLessonId: existing.currentLessonId ?? action.firstLessonId,
        },
      };
    }

    case 'COMPLETE_LESSON': {
      const existing = state[action.courseId] ?? DEFAULT_COURSE_PROGRESS;
      const alreadyDone = existing.completedLessons.includes(action.lessonId);
      return {
        ...state,
        [action.courseId]: {
          ...existing,
          completedLessons: alreadyDone
            ? existing.completedLessons
            : [...existing.completedLessons, action.lessonId],
          currentLessonId: action.nextLessonId ?? action.lessonId,
        },
      };
    }

    case 'SET_CURRENT_LESSON': {
      const existing = state[action.courseId] ?? DEFAULT_COURSE_PROGRESS;
      return {
        ...state,
        [action.courseId]: { ...existing, currentLessonId: action.lessonId },
      };
    }

    case 'SAVE_QUIZ_ATTEMPT': {
      const existing = state[action.courseId] ?? DEFAULT_COURSE_PROGRESS;
      return {
        ...state,
        [action.courseId]: { ...existing, quizAttempt: action.attempt },
      };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface ProgressContextValue {
  progress: UserProgress;
  getCourseProgress: (courseId: string) => CourseProgress;
  enroll: (courseId: string, firstLessonId: string) => void;
  completeLesson: (courseId: string, lessonId: string, nextLessonId: string | null) => void;
  setCurrentLesson: (courseId: string, lessonId: string) => void;
  saveQuizAttempt: (courseId: string, attempt: QuizAttempt) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, dispatch] = useReducer(progressReducer, {});
  // Guard: don't write to localStorage until we've read from it first
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        dispatch({ type: 'HYDRATE', state: parsed });
      }
    } catch {
      // Corrupted storage — start fresh
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      // Always mark hydrated so the persist effect can start writing
      setHydrated(true);
    }
  }, []);

  // Persist to localStorage — only AFTER hydration to avoid wiping stored data
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage quota exceeded — fail silently
    }
  }, [progress, hydrated]);

  const getCourseProgress = useCallback(
    (courseId: string): CourseProgress =>
      progress[courseId] ?? DEFAULT_COURSE_PROGRESS,
    [progress],
  );

  const enroll = useCallback((courseId: string, firstLessonId: string) => {
    dispatch({ type: 'ENROLL', courseId, firstLessonId });
  }, []);

  const completeLesson = useCallback(
    (courseId: string, lessonId: string, nextLessonId: string | null) => {
      dispatch({ type: 'COMPLETE_LESSON', courseId, lessonId, nextLessonId });
    },
    [],
  );

  const setCurrentLesson = useCallback((courseId: string, lessonId: string) => {
    dispatch({ type: 'SET_CURRENT_LESSON', courseId, lessonId });
  }, []);

  const saveQuizAttempt = useCallback((courseId: string, attempt: QuizAttempt) => {
    dispatch({ type: 'SAVE_QUIZ_ATTEMPT', courseId, attempt });
  }, []);

  return (
    <ProgressContext.Provider
      value={{ progress, getCourseProgress, enroll, completeLesson, setCurrentLesson, saveQuizAttempt }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}