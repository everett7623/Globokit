// 名称: 多币种换算器
// 描述: 基于实时或手动汇率的交叉换算，输出单一结果与全币种换算表
// 路径: Globokit/app/tools/currency-converter/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeftRight, RefreshCw } from 'lucide-react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FALLBACK_EXCHANGE_RATES,
  fetchExchangeRates,
  getExchangeRateSourceLabel,
  type ExchangeRateSnapshot,
} from '@/lib/tools/vps-calculator'
import {
  CONVERTER_CURRENCIES,
  buildConversionSummary,
  buildConversionTable,
  convertCurrency,
} from '@/lib/tools/currency-converter'

function CurrencySelect({ id, value, onChange }: { id: string; value: string; onChange: (code: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="h-11"><SelectValue /></SelectTrigger>
      <SelectContent>
        {CONVERTER_CURRENCIES.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>{currency.code} · {currency.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('10000')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('CNY')
  const [markupPercent, setMarkupPercent] = useState('0')
  const [manualUsdRate, setManualUsdRate] = useState('')
  const [rateSnapshot, setRateSnapshot] = useState<ExchangeRateSnapshot>({
    rates: { ...FALLBACK_EXCHANGE_RATES },
    source: 'fallback',
    fetchedAt: null,
    stale: true,
  })

  useEffect(() => {
    let cancelled = false
    fetchExchangeRates().then((snapshot) => {
      if (!cancelled) setRateSnapshot(snapshot)
    })
    return () => { cancelled = true }
  }, [])

  // 手动锁定 1 USD = ? CNY：按比例整体缩放全表，保持所有交叉汇率口径一致
  const rates = useMemo(() => {
    const usdToCny = Number.parseFloat(manualUsdRate)
    const liveUsdRate = rateSnapshot.rates.USD
    if (Number.isFinite(usdToCny) && usdToCny > 0 && Number.isFinite(liveUsdRate) && liveUsdRate > 0) {
      // 目标 rates.USD = 1/usdToCny；对全表等比缩放，锁定值与实时值的偏差同等地作用于每个币种
      const scale = 1 / usdToCny / liveUsdRate
      const scaled = Object.fromEntries(Object.entries(rateSnapshot.rates).map(([code, rate]) => [code, rate * scale]))
      return { ...scaled, CNY: 1 }
    }
    return rateSnapshot.rates
  }, [rateSnapshot, manualUsdRate])

  const calculation = useMemo(() => {
    try {
      const markup = Number.parseFloat(markupPercent) || 0
      const result = convertCurrency({ amount: Number.parseFloat(amount) || 0, from, to, rates, markupPercent: markup })
      return { result, table: buildConversionTable(Number.parseFloat(amount) || 0, from, rates, markup), error: '' }
    } catch (error) {
      return { result: null, table: [], error: error instanceof Error ? error.message : '换算失败，请检查输入' }
    }
  }, [amount, from, to, rates, markupPercent])

  const sourceLabel = getExchangeRateSourceLabel(rateSnapshot)

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">多币种报价换算器</h1>
        <p className="text-muted-foreground">基于实时汇率的常用贸易币种交叉换算，支持点差模拟与全币种换算表；汇率获取失败时自动降级为内置参考汇率。</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.1fr)]">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2"><ArrowLeftRight className="h-5 w-5" />换算参数</CardTitle>
                <CardDescription>{sourceLabel}</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setManualUsdRate('')}>
                <RefreshCw className="mr-2 h-4 w-4" />恢复实时
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount">金额</Label>
              <FormattedInput id="amount" value={amount} onChange={setAmount} format="decimal" maxDecimals={2} className="h-11 font-medium" />
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div className="space-y-2">
                <Label htmlFor="from">从</Label>
                <CurrencySelect id="from" value={from} onChange={setFrom} />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="交换币种"
                className="mb-0.5 hidden sm:flex"
                onClick={() => { setFrom(to); setTo(from) }}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor="to">到</Label>
                <CurrencySelect id="to" value={to} onChange={setTo} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="markup">渠道点差 %（可选）</Label>
                <FormattedInput id="markup" value={markupPercent} onChange={setMarkupPercent} format="decimal" maxDecimals={2} className="h-11 font-medium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manualUsd">手动锁定 1 USD = ? CNY</Label>
                <Input id="manualUsd" value={manualUsdRate} onChange={(event) => setManualUsdRate(event.target.value)} placeholder="留空使用实时汇率" className="h-11 font-medium" inputMode="decimal" />
              </div>
            </div>
            {calculation.error && <EnhancedAlert type="error" title="换算失败" message={calculation.error} />}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {calculation.result && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>换算结果</CardTitle>
                    <CardDescription>{calculation.result.rateUnit}</CardDescription>
                  </div>
                  <EnhancedCopyButton text={buildConversionSummary(calculation.result)} variant="outline" size="sm">复制</EnhancedCopyButton>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tabular-nums text-emerald-700 dark:text-cyan-200">
                  {calculation.result.convertedAmount.toLocaleString('en-US', { minimumFractionDigits: calculation.result.to === 'JPY' || calculation.result.to === 'KRW' ? 0 : 2 })}
                  <span className="ml-2 text-lg font-semibold text-slate-500">{calculation.result.to}</span>
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Stat label="中间价" value={String(calculation.result.midRate)} />
                  <Stat label="适用汇率" value={String(calculation.result.appliedRate)} note={calculation.result.markupPercent > 0 ? `含 ${calculation.result.markupPercent}% 点差` : '未加点差'} />
                </div>
              </CardContent>
            </Card>
          )}

          {calculation.table.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">全币种换算表</CardTitle>
                <CardDescription>{Number.parseFloat(amount).toLocaleString('en-US')} {from} 按中间价折算</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {calculation.table.map((row) => (
                    <div key={row.code} className="flex items-center justify-between gap-3 rounded-md border bg-muted/20 px-3 py-2">
                      <span className="min-w-0 text-sm font-medium">{row.symbol} {row.code}<span className="ml-1.5 text-xs text-muted-foreground">{row.name}</span></span>
                      <span className="text-right text-sm font-semibold tabular-nums">{row.converted.toLocaleString('en-US', { minimumFractionDigits: row.code === 'JPY' || row.code === 'KRW' ? 0 : 2 })}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MobileFriendlyWrapper>
  )
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-md border bg-muted/20 px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold tabular-nums">{value}</p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  )
}
