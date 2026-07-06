// 名称: 日夜主题切换按钮
// 描述: 在导航栏中切换 Globokit 日间/夜间版本
// 路径: Globokit/components/theme/theme-toggle.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

'use client'

import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from './theme-provider'

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? '切换到日间版本' : '切换到夜间版本'}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200/80 bg-white/80 px-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/[0.03] transition-all hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-300/60 dark:hover:text-cyan-200',
        compact && 'w-10 px-0'
      )}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      {!compact && <span>{isDark ? '夜间' : '日间'}</span>}
    </button>
  )
}
