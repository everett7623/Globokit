// 名称: 相关工具推荐组件
// 描述: 根据工具注册表的 relatedTools 字段在工具页底部展示关联入口
// 路径: Globokit/components/tools/related-tools.tsx
// 作者: everettlabs
// 更新时间: 2026-07-06

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TOOL_REGISTRY, getToolBySlug } from '@/lib/tools/registry'
import { getToolBadgeClassName } from '@/lib/tools/registry-ui'

export function RelatedTools() {
  const pathname = usePathname()
  const slug = pathname.split('/').filter(Boolean)[1]
  const currentTool = slug ? getToolBySlug(slug) : undefined

  if (!currentTool?.relatedTools?.length) {
    return null
  }

  const relatedTools = currentTool.relatedTools
    .map((id) => TOOL_REGISTRY.find((tool) => tool.id === id))
    .filter(Boolean)

  if (!relatedTools.length) {
    return null
  }

  return (
    <section className="mt-10 border-t border-slate-200/80 pt-8 dark:border-white/10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">相关工具</h2>
          <p className="mt-1 text-sm text-muted-foreground">同一业务链路里的常用入口</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {relatedTools.map((tool) => {
          if (!tool) return null

          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group rounded-lg border border-slate-200/80 bg-white/80 p-4 shadow-sm shadow-slate-900/[0.04] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/[0.05] dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-300/50"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">{tool.shortTitle}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tool.category}</p>
                </div>
                {tool.badge && (
                  <Badge
                    variant="outline"
                    className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}
                  >
                    {tool.badge}
                  </Badge>
                )}
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{tool.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-cyan-200">
                打开工具
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
