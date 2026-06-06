import { useState, useMemo } from 'react';
import { courses, categories } from '../data/courses';
import { filterCourses } from '../utils/search';
import { CourseCard } from '../components/CourseCard';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => filterCourses(courses, query, activeCategory),
    [query, activeCategory],
  );

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#1c1d1f] py-10 sm:py-14 px-4">
        <div className="max-w-[1340px] mx-auto">
          <p className="text-xs font-semibold text-[#a435f0] uppercase tracking-widest mb-2">
            MiniLearn · {categories.length - 1} Categories
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Learn without limits.
          </h1>
          <p className="text-[#a8a8a8] text-base sm:text-lg mb-6 max-w-xl">
            Explore {courses.length} expert-led courses across design, programming, wellness and more.
          </p>

          {/* Mobile search */}
          <div className="relative max-w-lg sm:hidden">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#6a6f73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything"
              className="w-full bg-white border-2 border-white rounded-full pl-10 pr-4 py-2.5 text-sm text-[#1c1d1f] placeholder-[#6a6f73] focus:outline-none focus:border-[#a435f0]"
            />
          </div>
        </div>
      </section>

      {/* ── Catalog body ── */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 py-8">

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {/* Category pills — rounded-full Udemy style */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0] whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#1c1d1f] text-white border-[#1c1d1f]'
                    : 'bg-white text-[#1c1d1f] border-[#c9c9c9] hover:border-[#1c1d1f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop search */}
          <div className="relative hidden sm:flex items-center shrink-0">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#6a6f73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              aria-label="Search courses"
              className="border border-[#c9c9c9] rounded-full pl-9 pr-10 py-1.5 text-sm text-[#1c1d1f] placeholder-[#6a6f73] focus:outline-none focus:border-[#a435f0] focus:ring-1 focus:ring-[#a435f0] w-48 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 text-[#6a6f73] hover:text-[#1c1d1f]"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-[#6a6f73] mb-5">
          {filtered.length === 0
            ? 'No courses match your search'
            : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {query && ` for "${query}"`}
        </p>

        {/* Course grid — responsive 1→2→3→4 */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[#f7f9fa] border border-[#e8e8e8] rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#6a6f73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#1c1d1f] mb-2">No results found</h2>
            <p className="text-[#6a6f73] text-sm max-w-xs mb-5">
              Try different keywords or clear the category filter.
            </p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); }}
              className="btn-secondary rounded-full px-6"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
