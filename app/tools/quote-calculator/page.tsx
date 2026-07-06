// 名称: 外贸报价利润计算器
// 描述: 根据采购成本、费用、汇率、佣金和目标利润率计算外贸报价
// 路径: Globokit/app/tools/quote-calculator/page.tsx
// 作者: Jensfrank
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  calculateQuote,
  DEFAULT_QUOTE_INPUTS,
  QuoteInputs,
  QuoteMode,
  QuoteResult,
} from '@/lib/tools/quote-calculator'
import {
  Calculator,
  Check,
  Copy,
  DollarSign,
  Info,
  Package,
  Percent,
  ReceiptText,
  RefreshCw,
  TrendingUp,
} from 'lucide-react'

type QuoteCurrency = 'USD' | 'EUR' | 'GBP' | 'CNY'
type NumericField = keyof QuoteInputs
type FormState = Record<NumericField, string> & {
  currency: QuoteCurrency
}

const currencyOptions: Array<{ value: QuoteCurrency; label: string; rate: string }> = [
  { value: 'USD', label: 'USD 美元', rate: '7.2' },
  { value: 'EUR', label: 'EUR 欧元', rate: '7.8' },
  { value: 'GBP', label: 'GBP 英镑', rate: '9.2' },
  { value: 'CNY', label: 'CNY 人民币', rate: '1' },
]

const initialForm: FormState = {
  unitCostCny: String(DEFAULT_QUOTE_INPUTS.unitCostCny),
  quantity: String(DEFAULT_QUOTE_INPUTS.quantity),
  domesticFeeCny: String(DEFAULT_QUOTE_INPUTS.domesticFeeCny),
  exportFeeCny: String(DEFAULT_QUOTE_INPUTS.exportFeeCny),
  internationalFreightCny: String(DEFAULT_QUOTE_INPUTS.internationalFreightCny),
  exchangeRate: String(DEFAULT_QUOTE_INPUTS.exchangeRate),
  targetMarginPercent: String(DEFAULT_QUOTE_INPUTS.targetMarginPercent),
  sellingPriceForeign: String(DEFAULT_QUOTE_INPUTS.sellingPriceForeign),
  commissionPercent: String(DEFAULT_QUOTE_INPUTS.commissionPercent),
  paymentFeePercent: String(DEFAULT_QUOTE_INPUTS.paymentFeePercent),
  rebatePercent: String(DEFAULT_QUOTE_INPUTS.rebatePercent),
  vatPercent: String(DEFAULT_QUOTE_INPUTS.vatPercent),
  currency: 'USD',
}

