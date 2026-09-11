import React from 'react'
import { Calendar, CheckCircle2 } from 'lucide-react'

export function HeroBanner({ stats }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="mb-4 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/80 shadow-2xs">
      {/* Column on Mobile, Row on Desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Heading & Date */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" />
            <span>{todayFormatted}</span>
          </div>
          <h1 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {getGreeting()}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {stats.total === 0
              ? 'No tasks for today. Add one below.'
              : `${stats.pending} pending • ${stats.completed} completed`}
          </p>
        </div>

        {/* Progress Pill: Column stacked on Mobile */}
        {stats.total > 0 && (
          <div className="flex flex-col sm:items-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between sm:justify-end w-full gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Daily Progress
              </span>
              <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
                {stats.completionRate}%
              </span>
            </div>
            <div className="w-full sm:w-28 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono text-right hidden sm:block">
              {stats.completed}/{stats.total} tasks done
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
