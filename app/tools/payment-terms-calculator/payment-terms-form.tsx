// 名称: 收款账期成本对比表单
// 描述: 展示订单参数、方案预设与可编辑成本字段
// 路径: Globokit/app/tools/payment-terms-calculator/payment-terms-form.tsx
// 作者: everettlabs
// 更新时间: 2026-08-10

import { Landmark, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PAYMENT_TERM_PRESETS, type PaymentTermPresetId } from '@/lib/tools/payment-terms-calculator'
import type { GlobalNumericField, PaymentTermsFormState, TermNumericField } from './payment-terms-page-data'

interface PaymentTermsFormProps {
  form: PaymentTermsFormState
  onGlobalChange: (field: GlobalNumericField, value: string) => void
  onTermChange: (termId: string, field: TermNumericField, value: string) => void
  onPresetChange: (termId: string, presetId: PaymentTermPresetId) => void
  onAddTerm: () => void
  onRemoveTerm: (termId: string) => void
  onReset: () => void
}

export function PaymentTermsForm({ form, onGlobalChange, onTermChange, onPresetChange, onAddTerm, onRemoveTerm, onReset }: PaymentTermsFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />订单与收款方案</CardTitle>
            <CardDescription>统一订单口径后，比较 2 至 3 种付款条件</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="orderAmount" label="订单金额" suffix="CNY" value={form.orderAmount} onChange={(value) => onGlobalChange('orderAmount', value)} autoFocus />
          <NumberField id="orderCost" label="订单总成本" suffix="CNY" value={form.orderCost} onChange={(value) => onGlobalChange('orderCost', value)} />
          <NumberField id="productionDays" label="生产周期" suffix="天" value={form.productionDays} onChange={(value) => onGlobalChange('productionDays', value)} integer />
          <NumberField id="annualFundingRatePercent" label="资金年化成本" suffix="%" value={form.annualFundingRatePercent} onChange={(value) => onGlobalChange('annualFundingRatePercent', value)} />
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold">对比方案</h2>
              <p className="mt-1 text-xs text-muted-foreground">预设参数可继续修改，用于匹配银行和客户的实际条件</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={onAddTerm} disabled={form.terms.length >= 3}>
              <Plus className="mr-2 h-4 w-4" />添加方案
            </Button>
          </div>
          {form.terms.map((term, index) => (
            <div key={term.id} className="rounded-md border bg-muted/20 p-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <Label htmlFor={`${term.id}-preset`} className="sr-only">方案 {index + 1}</Label>
                  <Select value={term.presetId} onValueChange={(value) => onPresetChange(term.id, value as PaymentTermPresetId)}>
                    <SelectTrigger id={`${term.id}-preset`} className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>{PAYMENT_TERM_PRESETS.map((preset) => <SelectItem key={preset.id} value={preset.id}>{preset.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  title="移除方案"
                  aria-label={`移除方案 ${index + 1}`}
                  disabled={form.terms.length <= 2}
                  onClick={() => onRemoveTerm(term.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <NumberField id={`${term.id}-advancePercent`} label="预付款" suffix="%" value={term.advancePercent} onChange={(value) => onTermChange(term.id, 'advancePercent', value)} />
                <NumberField id={`${term.id}-daysAfterShipment`} label="发货后账期" suffix="天" value={term.daysAfterShipment} onChange={(value) => onTermChange(term.id, 'daysAfterShipment', value)} integer />
                <NumberField id={`${term.id}-feePercent`} label="收款费率" suffix="%" value={term.feePercent} onChange={(value) => onTermChange(term.id, 'feePercent', value)} />
                <NumberField id={`${term.id}-fixedFee`} label="固定费用" suffix="CNY" value={term.fixedFee} onChange={(value) => onTermChange(term.id, 'fixedFee', value)} />
                <NumberField id={`${term.id}-riskReservePercent`} label="风险准备金" suffix="%" value={term.riskReservePercent} onChange={(value) => onTermChange(term.id, 'riskReservePercent', value)} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface NumberFieldProps {
  id: string
  label: string
  value: string
  suffix: string
  onChange: (value: string) => void
  integer?: boolean
  autoFocus?: boolean
}

function NumberField({ id, label, value, suffix, onChange, integer = false, autoFocus = false }: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <FormattedInput
          id={id}
          value={value}
          onChange={onChange}
          format={integer ? 'number' : 'decimal'}
          maxDecimals={integer ? 0 : 2}
          autoFocusFirst={autoFocus}
          className="h-11 pr-16 font-medium"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}
