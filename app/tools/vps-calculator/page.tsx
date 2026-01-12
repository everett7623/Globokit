// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，支持深浅色模式切换
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { 
  Server, Calendar, RefreshCw, ArrowRightLeft, Info, RotateCcw, 
  Copy, Download, Check, Moon, Sun 
} from 'lucide-react'
import {
  fetchExchangeRates,
  calculateVPSValue,
  formatCurrency,
  formatDate,
  validateInput,
  getExchangeRateText,
  SUPPORTED_CURRENCIES,
  RENEWAL_PERIODS,
  type PriceMode,
} from '@/lib/tools/vps-calculator'
import html2canvas from 'html2canvas'

export default function VPSCalculatorPage() {
  // --- 基础状态 ---
  const [purchaseDate, setPurchaseDate] = useState('')
  const [tradeDate, setTradeDate] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState(12)
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expectedPrice, setExpectedPrice] = useState('100')
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  const [discountValue, setDiscountValue] = useState('85')

  // --- 视觉状态 (新增) ---
  const [isCardDark, setIsCardDark] = useState(true) // 默认为深色模式

  // --- 逻辑状态 ---
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [generatingImg, setGeneratingImg] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  // ... (中间的 useEffect, loadExchangeRates, handleCalculate 等逻辑代码保持不变，省略以节省篇幅，直接复制上一版的逻辑即可) ...
  // 为了确保完整性，这里补全核心逻辑部分
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setPurchaseDate(today)
    setTradeDate(today)
    loadExchangeRates()
  }, [])

  useEffect(() => {
    if (purchasePrice && purchaseDate && tradeDate) {
      const timeoutId = setTimeout(() => handleCalculate(), 500)
      return () => clearTimeout(timeoutId)
    }
  }, [purchasePrice, purchaseDate, tradeDate, renewalPeriod, currency, expectedPrice, priceMode, discountValue, exchangeRates])

  const loadExchangeRates = async () => {
    try {
      const rates = await fetchExchangeRates()
      setExchangeRates(rates)
    } catch (err) { console.error(err) }
  }

  const handleCalculate = () => {
    let rawPrice = parseFloat(purchasePrice)
    if (!rawPrice || rawPrice <= 0) return
    const validation = validateInput(purchaseDate, rawPrice)
    if (!validation.valid) { setError(validation.error || ''); return }

    try {
      const baseResult = calculateVPSValue(
        new Date(purchaseDate), renewalPeriod, rawPrice, currency, 0, 'total', exchangeRates, new Date(tradeDate)
      )
      let finalExpectedPrice = 0
      // ... (价格模式计算逻辑保持不变)
      if (priceMode === 'discount') {
        const discount = parseFloat(discountValue)
        const factor = discount >= 10 ? discount / 100 : discount / 10
        finalExpectedPrice = baseResult.purchasePriceCNY * factor
      } else if (priceMode === 'monthly') {
        finalExpectedPrice = baseResult.remainingValue + (parseFloat(expectedPrice) || 0)
      } else {
        finalExpectedPrice = parseFloat(expectedPrice) || 0
      }
      const premium = finalExpectedPrice - baseResult.remainingValue
      setResult({
        ...baseResult,
        expectedPrice: finalExpectedPrice,
        premium: premium,
        premiumPercent: baseResult.remainingValue > 0 ? (premium / baseResult.remainingValue) * 100 : 0,
      })
    } catch (err) { console.error(err) }
  }

  const handleReset = () => {
    const today = new Date().toISOString().split('T')[0]
    setPurchaseDate(today)
    setTradeDate(today)
    setPurchasePrice('')
    setResult(null)
  }

  const exportToMarkdown = () => {
    if (!result) return
    const symbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol || currency
    let markdown = `【VPS交易】剩余价值计算\n-------------------------\n商品原价：${symbol}${purchasePrice}\n剩余价值：¥${formatCurrency(result.remainingValue)}\n期望售价：¥${formatCurrency(result.expectedPrice)}\n-------------------------\n计算工具：Globokit.com`
    navigator.clipboard.writeText(markdown).then(() => {
      setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  const exportToImage = async () => {
    if (!resultRef.current) return
    setGeneratingImg(true)
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 3, useCORS: true, backgroundColor: null })
      const link = document.createElement('a')
      link.download = `VPS-Value-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) { console.error(e) } finally { setGeneratingImg(false) }
  }

  // --- 样式辅助函数 ---
  // 根据深浅模式返回对应的颜色类
  const getThemeClass = (darkClass: string, lightClass: string) => isCardDark ? darkClass : lightClass

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">VPS剩余价值计算器</h1>
        <p className="text-muted-foreground text-lg">
          精确计算VPS/服务器剩余价值，生成专业的交易卡片，支持溢价分析与Markdown导出。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧：输入控制台 (代码保持不变) */}
        <Card className="lg:col-span-5 shadow-lg border-t-4 border-t-primary">
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" /> 
              参数设置
            </CardTitle>
            <CardDescription>实时计算，支持多币种汇率自动转换</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* ... (输入区域代码与上一版完全一致，此处省略以聚焦右侧改动) ... */}
            {/* 为了完整运行，请保留上一版左侧 CardContent 内的所有 Input/Select 代码 */}
            {/* 价格输入 */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-8 space-y-2">
                <Label>续费价格</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                    {SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol}
                  </span>
                  <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" className="pl-8 font-mono text-lg"/>
                </div>
              </div>
              <div className="col-span-4 space-y-2">
                <Label>币种</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SUPPORTED_CURRENCIES.map(c => <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>续费周期</Label>
              <div className="grid grid-cols-4 gap-2">
                {[{ label: '月付', val: 1 }, { label: '季付', val: 3 }, { label: '半年', val: 6 }, { label: '年付', val: 12 }, { label: '两年', val: 24 }, { label: '三年', val: 36 }, { label: '五年', val: 60 }].map((item) => (
                  <Button key={item.val} variant={renewalPeriod === item.val ? "default" : "outline"} size="sm" onClick={() => setRenewalPeriod(item.val)} className={cn("text-xs transition-all", renewalPeriod === item.val ? "shadow-md scale-105 font-bold" : "text-muted-foreground hover:text-foreground")}>{item.label}</Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>购买日期</Label><Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} /></div>
              <div className="space-y-2"><Label>交易日期</Label><Input type="date" value={tradeDate} onChange={(e) => setTradeDate(e.target.value)} /></div>
            </div>
            <div className="h-px bg-border my-4" />
            <div className="space-y-3">
              <Label>交易定价策略</Label>
              <Tabs value={priceMode} onValueChange={(v) => setPriceMode(v as PriceMode)}>
                <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="total">一口价</TabsTrigger><TabsTrigger value="monthly">剩余+溢价</TabsTrigger><TabsTrigger value="discount">打折出</TabsTrigger></TabsList>
              </Tabs>
              {priceMode === 'discount' ? (
                <div className="flex flex-wrap gap-2 pt-1">{[95, 85, 75, 65, 9, 8, 7, 6, 5].map(d => (<Button key={d} variant={discountValue === d.toString() ? "default" : "outline"} size="sm" onClick={() => setDiscountValue(d.toString())} className="h-8 w-10 p-0">{d < 10 ? d : d/10}</Button>))} <span className="text-sm self-center ml-2">折</span></div>
              ) : (
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span><Input type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(e.target.value)} placeholder="0.00" className="pl-7" /></div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={handleReset}><RefreshCw className="h-4 w-4 mr-2" /> 重置所有</Button>
          </CardContent>
        </Card>

        {/* 右侧：结果展示 */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative group">
            {/* 卡片主体 */}
            <div 
              ref={resultRef} 
              className={cn(
                "rounded-xl overflow-hidden shadow-2xl transition-all duration-500",
                "border p-8 min-h-[400px] flex flex-col justify-between relative",
                // 动态切换背景和文字颜色
                isCardDark 
                  ? "bg-[#0f172a] text-white border-slate-800" 
                  : "bg-white text-slate-900 border-slate-200"
              )}
            >
              {/* 卡片右上角的切换开关 (绝对定位，不影响截图布局，但在截图中可见) */}
              <div className="absolute top-6 right-6 z-50">
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCardDark(!isCardDark)}
                    className={cn(
                      "rounded-full h-8 w-8 transition-colors",
                      isCardDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"
                    )}
                    // 生成图片时隐藏这个按钮，防止按钮被截图进去影响美观（可选）
                    // 如果希望截图里也有开关图标，可以去掉 data-html2canvas-ignore
                    data-html2canvas-ignore="true" 
                    title={isCardDark ? "切换到浅色模式" : "切换到深色模式"}
                 >
                    {isCardDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                 </Button>
              </div>

              {/* 背景装饰 (仅深色模式显示，或者浅色模式用不同颜色) */}
              {isCardDark && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
                </>
              )}
              {!isCardDark && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
                </>
              )}

              {result ? (
                <>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className={cn("text-xs font-medium uppercase tracking-wider mb-1", isCardDark ? "text-slate-400" : "text-slate-500")}>
                        VPS Residual Value
                      </div>
                      <h2 className={cn("text-2xl font-bold flex items-center gap-2", isCardDark ? "text-white" : "text-slate-900")}>
                        <Server className={cn("h-6 w-6", isCardDark ? "text-blue-400" : "text-blue-600")} />
                        剩余价值计算
                      </h2>
                    </div>
                    {/* 占位，防止标题撞到开关 */}
                    <div className="w-8"></div> 
                  </div>

                  <div className="py-8 grid grid-cols-2 gap-8 relative z-10">
                    <div>
                      <div className={cn("text-sm mb-1", isCardDark ? "text-slate-400" : "text-slate-500")}>理论剩余价值 (RMB)</div>
                      <div className={cn("text-4xl font-black tracking-tight", isCardDark ? "text-blue-400" : "text-blue-600")}>
                        ¥ {formatCurrency(result.remainingValue)}
                      </div>
                      <div className={cn("text-xs mt-1", isCardDark ? "text-slate-500" : "text-slate-400")}>
                        ≈ {currency} {(result.remainingValue / (exchangeRates[currency] ? (1/exchangeRates[currency]) : 1)).toFixed(2)}
                      </div>
                    </div>
                    <div className={cn("border-l pl-8", isCardDark ? "border-slate-800" : "border-slate-200")}>
                      <div className={cn("text-sm mb-1", isCardDark ? "text-slate-400" : "text-slate-500")}>期望成交价 (RMB)</div>
                      <div className={cn("text-4xl font-black tracking-tight", isCardDark ? "text-white" : "text-slate-900")}>
                        ¥ {formatCurrency(result.expectedPrice)}
                      </div>
                      <div className={cn(
                        "text-xs mt-1 font-medium",
                        result.premium >= 0 ? (isCardDark ? "text-emerald-400" : "text-emerald-600") : (isCardDark ? "text-rose-400" : "text-rose-600")
                      )}>
                        {result.premium >= 0 ? '+' : ''}¥{formatCurrency(result.premium)} ({result.premium >= 0 ? '溢价' : '折价'} {Math.abs(result.premiumPercent).toFixed(1)}%)
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-2 mb-6">
                    <div className={cn("flex justify-between text-xs", isCardDark ? "text-slate-400" : "text-slate-500")}>
                      <span>已用 {(100 - result.remainingRatio * 100).toFixed(1)}%</span>
                      <span>剩余 {result.remainingDays} 天</span>
                    </div>
                    <div className={cn("h-2 w-full rounded-full overflow-hidden", isCardDark ? "bg-slate-800" : "bg-slate-100")}>
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000" 
                        style={{ width: `${result.remainingRatio * 100}%` }} 
                      />
                    </div>
                    <div className={cn("flex justify-between text-xs pt-1 font-mono", isCardDark ? "text-slate-500" : "text-slate-400")}>
                      <span>{tradeDate} (Start)</span>
                      <span>{formatDate(result.expireDate)} (End)</span>
                    </div>
                  </div>

                  <div className={cn("grid grid-cols-3 gap-2 pt-6 border-t relative z-10", isCardDark ? "border-slate-800" : "border-slate-100")}>
                    <div>
                      <div className={cn("text-[10px] uppercase", isCardDark ? "text-slate-500" : "text-slate-400")}>续费价格</div>
                      <div className={cn("text-sm font-medium", isCardDark ? "text-slate-200" : "text-slate-700")}>{currency} {purchasePrice}</div>
                    </div>
                    <div>
                      <div className={cn("text-[10px] uppercase", isCardDark ? "text-slate-500" : "text-slate-400")}>日均成本</div>
                      <div className={cn("text-sm font-medium", isCardDark ? "text-slate-200" : "text-slate-700")}>¥ {result.dailyPrice.toFixed(3)}</div>
                    </div>
                    <div className="text-right">
                      <div className={cn("text-[10px] uppercase", isCardDark ? "text-slate-500" : "text-slate-400")}>计算来源</div>
                      <div className={cn("text-sm font-bold flex items-center justify-end gap-1", isCardDark ? "text-slate-200" : "text-slate-700")}>
                        GloboKit <RefreshCw className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-30">
                  <Server className="h-16 w-16 mb-4" />
                  <p className="text-lg">等待输入参数...</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button size="lg" variant="outline" className="w-full border-dashed" onClick={exportToMarkdown} disabled={!result}>
              {copySuccess ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copySuccess ? '已复制' : '复制发帖文本'}
            </Button>
            <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white" onClick={exportToImage} disabled={!result || generatingImg}>
              {generatingImg ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
              {generatingImg ? '生成中...' : '下载交易卡片'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
