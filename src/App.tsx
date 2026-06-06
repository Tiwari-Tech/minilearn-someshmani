import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { CatalogPage } from './pages/CatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonViewerPage } from './pages/LessonViewerPage';
import { QuizPage } from './pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/courses/:id/learn" element={<LessonViewerPage />} />
            <Route path="/courses/:id/quiz" element={<QuizPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="flex-1 flex flex-col items-center justify-center py-32 text-center px-4">
                  <p className="text-6xl font-extrabold text-[#1c1d1f] mb-4">404</p>
                  <p className="text-[#6a6f73] mb-6">Page not found.</p>
                  <Link to="/" className="btn-primary">Browse courses</Link>
                </div>
              }
            />
            </Routes>
          </ErrorBoundary>
        </div>
      </ProgressProvider>
    </BrowserRouter>
  );
}
