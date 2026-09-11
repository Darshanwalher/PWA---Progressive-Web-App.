import { useState, useEffect, useMemo, useCallback } from 'react'
import confetti from 'canvas-confetti'

const STORAGE_KEY = 'taskflow_todos_v1'

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Failed to parse todos from localStorage:', e)
    }
    // Brand new user starts with a completely empty state
    return []
  })

  const [activeTab, setActiveTab] = useState('all') // all, pending, today, completed
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedTag, setSelectedTag] = useState(null)
  const [sortBy, setSortBy] = useState('dueDate_asc')
  const [selectedIds, setSelectedIds] = useState(new Set())

  // Save to localStorage automatically on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.error('Failed to save todos:', e)
    }
  }, [todos])

  // Confetti helper
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#a1a1aa', '#71717a', '#27272a'],
    })
  }, [])

  // Add new task
  const addTodo = useCallback((newTodo) => {
    const todoWithId = {
      ...newTodo,
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      completed: false,
      createdAt: new Date().toISOString(),
      subtasks: newTodo.subtasks || [],
      tags: newTodo.tags || [],
      pinned: newTodo.pinned || false,
    }
    setTodos((prev) => [todoWithId, ...prev])
    return todoWithId
  }, [])

  // Update task
  const updateTodo = useCallback((updatedTodo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? { ...t, ...updatedTodo } : t))
    )
  }, [])

  // Toggle complete
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const nextCompleted = !todo.completed
          if (nextCompleted) {
            triggerConfetti()
          }
          const nextSubtasks = (todo.subtasks || []).map((st) => ({
            ...st,
            completed: nextCompleted,
          }))
          return {
            ...todo,
            completed: nextCompleted,
            subtasks: nextSubtasks,
          }
        }
        return todo
      })
    )
  }, [triggerConfetti])

  // Delete task
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  // Toggle pin
  const togglePin = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t))
    )
  }, [])

  // Subtask toggle
  const toggleSubtask = useCallback((todoId, subtaskId) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          const newSubtasks = (todo.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
          const allCompleted = newSubtasks.length > 0 && newSubtasks.every((st) => st.completed)
          if (allCompleted && !todo.completed) {
            triggerConfetti()
          }
          return {
            ...todo,
            subtasks: newSubtasks,
            completed: allCompleted ? true : todo.completed,
          }
        }
        return todo
      })
    )
  }, [triggerConfetti])

  // Add subtask
  const addSubtask = useCallback((todoId, subtaskTitle) => {
    if (!subtaskTitle?.trim()) return
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          const newSubtask = {
            id: `sub-${Date.now()}`,
            title: subtaskTitle.trim(),
            completed: false,
          }
          return {
            ...todo,
            subtasks: [...(todo.subtasks || []), newSubtask],
            completed: false,
          }
        }
        return todo
      })
    )
  }, [])

  // Delete subtask
  const deleteSubtask = useCallback((todoId, subtaskId) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: (todo.subtasks || []).filter((st) => st.id !== subtaskId),
          }
        }
        return todo
      })
    )
  }, [])

  // Clear completed tasks
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }, [])

  // Clear all tasks (reset to clean empty state)
  const clearAllTasks = useCallback(() => {
    setTodos([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Failed to clear storage:', e)
    }
  }, [])

  // Export JSON
  const exportData = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todos, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `tasks_backup_${new Date().toISOString().split('T')[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }, [todos])

  // Import JSON
  const importData = useCallback((jsonData) => {
    try {
      const parsed = JSON.parse(jsonData)
      if (Array.isArray(parsed)) {
        setTodos(parsed)
        return true
      }
    } catch (err) {
      console.error('Invalid JSON file:', err)
    }
    return false
  }, [])

  // All unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set()
    todos.forEach((t) => {
      (t.tags || []).forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet)
  }, [todos])

  // Stats calculation
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const pending = total - completed
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)

    const todayStr = new Date().toISOString().split('T')[0]
    const dueToday = todos.filter((t) => !t.completed && t.dueDate === todayStr).length
    const overdue = todos.filter((t) => !t.completed && t.dueDate && t.dueDate < todayStr).length

    return {
      total,
      completed,
      pending,
      completionRate,
      dueToday,
      overdue,
    }
  }, [todos])

  // Filtered & Sorted list
  const filteredTodos = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0]

    return todos.filter((todo) => {
      // Tab filter
      if (activeTab === 'today') {
        if (todo.dueDate !== todayStr) return false
      } else if (activeTab === 'completed') {
        if (!todo.completed) return false
      } else if (activeTab === 'pending') {
        if (todo.completed) return false
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const titleMatch = todo.title.toLowerCase().includes(query)
        const descMatch = (todo.description || '').toLowerCase().includes(query)
        const tagMatch = (todo.tags || []).some((tag) => tag.toLowerCase().includes(query))
        const subtaskMatch = (todo.subtasks || []).some((st) => st.title.toLowerCase().includes(query))
        if (!titleMatch && !descMatch && !tagMatch && !subtaskMatch) {
          return false
        }
      }

      return true
    }).sort((a, b) => {
      // Pinned tasks float to top
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1
      }

      if (activeTab !== 'completed' && a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }

      const priorityMap = { urgent: 4, high: 3, medium: 2, low: 1 }

      switch (sortBy) {
        case 'dueDate_asc':
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return a.dueDate.localeCompare(b.dueDate)
        case 'priority_desc':
          return (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0)
        case 'title_asc':
          return a.title.localeCompare(b.title)
        case 'createdAt_desc':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
    })
  }, [todos, activeTab, searchQuery, sortBy])

  return {
    todos,
    filteredTodos,
    stats,
    allTags,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    selectedIds,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    togglePin,
    toggleSubtask,
    addSubtask,
    deleteSubtask,
    clearCompleted,
    clearAllTasks,
    exportData,
    importData,
  }
}
