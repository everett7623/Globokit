// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持生成交易卡片
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { buildVpsMarkdown } from './vps-export'
import { VpsForm } from './vps-form'
import { VpsHeader } from './vps-header'
import { VpsReport } from './vps-report'
import { calculateVPSValue, fetchExchangeRates, SUPPORTED_CURRENCIES, type CalculationResult, type PriceMode } from '@/lib/tools/vps-calculator'

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
    if (!rates || Object.keys(rates).length === 0) { setRateError(true); return }
    setRateError(false); setExchangeRates(rates)
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
    const nextResult = calculateVPSValue(purchaseDate, Number.parseInt(renewalPeriod), priceNum, currency, value, priceMode, exchangeRates, tradeDate)
    if (nextResult.totalDays > 0 && !Number.isNaN(nextResult.remainingValue)) setResult(nextResult)
  }, [currency, exchangeRates, modeInput, priceMode, purchaseDate, purchasePrice, renewalPeriod, tradeDate])

  useEffect(() => { setTradeDate(today); loadExchangeRates() }, [loadExchangeRates, today])
  useEffect(() => {
    if (purchasePrice && purchaseDate && tradeDate) { const timer = window.setTimeout(handleCalculate, 300); return () => window.clearTimeout(timer) }
  }, [handleCalculate, purchaseDate, purchasePrice, tradeDate])

  const handleReset = () => { setPurchaseDate(''); setTradeDate(today); setPurchasePrice(''); setModeInput(''); setPriceMode('total'); setResult(null) }
  const exportToMarkdown = () => {
    if (!result) return
    navigator.clipboard.writeText(buildVpsMarkdown({ result, currency, renewalPeriod, purchaseDate, purchasePrice })).then(() => { setCopySuccess(true); window.setTimeout(() => setCopySuccess(false), 2000) })
  }
  const exportToImage = async () => {
    if (!resultRef.current) return
    setGeneratingImg(true)
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 3, useCORS: true, backgroundColor: null })
      const link = document.createElement('a'); link.download = `Globokit-VPScalculator-${Date.now()}.png`; link.href = canvas.toDataURL('image/png'); link.click()
    } catch (error) { console.error(error) } finally { setGeneratingImg(false) }
  }
  const currencySymbol = SUPPORTED_CURRENCIES.find((item) => item.code === currency)?.symbol

  return <div className="space-y-8"><VpsHeader rateError={rateError} /><div className="grid gap-6 lg:grid-cols-[minmax(320px,0.42fr)_minmax(0,0.58fr)]"><VpsForm purchaseDate={purchaseDate} tradeDate={tradeDate} renewalPeriod={renewalPeriod} purchasePrice={purchasePrice} currency={currency} currencySymbol={currencySymbol} priceMode={priceMode} modeInput={modeInput} today={today} remainingValue={result?.remainingValue} onPurchaseDate={setPurchaseDate} onTradeDate={setTradeDate} onRenewalPeriod={setRenewalPeriod} onPurchasePrice={setPurchasePrice} onCurrency={setCurrency} onPriceMode={(mode) => { setPriceMode(mode); setModeInput('') }} onModeInput={setModeInput} onReset={handleReset} /><VpsReport ref={resultRef} result={result} tradeDate={tradeDate} purchasePrice={purchasePrice} currencySymbol={currencySymbol} renewalPeriod={renewalPeriod} priceMode={priceMode} modeInput={modeInput} copySuccess={copySuccess} generatingImg={generatingImg} onCopyMarkdown={exportToMarkdown} onExportImage={exportToImage} /></div></div>
}
