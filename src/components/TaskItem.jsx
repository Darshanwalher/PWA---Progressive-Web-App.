import React, { useState } from 'react'
import {
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Pin,
  ChevronDown,
  ChevronRight,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle,
  Briefcase,
  User,
  Heart,
  BookOpen,
  DollarSign,
  ListTodo,
} from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { CATEGORIES, PRIORITIES } from '../data/initialTodos'

const categoryIcons = {
  work: Briefcase,
  personal: User,
  health: Heart,
  learning: BookOpen,
  finance: DollarSign,
}

export function TaskItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onTogglePin,
  onToggleSubtask,
  onAddSubtask,
  onDeleteSubtask,
  onDuplicate,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newSubtaskText, setNewSubtaskText] = useState('')
  const [showAddSubtaskInput, setShowAddSubtaskInput] = useState(false)

  const priorityObj = PRIORITIES.find((p) => p.id === todo.priority) || PRIORITIES[2]
  const categoryObj = CATEGORIES.find((c) => c.id === todo.category) || CATEGORIES[0]
  const CategoryIcon = categoryIcons[todo.category] || Briefcase

  const subtasks = todo.subtasks || []
  const completedSubtasks = subtasks.filter((st) => st.completed).length
  const subtasksProgress = subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0

  const todayStr = new Date().toISOString().split('T')[0]
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  let dateLabel = ''
  let isOverdue = false

  if (todo.dueDate) {
    if (todo.dueDate === todayStr) {
      dateLabel = 'Today'
    } else if (todo.dueDate === tomorrowStr) {
      dateLabel = 'Tomorrow'
    } else {
      const parts = todo.dueDate.split('-')
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2])
        dateLabel = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      } else {
        dateLabel = todo.dueDate
      }
    }

    if (!todo.completed && todo.dueDate < todayStr) {
      isOverdue = true
    }
  }

  const handleCreateSubtask = (e) => {
    e.preventDefault()
    if (newSubtaskText.trim()) {
      onAddSubtask(todo.id, newSubtaskText.trim())
      setNewSubtaskText('')
      setShowAddSubtaskInput(false)
      setIsExpanded(true)
    }
  }

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 modern-card p-4 ${
        todo.completed
          ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-white/5 opacity-60'
          : 'bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/40 backdrop-blur-md'
      }`}
    >
      {/* Pinned visual accent line */}
      {todo.pinned && (
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
      )}

      <div className="flex items-start gap-3.5">
        {/* Modern Checkbox */}
        <div className="pt-0.5">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="h-5 w-5 rounded-lg border-slate-300 dark:border-slate-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-transform active:scale-90"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  onClick={() => onToggle(todo.id)}
                  className={`text-sm sm:text-base font-semibold leading-snug cursor-pointer select-none transition-all ${
                    todo.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {todo.title}
                </span>

                {todo.pinned && (
                  <Pin className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                )}
              </div>

              {/* Description preview */}
              {todo.description && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {todo.description}
                </p>
              )}
            </div>

            {/* Quick Actions Menu */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onTogglePin(todo.id)}
                title={todo.pinned ? "Unpin task" : "Pin task"}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  todo.pinned
                    ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100'
                }`}
              >
                <Pin className={`h-3.5 w-3.5 ${todo.pinned ? 'fill-current' : ''}`} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    className="h-7 w-7 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-700 dark:hover:text-slate-200 transition-opacity rounded-lg"
                  >
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 rounded-xl">
                  <DropdownMenuItem onClick={() => onEdit(todo)} className="text-xs gap-2">
                    <Edit2 className="h-3.5 w-3.5 text-slate-400" /> Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setShowAddSubtaskInput(true); setIsExpanded(true); }} className="text-xs gap-2">
                    <Plus className="h-3.5 w-3.5 text-slate-400" /> Add Subtask
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(todo)} className="text-xs gap-2">
                    <Copy className="h-3.5 w-3.5 text-slate-400" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(todo.id)} className="text-xs gap-2 text-rose-600 dark:text-rose-400">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Badges / Meta Info Row */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {/* Priority Pill */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              todo.priority === 'urgent'
                ? 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900/60 shadow-xs'
                : todo.priority === 'high'
                ? 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/60'
                : todo.priority === 'low'
                ? 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/80 dark:text-slate-400 dark:border-slate-700'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900/60'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${
                todo.priority === 'urgent' ? 'bg-rose-500 animate-pulse' :
                todo.priority === 'high' ? 'bg-amber-500' :
                todo.priority === 'low' ? 'bg-slate-400' : 'bg-indigo-500'
              }`} />
              <span>{priorityObj.label}</span>
            </span>

            {/* Category Pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5">
              <CategoryIcon className="h-3 w-3 text-slate-500 dark:text-slate-400" />
              <span>{categoryObj.label}</span>
            </span>

            {/* Due Date Indicator */}
            {todo.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${
                  isOverdue
                    ? 'text-rose-600 dark:text-rose-400 font-semibold bg-rose-50/80 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/60 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/60 dark:border-white/5'
                }`}
              >
                {isOverdue ? (
                  <AlertCircle className="h-3 w-3" />
                ) : (
                  <Calendar className="h-3 w-3" />
                )}
                <span>{dateLabel}</span>
                {isOverdue && <span className="font-bold text-[10px] uppercase">(Overdue)</span>}
              </span>
            )}

            {/* Tags */}
            {todo.tags?.map((tag) => (
              <span
                key={tag}
                className="text-slate-500 dark:text-slate-400 font-mono text-[11px] bg-slate-100/70 dark:bg-slate-800/60 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}

            {/* Subtasks Accordion Button */}
            {subtasks.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ListTodo className="h-3 w-3 text-indigo-500" />
                <span>
                  {completedSubtasks}/{subtasks.length}
                </span>
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
          </div>

          {/* Subtasks Expandable Content */}
          {isExpanded && subtasks.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
              {/* Mini progress bar */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-[11px]">Checklist Progress:</span>
                <div className="flex-1">
                  <Progress value={subtasksProgress} className="h-1.5" />
                </div>
                <span className="font-mono text-[11px] font-semibold">{subtasksProgress}%</span>
              </div>

              {/* Subtask list */}
              <div className="space-y-1 pl-1">
                {subtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors group/sub"
                  >
                    <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                      <Checkbox
                        checked={st.completed}
                        onCheckedChange={() => onToggleSubtask(todo.id, st.id)}
                        className="h-3.5 w-3.5 rounded"
                      />
                      <span
                        className={`truncate text-xs transition-colors ${
                          st.completed
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-700 dark:text-slate-300 font-medium'
                        }`}
                      >
                        {st.title}
                      </span>
                    </label>
                    <button
                      onClick={() => onDeleteSubtask(todo.id, st.id)}
                      className="text-slate-400 hover:text-rose-500 opacity-0 group-hover/sub:opacity-100 transition-opacity p-0.5 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inline Add Subtask Input */}
          {showAddSubtaskInput && (
            <form onSubmit={handleCreateSubtask} className="mt-2.5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter subtask title..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                autoFocus
                className="flex-1 h-8 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900 px-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <Button type="submit" size="sm" className="h-8 text-xs px-3">
                Add
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddSubtaskInput(false)}
                className="h-8 text-xs px-2"
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
