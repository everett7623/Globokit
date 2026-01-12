// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持生成交易卡片
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-12

'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { 
  Calculator, RefreshCw, Copy, Download, Check, 
  TrendingUp, TrendingDown, Info, Calendar as CalendarIcon 
} from 'lucide-react'
import {
  fetchExchangeRates,
  calculateVPSValue,
  formatCurrency,
  formatDate,
  getExchangeRateText,
  SUPPORTED_CURRENCIES,
  RENEWAL_PERIODS,
  type CalculationResult,
  type PriceMode
} from '@/lib/tools/vps-calculator'
import html2canvas from 'html2canvas'

export default function VPSCalculatorPage() {
  // --- 输入状态 ---
  // 注意：这里存储的是 mm/dd/yyyy 格式的字符串，或者空字符串
  const [purchaseDate, setPurchaseDate] = useState('') 
  const [tradeDate, setTradeDate] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState('36')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  
  // --- 价格模式状态 ---
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  const [modeInput, setModeInput] = useState('') 

  // --- 逻辑状态 ---
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [generatingImg, setGeneratingImg] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)
  
  // 隐藏的日期选择器引用，用于点击图标触发
  const hiddenPurchaseDateRef = useRef<HTMLInputElement>(null)
  const hiddenTradeDateRef = useRef<HTMLInputElement>(null)

  const quickDiscounts = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6, 0.5]

  // 初始化 - 仅设置交易日期为今天，购买日期留空以显示 Placeholder
  useEffect(() => {
    const getTodayUS = () => {
      const d = new Date()
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      return `${month}/${day}/${year}`
    }
    setTradeDate(getTodayUS())
    loadExchangeRates()
  }, [])

  // 自动计算监听
  useEffect(() => {
    // 简单正则校验 mm/dd/yyyy
    const isValidDate = (d: string) => d && /^\d{2}\/\d{2}\/\d{4}$/.test(d)

    if (purchasePrice && isValidDate(purchaseDate) && isValidDate(tradeDate)) {
      const timer = setTimeout(handleCalculate, 300)
      return () => clearTimeout(timer)
    }
  }, [purchasePrice, purchaseDate, tradeDate, renewalPeriod, currency, priceMode, modeInput, exchangeRates])

  const loadExchangeRates = async () => {
    const rates = await fetchExchangeRates()
    setExchangeRates(rates)
  }

  // 处理原生日期选择器 (yyyy-mm-dd) 转 (mm/dd/yyyy)
  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (s: string) => void) => {
    const isoVal = e.target.value
    if (!isoVal) return
    const [y, m, d] = isoVal.split('-')
    setter(`${m}/${d}/${y}`)
  }

  const handleCalculate = () => {
    const priceNum = parseFloat(purchasePrice)
    if (!priceNum || !purchaseDate) return

    let val = parseFloat(modeInput)
    if (modeInput === '' || isNaN(val)) {
      if (priceMode === 'total') val = -1
      if (priceMode === 'premium') val = 0
      if (priceMode === 'discount') val = 1
    }

    const res = calculateVPSValue(
      purchaseDate,
      parseInt(renewalPeriod),
      priceNum,
      currency,
      val,
      priceMode,
      exchangeRates,
      tradeDate
    )
    
    // 简单防错
    if (res.totalDays > 0 && !isNaN(res.remainingValue)) {
        setResult(res)
    }
  }

  const handleReset = () => {
    const d = new Date()
    const today = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
    setPurchaseDate('') // 重置为空，显示 placeholder
    setTradeDate(today)
    setPurchasePrice('')
    setModeInput('')
    setPriceMode('total')
    setResult(null)
  }

  const exportToMarkdown = () => {
    if (!result) return
    const symbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol
    const md = `【VPS交易】\n原价：${symbol}${purchasePrice} / ${RENEWAL_PERIODS.find(r=>r.value===parseInt(renewalPeriod))?.label}\n到期：${formatDate(new Date(result.expireDate))}\n剩余：${result.remainingDays}天\n价值：¥${formatCurrency(result.remainingValue)}\n售价：¥${formatCurrency(result.expectedPrice)}\n溢价：¥${formatCurrency(result.premium)}\n计算：Globokit.com`
    navigator.clipboard.writeText(md).then(() => {
      setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  const exportToImage = async () => {
    if (!resultRef.current) return
    setGeneratingImg(true)
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 3, useCORS: true, backgroundColor: null })
      const link = document.createElement('a')
      link.download = `VPS-Calc-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) { console.error(e) } finally { setGeneratingImg(false) }
  }

  return (
    // 修改: 宽度 max-w-[1400px] 宽屏
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* 头部标题 */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-3">
            <span className="text-4xl">🧮</span> VPS 剩余价值计算器 <span className="text-2xl">🚀</span>
          </h1>
          <p className="text-lg text-slate-600 mt-3 max-w-2xl">
            基于实时汇率与精确到天的时间计算，助您快速分析服务器残值与交易盈亏。
          </p>
        </div>

        {/* 核心布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* --- 左侧：输入区 --- */}
          <div className="lg:col-span-4 flex flex-col">
            <Card className="flex flex-col h-full shadow-lg border-0 ring-1 ring-slate-200/50">
              <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
                  📝 参数配置
                </CardTitle>
                <CardDescription>输入基本信息，自动获取汇率</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-6 flex-1">
                {/* 价格和币种 - Flex 布局解决重叠 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    💵 购买价格 & 币种
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex-1 flex rounded-md shadow-sm ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/20 transition-all bg-white overflow-hidden">
                      {/* 货币符号 */}
                      <span className="flex select-none items-center px-3 text-slate-500 font-bold bg-slate-50/50 border-r border-slate-100 sm:text-sm whitespace-nowrap">
                        {SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol}
                      </span>
                      <Input 
                        type="number" 
                        value={purchasePrice} 
                        onChange={e => setPurchasePrice(e.target.value)} 
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6" 
                        placeholder="0.00"
                      />
                    </div>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-[110px] border-slate-200 shadow-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_CURRENCIES.map(c => <SelectItem key={c.code} value={c.code}><span className="mr-1">{c.symbol}</span>{c.code}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between items-center px-1">
                    <span className="font-mono">{getExchangeRateText(currency, exchangeRates)}</span>
                    <span className="cursor-pointer hover:text-primary flex items-center gap-1 transition-colors" onClick={loadExchangeRates}>
                      <RefreshCw className="h-3 w-3"/> 🔄 刷新汇率
                    </span>
                  </div>
                </div>

                {/* 续费周期 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                   📅 续费周期
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {RENEWAL_PERIODS.map(p => (
                      <Button 
                        key={p.value} 
                        variant={parseInt(renewalPeriod) === p.value ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setRenewalPeriod(p.value.toString())}
                        className={cn("text-xs shadow-sm border-slate-200 transition-all", parseInt(renewalPeriod) === p.value ? "font-bold shadow-md" : "hover:bg-slate-50 hover:text-slate-900")}
                      >
                        {p.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 日期选择 - 双轨制: Text Input + Hidden Date Picker */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 购买日期 */}
                  <div className="space-y-3 relative">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">📆 购买日期</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="mm/dd/yyyy"
                        maxLength={10}
                        value={purchaseDate} 
                        onChange={e => setPurchaseDate(e.target.value)} 
                        className="font-mono border-slate-200 shadow-sm pr-10" 
                      />
                      <CalendarIcon 
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 cursor-pointer hover:text-primary"
                        onClick={() => hiddenPurchaseDateRef.current?.showPicker()}
                      />
                      {/* 隐藏的日期选择器 */}
                      <input 
                        type="date" 
                        ref={hiddenPurchaseDateRef}
                        className="absolute opacity-0 pointer-events-none w-0 h-0"
                        onChange={(e) => handleNativeDateChange(e, setPurchaseDate)}
                      />
                    </div>
                  </div>

                  {/* 交易日期 */}
                  <div className="space-y-3 relative">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">⏱️ 交易日期</Label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="mm/dd/yyyy"
                        maxLength={10}
                        value={tradeDate} 
                        onChange={e => setTradeDate(e.target.value)} 
                        className="font-mono border-slate-200 shadow-sm pr-10" 
                      />
                      <CalendarIcon 
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 cursor-pointer hover:text-primary"
                        onClick={() => hiddenTradeDateRef.current?.showPicker()}
                      />
                      <input 
                        type="date" 
                        ref={hiddenTradeDateRef}
                        className="absolute opacity-0 pointer-events-none w-0 h-0"
                        onChange={(e) => handleNativeDateChange(e, setTradeDate)}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-2" />

                {/* 定价策略 */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">🎯 定价策略</Label>
                  <Tabs value={priceMode} onValueChange={(v) => {
                    setPriceMode(v as PriceMode);
                    setModeInput('');
                  }} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 p-1">
                      <TabsTrigger value="total" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">🏷️ 一口价</TabsTrigger>
                      <TabsTrigger value="premium" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">📈 溢价模式</TabsTrigger>
                      <TabsTrigger value="discount" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">📉 折扣模式</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* 动态输入区域 */}
                  <div className="pt-1">
                    {priceMode === 'discount' ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2">
                          {quickDiscounts.map(d => (
                            <Button 
                              key={d} 
                              variant={Math.abs(parseFloat(modeInput) - d) < 0.01 ? "default" : "outline"} 
                              size="sm" 
                              onClick={() => setModeInput(d.toString())}
                              className={cn("h-9 text-xs font-medium shadow-sm border-slate-200", Math.abs(parseFloat(modeInput) - d) < 0.01 ? "font-bold shadow-md" : "hover:bg-slate-50")}
                            >
                              {d * 10}折
                            </Button>
                          ))}
                        </div>
                        <div className="relative transition-all group focus-within:ring-2 ring-primary/20 rounded-md">
                          <Input 
                            type="number" 
                            value={modeInput} 
                            onChange={e => setModeInput(e.target.value)} 
                            placeholder="输入自定义折扣 (如 0.8)"
                            className="pl-3 pr-24 border-slate-200 shadow-sm focus-visible:ring-0 font-mono"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                            💸 x 剩余价值
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/20 transition-all overflow-hidden bg-white">
                        <span className="flex select-none items-center px-3 text-slate-500 font-bold bg-slate-50/50 border-r border-slate-100 sm:text-sm whitespace-nowrap">
                          ¥
                        </span>
                        <Input 
                          type="number" 
                          value={modeInput} 
                          onChange={e => setModeInput(e.target.value)} 
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6 font-mono"
                          placeholder={
                            priceMode === 'total' 
                              ? (result ? Math.round(result.remainingValue).toString() : "期望卖多少钱？") 
                              : "输入溢价金额 (+/-)"
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-2 border-slate-200 hover:bg-slate-50 text-slate-600" onClick={handleReset}>🔄 重置所有选项</Button>
              </CardContent>

              {/* 左侧卡片底部：注释 */}
