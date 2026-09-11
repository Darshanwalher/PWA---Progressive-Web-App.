import React, { useRef, useEffect } from 'react'
import { Search, X, ArrowUpDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function TaskFilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}) {
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Active' },
    { id: 'today', label: 'Today' },
    { id: 'completed', label: 'Done' },
  ]

  return (
    <div className="flex flex-col gap-2.5 mb-4">
      {/* 1. Segmented Tabs - Full Width */}
      <div className="grid grid-cols-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer select-none ${
                isActive
                  ? 'bg-white text-blue-600 dark:bg-slate-900 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* 2. Search & Sort Row */}
      <div className="flex items-center gap-2">
        {/* Full width Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-8.5 pr-7 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="w-[120px] sm:w-[130px] shrink-0">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-9 text-xs rounded-xl">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              <SelectItem value="dueDate_asc">Due Date</SelectItem>
              <SelectItem value="priority_desc">Priority</SelectItem>
              <SelectItem value="title_asc">Title (A-Z)</SelectItem>
              <SelectItem value="createdAt_desc">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
