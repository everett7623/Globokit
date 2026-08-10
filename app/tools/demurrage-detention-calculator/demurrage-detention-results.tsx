// 名称: 集装箱滞箱滞港费结果
// 描述: 展示免费期状态、阶梯费用拆分和业务口径
// 路径: Globokit/app/tools/demurrage-detention-calculator/demurrage-detention-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { AlertTriangle, CircleDollarSign, Clock, Container, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ChargeTypeResult, DemurrageDetentionResult } from '@/lib/tools/demurrage-detention-calculator'
import { formatMoney, formatRate } from './demurrage-detention-page-data'

export function DemurrageDetentionStats({ result }: { result: DemurrageDetentionResult }) {
  const highest = result.highestCostType === 'demurrage' ? result.demurrage : result.highestCostType === 'detention' ? result.detention : null
  const stats = [
    { label: '异常费用合计', value: formatMoney(result.totalFee, result.currency), note: `${result.containerCount} 柜`, icon: CircleDollarSign, tone: 'text-rose-700' },
    { label: '平均每柜', value: formatMoney(result.feePerContainer, result.currency), note: '滞港与滞箱合计', icon: Container, tone: 'text-sky-700' },
    { label: '总超期天数', value: `${result.totalChargeableDays} 天`, note: '两个计费环节合计', icon: Clock, tone: 'text-amber-700' },
    { label: '费用较高环节', value: highest ? highest.type === 'demurrage' ? '滞港费' : '滞箱费' : '暂无费用', note: highest ? formatMoney(highest.feeTotal, result.currency) : '均未超免费期', icon: AlertTriangle, tone: 'text-emerald-700' },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{stat.label}</CardTitle></CardHeader><CardContent><div className={cn('break-words text-xl font-bold tabular-nums', stat.tone)}>{stat.value}</div><p className="mt-1 text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function DemurrageDetentionResults({ result }: { result: DemurrageDetentionResult }) {
  return <div className="space-y-6"><Card><CardHeader><CardTitle>费用状态与阶梯拆分</CardTitle><CardDescription>超期天数按每柜每天费率计算，再乘以集装箱数量。</CardDescription></CardHeader><CardContent className="space-y-5"><ChargeSection result={result.demurrage} currency={result.currency} /><ChargeSection result={result.detention} currency={result.currency} /></CardContent></Card><Card className="bg-muted/30"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />计算口径</CardTitle></CardHeader><CardContent className="space-y-2 text-sm leading-6 text-muted-foreground"><p>滞港费按集装箱仍在码头或堆场内的占用天数估算；滞箱费按提柜后到还空柜前的占用天数估算。</p><p>本工具使用用户输入的日历天数，不自动判断周末、节假日、提柜日或还箱日是否计费。</p><p>船公司可能将免费期合并、按自然日或工作日计费，最终金额请以提单条款、设备交接单和正式账单为准。</p></CardContent></Card></div>
}

function ChargeSection({ result, currency }: { result: ChargeTypeResult; currency: DemurrageDetentionResult['currency'] }) {
  const maxTierFee = Math.max(...result.tiers.map((tier) => tier.feeTotal), 1)
  const hasOverage = result.chargeableDays > 0
  return <div className="rounded-md border p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="flex items-center gap-2 text-base font-semibold"><Clock className="h-4 w-4" />{result.label}</h2><p className="mt-1 text-xs text-muted-foreground">占用 {result.totalDays} 天，免费 {result.freeDays} 天</p></div><Badge variant={hasOverage ? 'destructive' : 'secondary'}>{hasOverage ? `超期 ${result.overageDays} 天` : `剩余免费 ${result.freeDaysRemaining} 天`}</Badge></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><Metric label="可计费天数" value={`${result.chargeableDays} 天`} /><Metric label="每柜费用" value={formatMoney(result.feePerContainer, currency)} /><Metric label="本批费用" value={formatMoney(result.feeTotal, currency)} /></div><div className="mt-5 space-y-3">{result.tiers.map((tier) => <div key={tier.label}><div className="flex items-center justify-between gap-3 text-sm"><span>{tier.label} · {tier.days} 天</span><span className="font-medium tabular-nums">{formatMoney(tier.feeTotal, currency)}</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-slate-500" style={{ width: `${tier.feeTotal ? Math.max(3, tier.feeTotal / maxTierFee * 100) : 0}%` }} /></div><p className="mt-1 text-right text-[11px] text-muted-foreground">{formatRate(tier.rate, currency)}</p></div>)}</div></div>
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words font-semibold tabular-nums">{value}</p></div>
}
