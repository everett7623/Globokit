// 名称: 空运计费表单
// 描述: 展示箱规、重量、泡重、运价和附加费用控件
// 路径: Globokit/app/tools/air-freight-calculator/air-freight-form.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Check, ClipboardCopy, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AIR_FREIGHT_DIVISORS } from '@/lib/tools/air-freight-calculator'
import { AIR_PRESETS, type DivisorChoice, type FormState, type NumericField } from './air-freight-page-data'

interface AirFreightFormProps {
  form: FormState
  copied: boolean
  divisorNote: string
  onFieldChange: (field: NumericField, value: string) => void
  onDivisorChoice: (value: DivisorChoice) => void
  onPreset: (values: Partial<FormState>) => void
  onCopy: () => void
  onReset: () => void
}

export function AirFreightForm(props: AirFreightFormProps) {
  return (
    <Card>
      <CardHeader><CardTitle>计费参数</CardTitle><CardDescription>费用币种按输入运价一致，适用于 DHL、FedEx、UPS、空运和专线初算</CardDescription></CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">{AIR_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" onClick={() => props.onPreset(preset.values)}>{preset.label}</Button>)}</div>
        <FieldGrid>
          <NumberField field="lengthCm" label="外箱长" suffix="cm" value={props.form.lengthCm} onValueChange={props.onFieldChange} />
          <NumberField field="widthCm" label="外箱宽" suffix="cm" value={props.form.widthCm} onValueChange={props.onFieldChange} />
          <NumberField field="heightCm" label="外箱高" suffix="cm" value={props.form.heightCm} onValueChange={props.onFieldChange} />
        </FieldGrid>
        <FieldGrid>
          <NumberField field="grossWeightKg" label="单箱毛重" suffix="kg" step="0.1" value={props.form.grossWeightKg} onValueChange={props.onFieldChange} />
          <NumberField field="netWeightKg" label="单箱净重" suffix="kg" step="0.1" value={props.form.netWeightKg} onValueChange={props.onFieldChange} />
          <NumberField field="quantity" label="箱数" suffix="箱" value={props.form.quantity} onValueChange={props.onFieldChange} />
        </FieldGrid>
        <div className="grid gap-4 md:grid-cols-[repeat(2,minmax(0,1fr))]">
          <div className="space-y-2"><Label htmlFor="divisorChoice">泡重口径</Label><Select value={props.form.divisorChoice} onValueChange={(value) => props.onDivisorChoice(value as DivisorChoice)}><SelectTrigger id="divisorChoice"><SelectValue /></SelectTrigger><SelectContent>{Object.entries(AIR_FREIGHT_DIVISORS).map(([key, divisor]) => <SelectItem key={key} value={key}>{divisor.label}</SelectItem>)}<SelectItem value="custom">自定义</SelectItem></SelectContent></Select></div>
          <NumberField field="divisor" label="泡重系数" suffix="cm3/kg" value={props.form.divisor} onValueChange={props.onFieldChange} />
        </div>
        <FieldGrid>
          <NumberField field="ratePerKg" label="每公斤运价" suffix="/kg" step="0.01" value={props.form.ratePerKg} onValueChange={props.onFieldChange} />
          <NumberField field="minCharge" label="最低收费" suffix="元" step="0.01" value={props.form.minCharge} onValueChange={props.onFieldChange} />
          <NumberField field="fuelSurchargePercent" label="燃油附加" suffix="%" step="0.1" value={props.form.fuelSurchargePercent} onValueChange={props.onFieldChange} />
        </FieldGrid>
        <div className="grid gap-4 md:grid-cols-2"><NumberField field="handlingFee" label="操作/杂费" suffix="元" step="0.01" value={props.form.handlingFee} onValueChange={props.onFieldChange} /></div>
        <Alert><Info className="h-4 w-4" /><AlertDescription>{props.divisorNote}。实际账单还可能包含偏远、旺季、安检、报关、超长超重等费用。</AlertDescription></Alert>
        <div className="flex flex-wrap gap-2"><Button type="button" onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{props.copied ? '已复制' : '复制测算摘要'}</Button><Button type="button" variant="outline" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div>
      </CardContent>
    </Card>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">{children}</div>
}

interface NumberFieldProps { field: NumericField; label: string; suffix: string; value: string; onValueChange: (field: NumericField, value: string) => void; step?: string }
function NumberField({ field, label, suffix, value, onValueChange, step = '1' }: NumberFieldProps) {
  return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode={step === '1' ? 'numeric' : 'decimal'} pattern="[0-9]*[.]?[0-9]*" value={value} onChange={(event) => onValueChange(field, event.target.value)} className="h-11 pr-24 font-medium leading-normal tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex max-w-16 items-center justify-end text-right text-xs text-muted-foreground">{suffix}</span></div></div>
}
