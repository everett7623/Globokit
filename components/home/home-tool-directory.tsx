// 名称: 首页工具目录
// 描述: 按注册表分类展示全部工具入口，支持关键词即时筛选与分类切换
// 路径: Globokit/components/home/home-tool-directory.tsx
// 作者: everettlabs
// 更新时间: 2026-11-25

'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BadgeCheck, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ToolCategory, ToolMeta } from '@/lib/tools/registry'
import { cn } from '@/lib/utils'
import { HOME_ACTIVE_CATEGORIES, HOME_TOOLS, HOME_TOOLS_BY_CATEGORY } from './home-data'

type CategoryFilter = '全部' | ToolCategory

const HOME_TOOL_BY_ID = new Map(HOME_TOOLS.map((tool) => [tool.id, tool]))

function matchesQuery(tool: ToolMeta, normalizedQuery: string): boolean {
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

export function HomeToolDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('全部')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const visibleGroups = useMemo(() => {
    const categories =
      selectedCategory === '全部' ? HOME_ACTIVE_CATEGORIES : [selectedCategory]

    return categories
      .map((category) => ({
        category,
        tools: HOME_TOOLS_BY_CATEGORY[category].filter((tool) =>
          matchesQuery(tool, normalizedQuery)
        ),
      }))
      .filter((group) => group.tools.length > 0)
  }, [selectedCategory, normalizedQuery])

  const matchedCount = useMemo(
    () => visibleGroups.reduce((sum, group) => sum + group.tools.length, 0),
    [visibleGroups]
  )

  return (
    <section id="tools" className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
            <BadgeCheck className="h-3.5 w-3.5" />
            工具目录
          </div>
          <h2 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
            按业务流选择工具
          </h2>
        </div>

        <div className="relative w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`搜索 ${HOME_TOOLS.length} 个工具（如：报价、装柜、发票、FOB）`}
            aria-label="搜索外贸工具"
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
      </div>

      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="按工具分类筛选">
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === '全部'}
          onClick={() => setSelectedCategory('全部')}
          className={cn(
            'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
            selectedCategory === '全部'
              ? 'border-emerald-600 bg-emerald-600 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950'
              : 'border-slate-200 bg-white/85 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-300/50'
          )}
        >
          全部 · {HOME_TOOLS.length}
        </button>
        {HOME_ACTIVE_CATEGORIES.map((category) => {
          const active = selectedCategory === category
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'border-emerald-600 bg-emerald-600 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950'
                  : 'border-slate-200 bg-white/85 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-300/50'
              )}
            >
              {category} · {HOME_TOOLS_BY_CATEGORY[category].length}
            </button>
          )
        })}
      </div>

      {normalizedQuery && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          共找到 <span className="font-semibold text-slate-900 dark:text-white">{matchedCount}</span> 个匹配工具
        </p>
      )}

      {visibleGroups.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-8 text-center dark:border-white/15 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            没有找到与「{query}」相关的工具
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setSelectedCategory('全部')
            }}
            className="mt-3 inline-flex h-9 items-center rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-400 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200"
          >
            重置筛选条件
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map(({ category, tools }) => (
            <CategorySection
              key={category}
              category={category}
              tools={tools}
              wide={selectedCategory !== '全部' || tools.length >= 6}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function CategorySection({ category, tools: categoryTools, wide = false }: { category: ToolCategory; tools: ToolMeta[]; wide?: boolean }) {
  return (
    <div className={cn('rounded-lg border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-900/4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60', wide && 'md:col-span-2 xl:col-span-3')}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{category}</h3>
        <span className="text-xs text-slate-400">{categoryTools.length}</span>
      </div>

      <div className={cn(wide ? 'grid gap-2 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-2')}>
        {categoryTools.map((rawTool) => {
          const tool = HOME_TOOL_BY_ID.get(rawTool.id)
          if (!tool) return null

          const Icon = tool.icon
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group flex gap-3 rounded-md border border-slate-200/80 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-md hover:shadow-emerald-900/[0.05] dark:border-white/10 dark:bg-white/3 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10"
            >
              <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-md', tool.bgColor, tool.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
                    {tool.shortTitle}
                  </p>
                  {tool.badge && (
                    <Badge variant="outline" className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', tool.badgeClassName)}>
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
    </div>
  )
}
