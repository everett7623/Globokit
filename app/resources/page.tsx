// 名称: 外贸业务资源页
// 描述: 展示可配合 Globokit 工具站使用的外贸业务资源推荐
// 路径: Globokit/app/resources/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { ResourceHero } from './resource-hero'
import { RESOURCE_TYPE_META, VISIBLE_RESOURCE_GROUPS } from './resource-page-data'
import { Badge } from '@/components/ui/badge'
import { PARTNER_RESOURCES } from '@/lib/partner-resources'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: '外贸业务资源精选 - 代理、主机、域名、账号与 AI 服务 | Globokit',
  description: '精选可配合 Globokit 工具站使用的外贸业务资源，覆盖客户开发、代理网络、浏览器环境、主机建站、域名服务、账号支付、AI 工具和验证服务。',
}

export default function ResourcesPage() {
  const stats = [
    { label: '资源数量', value: PARTNER_RESOURCES.length },
    { label: '业务分类', value: VISIBLE_RESOURCE_GROUPS.length },
    { label: '账号支付', value: PARTNER_RESOURCES.filter((resource) => resource.type === '账号与支付').length },
    {
      label: '主机域名',
      value: PARTNER_RESOURCES.filter((resource) => resource.type === '主机与建站' || resource.type === '域名服务').length,
    },
  ]

  return (
    <div className="space-y-10">
      <ResourceHero />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
            <p className="text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-white/70 bg-white/85 p-4 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
            <p className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">资源分类</p>
            <div className="space-y-1">
              {VISIBLE_RESOURCE_GROUPS.map((group) => {
                const meta = RESOURCE_TYPE_META[group.type]
                const Icon = meta.icon

                return (
                  <a key={group.type} href={`#${meta.slug}`} className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200">
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className={cn('h-4 w-4 shrink-0', meta.tone)} />
                      <span className="truncate">{group.type}</span>
                    </span>
                    <span className="text-xs text-slate-400">{group.resources.length}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="grid gap-5 xl:grid-cols-2">
          {VISIBLE_RESOURCE_GROUPS.map((group) => {
            const meta = RESOURCE_TYPE_META[group.type]
            const Icon = meta.icon
            const isWideGroup = group.type === '主机与建站' || group.type === '域名服务'

            return (
              <section key={group.type} id={meta.slug} className={cn('scroll-mt-28 space-y-3', isWideGroup && 'xl:col-span-2')}>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-md ring-1 ring-slate-200/80 dark:ring-white/10', meta.bg)}>
                      <Icon className={cn('h-5 w-5', meta.tone)} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">{group.type}</h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{meta.note}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit border-slate-200 bg-white/80 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                    {group.resources.length} 个入口
                  </Badge>
                </div>

                <div className={cn('grid gap-3', isWideGroup && 'md:grid-cols-2 xl:grid-cols-3')}>
                  {group.resources.map((resource) => (
                    <a key={resource.id} href={resource.href} target="_blank" rel="sponsored noopener noreferrer" className="group flex min-h-[160px] flex-col rounded-lg border border-slate-200/80 bg-white/85 p-4 shadow-sm shadow-slate-900/[0.03] transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md hover:shadow-cyan-900/[0.05] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-cyan-300/50">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-semibold text-slate-950 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200">{resource.name}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{resource.type}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {resource.badge && <Badge className="border-0 bg-slate-950 text-white dark:bg-white dark:text-slate-950">{resource.badge}</Badge>}
                          <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-200" />
                        </div>
                      </div>
                      <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{resource.description}</p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {resource.bestFor.map((item) => (
                          <span key={item} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">{item}</span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">回到工具主线</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">报价、装柜、国家资料和节假日仍然是站点的核心入口。</p>
        </div>
        <Link href="/#tools" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50">
          打开工具目录
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
