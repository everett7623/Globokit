// 名称: 外贸工具集首页
// 描述: 面向外贸团队的工作台首页，展示高频入口、业务流程和完整工具目录
// 路径: Globokit/app/page.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

import Link from 'next/link'
import type { ComponentType } from 'react'
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Bot,
  Calendar,
  Calculator,
  CircleDollarSign,
  Clock,
  Code,
  Code2,
  Container,
  CreditCard,
  Database,
  ExternalLink,
  Fingerprint,
  FileSearch,
  Globe,
  Hash,
  Languages,
  MailCheck,
  MessageSquare,
  Network,
  ReceiptText,
  Server,
  ShieldCheck,
  Ship,
  Sparkles,
  TrendingUp,
  Type,
  Users,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TOOL_REGISTRY, ToolCategory, ToolMeta, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'
import { TOOL_UI_CONFIG, getToolBadgeClassName } from '@/lib/tools/registry-ui'
import { PARTNER_RESOURCES, PartnerResourceType } from '@/lib/partner-resources'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Calculator,
  Type,
  AlertCircle,
  Hash,
  Languages,
  Calendar,
  Clock,
  CircleDollarSign,
  Globe,
  Server,
  FileSearch,
  Code2,
  ReceiptText,
  Container,
}

const tools = TOOL_REGISTRY.map((tool) => {
  const uiConfig = TOOL_UI_CONFIG[tool.id] || {
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
  }

  return {
    ...tool,
    icon: ICON_MAP[tool.iconName] || Code,
    badgeClassName: getToolBadgeClassName(tool.badge),
    ...uiConfig,
  }
})

const toolsByCategory = getToolsByCategory()
const activeCategories = getActiveCategories()

const heroToolIds = [
  'quote-calculator',
  'container-load-calculator',
  'global-country-info',
  'holiday-query',
]

const heroTools = heroToolIds
  .map((id) => tools.find((tool) => tool.id === id))
  .filter((tool): tool is (typeof tools)[number] => Boolean(tool))

const stats = [
  { label: '工具总数', value: `${tools.length}`, icon: Zap },
  { label: '业务场景', value: `${activeCategories.length}`, icon: ShieldCheck },
  { label: '全球资料', value: '200+', icon: Globe },
  { label: '持续优化', value: 'Live', icon: TrendingUp },
]

const workflowGroups: Array<{
  title: string
  caption: string
  category: ToolCategory
  icon: ComponentType<{ className?: string }>
  accent: string
}> = [
  {
    title: '报价与利润',
    caption: '报价、金额、货币符号',
    category: '财务报价',
    icon: CircleDollarSign,
    accent: 'from-emerald-500 to-cyan-500',
  },
  {
    title: '出货与条款',
    caption: '装柜、贸易术语、交付边界',
    category: '物流与装柜',
    icon: Ship,
    accent: 'from-lime-500 to-emerald-500',
  },
  {
    title: '全球市场资料',
    caption: '国家、时区、节假日',
    category: '国家与货币',
    icon: Globe,
    accent: 'from-cyan-500 to-sky-500',
  },
  {
    title: '文本与单据',
    caption: '邮件、名称、数据格式',
    category: '文本处理',
    icon: Type,
    accent: 'from-amber-500 to-orange-500',
  },
]

