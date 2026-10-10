// 名称: 主题状态 Provider
// 描述: 管理 Globokit 的日间/夜间主题，并同步到 documentElement
// 路径: Globokit/components/theme/theme-provider.tsx
// 作者: everettlabs
// 更新时间: 2026-10-09

'use client'

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = 'globokit-theme'

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  } catch {
    return null
  }
  return null
}

function resolveSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

let currentTheme: Theme | null = null

function getThemeSnapshot(): Theme {
  if (currentTheme === null) {
    currentTheme = readStoredTheme() ?? resolveSystemTheme()
  }
  return currentTheme
}

function subscribeTheme(listener: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      currentTheme = readStoredTheme() ?? resolveSystemTheme()
      listener()
    }
  }
  const onSystemChange = () => {
    if (!readStoredTheme()) {
      currentTheme = resolveSystemTheme()
      listener()
    }
  }
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  window.addEventListener('storage', onStorage)
  media.addEventListener('change', onSystemChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    media.removeEventListener('change', onSystemChange)
  }
}

const themeStore = {
  subscribe: subscribeTheme,
  getSnapshot: getThemeSnapshot,
  getServerSnapshot: () => 'light' as Theme,
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot, themeStore.getServerSnapshot)

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => {
        currentTheme = nextTheme
        applyTheme(nextTheme)
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
        } catch {
          // 隐私模式下写入失败时仅保留内存状态
        }
      },
      toggleTheme: () => {
        const nextTheme = getThemeSnapshot() === 'dark' ? 'light' : 'dark'
        currentTheme = nextTheme
        applyTheme(nextTheme)
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
        } catch {
          // 同上
        }
      },
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be within ThemeProvider')
  }
  return context
}
