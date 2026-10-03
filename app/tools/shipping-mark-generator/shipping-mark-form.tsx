// 名称: 唛头生成表单
// 描述: 采集唛头要素、箱号风格、毛重尺寸与附加行
// 路径: Globokit/app/tools/shipping-mark-generator/shipping-mark-form.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { RefreshCw, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { CartonNumberStyle } from '@/lib/tools/shipping-mark-generator'
import { SHIPPING_MARK_PRESETS } from './shipping-mark-data'

export interface ShippingMarkFormState {
  consigneeMark: string
  orderNo: string
  destinationPort: string
  cartonCount: string
  cartonNumberStyle: CartonNumberStyle
  startCartonNo: string
  extraLinesText: string
  showMadeIn: boolean
  showGrossWeight: boolean
  grossWeightKg: string
  showDimensions: boolean
  dimensionsCm: string
}

export interface ShippingMarkFormProps {
  form: ShippingMarkFormState
  onChange: (patch: Partial<ShippingMarkFormState>) => void
  onApplyPreset: (presetId: string) => void
  onReset: () => void
}

const CARTON_STYLE_OPTIONS: Array<{ value: CartonNumberStyle; label: string }> = [
  { value: 'range', label: '区间（CARTON NO. 1-50）' },
  { value: 'each', label: '逐箱（CARTON NO. 1 OF 50）' },
  { value: 'none', label: '不输出箱号' },
]

export function ShippingMarkForm({ form, onChange, onApplyPreset, onReset }: ShippingMarkFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5" />唛头要素</CardTitle>
            <CardDescription>填写外箱印刷要素，右侧实时预览</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>场景预设</Label>
          <div className="flex flex-wrap gap-2">
            {SHIPPING_MARK_PRESETS.map((preset) => (
              <Button key={preset.id} type="button" variant="outline" size="sm" title={preset.description} onClick={() => onApplyPreset(preset.id)}>
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="consigneeMark" label="收货人代号 / 主唛" value={form.consigneeMark} onChange={(value) => onChange({ consigneeMark: value })} placeholder="如 ABC" autoFocus />
          <TextField id="orderNo" label="订单号" value={form.orderNo} onChange={(value) => onChange({ orderNo: value })} placeholder="PO-2026-0930" />
          <TextField id="destinationPort" label="目的港 / 目的地" value={form.destinationPort} onChange={(value) => onChange({ destinationPort: value })} placeholder="HAMBURG" />
          <div className="space-y-2">
            <Label htmlFor="cartonNumberStyle">箱号风格</Label>
            <Select value={form.cartonNumberStyle} onValueChange={(value) => onChange({ cartonNumberStyle: value as CartonNumberStyle })}>
              <SelectTrigger id="cartonNumberStyle" className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CARTON_STYLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <NumberField id="cartonCount" label="总箱数" suffix="箱" value={form.cartonCount} onChange={(value) => onChange({ cartonCount: value })} />
          <NumberField id="startCartonNo" label="起始箱号" suffix="号" value={form.startCartonNo} onChange={(value) => onChange({ startCartonNo: value })} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <ToggleRow
            id="showMadeIn"
            label="加印 MADE IN CHINA"
            checked={form.showMadeIn}
            onCheckedChange={(value) => onChange({ showMadeIn: value })}
          />
          <ToggleRow
            id="showGrossWeight"
            label="加印毛重 G.W."
            checked={form.showGrossWeight}
            onCheckedChange={(value) => onChange({ showGrossWeight: value })}
          />
          <ToggleRow
            id="showDimensions"
            label="加印外箱尺寸"
            checked={form.showDimensions}
            onCheckedChange={(value) => onChange({ showDimensions: value })}
          />
        </div>

        {(form.showGrossWeight || form.showDimensions) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {form.showGrossWeight && (
              <NumberField id="grossWeightKg" label="每箱毛重" suffix="KG" value={form.grossWeightKg} onChange={(value) => onChange({ grossWeightKg: value })} disabled={!form.showGrossWeight} />
            )}
            {form.showDimensions && (
              <TextField id="dimensionsCm" label="外箱尺寸" value={form.dimensionsCm} onChange={(value) => onChange({ dimensionsCm: value })} placeholder="60x40x40" />
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="extraLinesText">附加行（每行一条，原样保留大小写）</Label>
          <Textarea
            id="extraLinesText"
            value={form.extraLinesText}
            onChange={(event) => onChange({ extraLinesText: event.target.value })}
            placeholder={'如：\nTHIS SIDE UP\nKEEP DRY'}
            className="min-h-[88px] font-medium"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function TextField({ id, label, value, onChange, placeholder, autoFocus = false }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; autoFocus?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-11 font-medium" autoFocus={autoFocus} maxLength={60} />
    </div>
  )
}

function NumberField({ id, label, suffix, value, onChange, disabled = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; disabled?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <FormattedInput id={id} value={value} onChange={onChange} format="number" maxDecimals={0} disabled={disabled} className="h-11 pr-14 font-medium" />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}

function ToggleRow({ id, label, checked, onCheckedChange }: { id: string; label: string; checked: boolean; onCheckedChange: (value: boolean) => void }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-md border bg-muted/20 px-3 py-2.5">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onCheckedChange(event.target.checked)} className="h-5 w-5 cursor-pointer accent-emerald-600" />
      <span className="text-sm">{label}</span>
    </label>
  )
}
