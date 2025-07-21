// 名称: 人民币大写转换
// 描述: 将数字金额转换为中文大写格式，适用于发票、合同等正式文件
// 路径: seedtool/app/tools/rmb-converter/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Calculator, Info, TrendingUp } from 'lucide-react'
import { convertToChineseCurrency } from '@/lib/tools/rmb-converter'

export default function RmbConverterPage() {
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [history, setHistory] = useState<Array<{ amount: string; result: string }>>([])

  // 从localStorage加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('rmbHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory).slice(0, 5))
    }
  }, [])

  // 快速金额按钮
  const quickAmounts = [
    { value: '100', label: '100元' },
    { value: '1000', label: '1千元' },
    { value: '10000', label: '1万元' },
    { value: '100000', label: '10万元' },
    { value: '1000000', label: '100万元' }
  ]

  const handleConvert = () => {
    if (!amount) return
    
    const converted = convertToChineseCurrency(amount)
    setResult(converted)
    
    // 添加到历史记录
    const newHistory = [
      { amount, result: converted },
      ...history.filter(h => h.amount !== amount)
    ].slice(0, 5)
    
    setHistory(newHistory)
    localStorage.setItem('rmbHistory', JSON.stringify(newHistory))
  }

  const copyToClipboard = () => {
    if (!result) return
    
    navigator.clipboard.writeText(result)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleQuickAmount = (value: string) => {
    setAmount(value)
    const converted = convertToChineseCurrency(value)
    setResult(converted)
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* 标题区域 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">人民币大写转换器</h1>
        <p className="text-muted-foreground">
          将数字金额转换为中文大写格式，适用于发票、合同等正式文件
        </p>
      </div>

      {/* 主要功能区 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              金额输入
            </CardTitle>
            <CardDescription>
              请输入需要转换的金额数字
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">金额（数字）</Label>
              <Input
                id="amount"
                type="text"
                placeholder="请输入金额，如：12345.67"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                className="text-lg"
              />
            </div>

            {/* 快速金额按钮 */}
            <div className="space-y-2">
              <Label>快速选择</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((item) => (
                  <Button
                    key={item.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(item.value)}
                    className="text-xs"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleConvert} 
              className="w-full"
              size="lg"
            >
              转换为大写
            </Button>
          </CardContent>
        </Card>

        {/* 结果区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              转换结果
            </CardTitle>
            <CardDescription>
              大写金额格式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xl font-bold text-center break-all">
                    {result}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      复制结果
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                转换结果将显示在这里
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 历史记录 */}
      {history.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">最近转换记录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleQuickAmount(item.amount)}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{item.amount}</Badge>
                    <span className="text-sm">→</span>
                    <span className="text-sm font-medium">{item.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 支持小数点后两位（角、分）</p>
          <p>• 最大支持千万亿级别的金额</p>
          <p>• 自动添加"人民币"前缀和"元整"或"元X角X分"后缀</p>
          <p>• 符合财务规范的大写格式</p>
          <p>• 点击历史记录可快速填入金额</p>
        </CardContent>
      </Card>
    </div>
  )
}
