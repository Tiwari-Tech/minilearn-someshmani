import type { Course } from '../types';

export const courses: Course[] = [
  {
    id: 'react-intro',
    title: 'Modern React from Scratch',
    category: 'Programming',
    headline: 'Master React 18, hooks, context and modern patterns used in production.',
    description:
      'This course takes you from zero to building real-world React applications. You will learn functional components, the full hooks API, Context for state management, React Router for navigation, and performance patterns like memoization. Each section builds on the last, culminating in a complete project.',
    instructor: { name: 'Anita Rao', title: 'Senior Frontend Engineer @ Flipkart' },
    rating: 4.7,
    students: 12450,
    totalHours: '14.5',
    level: 'Beginner',
    tags: ['React', 'JavaScript', 'Frontend'],
    gradient: 'from-violet-600 to-indigo-700',
    sections: [
      {
        id: 's1',
        title: 'Getting Started',
        lessons: [
          { id: 'l1', title: 'What is React and why it matters', duration: '8m', description: 'An overview of the React ecosystem, virtual DOM, and how React compares to other frameworks.' },
          { id: 'l2', title: 'Setting up your dev environment', duration: '10m', description: 'Install Node.js, create a Vite project, and understand the project scaffold.' },
          { id: 'l3', title: 'Components & JSX', duration: '12m', description: 'Learn how JSX compiles to React.createElement calls and how to write your first component.' },
        ],
      },
      {
        id: 's2',
        title: 'Hooks Deep Dive',
        lessons: [
          { id: 'l4', title: 'useState and derived state', duration: '14m', description: 'Master local state, lazy initializers, and common patterns for derived state.' },
          { id: 'l5', title: 'useEffect and the dependency array', duration: '16m', description: 'Understand the effect lifecycle, cleanup functions, and how to avoid infinite loops.' },
          { id: 'l6', title: 'useRef and useMemo', duration: '11m', description: 'DOM references, mutable values across renders, and when to reach for useMemo.' },
        ],
      },
      {
        id: 's3',
        title: 'Context & Routing',
        lessons: [
          { id: 'l7', title: 'React Context for shared state', duration: '13m', description: 'Build a theme context from scratch — provider, consumer, and custom hook pattern.' },
          { id: 'l8', title: 'React Router 6 essentials', duration: '15m', description: 'Routes, Links, useNavigate, useParams, and protecting routes.' },
        ],
      },
      {
        id: 's4',
        title: 'Production Patterns',
        lessons: [
          { id: 'l9', title: 'Code splitting and lazy loading', duration: '9m', description: 'Use React.lazy and Suspense to split your bundle and improve load time.' },
          { id: 'l10', title: 'Error boundaries', duration: '8m', description: 'Catch rendering errors gracefully with class-based error boundaries.' },
        ],
      },
    ],
    quiz: [
      { id: 'q1', question: 'Which hook is used for side effects?', options: ['useState', 'useEffect', 'useMemo', 'useRef'], correctAnswer: 'useEffect' },
      { id: 'q2', question: 'What does the dependency array in useEffect control?', options: ['When the component mounts', 'When the effect re-runs', 'The component render count', 'State initialization'], correctAnswer: 'When the effect re-runs' },
      { id: 'q3', question: 'Which is the correct way to update state based on previous value?', options: ['setState(state + 1)', 'setState(prev => prev + 1)', 'state = state + 1', 'setState({ ...state, count: 1 })'], correctAnswer: 'setState(prev => prev + 1)' },
      { id: 'q4', question: 'React Context is primarily used for:', options: ['Server-side rendering', 'Avoiding prop drilling', 'HTTP requests', 'CSS styling'], correctAnswer: 'Avoiding prop drilling' },
      { id: 'q5', question: 'What does React.lazy() enable?', options: ['Lazy state updates', 'Code splitting', 'Deferred rendering', 'Virtual DOM diffing'], correctAnswer: 'Code splitting' },
      { id: 'q6', question: 'useRef returns:', options: ['A state value', 'A mutable ref object', 'A derived value', 'A context'], correctAnswer: 'A mutable ref object' },
    ],
  },

  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    category: 'Programming',
    headline: 'Go from Python basics to pandas, matplotlib, and real datasets.',
    description:
      'A hands-on introduction to data science using Python. You will install Jupyter, work with NumPy arrays, wrangle data with pandas, and visualise trends with matplotlib and seaborn. Every lesson uses a real dataset so you build intuition alongside syntax.',
    instructor: { name: 'Rohan Mehta', title: 'Data Scientist @ CRED' },
    rating: 4.5,
    students: 9210,
    totalHours: '18',
    level: 'Beginner',
    tags: ['Python', 'Data Science', 'pandas'],
    gradient: 'from-emerald-500 to-teal-700',
    sections: [
      {
        id: 's1',
        title: 'Python Refresher',
        lessons: [
          { id: 'l1', title: 'Python data types and control flow', duration: '12m', description: 'Lists, dicts, loops, and comprehensions — the building blocks for data work.' },
          { id: 'l2', title: 'Functions and modules', duration: '10m', description: 'Write reusable functions, import third-party packages, and understand scope.' },
        ],
      },
      {
        id: 's2',
        title: 'NumPy & pandas',
        lessons: [
          { id: 'l3', title: 'NumPy arrays and broadcasting', duration: '14m', description: 'Vectorised operations, slicing, and why NumPy is faster than plain Python.' },
          { id: 'l4', title: 'pandas DataFrames', duration: '18m', description: 'Load CSVs, filter rows, group by columns, and handle missing values.' },
          { id: 'l5', title: 'Merging and reshaping data', duration: '15m', description: 'Merge, join, pivot tables, and the melt function.' },
        ],
      },
      {
        id: 's3',
        title: 'Visualisation',
        lessons: [
          { id: 'l6', title: 'matplotlib fundamentals', duration: '11m', description: 'Figures, axes, line plots, scatter plots, and saving charts.' },
          { id: 'l7', title: 'Seaborn for statistical plots', duration: '13m', description: 'Distribution plots, box plots, heatmaps, and pair plots.' },
        ],
      },
    ],
    quiz: [
      { id: 'q1', question: 'Which pandas method removes duplicate rows?', options: ['drop_duplicates()', 'remove_dupes()', 'unique()', 'dropna()'], correctAnswer: 'drop_duplicates()' },
      { id: 'q2', question: 'What does df.groupby() return?', options: ['A DataFrame', 'A GroupBy object', 'A Series', 'A list'], correctAnswer: 'A GroupBy object' },
      { id: 'q3', question: 'NumPy broadcasting allows:', options: ['Looping over arrays', 'Operating on arrays of different shapes', 'GPU acceleration', 'Lazy evaluation'], correctAnswer: 'Operating on arrays of different shapes' },
      { id: 'q4', question: 'Which function reads a CSV into pandas?', options: ['pd.load_csv()', 'pd.read_csv()', 'pd.import_csv()', 'pd.open_csv()'], correctAnswer: 'pd.read_csv()' },
      { id: 'q5', question: 'Seaborn is built on top of:', options: ['Plotly', 'Bokeh', 'matplotlib', 'D3.js'], correctAnswer: 'matplotlib' },
    ],
  },

  {
    id: 'ui-design-fundamentals',
    title: 'UI Design Fundamentals',
    category: 'Design',
    headline: 'Learn visual hierarchy, colour theory, and layout from first principles.',
    description:
      'Great interfaces are not accidents. This course teaches the underlying principles — visual hierarchy, the grid, spacing, typography, and colour — that separate professional designs from amateur ones. You will critique real-world interfaces and redesign them step by step.',
    instructor: { name: 'Priya Sharma', title: 'Principal Designer @ Razorpay' },
    rating: 4.8,
    students: 7830,
    totalHours: '10',
    level: 'Beginner',
    tags: ['UI', 'Design', 'Typography', 'Colour'],
    gradient: 'from-pink-500 to-rose-600',
    sections: [
      {
        id: 's1',
        title: 'Visual Foundations',
        lessons: [
          { id: 'l1', title: 'Visual hierarchy explained', duration: '9m', description: 'Size, weight, colour, and contrast as tools to direct user attention.' },
          { id: 'l2', title: 'Grid systems and layout', duration: '11m', description: '8px base grid, columns, gutters, and why everything should snap.' },
          { id: 'l3', title: 'Spacing and breathing room', duration: '8m', description: 'The role of whitespace, consistent spacing scales, and density trade-offs.' },
        ],
      },
      {
        id: 's2',
        title: 'Colour & Typography',
        lessons: [
          { id: 'l4', title: 'Colour theory for UI', duration: '14m', description: 'Hue, saturation, lightness — building a palette with a primary, neutral, and semantic colours.' },
          { id: 'l5', title: 'Typography that works', duration: '12m', description: 'Type scales, line height, measure, and pairing fonts effectively.' },
        ],
      },
      {
        id: 's3',
        title: 'Designing Real Screens',
        lessons: [
          { id: 'l6', title: 'Anatomy of a login screen', duration: '16m', description: 'Walk through every decision on a login UI: form layout, error states, CTA hierarchy.' },
          { id: 'l7', title: 'Dashboard design critique', duration: '14m', description: 'Analyse a real dashboard, identify failures, and redesign the data-heavy sections.' },
        ],
      },
    ],
    quiz: [
      { id: 'q1', question: 'Visual hierarchy is primarily established through:', options: ['Animation', 'Size, weight, and contrast', 'Brand colour only', 'Number of elements'], correctAnswer: 'Size, weight, and contrast' },
      { id: 'q2', question: 'An 8px base grid means:', options: ['All elements are 8px wide', 'Spacing values are multiples of 8', 'Font size is always 8px', 'Columns are 8px wide'], correctAnswer: 'Spacing values are multiples of 8' },
      { id: 'q3', question: 'Which colour property controls brightness?', options: ['Hue', 'Saturation', 'Lightness', 'Opacity'], correctAnswer: 'Lightness' },
      { id: 'q4', question: 'Line height in typography affects:', options: ['Letter spacing', 'Readability and density', 'Font weight', 'Colour contrast'], correctAnswer: 'Readability and density' },
      { id: 'q5', question: '"Measure" in typography refers to:', options: ['Font size in px', 'Line length in characters', 'Tracking between letters', 'Baseline grid'], correctAnswer: 'Line length in characters' },
      { id: 'q6', question: 'Whitespace in UI design primarily:', options: ['Wastes screen space', 'Reduces cognitive load', 'Increases colour contrast', 'Shrinks content'], correctAnswer: 'Reduces cognitive load' },
    ],
  },

  {
    id: 'figma-beginners',
    title: 'Figma for Beginners',
    category: 'Design',
    headline: 'Go from blank canvas to a complete, prototyped mobile app in Figma.',
    description:
      'Figma is the industry-standard design tool. This course teaches you everything from navigation and frames to auto-layout, components, variants, and interactive prototyping. By the end you will have a complete mobile app design ready to hand off to developers.',
    instructor: { name: 'Neha Kulkarni', title: 'Product Designer @ Swiggy' },
    rating: 4.6,
    students: 5440,
    totalHours: '8',
    level: 'Beginner',
    tags: ['Figma', 'Design', 'Prototyping'],
    gradient: 'from-orange-400 to-amber-600',
    sections: [
      {
        id: 's1',
        title: 'Figma Basics',
        lessons: [
          { id: 'l1', title: 'Interface tour and navigation', duration: '7m', description: 'Layers panel, canvas, toolbar, and essential keyboard shortcuts.' },
          { id: 'l2', title: 'Frames, groups, and shapes', duration: '9m', description: 'The difference between frames and groups, and when to use each.' },
        ],
      },
      {
        id: 's2',
        title: 'Auto Layout & Components',
        lessons: [
          { id: 'l3', title: 'Auto Layout explained', duration: '13m', description: 'Direction, spacing, padding — build UI that resizes like real code.' },
          { id: 'l4', title: 'Creating and using components', duration: '11m', description: 'Master components, instances, overrides, and variants.' },
          { id: 'l5', title: 'Building a component library', duration: '14m', description: 'Organise your components, create a colour/type style library, and publish it.' },
        ],
      },
      {
        id: 's3',
        title: 'Prototyping & Handoff',
        lessons: [
          { id: 'l6', title: 'Interactive prototyping', duration: '12m', description: 'Connect frames, add smart animations, and test on your phone.' },
          { id: 'l7', title: 'Developer handoff with Inspect', duration: '8m', description: 'Use the Inspect panel to share spacing, colours, and assets with developers.' },
        ],
      },
    ],
    quiz: [
      { id: 'q1', question: 'In Figma, Auto Layout is most similar to:', options: ['CSS Grid', 'CSS Flexbox', 'CSS Position', 'CSS Float'], correctAnswer: 'CSS Flexbox' },
      { id: 'q2', question: 'A component instance:', options: ['Is a copy with no link to the main', 'Inherits changes from the main component', 'Merges into the original on save', 'Can only be used once'], correctAnswer: 'Inherits changes from the main component' },
      { id: 'q3', question: 'Variants in Figma allow you to:', options: ['Export multiple formats', 'Group related component states', 'Apply colour styles', 'Create animations'], correctAnswer: 'Group related component states' },
      { id: 'q4', question: 'Which panel shows spacing and CSS values for devs?', options: ['Assets', 'Layers', 'Inspect', 'Prototype'], correctAnswer: 'Inspect' },
      { id: 'q5', question: 'Frames in Figma are equivalent to:', options: ['HTML <div> only', 'HTML <section> only', 'Containers that can have constraints and auto layout', 'SVG shapes'], correctAnswer: 'Containers that can have constraints and auto layout' },
    ],
  },

  {
    id: 'public-speaking',
    title: 'Public Speaking Mastery',
    category: 'Soft Skills',
    headline: 'Conquer nerves, structure compelling talks, and command any room.',
    description:
      'Whether it is a team stand-up or a conference keynote, this course gives you a repeatable system for preparing and delivering talks that land. You will learn breathing techniques to control nerves, a story-first structure for any talk, and how to handle questions under pressure.',
    instructor: { name: 'Vikram Nair', title: 'Executive Coach & TEDx Speaker' },
    rating: 4.9,
    students: 15200,
    totalHours: '6',
    level: 'Beginner',
    tags: ['Communication', 'Presenting', 'Leadership'],
    gradient: 'from-sky-500 to-blue-700',
    sections: [
      {
        id: 's1',
        title: 'Mindset & Nerves',
        lessons: [
          { id: 'l1', title: 'Why we get nervous and how to use it', duration: '10m', description: 'The physiology of nerves and how to reframe anxiety as excitement.' },
          { id: 'l2', title: 'Breathing and body warm-ups', duration: '8m', description: 'Box breathing, vocal warm-ups, and a 5-minute pre-talk ritual.' },
        ],
      },
      {
        id: 's2',
        title: 'Structuring Your Talk',
        lessons: [
          { id: 'l3', title: 'The Story-First framework', duration: '14m', description: 'Hook → Context → Conflict → Resolution → Call to Action. Works for any length.' },
          { id: 'l4', title: 'Opening strong and closing memorably', duration: '11m', description: 'The first 30 seconds and last 30 seconds matter most — here is why and how.' },
          { id: 'l5', title: 'Slides that support (not replace) you', duration: '9m', description: 'The 1-idea-per-slide rule, avoiding death by bullet point, and visual storytelling.' },
        ],
      },
      {
        id: 's3',
        title: 'Delivery & Q&A',
        lessons: [
          { id: 'l6', title: 'Voice, pace, and pausing for effect', duration: '12m', description: 'Vary pitch and pace deliberately. The pause is your most powerful tool.' },
          { id: 'l7', title: 'Handling tough questions gracefully', duration: '10m', description: 'The Acknowledge-Bridge-Answer technique for hostile or off-topic questions.' },
        ],
      },
    ],
    quiz: [
      { id: 'q1', question: 'The Story-First framework starts with:', options: ['Context', 'Hook', 'Conflict', 'Resolution'], correctAnswer: 'Hook' },
      { id: 'q2', question: 'Reframing nervousness as excitement is called:', options: ['Cognitive reappraisal', 'Suppression', 'Avoidance', 'Anchoring'], correctAnswer: 'Cognitive reappraisal' },
      { id: 'q3', question: 'The ABA technique in Q&A stands for:', options: ['Ask, Begin, Answer', 'Acknowledge, Bridge, Answer', 'Analyse, Build, Articulate', 'Agree, Bridge, Assert'], correctAnswer: 'Acknowledge, Bridge, Answer' },
      { id: 'q4', question: 'Good slides primarily:', options: ['Replace the speaker', 'Contain all your notes', 'Support and reinforce the spoken message', 'Use bullet points for clarity'], correctAnswer: 'Support and reinforce the spoken message' },
      { id: 'q5', question: 'Box breathing involves:', options: ['4 counts in, 4 hold, 4 out, 4 hold', '8 counts in, 4 out', '2 counts in, 6 out', 'Breathing only through the mouth'], correctAnswer: '4 counts in, 4 hold, 4 out, 4 hold' },
      { id: 'q6', question: 'The pause in public speaking is powerful because it:', options: ['Fills silence awkwardly', 'Shows you forgot your lines', 'Creates emphasis and lets ideas land', 'Reduces talk time'], correctAnswer: 'Creates emphasis and lets ideas land' },
    ],
  },

  {
    id: 'yoga-beginners',
    title: 'Yoga for Complete Beginners',
    category: 'Wellness',
    headline: 'Build flexibility, strength, and calm with beginner-friendly sequences.',
    description:
      'No experience needed. This course introduces the most important yoga poses, breathing techniques, and the philosophy behind a consistent practice. Sessions are 20–30 minutes and designed to fit around a busy schedule. By the end you will have a repeatable home practice you can maintain independently.',
    instructor: { name: 'Sunita Desai', title: 'Certified Yoga Instructor (RYT-500)' },
    rating: 4.6,
    students: 8970,
    totalHours: '7',
    level: 'Beginner',
    tags: ['Yoga', 'Fitness', 'Mindfulness'],
    gradient: 'from-lime-400 to-green-600',
    sections: [
      {
        id: 's1',
        title: 'Foundations',
        lessons: [
          { id: 'l1', title: 'What is yoga and what to expect', duration: '6m', description: 'A brief history, the eight limbs of yoga, and how to approach each session.' },
          { id: 'l2', title: 'Breath: the anchor of practice', duration: '9m', description: 'Diaphragmatic breathing, ujjayi breath, and why breath leads movement.' },
          { id: 'l3', title: 'Essential warm-up sequence', duration: '11m', description: 'Cat-cow, neck rolls, and hip circles — prepare your body for deeper poses.' },
        ],
      },
      {
        id: 's2',
        title: 'Core Poses',
        lessons: [
          { id: 'l4', title: 'Standing poses: Warrior I & II', duration: '14m', description: 'Alignment cues, modifications, and the mental focus behind warrior poses.' },
          { id: 'l5', title: 'Balance poses: Tree and Eagle', duration: '12m', description: 'Building focus through balance — how to fall well and try again.' },
        ],
      },
      {
        id: 's3',
        title: 'Building a Practice',
        lessons: [
          { id: 'l6', title: 'A complete 25-minute flow', duration: '25m', description: 'A guided beginner flow from warm-up through standing poses to savasana.' },
          { id: 'l7', title: 'Sustaining your practice at home', duration: '8m', description: 'How to build a consistent habit, track progress, and avoid common injuries.' },
        ],
      },
    ],
    quiz: [
      { id: 'q1', question: 'Ujjayi breath is characterised by:', options: ['Rapid nostril breathing', 'A soft ocean sound from the throat', 'Breath holds only', 'Mouth-only breathing'], correctAnswer: 'A soft ocean sound from the throat' },
      { id: 'q2', question: 'In yoga, "asana" means:', options: ['Breath', 'Meditation', 'Posture or pose', 'Relaxation'], correctAnswer: 'Posture or pose' },
      { id: 'q3', question: 'Cat-cow is a warm-up that moves the:', options: ['Hips only', 'Shoulders only', 'Spine in flexion and extension', 'Ankles and wrists'], correctAnswer: 'Spine in flexion and extension' },
      { id: 'q4', question: 'Savasana is typically done:', options: ['At the start of practice', 'Between poses', 'At the very end as final relaxation', 'Before breathing exercises'], correctAnswer: 'At the very end as final relaxation' },
      { id: 'q5', question: 'The Warrior poses primarily build:', options: ['Flexibility only', 'Strength, stability, and focus', 'Breathing capacity', 'Balance only'], correctAnswer: 'Strength, stability, and focus' },
    ],
  },
];

export const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
