import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroBanner } from './components/HeroBanner'
import { QuickAddBar } from './components/QuickAddBar'
import { TaskFilterBar } from './components/TaskFilterBar'
import { TaskItem } from './components/TaskItem'
import { TaskModal } from './components/TaskModal'
import { EmptyState } from './components/EmptyState'
import { useTodos } from './hooks/useTodos'

export function App() {
  // Theme state with local storage persistence - defaults to dark mode
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('taskflow_theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      return true
    } catch {
      return true
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('taskflow_theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('taskflow_theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  const {
    todos,
    filteredTodos,
    stats,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
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
  } = useTodos()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const handleOpenNewTask = () => {
    setEditingTodo(null)
    setIsModalOpen(true)
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleDuplicateTodo = (todo) => {
    addTodo({
      ...todo,
      title: `${todo.title} (Copy)`,
      completed: false,
      subtasks: (todo.subtasks || []).map((st) => ({ ...st, completed: false })),
    })
  }

  const handleSaveTodo = (taskData) => {
    if (editingTodo) {
      updateTodo(taskData)
    } else {
      addTodo(taskData)
    }
  }

  // Keyboard shortcut 'N' for new task
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key === 'n' || e.key === 'N') &&
        !isModalOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        handleOpenNewTask()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  const hasSearchOrFilter = searchQuery.trim() !== ''

  const handleResetFilters = () => {
    setSearchQuery('')
    setActiveTab('all')
  }

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenNewTask={handleOpenNewTask}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onExport={exportData}
        onImport={importData}
        onReset={clearAllTasks}
        stats={stats}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
        {/* Dynamic Modern Hero Banner with Productivity Ring */}
        <HeroBanner
          stats={stats}
          onOpenNewTask={handleOpenNewTask}
        />

        {/* Spotlight Quick Inline Add Bar */}
        <QuickAddBar
          onAddQuickTask={addTodo}
          onOpenFullModal={handleOpenNewTask}
        />

        {/* Filter and Search Bar */}
        <TaskFilterBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Task List Header */}
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
          <span>
            {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
          </span>
          {stats.completed > 0 && activeTab !== 'completed' && (
            <button
              onClick={clearCompleted}
              className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Clear completed ({stats.completed})
            </button>
          )}
        </div>

        {/* Tasks List */}
        {filteredTodos.length > 0 ? (
          <div className="space-y-3 pb-16">
            {filteredTodos.map((todo) => (
              <TaskItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={handleEditTodo}
                onTogglePin={togglePin}
                onToggleSubtask={toggleSubtask}
                onAddSubtask={addSubtask}
                onDeleteSubtask={deleteSubtask}
                onDuplicate={handleDuplicateTodo}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            activeTab={activeTab}
            hasSearchOrFilter={hasSearchOrFilter}
            onOpenNewTask={handleOpenNewTask}
            onResetFilters={handleResetFilters}
          />
        )}
      </main>

      {/* Task Creation & Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTodo}
        editingTodo={editingTodo}
      />
    </div>
  )
}

export default App
