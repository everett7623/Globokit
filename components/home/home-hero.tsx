// 名称: 首页主视觉
// 描述: 展示首页标题、行动入口、统计信息与高频工具
// 路径: Globokit/components/home/home-hero.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowRight, Container, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { HERO_TOOLS, HOME_STATS } from './home-data'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-cyan-100 bg-cyan-50 text-slate-950 shadow-2xl shadow-cyan-900/10 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:shadow-slate-900/30">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-500 dark:opacity-0"
        style={{ backgroundImage: "url('/hero-trade-day.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 dark:opacity-100"
        style={{ backgroundImage: "url('/hero-trade-night.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/56 to-white/6 dark:from-slate-950/90 dark:via-slate-950/62 dark:to-slate-950/10" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-cyan-50/75 to-transparent dark:from-slate-950/70" />

      <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_430px] lg:p-8">
        <div className="flex min-h-[420px] flex-col justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm shadow-cyan-900/[0.04] backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              Global Trade Control Desk
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-6xl dark:text-white">
              外贸团队的高效工作台
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 md:text-lg dark:text-slate-300">
              把报价核算、装柜估算、全球国家资料、时区和节假日放在同一个专业界面里，减少来回切换。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/quote-calculator"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50"
              >
                开始报价
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/container-load-calculator"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-cyan-200 bg-white/70 px-4 text-sm font-semibold text-slate-800 shadow-sm shadow-cyan-900/[0.04] backdrop-blur transition-colors hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                测算装柜
                <Container className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {HOME_STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-lg border border-cyan-100 bg-white/70 p-4 shadow-sm shadow-cyan-900/[0.04] backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
                  <Icon className="mb-3 h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg border border-white/80 bg-white/72 p-4 shadow-2xl shadow-cyan-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:shadow-black/20">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">高频业务入口</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">报价、出货、客户区域信息</p>
            </div>
            <Badge className="border-0 bg-emerald-300 text-slate-950">Live</Badge>
          </div>

          <div className="space-y-3">
            {HERO_TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group block rounded-lg border border-slate-200/80 bg-white/75 p-4 shadow-sm shadow-slate-900/[0.03] transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/80 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-white/10 dark:text-cyan-200 dark:ring-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-100">{tool.shortTitle}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{tool.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-cyan-200" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
