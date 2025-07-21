// 名称: 数字转英文
// 描述: 将数字转换为英文表达形式，支持基数词和序数词
// 路径: seedtool/app/tools/number-to-english/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Copy, 
  Check, 
  Hash, 
  Info,
  TrendingUp,
  Calculator,
  FileText
} from 'lucide-react'
import { 
  numberToWords, 
  numberToOrdinal,
  numberToCurrency,
  numberToYear
} from '@/lib/tools/number-english'

type ConversionType = 'cardinal' | 'ordinal' | 'currency' | 'year'

export default function NumberToEnglishPage() {
  const [inputNumber, setInputNumber] = useState('')
  const [result, setResult] = useState('')
  const [conversionType, setConversionType] = useState<ConversionType>('cardinal')
  const [isCopied, setIsCopied] = useState(false)

  // 示例数字
  const examples = [
    { value: '123', label: '123' },
    { value: '1000', label: '1,000' },
    { value: '2024', label: '2024' },
    { value: '1000000', label: '1,000,000' },
    { value: '99.99', label: '99.99' },
    { value: '365', label: '365' }
  ]

  const handleConvert = () => {
    if (!inputNumber) return

    let converted = ''
    switch (conversionType) {
      case 'cardinal':
        converted = numberToWords(inputNumber)
        break
      case 'ordinal':
        converted = numberToOrdinal(inputNumber)
        break
      case 'currency':
        converted = numberToCurrency(inputNumber)
        break
      case 'year':
        converted = numberToYear(inputNumber)
        break
    }
    setResult(converted)
  }

  const handleExampleClick = (value: string) => {
    setInputNumber(value)
    let converted = ''
    switch (conversionType) {
      case 'cardinal':
        converted = numberToWords(value)
        break
      case 'ordinal':
        converted = numberToOrdinal(value)
        break
      case 'currency':
        converted = numberToCurrency(value)
        break
      case 'year':
        converted = numberToYear(value)
        break
    }
    setResult(converted)
  }

  const copyToClipboard = () => {
    if (!result) return
    
    navigator.clipboard.writeText(result)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* 标题区域 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">数字转英文</h1>
        <p className="text-muted-foreground">
          将数字转换为英文表达形式，支持基数词、序数词、金额和年份等多种格式
        </p>
      </div>

      {/* 转换类型选择 */}
      <Tabs value={conversionType} onValueChange={(value) => setConversionType(value as ConversionType)} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cardinal">基数词</TabsTrigger>
          <TabsTrigger value="ordinal">序数词</TabsTrigger>
          <TabsTrigger value="currency">金额</TabsTrigger>
          <TabsTrigger value="year">年份</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 主要功能区 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              输入数字
            </CardTitle>
            <CardDescription>
              请输入需要转换的数字
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number">数字</Label>
              <Input
                id="number"
                type="text"
                placeholder={
                  conversionType === 'currency' ? "请输入金额，如：99.99" :
                  conversionType === 'year' ? "请输入年份，如：2024" :
                  "请输入数字，如：123"
                }
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                className="text-lg"
              />
            </div>

            {/* 示例数字 */}
            <div className="space-y-2">
              <Label>常见示例</Label>
              <div className="grid grid-cols-3 gap-2">
                {examples.map((example) => (
                  <Button
                    key={example.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleClick(example.value)}
                  >
                    {example.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleConvert} 
              className="w-full"
              size="lg"
            >
              <Hash className="h-4 w-4 mr-2" />
              转换为英文
            </Button>
          </CardContent>
        </Card>

        {/* 结果区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              转换结果
            </CardTitle>
            <CardDescription>
              英文表达形式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-medium text-center break-words">
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

      {/* 常见示例 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            常见示例
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-mono">123</span>
                <span>→</span>
                <span className="text-muted-foreground">one hundred and twenty three</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-mono">1000</span>
                <span>→</span>
                <span className="text-muted-foreground">one thousand</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-mono">2024</span>
                <span>→</span>
                <span className="text-muted-foreground">two thousand and twenty four</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-mono">1st</span>
                <span>→</span>
                <span className="text-muted-foreground">first</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-mono">$99.99</span>
                <span>→</span>
                <span className="text-muted-foreground">ninety nine dollars and ninety nine cents</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-mono">1000000</span>
                <span>→</span>
                <span className="text-muted-foreground">one million</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 支持基数词的英文表达（如：one, two, three）</p>
          <p>• 支持序数词的英文表达（如：first, second, third）</p>
          <p>• 支持金额的英文表达（如：dollars and cents）</p>
          <p>• 支持年份的特殊读法（如：twenty twenty-four）</p>
          <p>• 正式文件中的数字说明（如：合同、支票等）</p>
          <p>• 英文邮件中的数字表达</p>
        </CardContent>
      </Card>
    </div>
  )
}
