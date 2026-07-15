// 名称: 外贸报价表单
// 描述: 展示条款、成本、利润、币种和场景预设控件
// 路径: Globokit/app/tools/quote-calculator/quote-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Calculator, Info, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { QUOTE_TERM_CONFIGS, QUOTE_TERM_OPTIONS, type QuoteMode, type QuoteTerm } from '@/lib/tools/quote-calculator'
import { CURRENCY_OPTIONS, SCENARIO_PRESETS, type FormState, type NumericField, type QuoteCurrency } from './quote-page-data'

interface QuoteFormProps {
  form: FormState
  mode: QuoteMode
  missingCostLabels: string[]
  onFieldChange: (field: NumericField, value: string) => void
  onModeChange: (mode: QuoteMode) => void
  onTermChange: (term: QuoteTerm) => void
  onCurrencyChange: (currency: QuoteCurrency, rate: string) => void
  onPreset: (values: Partial<FormState>, mode: QuoteMode) => void
  onReset: () => void
}

export function QuoteForm(props: QuoteFormProps) {
  const term = QUOTE_TERM_CONFIGS[props.form.quoteTerm]
  return <Card>
    <CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />报价参数</CardTitle><CardDescription>输入成本、费用和报价口径，结果会自动刷新</CardDescription></div><Button variant="outline" size="sm" onClick={props.onReset}><RefreshCw className="mr-2 h-4 w-4" />重置</Button></div></CardHeader>
    <CardContent className="space-y-6">
      <Tabs value={props.mode} onValueChange={(value) => props.onModeChange(value as QuoteMode)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="target-margin">按目标利润反推</TabsTrigger><TabsTrigger value="known-price">按已知售价核算</TabsTrigger></TabsList></Tabs>
      <div className="flex flex-wrap gap-2">{SCENARIO_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" onClick={() => props.onPreset(preset.values, preset.mode)}>{preset.label}</Button>)}</div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"><div className="space-y-2"><Label htmlFor="quoteTerm">贸易条款</Label><Select value={props.form.quoteTerm} onValueChange={(value) => props.onTermChange(value as QuoteTerm)}><SelectTrigger id="quoteTerm" className="h-11"><SelectValue placeholder="选择贸易条款" /></SelectTrigger><SelectContent>{QUOTE_TERM_OPTIONS.map((item) => <SelectItem key={item.code} value={item.code}>{item.code} · {item.nameCn}</SelectItem>)}</SelectContent></Select></div><div className="rounded-md border bg-muted/40 px-4 py-3 text-sm"><div className="font-semibold">{term.code} {term.nameCn}<span className="ml-2 text-xs font-normal text-muted-foreground">{term.nameEn}</span></div><p className="mt-1 leading-6 text-muted-foreground">{term.note}</p></div></div>
      {props.missingCostLabels.length > 0 && <Alert><Info className="h-4 w-4" /><AlertDescription>{props.form.quoteTerm} 报价需要补充 {props.missingCostLabels.join('、')}；未填写时仍可计算，但含运费/到门报价会偏低。</AlertDescription></Alert>}
      <div className="grid gap-4 md:grid-cols-2">
        <NumberField field="unitCostCny" label="单件采购成本" suffix="CNY" value={props.form.unitCostCny} onValueChange={props.onFieldChange} /><NumberField field="quantity" label="订单数量" suffix="件" step="1" value={props.form.quantity} onValueChange={props.onFieldChange} />
        <NumberField field="domesticFeeCny" label="内陆/交货前费用" suffix="CNY" value={props.form.domesticFeeCny} onValueChange={props.onFieldChange} /><NumberField field="exportFeeCny" label="出口报关/起运港杂" suffix="CNY" value={props.form.exportFeeCny} onValueChange={props.onFieldChange} />
        <NumberField field="internationalFreightCny" label="国际运输费" suffix="CNY" value={props.form.internationalFreightCny} onValueChange={props.onFieldChange} /><NumberField field="insuranceFeeCny" label="运输保险费" suffix="CNY" value={props.form.insuranceFeeCny} onValueChange={props.onFieldChange} />
        <NumberField field="destinationFeeCny" label="目的地费用/派送" suffix="CNY" value={props.form.destinationFeeCny} onValueChange={props.onFieldChange} /><NumberField field="importDutyTaxCny" label="进口清关税费" suffix="CNY" value={props.form.importDutyTaxCny} onValueChange={props.onFieldChange} />
        <NumberField field="rebatePercent" label="出口退税率" suffix="%" value={props.form.rebatePercent} onValueChange={props.onFieldChange} /><NumberField field="vatPercent" label="增值税率" suffix="%" value={props.form.vatPercent} onValueChange={props.onFieldChange} />
        <NumberField field="commissionPercent" label="佣金比例" suffix="%" value={props.form.commissionPercent} onValueChange={props.onFieldChange} /><NumberField field="paymentFeePercent" label="收款手续费" suffix="%" value={props.form.paymentFeePercent} onValueChange={props.onFieldChange} />
        {props.mode === 'target-margin' ? <NumberField field="targetMarginPercent" label="目标利润率" suffix="%" value={props.form.targetMarginPercent} onValueChange={props.onFieldChange} /> : <NumberField field="sellingPriceForeign" label="已知销售单价" suffix={props.form.currency} value={props.form.sellingPriceForeign} onValueChange={props.onFieldChange} />}
      </div>
      <div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="currency">报价币种</Label><Select value={props.form.currency} onValueChange={(value) => { const selected = CURRENCY_OPTIONS.find((option) => option.value === value); props.onCurrencyChange(value as QuoteCurrency, selected?.rate ?? props.form.exchangeRate) }}><SelectTrigger id="currency"><SelectValue placeholder="选择报价币种" /></SelectTrigger><SelectContent>{CURRENCY_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div><NumberField field="exchangeRate" label="汇率" suffix="CNY" step="0.0001" value={props.form.exchangeRate} onValueChange={props.onFieldChange} /></div>
    </CardContent>
  </Card>
}

interface NumberFieldProps { field: NumericField; label: string; suffix?: string; value: string; onValueChange: (field: NumericField, value: string) => void; step?: string }
function NumberField({ field, label, suffix, value, onValueChange, step = '0.01' }: NumberFieldProps) { return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode={step === '1' ? 'numeric' : 'decimal'} pattern="[0-9]*[.]?[0-9]*" value={value} onChange={(event) => onValueChange(field, event.target.value)} className={cn('h-11 font-medium leading-normal tabular-nums', suffix && 'pr-16')} />{suffix && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>}</div></div> }
