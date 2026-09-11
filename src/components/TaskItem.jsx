import React, { useState } from 'react'
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
  Pin,
  ChevronDown,
  ChevronRight,
  Plus,
  Calendar,
} from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { CATEGORIES, PRIORITIES } from '../data/initialTodos'

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

  const subtasks = todo.subtasks || []
  const completedSubtasks = subtasks.filter((st) => st.completed).length

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
      className={`group relative rounded-xl border transition-colors p-3 sm:p-3.5 pro-card ${
        todo.completed
          ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/40 opacity-60'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs'
      }`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        {/* Checkbox */}
        <div className="pt-0.5 shrink-0">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  onClick={() => onToggle(todo.id)}
                  className={`text-xs sm:text-sm font-medium leading-snug cursor-pointer select-none transition-colors break-words ${
                    todo.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {todo.title}
                </span>

                {todo.pinned && (
                  <Pin className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
                )}
              </div>

              {/* Description */}
              {todo.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 break-words">
                  {todo.description}
                </p>
              )}
            </div>

            {/* Actions Menu */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => onTogglePin(todo.id)}
                title={todo.pinned ? "Unpin task" : "Pin task"}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  todo.pinned
                    ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100'
                }`}
              >
                <Pin className={`h-3.5 w-3.5 ${todo.pinned ? 'fill-current' : ''}`} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    className="h-7 w-7 text-slate-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:text-slate-700 dark:hover:text-slate-200 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => onEdit(todo)} className="text-xs gap-2">
                    <Edit2 className="h-3.5 w-3.5 text-slate-400" /> Edit
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

          {/* Badges / Meta Info */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
            {/* Priority */}
            {todo.priority && todo.priority !== 'medium' && (
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium ${
                todo.priority === 'urgent'
                  ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                  : todo.priority === 'high'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  todo.priority === 'urgent' ? 'bg-red-500' :
                  todo.priority === 'high' ? 'bg-amber-500' : 'bg-slate-400'
                }`} />
                <span>{priorityObj.label}</span>
              </span>
            )}

            {/* Category */}
            {todo.category && (
              <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {categoryObj.label}
              </span>
            )}

            {/* Due Date */}
            {todo.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded ${
                  isOverdue
                    ? 'text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950/50'
                    : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <Calendar className="h-3 w-3" />
                <span>{dateLabel}</span>
              </span>
            )}

            {/* Tags */}
            {todo.tags?.map((tag) => (
              <span
                key={tag}
                className="text-slate-400 dark:text-slate-500 font-mono text-[11px]"
              >
                #{tag}
              </span>
            ))}

            {/* Subtasks Accordion Button */}
            {subtasks.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-auto inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-[11px] font-mono cursor-pointer"
              >
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

          {/* Subtasks List */}
          {isExpanded && subtasks.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between gap-2 py-1 text-xs"
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <Checkbox
                      checked={st.completed}
                      onCheckedChange={() => onToggleSubtask(todo.id, st.id)}
                      className="h-3.5 w-3.5 shrink-0"
                    />
                    <span
                      className={`truncate text-xs ${
                        st.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {st.title}
                    </span>
                  </label>
                  <button
                    onClick={() => onDeleteSubtask(todo.id, st.id)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Inline Add Subtask */}
          {showAddSubtaskInput && (
            <form onSubmit={handleCreateSubtask} className="mt-2 flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Subtask title..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                autoFocus
                className="flex-1 h-8 text-xs rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 outline-none focus:border-blue-500"
              />
              <Button type="submit" size="sm" className="h-8 text-xs px-2.5">
                Add
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
