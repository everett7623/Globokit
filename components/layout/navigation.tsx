// 名称: 导航栏组件
// 描述: 外贸工作台导航，包含工具搜索、工作流分组、精选入口、移动端菜单和主题切换
// 路径: Globokit/components/layout/navigation.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Compass,
  ExternalLink,
  FileCode2,
  Globe2,
  Home,
  Menu,
  MessageSquareText,
  PackageCheck,
  Search,
  Ship,
  Sparkles,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { TOOL_REGISTRY, ToolCategory, ToolMeta, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'
import { getToolBadgeClassName } from '@/lib/tools/registry-ui'

const toolsByCategory = getToolsByCategory()
const activeCategories = getActiveCategories()

const categoryMeta: Record<ToolCategory, { icon: ComponentType<{ className?: string }>; tone: string }> = {
  '财务报价': { icon: CircleDollarSign, tone: 'text-emerald-600 dark:text-emerald-300' },
  '文本处理': { icon: MessageSquareText, tone: 'text-sky-600 dark:text-sky-300' },
  '时间与节假日': { icon: CalendarDays, tone: 'text-amber-600 dark:text-amber-300' },
  '国家与货币': { icon: Globe2, tone: 'text-cyan-600 dark:text-cyan-300' },
  '物流与装柜': { icon: Ship, tone: 'text-lime-600 dark:text-lime-300' },
  'VPS/站长工具': { icon: BriefcaseBusiness, tone: 'text-violet-600 dark:text-violet-300' },
  '外贸沟通': { icon: PackageCheck, tone: 'text-teal-600 dark:text-teal-300' },
  '文件与格式转换': { icon: FileCode2, tone: 'text-orange-600 dark:text-orange-300' },
}

const featuredToolIds = [
  'quote-calculator',
  'container-load-calculator',
  'holiday-query',
  'global-country-info',
]

const featuredTools = featuredToolIds
  .map((id) => TOOL_REGISTRY.find((tool) => tool.id === id))
  .filter((tool): tool is ToolMeta => Boolean(tool))

const newTools = TOOL_REGISTRY.filter((tool) => tool.badge === '新增').slice(0, 5)

const externalLinks = [
  {
    href: 'https://seedloc.com',
    label: '博客',
    icon: BookOpen,
  },
  {
    href: 'https://nav.seedloc.com',
    label: '导航站',
    icon: Compass,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ToolCategory>(activeCategories[0])
  const [query, setQuery] = useState('')

  const isToolPage = pathname.startsWith('/tools/')
  const normalizedQuery = query.trim().toLowerCase()
  const activeCategoryTools = toolsByCategory[activeCategory] ?? []

  const filteredTools = useMemo(() => {
    if (!normalizedQuery) {
      return activeCategoryTools
    }

    return TOOL_REGISTRY.filter((tool) => {
      const text = [
        tool.title,
        tool.shortTitle,
        tool.category,
        tool.description,
        ...(tool.keywords ?? []),
      ].join(' ').toLowerCase()

      return text.includes(normalizedQuery)
    }).slice(0, 8)
  }, [activeCategoryTools, normalizedQuery])

  const closeMenus = () => {
    setToolsDropdownOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
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
          onMouseEnter={() => setToolsDropdownOpen(true)}
          onMouseLeave={() => setToolsDropdownOpen(false)}
        >
          <button
            type="button"
            aria-expanded={toolsDropdownOpen}
            aria-controls="desktop-tools-menu"
            onClick={() => setToolsDropdownOpen((open) => !open)}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors hover:bg-slate-900/[0.04] hover:text-emerald-700 dark:hover:bg-white/10 dark:hover:text-cyan-200',
              isToolPage ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300'
            )}
          >
            <BriefcaseBusiness className="h-4 w-4" />
            工具工作台
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', toolsDropdownOpen && 'rotate-180')} />
          </button>

          <div
            id="desktop-tools-menu"
            className={cn(
              'fixed left-1/2 top-[72px] z-50 w-[min(1200px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all dark:border-white/10 dark:bg-slate-950/95 dark:shadow-black/40',
              toolsDropdownOpen
                ? 'visible -translate-x-1/2 translate-y-0 opacity-100'
                : 'invisible -translate-x-1/2 -translate-y-2 opacity-0'
            )}
          >
            <div
              className="grid grid-cols-[270px_minmax(0,1fr)_280px]"
              style={{ height: 'min(620px, calc(100vh - 88px))' }}
            >
              <aside className="h-full overflow-y-auto border-r border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-900/70">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">业务流程</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{TOOL_REGISTRY.length} 款工具</p>
                  </div>
                  <Badge className="border-0 bg-slate-950 text-white dark:bg-white dark:text-slate-950">Desk</Badge>
                </div>

                <div className="space-y-1">
                  {activeCategories.map((category) => {
                    const meta = categoryMeta[category]
                    const Icon = meta.icon

                    return (
                      <button
                        key={category}
                        type="button"
                        onMouseEnter={() => setActiveCategory(category)}
                        onFocus={() => setActiveCategory(category)}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          'group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-all hover:bg-white hover:shadow-sm dark:hover:bg-white/10',
                          activeCategory === category && 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200/80 dark:bg-cyan-300/10 dark:text-cyan-200 dark:ring-cyan-300/20'
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Icon className={cn('h-4 w-4 shrink-0', meta.tone)} />
                          <span
                            className={cn(
                              'truncate font-medium text-slate-700 group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white',
                              activeCategory === category && 'text-emerald-700 dark:text-cyan-200'
                            )}
                          >
                            {category}
                          </span>
                        </span>
                        <span className="text-xs text-slate-400">{toolsByCategory[category].length}</span>
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
                    {featuredTools.slice(0, 3).map((tool) => (
                      tool && (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          onClick={closeMenus}
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200"
                        >
                          {tool.shortTitle}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </aside>

              <section className="h-full overflow-y-auto p-5">
                <div className="mb-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="搜索报价、装柜、国家、节假日、JSON..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  />
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">
                      {normalizedQuery ? '搜索结果' : `${activeCategory}工具`}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {normalizedQuery ? `匹配 ${filteredTools.length} 款工具` : `当前分类 ${activeCategoryTools.length} 款工具`}
                    </p>
                  </div>
                  <Link
                    href="/#tools"
                    onClick={closeMenus}
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-cyan-200"
                  >
                    全部工具
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredTools.map((tool) => (
                    tool && (
                      <ToolMenuItem key={tool.id} tool={tool} active={pathname === tool.href} onClick={closeMenus} />
                    )
                  ))}
                </div>

                {filteredTools.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                    没有匹配工具
                  </div>
                )}
              </section>

              <aside className="h-full overflow-y-auto border-l border-slate-200/80 bg-slate-950 p-4 text-white dark:border-white/10">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <p className="text-sm font-semibold">新增工具</p>
                </div>

                <div className="space-y-2">
                  {newTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={closeMenus}
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
                    {externalLinks.map((link) => {
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
            </div>
          </div>
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

        {featuredTools.slice(0, 3).map((tool) => (
          tool && (
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
          )
        ))}

        <div className="ml-2 flex items-center gap-2">
          {externalLinks.map((link) => {
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

      <div className="ml-auto flex items-center gap-2 lg:hidden">
        <ThemeToggle compact />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-tools-menu"
          aria-label={mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm shadow-slate-900/[0.03] transition-colors hover:text-emerald-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-tools-menu" className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100vh-72px)] overflow-y-auto border-b border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">
          <div className="space-y-5 px-4 py-5">
            <Link
              href="/"
              onClick={closeMenus}
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
              onClick={closeMenus}
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
                onChange={(event) => setQuery(event.target.value)}
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
                  tool && <ToolMenuItem key={tool.id} tool={tool} active={pathname === tool.href} onClick={closeMenus} compact />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {activeCategories.map((category) => {
                const meta = categoryMeta[category]
                const Icon = meta.icon

                return (
                  <div key={category}>
                    <div className="mb-2 flex items-center gap-2 px-1">
                      <Icon className={cn('h-4 w-4', meta.tone)} />
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{category}</p>
                    </div>
                    <div className="grid gap-1">
                      {toolsByCategory[category].map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={closeMenus}
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
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenus}
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

function ToolMenuItem({
  tool,
  active,
  compact = false,
  onClick,
}: {
  tool: NonNullable<(typeof TOOL_REGISTRY)[number]>
  active: boolean
  compact?: boolean
  onClick: () => void
}) {
  return (
    <Link
      href={tool.href}
      onClick={onClick}
      className={cn(
        'group block rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-md hover:shadow-emerald-900/5 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10',
        active
          ? 'border-emerald-300 bg-emerald-50/80 dark:border-cyan-300/50 dark:bg-cyan-300/10'
          : 'border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/[0.03]',
        compact && 'p-3'
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
          {tool.shortTitle}
        </span>
        {tool.badge && (
          <Badge variant="outline" className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}>
            {tool.badge}
          </Badge>
        )}
      </div>
      <p className={cn('line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400', compact && 'line-clamp-1')}>
        {tool.description}
      </p>
    </Link>
  )
}
