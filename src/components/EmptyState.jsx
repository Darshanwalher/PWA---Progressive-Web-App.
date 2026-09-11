import React from 'react'
import { Plus, CheckCircle2, Sparkles, PlusCircle } from 'lucide-react'
import { Button } from './ui/button'

export function EmptyState({ activeTab, hasSearchOrFilter, onOpenNewTask, onResetFilters }) {
  return (
    <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 glass-panel relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-36 h-36 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3.5 shadow-xs border border-indigo-500/20">
          {activeTab === 'completed' ? (
            <CheckCircle2 className="h-6 w-6 stroke-[2.2]" />
          ) : (
            <Sparkles className="h-6 w-6 stroke-[2.2]" />
          )}
        </div>

        <h3 className="text-base font-bold tracking-tight text-slate-800 dark:text-slate-100">
          {hasSearchOrFilter
            ? 'No tasks found'
            : activeTab === 'completed'
            ? 'No completed tasks yet'
            : 'Your workspace is clear'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
          {hasSearchOrFilter
            ? "We couldn't find any tasks matching your current search query or active filter."
            : 'Get ahead of your day by adding your high-priority items and breaking them into actionable subtasks.'}
        </p>

        <div className="mt-5 flex items-center justify-center gap-2.5">
          {hasSearchOrFilter ? (
            <Button variant="outline" size="sm" onClick={onResetFilters} className="rounded-xl text-xs">
              Clear Filters
            </Button>
          ) : (
            <Button
              onClick={onOpenNewTask}
              size="sm"
              className="rounded-xl text-xs font-semibold px-4 gap-1.5 shadow-md shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Create First Task
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
