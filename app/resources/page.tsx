// 名称: 外贸业务资源页
// 描述: 展示可配合 Globokit 工具站使用的外贸业务资源推荐
// 路径: Globokit/app/resources/page.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CreditCard,
  Database,
  ExternalLink,
  Fingerprint,
  MailCheck,
  MessageSquare,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PARTNER_RESOURCES, PartnerResourceType } from '@/lib/partner-resources'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: '外贸业务资源精选 - 代理、账号、AI 与验证服务 | Globokit',
  description: '精选可配合 Globokit 工具站使用的外贸业务资源，覆盖客户开发、代理网络、浏览器环境、账号支付、AI 工具和验证服务。',
}

const resourceTypeOrder: PartnerResourceType[] = [
  '客户开发',
  '代理网络',
  '浏览器环境',
  '企业数据',
  '账号与支付',
  'AI 工具',
  '验证服务',
]

const resourceTypeMeta: Record<
  PartnerResourceType,
  {
    icon: ComponentType<{ className?: string }>
    tone: string
    bg: string
    note: string
    slug: string
  }
> = {
  '客户开发': {
    icon: MailCheck,
    tone: 'text-emerald-600 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-300/10',
    note: '客户搜索、邮件触达和线索管理。',
    slug: 'lead',
  },
  '代理网络': {
    icon: Network,
    tone: 'text-cyan-600 dark:text-cyan-300',
    bg: 'bg-cyan-50 dark:bg-cyan-300/10',
    note: '区域测试、公开页面检查和市场调研。',
    slug: 'proxy',
  },
  '浏览器环境': {
    icon: Fingerprint,
    tone: 'text-violet-600 dark:text-violet-300',
    bg: 'bg-violet-50 dark:bg-violet-300/10',
    note: '团队多环境管理和资料隔离。',
    slug: 'browser',
  },
  '企业数据': {
    icon: Database,
    tone: 'text-amber-600 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-300/10',
    note: '企业级公开数据和预算充足的数据调研。',
    slug: 'data',
  },
  '账号与支付': {
    icon: CreditCard,
    tone: 'text-sky-600 dark:text-sky-300',
    bg: 'bg-sky-50 dark:bg-sky-300/10',
    note: '美区应用、订阅准备和备用支付入口。',
    slug: 'account',
  },
  'AI 工具': {
    icon: Bot,
    tone: 'text-fuchsia-600 dark:text-fuchsia-300',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-300/10',
    note: '内容生成、图片素材和日常办公提效。',
    slug: 'ai',
  },
  '验证服务': {
    icon: MessageSquare,
    tone: 'text-orange-600 dark:text-orange-300',
    bg: 'bg-orange-50 dark:bg-orange-300/10',
    note: '合规业务测试和账号验证流程。',
    slug: 'verify',
  },
}

const groupedResources = resourceTypeOrder.map((type) => ({
  type,
  resources: PARTNER_RESOURCES.filter((resource) => resource.type === type),
}))

const visibleGroups = groupedResources.filter((group) => group.resources.length > 0)

export default function ResourcesPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-lg border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 dark:border-white/10 md:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.22),transparent_36%),linear-gradient(250deg,rgba(217,70,239,0.16),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-40" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              返回工具工作台
            </Link>

            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              Business Resources
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              外贸业务资源精选
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              把客户开发、代理网络、浏览器环境、账号支付、AI 服务和验证资源统一收纳，作为工具站之外的业务补充入口。
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
            <ShieldCheck className="mb-4 h-5 w-5 text-amber-300" />
            <p className="text-sm font-semibold">使用边界</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              资源仅用于合法公开信息调研、业务测试、订阅支付与团队管理，避免用于绕过平台规则、批量滥用或侵权采集。
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: '资源数量', value: PARTNER_RESOURCES.length },
          { label: '业务分类', value: visibleGroups.length },
          { label: '账号支付', value: PARTNER_RESOURCES.filter((resource) => resource.type === '账号与支付').length },
          { label: '首页精选', value: 6 },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60"
          >
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
              {visibleGroups.map((group) => {
                const meta = resourceTypeMeta[group.type]
                const Icon = meta.icon

                return (
                  <a
                    key={group.type}
                    href={`#${meta.slug}`}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200"
                  >
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

        <div className="space-y-8">
          {visibleGroups.map((group) => {
            const meta = resourceTypeMeta[group.type]
            const Icon = meta.icon

            return (
              <section key={group.type} id={meta.slug} className="scroll-mt-28 space-y-4">
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

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.href}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="group flex min-h-[220px] flex-col rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-900/[0.06] dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-300/50"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-semibold text-slate-950 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200">
                            {resource.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{resource.type}</p>
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

                      <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {resource.description}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {resource.bestFor.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                          >
                            {item}
                          </span>
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
        <Link
          href="/#tools"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50"
        >
          打开工具目录
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
