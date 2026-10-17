// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持生成交易卡片
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useClientDate } from '@/lib/client-hooks'
import { buildVpsImage, buildVpsMarkdown } from './vps-export'
import { VpsForm } from './vps-form'
import { VpsHeader } from './vps-header'
import { VpsReport } from './vps-report'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { BUSINESS_TIME_ZONE, getDateKeyInTimeZone } from '@/lib/date-utils'
import { calculateVPSValue, FALLBACK_EXCHANGE_RATES, fetchExchangeRates, getExchangeRateSourceLabel, SUPPORTED_CURRENCIES, type CalculationResult, type ExchangeRateSnapshot, type PriceMode } from '@/lib/tools/vps-calculator'

export default function VPSCalculatorPage() {
  const [purchaseDate, setPurchaseDate] = useState('')
  const [tradeDateOverride, setTradeDateOverride] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState('36')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  const [modeInput, setModeInput] = useState('')
  const [rateSnapshot, setRateSnapshot] = useState<ExchangeRateSnapshot>({
    rates: { ...FALLBACK_EXCHANGE_RATES },
    source: 'fallback',
    fetchedAt: null,
    stale: true,
  })
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [generatingImg, setGeneratingImg] = useState(false)
  const [exportError, setExportError] = useState('')
  const clientDate = useClientDate()
  const today = useMemo(() => (clientDate ? getDateKeyInTimeZone(clientDate, BUSINESS_TIME_ZONE) : ''), [clientDate])
  const tradeDate = tradeDateOverride || today

  const handleCalculate = useCallback(() => {
    const priceNum = Number.parseFloat(purchasePrice)
    if (!Number.isFinite(priceNum) || priceNum <= 0 || !purchaseDate || !tradeDate) {
      setResult(null)
      return
    }
    let value = Number.parseFloat(modeInput)
    if (modeInput === '' || Number.isNaN(value)) {
      if (priceMode === 'total') value = -1
      if (priceMode === 'premium') value = 0
      if (priceMode === 'discount') value = 1
    }
    const nextResult = calculateVPSValue(purchaseDate, Number.parseInt(renewalPeriod), priceNum, currency, value, priceMode, rateSnapshot.rates, tradeDate)
    setResult(nextResult.totalDays > 0 && Number.isFinite(nextResult.remainingValue) ? nextResult : null)
  }, [currency, modeInput, priceMode, purchaseDate, purchasePrice, rateSnapshot.rates, renewalPeriod, tradeDate])

  useEffect(() => {
    let cancelled = false
    fetchExchangeRates().then((snapshot) => {
      if (!cancelled) setRateSnapshot(snapshot)
    })
    return () => { cancelled = true }
  }, [])
  useEffect(() => {
    const timer = window.setTimeout(handleCalculate, 300)
    return () => window.clearTimeout(timer)
  }, [handleCalculate])

  const handleReset = () => { setPurchaseDate(''); setTradeDateOverride(''); setPurchasePrice(''); setModeInput(''); setPriceMode('total'); setResult(null); setExportError('') }
  const exportToImage = async () => {
    if (!result || generatingImg) return
    setGeneratingImg(true)
    setExportError('')
    try {
      const blob = await buildVpsImage({ result, currency, purchaseDate, purchasePrice, renewalPeriod, rateLabel, tradeDate })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `Globokit-VPScalculator-${tradeDate}.png`
      link.href = url
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch { setExportError('图片导出失败，请重试或使用“复制MD”保存报告。') } finally { setGeneratingImg(false) }
  }
  const currencySymbol = SUPPORTED_CURRENCIES.find((item) => item.code === currency)?.symbol
  const rateLabel = getExchangeRateSourceLabel(rateSnapshot)
  const markdownText = result ? buildVpsMarkdown({ result, currency, renewalPeriod, purchaseDate, purchasePrice, rateLabel }) : ''

  return <MobileFriendlyWrapper><VpsHeader rateSnapshot={rateSnapshot} />{exportError && <p role="alert" className="mb-4 text-sm text-red-600">{exportError}</p>}<div className="grid gap-6 lg:grid-cols-[minmax(320px,0.42fr)_minmax(0,0.58fr)]"><VpsForm purchaseDate={purchaseDate} tradeDate={tradeDate} renewalPeriod={renewalPeriod} purchasePrice={purchasePrice} currency={currency} currencySymbol={currencySymbol} priceMode={priceMode} modeInput={modeInput} today={today} remainingValue={result?.remainingValue} rateLabel={rateLabel} onPurchaseDate={setPurchaseDate} onTradeDate={setTradeDateOverride} onRenewalPeriod={setRenewalPeriod} onPurchasePrice={setPurchasePrice} onCurrency={setCurrency} onPriceMode={(mode) => { setPriceMode(mode); setModeInput('') }} onModeInput={setModeInput} onReset={handleReset} /><VpsReport result={result} tradeDate={tradeDate} purchasePrice={purchasePrice} currencySymbol={currencySymbol} renewalPeriod={renewalPeriod} priceMode={priceMode} modeInput={modeInput} rateLabel={rateLabel} markdownText={markdownText} generatingImg={generatingImg} onExportImage={exportToImage} /></div></MobileFriendlyWrapper>
}
