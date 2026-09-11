export const CATEGORIES = [
  { id: 'work', label: 'Work', color: 'blue', icon: 'Briefcase' },
  { id: 'personal', label: 'Personal', color: 'purple', icon: 'User' },
  { id: 'health', label: 'Health & Fitness', color: 'teal', icon: 'Heart' },
  { id: 'learning', label: 'Learning', color: 'cyan', icon: 'BookOpen' },
  { id: 'finance', label: 'Finance', color: 'emerald', icon: 'DollarSign' },
]

export const PRIORITIES = [
  { id: 'urgent', label: 'Urgent', variant: 'urgent', level: 4 },
  { id: 'high', label: 'High', variant: 'high', level: 3 },
  { id: 'medium', label: 'Medium', variant: 'medium', level: 2 },
  { id: 'low', label: 'Low', variant: 'low', level: 1 },
]

const today = new Date().toISOString().split('T')[0]
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
const inThreeDays = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

export const INITIAL_TODOS = [
  {
    id: 'task-1',
    title: 'Complete Shadcn UI Integration for PWA',
    description: 'Ensure all components are modular, accessible, and follow responsive modern design principles.',
    completed: false,
    priority: 'urgent',
    category: 'work',
    dueDate: today,
    tags: ['React', 'UI/UX', 'Vite'],
    subtasks: [
      { id: 'sub-1-1', title: 'Setup theme tokens and color variables', completed: true },
      { id: 'sub-1-2', title: 'Build interactive Task Modal and Filters', completed: true },
      { id: 'sub-1-3', title: 'Add Confetti celebration effect on completion', completed: false },
    ],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    pinned: true,
  },
  {
    id: 'task-2',
    title: 'Quarterly Financial Review & Budget Planning',
    description: 'Review monthly cloud spending, freelance invoices, and set aside savings goals.',
    completed: false,
    priority: 'high',
    category: 'finance',
    dueDate: tomorrow,
    tags: ['Finance', 'Budget'],
    subtasks: [
      { id: 'sub-2-1', title: 'Export Stripe & AWS billing statements', completed: false },
      { id: 'sub-2-2', title: 'Update budget spreadsheet', completed: false },
    ],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    pinned: false,
  },
  {
    id: 'task-3',
    title: 'Morning 5km Run & Core Workout',
    description: 'Stick to zone 2 cardio pace and do 15 minutes of dynamic core stretches afterwards.',
    completed: true,
    priority: 'medium',
    category: 'health',
    dueDate: today,
    tags: ['Fitness', 'Cardio'],
    subtasks: [
      { id: 'sub-3-1', title: '5km jog at 6:00/km pace', completed: true },
      { id: 'sub-3-2', title: 'Stretching & hydration', completed: true },
    ],
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    pinned: false,
  },
  {
    id: 'task-4',
    title: 'Read 2 Chapters of "Designing Data-Intensive Applications"',
    description: 'Take notes on consensus algorithms and partition strategies in distributed databases.',
    completed: false,
    priority: 'low',
    category: 'learning',
    dueDate: inThreeDays,
    tags: ['Reading', 'SystemDesign'],
    subtasks: [
      { id: 'sub-4-1', title: 'Chapter 8: The Trouble with Distributed Systems', completed: false },
      { id: 'sub-4-2', title: 'Chapter 9: Consistency and Consensus', completed: false },
    ],
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    pinned: false,
  },
  {
    id: 'task-5',
    title: 'Renew Passport & Check Travel Documents',
    description: 'Ensure expiry date is at least 6 months before next planned international conference.',
    completed: false,
    priority: 'high',
    category: 'personal',
    dueDate: yesterday,
    tags: ['Travel', 'Official'],
    subtasks: [],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    pinned: false,
  },
]
