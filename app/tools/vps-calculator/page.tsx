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
  // 基础输入
  const [purchaseDate, setPurchaseDate] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState('12')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expectedPrice, setExpectedPrice] = useState('100')
  const [priceMode, setPriceMode] = useState<PriceMode>('total')
  
  // 折扣模式
  const [discountValue, setDiscountValue] = useState('85')

  // 状态
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // 导出相关
  const resultRef = useRef<HTMLDivElement>(null)

  // 初始化
  useEffect(() => {
    const today = new Date()
    setPurchaseDate(today.toISOString().split('T')[0])
    loadExchangeRates()
  }, [])

  // 加载汇率
  const loadExchangeRates = async () => {
    try {
      const rates = await fetchExchangeRates()
      setExchangeRates(rates)
    } catch (err) {
      console.error('加载汇率失败', err)
    }
  }

  // 快速折扣选择
  const quickDiscounts = [95, 85, 75, 65, 9, 8, 7, 6, 5]

  // 计算
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
      // 1. 获取汇率并计算人民币原价 (用于折扣基数)
      const rate = 1 / (exchangeRates[currency] || 1)
      const purchasePriceCNY = rawPrice * rate

      // 2. 计算客观的剩余价值 (baseResult)
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

      // 3. 根据模式计算"期望售价"
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

      // 4. 计算折价/溢价金额及回报率 (相对于原价)
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

  // 重置
  const handleReset = () => {
    const today = new Date()
    setPurchaseDate(today.toISOString().split('T')[0])
    setRenewalPeriod('12')
    setPurchasePrice('')
    setCurrency('USD')
    setExpectedPrice('')
    setPriceMode('total')
    setDiscountValue('85')
    setResult(null)
    setError('')
  }

  // 刷新汇率
  const handleRefreshRates = async () => {
    setLoading(true)
    await loadExchangeRates()
    setLoading(false)
  }

  // 导出为MD - 改为复制到剪贴板
  const exportToMarkdown = () => {
    if (!result) return

    const currencySymbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol || currency
    const renewalLabel = RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label || renewalPeriod
    const usedDays = result.totalDays - result.remainingDays
    const usedRatio = result.totalDays > 0 ? ((usedDays / result.totalDays) * 100).toFixed(0) : 0
    const dailyCost = result.totalDays > 0 ? (result.purchasePriceCNY / result.totalDays).toFixed(2) : 0
    
    const actualExpectedPrice = priceMode === 'monthly' && result.expectedPrice 
      ? result.expectedPrice 
      : parseFloat(expectedPrice) || 0

    let markdown = `# VPS 剩余价值计算结果

| **分类** | **项目** | **数值** | **说明** |
|----------|----------|----------|----------|
| **💰 价格信息** | 原购买价格 | ${currencySymbol}${formatCurrency(parseFloat(purchasePrice))} | 约 ¥${formatCurrency(result.purchasePriceCNY)} |
| | 期望售价 | ¥${formatCurrency(actualExpectedPrice)} | 人民币计价 |
| | 剩余价值 | ¥${formatCurrency(result.remainingValue)} | 当前估值 |`

    if (result.premium !== undefined) {
      if (result.premium > 0) {
        markdown += `\n| | 💎 溢价收益 | +¥${formatCurrency(result.premium)} | 预期盈利 |\n| | 投资回报率 | +${(result.premiumPercent || 0).toFixed(2)}% | ROI 指标 |`
      } else {
        markdown += `\n| | ⚠️ 折价损失 | -¥${formatCurrency(Math.abs(result.premium))} | 预期亏损 |\n| | 投资回报率 | ${(result.premiumPercent || 0).toFixed(2)}% | ROI 指标 |`
      }
    }

    markdown += `\n| **📅 时间信息** | 购买日期 | ${formatDate(new Date(purchaseDate))} | 起始时间 |
| | 续费周期 | ${renewalLabel} | 服务期限 |
| | 到期日期 | ${formatDate(result.expireDate)} | 截止时间 |
| | 总使用期限 | ${result.totalDays} 天 | 完整周期 |
| | 已使用时间 | ${usedDays} 天 | 已消耗时间 |
| | 剩余时间 | ${result.remainingDays} 天 | 可用时间 |
| | 使用进度 | ${usedRatio}% | 完成度 |`

    markdown += `\n\n## 📊 分析结论\n\n`

    if (result.premium !== undefined) {
      if (result.premium > 0) {
        markdown += `**🎉 推荐交易**\n\n✅ 按期望售价 **¥${formatCurrency(actualExpectedPrice)}** 出售，可获得 **¥${formatCurrency(result.premium)}** 的额外收益。`
      } else {
        markdown += `**⚠️ 谨慎交易**\n\n❌ 按期望售价 **¥${formatCurrency(actualExpectedPrice)}** 出售，将产生损失。`
      }
    }

    navigator.clipboard.writeText(markdown).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }).catch(err => {
      console.error('复制失败:', err)
    })
  }

  // 导出为图片
  const exportToImage = async () => {
    if (!resultRef.current) return
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      })
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          const today = new Date()
          const timestamp = today.toISOString().slice(0, 10).replace(/-/g, '')
          link.download = `GloboKit-VPS-Value-Calculator-${timestamp}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }
      })
    } catch (err) {
      console.error('导出图片失败:', err)
      alert('导出图片失败，请重试')
    }
  }

  const exchangeRateText = getExchangeRateText(currency, exchangeRates)

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">VPS剩余价值计算器</h1>
        <p className="text-muted-foreground">
          基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换，智能分析转售溢价情况
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="h-4 w-4" />
              支持币种
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SUPPORTED_CURRENCIES.length}</div>
            <p className="text-xs text-muted-foreground">种主流货币</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              续费周期
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">种时长选项</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              计算精度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">精确到天</div>
            <p className="text-xs text-muted-foreground">实时计算</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: '35% 65%' }}>
        {/* 左侧：输入表单 */}
        <Card>
          <CardHeader>
            <CardTitle>VPS 信息输入</CardTitle>
            <CardDescription>
              简化流程：只需填写3个必要信息，系统自动计算到期时间
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">购买日期 *</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renewalPeriod">续费周期 *</Label>
                <Select value={renewalPeriod} onValueChange={setRenewalPeriod}>
                  <SelectTrigger id="renewalPeriod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RENEWAL_PERIODS.map((period) => (
                      <SelectItem key={period.value} value={period.value.toString()}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">购买价格 *</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="0.00"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">货币</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code} - {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {exchangeRateText && (
                  <p className="text-xs text-muted-foreground">{exchangeRateText}</p>
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
                <Label htmlFor="discount">折扣 (按原价计算)</Label>
                <div className="flex gap-2 items-center mb-2">
                  <Input
                    id="discount"
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">折</span>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {quickDiscounts.map((discount) => (
                      <Button
                        key={discount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDiscountValue(discount.toString())}
                        className={discountValue === discount.toString() ? 'bg-primary text-primary-foreground' : ''}
                      >
                        {discount}折
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {priceMode === 'total' && (
              <div className="space-y-2">
                <Label htmlFor="expectedPrice">期望售价（人民币）</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>
                  <Input
                    id="expectedPrice"
                    type="number"
                    placeholder="100"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            )}

            {priceMode === 'monthly' && (
              <div className="space-y-2">
                <Label htmlFor="expectedPrice">溢价金额（人民币）</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>
                  <Input
                    id="expectedPrice"
                    type="number"
                    placeholder="300"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCalculate} disabled={loading} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                {loading ? '计算中...' : '计算价值'}
              </Button>
              <Button variant="outline" onClick={handleReset}>重置</Button>
              <Button variant="outline" size="icon" onClick={handleRefreshRates} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：计算结果 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>计算结果</CardTitle>
                <CardDescription>
                  {result ? '基于当前时间实时计算，精确到天' : '请填写左侧信息后点击计算'}
                </CardDescription>
              </div>
              {result && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportToMarkdown} disabled={copySuccess}>
                    <FileDown className="h-4 w-4 mr-1" />
                    {copySuccess ? '已复制' : '复制MD'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportToImage}>
                    <ImageIcon className="h-4 w-4 mr-1" />
                    下载图片
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Calculator className="h-16 w-16 mb-4" />
                <p>填写VPS信息后，点击"计算价值"查看结果</p>
              </div>
            ) : (
              <div>
                <div ref={resultRef} className="space-y-6 p-6 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold">剩余价值计算结果</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center dark:bg-blue-950">
                      <div className="text-sm text-blue-600 mb-2">剩余价值</div>
                      <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                        ¥ {formatCurrency(result.remainingValue)}
                      </div>
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-2">
                        剩余 {(result.remainingRatio * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg text-center dark:bg-purple-950">
                      <div className="text-sm text-purple-600 mb-2">期望售价</div>
                      <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                        ¥ {formatCurrency(result.expectedPrice)}
                      </div>
                      {result.premium !== undefined && (
                        <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full mt-2">
                          回报金额 {result.premium > 0 ? '+' : ''}{(result.premiumPercent || 0).toFixed(2)}%
                        </div>
                      )}
                    </div>
                    <div className={`p-6 border-2 rounded-lg text-center ${result.premium > 0 ? 'bg-green-50 border-green-200 dark:bg-green-950' : 'bg-red-50 border-red-200 dark:bg-red-950'}`}>
                      <div className={`text-sm mb-2 ${result.premium > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.premium > 0 ? '✓ 溢价收益' : '✗ 折价损失'}
                      </div>
                      <div className={`text-3xl font-bold ${result.premium > 0 ? 'text-green-700' : 'text-red-700'} dark:text-green-300`}>
                        {result.premium > 0 ? '+ ' : '- '}¥ {formatCurrency(Math.abs(result.premium || 0))}
                      </div>
                      <div className={`inline-block px-3 py-1 text-xs rounded-full mt-2 ${result.premium > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {Math.abs(result.premiumPercent || 0).toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">详细分析</h3>
                    <div className="grid grid-cols-5 gap-3 mb-6">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">原购买价格</div>
                        <div className="font-semibold text-sm">{currency}${formatCurrency(parseFloat(purchasePrice))}</div>
                        <div className="text-[10px] text-muted-foreground">≈ ¥{formatCurrency(result.purchasePriceCNY)}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">期望售价</div>
                        <div className="font-semibold text-sm">¥{formatCurrency(result.expectedPrice)}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">剩余价值</div>
                        <div className="font-semibold text-sm">¥{formatCurrency(result.remainingValue)}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">{result.premium > 0 ? '溢价收益' : '折价损失'}</div>
                        <div className={`font-semibold text-sm ${result.premium > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.premium > 0 ? '+' : ''}{formatCurrency(result.premium || 0)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">投资回报率</div>
                        <div className={`font-semibold text-sm ${result.premium > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.premium > 0 ? '+' : ''}{(result.premiumPercent || 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3 mb-6">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">购买日期</div>
                        <div className="font-semibold text-sm">{formatDate(new Date(purchaseDate))}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">续费周期</div>
                        <div className="font-semibold text-sm">{RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">到期日期</div>
                        <div className="font-semibold text-sm text-orange-600">{formatDate(result.expireDate)}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">总使用时间</div>
                        <div className="font-semibold text-sm">{result.totalDays}天</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">剩余时间</div>
                        <div className="font-semibold text-sm text-blue-600">{result.remainingDays}天</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">使用进度</span>
                        <span className="font-semibold">{((1 - result.remainingRatio) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${((1 - result.remainingRatio) * 100).toFixed(0)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {result.premium !== undefined && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingDown className="h-5 w-5" />
                        盈亏分析
                      </h3>
                      <div className={`p-4 rounded-lg border-2 ${result.premium > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {result.premium > 0 ? <TrendingUp className="h-5 w-5 text-green-600" /> : <TrendingDown className="h-5 w-5 text-red-600" />}
                          <span className={`font-semibold ${result.premium > 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {result.premium > 0 ? '💰 盈利交易' : '📉 亏损交易'}
                          </span>
                        </div>
                        <div className="text-sm">
                          按此价格出售可{result.premium > 0 ? '获利' : '亏损'} <span className="font-bold">¥{formatCurrency(Math.abs(result.premium))}</span>，
                          ROI: <span className="font-bold">{(result.premiumPercent || 0).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-6 md:grid-cols-3">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />计算原理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 剩余价值 = (剩余天数 ÷ 总天数) × 购买价格(CNY)</p>
            <p>• 支持多币种自动转换为人民币计算</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Coins className="h-5 w-5" />适用场景</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• VPS/云服务器转售价格评估</p>
            <p>• 域名、SSL证书等时效性资源转让</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5" />汇率说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 汇率来源于 open.er-api.com</p>
            <p>• 点击刷新按钮可获取最新数据</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
