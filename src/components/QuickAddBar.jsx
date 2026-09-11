import React, { useState } from 'react'
import { Plus, CornerDownLeft, SlidersHorizontal, Tag } from 'lucide-react'
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
      className="mb-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-2xs transition-colors flex flex-col gap-2.5"
    >
      {/* Input Row */}
      <div className="flex items-center gap-2">
        <Plus className="h-4.5 w-4.5 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="What do you want to accomplish?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500 font-medium"
        />
      </div>

      {/* Controls Row: Column-wise / stacked underneath on Mobile, inline on Desktop */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Priority selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${
                  priority === 'urgent' ? 'bg-red-500' :
                  priority === 'high' ? 'bg-amber-500' :
                  priority === 'medium' ? 'bg-blue-500' : 'bg-slate-400'
                }`} />
                <span>{priorityObj.label}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {PRIORITIES.map((p) => (
                <DropdownMenuItem
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className="text-xs font-medium gap-2"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    p.id === 'urgent' ? 'bg-red-500' :
                    p.id === 'high' ? 'bg-amber-500' :
                    p.id === 'medium' ? 'bg-blue-500' : 'bg-slate-400'
                  }`} />
                  <span>{p.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <span>{categoryObj.label}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
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

          {/* More options button */}
          <button
            type="button"
            onClick={onOpenFullModal}
            title="Full options (notes, checklist, tags)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Add Task Button */}
        <Button
          type="submit"
          size="sm"
          disabled={!title.trim()}
          className="h-8 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shrink-0"
        >
          Add Task
        </Button>
      </div>
    </form>
  )
}
