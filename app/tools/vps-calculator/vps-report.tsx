// 名称: VPS 剩余价值报告
// 描述: 展示计算指标、明细与导出操作
// 路径: Globokit/app/tools/vps-calculator/vps-report.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { forwardRef } from 'react'
import { Calculator, Calendar, Check, Clock, Copy, Download, Gauge, Info, Percent, ReceiptText, RefreshCw, TrendingDown, TrendingUp, Wallet, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate, RENEWAL_PERIODS, type CalculationResult, type PriceMode } from '@/lib/tools/vps-calculator'

interface VpsReportProps {
  result: CalculationResult | null
  tradeDate: string
  purchasePrice: string
  currencySymbol?: string
  renewalPeriod: string
  priceMode: PriceMode
  modeInput: string
  copySuccess: boolean
  generatingImg: boolean
  onCopyMarkdown: () => void
  onExportImage: () => void
}

export const VpsReport = forwardRef<HTMLDivElement, VpsReportProps>(function VpsReport(props, ref) {
  const result = props.result
  if (!result) return <Card ref={ref} className="flex min-h-[620px] flex-col overflow-hidden border-gray-200 bg-white shadow-sm"><div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-50 text-slate-400"><Calculator className="h-9 w-9" /></div><p className="text-lg font-semibold text-gray-900">等待输入参数</p><p className="mt-2 text-sm text-muted-foreground">请在左侧填写信息以生成分析报告</p></div></Card>

  const usedPercent = (1 - result.remainingRatio) * 100
  const renewal = RENEWAL_PERIODS.find((item) => item.value === Number.parseInt(props.renewalPeriod))
  return <Card ref={ref} className="flex min-h-[620px] flex-col overflow-hidden border-gray-200 bg-white shadow-sm">
    <CardHeader className="border-b border-gray-100"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2 text-xl"><ReceiptText className="h-5 w-5 text-violet-600" />剩余价值分析报告</CardTitle><CardDescription>基于 {props.tradeDate} 汇率结算</CardDescription></div><div className="flex gap-2" data-html2canvas-ignore><Button variant="outline" size="sm" onClick={props.onCopyMarkdown}>{props.copySuccess ? <Check className="mr-2 h-4 w-4 text-emerald-600" /> : <Copy className="mr-2 h-4 w-4" />}{props.copySuccess ? '已复制' : '复制MD'}</Button><Button size="sm" onClick={props.onExportImage} disabled={props.generatingImg}>{props.generatingImg ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}下载图片</Button></div></div></CardHeader>
    <CardContent className="flex flex-1 flex-col gap-6 p-6">
      <div className="grid gap-4 md:grid-cols-3"><MetricCard icon={Gauge} label="剩余价值" value={`¥${formatCurrency(result.remainingValue)}`} caption={`剩余 ${(result.remainingRatio * 100).toFixed(1)}%`} tone="blue" /><MetricCard icon={Wallet} label="期望售价" value={`¥${formatCurrency(result.expectedPrice)}`} caption={props.priceMode === 'discount' ? `${(Number.parseFloat(props.modeInput || '1') * 10).toFixed(1)}折` : '汇率转换后'} tone="violet" /><MetricCard icon={result.premium >= 0 ? TrendingUp : TrendingDown} label={result.premium >= 0 ? '预期溢价' : '预期折价'} value={`${result.premium >= 0 ? '+' : '-'}¥${formatCurrency(Math.abs(result.premium))}`} caption={`${result.premium >= 0 ? '+' : '-'}${Math.abs(result.premiumPercent).toFixed(2)}%`} tone={result.premium >= 0 ? 'emerald' : 'rose'} /></div>
      <div className="rounded-lg border border-gray-200 bg-slate-50/70 p-5">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-900"><Info className="h-4 w-4 text-violet-600" />详细数据清单</h3>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"><DetailItem icon={Wallet} label="原购价格" value={`${props.currencySymbol}${props.purchasePrice}`} subValue={`约 ¥${formatCurrency(result.purchasePriceCNY)}`} /><DetailItem icon={Calendar} label="续费周期" value={renewal?.label || '-'} /><DetailItem icon={Clock} label="到期日期" value={formatDate(new Date(result.expireDate))} valueClassName="text-orange-600" /><DetailItem icon={Calendar} label="总服务期限" value={`${result.totalDays} 天`} /><DetailItem icon={Clock} label="已用天数" value={`${result.usedDays} 天`} /><DetailItem icon={Clock} label="剩余天数" value={`${result.remainingDays} 天`} valueClassName="text-blue-600" /><DetailItem icon={Percent} label="使用进度" value={`${usedPercent.toFixed(1)}%`} /><DetailItem icon={Wallet} label="日均成本" value={`¥ ${result.dailyPrice.toFixed(2)}`} /></dl>
        <div className="mt-7"><div className="mb-2 flex justify-between text-xs font-medium text-gray-500"><span>VPS 生命周期进度</span><span>{usedPercent.toFixed(1)}%</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700" style={{ width: `${usedPercent}%` }} /></div></div>
      </div>
      <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span className="font-medium text-gray-500">Globokit.com</span><span>Generated by VPS Calculator</span></div>
    </CardContent>
  </Card>
})

function MetricCard({ icon: Icon, label, value, caption, tone }: { icon: LucideIcon; label: string; value: string; caption: string; tone: 'blue' | 'violet' | 'emerald' | 'rose' }) {
  const toneClassName = { blue: 'border-blue-100 bg-blue-50/80 text-blue-700', violet: 'border-violet-100 bg-violet-50/80 text-violet-700', emerald: 'border-emerald-100 bg-emerald-50/80 text-emerald-700', rose: 'border-rose-100 bg-rose-50/80 text-rose-700' }[tone]
  return <div className={cn('rounded-lg border p-5', toneClassName)}><div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Icon className="h-4 w-4" />{label}</div><div className="font-mono text-2xl font-bold tracking-tight text-gray-950">{value}</div><div className="mt-3 inline-flex rounded-md bg-white/75 px-2 py-1 text-xs font-medium">{caption}</div></div>
}

function DetailItem({ icon: Icon, label, value, subValue, valueClassName }: { icon: LucideIcon; label: string; value: string; subValue?: string; valueClassName?: string }) {
  return <div className="space-y-1"><dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</dt><dd className={cn('font-mono text-[15px] font-semibold text-gray-900', valueClassName)}>{value}</dd>{subValue && <dd className="font-mono text-[11px] text-muted-foreground">{subValue}</dd>}</div>
}
