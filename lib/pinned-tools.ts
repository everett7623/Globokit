// 名称: 常用工具置顶收藏本地存储
// 描述: 在浏览器 localStorage 中维护用户置顶的常用工具 slug 列表，支持 useSyncExternalStore 订阅
// 路径: Globokit/lib/pinned-tools.ts
// 作者: everettlabs
// 更新时间: 2026-11-27

import { getToolBySlug } from '@/lib/tools/registry'

export const PINNED_TOOLS_STORAGE_KEY = 'globokit-pinned-tools'
export const MAX_PINNED_TOOLS = 8
const CHANGE_EVENT = 'globokit-pinned-tools-change'
const EMPTY_SLUGS: string[] = []

let cachedRaw: string | null = null
let cachedSlugs: string[] = EMPTY_SLUGS

export function getPinnedToolsServerSnapshot(): string[] {
  return EMPTY_SLUGS
}

export function readPinnedToolSlugs(): string[] {
  if (typeof window === 'undefined') return EMPTY_SLUGS
  try {
    const raw = window.localStorage.getItem(PINNED_TOOLS_STORAGE_KEY)
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
          .slice(0, MAX_PINNED_TOOLS)
      : EMPTY_SLUGS
    return cachedSlugs
  } catch {
    return EMPTY_SLUGS
  }
}

export function subscribePinnedTools(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = () => listener()
  window.addEventListener(CHANGE_EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function togglePinnedToolSlug(slug: string): boolean {
  if (typeof window === 'undefined' || !getToolBySlug(slug)) return false
  const current = readPinnedToolSlugs()
  const exists = current.includes(slug)
  const next = exists
    ? current.filter((item) => item !== slug)
    : [slug, ...current].slice(0, MAX_PINNED_TOOLS)
  try {
    const raw = JSON.stringify(next)
    window.localStorage.setItem(PINNED_TOOLS_STORAGE_KEY, raw)
    cachedRaw = raw
    cachedSlugs = next
    window.dispatchEvent(new Event(CHANGE_EVENT))
  } catch {
    // 忽略隐私模式或存储配额限制
  }
  return !exists
}
