// 名称: 集装箱滞箱滞港费表单
// 描述: 展示柜量、占用天数、免费期和阶梯费率参数
// 路径: Globokit/app/tools/demurrage-detention-calculator/demurrage-detention-form.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { Clock, RefreshCw } from 'lucide-react'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CHARGE_CURRENCY_OPTIONS, type ChargeCurrency } from '@/lib/tools/demurrage-detention-calculator'
import { DEMURRAGE_DETENTION_PRESETS, type DemurrageDetentionFormState, type NumericField } from './demurrage-detention-page-data'

interface DemurrageDetentionFormProps {
  form: DemurrageDetentionFormState
  summaryText: string
  onFieldChange: (field: NumericField, value: string) => void
  onCurrencyChange: (currency: ChargeCurrency) => void
  onPreset: (values: Partial<DemurrageDetentionFormState>) => void
  onReset: () => void
}

const COMMON_FIELDS: Array<{ field: NumericField; id: string; label: string; suffix: string; integer?: boolean }> = [
  { field: 'containerCount', id: 'dd-container-count', label: '集装箱数量', suffix: '柜', integer: true },
  { field: 'demurrageDays', id: 'dd-demurrage-days', label: '场内占用天数', suffix: '天', integer: true },
  { field: 'detentionDays', id: 'dd-detention-days', label: '场外占用天数', suffix: '天', integer: true },
]

export function DemurrageDetentionForm({ form, summaryText, onFieldChange, onCurrencyChange, onPreset, onReset }: DemurrageDetentionFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />费用与免费期参数</CardTitle>
            <CardDescription>按账单或设备交接记录输入日数，费率统一按每柜每天填写</CardDescription>
          </div>
          <div className="flex gap-2">
            <EnhancedCopyButton text={summaryText} variant="outline" size="sm" disabled={!summaryText}>复制摘要</EnhancedCopyButton>
            <Button type="button" variant="outline" size="sm" onClick={onReset}><RefreshCw className="mr-2 h-4 w-4" />重置</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="dd-currency">计费币种</Label><Select value={form.currency} onValueChange={(value) => onCurrencyChange(value as ChargeCurrency)}><SelectTrigger id="dd-currency" className="h-11"><SelectValue /></SelectTrigger><SelectContent>{CHARGE_CURRENCY_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>
          {COMMON_FIELDS.map((field) => <NumberField key={field.field} id={field.id} label={field.label} suffix={field.suffix} value={form[field.field]} integer={field.integer} autoFocus={field.field === 'containerCount'} onChange={(value) => onFieldChange(field.field, value)} />)}
        </div>
        <ScenarioPresets presets={DEMURRAGE_DETENTION_PRESETS} onSelect={onPreset} />
        <ScheduleFields type="demurrage" currency={form.currency} form={form} onFieldChange={onFieldChange} />
        <ScheduleFields type="detention" currency={form.currency} form={form} onFieldChange={onFieldChange} />
        <p className="text-xs leading-5 text-muted-foreground">滞港费通常指集装箱仍在码头或堆场内的占用费，滞箱费通常指提柜后到还空柜前的占用费。不同船公司可能采用合并免费期或特殊起算规则，请以实际账单条款复核。</p>
      </CardContent>
    </Card>
  )
}

function ScheduleFields({ type, currency, form, onFieldChange }: { type: 'demurrage' | 'detention'; currency: ChargeCurrency; form: DemurrageDetentionFormState; onFieldChange: (field: NumericField, value: string) => void }) {
  const label = type === 'demurrage' ? '滞港费（Demurrage）' : '滞箱费（Detention）'
  const fields: Array<{ field: NumericField; id: string; label: string; suffix: string; integer?: boolean }> = type === 'demurrage'
    ? [
        { field: 'demurrageFreeDays', id: 'dd-demurrage-free', label: '免费天数', suffix: '天', integer: true },
        { field: 'demurrageFirstTierDays', id: 'dd-demurrage-tier-1-days', label: '第一阶梯天数', suffix: '天', integer: true },
        { field: 'demurrageFirstTierRate', id: 'dd-demurrage-tier-1-rate', label: '第一阶梯日费率', suffix: `${currency}/柜·天` },
        { field: 'demurrageSecondTierDays', id: 'dd-demurrage-tier-2-days', label: '第二阶梯天数', suffix: '天', integer: true },
        { field: 'demurrageSecondTierRate', id: 'dd-demurrage-tier-2-rate', label: '第二阶梯日费率', suffix: `${currency}/柜·天` },
        { field: 'demurrageFinalTierRate', id: 'dd-demurrage-final-rate', label: '后续日费率', suffix: `${currency}/柜·天` },
      ]
    : [
        { field: 'detentionFreeDays', id: 'dd-detention-free', label: '免费天数', suffix: '天', integer: true },
        { field: 'detentionFirstTierDays', id: 'dd-detention-tier-1-days', label: '第一阶梯天数', suffix: '天', integer: true },
        { field: 'detentionFirstTierRate', id: 'dd-detention-tier-1-rate', label: '第一阶梯日费率', suffix: `${currency}/柜·天` },
        { field: 'detentionSecondTierDays', id: 'dd-detention-tier-2-days', label: '第二阶梯天数', suffix: '天', integer: true },
        { field: 'detentionSecondTierRate', id: 'dd-detention-tier-2-rate', label: '第二阶梯日费率', suffix: `${currency}/柜·天` },
        { field: 'detentionFinalTierRate', id: 'dd-detention-final-rate', label: '后续日费率', suffix: `${currency}/柜·天` },
      ]
  return <div className="rounded-md border bg-muted/20 p-4"><div className="mb-4"><h2 className="text-sm font-semibold">{label}</h2><p className="mt-1 text-xs text-muted-foreground">先扣除免费天数，再按第一、第二和后续阶梯费率计算。</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fields.map((field) => <NumberField key={field.field} id={field.id} label={field.label} suffix={field.suffix} value={form[field.field]} integer={field.integer} onChange={(value) => onFieldChange(field.field, value)} />)}</div></div>
}

function NumberField({ id, label, suffix, value, onChange, integer = false, autoFocus = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; integer?: boolean; autoFocus?: boolean }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><FormattedInput id={id} value={value} onChange={onChange} format={integer ? 'number' : 'decimal'} maxDecimals={2} autoFocusFirst={autoFocus} className="h-11 pr-28 font-medium" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-right text-[11px] text-muted-foreground">{suffix}</span></div></div>
}
