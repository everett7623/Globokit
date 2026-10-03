// 名称: 货物保险费计算结果
// 描述: 展示 CIF 换算、投保金额、保费拆分与条款速查
// 路径: Globokit/app/tools/cargo-insurance-calculator/cargo-insurance-result.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { AlertTriangle, Info, Umbrella } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import type { CargoInsuranceResult } from '@/lib/tools/cargo-insurance-calculator'
import { ICC_CLAUSE_ROWS, INSURANCE_TIPS } from './cargo-insurance-data'

export interface CargoInsuranceResultProps {
  result: CargoInsuranceResult
  summaryText: string
}

export function CargoInsuranceResult({ result, summaryText }: CargoInsuranceResultProps) {
  const currency = result.currency
  const stats = [
    { label: '总保费', value: formatMoney(result.totalPremium, currency), note: `占 CIF ${result.effectivePremiumRateOnCif}%` },
    { label: '投保金额', value: formatMoney(result.insuredAmount, currency), note: `CIF 的 ${result.insuredPercentOfCif}%` },
    { label: '折算 CIF 价值', value: formatMoney(result.cifValue, currency), note: result.priceBasis === 'CIF' ? '直接以货值投保' : `由 ${result.priceBasis} 换算` },
    { label: '基础险保费', value: formatMoney(result.basePremium, currency), note: result.warRiskPremium > 0 ? `战争险另计 ${formatMoney(result.warRiskPremium, currency)}` : '未附加战争险' },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2"><Umbrella className="h-5 w-5" />保费测算</CardTitle>
              <CardDescription>{result.basisNote}</CardDescription>
            </div>
            <EnhancedCopyButton text={summaryText} variant="outline" size="sm">复制</EnhancedCopyButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-md border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 break-words text-xl font-bold tabular-nums">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t pt-4">
            <Row label="投保金额" value={formatMoney(result.insuredAmount, currency)} />
            <Row label="基础险保费" value={formatMoney(result.basePremium, currency)} />
            <Row label="战争险附加保费" value={formatMoney(result.warRiskPremium, currency)} />
            <div className="flex items-center justify-between gap-4 border-t pt-2 text-sm font-semibold">
              <span>合计保费</span>
              <span className="tabular-nums text-amber-700 dark:text-amber-300">{formatMoney(result.totalPremium, currency)}</span>
            </div>
          </div>
          {result.warnings.length > 0 && (
            <div className="space-y-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-300/20 dark:bg-amber-300/10">
              {result.warnings.map((warning) => (
                <p key={warning} className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />{warning}</p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />ICC 条款速查</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">条款</th>
                  <th className="py-2 pr-3 font-medium">承保范围</th>
                  <th className="py-2 font-medium">适用场景</th>
                </tr>
              </thead>
              <tbody>
                {ICC_CLAUSE_ROWS.map((row) => (
                  <tr key={row.name} className="border-b last:border-0">
                    <td className="py-2 pr-3 font-medium">{row.name}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{row.coverage}</td>
                    <td className="py-2 text-muted-foreground">{row.typicalUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            {INSURANCE_TIPS.map((tip) => <li key={tip} className="flex items-start gap-2"><Info className="mt-1 h-3.5 w-3.5 shrink-0" />{tip}</li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium tabular-nums">{value}</span></div>
}

function formatMoney(value: number, currency: string): string {
  const formatted = value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${formatted} ${currency}`
}
