// 名称: 首页精选资源
// 描述: 展示精选外贸资源卡片与使用边界
// 路径: Globokit/components/home/home-resources.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FEATURED_PARTNER_RESOURCES, PARTNER_TYPE_META } from './home-data'

export function HomeResources() {
  return (
    <section id="resources" className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            外贸资源精选
          </div>
          <h2 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">配合工具站使用的业务资源</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            首页只放高频入口，完整代理、账号、主机建站、域名、AI 和验证资源统一收纳到资源页。
          </p>
        </div>
        <Link
          href="/resources"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50"
        >
          查看全部资源
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {FEATURED_PARTNER_RESOURCES.map((resource) => {
          const meta = PARTNER_TYPE_META[resource.type]
          const Icon = meta.icon

          return (
            <a
              key={resource.id}
              href={resource.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-900/[0.06] dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-300/50"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-50 ring-1 ring-slate-200/80 dark:bg-white/[0.04] dark:ring-white/10">
                    <Icon className={cn('h-5 w-5', meta.tone)} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-slate-950 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200">
                      {resource.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{resource.type}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {resource.badge && (
                    <Badge className="border-0 bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      {resource.badge}
                    </Badge>
                  )}
                  <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-200" />
                </div>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {resource.description}
              </p>
            </a>
          )
        })}
      </div>

      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-100">
        资源仅用于合法公开信息调研、业务测试、订阅支付与团队管理，避免用于绕过平台规则、批量滥用或侵权采集。
      </p>
    </section>
  )
}
