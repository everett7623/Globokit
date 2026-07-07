// 名称: 空运/快递计费重计算器
// 描述: 根据外箱尺寸、实重、泡重系数和运价估算空运快递计费重量与费用
// 路径: Globokit/app/tools/air-freight-calculator/page.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-07

'use client'

import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Box,
  Calculator,
  Check,
  CircleDollarSign,
  ClipboardCopy,
  Fuel,
  Info,
  Package,
  Plane,
  RotateCcw,
  Ruler,
  Scale,
  Truck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AIR_FREIGHT_DIVISORS,
  AirFreightMode,
  DEFAULT_AIR_FREIGHT_INPUTS,
  calculateAirFreight,
} from '@/lib/tools/air-freight-calculator'

type NumericField =
  | 'lengthCm'
  | 'widthCm'
  | 'heightCm'
  | 'grossWeightKg'
  | 'quantity'
  | 'divisor'
  | 'ratePerKg'
  | 'minCharge'
  | 'fuelSurchargePercent'
  | 'handlingFee'

type DivisorChoice = AirFreightMode | 'custom'

type FormState = Record<NumericField, string> & {
  divisorChoice: DivisorChoice
}

const initialForm: FormState = {
  lengthCm: String(DEFAULT_AIR_FREIGHT_INPUTS.lengthCm),
  widthCm: String(DEFAULT_AIR_FREIGHT_INPUTS.widthCm),
  heightCm: String(DEFAULT_AIR_FREIGHT_INPUTS.heightCm),
  grossWeightKg: String(DEFAULT_AIR_FREIGHT_INPUTS.grossWeightKg),
  quantity: String(DEFAULT_AIR_FREIGHT_INPUTS.quantity),
  divisor: String(DEFAULT_AIR_FREIGHT_INPUTS.divisor),
  ratePerKg: String(DEFAULT_AIR_FREIGHT_INPUTS.ratePerKg),
  minCharge: String(DEFAULT_AIR_FREIGHT_INPUTS.minCharge),
  fuelSurchargePercent: String(DEFAULT_AIR_FREIGHT_INPUTS.fuelSurchargePercent),
  handlingFee: String(DEFAULT_AIR_FREIGHT_INPUTS.handlingFee),
  divisorChoice: 'express',
}

const presets: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '快递小票', values: initialForm },
  {
    label: '轻抛货',
    values: {
      lengthCm: '60',
      widthCm: '45',
      heightCm: '40',
      grossWeightKg: '6.5',
      quantity: '18',
      divisorChoice: 'express',
      divisor: String(AIR_FREIGHT_DIVISORS.express.value),
      ratePerKg: '38',
      fuelSurchargePercent: '14',
      handlingFee: '120',
    },
  },
  {
    label: '普货空运',
    values: {
      lengthCm: '50',
      widthCm: '40',
      heightCm: '35',
      grossWeightKg: '18',
      quantity: '30',
      divisorChoice: 'air',
      divisor: String(AIR_FREIGHT_DIVISORS.air.value),
      ratePerKg: '25',
      fuelSurchargePercent: '0',
      handlingFee: '300',
    },
  },
  {
    label: '专线经济',
    values: {
      lengthCm: '42',
      widthCm: '32',
      heightCm: '28',
      grossWeightKg: '7.8',
      quantity: '60',
      divisorChoice: 'economy',
      divisor: String(AIR_FREIGHT_DIVISORS.economy.value),
      ratePerKg: '18',
      minCharge: '980',
      fuelSurchargePercent: '6',
      handlingFee: '150',
    },
  },
]

function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

