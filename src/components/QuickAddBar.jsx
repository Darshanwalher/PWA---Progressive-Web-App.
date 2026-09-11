import React, { useState } from 'react'
import { Plus, CornerDownLeft, SlidersHorizontal, Calendar, Tag } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { CATEGORIES, PRIORITIES } from '../data/initialTodos'

export function QuickAddBar({ onAddQuickTask, onOpenFullModal }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('work')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddQuickTask({
        title: title.trim(),
        priority,
        category,
        dueDate: new Date().toISOString().split('T')[0],
        subtasks: [],
        tags: [],
        pinned: false,
      })
      setTitle('')
    }
  }

  const priorityObj = PRIORITIES.find((p) => p.id === priority) || PRIORITIES[2]
  const categoryObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0]

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative mb-6 rounded-2xl glass-panel p-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500/50 dark:focus-within:border-indigo-500/60 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </div>

        <input
          type="text"
          placeholder="What do you want to accomplish? (Press Enter)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500 font-medium"
        />

        {/* Quick Priority selector badge button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <span className={`h-2 w-2 rounded-full ${
                priority === 'urgent' ? 'bg-rose-500' :
                priority === 'high' ? 'bg-amber-500' :
                priority === 'medium' ? 'bg-indigo-500' : 'bg-slate-400'
              }`} />
              <span>{priorityObj.label}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {PRIORITIES.map((p) => (
              <DropdownMenuItem
                key={p.id}
                onClick={() => setPriority(p.id)}
                className="text-xs font-medium gap-2"
              >
                <span className={`h-2 w-2 rounded-full ${
                  p.id === 'urgent' ? 'bg-rose-500' :
                  p.id === 'high' ? 'bg-amber-500' :
                  p.id === 'medium' ? 'bg-indigo-500' : 'bg-slate-400'
                }`} />
                <span>{p.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Category selector badge button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <span>{categoryObj.label}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {CATEGORIES.map((c) => (
              <DropdownMenuItem
                key={c.id}
                onClick={() => setCategory(c.id)}
                className="text-xs font-medium"
              >
                {c.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Full Modal Opener button */}
        <button
          type="button"
          onClick={onOpenFullModal}
          title="More Options (Notes, Subtasks, Tags)"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        {/* Submit or shortcut indicator */}
        {title.trim() ? (
          <Button
            type="submit"
            size="sm"
            className="h-8 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs gap-1"
          >
            <span>Add</span>
            <CornerDownLeft className="h-3 w-3" />
          </Button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-slate-200/60 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 select-none">
            ↵
          </kbd>
        )}
      </div>
    </form>
  )
}
