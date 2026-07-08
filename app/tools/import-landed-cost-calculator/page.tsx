// 名称: 进口到岸成本计算器
// 描述: 按货值、运费、保险、关税、进口增值税和本地费用测算进口到岸成本
// 路径: Globokit/app/tools/import-landed-cost-calculator/page.tsx
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  DEFAULT_IMPORT_LANDED_COST_INPUTS,
  ImportCurrency,
  ImportLandedCostInputs,
  ImportLandedCostResult,
  calculateImportLandedCost,
} from '@/lib/tools/import-landed-cost-calculator'
import {
  Calculator,
  Check,
  ClipboardCopy,
  DollarSign,
  Info,
  Package,
  Percent,
  ReceiptText,
  RotateCcw,
  Ship,
  TrendingUp,
  Truck,
  Wallet,
} from 'lucide-react'

type NumericField = keyof ImportLandedCostInputs
type FormState = Record<NumericField, string> & {
  currency: ImportCurrency
}

const currencyOptions: Array<{ value: ImportCurrency; label: string; rate: string }> = [
  { value: 'USD', label: 'USD 美元', rate: '7.2' },
  { value: 'EUR', label: 'EUR 欧元', rate: '7.8' },
  { value: 'GBP', label: 'GBP 英镑', rate: '9.2' },
  { value: 'CNY', label: 'CNY 人民币', rate: '1' },
]

const initialForm: FormState = {
  quantity: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.quantity),
  unitPriceForeign: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.unitPriceForeign),
  exchangeRate: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.exchangeRate),
  internationalFreightForeign: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.internationalFreightForeign),
  insuranceForeign: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.insuranceForeign),
  otherForeignCost: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.otherForeignCost),
  dutyRatePercent: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.dutyRatePercent),
  vatRatePercent: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.vatRatePercent),
  customsFeeCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.customsFeeCny),
  portChargeCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.portChargeCny),
  domesticFreightCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.domesticFreightCny),
  otherLocalCostCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.otherLocalCostCny),
  targetSellingPriceCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.targetSellingPriceCny),
  currency: 'USD',
}

