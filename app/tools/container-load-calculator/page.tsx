// 名称: 装柜/箱规计算器
// 描述: 根据纸箱尺寸、毛重、数量和柜型估算装柜数量与空间利用率
// 路径: Globokit/app/tools/container-load-calculator/page.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

'use client'

import { useMemo, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  Boxes,
  Check,
  ClipboardCopy,
  Container,
  Info,
  PackageCheck,
  RotateCcw,
  Ruler,
  Truck,
  Weight,
} from 'lucide-react'
import {
  calculateContainerLoad,
  CONTAINER_SPECS,
  ContainerType,
  DEFAULT_CARTON_INPUTS,
} from '@/lib/tools/container-load-calculator'

type NumericField = 'lengthCm' | 'widthCm' | 'heightCm' | 'grossWeightKg' | 'quantity'
type FormState = Record<NumericField, string> & {
  containerType: ContainerType
}

const initialForm: FormState = {
  lengthCm: String(DEFAULT_CARTON_INPUTS.lengthCm),
  widthCm: String(DEFAULT_CARTON_INPUTS.widthCm),
  heightCm: String(DEFAULT_CARTON_INPUTS.heightCm),
  grossWeightKg: String(DEFAULT_CARTON_INPUTS.grossWeightKg),
  quantity: String(DEFAULT_CARTON_INPUTS.quantity),
  containerType: DEFAULT_CARTON_INPUTS.containerType,
}

const presets: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '常规中箱', values: initialForm },
  { label: '小件轻货', values: { lengthCm: '35', widthCm: '25', heightCm: '20', grossWeightKg: '4', quantity: '3200', containerType: '40HQ' } },
  { label: '大箱抛货', values: { lengthCm: '80', widthCm: '55', heightCm: '45', grossWeightKg: '9', quantity: '800', containerType: '40HQ' } },
  { label: '重货保守', values: { lengthCm: '45', widthCm: '35', heightCm: '28', grossWeightKg: '28', quantity: '900', containerType: '20GP' } },
]

function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

function NumberField({
  field,
  label,
  suffix,
  value,
  onValueChange,
  step = '1',
}: {
  field: NumericField
  label: string
  suffix: string
  value: string
  onValueChange: (field: NumericField, value: string) => void
  step?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <div className="relative">
        <Input
          id={field}
          type="text"
          inputMode={step === '1' ? 'numeric' : 'decimal'}
          pattern="[0-9]*[.]?[0-9]*"
          value={value}
          onChange={(event) => onValueChange(field, event.target.value)}
          className="h-11 pr-20 font-medium leading-normal tabular-nums"
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex max-w-14 items-center justify-end text-right text-xs text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  )
}

