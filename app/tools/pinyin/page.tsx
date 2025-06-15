'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Copy, RotateCcw } from 'lucide-react'
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
      alert('请输入中文文本')
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
  }

  const handleCopy = () => {
    if (!output) {
      alert('没有可复制的内容')
      return
    }
    
    navigator.clipboard.writeText(output)
      .then(() => alert('已复制到剪贴板'))
      .catch(() => alert('复制失败，请手动复制'))
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
            将中文文本转换为拼音（临时实现 - 请安装 pinyin-pro 获得完整功能）
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
            <Label htmlFor="toneType">声调格式</Label>
            <select
              id="toneType"
              value={toneType}
              onChange={(e) => setToneType(e.target.value as any)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="symbol">符号声调 (nǐ hǎo)</option>
              <option value="num">数字声调 (ni3 hao3)</option>
              <option value="none">无声调 (ni hao)</option>
            </select>
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
              <li>• 当前为临时实现，请安装 pinyin-pro 获得完整功能</li>
              <li>• 支持多种声调格式（符号、数字、无声调）</li>
              <li>• 保留英文、数字和标点符号</li>
              <li>• 提供文本分析统计功能</li>
              <li className="text-orange-600">⚠️ 临时版本仅支持少量常用汉字</li>
              <li className="text-green-600">✅ 安装 pinyin-pro 后支持完整中文字符集</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
