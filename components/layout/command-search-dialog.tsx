// 名称: 全局快捷键工具速搜弹窗
// 描述: 支持 Ctrl+K / ⌘K 唤起、键盘上下导航、最近使用工具记录与关键词即时筛选
// 路径: Globokit/components/layout/command-search-dialog.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Clock, CornerDownLeft, Search, Trash2, X } from 'lucide-react'
import { extractToolSlugFromPathname, trackEvent } from '@/lib/analytics'
import {
  clearRecentToolSlugs,
  getRecentToolsServerSnapshot,
  readRecentToolSlugs,
  recordRecentToolSlug,
  subscribeRecentTools,
} from '@/lib/recent-tools'
import { getToolBySlug, TOOL_REGISTRY, type ToolMeta } from '@/lib/tools/registry'
import { cn } from '@/lib/utils'

const RECOMMENDED_SLUGS = [
  'quote-calculator',
  'container-load-calculator',
  'invoice-generator',
  'packing-list-generator',
  'global-country-info',
  'holiday-query',
]

interface CommandSearchDialogProps {
  open: boolean
  pathname: string
  onOpenChange: (open: boolean) => void
}

function matchTool(tool: ToolMeta, normalizedQuery: string): boolean {
  const haystack = [
    tool.title,
    tool.shortTitle,
    tool.category,
    tool.description,
    ...(tool.keywords ?? []),
    ...(tool.useCases ?? []),
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(normalizedQuery)
}

export function CommandSearchDialog({ open, pathname, onOpenChange }: CommandSearchDialogProps) {
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] === 'tools' && segments[1]) {
      recordRecentToolSlug(segments[1])
    }
  }, [pathname])

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      } else if (event.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [open, onOpenChange])

  if (!open) return null
  return <CommandSearchModal onClose={() => onOpenChange(false)} />
}

function CommandSearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const recentSlugs = useSyncExternalStore(
    subscribeRecentTools,
    readRecentToolSlugs,
    getRecentToolsServerSnapshot
  )

  const normalizedQuery = query.trim().toLowerCase()
  const recentTools = useMemo(
    () => recentSlugs.map((slug) => getToolBySlug(slug)).filter((item): item is ToolMeta => Boolean(item)),
    [recentSlugs]
  )
  const recommendedTools = useMemo(
    () => RECOMMENDED_SLUGS.map((slug) => getToolBySlug(slug)).filter((item): item is ToolMeta => Boolean(item)),
    []
  )
  const items = useMemo(() => {
    if (normalizedQuery) return TOOL_REGISTRY.filter((tool) => matchTool(tool, normalizedQuery)).slice(0, 10)
    return recentTools.length > 0 ? recentTools : recommendedTools
  }, [normalizedQuery, recentTools, recommendedTools])

  const safeActiveIndex = items.length > 0 ? Math.min(activeIndex, items.length - 1) : 0
  const navigateTo = (href: string) => {
    trackEvent('command_search_open', {
      tool_slug: extractToolSlugFromPathname(href),
      has_query: Boolean(normalizedQuery),
    })
    onClose()
    router.push(href)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && items.length > 0) {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % items.length)
    } else if (event.key === 'ArrowUp' && items.length > 0) {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + items.length) % items.length)
    } else if (event.key === 'Enter' && items[safeActiveIndex]) {
      event.preventDefault()
      navigateTo(items[safeActiveIndex].href)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="全局工具速搜"
      className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/45 px-4 pt-20 backdrop-blur-xs sm:pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-white/15 dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={`搜索全部 ${TOOL_REGISTRY.length} 个外贸工具（如：报价、装柜、发票、退税、FOB）`}
            aria-label="输入关键词搜索工具"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-hidden placeholder:text-slate-400 dark:text-slate-100"
          />
          <button type="button" onClick={onClose} aria-label="关闭速搜弹窗" className="rounded p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          <div className="flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-medium">
              {!normalizedQuery && recentTools.length > 0 && <Clock className="h-3.5 w-3.5" aria-hidden="true" />}
              {normalizedQuery ? `匹配结果（${items.length}）` : recentTools.length > 0 ? '最近使用' : '高频推荐'}
            </span>
            {!normalizedQuery && recentTools.length > 0 && (
              <button type="button" onClick={clearRecentToolSlugs} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <Trash2 className="h-3 w-3" aria-hidden="true" />
                清空记录
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              未找到与「{query}」匹配的工具，试试输入“报价”、“装柜”或“发票”。
            </div>
          ) : (
            <ul role="listbox" className="space-y-0.5">
              {items.map((tool, index) => {
                const active = index === safeActiveIndex
                return (
                  <li key={tool.id} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => navigateTo(tool.href)}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
                        active ? 'bg-emerald-50 text-emerald-900 dark:bg-cyan-400/15 dark:text-cyan-100' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5'
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{tool.title}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{tool.category} · {tool.description}</p>
                      </div>
                      <CornerDownLeft className={cn('h-3.5 w-3.5 shrink-0', active ? 'opacity-80' : 'opacity-0')} aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs text-slate-500 dark:border-white/10 dark:bg-white/3 dark:text-slate-400">
          <span>↑↓ 选择 · Enter 打开 · Esc 关闭</span>
          <button
            type="button"
            onClick={() => navigateTo(normalizedQuery ? `/tools?q=${encodeURIComponent(query.trim())}` : '/tools')}
            className="inline-flex items-center gap-1 font-medium text-emerald-700 hover:underline dark:text-cyan-300"
          >
            {normalizedQuery ? '在目录页查看全部' : '浏览全部工具'}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
