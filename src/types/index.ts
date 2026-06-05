// ─── Core domain types ────────────────────────────────────────────────────────

export interface Instructor {
  name: string;
  title: string;
  avatar?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  instructor: Instructor;
  rating: number;
  students: number;
  totalHours: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  gradient: string; // Tailwind gradient classes for thumbnail
  sections: Section[];
  quiz: QuizQuestion[];
}

// ─── Progress / persistence types ─────────────────────────────────────────────

export interface CourseProgress {
  enrolled: boolean;
  completedLessons: string[]; // lesson ids
  currentLessonId: string | null;
  quizAttempt: QuizAttempt | null;
}

export interface QuizAttempt {
  score: number;
  total: number;
  passed: boolean;
  completedAt: string; // ISO date string
}

export interface UserProgress {
  [courseId: string]: CourseProgress;
}
