// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持深浅色模式切换
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
  TrendingUp, TrendingDown, CalendarClock, DollarSign 
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
  const [renewalPeriod, setRenewalPeriod] = useState('12') // 月数
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expectedPrice, setExpectedPrice] = useState('') // 期望售价(CNY)

  // --- 逻辑状态 ---
  const [isCardDark, setIsCardDark] = useState(true)
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [generatingImg, setGeneratingImg] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  // 初始化
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
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
  }, [purchasePrice, purchaseDate, tradeDate, renewalPeriod, currency, expectedPrice, exchangeRates])

  const loadExchangeRates = async () => {
    const rates = await fetchExchangeRates()
    setExchangeRates(rates)
  }

  const handleCalculate = () => {
    const priceNum = parseFloat(purchasePrice)
    const expectedNum = parseFloat(expectedPrice) || 0
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
    const today = new Date().toISOString().split('T')[0]
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
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">VPS剩余价值计算器</h1>
        <p className="text-muted-foreground mt-2">基于实时汇率与剩余天数，精确计算服务器残值与交易溢价。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧：输入区 */}
        <Card className="lg:col-span-4 border-t-4 border-t-primary shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" /> 参数录入
            </CardTitle>
            <CardDescription>只需3步，自动分析盈亏</CardDescription>
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
                <span className="cursor-pointer hover:text-primary" onClick={loadExchangeRates}><RefreshCw className="h-3 w-3 inline"/> 刷新</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>续费周期</Label>
              <div className="grid grid-cols-4 gap-2">
                {[{l:'月',v:'1'}, {l:'季',v:'3'}, {l:'半年',v:'6'}, {l:'年',v:'12'}, {l:'两年',v:'24'}, {l:'三年',v:'36'}, {l:'五年',v:'60'}].map(p => (
                  <Button 
                    key={p.v} 
                    variant={renewalPeriod === p.v ? "default" : "outline"} 
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
                <Input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>交易日期</Label>
                <Input type="date" value={tradeDate} onChange={e => setTradeDate(e.target.value)} />
              </div>
            </div>

            <div className="h-px bg-border/50" />

            <div className="space-y-2">
              <Label className="flex justify-between">
                <span>期望售价 (人民币)</span>
                <span className="text-xs font-normal text-muted-foreground">留空则默认等于剩余价值</span>
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

        {/* 右侧：结果展示区 (卡片) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative group">
            {/* 卡片主体 */}
            <div 
              ref={resultRef}
              className={cn(
                "rounded-xl overflow-hidden shadow-2xl transition-all duration-300 p-8 min-h-[400px] flex flex-col justify-between border",
                isCardDark ? "bg-[#0f172a] border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
              )}
            >
              {/* 主题切换按钮 (仅显示在网页，截图时不包含) */}
              <div className="absolute top-6 right-6 z-50" data-html2canvas-ignore>
                <Button variant="ghost" size="icon" onClick={() => setIsCardDark(!isCardDark)} className="rounded-full">
                  {isCardDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>

              {/* 装饰背景 */}
              {isCardDark && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
                </>
              )}

              {result ? (
                <>
                  <div className="flex items-center gap-2 mb-8 relative z-10">
                    <div className={cn("p-2 rounded-lg", isCardDark ? "bg-white/10" : "bg-slate-100")}>
                      <TrendingUp className={cn("h-6 w-6", isCardDark ? "text-blue-400" : "text-blue-600")} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">剩余价值计算结果</h2>
                      <div className={cn("text-xs opacity-70")}>基于 {tradeDate} 汇率结算</div>
                    </div>
                  </div>

                  {/* 核心三栏数据 */}
                  <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                    {/* 1. 剩余价值 */}
                    <div className={cn("p-4 rounded-xl text-center border", isCardDark ? "bg-blue-500/10 border-blue-500/20" : "bg-blue-50 border-blue-100")}>
                      <div className={cn("text-xs mb-1 font-bold", isCardDark ? "text-blue-400" : "text-blue-600")}>剩余价值</div>
                      <div className={cn("text-3xl font-black tracking-tight", isCardDark ? "text-blue-100" : "text-blue-900")}>
                        ¥{formatCurrency(result.remainingValue)}
                      </div>
                      <div className="text-[10px] opacity-60 mt-1">剩余 {result.remainingDays} 天</div>
                    </div>

                    {/* 2. 期望售价 */}
                    <div className={cn("p-4 rounded-xl text-center border", isCardDark ? "bg-purple-500/10 border-purple-500/20" : "bg-purple-50 border-purple-100")}>
                      <div className={cn("text-xs mb-1 font-bold", isCardDark ? "text-purple-400" : "text-purple-600")}>期望售价</div>
                      <div className={cn("text-3xl font-black tracking-tight", isCardDark ? "text-purple-100" : "text-purple-900")}>
                        ¥{formatCurrency(result.expectedPrice)}
                      </div>
                      <div className="text-[10px] opacity-60 mt-1">回报率 {(result.expectedPrice/result.purchasePriceCNY * 100).toFixed(0)}%</div>
                    </div>

                    {/* 3. 溢价/折价 */}
                    <div className={cn("p-4 rounded-xl text-center border", 
                      result.premium >= 0 
                        ? (isCardDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100")
                        : (isCardDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-100")
                    )}>
                      <div className={cn("text-xs mb-1 font-bold", result.premium >= 0 ? "text-emerald-500" : "text-rose-500")}>
                        {result.premium >= 0 ? '溢价收益' : '折价亏损'}
                      </div>
                      <div className={cn("text-3xl font-black tracking-tight", result.premium >= 0 ? "text-emerald-500" : "text-rose-500")}>
                        {result.premium >= 0 ? '+' : ''}{formatCurrency(result.premium)}
                      </div>
                      <div className={cn("text-[10px] font-bold mt-1", result.premium >= 0 ? "text-emerald-500" : "text-rose-500")}>
                        {result.premium >= 0 ? '+' : ''}{result.premiumPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* 详细信息列表 */}
                  <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t relative z-10", isCardDark ? "border-white/10" : "border-slate-100")}>
                    <div>
                      <div className="text-[10px] uppercase opacity-50 mb-1">原购价格</div>
                      <div className="font-mono font-medium">{SUPPORTED_CURRENCIES.find(c=>c.code===currency)?.symbol}{purchasePrice}</div>
                      <div className="text-[10px] opacity-50">≈ ¥{formatCurrency(result.purchasePriceCNY)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-50 mb-1">到期时间</div>
                      <div className="font-mono font-medium">{formatDate(new Date(result.expireDate))}</div>
                      <div className="text-[10px] opacity-50">总计 {result.totalDays} 天</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-50 mb-1">已用时长</div>
                      <div className="font-mono font-medium">{result.usedDays} 天</div>
                      <div className="text-[10px] opacity-50">进度 {((1-result.remainingRatio)*100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-50 mb-1">日均成本</div>
                      <div className="font-mono font-medium">¥ {result.dailyPrice.toFixed(3)}</div>
                      <div className="text-[10px] opacity-50">性价比分析</div>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="relative z-10">
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-200/20">
                      <div 
                        className={cn("h-full transition-all duration-1000", isCardDark ? "bg-blue-500" : "bg-blue-600")}
                        style={{ width: `${(1-result.remainingRatio)*100}%` }}
                      ></div>
                    </div>
                  </div>

                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-30">
                  <Calculator className="h-16 w-16 mb-4" />
                  <p>请输入左侧参数开始计算</p>
                </div>
              )}
            </div>
          </div>

          {/* 按钮组 */}
          <div className="grid grid-cols-2 gap-4">
            <Button size="lg" variant="outline" onClick={exportToMarkdown} disabled={!result}>
              {copySuccess ? <Check className="h-4 w-4 mr-2"/> : <Copy className="h-4 w-4 mr-2"/>}
              {copySuccess ? '已复制' : '复制 MD 文本'}
            </Button>
            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800" onClick={exportToImage} disabled={!result || generatingImg}>
              {generatingImg ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : <Download className="h-4 w-4 mr-2"/>}
              {generatingImg ? '生成中...' : '下载交易图片'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
