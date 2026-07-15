// 名称: 桌面工具菜单
// 描述: 组合分类侧栏、工具搜索结果与新工具侧栏
// 路径: Globokit/components/layout/navigation-desktop-menu.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { ToolCategory, ToolMeta } from '@/lib/tools/registry'
import { cn } from '@/lib/utils'
import { CategorySidebar, NewToolsSidebar } from './navigation-desktop-sidebars'
import { NavigationToolItem } from './navigation-tool-item'

interface DesktopToolsMenuProps {
  open: boolean
  pathname: string
  activeCategory: ToolCategory
  activeCategoryToolsLength: number
  query: string
  normalizedQuery: string
  filteredTools: ToolMeta[]
  onActiveCategoryChange: (category: ToolCategory) => void
  onQueryChange: (query: string) => void
  onClose: () => void
}

export function DesktopToolsMenu({
  open,
  pathname,
  activeCategory,
  activeCategoryToolsLength,
  query,
  normalizedQuery,
  filteredTools,
  onActiveCategoryChange,
  onQueryChange,
  onClose,
}: DesktopToolsMenuProps) {
  return (
    <div
      id="desktop-tools-menu"
      className={cn(
        'fixed left-1/2 top-[72px] z-50 w-[min(1200px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all dark:border-white/10 dark:bg-slate-950/95 dark:shadow-black/40',
        open
          ? 'visible -translate-x-1/2 translate-y-0 opacity-100'
          : 'invisible -translate-x-1/2 -translate-y-2 opacity-0'
      )}
    >
      <div className="grid grid-cols-[270px_minmax(0,1fr)_280px]" style={{ height: 'min(620px, calc(100vh - 88px))' }}>
        <CategorySidebar
          activeCategory={activeCategory}
          onActiveCategoryChange={onActiveCategoryChange}
          onClose={onClose}
        />

        <section className="h-full overflow-y-auto p-5">
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="搜索报价、装柜、空运、国家、节假日、JSON..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
            />
          </div>

          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">
                {normalizedQuery ? '搜索结果' : `${activeCategory}工具`}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {normalizedQuery ? `匹配 ${filteredTools.length} 款工具` : `当前分类 ${activeCategoryToolsLength} 款工具`}
              </p>
            </div>
            <Link
              href="/#tools"
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-cyan-200"
            >
              全部工具
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {filteredTools.map((tool) => (
              <NavigationToolItem key={tool.id} tool={tool} active={pathname === tool.href} onClick={onClose} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
              没有匹配工具
            </div>
          )}
        </section>

        <NewToolsSidebar onClose={onClose} />
      </div>
    </div>
  )
}
