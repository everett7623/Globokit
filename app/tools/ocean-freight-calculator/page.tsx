// 名称: 海运费用拆分计算器
// 描述: 按海运费、港杂、报关、保险和目的港费用测算海运成本摊销
// 路径: Globokit/app/tools/ocean-freight-calculator/page.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-08

'use client'

import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Boxes,
  Calculator,
  Check,
  ClipboardCopy,
  Container,
  FileText,
  Info,
  Package,
  RotateCcw,
  ShieldCheck,
  Ship,
  Truck,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DEFAULT_OCEAN_FREIGHT_INPUTS,
  OceanFreightInputs,
  OceanFreightMode,
  calculateOceanFreight,
} from '@/lib/tools/ocean-freight-calculator'

type NumericField = Exclude<keyof OceanFreightInputs, 'mode'>
type FormState = Record<NumericField, string> & {
  mode: OceanFreightMode
}

const initialForm: FormState = {
  mode: DEFAULT_OCEAN_FREIGHT_INPUTS.mode,
  quantity: String(DEFAULT_OCEAN_FREIGHT_INPUTS.quantity),
  totalCbm: String(DEFAULT_OCEAN_FREIGHT_INPUTS.totalCbm),
  totalWeightKg: String(DEFAULT_OCEAN_FREIGHT_INPUTS.totalWeightKg),
  containerCount: String(DEFAULT_OCEAN_FREIGHT_INPUTS.containerCount),
  minChargeableCbm: String(DEFAULT_OCEAN_FREIGHT_INPUTS.minChargeableCbm),
  oceanFreightForeign: String(DEFAULT_OCEAN_FREIGHT_INPUTS.oceanFreightForeign),
  destinationChargeForeign: String(DEFAULT_OCEAN_FREIGHT_INPUTS.destinationChargeForeign),
  exchangeRate: String(DEFAULT_OCEAN_FREIGHT_INPUTS.exchangeRate),
  originChargesCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.originChargesCny),
  truckingFeeCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.truckingFeeCny),
  customsFeeCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.customsFeeCny),
  documentFeeCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.documentFeeCny),
  cargoValueCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.cargoValueCny),
  insuranceRatePercent: String(DEFAULT_OCEAN_FREIGHT_INPUTS.insuranceRatePercent),
}

const presets: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '40HQ 整柜', values: initialForm },
  {
    label: '20GP 重货',
    values: {
      mode: 'fcl',
      quantity: '780',
      totalCbm: '26',
      totalWeightKg: '21800',
      containerCount: '1',
      oceanFreightForeign: '1250',
      destinationChargeForeign: '280',
      originChargesCny: '1600',
      truckingFeeCny: '1450',
      customsFeeCny: '450',
      documentFeeCny: '300',
      cargoValueCny: '96000',
    },
  },
  {
    label: '拼箱小批量',
    values: {
      mode: 'lcl',
      quantity: '80',
      totalCbm: '4.5',
      totalWeightKg: '620',
      minChargeableCbm: '5',
      oceanFreightForeign: '420',
      destinationChargeForeign: '160',
      originChargesCny: '900',
      truckingFeeCny: '300',
      customsFeeCny: '350',
      documentFeeCny: '260',
      cargoValueCny: '28000',
    },
  },
]

const cnyFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 2,
})

