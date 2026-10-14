// 名称: 工具总目录页
// 描述: 独立索引页，按业务分类展示全部工具及其用途说明
// 路径: Globokit/app/tools/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-12

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SITE_NAME } from '@/lib/site'
import { HOME_ACTIVE_CATEGORIES, HOME_TOOLS, HOME_TOOLS_BY_CATEGORY } from '@/components/home/home-data'

export const metadata: Metadata = {
  title: `全部工具目录 - ${HOME_TOOLS.length} 个外贸实用工具 | ${SITE_NAME}`,
  description: `${SITE_NAME} 共 ${HOME_TOOLS.length} 个外贸工具，覆盖财务报价、物流装柜、外贸沟通、单证制作、国家资料等 8 大业务分类，全部免费且在浏览器本地运行。`,
  alternates: { canonical: '/tools' },
}

export default function ToolsIndexPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">全部工具目录</h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {HOME_TOOLS.length} 个工具按外贸业务流分为 {HOME_ACTIVE_CATEGORIES.length} 类：从客户报价、装柜出货，到收款催款、单证制作。全部工具免费、免注册，计算在浏览器本地完成。
        </p>
      </header>

      <div className="space-y-8">
        {HOME_ACTIVE_CATEGORIES.map((category) => (
          <section key={category} id={encodeURIComponent(category)} className="scroll-mt-24 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{category}</h2>
              <Badge variant="outline" className="border-slate-200 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                {HOME_TOOLS_BY_CATEGORY[category].length} 个
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {HOME_TOOLS_BY_CATEGORY[category].map((rawTool) => {
                const tool = HOME_TOOLS.find((item) => item.id === rawTool.id)
                if (!tool) return null
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group flex gap-3 rounded-lg border border-slate-200/80 bg-white/85 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/4 dark:hover:border-cyan-300/50"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${tool.bgColor} ${tool.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">{tool.title}</p>
                        {tool.badge && <Badge variant="outline" className={`shrink-0 border-0 px-2 py-0 text-[10px] ${tool.badgeClassName}`}>{tool.badge}</Badge>}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{tool.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/resources" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200 dark:hover:border-cyan-300/50">
          配套业务资源<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
