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
import { cn } from '@/lib/utils'
import { 
  Calculator, RefreshCw, Copy, Download, Check, Moon, Sun, 
  TrendingUp, TrendingDown, DollarSign 
} from 'lucide-react'
import {
  fetchExchangeRates,
  calculateVPSValue,
  formatCurrency,
  formatDate,
  getExchangeRateText,
  SUPPORTED_CURRENCIES,
  type CalculationResult
} from '@/lib/tools/vps-calculator'
import html2canvas from 'html2canvas'

export default function VPSCalculatorPage() {
  // --- 输入状态 ---
  const [purchaseDate, setPurchaseDate] = useState('')
  const [tradeDate, setTradeDate] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState('36') // 默认三年
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expectedPrice, setExpectedPrice] = useState('')

  // --- 逻辑状态 ---
  const [isCardDark, setIsCardDark] = useState(false) // 默认浅色模式
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [generatingImg, setGeneratingImg] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  // 初始化: 生成标准的 YYYY-MM-DD 字符串
  useEffect(() => {
    const getTodayISO = () => {
      const d = new Date()
      // padStart 确保月份和日期永远是两位数 (01-12, 01-31)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
    const today = getTodayISO()
    setPurchaseDate(today)
    setTradeDate(today)
    loadExchangeRates()
  }, [])

  // 自动计算 (300ms 防抖)
  useEffect(() => {
    if (purchasePrice && purchaseDate && tradeDate) {
      const timer = setTimeout(handleCalculate, 300)
      return () => clearTimeout(timer)
    }
  }, [purchasePrice, purchaseDate, tradeDate, renewalPeriod, currency, expectedPrice, exchangeRates])

  const loadExchangeRates = async () => {
    const rates = await fetchExchangeRates()
    setExchangeRates(rates)
  }

  const handleCalculate = () => {
    const priceNum = parseFloat(purchasePrice)
    // -1 代表未填期望价格
    const expectedNum = expectedPrice === '' ? -1 : parseFloat(expectedPrice)
    
    if (!priceNum || !purchaseDate) return

    const res = calculateVPSValue(
      purchaseDate,
      parseInt(renewalPeriod),
      priceNum,
      currency,
      expectedNum,
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
    setExpectedPrice('')
    setResult(null)
  }

  const exportToMarkdown = () => {
    if (!result) return
    const symbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol
    const md = `【VPS交易】\n原价：${symbol}${purchasePrice} / ${parseInt(renewalPeriod) === 12 ? '年' : parseInt(renewalPeriod) + '个月'}\n到期：${formatDate(new Date(result.expireDate))}\n剩余：${result.remainingDays}天\n价值：¥${formatCurrency(result.remainingValue)}\n售价：¥${formatCurrency(result.expectedPrice)}\n溢价：¥${formatCurrency(result.premium)}\n计算：Globokit.com`
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
              <div className="text-xs text-muted-foreground text-right">
                {getExchangeRateText(currency, exchangeRates)}
              </div>
            </div>

            <div className="space-y-2">
              <Label>续费周期</Label>
              <div className="grid grid-cols-4 gap-2">
                {[{l:'月',v:'1'}, {l:'季',v:'3'}, {l:'半年',v:'6'}, {l:'年',v:'12'}, {l:'两年',v:'24'}, {l:'三年',v:'36'}, {l:'五年',v:'60'}].map(p => (
                  <Button 
                    key={p.v} 
                    variant={parseInt(renewalPeriod) === parseInt(p.v) ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setRenewalPeriod(p.v)}
                    className="text-xs"
                  >
                    {p.l}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>购买日期</Label>
                <Input 
                  type="date" 
                  value={purchaseDate} 
                  onChange={e => setPurchaseDate(e.target.value)} 
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>交易日期</Label>
                <Input 
                  type="date" 
                  value={tradeDate} 
                  onChange={e => setTradeDate(e.target.value)} 
                  className="font-mono"
                />
              </div>
            </div>

            <div className="h-px bg-border/50" />

            <div className="space-y-2">
              <Label className="flex justify-between">
                <span>期望售价 (人民币)</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">¥</span>
                <Input 
                  type="number" 
                  value={expectedPrice} 
                  onChange={e => setExpectedPrice(e.target.value)} 
                  className="pl-8"
                  placeholder={result ? Math.round(result.remainingValue).toString() : "0"}
                />
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleReset}>重置</Button>
          </CardContent>
        </Card>

        {/* 右侧：结果展示区 */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative group">
            <div 
              ref={resultRef}
              className={cn(
                "rounded-xl overflow-hidden shadow-sm transition-all duration-300 p-8 min-h-[400px] flex flex-col justify-between border",
                isCardDark ? "bg-[#0f172a] border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
              )}
            >
              {/* 主题切换 */}
              <div className="absolute top-6 right-6 z-50" data-html2canvas-ignore>
                <Button variant="ghost" size="icon" onClick={() => setIsCardDark(!isCardDark)} className="rounded-full">
                  {isCardDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>

              {result ? (
                <>
                  <div className="flex items-center gap-2 mb-8 relative z-10">
                    <TrendingUp className={cn("h-6 w-6", isCardDark ? "text-blue-400" : "text-blue-600")} />
                    <h2 className="text-xl font-bold">剩余价值计算结果</h2>
                  </div>

                  {/* 核心三栏数据 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                    {/* 1. 剩余价值 */}
                    <div className={cn("p-6 rounded-2xl text-center border-2", isCardDark ? "bg-blue-500/10 border-blue-500/20" : "bg-blue-50 border-blue-100")}>
                      <div className={cn("text-sm mb-2 font-bold", isCardDark ? "text-blue-400" : "text-blue-600")}>剩余价值</div>
                      <div className={cn("text-4xl font-black tracking-tight", isCardDark ? "text-blue-100" : "text-blue-900")}>
                        <span className="text-2xl mr-1">¥</span>{formatCurrency(result.remainingValue)}
                      </div>
                      <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-2 bg-blue-200/50 text-blue-700">
                        剩余 {(result.remainingRatio * 100).toFixed(1)}%
                      </div>
                    </div>

                    {/* 2. 期望售价 */}
                    <div className={cn("p-6 rounded-2xl text-center border-2", isCardDark ? "bg-purple-500/10 border-purple-500/20" : "bg-purple-50 border-purple-100")}>
                      <div className={cn("text-sm mb-2 font-bold", isCardDark ? "text-purple-400" : "text-purple-600")}>期望售价</div>
                      <div className={cn("text-4xl font-black tracking-tight", isCardDark ? "text-purple-100" : "text-purple-900")}>
                        <span className="text-2xl mr-1">¥</span>{formatCurrency(result.expectedPrice)}
                      </div>
                      <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-2 bg-purple-200/50 text-purple-700">
                        汇率转换后
                      </div>
                    </div>

                    {/* 3. 溢价/折价 */}
                    <div className={cn("p-6 rounded-2xl text-center border-2", 
                      result.premium >= 0 
                        ? (isCardDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100")
                        : (isCardDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-100")
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
                  <div className={cn("p-6 rounded-xl relative z-10", isCardDark ? "bg-white/5" : "bg-gray-50")}>
                    <h3 className="text-sm font-bold mb-4 opacity-70">详细分析</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
                      <div>
                        <div className="text-xs opacity-50 mb-1">原购价格</div>
                        <div className="font-bold">{SUPPORTED_CURRENCIES.find(c=>c.code===currency)?.symbol}{purchasePrice}</div>
                        <div className="text-[10px] opacity-50">≈ ¥{formatCurrency(result.purchasePriceCNY)}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1">续费周期</div>
                        <div className="font-bold">{parseInt(renewalPeriod) === 12 ? '年付' : parseInt(renewalPeriod) === 36 ? '三年付' : renewalPeriod + '个月'}</div>
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
                        <div className="text-xs opacity-50 mb-1">投资回报率</div>
                        <div className={cn("font-bold", result.premium >= 0 ? "text-emerald-500" : "text-rose-500")}>
                          {result.premium >= 0 ? '+' : ''}{result.premiumPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-xs opacity-50 mb-2">VPS 生命周期进度</div>
                      <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <div 
                          className={cn("h-full transition-all duration-1000", isCardDark ? "bg-blue-500" : "bg-slate-800")}
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

          {/* 按钮组 */}
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
