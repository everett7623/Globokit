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
  TrendingUp, TrendingDown, Info 
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

  // 快捷折扣选项
  const quickDiscounts = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6, 0.5]

  // 初始化
  useEffect(() => {
    const getTodayISO = () => {
      const d = new Date()
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
    const today = getTodayISO()
    setPurchaseDate(today)
    setTradeDate(today)
    loadExchangeRates()
  }, [])

  // 自动计算监听
  useEffect(() => {
    if (purchasePrice && purchaseDate && tradeDate) {
      const timer = setTimeout(handleCalculate, 300)
      return () => clearTimeout(timer)
    }
  }, [purchasePrice, purchaseDate, tradeDate, renewalPeriod, currency, priceMode, modeInput, exchangeRates])

  const loadExchangeRates = async () => {
    const rates = await fetchExchangeRates()
    setExchangeRates(rates)
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
    setResult(res)
  }

  const handleReset = () => {
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    setPurchaseDate(today)
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
    // 修改 1: 使用 max-w-7xl (约1280px) 统一宽度，更适合工具类展示
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
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
                {/* 价格和币种 - 修改 2: Flex自适应布局，修复货币符号重叠问题 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    💵 购买价格 & 币种
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex-1 flex rounded-md shadow-sm ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/20 transition-all bg-white overflow-hidden">
                      {/* 货币符号：不固定宽度，自适应内容，左右padding */}
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

                {/* 日期选择 - 修改 3: 默认Text显示格式提示，聚焦变Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">📆 购买日期</Label>
                    <Input 
                      type="text" 
                      placeholder="dd/mm/yyyy"
                      onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => { if(!e.target.value) e.target.type = 'text' }}
                      value={purchaseDate} 
                      onChange={e => setPurchaseDate(e.target.value)} 
                      className="font-mono border-slate-200 shadow-sm" 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">⏱️ 交易日期</Label>
                    <Input 
                      type="text" 
                      placeholder="dd/mm/yyyy"
                      onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => { if(!e.target.value) e.target.type = 'text' }}
                      value={tradeDate} 
                      onChange={e => setTradeDate(e.target.value)} 
                      className="font-mono border-slate-200 shadow-sm" 
                    />
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
              <div className="p-4 bg-slate-50 rounded-b-xl border-t border-slate-100 text-xs text-slate-500 leading-relaxed flex gap-2 items-start">
                <Info className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                <p>注：剩余价值 = (剩余天数 ÷ 总天数) × 购买价格。所有外币均按实时汇率折算为人民币进行评估。</p>
              </div>
            </Card>
          </div>

          {/* --- 右侧：结果展示区 --- */}
          <div className="lg:col-span-8 flex flex-col">
            {/* 交易卡片容器 */}
            <div className="relative group perspective-1000 flex flex-col h-full">
              <div 
                ref={resultRef}
                className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/50 transition-all duration-300 flex flex-col bg-white border border-slate-100 text-slate-900 h-full"
              >
                {result ? (
                  <div className="flex flex-col h-full">
                    {/* 卡片内容区域 (Padding) */}
                    <div className="p-8 flex-1">
                      <div className="flex items-center gap-3 mb-8 relative z-10 pb-4 border-b border-slate-100">
                        <div className="p-2.5 bg-blue-50 rounded-xl">
                          <TrendingUp className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-extrabold text-slate-800">📊 剩余价值分析报告</h2>
                          <p className="text-sm text-slate-500 mt-0.5">基于 {tradeDate} 汇率结算</p>
                        </div>
                      </div>

                      {/* 核心三栏数据 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                        {/* 1. 剩余价值 */}
                        <div className="p-6 rounded-2xl text-center border-2 bg-gradient-to-b from-blue-50 to-white border-blue-100 shadow-sm transition-transform hover:scale-[1.02]">
                          <div className="text-sm mb-3 font-bold text-blue-600 flex items-center justify-center gap-1">
                            💎 剩余价值
                          </div>
                          <div className="text-4xl font-black tracking-tight text-blue-900 font-mono">
                            <span className="text-2xl mr-1 text-blue-600">¥</span>{formatCurrency(result.remainingValue)}
                          </div>
                          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold mt-3 bg-blue-100 text-blue-700">
                            剩余 {(result.remainingRatio * 100).toFixed(1)}%
                          </div>
                        </div>

                        {/* 2. 期望售价 */}
                        <div className="p-6 rounded-2xl text-center border-2 bg-gradient-to-b from-purple-50 to-white border-purple-100 shadow-sm transition-transform hover:scale-[1.02]">
                          <div className="text-sm mb-3 font-bold text-purple-600 flex items-center justify-center gap-1">
                            💰 期望售价
                          </div>
                          <div className="text-4xl font-black tracking-tight text-purple-900 font-mono">
                            <span className="text-2xl mr-1 text-purple-600">¥</span>{formatCurrency(result.expectedPrice)}
                          </div>
                          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold mt-3 bg-purple-100 text-purple-700">
                            {priceMode === 'discount' ? `🏷️ ${(parseFloat(modeInput||'1')*10).toFixed(1)}折` : '汇率转换后'}
                          </div>
                        </div>

                        {/* 3. 溢价/折价 - 修改 4: 强制显示 + 或 - 号 */}
                        <div className={cn("p-6 rounded-2xl text-center border-2 shadow-sm transition-transform hover:scale-[1.02]", 
                          result.premium >= 0 
                            ? "bg-gradient-to-b from-emerald-50 to-white border-emerald-100"
                            : "bg-gradient-to-b from-rose-50 to-white border-rose-100"
                        )}>
                          <div className={cn("text-sm mb-3 font-bold flex items-center justify-center gap-1", result.premium >= 0 ? "text-emerald-600" : "text-rose-600")}>
                            {result.premium >= 0 ? '🎉 预期溢价' : '💔 预期折价'}
                          </div>
                          <div className={cn("text-4xl font-black tracking-tight font-mono", result.premium >= 0 ? "text-emerald-800" : "text-rose-800")}>
                            <span className={cn("text-2xl mr-1", result.premium >= 0 ? "text-emerald-600" : "text-rose-600")}>
                              {result.premium >= 0 ? '+' : '-'}¥
                            </span>
                            {formatCurrency(Math.abs(result.premium))}
                          </div>
                          <div className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold mt-3", 
                            result.premium >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          )}>
                            {result.premium >= 0 ? '📈 +' : '📉 -'}{Math.abs(result.premiumPercent).toFixed(2)}%
                          </div>
                        </div>
                      </div>

                      {/* 详细信息表格 */}
                      <div className="p-6 rounded-2xl relative z-10 bg-slate-50/80 border border-slate-100">
                        <h3 className="text-sm font-bold mb-5 text-slate-700 flex items-center gap-2">
                          <Info className="h-4 w-4" /> 详细数据清单
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-8">
                          <DetailItem emoji="💵" label="原购价格" value={`${SUPPORTED_CURRENCIES.find(c=>c.code===currency)?.symbol}${purchasePrice}`} subValue={`≈ ¥${formatCurrency(result.purchasePriceCNY)}`} />
                          <DetailItem emoji="📅" label="续费周期" value={RENEWAL_PERIODS.find(r=>r.value===parseInt(renewalPeriod))?.label || '-'} />
                          <DetailItem emoji="⏳" label="到期日期" value={formatDate(new Date(result.expireDate))} valueClassName="text-orange-600 font-bold" />
                          <DetailItem emoji="🗓️" label="总服务期限" value={`${result.totalDays} 天`} />
                          <DetailItem emoji="🕰️" label="已用天数" value={`${result.usedDays} 天`} />
                          <DetailItem emoji="⏱️" label="剩余天数" value={`${result.remainingDays} 天`} valueClassName="text-blue-600 font-bold" />
                          <DetailItem emoji="📊" label="使用进度" value={`${((1-result.remainingRatio)*100).toFixed(1)}%`} />
                          <DetailItem emoji="📆" label="日均成本" value={`¥ ${result.dailyPrice.toFixed(2)}`} />
                        </div>

                        <div className="mt-7">
                          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                            <span>⏳ VPS 生命周期进度</span>
                            <span>{((1-result.remainingRatio)*100).toFixed(1)}%</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-200 shadow-inner">
                            <div 
                              className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                              style={{ width: `${(1-result.remainingRatio)*100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧卡片底部：注释 + 按钮 (通栏布局) */}
                    <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                        <span className="bg-slate-200/50 px-1.5 py-0.5 rounded">Globokit.com</span>
                        <span>Generated by VPS Calculator</span>
                      </div>
                      <div className="flex gap-3" data-html2canvas-ignore>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-xs border-slate-200 shadow-sm hover:bg-white text-slate-600" 
                          onClick={exportToMarkdown} 
                          disabled={!result}
                        >
                          {copySuccess ? <Check className="h-3 w-3 mr-1.5 text-emerald-500"/> : <Copy className="h-3 w-3 mr-1.5"/>}
                          {copySuccess ? '已复制' : '复制MD'}
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-8 text-xs bg-slate-900 text-white hover:bg-slate-800 shadow-md" 
                          onClick={exportToImage} 
                          disabled={!result || generatingImg}
                        >
                          {generatingImg ? <RefreshCw className="h-3 w-3 mr-1.5 animate-spin"/> : <Download className="h-3 w-3 mr-1.5"/>}
                          下载图片
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                    <div className="bg-slate-50 p-6 rounded-full mb-6">
                      <Calculator className="h-16 w-16 text-slate-300" />
                    </div>
                    <p className="text-xl font-medium text-slate-600">🤔 等待输入参数...</p>
                    <p className="text-sm mt-2">请在左侧填写信息以生成分析报告</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 辅助组件：详细数据项
function DetailItem({ emoji, label, value, subValue, valueClassName }: { emoji: string, label: string, value: string, subValue?: string, valueClassName?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
        <span className="text-sm">{emoji}</span> {label}
      </dt>
      <dd className={cn("font-bold text-slate-800 font-mono text-[15px]", valueClassName)}>{value}</dd>
      {subValue && <dd className="text-[11px] text-slate-400 font-mono">{subValue}</dd>}
    </div>
  )
}
