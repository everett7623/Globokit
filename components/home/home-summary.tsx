// 名称: 首页总结区域
// 描述: 展示工作台核心能力、本地隐私原则与外贸团队协作场景
// 路径: Globokit/components/home/home-summary.tsx
// 作者: everettlabs
// 更新时间: 2026-11-25

import Link from 'next/link'
import { ArrowRight, Calculator, Globe2, ShieldCheck, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const DESIGN_PILLARS = [
  {
    title: '报价与利润闭环',
    description: '从 FOB/CIF 换算、退税利润到阶梯单价与压价保利销量，减少表格公式出错。',
    icon: Calculator,
  },
  {
    title: '纯前端本地运行',
    description: '免注册、无后端存储，报价单、装箱单与客户明细全程留在你的浏览器内计算。',
    icon: ShieldCheck,
  },
  {
    title: '全球资料与跨区协作',
    description: '统一整合 171 个国家基础资料、世界时区与多国节假日，跟进客户不撞假期。',
    icon: Globe2,
  },
] as const

export function HomeSummary() {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-lg border border-slate-200/80 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">外贸工作台核心优势</h2>
          <Link
            href="/faq"
            className="text-xs font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300"
          >
            查看常见问题 →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {DESIGN_PILLARS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-md border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/4"
              >
                <Icon className="mb-2.5 h-4 w-4 text-emerald-700 dark:text-cyan-300" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-sm dark:border-white/10">
        <CardContent className="flex h-full flex-col justify-between p-6">
          <div>
            <Users className="mb-4 h-5 w-5 text-emerald-300" />
            <h2 className="text-lg font-semibold">面向外贸与跨境团队</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              业务、跟单、采购与运营可通过同一套免费工具入口完成报价核算、装柜规划、单证制作与目标市场判断。
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/tools/global-country-info"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-colors hover:text-white"
            >
              打开国家资料库
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              全部工具目录
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
