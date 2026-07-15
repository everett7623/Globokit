// 名称: 资源页主视觉
// 描述: 展示资源页介绍、返回入口和使用边界
// 路径: Globokit/app/resources/resource-hero.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'

export function ResourceHero() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 dark:border-white/10 md:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.22),transparent_36%),linear-gradient(250deg,rgba(217,70,239,0.16),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-40" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            返回工具工作台
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" />
            Business Resources
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">外贸业务资源精选</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            把客户开发、代理网络、浏览器环境、主机建站、域名、账号支付、AI 服务和验证资源统一收纳，作为工具站之外的业务补充入口。
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
  )
}