function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatCny(value: number) {
  return cnyFormatter.format(value)
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function NumberField({
  field,
  label,
  suffix,
  value,
  onValueChange,
  step = '0.01',
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

export default function OceanFreightCalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [copied, setCopied] = useState(false)

  const inputs = useMemo<OceanFreightInputs>(() => ({
    mode: form.mode,
    quantity: toNumber(form.quantity),
    totalCbm: toNumber(form.totalCbm),
    totalWeightKg: toNumber(form.totalWeightKg),
    containerCount: toNumber(form.containerCount),
    minChargeableCbm: toNumber(form.minChargeableCbm),
    oceanFreightForeign: toNumber(form.oceanFreightForeign),
    destinationChargeForeign: toNumber(form.destinationChargeForeign),
    exchangeRate: toNumber(form.exchangeRate),
    originChargesCny: toNumber(form.originChargesCny),
    truckingFeeCny: toNumber(form.truckingFeeCny),
    customsFeeCny: toNumber(form.customsFeeCny),
    documentFeeCny: toNumber(form.documentFeeCny),
    cargoValueCny: toNumber(form.cargoValueCny),
    insuranceRatePercent: toNumber(form.insuranceRatePercent),
  }), [form])

  const result = useMemo(() => calculateOceanFreight(inputs), [inputs])
  const maxCost = Math.max(...result.costBreakdown.map((row) => row.value), 1)

  const updateField = (field: NumericField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateMode = (mode: OceanFreightMode) => {
    setForm((current) => ({ ...current, mode }))
  }

  const applyPreset = (values: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...values }))
  }

  const resetForm = () => {
    setForm(initialForm)
  }

  const copySummary = async () => {
    const summary = [
      '海运费用拆分测算',
      `运输方式：${result.modeLabel}`,
      `数量：${result.quantity} 件`,
      `计费体积：${formatNumber(result.chargeableCbm, 3)} CBM`,
      `总毛重：${formatNumber(toNumber(form.totalWeightKg), 2)} kg`,
      `海运费：${formatCny(result.freightCny)}`,
      `目的港费用：${formatCny(result.destinationChargeCny)}`,
      `起运端费用：${formatCny(result.originSubtotalCny)}`,
      `保险费：${formatCny(result.insuranceFeeCny)}`,
      `总费用：${formatCny(result.totalCostCny)}`,
      `每CBM：${formatCny(result.perCbmCny)}`,
      `每件摊费：${formatCny(result.perCartonCny)}`,
    ].join('\n')

    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const resultCards: Array<{
    label: string
    value: string
    caption: string
    icon: ComponentType<{ className?: string }>
  }> = [
    {
      label: '费用合计',
      value: formatCny(result.totalCostCny),
      caption: `${result.modeLabel} 全链路估算`,
      icon: Wallet,
    },
    {
      label: '每 CBM 成本',
      value: formatCny(result.perCbmCny),
      caption: `计费 ${formatNumber(result.chargeableCbm, 3)} CBM`,
      icon: Boxes,
    },
    {
      label: '每件摊费',
      value: formatCny(result.perCartonCny),
      caption: `${result.quantity} 件平均分摊`,
      icon: Package,
    },
    {
      label: form.mode === 'fcl' ? '每柜费用' : '每公斤费用',
      value: form.mode === 'fcl' ? formatCny(result.perContainerCny) : formatCny(result.perKgCny),
      caption: form.mode === 'fcl' ? `${form.containerCount || '1'} 柜分摊` : `${formatNumber(result.weightTon, 3)} 吨毛重`,
      icon: form.mode === 'fcl' ? Container : Truck,
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">海运费用拆分计算器</h1>
        <p className="text-muted-foreground">
          汇总海运费、起运港杂费、拖车、报关、保险和目的港费用，快速折算每件、每 CBM 与每柜成本。
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              费用参数
            </CardTitle>
            <CardDescription>美元费用按汇率折算为人民币，本地费用直接按人民币录入</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={form.mode} onValueChange={(value) => updateMode(value as OceanFreightMode)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fcl">整柜 FCL</TabsTrigger>
                <TabsTrigger value="lcl">拼箱 LCL</TabsTrigger>
              </TabsList>
            </Tabs>

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
              <NumberField field="quantity" label="货物数量" suffix="件" step="1" value={form.quantity} onValueChange={updateField} />
              <NumberField field="totalCbm" label="总体积" suffix="CBM" value={form.totalCbm} onValueChange={updateField} />
              <NumberField field="totalWeightKg" label="总毛重" suffix="kg" value={form.totalWeightKg} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
              {form.mode === 'fcl' ? (
                <NumberField field="containerCount" label="柜数" suffix="柜" step="1" value={form.containerCount} onValueChange={updateField} />
              ) : (
                <NumberField field="minChargeableCbm" label="最低计费" suffix="CBM" value={form.minChargeableCbm} onValueChange={updateField} />
              )}
              <NumberField field="exchangeRate" label="美元汇率" suffix="CNY" step="0.0001" value={form.exchangeRate} onValueChange={updateField} />
              <NumberField field="oceanFreightForeign" label="海运费合计" suffix="USD" value={form.oceanFreightForeign} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="originChargesCny" label="起运港杂费" suffix="CNY" value={form.originChargesCny} onValueChange={updateField} />
              <NumberField field="destinationChargeForeign" label="目的港费用" suffix="USD" value={form.destinationChargeForeign} onValueChange={updateField} />
              <NumberField field="truckingFeeCny" label="拖车/内陆运输" suffix="CNY" value={form.truckingFeeCny} onValueChange={updateField} />
              <NumberField field="customsFeeCny" label="报关费用" suffix="CNY" value={form.customsFeeCny} onValueChange={updateField} />
              <NumberField field="documentFeeCny" label="文件/操作费" suffix="CNY" value={form.documentFeeCny} onValueChange={updateField} />
              <NumberField field="cargoValueCny" label="货值" suffix="CNY" value={form.cargoValueCny} onValueChange={updateField} />
              <NumberField field="insuranceRatePercent" label="保险费率" suffix="%" value={form.insuranceRatePercent} onValueChange={updateField} />
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                结果用于报价前快速拆分成本，未包含查验、滞港、甩柜、仓储、超重和特殊品名附加费。
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
                <span>费用拆分</span>
                <Badge variant="secondary">{result.modeLabel}</Badge>
              </CardTitle>
              <CardDescription>
                起运端 {formatCny(result.originSubtotalCny)} · 目的港 {formatCny(result.destinationChargeCny)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.costBreakdown.map((row) => (
                <div key={row.key} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{formatCny(row.value)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn('h-full rounded-full', row.key === 'freight' ? 'bg-cyan-500' : 'bg-slate-500')}
                      style={{ width: `${Math.max(4, Math.min(100, row.value / maxCost * 100))}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="rounded-md border border-cyan-200 bg-cyan-50/80 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-cyan-800 dark:text-cyan-100">总费用</span>
                  <span className="text-2xl font-bold text-cyan-900 dark:text-white">{formatCny(result.totalCostCny)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                摊销口径
              </CardTitle>
              <CardDescription>用于报价、利润核算和多批次费用对比</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ResultRow label="计费体积" value={`${formatNumber(result.chargeableCbm, 3)} CBM`} icon={Boxes} />
              <ResultRow label="毛重吨位" value={`${formatNumber(result.weightTon, 3)} 吨`} icon={Truck} />
              <ResultRow label="每公斤费用" value={formatCny(result.perKgCny)} icon={Package} />
              <ResultRow label="每件摊费" value={formatCny(result.perCartonCny)} icon={Calculator} />
              <ResultRow label="保险费用" value={formatCny(result.insuranceFeeCny)} icon={ShieldCheck} />
              <ResultRow label="文件与操作" value={formatCny(toNumber(form.documentFeeCny))} icon={FileText} />
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