const scenarioPresets: Array<{
  label: string
  mode: QuoteMode
  values: Partial<FormState>
}> = [
  {
    label: 'FOB 常规',
    mode: 'target-margin',
    values: {
      domesticFeeCny: '300',
      exportFeeCny: '180',
      internationalFreightCny: '0',
      commissionPercent: '0',
      paymentFeePercent: '1',
      targetMarginPercent: '22',
    },
  },
  {
    label: 'CIF 含运费',
    mode: 'target-margin',
    values: {
      domesticFeeCny: '300',
      exportFeeCny: '180',
      internationalFreightCny: '650',
      commissionPercent: '0',
      paymentFeePercent: '1.5',
      targetMarginPercent: '25',
    },
  },
  {
    label: '平台订单',
    mode: 'known-price',
    values: {
      commissionPercent: '5',
      paymentFeePercent: '2.5',
      sellingPriceForeign: '12',
      internationalFreightCny: '650',
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

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

function formatCny(value: number) {
  return cnyFormatter.format(value)
}

function buildSummary(result: QuoteResult, currency: QuoteCurrency, formatForeign: (value: number) => string) {
  return [
    '外贸报价利润测算',
    `建议/当前单价：${formatForeign(result.quotedUnitPriceForeign)}`,
    `盈亏平衡单价：${formatForeign(result.breakevenUnitPriceForeign)}`,
    `订单总额：${formatForeign(result.totalQuoteForeign)}`,
    `人民币收入：${formatCny(result.revenueCny)}`,
    `预估利润：${formatCny(result.profitCny)}`,
    `销售利润率：${formatPercent(result.marginPercent)}`,
    `报价币种：${currency}`,
  ].join('\n')
}

export default function QuoteCalculatorPage() {
  const [mode, setMode] = useState<QuoteMode>('target-margin')
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

  const inputs = useMemo<QuoteInputs>(() => ({
    unitCostCny: toNumber(form.unitCostCny),
    quantity: toNumber(form.quantity),
    domesticFeeCny: toNumber(form.domesticFeeCny),
    exportFeeCny: toNumber(form.exportFeeCny),
    internationalFreightCny: toNumber(form.internationalFreightCny),
    exchangeRate: toNumber(form.exchangeRate),
    targetMarginPercent: toNumber(form.targetMarginPercent),
    sellingPriceForeign: toNumber(form.sellingPriceForeign),
    commissionPercent: toNumber(form.commissionPercent),
    paymentFeePercent: toNumber(form.paymentFeePercent),
    rebatePercent: toNumber(form.rebatePercent),
    vatPercent: toNumber(form.vatPercent),
  }), [form])

  const calculation = useMemo(() => {
    try {
      return {
        result: calculateQuote(inputs, mode),
        error: '',
      }
    } catch (error) {
      return {
        result: null,
        error: error instanceof Error ? error.message : '报价参数无法计算，请检查输入',
      }
    }
  }, [inputs, mode])

  const result = calculation.result

  const updateField = (field: NumericField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const applyPreset = (values: Partial<FormState>, nextMode: QuoteMode) => {
    setMode(nextMode)
    setForm((current) => ({ ...current, ...values }))
  }

  const resetForm = () => {
    setMode('target-margin')
    setForm(initialForm)
  }

  const formatForeign = (value: number) => foreignFormatter.format(value)

  const copySummary = async () => {
    if (!result) return

    await navigator.clipboard.writeText(buildSummary(result, form.currency, formatForeign))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const NumberField = ({
    field,
    label,
    suffix,
    step = '0.01',
    min = '0',
  }: {
    field: NumericField
    label: string
    suffix?: string
    step?: string
    min?: string
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <div className="relative">
        <Input
          id={field}
          type="number"
          min={min}
          step={step}
          value={form[field]}
          onChange={(event) => updateField(field, event.target.value)}
          className={cn(suffix && 'pr-16')}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )

  const costRows = result
    ? [
        { label: '采购成本', value: result.totalProductCostCny },
        { label: '内陆费用', value: toNumber(form.domesticFeeCny) },
        { label: '出口杂费', value: toNumber(form.exportFeeCny) },
        { label: '国际运费', value: toNumber(form.internationalFreightCny) },
        { label: '退税抵扣', value: -result.rebateAmountCny },
      ]
    : []

  const maxCost = Math.max(...costRows.map((row) => Math.abs(row.value)), 1)

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">外贸报价利润计算器</h1>
        <p className="text-muted-foreground">
          结合采购成本、运费、汇率、佣金和目标利润率，快速测算 FOB/CIF 等报价区间。
        </p>
      </div>

      {calculation.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{calculation.error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" />
                报价单价
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatForeign(result.quotedUnitPriceForeign)}</div>
              <p className="text-xs text-muted-foreground">每件商品</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Percent className="h-4 w-4" />
                销售利润率
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn('text-2xl font-bold', result.marginPercent >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                {formatPercent(result.marginPercent)}
              </div>
              <p className="text-xs text-muted-foreground">按销售额口径</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                预估利润
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn('text-2xl font-bold', result.profitCny >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                {formatCny(result.profitCny)}
              </div>
              <p className="text-xs text-muted-foreground">扣除费用后</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4" />
                订单数量
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{result.quantity}</div>
              <p className="text-xs text-muted-foreground">件 / 套</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  报价参数
                </CardTitle>
                <CardDescription>输入成本、费用和报价口径，结果会自动刷新</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={resetForm}>
                <RefreshCw className="mr-2 h-4 w-4" />
                重置
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={mode} onValueChange={(value) => setMode(value as QuoteMode)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="target-margin">按目标利润反推</TabsTrigger>
                <TabsTrigger value="known-price">按已知售价核算</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              {scenarioPresets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.values, preset.mode)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NumberField field="unitCostCny" label="单件采购成本" suffix="CNY" />
              <NumberField field="quantity" label="订单数量" suffix="件" step="1" />
              <NumberField field="domesticFeeCny" label="内陆费用" suffix="CNY" />
              <NumberField field="exportFeeCny" label="出口杂费" suffix="CNY" />
              <NumberField field="internationalFreightCny" label="国际运费" suffix="CNY" />
              <NumberField field="rebatePercent" label="出口退税率" suffix="%" />
              <NumberField field="vatPercent" label="增值税率" suffix="%" />
              <NumberField field="commissionPercent" label="佣金比例" suffix="%" />
              <NumberField field="paymentFeePercent" label="收款手续费" suffix="%" />
              {mode === 'target-margin' ? (
                <NumberField field="targetMarginPercent" label="目标利润率" suffix="%" />
              ) : (
                <NumberField field="sellingPriceForeign" label="已知销售单价" suffix={form.currency} />
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">报价币种</Label>
                <Select
                  value={form.currency}
                  onValueChange={(value) => {
                    const selected = currencyOptions.find((option) => option.value === value)
                    setForm((current) => ({
                      ...current,
                      currency: value as QuoteCurrency,
                      exchangeRate: selected?.rate ?? current.exchangeRate,
                    }))
                  }}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="选择报价币种" />
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
              <NumberField field="exchangeRate" label="汇率" suffix="CNY" step="0.0001" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ReceiptText className="h-5 w-5" />
                    报价结果
                  </CardTitle>
                  <CardDescription>以当前参数测算出的单价、利润和成本结构</CardDescription>
                </div>
                {result && (
                  <Button variant="outline" size="sm" onClick={copySummary}>
                    {copied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copied ? '已复制' : '复制'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-5">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-emerald-800">
                        {mode === 'target-margin' ? '建议报价单价' : '当前报价单价'}
                      </span>
                      <Badge variant="outline" className="border-0 bg-white text-emerald-700 shadow-sm">
                        {form.currency}
                      </Badge>
                    </div>
                    <div className="mt-3 text-4xl font-bold text-emerald-700">
                      {formatForeign(result.quotedUnitPriceForeign)}
                    </div>
                    <p className="mt-2 text-sm text-emerald-800/80">
                      盈亏平衡单价 {formatForeign(result.breakevenUnitPriceForeign)}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">订单总额</p>
                      <p className="mt-1 text-lg font-semibold">{formatForeign(result.totalQuoteForeign)}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">人民币收入</p>
                      <p className="mt-1 text-lg font-semibold">{formatCny(result.revenueCny)}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">综合成本</p>
                      <p className="mt-1 text-lg font-semibold">{formatCny(result.effectiveCostCny)}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">加价率</p>
                      <p className="mt-1 text-lg font-semibold">{formatPercent(result.markupPercent)}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">成本拆分</h3>
                      <span className="text-xs text-muted-foreground">退税按含税采购价估算</span>
                    </div>
                    <div className="space-y-3">
                      {costRows.map((row) => (
                        <div key={row.label} className="space-y-1">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">{row.label}</span>
                            <span className={cn('font-medium', row.value < 0 && 'text-emerald-600')}>
                              {formatCny(row.value)}
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn('h-full rounded-full', row.value < 0 ? 'bg-emerald-500' : 'bg-slate-500')}
                              style={{ width: `${Math.max(4, Math.min(100, Math.abs(row.value) / maxCost * 100))}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  调整参数后查看报价测算结果
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5" />
                报价口径提示
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• 销售利润率按利润除以销售额计算，适合报价时控制毛利底线。</p>
              <p>• 退税金额按含税采购价、增值税率和退税率估算，实际申报以财务口径为准。</p>
              <p>• CIF、DDP 等含运费或含税条款，建议先确认费用责任再输入对应费用。</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}
