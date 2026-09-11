import React, { useRef, useState, useEffect } from 'react'
import { CheckSquare, Plus, Sun, Moon, Download, Upload, RotateCcw, MoreHorizontal, Smartphone } from 'lucide-react'
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
      alert('To install TaskFlow:\n\n• On Chrome / Android: Tap the 3-dots menu > "Install app" or "Add to Home screen".\n• On iPhone Safari: Tap the Share button > "Add to Home Screen".')
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
      <div className="w-full max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <CheckSquare className="h-4.5 w-4.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
              TaskFlow
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Install App Button if not installed */}
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 active:scale-95 transition-transform cursor-pointer"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Install</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="h-4.5 w-4.5 text-amber-400" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-slate-700" />
            )}
          </button>

          {/* Backup Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4.5 w-4.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuItem onClick={onExport} className="gap-2 text-xs py-2">
                <Download className="h-4 w-4 text-slate-400" />
                <span>Export JSON Backup</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="gap-2 text-xs py-2">
                <Upload className="h-4 w-4 text-slate-400" />
                <span>Import JSON Backup</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onReset} className="gap-2 text-xs py-2 text-rose-600 dark:text-rose-400">
                <RotateCcw className="h-4 w-4" />
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

          {/* New Task Trigger Button */}
          <Button
            onClick={onOpenNewTask}
            size="sm"
            className="h-8 px-3 rounded-lg gap-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>New Task</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
