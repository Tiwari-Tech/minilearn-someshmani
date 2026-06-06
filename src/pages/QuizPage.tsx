import { useState, useReducer } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { QuizQuestion } from '../components/QuizQuestion';
import { CertificateScreen } from '../components/CertificateScreen';
import type { QuizQuestion as QuizQuestionType } from '../types';

const PASS_THRESHOLD = 0.7;
const LEARNER_NAME = 'Demo Learner';

interface QuizState {
  currentIndex: number;
  selectedOption: string | null;
  revealedAnswer: string | null;
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
      return { currentIndex: 0, selectedOption: null, revealedAnswer: null, correctCount: 0, finished: false };

    default:
      return state;
  }
}

const initialState: QuizState = {
  currentIndex: 0, selectedOption: null, revealedAnswer: null, correctCount: 0, finished: false,
};

export function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseProgress, saveQuizAttempt } = useProgress();

  const course = courses.find((c) => c.id === id);
  const progress = getCourseProgress(course?.id ?? '');
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [attemptSaved, setAttemptSaved] = useState(false);

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
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-[#6a6f73] mb-6">Enroll in the course before taking the quiz.</p>
        <Link to={`/courses/${course.id}`} className="btn-primary">Go to course</Link>
      </div>
    );
  }

  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const allLessonsComplete = progress.completedLessons.length === totalLessons && totalLessons > 0;

  if (!allLessonsComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4 space-y-4">
        <div className="w-16 h-16 bg-[#f7f9fa] border border-[#d1d7dc] flex items-center justify-center mb-2">
          <svg className="w-7 h-7 text-[#6a6f73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25-2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <p className="text-lg font-bold text-[#1c1d1f]">Complete all lectures first</p>
        <p className="text-[#6a6f73] text-sm max-w-xs">
          Finish all {totalLessons} lectures to unlock the final quiz.
        </p>
        <Link to={`/courses/${course.id}/learn`} className="btn-primary mt-2">
          Continue learning
        </Link>
      </div>
    );
  }

  const questions: QuizQuestionType[] = course.quiz;
  const currentQuestion = questions[state.currentIndex];

  // Finished state
  if (state.finished) {
    const passed = state.correctCount / questions.length >= PASS_THRESHOLD;
    const pct = Math.round((state.correctCount / questions.length) * 100);
    const completedAt = new Date().toISOString();

    if (!attemptSaved) {
      saveQuizAttempt(course.id, { score: state.correctCount, total: questions.length, passed, completedAt });
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

    // Failed
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#fdf2f0] border-2 border-[#c0392b] flex items-center justify-center mx-auto">
          <span className="text-3xl">😞</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#1c1d1f]">Not quite there yet</h2>
          <p className="text-[#6a6f73]">
            You scored <span className="font-bold text-[#1c1d1f]">{state.correctCount}/{questions.length} · {pct}%</span>
          </p>
          <p className="text-sm text-[#6a6f73]">
            You need {Math.round(PASS_THRESHOLD * 100)}% to pass. Try again!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => { dispatch({ type: 'RETRY' }); setAttemptSaved(false); }}
            className="btn-primary"
          >
            Retry quiz
          </button>
          <button onClick={() => navigate(`/courses/${course.id}/learn`)} className="btn-secondary">
            Review lectures
          </button>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((state.currentIndex / questions.length) * 100);
  const isSubmitted = state.revealedAnswer !== null;
  const isLastQuestion = state.currentIndex === questions.length - 1;

  return (
    <main className="min-h-screen bg-[#f7f9fa]">
      {/* Top bar removed: rely on global Navbar */}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-[#6a6f73]">
            <span>Question {state.currentIndex + 1} of {questions.length}</span>
            <span>{progressPct}% complete</span>
          </div>
          <div className="h-2 bg-[#d1d7dc] w-full">
            <div
              className="h-full bg-[#a435f0] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white border border-[#d1d7dc] p-6 sm:p-8 shadow-sm">
          <QuizQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={state.selectedOption}
            revealedAnswer={state.revealedAnswer}
            onSelect={(option) => dispatch({ type: 'SELECT', option })}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!isSubmitted ? (
            <button
              onClick={() => dispatch({ type: 'SUBMIT', correctAnswer: currentQuestion.correctAnswer })}
              disabled={!state.selectedOption}
              className="btn-primary px-8 disabled:opacity-40 disabled:cursor-not-allowed"
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
