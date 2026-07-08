// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持生成交易卡片
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-07-06

'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  AlertTriangle,
  Calendar,
  Calculator,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Gauge,
  Info,
  Percent,
  ReceiptText,
  RefreshCw,
  RotateCcw,
  Server,
  Tag,
  TrendingDown,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import {
  fetchExchangeRates,
  calculateVPSValue,
  formatCurrency,
  formatDate,
  SUPPORTED_CURRENCIES,
  RENEWAL_PERIODS,
  type CalculationResult,
  type PriceMode
} from '@/lib/tools/vps-calculator'
import html2canvas from 'html2canvas'

const quickDiscounts = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6, 0.5]

export default function VPSCalculatorPage() {
  const [purchaseDate, setPurchaseDate] = useState('')
  const [tradeDate, setTradeDate] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState('36')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  const [modeInput, setModeInput] = useState('')
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [generatingImg, setGeneratingImg] = useState(false)
  const [rateError, setRateError] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const loadExchangeRates = useCallback(async () => {
    const rates = await fetchExchangeRates()
    if (!rates || Object.keys(rates).length === 0) {
      setRateError(true)
      return
    }

    setRateError(false)
    setExchangeRates(rates)
  }, [])

  const handleCalculate = useCallback(() => {
    const priceNum = Number.parseFloat(purchasePrice)
    if (!priceNum || !purchaseDate) return

    let value = Number.parseFloat(modeInput)
    if (modeInput === '' || Number.isNaN(value)) {
      if (priceMode === 'total') value = -1
      if (priceMode === 'premium') value = 0
      if (priceMode === 'discount') value = 1
    }

    const nextResult = calculateVPSValue(
      purchaseDate,
      Number.parseInt(renewalPeriod),
      priceNum,
      currency,
      value,
      priceMode,
      exchangeRates,
      tradeDate
    )

    if (nextResult.totalDays > 0 && !Number.isNaN(nextResult.remainingValue)) {
      setResult(nextResult)
    }
  }, [currency, exchangeRates, modeInput, priceMode, purchaseDate, purchasePrice, renewalPeriod, tradeDate])

  useEffect(() => {
    setTradeDate(today)
    loadExchangeRates()
  }, [loadExchangeRates, today])

  useEffect(() => {
    if (purchasePrice && purchaseDate && tradeDate) {
      const timer = window.setTimeout(handleCalculate, 300)
      return () => window.clearTimeout(timer)
    }
  }, [handleCalculate, purchaseDate, purchasePrice, tradeDate])

  const handleReset = () => {
    setPurchaseDate('')
    setTradeDate(today)
    setPurchasePrice('')
    setModeInput('')
    setPriceMode('total')
    setResult(null)
  }

  const exportToMarkdown = () => {
    if (!result) return

    const symbol = SUPPORTED_CURRENCIES.find((item) => item.code === currency)?.symbol
    const cycleLabel = RENEWAL_PERIODS.find((item) => item.value === Number.parseInt(renewalPeriod))?.label
    const isProfit = result.premium >= 0
    const profitSign = isProfit ? '+' : ''
    const profitLabel = isProfit ? '溢价收益' : '折价损失'
    const now = new Date()
    const formattedTime = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    const markdown = `
# VPS 剩余价值计算结果

| 分类 | 项目 | 数值 | 说明 |
| :--- | :--- | :--- | :--- |
| **价格信息** | 原购价格 | ${symbol}${purchasePrice} | 约 ¥${formatCurrency(result.purchasePriceCNY)} |
| | 期望售价 | ¥${formatCurrency(result.expectedPrice)} | 人民币计价 |
| | 剩余价值 | ¥${formatCurrency(result.remainingValue)} | 当前估值 |
| | ${profitLabel} | ${profitSign}¥${formatCurrency(result.premium)} | 预期${isProfit ? '盈利' : '亏损'} |
| | 投资回报率 | ${profitSign}${result.premiumPercent.toFixed(2)}% | ROI 指标 |
| **时间信息** | 购买日期 | ${purchaseDate} | 起始时间 |
| | 续费周期 | ${cycleLabel} | 服务期限 |
| | 到期日期 | ${formatDate(new Date(result.expireDate))} | 截止时间 |
| | 总使用期限 | ${result.totalDays} 天 | 完整周期 |
| | 已使用时间 | ${result.usedDays} 天 | 已消耗时间 |
| | 剩余时间 | ${result.remainingDays} 天 | 可用时间 |
| | 使用进度 | ${((1 - result.remainingRatio) * 100).toFixed(0)}% | 完成度 |

## 分析结论

${isProfit
  ? `**推荐交易**\n\n按期望售价 **¥${formatCurrency(result.expectedPrice)}** 出售，可获得 **¥${formatCurrency(result.premium)}** 的额外收益，投资回报率达到 **${result.premiumPercent.toFixed(2)}%**，建议按此价格进行交易。`
  : `**性价比交易**\n\n当前定价低于剩余价值，属于折价出售。买家相当于获得了 **${formatCurrency(Math.abs(result.premium))}元** 的优惠，性价比较高。`
}

---

报告生成时间：${formattedTime}
数据来源：VPS 剩余价值计算器
更多工具请访问：Globokit.com
`

    navigator.clipboard.writeText(markdown.trim()).then(() => {
      setCopySuccess(true)
      window.setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  const exportToImage = async () => {
    if (!resultRef.current) return

    setGeneratingImg(true)
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 3, useCORS: true, backgroundColor: null })
      const link = document.createElement('a')
      link.download = `Globokit-VPScalculator-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error(error)
    } finally {
      setGeneratingImg(false)
    }
  }

  const currencySymbol = SUPPORTED_CURRENCIES.find((item) => item.code === currency)?.symbol
  const selectedRenewal = RENEWAL_PERIODS.find((item) => item.value === Number.parseInt(renewalPeriod))
  const usedPercent = result ? (1 - result.remainingRatio) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 ring-1 ring-violet-100">
            <Server className="h-4 w-4" />
            VPS/站长工具
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPS 剩余价值计算器</h1>
          <p className="mt-2 text-muted-foreground">
            基于实时汇率与精确到天的时间计算，快速分析服务器残值、期望售价与交易盈亏。
          </p>
        </div>

        <a
          href="https://vpsknow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full max-w-sm items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-violet-200 hover:shadow-md hover:shadow-violet-900/5 lg:w-auto"
        >
          <Image
            src="https://vpsknow.com/favicon.png"
            alt="VPSKnow Logo"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-md border border-slate-100 object-contain"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">推荐</span>
              <span className="font-semibold text-gray-900 transition-colors group-hover:text-violet-700">VPSKnow</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">专业 VPS 评测、全球云服务器与网络工具指南</p>
          </div>
          <ExternalLink className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-violet-600" />
        </a>
      </div>

      {rateError && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>实时汇率获取失败，计算结果可能不准确，请稍后刷新重试。</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(320px,0.42fr)_minmax(0,0.58fr)]">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-violet-600" />
              参数配置
            </CardTitle>
            <CardDescription>填写购买信息与定价策略，结果会自动刷新</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Wallet className="h-4 w-4 text-violet-600" />
                购买价格与币种
              </Label>
              <div className="flex gap-3">
                <div className="flex flex-1 overflow-hidden rounded-md border border-input bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <span className="flex items-center border-r border-gray-100 bg-gray-50 px-3 text-sm font-semibold text-gray-500">
                    {currencySymbol}
                  </span>
                  <Input
                    type="number"
                    value={purchasePrice}
                    onChange={(event) => setPurchasePrice(event.target.value)}
                    className="border-0 font-mono shadow-none focus-visible:ring-0"
                    placeholder="0.00"
                  />
                </div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-[112px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        <span className="mr-1">{item.symbol}</span>
                        {item.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-violet-600" />
                续费周期
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {RENEWAL_PERIODS.map((period) => (
                  <Button
                    key={period.value}
                    variant={Number.parseInt(renewalPeriod) === period.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setRenewalPeriod(period.value.toString())}
                    className="text-xs"
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 text-violet-600" />
                  购买日期
                </Label>
                <Input
                  type="date"
                  max={today}
                  value={purchaseDate}
                  onChange={(event) => setPurchaseDate(event.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4 text-violet-600" />
                  交易日期
                </Label>
                <Input
                  type="date"
                  max="9999-12-31"
                  value={tradeDate}
                  onChange={(event) => setTradeDate(event.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Tag className="h-4 w-4 text-violet-600" />
                定价策略
              </Label>
              <Tabs
                value={priceMode}
                onValueChange={(value) => {
                  setPriceMode(value as PriceMode)
                  setModeInput('')
                }}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="total" className="text-xs">一口价</TabsTrigger>
                  <TabsTrigger value="premium" className="text-xs">溢价模式</TabsTrigger>
                  <TabsTrigger value="discount" className="text-xs">折扣模式</TabsTrigger>
                </TabsList>
              </Tabs>

              {priceMode === 'discount' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {quickDiscounts.map((discount) => (
                      <Button
                        key={discount}
                        type="button"
                        variant={Math.abs(Number.parseFloat(modeInput) - discount) < 0.01 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setModeInput(discount.toString())}
                        className="h-9 text-xs"
                      >
                        {discount * 10}折
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      value={modeInput}
                      onChange={(event) => setModeInput(event.target.value)}
                      placeholder="输入折扣，例如 0.8"
                      className="pr-24 font-mono"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
                      x 剩余价值
                    </span>
                  </div>
                  {Number.parseFloat(modeInput) === 0 && modeInput !== '' && (
                    <p className="flex items-center gap-1 text-xs text-amber-600">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      折扣为 0 表示免费赠送，请确认是否正确
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex overflow-hidden rounded-md border border-input bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <span className="flex items-center border-r border-gray-100 bg-gray-50 px-3 text-sm font-semibold text-gray-500">¥</span>
                  <Input
                    type="number"
                    value={modeInput}
                    onChange={(event) => setModeInput(event.target.value)}
                    className="border-0 font-mono shadow-none focus-visible:ring-0"
                    placeholder={priceMode === 'total' ? (result ? Math.round(result.remainingValue).toString() : '期望卖多少钱？') : '输入溢价金额'}
                  />
                </div>
              )}
            </div>

            <Button variant="outline" className="w-full" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              重置所有选项
            </Button>

            <div className="flex gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <p>剩余价值 = 剩余天数 ÷ 总天数 × 购买价格。所有外币均按实时汇率折算为人民币进行评估。</p>
            </div>
          </CardContent>
        </Card>

        <Card ref={resultRef} className="flex min-h-[620px] flex-col overflow-hidden border-gray-200 bg-white shadow-sm">
          {result ? (
            <>
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <ReceiptText className="h-5 w-5 text-violet-600" />
                      剩余价值分析报告
                    </CardTitle>
                    <CardDescription>基于 {tradeDate} 汇率结算</CardDescription>
                  </div>
                  <div className="flex gap-2" data-html2canvas-ignore>
                    <Button variant="outline" size="sm" onClick={exportToMarkdown}>
                      {copySuccess ? <Check className="mr-2 h-4 w-4 text-emerald-600" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copySuccess ? '已复制' : '复制MD'}
                    </Button>
                    <Button size="sm" onClick={exportToImage} disabled={generatingImg}>
                      {generatingImg ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                      下载图片
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-6 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <MetricCard
                    icon={Gauge}
                    label="剩余价值"
                    value={`¥${formatCurrency(result.remainingValue)}`}
                    caption={`剩余 ${(result.remainingRatio * 100).toFixed(1)}%`}
                    tone="blue"
                  />
                  <MetricCard
                    icon={Wallet}
                    label="期望售价"
                    value={`¥${formatCurrency(result.expectedPrice)}`}
                    caption={priceMode === 'discount' ? `${(Number.parseFloat(modeInput || '1') * 10).toFixed(1)}折` : '汇率转换后'}
                    tone="violet"
                  />
                  <MetricCard
                    icon={result.premium >= 0 ? TrendingUp : TrendingDown}
                    label={result.premium >= 0 ? '预期溢价' : '预期折价'}
                    value={`${result.premium >= 0 ? '+' : '-'}¥${formatCurrency(Math.abs(result.premium))}`}
                    caption={`${result.premium >= 0 ? '+' : '-'}${Math.abs(result.premiumPercent).toFixed(2)}%`}
                    tone={result.premium >= 0 ? 'emerald' : 'rose'}
                  />
                </div>

                <div className="rounded-lg border border-gray-200 bg-slate-50/70 p-5">
                  <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Info className="h-4 w-4 text-violet-600" />
                    详细数据清单
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                    <DetailItem icon={Wallet} label="原购价格" value={`${currencySymbol}${purchasePrice}`} subValue={`约 ¥${formatCurrency(result.purchasePriceCNY)}`} />
                    <DetailItem icon={Calendar} label="续费周期" value={selectedRenewal?.label || '-'} />
                    <DetailItem icon={Clock} label="到期日期" value={formatDate(new Date(result.expireDate))} valueClassName="text-orange-600" />
                    <DetailItem icon={Calendar} label="总服务期限" value={`${result.totalDays} 天`} />
                    <DetailItem icon={Clock} label="已用天数" value={`${result.usedDays} 天`} />
                    <DetailItem icon={Clock} label="剩余天数" value={`${result.remainingDays} 天`} valueClassName="text-blue-600" />
                    <DetailItem icon={Percent} label="使用进度" value={`${usedPercent.toFixed(1)}%`} />
                    <DetailItem icon={Wallet} label="日均成本" value={`¥ ${result.dailyPrice.toFixed(2)}`} />
                  </dl>

                  <div className="mt-7">
                    <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
                      <span>VPS 生命周期进度</span>
                      <span>{usedPercent.toFixed(1)}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-500">Globokit.com</span>
                  <span>Generated by VPS Calculator</span>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                <Calculator className="h-9 w-9" />
              </div>
              <p className="text-lg font-semibold text-gray-900">等待输入参数</p>
              <p className="mt-2 text-sm text-muted-foreground">请在左侧填写信息以生成分析报告</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  caption,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string
  caption: string
  tone: 'blue' | 'violet' | 'emerald' | 'rose'
}) {
  const toneClassName = {
    blue: 'border-blue-100 bg-blue-50/80 text-blue-700',
    violet: 'border-violet-100 bg-violet-50/80 text-violet-700',
    emerald: 'border-emerald-100 bg-emerald-50/80 text-emerald-700',
    rose: 'border-rose-100 bg-rose-50/80 text-rose-700',
  }[tone]

  return (
    <div className={cn('rounded-lg border p-5', toneClassName)}>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="font-mono text-2xl font-bold tracking-tight text-gray-950">{value}</div>
      <div className="mt-3 inline-flex rounded-md bg-white/75 px-2 py-1 text-xs font-medium">{caption}</div>
    </div>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
  subValue,
  valueClassName,
}: {
  icon: LucideIcon
  label: string
  value: string
  subValue?: string
  valueClassName?: string
}) {
  return (
    <div className="space-y-1">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className={cn('font-mono text-[15px] font-semibold text-gray-900', valueClassName)}>{value}</dd>
      {subValue && <dd className="font-mono text-[11px] text-muted-foreground">{subValue}</dd>}
    </div>
  )
}
