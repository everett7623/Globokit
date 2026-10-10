// 名称: 关于 Globokit
// 描述: 介绍站点定位、工具规模、本地计算与开源信息
// 路径: Globokit/app/about/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, ShieldCheck, Zap } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'
import { TOOL_REGISTRY } from '@/lib/tools/registry'
import { HOME_ACTIVE_CATEGORIES, HOME_TOOLS_BY_CATEGORY } from '@/components/home/home-data'

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export const metadata: Metadata = {
  title: `关于 ${SITE_NAME} - 外贸从业者的在线工具箱`,
  description: `${SITE_NAME} 是面向外贸从业者的免费在线工具平台，全部计算在浏览器本地完成，无需注册、不上传数据。了解站点定位、工具规模与开源信息。`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
          <BadgeCheck className="h-3.5 w-3.5" />
          关于本站
        </div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">为全球贸易从业者打造的一站式工具箱</h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
          {SITE_NAME} 收录 {TOOL_REGISTRY.length} 个外贸实用工具，覆盖报价核算、物流装柜、单证制作、收款催款与市场跟进的完整业务链路。所有工具免费、免注册、即开即用。
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
          <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-cyan-300" />
          <h2 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">数据留在你的浏览器</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            全站采用纯前端架构，报价、装柜、佣金等所有计算都在浏览器本地完成，没有后端服务器、没有账号体系，输入的数据不会被上传或存储。
          </p>
        </div>
        <div className="rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
          <Zap className="h-6 w-6 text-amber-600 dark:text-amber-300" />
          <h2 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">围绕真实业务流设计</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            每个工具都来自一线外贸场景：FOB/CIF 换算、箱规装柜、催款邮件、信用证审单、佣金提成——按业务流组织，而不是简单的计算器堆砌。
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-950 dark:text-white">工具分类</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {HOME_ACTIVE_CATEGORIES.map((category) => (
            <Link key={category} href="/#tools" className="flex items-center justify-between rounded-md border border-slate-200/80 bg-white/80 px-3 py-2.5 text-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50/60 dark:border-white/10 dark:bg-white/4 dark:hover:border-cyan-300/40">
              <span className="font-medium text-slate-700 dark:text-slate-200">{category}</span>
              <span className="text-xs text-slate-400">{HOME_TOOLS_BY_CATEGORY[category].length} 个</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/70 bg-white/80 p-5 shadow-lg shadow-slate-900/4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">开源与反馈</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          本项目以 GPL-3.0 协议开源，基于 Next.js 构建，托管于 Vercel。发现计算错误、缺少想要的工具，或想参与贡献，欢迎在 GitHub 提 Issue。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://github.com/everett7623/Globokit" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950">
            <GithubMark className="h-4 w-4" />GitHub 仓库
          </a>
          <Link href="/#tools" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200 dark:hover:border-cyan-300/50">
            打开工具目录<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
