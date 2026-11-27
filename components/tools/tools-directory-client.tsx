// 名称: 工具总目录客户端筛选组件
// 描述: 支持 ?q= 查询参数联动与关键词即时筛选，并保留按业务分类锚点浏览体验
// 路径: Globokit/components/tools/tools-directory-client.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { HOME_ACTIVE_CATEGORIES, HOME_TOOLS, HOME_TOOLS_BY_CATEGORY } from '@/components/home/home-data'
import type { ToolMeta } from '@/lib/tools/registry'

const HOME_TOOL_BY_ID = new Map(HOME_TOOLS.map((tool) => [tool.id, tool]))

function matchesTool(tool: ToolMeta, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true
  const haystack = [
    tool.title,
    tool.shortTitle,
    tool.description,
    tool.category,
    ...(tool.keywords ?? []),
    ...(tool.useCases ?? []),
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(normalizedQuery)
}

export function ToolsDirectoryClient() {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  return <ToolsDirectoryView key={urlQuery} initialQuery={urlQuery} />
}

function ToolsDirectoryView({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)
  const normalizedQuery = query.trim().toLowerCase()

  const visibleGroups = useMemo(
    () =>
      HOME_ACTIVE_CATEGORIES.map((category) => ({
        category,
        tools: HOME_TOOLS_BY_CATEGORY[category].filter((tool) =>
          matchesTool(tool, normalizedQuery)
        ),
      })).filter((group) => group.tools.length > 0),
    [normalizedQuery]
  )

  const matchedCount = useMemo(
    () => visibleGroups.reduce((sum, group) => sum + group.tools.length, 0),
    [visibleGroups]
  )

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`搜索 ${HOME_TOOLS.length} 个工具（如：报价、装柜、发票、退税、FOB）`}
            aria-label="在全部工具目录中搜索"
            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-white/15 dark:bg-slate-950/70 dark:text-slate-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="清空搜索关键词"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav aria-label="分类快速跳转" className="flex flex-wrap gap-2">
          {HOME_ACTIVE_CATEGORIES.map((category) => (
            <a
              key={category}
              href={`#${encodeURIComponent(category)}`}
              className="rounded-md border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-300/50 dark:hover:text-cyan-200"
            >
              {category} · {HOME_TOOLS_BY_CATEGORY[category].length}
            </a>
          ))}
        </nav>

        {normalizedQuery && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            关键词「{query.trim()}」共匹配{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{matchedCount}</span> 个工具
          </p>
        )}
      </div>

      {visibleGroups.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-8 text-center dark:border-white/15 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            没有找到与「{query.trim()}」相关的工具
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-3 inline-flex h-9 items-center rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-400 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200"
          >
            查看全部工具
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleGroups.map(({ category, tools }) => (
            <section key={category} id={encodeURIComponent(category)} className="scroll-mt-24 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{category}</h2>
                <Badge variant="outline" className="border-slate-200 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  {tools.length} 个
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((rawTool) => {
                  const tool = HOME_TOOL_BY_ID.get(rawTool.id)
                  if (!tool) return null
                  const Icon = tool.icon
                  return (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className="group flex gap-3 rounded-lg border border-slate-200/80 bg-white/85 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/4 dark:hover:border-cyan-300/50"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${tool.bgColor} ${tool.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
                            {tool.title}
                          </p>
                          {tool.badge && (
                            <Badge variant="outline" className={`shrink-0 border-0 px-2 py-0 text-[10px] ${tool.badgeClassName}`}>
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
