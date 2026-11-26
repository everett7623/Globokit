// 名称: 工具页面包屑导航
// 描述: 根据当前工具路由自动展示「首页 / 全部工具 / 分类 / 当前工具」层级路径
// 路径: Globokit/components/tools/tool-breadcrumb.tsx
// 作者: everettlabs
// 更新时间: 2026-11-25

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { getToolBySlug } from '@/lib/tools/registry'

export function ToolBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments[0] !== 'tools' || !segments[1]) {
    return null
  }

  const currentTool = getToolBySlug(segments[1])
  if (!currentTool) {
    return null
  }

  return (
    <nav aria-label="面包屑导航" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded px-1 py-0.5 transition-colors hover:text-emerald-700 dark:hover:text-cyan-200"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>首页</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </li>
        <li>
          <Link
            href="/tools"
            className="rounded px-1 py-0.5 transition-colors hover:text-emerald-700 dark:hover:text-cyan-200"
          >
            全部工具
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </li>
        <li>
          <Link
            href={`/tools#${encodeURIComponent(currentTool.category)}`}
            className="rounded px-1 py-0.5 transition-colors hover:text-emerald-700 dark:hover:text-cyan-200"
          >
            {currentTool.category}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </li>
        <li
          aria-current="page"
          className="truncate font-medium text-slate-800 dark:text-slate-200"
        >
          {currentTool.title}
        </li>
      </ol>
    </nav>
  )
}
