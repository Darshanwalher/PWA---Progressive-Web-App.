import React from 'react'

export function StatsCards({ stats, activeTab, onTabSelect }) {
  const items = [
    { id: 'all', label: 'All Tasks', value: stats.total, dotColor: 'bg-blue-500' },
    { id: 'pending', label: 'Pending', value: stats.pending, dotColor: 'bg-amber-500' },
    { id: 'today', label: 'Due Today', value: stats.dueToday, dotColor: 'bg-indigo-500' },
    { id: 'completed', label: 'Completed', value: stats.completed, dotColor: 'bg-emerald-500' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
      {items.map((item) => {
        const isSelected = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => onTabSelect(item.id)}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
              isSelected
                ? 'bg-blue-50/50 dark:bg-slate-800/90 border-blue-200 dark:border-blue-900/60 shadow-xs'
                : 'bg-white dark:bg-slate-900/50 border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${item.dotColor}`} />
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                {item.value}
              </span>
              {item.id === 'completed' && stats.total > 0 && (
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  ({stats.completionRate}%)
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
