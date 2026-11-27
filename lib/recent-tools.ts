// 名称: 最近使用工具本地存储工具
// 描述: 在浏览器 localStorage 中维护最近访问的工具 slug 列表，支持 useSyncExternalStore 订阅
// 路径: Globokit/lib/recent-tools.ts
// 作者: everettlabs
// 更新时间: 2026-11-27

import { getToolBySlug } from '@/lib/tools/registry'

export const RECENT_TOOLS_STORAGE_KEY = 'globokit-recent-tools'
export const MAX_RECENT_TOOLS = 6
const CHANGE_EVENT = 'globokit-recent-tools-change'
const EMPTY_SLUGS: string[] = []

let cachedRaw: string | null = null
let cachedSlugs: string[] = EMPTY_SLUGS

export function getRecentToolsServerSnapshot(): string[] {
  return EMPTY_SLUGS
}

export function readRecentToolSlugs(): string[] {
  if (typeof window === 'undefined') return EMPTY_SLUGS
  try {
    const raw = window.localStorage.getItem(RECENT_TOOLS_STORAGE_KEY)
    if (raw === cachedRaw) return cachedSlugs
    cachedRaw = raw
    if (!raw) {
      cachedSlugs = EMPTY_SLUGS
      return cachedSlugs
    }
    const parsed = JSON.parse(raw)
    cachedSlugs = Array.isArray(parsed)
      ? parsed
          .filter((item): item is string => typeof item === 'string' && Boolean(getToolBySlug(item)))
          .slice(0, MAX_RECENT_TOOLS)
      : EMPTY_SLUGS
    return cachedSlugs
  } catch {
    return EMPTY_SLUGS
  }
}

export function subscribeRecentTools(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = () => listener()
  window.addEventListener(CHANGE_EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function recordRecentToolSlug(slug: string): void {
  if (typeof window === 'undefined' || !getToolBySlug(slug)) return
  const current = readRecentToolSlugs().filter((item) => item !== slug)
  const next = [slug, ...current].slice(0, MAX_RECENT_TOOLS)
  try {
    const raw = JSON.stringify(next)
    window.localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, raw)
    cachedRaw = raw
    cachedSlugs = next
    window.dispatchEvent(new Event(CHANGE_EVENT))
  } catch {
    // 忽略隐私模式或存储配额限制
  }
}

export function clearRecentToolSlugs(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(RECENT_TOOLS_STORAGE_KEY)
    cachedRaw = null
    cachedSlugs = EMPTY_SLUGS
    window.dispatchEvent(new Event(CHANGE_EVENT))
  } catch {
    // 忽略存储限制
  }
}
