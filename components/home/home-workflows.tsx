// 名称: 首页业务流程
// 描述: 展示四类高频业务流程入口及对应工具数量
// 路径: Globokit/components/home/home-workflows.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOME_TOOLS, WORKFLOW_GROUPS } from './home-data'

export function HomeWorkflows() {
  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {WORKFLOW_GROUPS.map((workflow) => {
        const Icon = workflow.icon
        const workflowTools = workflow.toolIds.map((id) => HOME_TOOLS.find((tool) => tool.id === id)).filter(Boolean)
        const firstTool = workflowTools[0]

        return (
          <Link
            key={workflow.title}
            href={firstTool?.href ?? '/#tools'}
            className="group rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/[0.07] dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-300/50"
          >
            <div className={cn('mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br text-white shadow-lg', workflow.accent)}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">{workflow.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{workflow.caption}</p>
            <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>{workflowTools.length} 款工具</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        )
      })}
    </section>
  )
}
