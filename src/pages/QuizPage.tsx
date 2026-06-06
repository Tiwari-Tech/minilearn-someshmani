import { useState, useReducer } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { QuizQuestion } from '../components/QuizQuestion';
import { CertificateScreen } from '../components/CertificateScreen';
import type { QuizQuestion as QuizQuestionType } from '../types';

const PASS_THRESHOLD = 0.7;
const LEARNER_NAME = 'Demo Learner';

// ─── Quiz state machine ────────────────────────────────────────────────────────

interface QuizState {
  currentIndex: number;
  selectedOption: string | null;
  revealedAnswer: string | null; // null = not submitted yet
  correctCount: number;
  finished: boolean;
}

type QuizAction =
  | { type: 'SELECT'; option: string }
  | { type: 'SUBMIT'; correctAnswer: string }
  | { type: 'NEXT'; totalQuestions: number }
  | { type: 'RETRY' };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SELECT':
      // Ignore clicks after submitting
      if (state.revealedAnswer !== null) return state;
      return { ...state, selectedOption: action.option };

    case 'SUBMIT':
      if (!state.selectedOption || state.revealedAnswer !== null) return state;
      return {
        ...state,
        revealedAnswer: action.correctAnswer,
        correctCount:
          state.selectedOption === action.correctAnswer
            ? state.correctCount + 1
            : state.correctCount,
      };

    case 'NEXT': {
      const isLast = state.currentIndex === action.totalQuestions - 1;
      return {
        ...state,
        currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
        selectedOption: null,
        revealedAnswer: null,
        finished: isLast,
      };
    }

    case 'RETRY':
      return {
        currentIndex: 0,
        selectedOption: null,
        revealedAnswer: null,
        correctCount: 0,
        finished: false,
      };

    default:
      return state;
  }
}

const initialState: QuizState = {
  currentIndex: 0,
  selectedOption: null,
  revealedAnswer: null,
  correctCount: 0,
  finished: false,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseProgress, saveQuizAttempt } = useProgress();

  const course = courses.find((c) => c.id === id);
  const progress = getCourseProgress(course?.id ?? '');

  const [state, dispatch] = useReducer(quizReducer, initialState);
  // Track whether we've already saved this attempt to avoid double-saves
  const [attemptSaved, setAttemptSaved] = useState(false);

  // ── Guards ───────────────────────────────────────────────────────────────
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-6xl font-extrabold text-gray-700 mb-4">404</p>
        <p className="text-gray-400 mb-6">Course not found.</p>
        <Link to="/" className="btn-primary">Browse courses</Link>
      </div>
    );
  }

  if (!progress.enrolled) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-gray-400 mb-6">You need to enroll before taking the quiz.</p>
        <Link to={`/courses/${course.id}`} className="btn-primary">Go to course</Link>
      </div>
    );
  }

  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const allLessonsComplete = progress.completedLessons.length === totalLessons && totalLessons > 0;

  if (!allLessonsComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4 space-y-4">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-2">
          <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-300">Complete all lessons first</p>
        <p className="text-gray-500 text-sm max-w-xs">
          Finish all {totalLessons} lessons before unlocking the final quiz.
        </p>
        <Link to={`/courses/${course.id}/learn`} className="btn-primary mt-2">
          Continue learning
        </Link>
      </div>
    );
  }

  const questions: QuizQuestionType[] = course.quiz;
  const currentQuestion = questions[state.currentIndex];

  // ── Finished state ───────────────────────────────────────────────────────
  if (state.finished) {
    const passed = state.correctCount / questions.length >= PASS_THRESHOLD;
    const pct = Math.round((state.correctCount / questions.length) * 100);
    const completedAt = new Date().toISOString();

    // Persist attempt (once)
    if (!attemptSaved) {
      saveQuizAttempt(course.id, {
        score: state.correctCount,
        total: questions.length,
        passed,
        completedAt,
      });
      setAttemptSaved(true);
    }

    if (passed) {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <CertificateScreen
            course={course}
            score={state.correctCount}
            total={questions.length}
            completedAt={completedAt}
            learnerName={LEARNER_NAME}
          />
        </div>
      );
    }

    // Failed state
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl">😞</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-100">Not quite there yet</h2>
          <p className="text-gray-400">
            You scored{' '}
            <span className="font-bold text-white">
              {state.correctCount}/{questions.length} · {pct}%
            </span>
          </p>
          <p className="text-sm text-gray-500">
            You need {Math.round(PASS_THRESHOLD * 100)}% to pass. Give it another shot!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => { dispatch({ type: 'RETRY' }); setAttemptSaved(false); }}
            className="btn-primary"
          >
            Retry Quiz
          </button>
          <button
            onClick={() => navigate(`/courses/${course.id}/learn`)}
            className="btn-secondary"
          >
            Review lessons
          </button>
        </div>
      </div>
    );
  }

  // ── Active quiz ──────────────────────────────────────────────────────────
  const progressPct = Math.round((state.currentIndex / questions.length) * 100);
  const isSubmitted = state.revealedAnswer !== null;
  const isLastQuestion = state.currentIndex === questions.length - 1;

  return (
    <main className="min-h-screen bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Back link + title */}
        <div className="space-y-1">
          <Link
            to={`/courses/${course.id}`}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {course.title}
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-100">Final Quiz</h1>
        </div>

        {/* Progress bar + counter */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Question {state.currentIndex + 1} of {questions.length}</span>
            <span>{progressPct}% complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="card p-6 sm:p-8">
          <QuizQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={state.selectedOption}
            revealedAnswer={state.revealedAnswer}
            onSelect={(option) => dispatch({ type: 'SELECT', option })}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          {!isSubmitted ? (
            <button
              onClick={() =>
                dispatch({ type: 'SUBMIT', correctAnswer: currentQuestion.correctAnswer })
              }
              disabled={!state.selectedOption}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed px-8"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: 'NEXT', totalQuestions: questions.length })}
              className="btn-primary px-8"
            >
              {isLastQuestion ? 'See results →' : 'Next question →'}
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
