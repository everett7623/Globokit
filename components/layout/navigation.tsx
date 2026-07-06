// 名称: 导航栏组件
// 描述: 全局顶部导航栏，包含移动端适配、分类工具菜单及外部链接
// 路径: Globokit/components/layout/navigation.tsx
// 作者: Jensfrank
// 更新时间: 2026-07-06

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  BookOpen,
  Compass,
  Menu,
  X,
  ExternalLink,
  Home,
  ChevronDown,
  Grid3X3,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TOOL_REGISTRY, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'
import { getToolBadgeClassName } from '@/lib/tools/registry-ui'

const toolsByCategory = getToolsByCategory()
const activeCategories = getActiveCategories()
const featuredTools = TOOL_REGISTRY.filter((tool) => tool.badge).slice(0, 4)

const externalLinks = [
  {
    href: 'https://seedloc.com',
    label: '博客',
    icon: BookOpen,
    className: 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200',
  },
  {
    href: 'https://nav.seedloc.com',
    label: '导航站',
    icon: Compass,
    className: 'text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-sm hover:shadow-md',
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)

  const isToolPage = pathname.startsWith('/tools/')

  return (
    <>
      <nav className="ml-auto hidden items-center space-x-6 md:flex">
        <Link
          href="/"
          className={cn(
            'text-sm font-medium transition-colors hover:text-emerald-700',
            pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
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
              'flex items-center gap-1 text-sm font-medium transition-colors hover:text-emerald-700',
              isToolPage ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            工具集
            <ChevronDown className={cn('h-3 w-3 transition-transform', toolsDropdownOpen && 'rotate-180')} />
          </button>

          <div
            id="desktop-tools-menu"
            className={cn(
              'fixed left-1/2 top-16 z-50 w-[min(940px,calc(100vw-2rem))] rounded-lg border border-gray-200 bg-white p-4 shadow-xl shadow-slate-900/10 transition-all',
              toolsDropdownOpen
                ? 'visible -translate-x-1/2 translate-y-0 opacity-100'
                : 'invisible -translate-x-1/2 -translate-y-2 opacity-0'
            )}
          >
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">工具中心</p>
                <p className="mt-0.5 text-xs text-gray-500">按外贸工作流快速进入常用工具</p>
              </div>
              <Link
                href="/#tools"
                onClick={() => setToolsDropdownOpen(false)}
                className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                {TOOL_REGISTRY.length} 款工具
              </Link>
            </div>

            <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50/80 p-3">
              <div className="mb-2 flex items-center gap-2 px-1">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-semibold text-gray-600">推荐入口</p>
              </div>
              <div className="grid gap-2 md:grid-cols-4">
                {featuredTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setToolsDropdownOpen(false)}
                    className={cn(
                      'rounded-md border bg-white p-3 text-sm transition-all hover:border-emerald-200 hover:bg-emerald-50/60',
                      pathname === tool.href ? 'border-emerald-200 bg-emerald-50/80' : 'border-gray-100'
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-gray-900">{tool.shortTitle}</span>
                      {tool.badge && (
                        <Badge
                          variant="outline"
                          className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}
                        >
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{tool.category}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {activeCategories.map((category) => (
                <div key={category}>
                  <div className="mb-2 flex items-center gap-2 px-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-xs font-semibold text-gray-500">{category}</p>
                  </div>
                  <div className="space-y-1">
                    {toolsByCategory[category].map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm transition-colors',
                          pathname === tool.href
                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                            : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                        )}
                      >
                        <span className="truncate">{tool.shortTitle}</span>
                        {tool.badge && (
                          <Badge
                            variant="outline"
                            className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}
                          >
                            {tool.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-6 flex items-center gap-3 border-l border-gray-200 pl-6">
          {externalLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  link.className
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </Link>
            )
          })}
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-tools-menu"
        aria-label={mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
        className="ml-auto rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileMenuOpen && (
        <div id="mobile-tools-menu" className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-gray-200 bg-white shadow-lg md:hidden">
          <div className="space-y-4 px-4 py-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium',
                pathname === '/'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
              )}
            >
              <Home className="h-4 w-4" />
              首页
            </Link>

            <div>
              <div className="mb-2 flex items-center justify-between px-3">
                <p className="text-xs font-semibold text-gray-500">工具集</p>
                <span className="text-xs text-gray-400">{TOOL_REGISTRY.length} 款</span>
              </div>

              <div className="mb-4 space-y-1 rounded-lg bg-gray-50 p-2">
                <p className="px-2 py-1 text-xs font-medium text-emerald-700">推荐入口</p>
                {featuredTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm',
                      pathname === tool.href
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                    )}
                  >
                    <span>{tool.shortTitle}</span>
                    {tool.badge && (
                      <Badge
                        variant="outline"
                        className={cn('border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}
                      >
                        {tool.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                {activeCategories.map((category) => (
                  <div key={category}>
                    <p className="mb-1 px-3 text-xs font-medium text-emerald-700">{category}</p>
                    <div className="space-y-1">
                      {toolsByCategory[category].map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm',
                            pathname === tool.href
                              ? 'bg-emerald-50 text-emerald-700 font-medium'
                              : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                          )}
                        >
                          <span>{tool.shortTitle}</span>
                          {tool.badge && (
                            <Badge
                              variant="outline"
                              className={cn('border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}
                            >
                              {tool.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 border-t border-gray-200 pt-4">
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ExternalLink className="ml-auto h-3 w-3" />
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
