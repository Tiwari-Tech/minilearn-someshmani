import type { Course } from '../types';

/**
 * Filter courses by search query (title substring match) and/or category.
 * Both filters are applied together (AND logic).
 * Passing "All" for category disables the category filter.
 */
export function filterCourses(
  courses: Course[],
  query: string,
  category: string,
): Course[] {
  const normalised = query.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesQuery =
      normalised === '' || course.title.toLowerCase().includes(normalised);

    const matchesCategory =
      category === 'All' || course.category === category;

    return matchesQuery && matchesCategory;
  });
}
