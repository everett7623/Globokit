// 名称: 空运计费表单
// 描述: 展示箱规、重量、泡重、运价和附加费用控件
// 路径: Globokit/app/tools/air-freight-calculator/air-freight-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-30

import { Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'
import { AIR_FREIGHT_DIVISORS } from '@/lib/tools/air-freight-calculator'
import { AIR_PRESETS, type DivisorChoice, type FormState, type NumericField } from './air-freight-page-data'

interface AirFreightFormProps {
  form: FormState
  divisorNote: string
  onFieldChange: (field: NumericField, value: string) => void
  onDivisorChoice: (value: DivisorChoice) => void
  onPreset: (values: Partial<FormState>) => void
  summaryText: string
  onReset: () => void
}

export function AirFreightForm(props: AirFreightFormProps) {
  return (
    <Card>
      <CardHeader><CardTitle>计费重参数</CardTitle><CardDescription>输入箱规、重量、运价及附加费用</CardDescription></CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">{AIR_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" onClick={() => props.onPreset(preset.values)}>{preset.label}</Button>)}</div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <NumberField field="lengthCm" label="外箱长" suffix="cm" value={props.form.lengthCm} onValueChange={props.onFieldChange} />
          <NumberField field="widthCm" label="外箱宽" suffix="cm" value={props.form.widthCm} onValueChange={props.onFieldChange} />
          <NumberField field="heightCm" label="外箱高" suffix="cm" value={props.form.heightCm} onValueChange={props.onFieldChange} />
        </div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <NumberField field="grossWeightKg" label="单箱毛重" suffix="kg" step="0.01" value={props.form.grossWeightKg} onValueChange={props.onFieldChange} />
          <NumberField field="netWeightKg" label="单箱净重" suffix="kg" step="0.01" value={props.form.netWeightKg} onValueChange={props.onFieldChange} />
          <NumberField field="quantity" label="箱数" suffix="箱" value={props.form.quantity} onValueChange={props.onFieldChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="divisorChoice">泡重系数</Label>
          <Select value={props.form.divisorChoice} onValueChange={props.onDivisorChoice}>
            <SelectTrigger id="divisorChoice"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(AIR_FREIGHT_DIVISORS) as Array<keyof typeof AIR_FREIGHT_DIVISORS>).map((key) => (
                <SelectItem key={key} value={key}>{AIR_FREIGHT_DIVISORS[key].label}</SelectItem>
              ))}
              <SelectItem value="custom">自定义</SelectItem>
            </SelectContent>
          </Select>
          {props.form.divisorChoice === 'custom' && <NumberField field="divisor" label="自定义系数" suffix="" value={props.form.divisor} onValueChange={props.onFieldChange} />}
          <p className="text-xs text-muted-foreground">{props.divisorNote}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <NumberField field="ratePerKg" label="运价" suffix="元/kg" step="0.01" value={props.form.ratePerKg} onValueChange={props.onFieldChange} />
          <NumberField field="minCharge" label="最低消费" suffix="元" step="0.01" value={props.form.minCharge} onValueChange={props.onFieldChange} />
          <NumberField field="fuelSurchargePercent" label="燃油附加" suffix="%" step="0.1" value={props.form.fuelSurchargePercent} onValueChange={props.onFieldChange} />
        </div>
        <NumberField field="handlingFee" label="操作费" suffix="元" step="0.01" value={props.form.handlingFee} onValueChange={props.onFieldChange} />
        <Alert><Info className="h-4 w-4" /><AlertDescription>计费重 = max(毛重, 体积重)，体积重 = 长×宽×高 / 泡重系数</AlertDescription></Alert>
        <MobileButtonGroup>
          <EnhancedCopyButton text={props.summaryText}>
            复制测算摘要
          </EnhancedCopyButton>
          <Button type="button" variant="outline" onClick={props.onReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            重置
          </Button>
        </MobileButtonGroup>
      </CardContent>
    </Card>
  )
}

interface NumberFieldProps { field: NumericField; label: string; suffix: string; value: string; onValueChange: (field: NumericField, value: string) => void; step?: string }
function NumberField({ field, label, suffix, value, onValueChange, step = '1' }: NumberFieldProps) {
  return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode={step === '1' ? 'numeric' : 'decimal'} pattern="[0-9]*[.]?[0-9]*" value={value} onChange={(event) => onValueChange(field, event.target.value)} className="h-11 pr-20 font-medium leading-normal tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex max-w-14 items-center justify-end text-right text-xs text-muted-foreground">{suffix}</span></div></div>
}
