import React, { useRef, useState, useEffect } from 'react'
import { CheckSquare, Plus, Sun, Moon, Download, Upload, RotateCcw, MoreHorizontal, DownloadCloud, Smartphone } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Navbar({ onOpenNewTask, isDark, toggleTheme, onExport, onImport, onReset, stats }) {
  const fileInputRef = useRef(null)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    } else {
      alert('To install the app on your desktop or phone:\n\n1. In Chrome/Edge: Click the install icon (⊕) in the browser URL address bar.\n2. Or click the 3-dots menu > "Install TaskFlow".')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result
        if (content) {
          const success = onImport(content)
          if (success) {
            alert('Tasks imported successfully.')
          } else {
            alert('Invalid JSON file format.')
          }
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/5 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <CheckSquare className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
                TaskFlow
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                PWA
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Install App / Open in App Button */}
          {!isInstalled && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleInstallClick}
              className="h-9 px-3 rounded-xl gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
              title="Install TaskFlow as Desktop or Mobile App"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Install App</span>
            </Button>
          )}

          {/* Quick stats capsule */}
          {stats.total > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-white/5 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700 dark:text-slate-300">{stats.completed}/{stats.total}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">{stats.completionRate}%</span>
            </div>
          )}

          {/* Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
              <DropdownMenuLabel>Data & Backup</DropdownMenuLabel>
              <DropdownMenuItem onClick={onExport} className="gap-2 text-xs">
                <Download className="h-3.5 w-3.5 text-slate-400" />
                <span>Export JSON Backup</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="gap-2 text-xs">
                <Upload className="h-3.5 w-3.5 text-slate-400" />
                <span>Import JSON Backup</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onReset} className="gap-2 text-xs text-rose-600 dark:text-rose-400">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear All Tasks</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700 transition-transform duration-200" />
            )}
          </Button>

          {/* New Task Button */}
          <Button
            onClick={onOpenNewTask}
            size="sm"
            className="h-9 px-3.5 sm:px-4 gap-1.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span className="hidden sm:inline">New Task</span>
            <kbd className="hidden sm:inline-block ml-1 text-[10px] bg-indigo-700/60 px-1.5 py-0.5 rounded-md text-white font-mono">N</kbd>
          </Button>
        </div>
      </div>
    </header>
  )
}
