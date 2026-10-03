// 名称: 货物保险费计算表单
// 描述: 采集价格条款、货值、运费、投保加成与费率参数
// 路径: Globokit/app/tools/cargo-insurance-calculator/cargo-insurance-form.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { RefreshCw, Umbrella } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { INSURANCE_PRESETS, type InsurancePresetId, type InsurancePriceBasis } from '@/lib/tools/cargo-insurance-calculator'

export interface InsuranceFormState {
  priceBasis: InsurancePriceBasis
  currency: string
  amount: string
  freightAmount: string
  markupPercent: string
  premiumRatePercent: string
  warRiskRatePercent: string
}

export type InsuranceNumericField = 'amount' | 'freightAmount' | 'markupPercent' | 'premiumRatePercent' | 'warRiskRatePercent'

export interface CargoInsuranceFormProps {
  form: InsuranceFormState
  onNumericChange: (field: InsuranceNumericField, value: string) => void
  onBasisChange: (basis: InsurancePriceBasis) => void
  onCurrencyChange: (currency: string) => void
  onApplyPreset: (presetId: InsurancePresetId) => void
  onReset: () => void
}

const PRICE_BASIS_OPTIONS: Array<{ value: InsurancePriceBasis; label: string }> = [
  { value: 'FOB', label: 'FOB（需填海运费）' },
  { value: 'CFR', label: 'CFR（含运费不含保费）' },
  { value: 'CIF', label: 'CIF（含保费直保）' },
]

export function CargoInsuranceForm({ form, onNumericChange, onBasisChange, onCurrencyChange, onApplyPreset, onReset }: CargoInsuranceFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Umbrella className="h-5 w-5" />投保参数</CardTitle>
            <CardDescription>按贸易术语口径换算 CIF 并计算保费</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>常用场景预设</Label>
          <div className="flex flex-wrap gap-2">
            {INSURANCE_PRESETS.map((preset) => (
              <Button key={preset.id} type="button" variant="outline" size="sm" title={preset.description} onClick={() => onApplyPreset(preset.id)}>
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="priceBasis">价格条款</Label>
            <Select value={form.priceBasis} onValueChange={(value) => onBasisChange(value as InsurancePriceBasis)}>
              <SelectTrigger id="priceBasis" className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {PRICE_BASIS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">币种</Label>
            <Input id="currency" value={form.currency} onChange={(event) => onCurrencyChange(event.target.value)} className="h-11 font-medium" placeholder="USD" maxLength={8} />
          </div>
          <NumberField
            id="amount"
            label={form.priceBasis === 'CIF' ? 'CIF 货值' : `${form.priceBasis} 货值`}
            suffix={form.currency.trim().toUpperCase() || 'USD'}
            value={form.amount}
            onChange={(value) => onNumericChange('amount', value)}
            autoFocus
          />
          <NumberField
            id="freightAmount"
            label="海运费"
            suffix={form.currency.trim().toUpperCase() || 'USD'}
            value={form.freightAmount}
            onChange={(value) => onNumericChange('freightAmount', value)}
            disabled={form.priceBasis !== 'FOB'}
          />
          <NumberField id="markupPercent" label="投保加成" suffix="%" value={form.markupPercent} onChange={(value) => onNumericChange('markupPercent', value)} />
          <NumberField id="premiumRatePercent" label="基本险费率" suffix="%" value={form.premiumRatePercent} onChange={(value) => onNumericChange('premiumRatePercent', value)} />
          <NumberField id="warRiskRatePercent" label="战争险附加费率" suffix="%" value={form.warRiskRatePercent} onChange={(value) => onNumericChange('warRiskRatePercent', value)} />
        </div>
        <p className="text-xs text-muted-foreground">费率填写百分数数值，例如 0.08% 的费率填 0.08。投保加成 10 表示按 CIF 的 110% 投保。</p>
      </CardContent>
    </Card>
  )
}

interface NumberFieldProps {
  id: string
  label: string
  suffix: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
}

function NumberField({ id, label, suffix, value, onChange, disabled = false, autoFocus = false }: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <FormattedInput
          id={id}
          value={value}
          onChange={onChange}
          format="decimal"
          maxDecimals={4}
          disabled={disabled}
          autoFocusFirst={autoFocus}
          className="h-11 pr-16 font-medium"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}
