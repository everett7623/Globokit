'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Copy, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { 
  convertToPinyin, 
  analyzeText, 
  examples,
  PinyinOptions 
} from '@/lib/tools/pinyin'

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [toneType, setToneType] = useState<'symbol' | 'num' | 'none'>('symbol')
  const [stats, setStats] = useState({
    totalChars: 0,
    chineseChars: 0,
    nonChineseChars: 0,
    conversionRate: '0%'
  })

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('请输入中文文本')
      return
    }

    const options: PinyinOptions = {
      toneType: toneType,
      separator: ' ',
      nonZh: 'spaced'
    }

    const result = convertToPinyin(input, options)
    setOutput(result)
    setStats(analyzeText(input))
    toast.success('转换成功')
  }

  const handleCopy = () => {
    if (!output) {
      toast.error('没有可复制的内容')
      return
    }
    
    navigator.clipboard.writeText(output)
    toast.success('已复制到剪贴板')
  }

  const handleReset = () => {
    setInput('')
    setOutput('')
    setStats({
      totalChars: 0,
      chineseChars: 0,
      nonChineseChars: 0,
      conversionRate: '0%'
    })
  }

  const handleExample = (example: string) => {
    setInput(example)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>中文转拼音</CardTitle>
          <CardDescription>
            将中文文本转换为拼音，使用专业的 pinyin-pro 库，支持多种声调格式
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 输入区域 */}
          <div className="space-y-2">
            <Label htmlFor="input">输入中文文本</Label>
            <Textarea
              id="input"
              placeholder="请输入需要转换的中文文本..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-32"
            />
          </div>

          {/* 示例按钮 */}
          <div className="space-y-2">
            <Label>快速示例</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExample(examples.basic)}
              >
                基础示例
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExample(examples.greeting)}
              >
                常用问候
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExample(examples.classic)}
              >
                经典句子
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExample(examples.daily)}
              >
                日常用语
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExample(examples.names)}
              >
                常见姓名
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExample(examples.address)}
              >
                地址示例
              </Button>
            </div>
          </div>

          {/* 声调选项 */}
          <div className="space-y-2">
            <Label>声调格式</Label>
            <RadioGroup value={toneType} onValueChange={(value) => setToneType(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="symbol" id="symbol" />
                <Label htmlFor="symbol">符号声调 (nǐ hǎo)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="num" id="num" />
                <Label htmlFor="num">数字声调 (ni3 hao3)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">无声调 (ni hao)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              转换拼音
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* 输出区域 */}
          {output && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="output">转换结果</Label>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Copy className="h-3 w-3" />
                  复制
                </Button>
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                className="h-32"
              />
            </div>
          )}

          {/* 统计信息 */}
          {output && (
            <div className="space-y-2">
              <Label>转换统计</Label>
              <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
                <p>总字符数：{stats.totalChars}</p>
                <p>中文字符：{stats.chineseChars}</p>
                <p>非中文字符：{stats.nonChineseChars}</p>
                <p>中文占比：{stats.conversionRate}</p>
              </div>
            </div>
          )}

          {/* 功能特点 */}
          <div className="space-y-2">
            <Label>功能特点</Label>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 使用专业的 pinyin-pro 库，识别准确率高</li>
              <li>• 支持多种声调格式（符号、数字、无声调）</li>
              <li>• 自动处理多音字，选择最常用读音</li>
              <li>• 保留英文、数字和标点符号</li>
              <li>• 支持完整的中文字符集，包括生僻字</li>
              <li>• 高性能转换，可处理大量文本</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
