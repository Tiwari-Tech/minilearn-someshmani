import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
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
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/courses/:id/learn" element={<LessonViewerPage />} />
            <Route path="/courses/:id/quiz" element={<QuizPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="flex-1 flex items-center justify-center text-gray-500 py-32">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-gray-700 mb-3">404</p>
                    <p className="text-gray-400">Page not found.</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </ProgressProvider>
    </BrowserRouter>
  );
}
