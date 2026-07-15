// 名称: 首页工具目录
// 描述: 按注册表分类展示全部工具入口
// 路径: Globokit/components/home/home-tool-directory.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ToolCategory, ToolMeta } from '@/lib/tools/registry'
import { cn } from '@/lib/utils'
import { HOME_ACTIVE_CATEGORIES, HOME_TOOLS, HOME_TOOLS_BY_CATEGORY } from './home-data'

export function HomeToolDirectory() {
  return (
    <section id="tools" className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
            <BadgeCheck className="h-3.5 w-3.5" />
            工具目录
          </div>
          <h2 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">按业务流选择工具</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {HOME_ACTIVE_CATEGORIES.map((category) => (
            <span key={category} className="rounded-md border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm shadow-slate-900/[0.02] dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
              {category} · {HOME_TOOLS_BY_CATEGORY[category].length}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {HOME_ACTIVE_CATEGORIES.map((category) => (
          <CategorySection key={category} category={category} tools={HOME_TOOLS_BY_CATEGORY[category]} />
        ))}
      </div>
    </section>
  )
}

function CategorySection({ category, tools: categoryTools }: { category: ToolCategory; tools: ToolMeta[] }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{category}</h3>
        <span className="text-xs text-slate-400">{categoryTools.length}</span>
      </div>

      <div className="space-y-2">
        {categoryTools.map((rawTool) => {
          const tool = HOME_TOOLS.find((item) => item.id === rawTool.id)
          if (!tool) return null

          const Icon = tool.icon
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group flex gap-3 rounded-md border border-slate-200/80 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-md hover:shadow-emerald-900/[0.05] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10"
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
