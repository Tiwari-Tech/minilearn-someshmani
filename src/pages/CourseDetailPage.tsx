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
  const { enrolled, currentLessonId } = getCourseProgress(course?.id ?? '');

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <p className="text-6xl font-extrabold text-[#1c1d1f] mb-4">404</p>
        <p className="text-[#6a6f73] mb-6">Course not found.</p>
        <Link to="/" className="btn-primary">Browse all courses</Link>
      </div>
    );
  }

  const safeCourse = course;
  const totalLessons = safeCourse.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const firstLessonId = safeCourse.sections[0]?.lessons[0]?.id ?? '';
  const formatStudents = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  function handleCTA() {
    if (!enrolled) enroll(safeCourse.id, firstLessonId);
    const lessonId = currentLessonId ?? firstLessonId;
    navigate(`/courses/${safeCourse.id}/learn?lesson=${lessonId}`);
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Dark hero */}
      <section className="bg-[#1c1d1f] py-10 sm:py-14">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:pr-[360px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#cec0fc] mb-4 flex-wrap">
            <Link to="/" className="hover:underline">Catalog</Link>
            <span className="text-[#6a6f73]">/</span>
            <span className="text-[#cec0fc]">{safeCourse.category}</span>
            <span className="text-[#6a6f73]">/</span>
            <span className="text-white/80 truncate max-w-[180px] sm:max-w-none">{safeCourse.title}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3 max-w-2xl">
            {safeCourse.title}
          </h1>
          <p className="text-[#d1d7dc] text-sm sm:text-base mb-4 max-w-2xl leading-relaxed">
            {safeCourse.headline}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
            <StarRating rating={safeCourse.rating} size="md" showCount={safeCourse.students} />
            <span className="text-[#d1d7dc] text-xs">{formatStudents(safeCourse.students)} students</span>
          </div>

          <p className="text-[#d1d7dc] text-sm">
            Created by{' '}
            <span className="text-[#cec0fc] underline cursor-pointer hover:text-white">
              {safeCourse.instructor.name}
            </span>
          </p>

          <div className="flex flex-wrap gap-3 mt-4 text-xs text-[#d1d7dc]">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/></svg>
              Last updated 2024
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Certificate of completion
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex border-b border-[#e8e8e8] mb-8" role="tablist">
              {(['overview', 'curriculum'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-bold capitalize border-b-2 -mb-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0] ${
                    activeTab === tab
                      ? 'border-[#1c1d1f] text-[#1c1d1f]'
                      : 'border-transparent text-[#6a6f73] hover:text-[#1c1d1f]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* What you'll learn — Udemy's bordered box */}
                <div className="border border-[#e8e8e8] rounded-lg p-5 sm:p-6">
                  <h2 className="text-xl font-bold text-[#1c1d1f] mb-4">What you'll learn</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {safeCourse.sections.map((s) => (
                      <li key={s.id} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-[#1c1d1f] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-[#1c1d1f]">{s.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#1c1d1f] mb-3">Course description</h2>
                  <p className="text-[#1c1d1f] text-sm leading-relaxed">{safeCourse.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#1c1d1f] mb-3">Topics</h2>
                  <div className="flex flex-wrap gap-2">
                    {safeCourse.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-[#f7f9fa] border border-[#e8e8e8] rounded-full text-[#1c1d1f] text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#1c1d1f] mb-4">This course includes</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#1c1d1f]">
                    {[
                      { icon: '🎬', label: `${safeCourse.totalHours} hours on-demand video` },
                      { icon: '📱', label: 'Access on mobile and desktop' },
                      { icon: '📝', label: `${safeCourse.quiz.length}-question final quiz` },
                      { icon: '🏆', label: 'Certificate of completion' },
                      { icon: '♾️', label: 'Full lifetime access' },
                      { icon: '📚', label: `${totalLessons} lessons` },
                    ].map(({ icon, label }) => (
                      <li key={label} className="flex items-center gap-2">
                        <span>{icon}</span><span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#1c1d1f] mb-4">Instructor</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#a435f0] flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl shrink-0">
                      {safeCourse.instructor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#a435f0] text-base hover:underline cursor-pointer">
                        {safeCourse.instructor.name}
                      </p>
                      <p className="text-sm text-[#6a6f73]">{safeCourse.instructor.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum */}
            {activeTab === 'curriculum' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className="text-xl font-bold text-[#1c1d1f]">Course content</h2>
                  <span className="text-sm text-[#6a6f73]">
                    {safeCourse.sections.length} sections · {totalLessons} lectures · {safeCourse.totalHours}h
                  </span>
                </div>
                <CurriculumAccordion sections={safeCourse.sections} />
              </div>
            )}
          </div>

          {/* Sticky card — hidden on mobile (shown inline below hero on mobile) */}
          <div className="lg:w-[300px] xl:w-[340px] shrink-0">
            <div className="sticky top-20 border border-[#e8e8e8] rounded-lg shadow-lg bg-white overflow-hidden">
              {/* Thumbnail */}
              <div className={`w-full aspect-video bg-gradient-to-br ${safeCourse.gradient} relative`}>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-3xl font-extrabold text-[#1c1d1f]">Free</p>
                <button onClick={handleCTA} className="btn-primary w-full py-3 text-base rounded-lg">
                  {enrolled ? 'Go to course' : 'Enroll now'}
                </button>
                {!enrolled && (
                  <p className="text-xs text-[#6a6f73] text-center">30-Day Money-Back Guarantee</p>
                )}
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-bold text-[#1c1d1f]">This course includes:</p>
                  <ul className="space-y-1.5 text-sm text-[#1c1d1f]">
                    {[
                      { icon: '🎬', label: `${safeCourse.totalHours} hours of video` },
                      { icon: '📚', label: `${totalLessons} lessons` },
                      { icon: '📱', label: 'Mobile & desktop access' },
                      { icon: '🏆', label: 'Certificate of completion' },
                    ].map(({ icon, label }) => (
                      <li key={label} className="flex items-center gap-2">
                        <span>{icon}</span><span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center gap-4 pt-2 text-xs font-bold text-[#a435f0]">
                  <button className="hover:underline">Share</button>
                  <button className="hover:underline">Gift this course</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