const presets: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '常规进口', values: initialForm },
  {
    label: '高税率商品',
    values: {
      currency: 'USD',
      quantity: '600',
      unitPriceForeign: '28',
      exchangeRate: '7.2',
      internationalFreightForeign: '1200',
      insuranceForeign: '150',
      otherForeignCost: '80',
      dutyRatePercent: '15',
      vatRatePercent: '13',
      customsFeeCny: '680',
      portChargeCny: '1800',
      domesticFreightCny: '1300',
      otherLocalCostCny: '300',
      targetSellingPriceCny: '268',
    },
  },
  {
    label: '人民币采购',
    values: {
      currency: 'CNY',
      quantity: '300',
      unitPriceForeign: '96',
      exchangeRate: '1',
      internationalFreightForeign: '2200',
      insuranceForeign: '120',
      otherForeignCost: '0',
      dutyRatePercent: '8',
      vatRatePercent: '13',
      customsFeeCny: '500',
      portChargeCny: '900',
      domesticFreightCny: '650',
      otherLocalCostCny: '150',
      targetSellingPriceCny: '148',
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

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function buildSummary(
  result: ImportLandedCostResult,
  currency: ImportCurrency,
  formatForeign: (value: number) => string
) {
  return [
    '进口到岸成本测算',
    `采购货值：${formatForeign(result.goodsValueForeign)}`,
    `CIF 折算：${formatCny(result.cifCny)}`,
    `关税：${formatCny(result.dutyCny)}`,
    `进口增值税：${formatCny(result.vatCny)}`,
    `清关与本地费用：${formatCny(result.localCostCny)}`,
    `到岸总成本：${formatCny(result.totalLandedCostCny)}`,
    `每件到岸成本：${formatCny(result.unitLandedCostCny)}`,
    `目标销售单价：${formatCny(result.targetSellingPriceCny)}`,
    `预估毛利率：${formatPercent(result.grossMarginPercent)}`,
    `采购币种：${currency}`,
  ].join('\n')
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

export default function ImportLandedCostCalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [copied, setCopied] = useState(false)

  const foreignFormatter = useMemo(
    () => new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: form.currency,
      maximumFractionDigits: 2,
    }),
    [form.currency]
  )

  const inputs = useMemo<ImportLandedCostInputs>(() => ({
    quantity: toNumber(form.quantity),
    unitPriceForeign: toNumber(form.unitPriceForeign),
    exchangeRate: toNumber(form.exchangeRate),
    internationalFreightForeign: toNumber(form.internationalFreightForeign),
    insuranceForeign: toNumber(form.insuranceForeign),
    otherForeignCost: toNumber(form.otherForeignCost),
    dutyRatePercent: toNumber(form.dutyRatePercent),
    vatRatePercent: toNumber(form.vatRatePercent),
    customsFeeCny: toNumber(form.customsFeeCny),
    portChargeCny: toNumber(form.portChargeCny),
    domesticFreightCny: toNumber(form.domesticFreightCny),
    otherLocalCostCny: toNumber(form.otherLocalCostCny),
    targetSellingPriceCny: toNumber(form.targetSellingPriceCny),
  }), [form])

  const result = useMemo(() => calculateImportLandedCost(inputs), [inputs])
  const maxCost = Math.max(...result.costBreakdown.map((row) => row.value), 1)

  const updateField = (field: NumericField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const applyPreset = (values: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...values }))
  }

  const resetForm = () => {
    setForm(initialForm)
  }

  const formatForeign = (value: number) => foreignFormatter.format(value)

  const copySummary = async () => {
    await navigator.clipboard.writeText(buildSummary(result, form.currency, formatForeign))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const resultCards: Array<{
    label: string
    value: string
    caption: string
    icon: ComponentType<{ className?: string }>
    tone?: string
  }> = [
    {
      label: '到岸总成本',
      value: formatCny(result.totalLandedCostCny),
      caption: 'CIF + 税费 + 本地费用',
      icon: Wallet,
    },
    {
      label: '每件到岸成本',
      value: formatCny(result.unitLandedCostCny),
      caption: `${result.quantity} 件平均分摊`,
      icon: Package,
    },
    {
      label: '税费合计',
      value: formatCny(result.totalTaxCny),
      caption: `关税 ${formatCny(result.dutyCny)} · 增值税 ${formatCny(result.vatCny)}`,
      icon: ReceiptText,
    },
    {
      label: '销售毛利率',
      value: formatPercent(result.grossMarginPercent),
      caption: `预估毛利 ${formatCny(result.grossProfitCny)}`,
      icon: TrendingUp,
      tone: result.grossProfitCny >= 0 ? 'text-emerald-600' : 'text-red-600',
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">进口到岸成本计算器</h1>
        <p className="text-muted-foreground">
          按货值、国际运费、保险、关税、进口增值税和本地清关费用，快速测算进口到岸总成本与每件成本。
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
                <div className={cn('text-2xl font-bold', card.tone)}>{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.caption}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  成本参数
                </CardTitle>
                <CardDescription>外币费用按汇率折算，本地清关与运输费用按人民币录入</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                <RotateCcw className="mr-2 h-4 w-4" />
                重置
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <div className="space-y-2">
                <Label htmlFor="currency">采购币种</Label>
                <Select
                  value={form.currency}
                  onValueChange={(value) => {
                    const selected = currencyOptions.find((option) => option.value === value)
                    setForm((current) => ({
                      ...current,
                      currency: value as ImportCurrency,
                      exchangeRate: selected?.rate ?? current.exchangeRate,
                    }))
                  }}
                >
                  <SelectTrigger id="currency" className="h-11">
                    <SelectValue placeholder="选择币种" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <NumberField field="quantity" label="进口数量" suffix="件" step="1" value={form.quantity} onValueChange={updateField} />
              <NumberField field="exchangeRate" label="折算汇率" suffix="CNY" step="0.0001" value={form.exchangeRate} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="unitPriceForeign" label="外币单价" suffix={form.currency} value={form.unitPriceForeign} onValueChange={updateField} />
              <NumberField field="internationalFreightForeign" label="国际运费" suffix={form.currency} value={form.internationalFreightForeign} onValueChange={updateField} />
              <NumberField field="insuranceForeign" label="保险费" suffix={form.currency} value={form.insuranceForeign} onValueChange={updateField} />
              <NumberField field="otherForeignCost" label="其他外币费用" suffix={form.currency} value={form.otherForeignCost} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="dutyRatePercent" label="进口关税率" suffix="%" value={form.dutyRatePercent} onValueChange={updateField} />
              <NumberField field="vatRatePercent" label="进口增值税率" suffix="%" value={form.vatRatePercent} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="customsFeeCny" label="报关/清关费" suffix="CNY" value={form.customsFeeCny} onValueChange={updateField} />
              <NumberField field="portChargeCny" label="港杂/查验费" suffix="CNY" value={form.portChargeCny} onValueChange={updateField} />
              <NumberField field="domesticFreightCny" label="国内运输费" suffix="CNY" value={form.domesticFreightCny} onValueChange={updateField} />
              <NumberField field="otherLocalCostCny" label="其他本地费用" suffix="CNY" value={form.otherLocalCostCny} onValueChange={updateField} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="targetSellingPriceCny" label="目标销售单价" suffix="CNY" value={form.targetSellingPriceCny} onValueChange={updateField} />
              <div className="rounded-md border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">采购货值</p>
                <p className="mt-2 text-xl font-semibold">{formatForeign(result.goodsValueForeign)}</p>
                <p className="mt-1 text-xs text-muted-foreground">外币费用合计 {formatForeign(result.foreignCostTotal)}</p>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                结果用于报价和预算测算，实际税费以报关单、税则归类、进口环节税单和财务口径为准。
              </AlertDescription>
            </Alert>

            <Button type="button" onClick={copySummary}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}
              {copied ? '已复制' : '复制测算摘要'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span>成本拆分</span>
                <Badge variant="secondary">{form.currency}</Badge>
              </CardTitle>
              <CardDescription>
                CIF {formatCny(result.cifCny)} · 本地费用 {formatCny(result.localCostCny)}
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
                      className={cn('h-full rounded-full', row.key === 'goods' ? 'bg-emerald-500' : row.key === 'vat' ? 'bg-amber-500' : 'bg-slate-500')}
                      style={{ width: `${Math.max(3, Math.min(100, row.value / maxCost * 100))}%` }}
                    />
                  </div>
                  <p className="text-right text-[11px] text-muted-foreground">{formatPercent(row.sharePercent)}</p>
                </div>
              ))}

              <div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-300/20 dark:bg-emerald-300/10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-100">到岸总成本</span>
                  <span className="text-2xl font-bold text-emerald-900 dark:text-white">{formatCny(result.totalLandedCostCny)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                到岸口径
              </CardTitle>
              <CardDescription>用于进口报价、销售定价和订单利润预估</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ResultRow label="CIF 折算" value={formatCny(result.cifCny)} icon={DollarSign} />
              <ResultRow label="增值税计税基数" value={formatCny(result.vatBaseCny)} icon={ReceiptText} />
              <ResultRow label="清关本地费用" value={formatCny(result.localCostCny)} icon={Truck} />
              <ResultRow label="每件到岸成本" value={formatCny(result.unitLandedCostCny)} icon={Package} />
              <ResultRow label="销售加价率" value={formatPercent(result.markupPercent)} icon={Percent} />
              <ResultRow label="销售收入" value={formatCny(result.salesRevenueCny)} icon={Wallet} />
              <ResultRow label="进口数量" value={`${formatNumber(result.quantity, 0)} 件`} icon={Calculator} />
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
