// 名称: VPS剩余价值计算器
// 描述: 基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换
// 路径: Globokit/app/tools/vps-calculator/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-12-01

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
    
    let finalPrice = parseFloat(purchasePrice)
    
    if (!finalPrice || finalPrice <= 0) {
      setError('请输入有效的购买价格')
      return
    }
    
    // 折扣模式计算
    if (priceMode === 'discount' && discountValue) {
      const discount = parseFloat(discountValue)
      if (discount >= 10) {
        // 85折 = 原价 × 85%
        finalPrice = finalPrice * (discount / 100)
      } else {
        // 8折 = 原价 × 80%
        finalPrice = finalPrice * (discount / 10)
      }
    }
    
    const validation = validateInput(purchaseDate, finalPrice)
    if (!validation.valid) {
      setError(validation.error || '')
      return
    }

    setLoading(true)
    
    try {
      // 先计算基础结果
      const baseResult = calculateVPSValue(
        new Date(purchaseDate),
        parseInt(renewalPeriod),
        finalPrice,
        currency,
        0, // 先不传期望售价
        priceMode,
        exchangeRates
      )

      let calculationResult = baseResult
      
      // 根据模式计算期望售价和溢价
      if (priceMode === 'monthly') {
        // 溢价模式：用户输入的是溢价金额
        const premiumAmount = parseFloat(expectedPrice) || 0
        const actualExpectedPrice = baseResult.remainingValue + premiumAmount
        
        calculationResult = {
          ...baseResult,
          premium: premiumAmount,
          premiumPercent: baseResult.remainingValue > 0 ? (premiumAmount / baseResult.remainingValue) * 100 : 0,
          expectedPrice: actualExpectedPrice
        }
      } else {
        // 整体价格模式：用户输入的是期望售价
        const userExpectedPrice = parseFloat(expectedPrice) || 0
        if (userExpectedPrice > 0) {
          const premium = userExpectedPrice - baseResult.remainingValue
          calculationResult = {
            ...baseResult,
            premium,
            premiumPercent: baseResult.remainingValue > 0 ? (premium / baseResult.remainingValue) * 100 : 0,
            expectedPrice: userExpectedPrice
          }
        }
      }

      setResult(calculationResult)
    } catch (err) {
      setError('计算失败，请检查输入数据')
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

    const currencyName = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.name || currency
    const renewalLabel = RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label || renewalPeriod

    let markdown = `# VPS剩余价值计算报告

## 基本信息

- **购买日期**: ${formatDate(new Date(purchaseDate))}
- **续费周期**: ${renewalLabel}
- **购买价格**: ${purchasePrice} ${currency} (${currencyName})
- **价格模式**: ${priceMode === 'total' ? '整体价格' : priceMode === 'monthly' ? '溢价模式' : '折扣模式'}
${expectedPrice ? `- **期望售价**: ¥${expectedPrice}` : ''}

## 计算结果

### 剩余价值
**¥${formatCurrency(result.remainingValue)}**

### 详细数据

| 项目 | 数值 |
|------|------|
| 购买价格(CNY) | ¥${formatCurrency(result.purchasePriceCNY)} |
| 到期日期 | ${formatDate(result.expireDate)} |
| 总天数 | ${result.totalDays} 天 |
| 剩余天数 | ${result.remainingDays} 天 |
| 剩余比例 | ${(result.remainingRatio * 100).toFixed(1)}% |
`

    if (result.premium !== undefined) {
      markdown += `
### 溢价分析

${result.premium > 0 ? '📈 **溢价出售**' : '📉 **低于剩余价值**'}

期望售价比剩余价值${result.premium > 0 ? '高' : '低'} **¥${formatCurrency(Math.abs(result.premium))}** (${Math.abs(result.premiumPercent || 0).toFixed(1)}%)
`
    }

    markdown += `

---
*报告生成时间: ${new Date().toLocaleString('zh-CN')}*
*工具: VPS剩余价值计算器 - Globokit*
`

    // 复制到剪贴板
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
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `VPS剩余价值_${new Date().getTime()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }
      })
    } catch (err) {
      console.error('导出图片失败:', err)
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
            {/* 购买日期和续费周期 - 并排 */}
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

            {/* 购买价格和币种 */}
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
                  min="0"
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

            {/* 价格输入模式 */}
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

            {/* 折扣模式特殊输入 */}
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
                    min="1"
                    max="100"
                  />
                  <span className="text-sm text-muted-foreground">折</span>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {quickDiscounts.map((discount) => (
                      <Button
                        key={discount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDiscountValue(discount.toString())}
                        className={`h-8 ${discountValue === discount.toString() ? 'bg-primary text-primary-foreground' : ''}`}
                      >
                        {discount}折
                      </Button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  按购买价的{discountValue}折计算，比如88折 = 原价 × {parseFloat(discountValue) >= 10 ? (parseFloat(discountValue) / 100 * 100).toFixed(0) + '%' : (parseFloat(discountValue) / 10 * 100).toFixed(0) + '%'}
                </p>
              </div>
            )}

            {/* 期望售价 - 仅在整体价格模式下显示 */}
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
                    step="0.01"
                    min="0"
                    className="pl-8"
                  />
                </div>
              </div>
            )}

            {/* 溢价金额 - 仅在溢价模式下显示 */}
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
                    step="0.01"
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  溢价金额 = 期望售价 - 剩余价值，可以为负数表示折价出售
                </p>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Button onClick={handleCalculate} disabled={loading} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                {loading ? '计算中...' : '计算价值'}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                重置
              </Button>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={exportToMarkdown}
                    disabled={copySuccess}
                  >
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  填写VPS信息后，点击"计算价值"查看结果
                </p>
              </div>
            ) : (
              <div ref={resultRef} className="space-y-6">
                {/* 三卡片横排展示 */}
                <div className="grid grid-cols-3 gap-4">
                  {/* 剩余价值 */}
                  <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center dark:bg-blue-950 dark:border-blue-800">
                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">剩余价值</div>
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                      ¥ {formatCurrency(result.remainingValue)}
                    </div>
                    <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                      剩余 {(result.remainingRatio * 100).toFixed(2)}%
                    </div>
                  </div>

                  {/* 期望售价 */}
                  <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg text-center dark:bg-purple-950 dark:border-purple-800">
                    <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">期望售价</div>
                    <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                      ¥ {formatCurrency(
                        priceMode === 'monthly' && result.expectedPrice 
                          ? result.expectedPrice 
                          : parseFloat(expectedPrice) || 0
                      )}
                    </div>
                    {result.premium !== undefined && (
                      <div className={`inline-block px-3 py-1 text-xs rounded-full ${
                        result.premium > 0 
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                      }`}>
                        回报金额 {result.premium > 0 ? '+' : ''}{(result.premiumPercent || 0).toFixed(2)}%
                      </div>
                    )}
                  </div>

                  {/* 溢价收益或折价损失 */}
                  <div className={`p-6 border-2 rounded-lg text-center ${
                    result.premium !== undefined && result.premium > 0
                      ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                      : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                  }`}>
                    <div className={`text-sm mb-2 ${
                      result.premium !== undefined && result.premium > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {result.premium !== undefined && result.premium > 0 ? '✓ 溢价收益' : '✗ 折价损失'}
                    </div>
                    <div className={`text-3xl font-bold mb-1 ${
                      result.premium !== undefined && result.premium > 0
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result.premium !== undefined && result.premium > 0 ? '+ ' : '- '}¥ {formatCurrency(Math.abs(result.premium || 0))}
                    </div>
                    <div className={`inline-block px-3 py-1 text-xs rounded-full ${
                      result.premium !== undefined && result.premium > 0
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {Math.abs(result.premiumPercent || 0).toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* 详细分析 */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">详细分析</h3>
                  
                  {/* 数据点展示 */}
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">原购买价格</div>
                      <div className="font-semibold text-sm">{currency}${formatCurrency(parseFloat(purchasePrice))}</div>
                      <div className="text-xs text-muted-foreground">≈ ¥{formatCurrency(result.purchasePriceCNY)}</div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">期望售价</div>
                      <div className="font-semibold text-sm">¥{formatCurrency(
                        priceMode === 'monthly' && result.expectedPrice 
                          ? result.expectedPrice 
                          : parseFloat(expectedPrice) || 0
                      )}</div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">剩余价值</div>
                      <div className="font-semibold text-sm">¥{formatCurrency(result.remainingValue)}</div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        {result.premium !== undefined && result.premium > 0 ? '溢价收益' : '折价损失'}
                      </div>
                      <div className={`font-semibold text-sm ${
                        result.premium !== undefined && result.premium > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.premium !== undefined && result.premium > 0 ? '+' : ''}{formatCurrency(result.premium || 0)}
                      </div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">投资回报率</div>
                      <div className={`font-semibold text-sm ${
                        result.premium !== undefined && result.premium > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.premium !== undefined && result.premium > 0 ? '+' : ''}{(result.premiumPercent || 0).toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* 时间信息 */}
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">购买日期</div>
                      <div className="font-semibold text-sm">{formatDate(new Date(purchaseDate))}</div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">续费周期</div>
                      <div className="font-semibold text-sm">
                        {RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label || renewalPeriod}
                      </div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">到期日期</div>
                      <div className="font-semibold text-sm text-orange-600">{formatDate(result.expireDate)}</div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">总使用时间</div>
                      <div className="font-semibold text-sm">{result.totalDays} 天</div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">已使用时间</div>
                      <div className="font-semibold text-sm text-red-600">
                        {result.totalDays - result.remainingDays} 天
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">剩余时间</div>
                      <div className="font-semibold text-sm text-blue-600">{result.remainingDays} 天</div>
                    </div>
                  </div>

                  {/* 使用进度条 */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">使用进度</span>
                      <span className="font-semibold">
                        {((1 - result.remainingRatio) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${((1 - result.remainingRatio) * 100).toFixed(0)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 盈亏分析 */}
                {result.premium !== undefined && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      盈亏分析
                    </h3>
                    <div className={`p-4 rounded-lg border-2 ${
                      result.premium > 0
                        ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                        : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {result.premium > 0 ? (
                          <>
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-700 dark:text-green-300">
                              💰 盈利交易
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-5 w-5 text-red-600" />
                            <span className="font-semibold text-red-700 dark:text-red-300">
                              📉 亏损交易
                            </span>
                          </>
                        )}
                      </div>
                      <div className={`text-sm ${
                        result.premium > 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      }`}>
                        按此价格出售可{result.premium > 0 ? '获利' : '亏损'}收益低 
                        <span className="font-bold mx-1">
                          ¥{formatCurrency(Math.abs(result.premium))}
                        </span>
                        ，亏损比例 
                        <span className="font-bold ml-1">
                          {Math.abs(result.premiumPercent || 0).toFixed(2)}%
                        </span>
                      </div>
                      {result.premium < 0 && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-orange-700 dark:text-orange-300">
                          <span>⚠️</span>
                          <span>建议重新评估售价或等待更优惠时机</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <div className="grid gap-4 mt-6 md:grid-cols-3">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              计算原理
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 只需填写购买日期，选择续费周期，自动计算到期时间</p>
            <p>• 支持多币种购买价格，自动转换为人民币</p>
            <p>• 基于当前时间实时计算，精确到天</p>
            <p>• 剩余价值 = (剩余天数 ÷ 总天数) × 购买价格(CNY)</p>
            <p>• 溢价金额 = 期望售价 - 剩余价值</p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="h-5 w-5" />
              适用场景
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• VPS/云服务器转售价格评估</p>
            <p>• 域名、SSL证书等时效性资源</p>
            <p>• 软件授权许可证转让</p>
            <p>• 云服务资源投资分析</p>
            <p>• 各类订阅服务剩余价值计算</p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              汇率说明
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 汇率数据来源于 open.er-api.com</p>
            <p>• 购买币种自动转换为人民币计算</p>
            <p>• 期望售价统一使用人民币</p>
            <p>• 点击刷新按钮获取最新汇率数据</p>
            <p>• 汇率缓存1小时，减少请求次数</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
