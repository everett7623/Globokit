// 名称: 桌面导航侧栏
// 描述: 展示工具分类、精选链路、新工具与外部入口
// 路径: Globokit/components/layout/navigation-desktop-sidebars.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowRight, BadgeCheck, ExternalLink, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ToolCategory } from '@/lib/tools/registry'
import { getToolBadgeClassName } from '@/lib/tools/registry-ui'
import { cn } from '@/lib/utils'
import {
  NAV_ACTIVE_CATEGORIES,
  NAV_CATEGORY_META,
  NAV_EXTERNAL_LINKS,
  NAV_FEATURED_TOOLS,
  NAV_NEW_TOOLS,
  NAV_TOOLS_BY_CATEGORY,
} from './navigation-data'

interface CategorySidebarProps {
  activeCategory: ToolCategory
  onActiveCategoryChange: (category: ToolCategory) => void
  onClose: () => void
}

export function CategorySidebar({ activeCategory, onActiveCategoryChange, onClose }: CategorySidebarProps) {
  return (
    <aside className="h-full overflow-y-auto border-r border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-900/70">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">业务流程</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {Object.values(NAV_TOOLS_BY_CATEGORY).flat().length} 款工具
          </p>
        </div>
        <Badge className="border-0 bg-slate-950 text-white dark:bg-white dark:text-slate-950">Desk</Badge>
      </div>

      <div className="space-y-1">
        {NAV_ACTIVE_CATEGORIES.map((category) => {
          const meta = NAV_CATEGORY_META[category]
          const Icon = meta.icon
          return (
            <button
              key={category}
              type="button"
              onMouseEnter={() => onActiveCategoryChange(category)}
              onFocus={() => onActiveCategoryChange(category)}
              onClick={() => onActiveCategoryChange(category)}
              className={cn(
                'group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-all hover:bg-white hover:shadow-sm dark:hover:bg-white/10',
                activeCategory === category && 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200/80 dark:bg-cyan-300/10 dark:text-cyan-200 dark:ring-cyan-300/20'
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Icon className={cn('h-4 w-4 shrink-0', meta.tone)} />
                <span className={cn(
                  'truncate font-medium text-slate-700 group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white',
                  activeCategory === category && 'text-emerald-700 dark:text-cyan-200'
                )}>
                  {category}
                </span>
              </span>
              <span className="text-xs text-slate-400">{NAV_TOOLS_BY_CATEGORY[category].length}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-lg border border-slate-200/80 bg-white p-3 dark:border-white/10 dark:bg-slate-950/50">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-cyan-200">
          <BadgeCheck className="h-3.5 w-3.5" />
          精选链路
        </div>
        <div className="space-y-1">
          {NAV_FEATURED_TOOLS.slice(0, 3).map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200"
            >
              {tool.shortTitle}
              <ArrowRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export function NewToolsSidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside className="h-full overflow-y-auto border-l border-slate-200/80 bg-slate-950 p-4 text-white dark:border-white/10">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-amber-300" />
        <p className="text-sm font-semibold">新增工具</p>
      </div>

      <div className="space-y-2">
        {NAV_NEW_TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            onClick={onClose}
            className="block rounded-md border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-emerald-300/50 hover:bg-emerald-300/10"
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold">{tool.shortTitle}</span>
              <Badge variant="outline" className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}>
                {tool.badge}
              </Badge>
            </div>
            <p className="line-clamp-2 text-xs leading-5 text-slate-300">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="mb-2 text-xs font-semibold text-slate-400">外部入口</p>
        <div className="space-y-1">
          {NAV_EXTERNAL_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
                {link.label}
                <ExternalLink className="ml-auto h-3 w-3 text-slate-500" />
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
