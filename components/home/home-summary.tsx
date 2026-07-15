// 名称: 首页总结区域
// 描述: 展示工作台设计方向与团队使用场景
// 路径: Globokit/components/home/home-summary.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function HomeSummary() {
  return (
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
  )
}