export default function AirFreightCalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [copied, setCopied] = useState(false)

  const inputs = useMemo(() => ({
    lengthCm: toNumber(form.lengthCm),
    widthCm: toNumber(form.widthCm),
    heightCm: toNumber(form.heightCm),
    grossWeightKg: toNumber(form.grossWeightKg),
    quantity: toNumber(form.quantity),
    divisor: toNumber(form.divisor),
    ratePerKg: toNumber(form.ratePerKg),
    minCharge: toNumber(form.minCharge),
    fuelSurchargePercent: toNumber(form.fuelSurchargePercent),
    handlingFee: toNumber(form.handlingFee),
  }), [form])

  const result = useMemo(() => calculateAirFreight(inputs), [inputs])
  const isVolumetric = result.billingBasis === 'volumetric'
  const divisorNote = form.divisorChoice === 'custom'
    ? '自定义泡重口径'
    : AIR_FREIGHT_DIVISORS[form.divisorChoice].note

  const updateField = (field: NumericField, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'divisor' ? { divisorChoice: 'custom' as DivisorChoice } : {}),
    }))
  }

  const updateDivisorChoice = (choice: DivisorChoice) => {
    setForm((current) => ({
      ...current,
      divisorChoice: choice,
      ...(choice === 'custom' ? {} : { divisor: String(AIR_FREIGHT_DIVISORS[choice].value) }),
    }))
  }

  const applyPreset = (values: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...values }))
  }

  const resetForm = () => {
    setForm(initialForm)
  }

  const copySummary = async () => {
    const summary = [
      '空运/快递计费重测算',
      `箱规：${form.lengthCm} x ${form.widthCm} x ${form.heightCm} cm`,
      `单箱实重：${form.grossWeightKg} kg`,
      `箱数：${form.quantity} 箱`,
      `泡重系数：${form.divisor}`,
      `单箱体积：${result.cartonCbm} CBM`,
      `总体积：${result.totalCbm} CBM`,
      `总实重：${formatNumber(result.actualWeightKg, 2)} kg`,
      `总体积重：${formatNumber(result.volumetricWeightKg, 2)} kg`,
      `计费重量：${formatNumber(result.chargeableWeightKg, 2)} kg`,
      `计费依据：${isVolumetric ? '体积重' : '实重'}`,
      `基础运费：${formatMoney(result.baseFreight)}`,
      `燃油附加：${formatMoney(result.fuelSurcharge)}`,
      `操作费：${formatMoney(result.handlingFee)}`,
      `费用合计：${formatMoney(result.totalCharge)}`,
      `单箱费用：${formatMoney(result.unitCharge)}`,
    ].join('\n')

    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const NumberField = ({
    field,
    label,
    suffix,
    step = '1',
  }: {
    field: NumericField
    label: string
    suffix: string
    step?: string
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <div className="relative">
        <Input
          id={field}
          type="number"
          min="0"
          step={step}
          value={form[field]}
          onChange={(event) => updateField(field, event.target.value)}
          className="pr-14"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  )

  const resultCards = [
    {
      label: '计费重量',
      value: `${formatNumber(result.chargeableWeightKg, 2)} kg`,
      caption: isVolumetric ? '按体积重计费' : '按实重计费',
      icon: Scale,
    },
    {
      label: '总体积重',
      value: `${formatNumber(result.volumetricWeightKg, 2)} kg`,
      caption: `单箱 ${formatNumber(result.volumetricWeightPerCartonKg, 2)} kg`,
      icon: Box,
    },
    {
      label: '费用合计',
      value: formatMoney(result.totalCharge),
      caption: `基础运费 ${formatMoney(result.baseFreight)}`,
      icon: CircleDollarSign,
    },
    {
      label: '单箱费用',
      value: formatMoney(result.unitCharge),
      caption: `${formatNumber(result.chargeableWeightPerCartonKg, 2)} kg/箱`,
      icon: Package,
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">空运/快递计费重计算器</h1>
        <p className="text-muted-foreground">
          按箱规、实重、泡重系数和运价估算空运快递计费重量、抛重差与费用
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {resultCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.label}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4" />
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.caption}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <Card>
          <CardHeader>
            <CardTitle>计费参数</CardTitle>
            <CardDescription>费用币种按输入运价一致，适用于 DHL、FedEx、UPS、空运和专线初算</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.values)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <NumberField field="lengthCm" label="外箱长" suffix="cm" />
              <NumberField field="widthCm" label="外箱宽" suffix="cm" />
              <NumberField field="heightCm" label="外箱高" suffix="cm" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <NumberField field="grossWeightKg" label="单箱实重" suffix="kg" step="0.1" />
              <NumberField field="quantity" label="箱数" suffix="箱" />
              <div className="space-y-2">
                <Label htmlFor="divisorChoice">泡重口径</Label>
                <Select value={form.divisorChoice} onValueChange={(value) => updateDivisorChoice(value as DivisorChoice)}>
                  <SelectTrigger id="divisorChoice">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AIR_FREIGHT_DIVISORS).map(([key, divisor]) => (
                      <SelectItem key={key} value={key}>
                        {divisor.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <NumberField field="divisor" label="泡重系数" suffix="cm3/kg" />
              <NumberField field="ratePerKg" label="每公斤运价" suffix="/kg" step="0.01" />
              <NumberField field="minCharge" label="最低收费" suffix="元" step="0.01" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="fuelSurchargePercent" label="燃油附加" suffix="%" step="0.1" />
              <NumberField field="handlingFee" label="操作/杂费" suffix="元" step="0.01" />
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {divisorNote}。实际账单还可能包含偏远、旺季、安检、报关、超长超重等费用。
              </AlertDescription>
            </Alert>

            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={copySummary}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}
                {copied ? '已复制' : '复制测算摘要'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                <RotateCcw className="mr-2 h-4 w-4" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span>计费结果</span>
                <Badge variant={isVolumetric ? 'destructive' : 'secondary'}>
                  {isVolumetric ? '体积重计费' : '实重计费'}
                </Badge>
              </CardTitle>
              <CardDescription>
                抛重差 {formatNumber(result.weightDifferenceKg, 2)} kg · 总体积 {formatNumber(result.totalCbm, 3)} CBM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3">
                <ResultRow label="单箱体积" value={`${formatNumber(result.cartonCbm, 4)} CBM`} icon={Ruler} />
                <ResultRow label="总实重" value={`${formatNumber(result.actualWeightKg, 2)} kg`} icon={Truck} />
                <ResultRow label="单箱体积重" value={`${formatNumber(result.volumetricWeightPerCartonKg, 2)} kg`} icon={Plane} />
                <ResultRow label="单箱计费重" value={`${formatNumber(result.chargeableWeightPerCartonKg, 2)} kg`} icon={Scale} />
              </div>

              <WeightCompareBar
                actualWeight={result.actualWeightKg}
                volumetricWeight={result.volumetricWeightKg}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>费用拆分</CardTitle>
              <CardDescription>基础运费按计费重量乘以单价，并与最低收费取高</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ResultRow label="基础运费" value={formatMoney(result.baseFreight)} icon={Calculator} />
              <ResultRow label="燃油附加" value={formatMoney(result.fuelSurcharge)} icon={Fuel} />
              <ResultRow label="操作/杂费" value={formatMoney(result.handlingFee)} icon={Package} />
              <div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-emerald-800 dark:text-cyan-100">费用合计</span>
                  <span className="text-2xl font-bold text-emerald-900 dark:text-white">{formatMoney(result.totalCharge)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function ResultRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

function WeightCompareBar({
  actualWeight,
  volumetricWeight,
}: {
  actualWeight: number
  volumetricWeight: number
}) {
  const maxWeight = Math.max(actualWeight, volumetricWeight, 1)
  const actualWidth = Math.max(4, Math.min(100, actualWeight / maxWeight * 100))
  const volumetricWidth = Math.max(4, Math.min(100, volumetricWeight / maxWeight * 100))

  return (
    <div className="space-y-3 rounded-md border border-slate-200 p-4 dark:border-white/10">
      <CompareItem
        label="总实重"
        value={`${formatNumber(actualWeight, 2)} kg`}
        width={actualWidth}
        className="bg-slate-500"
      />
      <CompareItem
        label="总体积重"
        value={`${formatNumber(volumetricWeight, 2)} kg`}
        width={volumetricWidth}
        className="bg-emerald-500"
      />
    </div>
  )
}

function CompareItem({
  label,
  value,
  width,
  className,
}: {
  label: string
  value: string
  width: number
  className: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className={cn('h-full rounded-full', className)} style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
