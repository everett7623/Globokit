// 名称: 桌面导航
// 描述: 展示桌面端主导航、工具工作台、精选工具与外部入口
// 路径: Globokit/components/layout/navigation-desktop.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import Link from 'next/link'
import { BriefcaseBusiness, ChevronDown, PackageCheck } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import type { ToolCategory, ToolMeta } from '@/lib/tools/registry'
import { cn } from '@/lib/utils'
import { NAV_EXTERNAL_LINKS, NAV_FEATURED_TOOLS } from './navigation-data'
import { DesktopToolsMenu } from './navigation-desktop-menu'

interface DesktopNavigationProps {
  pathname: string
  toolsDropdownOpen: boolean
  activeCategory: ToolCategory
  activeCategoryToolsLength: number
  query: string
  normalizedQuery: string
  filteredTools: ToolMeta[]
  onToolsDropdownOpenChange: (open: boolean) => void
  onActiveCategoryChange: (category: ToolCategory) => void
  onQueryChange: (query: string) => void
  onClose: () => void
}

export function DesktopNavigation({
  pathname,
  toolsDropdownOpen,
  activeCategory,
  activeCategoryToolsLength,
  query,
  normalizedQuery,
  filteredTools,
  onToolsDropdownOpenChange,
  onActiveCategoryChange,
  onQueryChange,
  onClose,
}: DesktopNavigationProps) {
  const isToolPage = pathname.startsWith('/tools/')

  return (
    <nav className="ml-auto hidden min-w-0 items-center gap-2 lg:flex">
      <Link
        href="/"
        className={cn(
          'inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-slate-900/[0.04] hover:text-emerald-700 dark:hover:bg-white/10 dark:hover:text-cyan-200',
          pathname === '/' ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300'
        )}
      >
        首页
      </Link>

      <div
        className="relative"
        onMouseEnter={() => onToolsDropdownOpenChange(true)}
        onMouseLeave={() => onToolsDropdownOpenChange(false)}
      >
        <button
          type="button"
          aria-expanded={toolsDropdownOpen}
          aria-controls="desktop-tools-menu"
          onClick={() => onToolsDropdownOpenChange(!toolsDropdownOpen)}
          className={cn(
            'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors hover:bg-slate-900/[0.04] hover:text-emerald-700 dark:hover:bg-white/10 dark:hover:text-cyan-200',
            isToolPage ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300'
          )}
        >
          <BriefcaseBusiness className="h-4 w-4" />
          工具工作台
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', toolsDropdownOpen && 'rotate-180')} />
        </button>

        <DesktopToolsMenu
          open={toolsDropdownOpen}
          pathname={pathname}
          activeCategory={activeCategory}
          activeCategoryToolsLength={activeCategoryToolsLength}
          query={query}
          normalizedQuery={normalizedQuery}
          filteredTools={filteredTools}
          onActiveCategoryChange={onActiveCategoryChange}
          onQueryChange={onQueryChange}
          onClose={onClose}
        />
      </div>

      <Link
        href="/resources"
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-slate-900/[0.04] hover:text-emerald-700 dark:hover:bg-white/10 dark:hover:text-cyan-200',
          pathname === '/resources' ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300'
        )}
      >
        <PackageCheck className="h-4 w-4" />
        业务资源
      </Link>

      <div className="mx-2 h-5 w-px bg-slate-200 dark:bg-white/10" />

      {NAV_FEATURED_TOOLS.slice(0, 3).map((tool) => (
        <Link
          key={tool.id}
          href={tool.href}
          className={cn(
            'hidden h-10 items-center rounded-md px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/[0.04] hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-cyan-200 xl:inline-flex',
            pathname === tool.href && 'bg-emerald-50 text-emerald-700 dark:bg-cyan-300/10 dark:text-cyan-200'
          )}
        >
          {tool.shortTitle}
        </Link>
      ))}

      <div className="ml-2 flex items-center gap-2">
        {NAV_EXTERNAL_LINKS.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200/80 bg-white/70 px-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/[0.03] transition-all hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-cyan-300/60 dark:hover:text-cyan-200"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
        <ThemeToggle />
      </div>
    </nav>
  )
}
