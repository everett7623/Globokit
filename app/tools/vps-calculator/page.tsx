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
      // 1. 获取汇率并计算人民币原价
      const rate = 1 / (exchangeRates[currency] || 1)
      const purchasePriceCNY = rawPrice * rate

      // 2. 计算客观的剩余价值
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
    setExpectedPrice('100')
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

  // 导出为MD
  const exportToMarkdown = () => {
    if (!result) return

    const currencySymbol = SUPPORTED_CURRENCIES.find(c => c.code === currency)?.symbol || currency
    const renewalLabel = RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label || renewalPeriod
    const usedDays = result.totalDays - result.remainingDays
    const usedRatio = result.totalDays > 0 ? ((usedDays / result.totalDays) * 100).toFixed(0) : 0
    const dailyCost = result.totalDays > 0 ? (result.purchasePriceCNY / result.totalDays).toFixed(2) : 0
    
    const actualExpectedPrice = result.expectedPrice || 0

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
| | 使用进度 | ${usedRatio}% | 完成度 |\n\n## 📊 分析结论\n\n`

    if (result.premium > 0) {
      markdown += `**🎉 推荐交易**\n\n✅ 按期望售价 **¥${formatCurrency(actualExpectedPrice)}** 出售，可获得 **¥${formatCurrency(result.premium)}** 的额外收益。`
    } else {
      markdown += `**⚠️ 谨慎交易**\n\n❌ 按期望售价 **¥${formatCurrency(actualExpectedPrice)}** 出售，将产生损失。`
    }

    navigator.clipboard.writeText(markdown).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  // 导出为图片
  const exportToImage = async () => {
    if (!resultRef.current) return
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      })
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `VPS-Calculator-${new Date().getTime()}.png`
          link.click()
        }
      })
    } catch (err) {
      console.error(err)
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

      <div className="grid gap-4 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="h-4 w-4" /> 支持币种
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
              <Calendar className="h-4 w-4" /> 续费周期
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
              <Calculator className="h-4 w-4" /> 计算精度
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
            <CardDescription>简化流程：只需填写3个必要信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">购买日期 *</Label>
                <Input id="purchaseDate" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="renewalPeriod">续费周期 *</Label>
                <Select value={renewalPeriod} onValueChange={setRenewalPeriod}>
                  <SelectTrigger id="renewalPeriod"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RENEWAL_PERIODS.map((period) => (
                      <SelectItem key={period.value} value={period.value.toString()}>{period.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">购买价格 *</Label>
                <Input id="purchasePrice" type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">货币</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>{curr.symbol} {curr.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {exchangeRateText && <p className="text-xs text-muted-foreground">{exchangeRateText}</p>}
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
                <Label>折扣</Label>
                <div className="flex flex-wrap gap-2">
                  {quickDiscounts.map((d) => (
                    <Button key={d} variant="outline" size="sm" onClick={() => setDiscountValue(d.toString())} className={discountValue === d.toString() ? 'bg-primary text-primary-foreground' : ''}>{d}折</Button>
                  ))}
                </div>
              </div>
            )}

            {priceMode !== 'discount' && (
              <div className="space-y-2">
                <Label>{priceMode === 'total' ? '期望售价（人民币）' : '溢价金额（人民币）'}</Label>
                <Input type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(e.target.value)} />
              </div>
            )}

            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

            <div className="flex gap-2">
              <Button onClick={handleCalculate} disabled={loading} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" /> {loading ? '计算中...' : '计算价值'}
              </Button>
              <Button variant="outline" onClick={handleReset}>重置</Button>
              <Button variant="outline" size="icon" onClick={handleRefreshRates}><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /></Button>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：计算结果 - 保留所有详细网格 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>计算结果</CardTitle>
                <CardDescription>{result ? '基于当前时间实时计算' : '点击计算查看结果'}</CardDescription>
              </div>
              {result && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportToMarkdown}>{copySuccess ? '已复制' : '复制MD'}</Button>
                  <Button variant="outline" size="sm" onClick={exportToImage}><ImageIcon className="h-4 w-4 mr-1" />下载图片</Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Calculator className="h-16 w-16 mb-4" />
                <p>填写信息后点击“计算价值”</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div ref={resultRef} className="space-y-6 p-4 bg-white rounded-lg">
                   {/* 三卡片展示 */}
                   <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                      <div className="text-xs text-blue-600 mb-1">剩余价值</div>
                      <div className="text-2xl font-bold text-blue-700">¥ {formatCurrency(result.remainingValue)}</div>
                      <div className="text-[10px] text-blue-500">{(result.remainingRatio * 100).toFixed(2)}%</div>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg text-center">
                      <div className="text-xs text-purple-600 mb-1">期望售价</div>
                      <div className="text-2xl font-bold text-purple-700">¥ {formatCurrency(result.expectedPrice)}</div>
                    </div>
                    <div className={`p-4 border rounded-lg text-center ${result.premium > 0 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                      <div className={`text-xs mb-1 ${result.premium > 0 ? 'text-green-600' : 'text-red-600'}`}>{result.premium > 0 ? '溢价' : '折价'}</div>
                      <div className={`text-2xl font-bold ${result.premium > 0 ? 'text-green-700' : 'text-red-700'}`}>¥ {formatCurrency(Math.abs(result.premium))}</div>
                    </div>
                  </div>

                  {/* 详细分析网格 */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-3">数据详情</h4>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="p-2 bg-muted rounded">
                        <div className="text-[10px] text-muted-foreground">原价(CNY)</div>
                        <div className="text-xs font-bold">¥{formatCurrency(result.purchasePriceCNY)}</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-[10px] text-muted-foreground">续费周期</div>
                        <div className="text-xs font-bold">{RENEWAL_PERIODS.find(p => p.value === parseInt(renewalPeriod))?.label}</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-[10px] text-muted-foreground">到期日期</div>
                        <div className="text-xs font-bold text-orange-600">{formatDate(result.expireDate)}</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-[10px] text-muted-foreground">总天数</div>
                        <div className="text-xs font-bold">{result.totalDays}天</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-[10px] text-muted-foreground">剩余天数</div>
                        <div className="text-xs font-bold text-blue-600">{result.remainingDays}天</div>
                      </div>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">使用进度</span>
                      <span className="font-medium">{((1 - result.remainingRatio) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: `${(1 - result.remainingRatio) * 100}%` }} />
                    </div>
                  </div>

                  {/* 盈亏卡片 */}
                  <div className={`p-4 rounded-lg border-2 ${result.premium > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {result.premium > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                      <span className={`text-sm font-bold ${result.premium > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {result.premium > 0 ? '盈利交易分析' : '折价交易分析'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      当前方案预期{result.premium > 0 ? '收益' : '损失'} ¥{formatCurrency(Math.abs(result.premium))}，
                      投资回报率(ROI): {(result.premiumPercent || 0).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-6 md:grid-cols-3">
        <Card className="bg-muted/50 p-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground"><Info className="h-4 w-4" /> 计算原理</div>
          <p>• 剩余价值 = (剩余天数 / 总天数) × 购买价格</p>
          <p>• 系统自动将各种外币根据最新汇率转换为人民币</p>
        </Card>
        <Card className="bg-muted/50 p-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground"><Coins className="h-4 w-4" /> 适用场景</div>
          <p>• VPS/域名/主机转让时的剩余价值精确评估</p>
          <p>• 支持根据溢价或折扣金额快速调整期望售价</p>
        </Card>
        <Card className="bg-muted/50 p-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground"><TrendingUp className="h-4 w-4" /> 汇率更新</div>
          <p>• 数据由 open.er-api.com 提供，支持多国货币</p>
          <p>• 点击计算器右上角刷新按钮可获取最新实时汇率</p>
        </Card>
      </div>
    </>
  )
}
