// 名称: 海运费用表单
// 描述: 展示运输模式、费用字段、预设和操作控件
// 路径: Globokit/app/tools/ocean-freight-calculator/ocean-freight-form.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Calculator, Check, ClipboardCopy, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { OceanFreightMode } from '@/lib/tools/ocean-freight-calculator'
import { OCEAN_PRESETS, type FormState, type NumericField } from './ocean-freight-page-data'

interface OceanFreightFormProps {
  form: FormState
  copied: boolean
  onFieldChange: (field: NumericField, value: string) => void
  onModeChange: (mode: OceanFreightMode) => void
  onPreset: (values: Partial<FormState>) => void
  onCopy: () => void
  onReset: () => void
}

export function OceanFreightForm(props: OceanFreightFormProps) {
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />费用参数</CardTitle><CardDescription>美元费用按汇率折算为人民币，本地费用直接按人民币录入</CardDescription></CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={props.form.mode} onValueChange={(value) => props.onModeChange(value as OceanFreightMode)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="fcl">整柜 FCL</TabsTrigger><TabsTrigger value="lcl">拼箱 LCL</TabsTrigger></TabsList></Tabs>
        <div className="flex flex-wrap gap-2">{OCEAN_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" onClick={() => props.onPreset(preset.values)}>{preset.label}</Button>)}</div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <NumberField field="quantity" label="货物数量" suffix="件" step="1" value={props.form.quantity} onValueChange={props.onFieldChange} />
          <NumberField field="totalCbm" label="总体积" suffix="CBM" value={props.form.totalCbm} onValueChange={props.onFieldChange} />
          <NumberField field="totalWeightKg" label="总毛重" suffix="kg" value={props.form.totalWeightKg} onValueChange={props.onFieldChange} />
        </div>
        <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          {props.form.mode === 'fcl' ? <NumberField field="containerCount" label="柜数" suffix="柜" step="1" value={props.form.containerCount} onValueChange={props.onFieldChange} /> : <NumberField field="minChargeableCbm" label="最低计费" suffix="CBM" value={props.form.minChargeableCbm} onValueChange={props.onFieldChange} />}
          <NumberField field="exchangeRate" label="美元汇率" suffix="CNY" step="0.0001" value={props.form.exchangeRate} onValueChange={props.onFieldChange} />
          <NumberField field="oceanFreightForeign" label="海运费合计" suffix="USD" value={props.form.oceanFreightForeign} onValueChange={props.onFieldChange} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <NumberField field="originChargesCny" label="起运港杂费" suffix="CNY" value={props.form.originChargesCny} onValueChange={props.onFieldChange} />
          <NumberField field="destinationChargeForeign" label="目的港费用" suffix="USD" value={props.form.destinationChargeForeign} onValueChange={props.onFieldChange} />
          <NumberField field="truckingFeeCny" label="拖车/内陆运输" suffix="CNY" value={props.form.truckingFeeCny} onValueChange={props.onFieldChange} />
          <NumberField field="customsFeeCny" label="报关费用" suffix="CNY" value={props.form.customsFeeCny} onValueChange={props.onFieldChange} />
          <NumberField field="documentFeeCny" label="文件/操作费" suffix="CNY" value={props.form.documentFeeCny} onValueChange={props.onFieldChange} />
          <NumberField field="cargoValueCny" label="货值" suffix="CNY" value={props.form.cargoValueCny} onValueChange={props.onFieldChange} />
          <NumberField field="insuranceRatePercent" label="保险费率" suffix="%" value={props.form.insuranceRatePercent} onValueChange={props.onFieldChange} />
        </div>
        <Alert><Info className="h-4 w-4" /><AlertDescription>结果用于报价前快速拆分成本，未包含查验、滞港、甩柜、仓储、超重和特殊品名附加费。</AlertDescription></Alert>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{props.copied ? '已复制' : '复制测算摘要'}</Button>
          <Button type="button" variant="outline" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface NumberFieldProps { field: NumericField; label: string; suffix: string; value: string; onValueChange: (field: NumericField, value: string) => void; step?: string }

function NumberField({ field, label, suffix, value, onValueChange, step = '0.01' }: NumberFieldProps) {
  return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode={step === '1' ? 'numeric' : 'decimal'} pattern="[0-9]*[.]?[0-9]*" value={value} onChange={(event) => onValueChange(field, event.target.value)} className="h-11 pr-20 font-medium leading-normal tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex max-w-14 items-center justify-end text-right text-xs text-muted-foreground">{suffix}</span></div></div>
}
