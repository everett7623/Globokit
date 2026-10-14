// 名称: 信用证贴现表单
// 描述: 采集信用证面值、远期天数、贴现率与费用参数
// 路径: Globokit/app/tools/lc-discount-calculator/lc-discount-form.tsx
// 作者: everettlabs
// 更新时间: 2026-10-12

import { Landmark, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface LcDiscountFormState {
  faceAmount: string
  currency: string
  tenorDays: string
  discountRatePercent: string
  acceptanceFeePercent: string
  cableFee: string
  sightFeePercent: string
}

export interface LcDiscountFormProps {
  form: LcDiscountFormState
  onChange: (patch: Partial<LcDiscountFormState>) => void
  onReset: () => void
}

export function LcDiscountForm({ form, onChange, onReset }: LcDiscountFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />贴现参数</CardTitle>
            <CardDescription>按银行实际报价填写，利息按 360 天国际惯例计算</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="faceAmount">信用证金额</Label>
            <div className="relative">
              <FormattedInput id="faceAmount" value={form.faceAmount} onChange={(value) => onChange({ faceAmount: value })} format="decimal" maxDecimals={2} autoFocusFirst className="h-11 pr-20 font-medium" />
              <input
                value={form.currency}
                onChange={(event) => onChange({ currency: event.target.value.toUpperCase() })}
                maxLength={6}
                aria-label="币种"
                className="absolute inset-y-1.5 right-1.5 w-16 rounded border border-slate-200 bg-slate-50 px-2 text-center text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
              />
            </div>
          </div>
          <NumberField id="tenorDays" label="远期天数（承兑后 N 天）" suffix="天" value={form.tenorDays} onChange={(value) => onChange({ tenorDays: value })} integer />
          <NumberField id="discountRatePercent" label="贴现率（年化）" suffix="%" value={form.discountRatePercent} onChange={(value) => onChange({ discountRatePercent: value })} />
          <NumberField id="acceptanceFeePercent" label="承兑手续费" suffix="%" value={form.acceptanceFeePercent} onChange={(value) => onChange({ acceptanceFeePercent: value })} />
          <NumberField id="cableFee" label="邮电/单据处理费" suffix={form.currency || 'USD'} value={form.cableFee} onChange={(value) => onChange({ cableFee: value })} />
          <NumberField id="sightFeePercent" label="即期综合费率（对比用，0 不对比）" suffix="%" value={form.sightFeePercent} onChange={(value) => onChange({ sightFeePercent: value })} />
        </div>
        <p className="text-xs text-muted-foreground">常见口径：即期信用证综合费率约 0.5%–1%；远期贴现率随市场利率与承兑行资质浮动，以外资行或议付行实际报价为准。</p>
      </CardContent>
    </Card>
  )
}

function NumberField({ id, label, suffix, value, onChange, integer = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; integer?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <FormattedInput id={id} value={value} onChange={onChange} format={integer ? 'number' : 'decimal'} maxDecimals={integer ? 0 : 3} className="h-11 pr-16 font-medium" />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}
