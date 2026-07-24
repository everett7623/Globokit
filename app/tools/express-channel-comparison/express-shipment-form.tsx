// 名称: 快递专线货物表单
// 描述: 录入目的地、货物属性、箱规和毛净重
// 路径: Globokit/app/tools/express-channel-comparison/express-shipment-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-24

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Info, MapPin, PackageSearch } from 'lucide-react'
import {
  CARGO_TYPE_OPTIONS,
  type CargoType,
  type ShipmentForm,
  type ShipmentNumericField,
  type ShipmentTextField,
} from './express-comparison-page-data'

interface ExpressShipmentFormProps {
  form: ShipmentForm
  onTextChange: (field: ShipmentTextField, value: string) => void
  onNumericChange: (field: ShipmentNumericField, value: string) => void
  onCargoTypeChange: (value: CargoType) => void
}

export function ExpressShipmentForm(props: ExpressShipmentFormProps) {
  const cargoNeedsReview = props.form.cargoType !== 'general'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><PackageSearch className="h-5 w-5" />货物与目的地</CardTitle>
        <CardDescription>同一票货物可录入多个货代或渠道报价</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField id="cargoName" label="货物名称" value={props.form.cargoName} onChange={(value) => props.onTextChange('cargoName', value)} />
          <div className="space-y-2">
            <Label htmlFor="cargoType">货物属性</Label>
            <Select value={props.form.cargoType} onValueChange={(value) => props.onCargoTypeChange(value as CargoType)}>
              <SelectTrigger id="cargoType"><SelectValue /></SelectTrigger>
              <SelectContent>{CARGO_TYPE_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">目的地</Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="destination" value={props.form.destination} onChange={(event) => props.onTextChange('destination', event.target.value)} className="pl-9" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumberField field="lengthCm" label="外箱长" suffix="cm" value={props.form.lengthCm} onChange={props.onNumericChange} />
          <NumberField field="widthCm" label="外箱宽" suffix="cm" value={props.form.widthCm} onChange={props.onNumericChange} />
          <NumberField field="heightCm" label="外箱高" suffix="cm" value={props.form.heightCm} onChange={props.onNumericChange} />
          <NumberField field="grossWeightKg" label="单箱毛重" suffix="kg" value={props.form.grossWeightKg} onChange={props.onNumericChange} />
          <NumberField field="netWeightKg" label="单箱净重" suffix="kg" value={props.form.netWeightKg} onChange={props.onNumericChange} />
          <NumberField field="packageCount" label="箱数" suffix="箱" value={props.form.packageCount} onChange={props.onNumericChange} />
        </div>
        {cargoNeedsReview && <Alert><Info className="h-4 w-4" /><AlertDescription>膏体、液体、粉末或带电货物需要先确认渠道承运要求、鉴定资料及附加费。</AlertDescription></Alert>}
      </CardContent>
    </Card>
  )
}

function TextField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} value={value} onChange={(event) => onChange(event.target.value)} /></div>
}

function NumberField({ field, label, suffix, value, onChange }: { field: ShipmentNumericField; label: string; suffix: string; value: string; onChange: (field: ShipmentNumericField, value: string) => void }) {
  return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} inputMode="decimal" value={value} onChange={(event) => onChange(field, event.target.value)} className="pr-12 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span></div></div>
}
