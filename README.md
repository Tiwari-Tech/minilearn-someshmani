# minilearn-someshmani

Udemy-style learner platform built for iLipi Learning take-home assignment.
React 18 · TypeScript · Tailwind CSS · Vite · React Router 6

---

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # unit tests
npm run build     # type check + production build
```

No env variables needed.

---

## What's built

**Catalog ( / )** — course grid with search and category filter pills. Empty state when nothing matches.

**Course detail ( /courses/:id )** — dark hero, overview + curriculum tabs, expandable sections, sticky enroll/continue card.

**Lesson viewer ( /courses/:id/learn )** — sidebar with completion ticks, video placeholder, mark complete auto-advances. Arrow keys navigate lessons. Quiz CTA appears when all lessons done.

**Quiz ( /courses/:id/quiz )** — one question at a time, inline correct/incorrect reveal, 70% to pass. Pass shows certificate, fail shows retry.

**Persistence** — enrollment, completions, and quiz results all survive reload via localStorage (`minilearn:demo-user:progress`).

---

## What's missing

- No actual video playback — placeholder only, brief said that's fine
- No real auth — hardcoded demo-user
- Dark mode — skipped, brief marked it as bonus
- No pagination — 6 courses so not needed yet

---

## Key decisions

**useReducer + Context** — all progress state in one place, transitions are explicit, localStorage syncs in one useEffect.

**?lesson=id in the URL** — makes lessons deep-linkable and keeps sidebar + main area in sync without extra logic.

**filterCourses as a pure util** — easy to test, works cleanly with useMemo.

**ErrorBoundary** — wraps the app so a render crash shows a clean screen instead of a blank page.

---

## One thing I'd do differently

Add a proper async data layer instead of a direct import. Would make loading/error states real and expose what needs to change in the context design when a backend is involved.

---

## One question for the reviewer

I used useReducer inside a Context provider — Context as transport, useReducer as logic. Was that the intended pattern or was the expectation to avoid Context too? Flagging it since the requirement could be read either way.

---

## Tests

```bash
npm test
# ✓ tests/search.test.ts (8 tests)
```

Covers filterCourses — empty query, case-insensitive match, category filter, combined filters, whitespace, no match, empty list.

---

## Structure

```
src/
├── data/courses.ts           6 courses, 4 categories
├── types/index.ts            Course, Section, Lesson, QuizQuestion, CourseProgress
├── context/ProgressContext   useReducer + localStorage
├── hooks/useNextLesson.ts    pure lesson navigation helpers
├── utils/search.ts           filterCourses (tested)
├── pages/                    one file per route
└── components/               small single-responsibility components
```