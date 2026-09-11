import React from 'react'
import { Sparkles, CheckCircle2, Flame, ArrowUpRight } from 'lucide-react'

export function HeroBanner({ stats, onOpenNewTask }) {
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
    <div className="mb-8 relative overflow-hidden rounded-2xl p-5 sm:p-6 glass-panel border shadow-xs">
      {/* Decorative ambient background blur */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-20 -bottom-10 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Greeting & Date */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{todayFormatted}</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {getGreeting()}, <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">Focus Mode</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            {stats.total === 0
              ? 'Start by adding your most important goal for today.'
              : stats.pending === 0
              ? '🎉 All tasks completed! You are ahead of schedule.'
              : `You have ${stats.pending} pending ${stats.pending === 1 ? 'task' : 'tasks'} remaining.`}
          </p>
        </div>

        {/* Right: Modern Productivity Capsule */}
        <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 backdrop-blur-md shadow-xs shrink-0">
          <div className="relative h-12 w-12 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600 dark:text-indigo-400 transition-all duration-700 ease-out"
                strokeDasharray={`${stats.completionRate}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono">
              {stats.completionRate}%
            </span>
          </div>

          <div className="text-left pr-2">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {stats.completed} of {stats.total} Done
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <Flame className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>Daily Momentum</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
