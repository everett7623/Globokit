// 名称: 客户端外部状态 Hook
// 描述: 以 useSyncExternalStore 读取 localStorage、本地时区与客户端时钟，替代 effect 内 setState 的级联渲染写法
// 路径: Globokit/lib/client-hooks.ts
// 作者: everettlabs
// 更新时间: 2026-10-09

'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

const NEVER_SUBSCRIBE = () => () => {}

/* ---------------- localStorage 字符串数组 ---------------- */

const EMPTY_STRING_ARRAY: readonly string[] = Object.freeze([])

interface ArrayCacheEntry {
  raw: string | null
  parsed: readonly string[]
}

const arrayCache = new Map<string, ArrayCacheEntry>()
const arrayListeners = new Map<string, Set<() => void>>()

function readStoredRaw(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function parseStoredArray(raw: string | null): readonly string[] {
  if (!raw) return EMPTY_STRING_ARRAY
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return EMPTY_STRING_ARRAY
    return Object.freeze(parsed.filter((item): item is string => typeof item === 'string'))
  } catch {
    return EMPTY_STRING_ARRAY
  }
}

function getArraySnapshot(key: string): readonly string[] {
  const raw = readStoredRaw(key)
  const cached = arrayCache.get(key)
  if (cached && cached.raw === raw) return cached.parsed
  const parsed = parseStoredArray(raw)
  arrayCache.set(key, { raw, parsed })
  return parsed
}

function emitArrayChange(key: string) {
  arrayListeners.get(key)?.forEach((listener) => listener())
}

function subscribeArray(key: string, listener: () => void): () => void {
  let listeners = arrayListeners.get(key)
  if (!listeners) {
    listeners = new Set()
    arrayListeners.set(key, listeners)
  }
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === key) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * 读取并更新 localStorage 中以 JSON 字符串数组存储的键。
 * 服务端与首帧返回空数组，挂载后同步为存储值；同标签页写入与跨标签页 storage 事件都会触发更新。
 */
export function useStoredStringArray(key: string): [readonly string[], (updater: (current: readonly string[]) => readonly string[]) => void] {
  const subscribe = useCallback((listener: () => void) => subscribeArray(key, listener), [key])
  const getSnapshot = useCallback(() => getArraySnapshot(key), [key])
  const value = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_STRING_ARRAY)

  const update = useCallback((updater: (current: readonly string[]) => readonly string[]) => {
    const next = Object.freeze(updater(getArraySnapshot(key)))
    const raw = JSON.stringify(next)
    if (arrayCache.get(key)?.raw === raw) return
    arrayCache.set(key, { raw, parsed: next })
    try {
      window.localStorage.setItem(key, raw)
    } catch {
      // 隐私模式下写入失败时保留内存状态
    }
    emitArrayChange(key)
  }, [key])

  return [value, update]
}

/* ---------------- 本地时区 ---------------- */

let cachedTimeZone: string | null | undefined

function getTimeZoneSnapshot(): string {
  if (cachedTimeZone === undefined) {
    try {
      cachedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || null
    } catch {
      cachedTimeZone = null
    }
  }
  return cachedTimeZone ?? 'UTC'
}

/** 服务端返回 null，挂载后返回浏览器解析出的 IANA 时区（解析失败回退 UTC）。 */
export function useLocalTimeZone(): string | null {
  return useSyncExternalStore(NEVER_SUBSCRIBE, getTimeZoneSnapshot, () => null)
}

/* ---------------- 客户端首次日期 ---------------- */

let clientDateSnapshot: Date | null = null

function getClientDateSnapshot(): Date {
  if (clientDateSnapshot === null) clientDateSnapshot = new Date()
  return clientDateSnapshot
}

/** 服务端返回 null，挂载后返回客户端当前时刻（同一会话内保持同一实例）。 */
export function useClientDate(): Date | null {
  return useSyncExternalStore(NEVER_SUBSCRIBE, getClientDateSnapshot, () => null)
}

/* ---------------- 时钟 ---------------- */

interface ClockStore {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => number
}

function createClockStore(intervalMs: number): ClockStore {
  let timestamp = Date.now()
  const listeners = new Set<() => void>()
  let timer: ReturnType<typeof setInterval> | null = null

  return {
    subscribe(listener) {
      listeners.add(listener)
      if (timer === null) {
        timer = setInterval(() => {
          timestamp = Date.now()
          listeners.forEach((item) => item())
        }, intervalMs)
      }
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0 && timer !== null) {
          clearInterval(timer)
          timer = null
        }
      }
    },
    getSnapshot: () => timestamp,
  }
}

/** 服务端返回 null，挂载后按 intervalMs 周期返回当前时刻。 */
export function useNow(intervalMs = 1000): Date | null {
  const store = useMemo(() => createClockStore(intervalMs), [intervalMs])
  const timestamp = useSyncExternalStore(store.subscribe, store.getSnapshot, () => null)
  return useMemo(() => (timestamp === null ? null : new Date(timestamp)), [timestamp])
}
