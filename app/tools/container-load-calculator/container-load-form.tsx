// 名称: 装柜计算表单
// 描述: 展示纸箱、数量、柜型预设和操作控件
// 路径: Globokit/app/tools/container-load-calculator/container-load-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Check, ClipboardCopy, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CONTAINER_SPECS, type ContainerType } from '@/lib/tools/container-load-calculator'
import { CONTAINER_PRESETS, type FormState, type NumericField } from './container-load-page-data'

interface ContainerLoadFormProps {
  form: FormState
  copied: boolean
  doesNotFit: boolean
  onFieldChange: (field: NumericField, value: string) => void
  onContainerChange: (value: ContainerType) => void
  onPreset: (values: Partial<FormState>) => void
  onCopy: () => void
  onReset: () => void
}

export function ContainerLoadForm(props: ContainerLoadFormProps) {
  return (
    <Card>
      <CardHeader><CardTitle>装柜参数</CardTitle><CardDescription>输入外箱尺寸和订单箱数，柜型参数按常见内尺寸估算</CardDescription></CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">{CONTAINER_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" onClick={() => props.onPreset(preset.values)}>{preset.label}</Button>)}</div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <NumberField field="lengthCm" label="外箱长" suffix="cm" value={props.form.lengthCm} onValueChange={props.onFieldChange} />
          <NumberField field="widthCm" label="外箱宽" suffix="cm" value={props.form.widthCm} onValueChange={props.onFieldChange} />
          <NumberField field="heightCm" label="外箱高" suffix="cm" value={props.form.heightCm} onValueChange={props.onFieldChange} />
        </div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <NumberField field="grossWeightKg" label="单箱毛重" suffix="kg" step="0.1" value={props.form.grossWeightKg} onValueChange={props.onFieldChange} />
          <NumberField field="quantity" label="总箱数" suffix="箱" value={props.form.quantity} onValueChange={props.onFieldChange} />
          <div className="space-y-2">
            <Label htmlFor="containerType">柜型</Label>
            <Select value={props.form.containerType} onValueChange={(value) => props.onContainerChange(value as ContainerType)}>
              <SelectTrigger id="containerType"><SelectValue /></SelectTrigger>
              <SelectContent>{Object.values(CONTAINER_SPECS).map((container) => <SelectItem key={container.type} value={container.type}>{container.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <Alert><Info className="h-4 w-4" /><AlertDescription>结果为规则摆放估算，未考虑托盘、纸箱变形、装卸间隙、限重法规和船公司具体柜况。</AlertDescription></Alert>
        {props.doesNotFit && <Alert variant="destructive"><Info className="h-4 w-4" /><AlertDescription>当前纸箱在所有旋转方向下都无法通过所选柜型内尺寸，请调整包装尺寸或运输方案。</AlertDescription></Alert>}
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{props.copied ? '已复制' : '复制测算摘要'}</Button>
          <Button type="button" variant="outline" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface NumberFieldProps {
  field: NumericField
  label: string
  suffix: string
  value: string
  onValueChange: (field: NumericField, value: string) => void
  step?: string
}

function NumberField({ field, label, suffix, value, onValueChange, step = '1' }: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <div className="relative">
        <Input id={field} type="text" inputMode={step === '1' ? 'numeric' : 'decimal'} pattern="[0-9]*[.]?[0-9]*" value={value} onChange={(event) => onValueChange(field, event.target.value)} className="h-11 pr-20 font-medium leading-normal tabular-nums" />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex max-w-14 items-center justify-end text-right text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}
