// 名称: 外贸汇率敏感性分析表单
// 描述: 展示外币订单、CNY 成本、基准汇率与升贬值情景参数
// 路径: Globokit/app/tools/fx-sensitivity-calculator/fx-sensitivity-form.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { RefreshCw, TrendingUp } from 'lucide-react'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FX_CURRENCY_PRESETS, type FxCurrency } from '@/lib/tools/fx-sensitivity-calculator'
import type { FxSensitivityFormState, NumericField } from './fx-sensitivity-page-data'

interface FxSensitivityFormProps {
  form: FxSensitivityFormState
  summaryText: string
  onCurrencyChange: (currency: FxCurrency) => void
  onFieldChange: (field: NumericField, value: string) => void
  onReset: () => void
}

export function FxSensitivityForm({ form, summaryText, onCurrencyChange, onFieldChange, onReset }: FxSensitivityFormProps) {
  const rateUnit = FX_CURRENCY_PRESETS.find((item) => item.value === form.currency)?.unit ?? 1
  const rateSuffix = `CNY/${rateUnit === 1 ? form.currency : `${rateUnit} ${form.currency}`}`
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />汇率与成本参数</CardTitle>
            <CardDescription>统一用 CNY 成本口径，输入报价币种的基准结算汇率</CardDescription>
          </div>
          <div className="flex gap-2">
            <EnhancedCopyButton text={summaryText} variant="outline" size="sm" disabled={!summaryText}>复制摘要</EnhancedCopyButton>
            <Button type="button" variant="outline" size="sm" onClick={onReset}><RefreshCw className="mr-2 h-4 w-4" />重置</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="fx-currency">报价币种</Label><Select value={form.currency} onValueChange={(value) => onCurrencyChange(value as FxCurrency)}><SelectTrigger id="fx-currency" className="h-11"><SelectValue /></SelectTrigger><SelectContent>{FX_CURRENCY_PRESETS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
          <NumberField id="fx-foreign-amount" label="外币订单金额" suffix={form.currency} value={form.foreignAmount} onChange={(value) => onFieldChange('foreignAmount', value)} autoFocus />
          <NumberField id="fx-cost-cny" label="订单成本" suffix="CNY" value={form.costCny} onChange={(value) => onFieldChange('costCny', value)} />
          <NumberField id="fx-other-cost-cny" label="其他 CNY 费用" suffix="CNY" value={form.otherCostCny} onChange={(value) => onFieldChange('otherCostCny', value)} />
          <NumberField id="fx-fee-percent" label="收款手续费率" suffix="%" value={form.settlementFeePercent} onChange={(value) => onFieldChange('settlementFeePercent', value)} />
          <NumberField id="fx-base-rate" label="基准汇率" suffix={rateSuffix} value={form.baseRate} onChange={(value) => onFieldChange('baseRate', value)} />
        </div>
        <div className="rounded-md border bg-muted/20 p-4">
          <div className="mb-4"><h2 className="text-sm font-semibold">波动情景</h2><p className="mt-1 text-xs text-muted-foreground">升值会降低每单位外币可兑换的 CNY，贬值会提高可兑换的 CNY。</p></div>
          <div className="grid gap-4 sm:grid-cols-2"><NumberField id="fx-appreciation" label="人民币升值幅度" suffix="%" value={form.rmbAppreciationPercent} onChange={(value) => onFieldChange('rmbAppreciationPercent', value)} /><NumberField id="fx-depreciation" label="人民币贬值幅度" suffix="%" value={form.rmbDepreciationPercent} onChange={(value) => onFieldChange('rmbDepreciationPercent', value)} /></div>
        </div>
      </CardContent>
    </Card>
  )
}

function NumberField({ id, label, suffix, value, onChange, autoFocus = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; autoFocus?: boolean }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><FormattedInput id={id} value={value} onChange={onChange} format="decimal" maxDecimals={4} autoFocusFirst={autoFocus} className="h-11 pr-24 font-medium" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span></div></div>
}