const partnerTypeMeta: Record<PartnerResourceType, { icon: ComponentType<{ className?: string }>; tone: string }> = {
  '客户开发': { icon: MailCheck, tone: 'text-emerald-600 dark:text-emerald-300' },
  '代理网络': { icon: Network, tone: 'text-cyan-600 dark:text-cyan-300' },
  '浏览器环境': { icon: Fingerprint, tone: 'text-violet-600 dark:text-violet-300' },
  '企业数据': { icon: Database, tone: 'text-amber-600 dark:text-amber-300' },
  '账号与支付': { icon: CreditCard, tone: 'text-sky-600 dark:text-sky-300' },
  'AI 工具': { icon: Bot, tone: 'text-fuchsia-600 dark:text-fuchsia-300' },
  '验证服务': { icon: MessageSquare, tone: 'text-orange-600 dark:text-orange-300' },
}

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-lg border border-slate-900 bg-slate-950 text-white shadow-2xl shadow-slate-900/20 dark:border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.24),transparent_34%),linear-gradient(240deg,rgba(245,158,11,0.18),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-45" />

        <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_430px] lg:p-8">
          <div className="flex min-h-[420px] flex-col justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                <Sparkles className="h-3.5 w-3.5" />
                Global Trade Control Desk
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white md:text-6xl">
                外贸团队的高效工作台
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                把报价核算、装柜估算、全球国家资料、时区和节假日放在同一个专业界面里，减少来回切换。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tools/quote-calculator"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-50"
                >
                  开始报价
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/tools/container-load-calculator"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  测算装柜
                  <Container className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                    <Icon className="mb-3 h-4 w-4 text-cyan-200" />
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">高频业务入口</p>
                <p className="mt-1 text-xs text-slate-400">报价、出货、客户区域信息</p>
              </div>
              <Badge className="border-0 bg-emerald-300 text-slate-950">Live</Badge>
            </div>

            <div className="space-y-3">
              {heroTools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group block rounded-lg border border-white/10 bg-slate-950/40 p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 text-cyan-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white group-hover:text-cyan-100">{tool.shortTitle}</p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{tool.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {workflowGroups.map((workflow) => {
          const Icon = workflow.icon
          const categoryTools = toolsByCategory[workflow.category] ?? []
          const firstTool = categoryTools[0]

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
                <span>{categoryTools.length} 款工具</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          )
        })}
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              外贸资源精选
            </div>
            <h2 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">可配合工具站使用的业务资源</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              覆盖外贸获客、市场调研、跨区测试、账号支付、AI 服务和合规验证等出海场景。
            </p>
          </div>
          <p className="max-w-md rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-100">
            资源仅用于合法公开信息调研、业务测试、订阅支付与团队管理，避免用于绕过平台规则、批量滥用或侵权采集。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PARTNER_RESOURCES.map((resource) => {
            const meta = partnerTypeMeta[resource.type]
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

                <div className="mt-4 flex flex-wrap gap-2">
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
            )
          })}
        </div>
      </section>

      <section id="tools" className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
              <BadgeCheck className="h-3.5 w-3.5" />
              工具目录
            </div>
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">按业务流选择工具</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeCategories.map((category) => (
              <span key={category} className="rounded-md border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm shadow-slate-900/[0.02] dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
                {category} · {toolsByCategory[category].length}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeCategories.map((category) => (
            <CategorySection key={category} category={category} tools={toolsByCategory[category]} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-lg border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">外贸工作台设计方向</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {['报价更快', '资料更全', '跨区协作'].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item}</p>
                <div className="mt-3 h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-lg shadow-slate-900/10 dark:border-white/10">
          <CardContent className="p-6">
            <Users className="mb-5 h-5 w-5 text-amber-300" />
            <p className="text-lg font-semibold">面向外贸团队</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              采购、业务、跟单和运营可以从同一套工具入口完成报价、装柜、客户区域判断和资料清洗。
            </p>
            <Link
              href="/tools/global-country-info"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white"
            >
              打开国家资料库
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function CategorySection({ category, tools: categoryTools }: { category: ToolCategory; tools: ToolMeta[] }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{category}</h3>
        <span className="text-xs text-slate-400">{categoryTools.length}</span>
      </div>

      <div className="space-y-2">
        {categoryTools.map((rawTool) => {
          const tool = tools.find((item) => item.id === rawTool.id)
          if (!tool) return null

          const Icon = tool.icon
          const badgeClassName = getToolBadgeClassName(tool.badge)

          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group flex gap-3 rounded-md border border-slate-200/80 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-md hover:shadow-emerald-900/[0.05] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10"
            >
              <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-md', tool.bgColor, tool.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
                    {tool.shortTitle}
                  </p>
                  {tool.badge && (
                    <Badge variant="outline" className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', badgeClassName)}>
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {tool.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
