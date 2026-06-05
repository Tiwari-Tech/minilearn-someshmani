import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { StarRating } from '../components/StarRating';
import { CurriculumAccordion } from '../components/CurriculumAccordion';

type Tab = 'overview' | 'curriculum';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseProgress, enroll } = useProgress();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const course = courses.find((c) => c.id === id);

  // getCourseProgress is a pure selector — safe to call with empty string when course is missing;
  // we return early before using the result if course is undefined.
  const { enrolled, currentLessonId } = getCourseProgress(course?.id ?? '');

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-6xl font-extrabold text-gray-700 mb-4">404</p>
        <p className="text-gray-400 mb-6">Course not found.</p>
        <Link to="/" className="btn-primary">Browse all courses</Link>
      </div>
    );
  }
  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const firstLessonId = course.sections[0]?.lessons[0]?.id ?? '';

  const formatStudents = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  // course is guaranteed non-null here (early return above handles the null case)
  const safeCourse = course;

  function handleCTA() {
    if (!enrolled) {
      enroll(safeCourse.id, firstLessonId);
    }
    const lessonId = currentLessonId ?? firstLessonId;
    navigate(`/courses/${safeCourse.id}/learn?lesson=${lessonId}`);
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${course.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/20 translate-y-1/2 -translate-x-1/4 blur-xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-5">
              <Link to="/" className="hover:text-white transition-colors">Catalog</Link>
              <span>/</span>
              <span className="text-white/80">{course.category}</span>
              <span>/</span>
              <span className="text-white truncate max-w-[180px]">{course.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold rounded-full">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold rounded-full">
                {course.level}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">{course.headline}</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 mb-6">
              <StarRating rating={course.rating} size="md" />
              <span>{formatStudents(course.students)} students</span>
              <span>·</span>
              <span>{course.totalHours}h total</span>
              <span>·</span>
              <span>{totalLessons} lessons</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm shrink-0">
                {course.instructor.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{course.instructor.name}</p>
                <p className="text-white/60 text-xs">{course.instructor.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left: tabs */}
          <div className="flex-1 min-w-0">
            <div className="flex border-b border-gray-800 mb-8" role="tablist">
              {(['overview', 'curriculum'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-gray-100 mb-3">About this course</h2>
                  <p className="text-gray-400 leading-relaxed">{course.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-100 mb-4">What you'll learn</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.sections.map((section) => (
                      <li key={section.id} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300 text-sm">{section.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-100 mb-3">Topics</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-100 mb-4">Course includes</h2>
                  <ul className="space-y-2.5">
                    {[
                      { icon: '🎬', label: `${course.totalHours} hours of on-demand video` },
                      { icon: '📚', label: `${totalLessons} lessons across ${course.sections.length} sections` },
                      { icon: '📝', label: `${course.quiz.length}-question final quiz` },
                      { icon: '🏆', label: 'Certificate of completion' },
                      { icon: '♾️', label: 'Full lifetime access' },
                    ].map(({ icon, label }) => (
                      <li key={label} className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="text-base">{icon}</span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-100">Course curriculum</h2>
                  <span className="text-sm text-gray-500">
                    {course.sections.length} sections · {totalLessons} lessons · {course.totalHours}h
                  </span>
                </div>
                <CurriculumAccordion sections={course.sections} />
              </div>
            )}
          </div>

          {/* Right: sticky CTA card */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24 card p-6 space-y-5">
              <div className={`h-36 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <svg className="relative z-10 w-12 h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </div>

              <button onClick={handleCTA} className="btn-primary w-full py-3 text-base">
                {enrolled ? '▶ Continue Learning' : 'Enroll Now — Free'}
              </button>

              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Rating', value: `${course.rating} / 5.0` },
                  { label: 'Students', value: formatStudents(course.students) },
                  { label: 'Total hours', value: `${course.totalHours}h` },
                  { label: 'Lessons', value: String(totalLessons) },
                  { label: 'Level', value: course.level },
                  { label: 'Quiz', value: `${course.quiz.length} questions` },
                ].map(({ label, value }) => (
                  <li key={label} className="flex justify-between text-gray-400">
                    <span>{label}</span>
                    <span className="text-gray-200 font-medium">{value}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Instructor</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm shrink-0">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-200 font-semibold text-sm">{course.instructor.name}</p>
                    <p className="text-gray-500 text-xs">{course.instructor.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
