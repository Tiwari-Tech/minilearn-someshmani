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
    <main className="min-h-screen">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950/40 to-gray-900 border-b border-gray-800">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
              Learn without limits.
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              {courses.length} courses across {categories.length - 1} categories — start anywhere.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                aria-label="Search courses"
                className="w-full bg-gray-800/80 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter pills */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                activeCategory === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length === 0
            ? 'No courses match your search'
            : `Showing ${filtered.length} course${filtered.length === 1 ? '' : 's'}`}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {query && ` for "${query}"`}
        </p>

        {/* Course grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">No courses found</h2>
            <p className="text-gray-500 text-sm max-w-xs">
              Try adjusting your search or clearing the category filter.
            </p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); }}
              className="mt-5 btn-secondary"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
