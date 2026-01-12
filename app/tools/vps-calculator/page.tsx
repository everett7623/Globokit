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
  
  // --- 价格模式状态 (已恢复) ---
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  // modeInput 存储当前模式下的输入值：
  // total -> 期望总价
  // premium -> 溢价金额 (+/-)
  // discount -> 折扣率 (0.85)
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

    // 处理不同模式下的输入值
    let val = parseFloat(modeInput)
    
    // 如果输入为空，根据模式给默认值
    if (modeInput === '' || isNaN(val)) {
      if (priceMode === 'total') val = -1 // 标记未填
      if (priceMode === 'premium') val = 0 // 默认无溢价
      if (priceMode === 'discount') val = 1 // 默认原价(100%)
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
    <div className="max-w-7xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">VPS剩余价值计算器</h1>
        <p className="text-muted-foreground mt-2">基于实时汇率与剩余天数，精确计算服务器残值与交易溢价。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧：输入区 */}
        <Card className="lg:col-span-4 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calculator className="h-4 w-4 text-primary" /> 参数录入
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>购买价格 & 币种</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                    {SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol}
                  </span>
                  <Input 
                    type="number" 
                    value={purchasePrice} 
                    onChange={e => setPurchasePrice(e.target.value)} 
                    className="pl-8" 
                    placeholder="0.00"
                  />
                </div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>{getExchangeRateText(currency, exchangeRates)}</span>
                <span className="cursor-pointer hover:text-primary flex items-center gap-1" onClick={loadExchangeRates}>
                  <RefreshCw className="h-3 w-3"/> 刷新
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>续费周期</Label>
              <div className="grid grid-cols-4 gap-2">
                {RENEWAL_PERIODS.map(p => (
                  <Button 
                    key={p.value} 
                    variant={parseInt(renewalPeriod) === p.value ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setRenewalPeriod(p.value.toString())}
                    className="text-xs"
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>购买日期</Label>
                <Input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label>交易日期</Label>
                <Input type="date" value={tradeDate} onChange={e => setTradeDate(e.target.value)} className="font-mono" />
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* 价格模式 Tabs (已恢复) */}
            <div className="space-y-3">
              <Label>定价策略</Label>
              <Tabs value={priceMode} onValueChange={(v) => {
                setPriceMode(v as PriceMode);
                setModeInput(''); // 切换模式清空输入
              }}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="total">一口价</TabsTrigger>
                  <TabsTrigger value="premium">溢价模式</TabsTrigger>
                  <TabsTrigger value="discount">折扣模式</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* 动态输入区域 */}
              <div className="pt-1">
                {priceMode === 'discount' ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {quickDiscounts.map(d => (
                        <Button 
                          key={d} 
                          variant={Math.abs(parseFloat(modeInput) - d) < 0.01 ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => setModeInput(d.toString())}
                          className="flex-1 h-8 text-xs"
                        >
                          {d * 10}折
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={modeInput} 
                        onChange={e => setModeInput(e.target.value)} 
                        placeholder="输入折扣 (如 0.8)"
                        className="pl-3"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">x 剩余价值</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">¥</span>
                    <Input 
                      type="number" 
                      value={modeInput} 
                      onChange={e => setModeInput(e.target.value)} 
                      className="pl-8"
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

            <Button variant="outline" className="w-full mt-4" onClick={handleReset}>重置所有</Button>
          </CardContent>
        </Card>

        {/* 右侧：结果展示区 (默认使用清爽的白底风格) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative group">
            <div 
              ref={resultRef}
              className="rounded-xl overflow-hidden shadow-sm transition-all duration-300 p-8 min-h-[400px] flex flex-col justify-between border bg-white border-slate-200 text-slate-900"
            >
              {result ? (
                <>
                  <div className="flex items-center gap-2 mb-8 relative z-10">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold">剩余价值计算结果</h2>
                  </div>

                  {/* 核心三栏数据 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                    {/* 1. 剩余价值 */}
                    <div className="p-6 rounded-2xl text-center border-2 bg-blue-50 border-blue-100">
                      <div className="text-sm mb-2 font-bold text-blue-600">剩余价值</div>
                      <div className="text-4xl font-black tracking-tight text-blue-900">
                        <span className="text-2xl mr-1">¥</span>{formatCurrency(result.remainingValue)}
                      </div>
                      <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-2 bg-blue-200/50 text-blue-700">
                        剩余 {(result.remainingRatio * 100).toFixed(1)}%
                      </div>
                    </div>

                    {/* 2. 期望售价 */}
                    <div className="p-6 rounded-2xl text-center border-2 bg-purple-50 border-purple-100">
                      <div className="text-sm mb-2 font-bold text-purple-600">期望售价</div>
                      <div className="text-4xl font-black tracking-tight text-purple-900">
                        <span className="text-2xl mr-1">¥</span>{formatCurrency(result.expectedPrice)}
                      </div>
                      <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-2 bg-purple-200/50 text-purple-700">
                        {priceMode === 'discount' ? `${(parseFloat(modeInput||'1')*10).toFixed(1)}折` : '汇率转换后'}
                      </div>
                    </div>

                    {/* 3. 溢价/折价 */}
                    <div className={cn("p-6 rounded-2xl text-center border-2", 
                      result.premium >= 0 
                        ? "bg-emerald-50 border-emerald-100"
                        : "bg-rose-50 border-rose-100"
                    )}>
                      <div className={cn("text-sm mb-2 font-bold", result.premium >= 0 ? "text-emerald-600" : "text-rose-600")}>
                        {result.premium >= 0 ? '预期溢价' : '预期折价'}
                      </div>
                      <div className={cn("text-4xl font-black tracking-tight", result.premium >= 0 ? "text-emerald-600" : "text-rose-600")}>
                        <span className="text-2xl mr-1">{result.premium >= 0 ? '+' : ''}¥</span>{formatCurrency(Math.abs(result.premium))}
                      </div>
                      <div className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-2", 
                        result.premium >= 0 ? "bg-emerald-200/50 text-emerald-700" : "bg-rose-200/50 text-rose-700"
                      )}>
                        {result.premium >= 0 ? '+' : ''}{Math.abs(result.premiumPercent).toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* 详细信息表格 */}
                  <div className="p-6 rounded-xl relative z-10 bg-gray-50">
                    <h3 className="text-sm font-bold mb-4 opacity-70">详细分析</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
                      <div>
                        <div className="text-xs opacity-50 mb-1">原购价格</div>
                        <div className="font-bold">{SUPPORTED_CURRENCIES.find(c=>c.code===currency)?.symbol}{purchasePrice}</div>
                        <div className="text-[10px] opacity-50">≈ ¥{formatCurrency(result.purchasePriceCNY)}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">续费周期</div>
                        <div className="font-bold">{RENEWAL_PERIODS.find(r=>r.value===parseInt(renewalPeriod))?.label}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">到期日期</div>
                        <div className="font-bold text-orange-500">{formatDate(new Date(result.expireDate))}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">总使用期限</div>
                        <div className="font-bold">{result.totalDays} 天</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">已使用天数</div>
                        <div className="font-bold">{result.usedDays} 天</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">剩余天数</div>
                        <div className="font-bold text-blue-500">{result.remainingDays} 天</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">使用进度</div>
                        <div className="font-bold">{((1-result.remainingRatio)*100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">日均成本</div>
                        <div className="font-bold">¥ {result.dailyPrice.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-xs opacity-50 mb-2">VPS 生命周期进度</div>
                      <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200">
                        <div 
                          className="h-full transition-all duration-1000 bg-blue-600"
                          style={{ width: `${(1-result.remainingRatio)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className={cn("mt-4 p-3 rounded-lg flex items-start gap-2 text-sm", result.premium >= 0 ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800")}>
                    {result.premium >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                    <div>
                      <span className="font-bold">{result.premium >= 0 ? '盈利方案：' : '亏损方案：'}</span>
                      当前定价较剩余价值{result.premium >= 0 ? '高出' : '低'} <span className="font-bold">¥{formatCurrency(Math.abs(result.premium))}</span>。
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-30">
                  <Calculator className="h-16 w-16 mb-4" />
                  <p>输入参数以查看分析结果</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={exportToMarkdown} disabled={!result}>
              {copySuccess ? <Check className="h-4 w-4 mr-2"/> : <Copy className="h-4 w-4 mr-2"/>}
              {copySuccess ? '已复制' : '复制MD'}
            </Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={exportToImage} disabled={!result || generatingImg}>
              {generatingImg ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : <Download className="h-4 w-4 mr-2"/>}
              下载图片
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