export default function ContainerLoadCalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [copied, setCopied] = useState(false)

  const inputs = useMemo(() => ({
    lengthCm: toNumber(form.lengthCm),
    widthCm: toNumber(form.widthCm),
    heightCm: toNumber(form.heightCm),
    grossWeightKg: toNumber(form.grossWeightKg),
    quantity: toNumber(form.quantity),
    containerType: form.containerType,
  }), [form])

  const result = useMemo(() => calculateContainerLoad(inputs), [inputs])
  const isWeightLimited = result.limitingFactor === 'weight'
  const doesNotFit = !result.fitsContainer

  const updateField = (field: NumericField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const applyPreset = (values: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...values }))
  }

  const resetForm = () => {
    setForm(initialForm)
  }

  const copySummary = async () => {
    const summary = [
      '装柜/箱规测算',
      `柜型：${result.container.name}`,
      `纸箱尺寸：${form.lengthCm} x ${form.widthCm} x ${form.heightCm} cm`,
      `单箱毛重：${form.grossWeightKg} kg`,
      `总箱数：${formatNumber(Number(result.bestOrientation.cartons ? toNumber(form.quantity) : 0))}`,
      `单箱体积：${result.cartonCbm} CBM`,
      `总体积：${result.totalCbm} CBM`,
      `总毛重：${formatNumber(result.totalWeightKg, 1)} kg`,
      `单柜可装：${formatNumber(result.maxCartonsPerContainer)} 箱`,
      `预计柜数：${result.requiredContainers} 柜`,
      `末柜箱数：${formatNumber(result.lastContainerCartons)} 箱`,
      `限制因素：${doesNotFit ? '纸箱尺寸无法装入' : isWeightLimited ? '重量' : '体积/摆放'}`,
    ].join('\n')

    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const resultCards = [
    {
      label: '单箱体积',
      value: `${result.cartonCbm} CBM`,
      caption: '按外箱尺寸计算',
      icon: Boxes,
    },
    {
      label: '总体积',
      value: `${result.totalCbm} CBM`,
      caption: `${formatNumber(result.totalWeightKg, 1)} kg 总毛重`,
      icon: PackageCheck,
    },
    {
      label: '单柜可装',
      value: `${formatNumber(result.maxCartonsPerContainer)} 箱`,
      caption: doesNotFit ? '纸箱尺寸无法装入' : `${isWeightLimited ? '重量' : '摆放/体积'}限制`,
      icon: Container,
    },
    {
      label: '预计柜数',
      value: `${result.requiredContainers} 柜`,
      caption: `末柜 ${formatNumber(result.lastContainerCartons)} 箱`,
      icon: Truck,
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">装柜/箱规计算器</h1>
        <p className="text-muted-foreground">
          根据纸箱尺寸、单箱毛重和总箱数估算整柜装载数量、柜数和利用率
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
            <CardTitle>装柜参数</CardTitle>
            <CardDescription>输入外箱尺寸和订单箱数，柜型参数按常见内尺寸估算</CardDescription>
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

            <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
              <NumberField field="lengthCm" label="外箱长" suffix="cm" value={form.lengthCm} onValueChange={updateField} />
              <NumberField field="widthCm" label="外箱宽" suffix="cm" value={form.widthCm} onValueChange={updateField} />
              <NumberField field="heightCm" label="外箱高" suffix="cm" value={form.heightCm} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
              <NumberField field="grossWeightKg" label="单箱毛重" suffix="kg" step="0.1" value={form.grossWeightKg} onValueChange={updateField} />
              <NumberField field="quantity" label="总箱数" suffix="箱" value={form.quantity} onValueChange={updateField} />
              <div className="space-y-2">
                <Label htmlFor="containerType">柜型</Label>
                <Select
                  value={form.containerType}
                  onValueChange={(value) => setForm((current) => ({ ...current, containerType: value as ContainerType }))}
                >
                  <SelectTrigger id="containerType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CONTAINER_SPECS).map((container) => (
                      <SelectItem key={container.type} value={container.type}>
                        {container.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                结果为规则摆放估算，未考虑托盘、纸箱变形、装卸间隙、限重法规和船公司具体柜况。
              </AlertDescription>
            </Alert>

            {doesNotFit && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  当前纸箱在所有旋转方向下都无法通过所选柜型内尺寸，请调整包装尺寸或运输方案。
                </AlertDescription>
              </Alert>
            )}

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
                <span>装载结果</span>
                <Badge variant={doesNotFit || isWeightLimited ? 'destructive' : 'secondary'}>
                  {doesNotFit ? '无法装入' : isWeightLimited ? '重量限制' : '体积/摆放限制'}
                </Badge>
              </CardTitle>
              <CardDescription>{result.container.name} · {result.container.lengthCm} x {result.container.widthCm} x {result.container.heightCm} cm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3">
                <ResultRow label="最佳摆放方向" value={`${result.bestOrientation.lengthCm} x ${result.bestOrientation.widthCm} x ${result.bestOrientation.heightCm} cm`} />
                <ResultRow label="长宽高排布" value={`${result.bestOrientation.countLength} x ${result.bestOrientation.countWidth} x ${result.bestOrientation.countHeight}`} />
                <ResultRow label="按摆放可装" value={`${formatNumber(result.bestOrientation.cartons)} 箱/柜`} />
                <ResultRow label="按重量可装" value={`${formatNumber(result.maxByWeight)} 箱/柜`} />
              </div>

              <div className="space-y-3">
                <UtilizationBar label="体积利用率" value={result.volumeUtilizationPercent} />
                <UtilizationBar label="载重利用率" value={result.weightUtilizationPercent} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>常用柜型参数</CardTitle>
              <CardDescription>按常见内尺寸和最大载重估算，实际以订舱数据为准</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.values(CONTAINER_SPECS).map((container) => (
                <div
                  key={container.type}
                  className={cn(
                    'rounded-md border p-3 text-sm',
                    form.containerType === container.type ? 'border-emerald-200 bg-emerald-50/70' : 'border-gray-200'
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="font-semibold">{container.name}</span>
                    <span className="text-xs text-muted-foreground">{container.volumeCbm} CBM</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{container.lengthCm} x {container.widthCm} x {container.heightCm} cm</span>
                    <span className="flex items-center gap-1"><Weight className="h-3.5 w-3.5" />{formatNumber(container.maxPayloadKg)} kg</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}

function UtilizationBar({ label, value }: { label: string; value: number }) {
  const width = Math.max(0, Math.min(100, value))

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{formatPercent(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
