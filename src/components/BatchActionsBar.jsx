import React from 'react'
import { CheckCheck, Trash2, X, CheckSquare } from 'lucide-react'
import { Button } from './ui/button'

export function BatchActionsBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onCompleteSelected,
  onDeleteSelected,
}) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xl border border-slate-700 dark:border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="h-5 w-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[11px]">
            {selectedCount}
          </span>
          <span>Selected</span>
        </div>

        <div className="h-4 w-px bg-slate-700 dark:bg-slate-300 mx-1" />

        <div className="flex items-center gap-2">
          {selectedCount < totalCount && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              className="h-7 px-2.5 text-xs text-white hover:bg-slate-800 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Select All ({totalCount})
            </Button>
          )}

          <Button
            size="sm"
            onClick={onCompleteSelected}
            className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-1"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Complete
          </Button>

          <Button
            size="sm"
            onClick={onDeleteSelected}
            className="h-7 px-3 text-xs bg-rose-600 hover:bg-rose-700 text-white font-medium gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>

          <button
            onClick={onClearSelection}
            className="p-1 rounded-lg text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors ml-1 cursor-pointer"
            title="Cancel selection"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
