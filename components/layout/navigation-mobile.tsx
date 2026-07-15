// 名称: 移动导航
// 描述: 展示移动端菜单开关、工具搜索、分类入口与外部链接
// 路径: Globokit/components/layout/navigation-mobile.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ExternalLink, Home, Menu, PackageCheck, Search, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { TOOL_REGISTRY, type ToolMeta } from '@/lib/tools/registry'
import { getToolBadgeClassName } from '@/lib/tools/registry-ui'
import { cn } from '@/lib/utils'
import {
  NAV_ACTIVE_CATEGORIES,
  NAV_CATEGORY_META,
  NAV_EXTERNAL_LINKS,
  NAV_TOOLS_BY_CATEGORY,
} from './navigation-data'
import { NavigationToolItem } from './navigation-tool-item'

interface MobileNavigationProps {
  pathname: string
  open: boolean
  query: string
  filteredTools: ToolMeta[]
  onOpenChange: (open: boolean) => void
  onQueryChange: (query: string) => void
  onClose: () => void
}

export function MobileNavigation({
  pathname,
  open,
  query,
  filteredTools,
  onOpenChange,
  onQueryChange,
  onClose,
}: MobileNavigationProps) {
  return (
    <>
      <div className="ml-auto flex items-center gap-2 lg:hidden">
        <ThemeToggle compact />
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
          aria-controls="mobile-tools-menu"
          aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm shadow-slate-900/[0.03] transition-colors hover:text-emerald-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-tools-menu" className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100vh-72px)] overflow-y-auto border-b border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">
          <div className="space-y-5 px-4 py-5">
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium',
                pathname === '/'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-cyan-300/10 dark:text-cyan-200'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
              )}
            >
              <Home className="h-4 w-4" />
              首页
            </Link>

            <Link
              href="/resources"
              onClick={onClose}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium',
                pathname === '/resources'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-cyan-300/10 dark:text-cyan-200'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
              )}
            >
              <PackageCheck className="h-4 w-4" />
              业务资源
            </Link>

            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-slate-900/80">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="搜索工具"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">高频入口</p>
                <span className="text-xs text-slate-400">{TOOL_REGISTRY.length} 款</span>
              </div>
              <div className="grid gap-2">
                {filteredTools.map((tool) => (
                  <NavigationToolItem key={tool.id} tool={tool} active={pathname === tool.href} onClick={onClose} compact />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {NAV_ACTIVE_CATEGORIES.map((category) => {
                const meta = NAV_CATEGORY_META[category]
                const Icon = meta.icon
                return (
                  <div key={category}>
                    <div className="mb-2 flex items-center gap-2 px-1">
                      <Icon className={cn('h-4 w-4', meta.tone)} />
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{category}</p>
                    </div>
                    <div className="grid gap-1">
                      {NAV_TOOLS_BY_CATEGORY[category].map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm',
                            pathname === tool.href
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-cyan-300/10 dark:text-cyan-200'
                              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                          )}
                        >
                          <span>{tool.shortTitle}</span>
                          {tool.badge && (
                            <Badge variant="outline" className={cn('border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}>
                              {tool.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
              {NAV_EXTERNAL_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ExternalLink className="ml-auto h-3 w-3 text-slate-400" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
