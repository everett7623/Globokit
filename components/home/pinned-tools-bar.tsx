// 名称: 首页已置顶常用工具快捷栏
// 描述: 展示用户本地置顶的常用外贸工具，支持一键直达与取消置顶
// 路径: Globokit/components/home/pinned-tools-bar.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

'use client'

import Link from 'next/link'
import { Pin, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { togglePinnedToolSlug } from '@/lib/pinned-tools'
import { getToolBySlug, type ToolMeta } from '@/lib/tools/registry'

interface PinnedToolsBarProps {
  pinnedSlugs: string[]
}

export function PinnedToolsBar({ pinnedSlugs }: PinnedToolsBarProps) {
  const pinnedTools = pinnedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolMeta => Boolean(tool))

  if (pinnedTools.length === 0) return null

  return (
    <div className="rounded-lg border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-cyan-300/20 dark:bg-cyan-950/20">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-cyan-200">
          <Pin className="h-3.5 w-3.5" aria-hidden="true" />
          我的常用工具（{pinnedTools.length}）
        </p>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">仅保存在当前浏览器本地</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {pinnedTools.map((tool) => (
          <div
            key={tool.id}
            className="inline-flex items-center gap-1 rounded-md border border-emerald-200/90 bg-white/95 pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-800 shadow-2xs dark:border-white/15 dark:bg-slate-950/80 dark:text-slate-100"
          >
            <Link href={tool.href} className="transition-colors hover:text-emerald-700 dark:hover:text-cyan-200">
              {tool.shortTitle}
            </Link>
            <button
              type="button"
              onClick={() => {
                togglePinnedToolSlug(tool.slug)
                trackEvent('tool_pin', { tool_slug: tool.slug, pinned: false })
              }}
              aria-label={`取消置顶 ${tool.title}`}
              className="rounded p-0.5 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
