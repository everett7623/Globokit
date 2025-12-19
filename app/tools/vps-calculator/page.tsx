// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-12-19

'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calculator,
  Server,
  TrendingUp,
  TrendingDown,
  Calendar,
  Coins,
  Info,
  RefreshCw,
  FileDown,
  Image as ImageIcon,
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
  const [renewalPeriod, setRenewalPeriod] = useState('12')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expectedPrice, setExpectedPrice] = useState('100')
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  const [discountValue, setDiscountValue] = useState('85')

  // --- 逻辑状态 ---
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  // 初始化加载
  useEffect(() => {
    const today = new Date()
    setPurchaseDate(today.toISOString().split('T')[0])
    loadExchangeRates()
  }, [])

  const loadExchangeRates = async () => {
    try {
      const rates = await fetchExchangeRates()
      setExchangeRates(rates)
    } catch (err) {
      console.error('加载汇率失败', err)
    }
  }

  const quickDiscounts = [95, 85, 75, 65, 9, 8, 7, 6, 5]

  // --- 核心计算 ---
  const handleCalculate = () => {
    setError('')
    let rawPrice = parseFloat(purchasePrice)
    if (!rawPrice || rawPrice <= 0) {
      setError('请输入有效的购买价格')
      return
    }
    const validation = validateInput(purchaseDate, rawPrice)
    if (!validation.valid) {
      setError(validation.error || '')
      return
    }

    setLoading(true)
    try {
      const rate = 1 / (exchangeRates[currency] || 1)
      const purchasePriceCNY = rawPrice * rate

      const baseResult = calculateVPSValue(
        new Date(purchaseDate),
        parseInt(renewalPeriod),
        rawPrice,
        currency,
        0, 
        'total', 
        exchangeRates
      )

      let finalExpectedPrice = 0
      if (priceMode === 'discount') {
        const discount = parseFloat(discountValue)
        const factor = discount >= 10 ? discount / 100 : discount / 10
        finalExpectedPrice = purchasePriceCNY * factor
      } else if (priceMode === 'monthly') {
        const premiumAmount = parseFloat(expectedPrice) || 0
        finalExpectedPrice = baseResult.remainingValue + premiumAmount
      } else {
        finalExpectedPrice = parseFloat(expectedPrice) || 0
      }

      const premium = finalExpectedPrice - baseResult.remainingValue
      setResult({
        ...baseResult,
        purchasePriceCNY,
        expectedPrice: finalExpectedPrice,
        premium: premium,
        premiumPercent: (premium / purchasePriceCNY) * 100,
      })
    } catch (err) {
      setError('计算失败,请检查输入数据')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    const today = new Date()
    setPurchaseDate(today.toISOString().split('T')[0])
    setRenewalPeriod('12')
    setPurchasePrice('')
    setCurrency('USD')
    setExpectedPrice('100')
    setPriceMode('total')
    setDiscountValue('85')
    setResult(null)
    setError('')
  }

  // --- 详细的 Markdown 导出逻辑 (还原原始复杂度) ---
  const exportToMarkdown = () => {
    if (!result) return
    const symbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol || currency
    const renewalLabel = RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label || renewalPeriod
    const usedDays = result.totalDays - result.remainingDays
    const usedRatio = ((usedDays / result.totalDays) * 100).toFixed(0)
    
    let markdown = `# VPS 剩余价值分析报告\n\n`
    markdown += `| 分类 | 项目 | 数值 | 说明 |\n`
    markdown += `|---|---|---|---|\n`
    markdown += `| 💰 价格 | 原价 | ${symbol}${purchasePrice} | 约 ¥${result.purchasePriceCNY.toFixed(2)} |\n`
    markdown += `| | 期望售价 | ¥${result.expectedPrice.toFixed(2)} | 人民币计价 |\n`
    markdown += `| | 剩余价值 | ¥${result.remainingValue.toFixed(2)} | 当前估值 |\n`
    markdown += `| | ${result.premium >= 0 ? '💎 溢价' : '⚠️ 折价'} | ${result.premium >= 0 ? '+' : '-'}¥${Math.abs(result.premium).toFixed(2)} | ROI: ${result.premiumPercent.toFixed(2)}% |\n`
    markdown += `| 📅 时间 | 购买日期 | ${purchaseDate} | |\n`
    markdown += `| | 到期日期 | ${formatDate(result.expireDate)} | |\n`
    markdown += `| | 剩余时间 | ${result.remainingDays} 天 | 总 ${result.totalDays} 天 |\n\n`
    
    if (result.premium >= 0) {
      markdown += `### 📊 分析结论: 🎉 推荐交易\n按此价格出售可获得额外收益，投资回报率较好。`
    } else {
      markdown += `### 📊 分析结论: ⚠️ 谨慎交易\n售价低于剩余价值，建议重新评估价格以避免损失。`
    }

    navigator.clipboard.writeText(markdown).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  const exportToImage = async () => {
    if (!resultRef.current) return
    const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' })
    const link = document.createElement('a')
    link.download = `VPS-Calculator-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* 头部标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">VPS剩余价值计算器</h1>
        <p className="text-muted-foreground text-lg">
          基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，智能分析转售溢价情况
        </p>
      </div>

      {/* 顶部统计卡片 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Server className="h-4 w-4" /> 支持币种
            </div>
            <div className="text-2xl font-bold">{SUPPORTED_CURRENCIES.length}</div>
            <p className="text-xs text-muted-foreground">种主流货币实时汇率</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" /> 续费周期
            </div>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">种预设时长选项</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Calculator className="h-4 w-4" /> 计算精度
            </div>
            <div className="text-2xl font-bold">精确到天</div>
            <p className="text-xs text-muted-foreground">基于剩余时长实时估值</p>
          </CardContent>
        </Card>
      </div>

      {/* 核心计算区域 - 栅格化布局对齐 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 左侧：输入表单 (占 4/12) */}
        <Card className="lg:col-span-4 flex flex-col h-full shadow-md">
          <CardHeader>
            <CardTitle>VPS 信息输入</CardTitle>
            <CardDescription>只需填写3个必要信息，自动计算到期时间</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>购买日期 *</Label>
                <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>续费周期 *</Label>
                <Select value={renewalPeriod} onValueChange={setRenewalPeriod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RENEWAL_PERIODS.map(p => <SelectItem key={p.value} value={p.value.toString()}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>购买价格 *</Label>
                <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>货币</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map(c => <SelectItem key={c.code} value={c.code}>{c.symbol} {c.code}</SelectItem>)}
                  </SelectContent>
                </Select>
                {getExchangeRateText(currency, exchangeRates) && (
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{getExchangeRateText(currency, exchangeRates)}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>价格输入模式</Label>
              <Tabs value={priceMode} onValueChange={(v) => setPriceMode(v as PriceMode)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="total">整体价格</TabsTrigger>
                  <TabsTrigger value="monthly">溢价模式</TabsTrigger>
                  <TabsTrigger value="discount">折扣模式</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {priceMode === 'discount' && (
              <div className="space-y-2">
                <Label>快速选择折扣</Label>
                <div className="flex flex-wrap gap-1.5">
                  {quickDiscounts.map(d => (
                    <Button key={d} variant="outline" size="sm" className={`h-8 ${discountValue === d.toString() ? 'bg-primary text-primary-foreground' : ''}`} onClick={() => setDiscountValue(d.toString())}>{d}折</Button>
                  ))}
                </div>
              </div>
            )}

            {priceMode !== 'discount' && (
              <div className="space-y-2">
                <Label>{priceMode === 'total' ? '期望售价（人民币）' : '溢价金额（人民币）'}</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
                  <Input className="pl-7" type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(e.target.value)} />
                </div>
              </div>
            )}

            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-xs font-medium">{error}</div>}

            <div className="pt-2 flex gap-2 mt-auto">
              <Button onClick={handleCalculate} disabled={loading} className="flex-1 font-bold">
                <Calculator className="h-4 w-4 mr-2" /> {loading ? '计算中...' : '计算价值'}
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset}><RefreshCw className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：计算结果 (占 8/12) */}
        <Card className="lg:col-span-8 flex flex-col h-full shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>计算结果</CardTitle>
              <CardDescription>{result ? '基于当前时间实时分析' : '等待左侧信息输入'}</CardDescription>
            </div>
            {result && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportToMarkdown}>
                  <FileDown className="h-4 w-4 mr-1" /> {copySuccess ? '已复制' : '复制MD'}
                </Button>
                <Button variant="outline" size="sm" onClick={exportToImage}>
                  <ImageIcon className="h-4 w-4 mr-1" /> 导出图片
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-40">
                <Calculator className="h-16 w-16 mb-4" />
                <p>填写信息后点击“计算价值”</p>
              </div>
            ) : (
              <div ref={resultRef} className="space-y-6 flex-1 bg-white dark:bg-transparent">
                {/* 核心三卡片 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-2xl text-center">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">剩余价值</div>
                    <div className="text-3xl font-black text-blue-700 dark:text-blue-200">¥ {formatCurrency(result.remainingValue)}</div>
                    <Badge variant="secondary" className="mt-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-none">
                      剩余 {(result.remainingRatio * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="p-5 bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900 rounded-2xl text-center">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-bold mb-1">期望售价</div>
                    <div className="text-3xl font-black text-purple-700 dark:text-purple-200">¥ {formatCurrency(result.expectedPrice)}</div>
                    <div className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter font-bold">汇率转换后(CNY)</div>
                  </div>
                  <div className={`p-5 border-2 rounded-2xl text-center ${result.premium >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    <div className={`text-xs font-bold mb-1 ${result.premium >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{result.premium >= 0 ? '预期溢价' : '预期折价'}</div>
                    <div className={`text-3xl font-black ${result.premium >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {result.premium >= 0 ? '+' : ''}¥ {formatCurrency(Math.abs(result.premium))}
                    </div>
                    <Badge className={`mt-2 border-none ${result.premium >= 0 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {Math.abs(result.premiumPercent || 0).toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                {/* 详细网格 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  {[
                    { label: "原购买价格", val: `${currency} ${purchasePrice} (¥${formatCurrency(result.purchasePriceCNY)})` },
                    { label: "续费周期", val: RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label },
                    { label: "到期日期", val: formatDate(result.expireDate), color: "text-orange-600" },
                    { label: "总服务时长", val: `${result.totalDays} 天` },
                    { label: "已使用天数", val: `${result.totalDays - result.remainingDays} 天` },
                    { label: "剩余天数", val: `${result.remainingDays} 天`, color: "text-blue-600" },
                    { label: "使用进度", val: `${((1 - result.remainingRatio) * 100).toFixed(1)}%` },
                    { label: "日均成本", val: `¥${(result.purchasePriceCNY / result.totalDays).toFixed(2)}` }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</span>
                      <span className={`text-sm font-extrabold ${item.color || 'text-foreground'}`}>{item.val}</span>
                    </div>
                  ))}
                </div>

                {/* 进度条 */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted-foreground uppercase">VPS 生命周期进度</span>
                    <span>{((1 - result.remainingRatio) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border">
                    <div className="h-full bg-primary transition-all duration-700" style={{ width: `${(1 - result.remainingRatio) * 100}%` }} />
                  </div>
                </div>

                {/* 盈亏分析提示 */}
                <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${result.premium >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                  {result.premium >= 0 ? <TrendingUp className="h-6 w-6 text-emerald-600" /> : <TrendingDown className="h-6 w-6 text-rose-600" />}
                  <div className="text-sm">
                    <span className="font-bold">{result.premium >= 0 ? '盈利方案：' : '亏损方案：'}</span>
                    当前定价较剩余价值{result.premium >= 0 ? '高出' : '低'} ¥{formatCurrency(Math.abs(result.premium))}，投资回报率为 {result.premiumPercent.toFixed(2)}%。
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 底部信息区 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {[
          { icon: Info, title: "计算原理", desc: "剩余价值 = (剩余天数 / 总天数) × 购买价格。系统会自动将外币按实时汇率折算为人民币。" },
          { icon: Coins, title: "适用场景", desc: "适用于 VPS、云服务器、域名、SSL证书等具有明确有效期的订阅类数字资源评估。" },
          { icon: TrendingUp, title: "汇率说明", desc: "汇率数据由 open.er-api.com 提供实时支持。建议在交易时点击刷新按钮获取最新数据。" }
        ].map((item, i) => (
          <Card key={i} className="bg-muted/30 border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 font-bold">
                <item.icon className="h-4 w-4 text-primary" /> {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
