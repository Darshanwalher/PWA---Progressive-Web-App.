import React from 'react'
import { Plus, CheckSquare, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

export function EmptyState({ activeTab, hasSearchOrFilter, onOpenNewTask, onResetFilters }) {
  return (
    <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
      <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-200/50 dark:border-blue-900/50">
        {activeTab === 'completed' ? (
          <CheckSquare className="h-5 w-5 stroke-[2.2]" />
        ) : (
          <Sparkles className="h-5 w-5 stroke-[2.2]" />
        )}
      </div>

      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {hasSearchOrFilter
          ? 'No tasks found'
          : activeTab === 'completed'
          ? 'No completed tasks yet'
          : 'Your workspace is clear'}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
        {hasSearchOrFilter
          ? 'Try adjusting your search query or reset your active filters.'
          : 'Stay organized and focused by adding your tasks.'}
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        {hasSearchOrFilter ? (
          <Button variant="outline" size="sm" onClick={onResetFilters} className="text-xs rounded-lg">
            Clear Filters
          </Button>
        ) : (
          <Button
            onClick={onOpenNewTask}
            size="sm"
            className="text-xs font-semibold px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Task
          </Button>
        )}
      </div>
    </div>
  )
}
