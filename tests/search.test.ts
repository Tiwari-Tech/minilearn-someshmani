import { describe, it, expect } from 'vitest';
import { filterCourses } from '../src/utils/search';
import type { Course } from '../src/types';

// Minimal course stubs for testing
const mockCourses: Course[] = [
  {
    id: 'react-intro',
    title: 'Modern React from Scratch',
    category: 'Programming',
    headline: '',
    description: '',
    instructor: { name: 'Anita Rao', title: '' },
    rating: 4.7,
    students: 100,
    totalHours: '10',
    level: 'Beginner',
    tags: [],
    gradient: '',
    sections: [],
    quiz: [],
  },
  {
    id: 'ui-design',
    title: 'UI Design Fundamentals',
    category: 'Design',
    headline: '',
    description: '',
    instructor: { name: 'Priya Sharma', title: '' },
    rating: 4.8,
    students: 200,
    totalHours: '8',
    level: 'Beginner',
    tags: [],
    gradient: '',
    sections: [],
    quiz: [],
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking Mastery',
    category: 'Soft Skills',
    headline: '',
    description: '',
    instructor: { name: 'Vikram Nair', title: '' },
    rating: 4.9,
    students: 300,
    totalHours: '6',
    level: 'Beginner',
    tags: [],
    gradient: '',
    sections: [],
    quiz: [],
  },
];

describe('filterCourses', () => {
  it('returns all courses when query is empty and category is All', () => {
    expect(filterCourses(mockCourses, '', 'All')).toHaveLength(3);
  });

  it('filters by case-insensitive title substring', () => {
    const result = filterCourses(mockCourses, 'react', 'All');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('react-intro');
  });

  it('is case-insensitive (uppercase query)', () => {
    const result = filterCourses(mockCourses, 'DESIGN', 'All');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('ui-design');
  });

  it('filters by category', () => {
    const result = filterCourses(mockCourses, '', 'Programming');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('Programming');
  });

  it('applies both query and category filters together', () => {
    const result = filterCourses(mockCourses, 'react', 'Design');
    expect(result).toHaveLength(0);
  });

  it('returns empty array when nothing matches', () => {
    expect(filterCourses(mockCourses, 'zzznomatch', 'All')).toHaveLength(0);
  });

  it('trims whitespace from query', () => {
    const result = filterCourses(mockCourses, '  react  ', 'All');
    expect(result).toHaveLength(1);
  });

  it('returns empty array when courses list is empty', () => {
    expect(filterCourses([], 'react', 'All')).toHaveLength(0);
  });
});
