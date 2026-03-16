// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持生成交易卡片
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-03-16
// 更新内容: 新增 VPSKnow 推荐卡片；优化购买日期上限、汇率失败提示、折扣为0提示

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
  TrendingUp, Info
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
  const [rateError, setRateError] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)
  const quickDiscounts = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6, 0.5]
  const today = new Date().toISOString().split('T')[0]

  // 初始化
  useEffect(() => {
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
    if (!rates || Object.keys(rates).length === 0) {
      setRateError(true)
    } else {
      setRateError(false)
      setExchangeRates(rates)
    }
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
    
    if (res.totalDays > 0 && !isNaN(res.remainingValue)) {
      setResult(res)
    }
  }

  const handleReset = () => {
    setPurchaseDate('') 
    setTradeDate(today)
    setPurchasePrice('')
    setModeInput('')
    setPriceMode('total')
    setResult(null)
  }

  // --- Markdown 生成 ---
  const exportToMarkdown = () => {
    if (!result) return
    const symbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol
    const cycleLabel = RENEWAL_PERIODS.find(r => r.value === parseInt(renewalPeriod))?.label
    const isProfit = result.premium >= 0
    const profitSign = isProfit ? '+' : ''
    const profitColorObj = isProfit ? '💎 溢价收益' : '⚠️ 折价损失'
    const now = new Date()
    const formattedTime = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`

    const md = `
# VPS 剩余价值计算结果

| 分类 | 项目 | 数值 | 说明 |
| :--- | :--- | :--- | :--- |
| **💰 价格信息** | 原购价格 | ${symbol}${purchasePrice} | 约 ¥${formatCurrency(result.purchasePriceCNY)} |
| | 期望售价 | ¥${formatCurrency(result.expectedPrice)} | 人民币计价 |
| | 剩余价值 | ¥${formatCurrency(result.remainingValue)} | 当前估值 |
| | ${profitColorObj} | ${profitSign}¥${formatCurrency(result.premium)} | 预期${isProfit ? '盈利' : '亏损'} |
| | 投资回报率 | ${profitSign}${result.premiumPercent.toFixed(2)}% | ROI 指标 |
| **🗓️ 时间信息** | 购买日期 | ${purchaseDate} | 起始时间 |
| | 续费周期 | ${cycleLabel} | 服务期限 |
| | 到期日期 | ${formatDate(new Date(result.expireDate))} | 截止时间 |
| | 总使用期限 | ${result.totalDays} 天 | 完整周期 |
| | 已使用时间 | ${result.usedDays} 天 | 已消耗时间 |
| | 剩余时间 | ${result.remainingDays} 天 | 可用时间 |
| | 使用进度 | ${((1-result.remainingRatio)*100).toFixed(0)}% | 完成度 |

## 📊 分析结论

${isProfit 
  ? `**🦄 推荐交易**\n\n✅ 按期望售价 **¥${formatCurrency(result.expectedPrice)}** 出售，可获得 **¥${formatCurrency(result.premium)}** 的额外收益，投资回报率达到 **${result.premiumPercent.toFixed(2)}%**，建议按此价格进行交易。` 
  : `**⚠️ 性价比交易**\n\n📉 当前定价低于剩余价值，属于折价出售。买家相当于获得了 **${formatCurrency(Math.abs(result.premium))}元** 的优惠，性价比极高！`
}

---

📋 报告生成时间：${formattedTime}
🔗 数据来源：VPS 剩余价值计算器
🌐 更多工具请访问：Globokit.com
`
    navigator.clipboard.writeText(md.trim()).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
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
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      {/* 宽度 max-w-[1400px] */}
      <div className="max-w-[1400px] mx-auto space-y-8">

        {/* 头部标题 */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-3">
              <span className="text-4xl">🧮</span> VPS 剩余价值计算器 <span className="text-2xl">🚀</span>
            </h1>
            <p className="text-lg text-slate-600 mt-3 max-w-2xl">
              基于实时汇率与精确到天的时间计算，助您快速分析服务器残值与交易盈亏。
            </p>
          </div>

          {/* VPSKnow 推荐卡片 */}
          <a
            href="https://vpsknow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 flex items-center gap-4 px-5 py-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer max-w-xs"
          >
            <img
              src="https://vpsknow.com/favicon.png"
              alt="VPSKnow Logo"
              className="w-12 h-12 rounded-xl object-contain flex-shrink-0 shadow-sm"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[11px] font-bold text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">推荐</span>
                <span className="text-sm font-extrabold text-slate-800 group-hover:text-blue-700 transition-colors">VPSKnow</span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                专业 VPS 评测 · 机场推荐<br/>全球云服务器与网络工具指南
              </p>
            </div>
            <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* 汇率异常提示 */}
        {rateError && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
            <span>⚠️</span>
            <span>实时汇率获取失败，计算结果可能不准确，请稍后刷新重试。</span>
          </div>
        )}

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
                {/* 价格和币种 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    💵 购买价格 & 币种
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex-1 flex rounded-md shadow-sm ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/20 transition-all bg-white overflow-hidden">
                      <span className="flex select-none items-center px-3 text-slate-500 font-bold bg-slate-50/50 border-r border-slate-100 sm:text-sm whitespace-nowrap">
                        {SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol}
                      </span>
                      <Input 
                        type="number" 
                        value={purchasePrice} 
                        onChange={e => setPurchasePrice(e.target.value)} 
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6 font-mono"
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
                {/* 日期选择 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3 relative">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">📆 购买日期</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        max={today}
                        value={purchaseDate} 
                        onChange={e => setPurchaseDate(e.target.value)} 
                        className="font-mono border-slate-200 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 relative">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">⏱️ 交易日期</Label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        max="9999-12-31"
                        value={tradeDate} 
                        onChange={e => setTradeDate(e.target.value)} 
                        className="font-mono border-slate-200 shadow-sm" 
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
                            placeholder="输入折扣 (如0.1，表示白送)"
                            className="pl-3 pr-24 border-slate-200 shadow-sm focus-visible:ring-0 font-mono"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                            💸 x 剩余价值
                          </span>
                        </div>
                        {parseFloat(modeInput) === 0 && modeInput !== '' && (
                          <p className="text-xs text-amber-500">⚠️ 折扣为 0 表示免费赠送，请确认是否正确</p>
                        )}
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
            <div className="relative group perspective-1000 flex flex-col h-full">
              <div 
                ref={resultRef}
                className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/50 transition-all duration-300 flex flex-col bg-white border border-slate-100 text-slate-900 h-full"
              >
                {result ? (
                  <div className="flex flex-col h-full">
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
                              className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                              style={{ width: `${(1-result.remainingRatio)*100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧卡片底部 */}
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
