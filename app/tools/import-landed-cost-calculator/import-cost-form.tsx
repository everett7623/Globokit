// 名称: 进口成本表单
// 描述: 展示币种、采购、税率、本地费用和预设控件
// 路径: Globokit/app/tools/import-landed-cost-calculator/import-cost-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Calculator, Check, ClipboardCopy, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { ImportCurrency } from '@/lib/tools/import-landed-cost-calculator'
import { CURRENCY_OPTIONS, IMPORT_PRESETS, type FormState, type NumericField } from './import-cost-page-data'

interface ImportCostFormProps {
  form: FormState
  copied: boolean
  goodsValue: string
  foreignCostTotal: string
  onFieldChange: (field: NumericField, value: string) => void
  onCurrencyChange: (currency: ImportCurrency, rate: string) => void
  onPreset: (values: Partial<FormState>) => void
  onCopy: () => void
  onReset: () => void
}

export function ImportCostForm(props: ImportCostFormProps) {
  return <Card>
    <CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />成本参数</CardTitle><CardDescription>外币费用按汇率折算，本地清关与运输费用按人民币录入</CardDescription></div><Button type="button" variant="outline" size="sm" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div></CardHeader>
    <CardContent className="space-y-6">
      <div className="flex flex-wrap gap-2">{IMPORT_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" onClick={() => props.onPreset(preset.values)}>{preset.label}</Button>)}</div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2"><Label htmlFor="currency">采购币种</Label><Select value={props.form.currency} onValueChange={(value) => { const selected = CURRENCY_OPTIONS.find((option) => option.value === value); props.onCurrencyChange(value as ImportCurrency, selected?.rate ?? props.form.exchangeRate) }}><SelectTrigger id="currency" className="h-11"><SelectValue placeholder="选择币种" /></SelectTrigger><SelectContent>{CURRENCY_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>
        <NumberField field="quantity" label="进口数量" suffix="件" step="1" value={props.form.quantity} onValueChange={props.onFieldChange} />
        <NumberField field="exchangeRate" label="折算汇率" suffix="CNY" step="0.0001" value={props.form.exchangeRate} onValueChange={props.onFieldChange} />
      </div>
      <FieldGrid><NumberField field="unitPriceForeign" label="外币单价" suffix={props.form.currency} value={props.form.unitPriceForeign} onValueChange={props.onFieldChange} /><NumberField field="internationalFreightForeign" label="国际运费" suffix={props.form.currency} value={props.form.internationalFreightForeign} onValueChange={props.onFieldChange} /><NumberField field="insuranceForeign" label="保险费" suffix={props.form.currency} value={props.form.insuranceForeign} onValueChange={props.onFieldChange} /><NumberField field="otherForeignCost" label="其他外币费用" suffix={props.form.currency} value={props.form.otherForeignCost} onValueChange={props.onFieldChange} /></FieldGrid>
      <FieldGrid><NumberField field="dutyRatePercent" label="进口关税率" suffix="%" value={props.form.dutyRatePercent} onValueChange={props.onFieldChange} /><NumberField field="vatRatePercent" label="进口增值税率" suffix="%" value={props.form.vatRatePercent} onValueChange={props.onFieldChange} /></FieldGrid>
      <FieldGrid><NumberField field="customsFeeCny" label="报关/清关费" suffix="CNY" value={props.form.customsFeeCny} onValueChange={props.onFieldChange} /><NumberField field="portChargeCny" label="港杂/查验费" suffix="CNY" value={props.form.portChargeCny} onValueChange={props.onFieldChange} /><NumberField field="domesticFreightCny" label="国内运输费" suffix="CNY" value={props.form.domesticFreightCny} onValueChange={props.onFieldChange} /><NumberField field="otherLocalCostCny" label="其他本地费用" suffix="CNY" value={props.form.otherLocalCostCny} onValueChange={props.onFieldChange} /></FieldGrid>
      <div className="grid gap-4 md:grid-cols-2"><NumberField field="targetSellingPriceCny" label="目标销售单价" suffix="CNY" value={props.form.targetSellingPriceCny} onValueChange={props.onFieldChange} /><div className="rounded-md border bg-muted/40 p-4"><p className="text-xs text-muted-foreground">采购货值</p><p className="mt-2 text-xl font-semibold">{props.goodsValue}</p><p className="mt-1 text-xs text-muted-foreground">外币费用合计 {props.foreignCostTotal}</p></div></div>
      <Alert><Info className="h-4 w-4" /><AlertDescription>结果用于报价和预算测算，实际税费以报关单、税则归类、进口环节税单和财务口径为准。</AlertDescription></Alert>
      <Button type="button" onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{props.copied ? '已复制' : '复制测算摘要'}</Button>
    </CardContent>
  </Card>
}

function FieldGrid({ children }: { children: React.ReactNode }) { return <div className="grid gap-4 md:grid-cols-2">{children}</div> }
interface NumberFieldProps { field: NumericField; label: string; suffix: string; value: string; onValueChange: (field: NumericField, value: string) => void; step?: string }
function NumberField({ field, label, suffix, value, onValueChange, step = '0.01' }: NumberFieldProps) {
  return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode={step === '1' ? 'numeric' : 'decimal'} pattern="[0-9]*[.]?[0-9]*" value={value} onChange={(event) => onValueChange(field, event.target.value)} className="h-11 pr-20 font-medium leading-normal tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex max-w-14 items-center justify-end text-right text-xs text-muted-foreground">{suffix}</span></div></div>
}
