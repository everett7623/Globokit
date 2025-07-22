// 名称: 中文转拼音
// 描述: 将中文文本转换为拼音，支持多种声调格式
// 路径: seedtool/app/tools/pinyin/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, RotateCcw, Type, Hash, Globe, Info, Zap } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  convertToPinyin, 
  analyzeText, 
  examples,
  PinyinOptions 
} from '@/lib/tools/pinyin'

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [toneType, setToneType] = useState<'symbol' | 'num' | 'none'>('none')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{
    input: string
    output: string
    toneType: string
  }>>([])
  const [stats, setStats] = useState({
    totalChars: 0,
    chineseChars: 0,
    nonChineseChars: 0,
    conversionRate: '0%'
  })

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

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
    
    // 添加到历史记录
    const toneLabel = toneType === 'none' ? '无声调' : toneType === 'symbol' ? '符号声调' : '数字声调'
    setHistory(prev => [{
      input: input.slice(0, 50),
      output: result.slice(0, 50),
      toneType: toneLabel
    }, ...prev.slice(0, 4)])
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
    setOutput('')
  }

  // 示例按钮配置
  const exampleButtons = [
    { key: 'basic', label: '基础示例', text: examples.basic },
    { key: 'greeting', label: '常用问候', text: examples.greeting },
    { key: 'classic', label: '经典句子', text: examples.classic },
    { key: 'daily', label: '日常用语', text: examples.daily },
    { key: 'names', label: '常见姓名', text: examples.names },
    { key: 'address', label: '地址示例', text: examples.address },
  ]

  // 声调选项配置
  const toneOptions = [
    { value: 'none', label: '无声调', example: 'ni hao', description: '不显示声调标记' },
    { value: 'symbol', label: '符号声调', example: 'nǐ hǎo', description: '使用音调符号' },
    { value: 'num', label: '数字声调', example: 'ni3 hao3', description: '使用数字表示声调' },
  ]

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">中文转拼音</h1>
        <p className="text-muted-foreground">
          将中文文本转换为拼音，使用专业的 pinyin-pro 库，支持多种声调格式
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              转换次数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{history.length}</div>
            <p className="text-xs text-muted-foreground">今日转换</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              声调格式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">种模式</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              识别准确
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">高</div>
            <p className="text-xs text-muted-foreground">准确率</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              高性能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">支持</div>
            <p className="text-xs text-muted-foreground">大量文本</p>
          </CardContent>
        </Card>
      </div>

      {/* 主功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>拼音转换</CardTitle>
          <CardDescription>
            输入中文文本，选择声调格式，即可转换为对应的拼音
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 输入区域 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">输入中文文本</Label>
              <span className="text-sm text-muted-foreground">
                {input.length} 字符
              </span>
            </div>
            <Textarea
              id="input"
              placeholder="请输入需要转换的中文文本..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-32 font-mono text-base"
            />
          </div>

          {/* 示例按钮 */}
          <div className="space-y-2">
            <Label>快速示例</Label>
            <div className="flex flex-wrap gap-2">
              {exampleButtons.map((example) => (
                <Button
                  key={example.key}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExample(example.text)}
                >
                  {example.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 声调选项 */}
          <div className="space-y-2">
            <Label htmlFor="toneType">声调格式</Label>
            <Select value={toneType} onValueChange={(value: any) => setToneType(value)}>
              <SelectTrigger id="toneType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {option.example} - {option.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1" size="lg">
              转换拼音
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* 输出区域 */}
          {output && (
            <Card className="border-2 border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  转换结果
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(output, 'output')}
                  >
                    {copiedText === 'output' ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        复制
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  className="h-32 bg-background font-mono text-base"
                />
              </CardContent>
            </Card>
          )}

          {/* 统计信息 */}
          {output && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">转换统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{stats.totalChars}</p>
                    <p className="text-xs text-muted-foreground">总字符数</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{stats.chineseChars}</p>
                    <p className="text-xs text-muted-foreground">中文字符</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.nonChineseChars}</p>
                    <p className="text-xs text-muted-foreground">非中文字符</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.conversionRate}</p>
                    <p className="text-xs text-muted-foreground">中文占比</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 转换历史 */}
          {history.length > 0 && (
            <div className="space-y-2">
              <Label>最近转换记录</Label>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-3 pb-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{item.toneType}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(item.output, `history-${index}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copiedText === `history-${index}` ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-muted-foreground">
                            {item.input}{item.input.length >= 50 ? '...' : ''}
                          </p>
                          <p className="font-mono">
                            {item.output}{item.output.length >= 50 ? '...' : ''}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 功能说明 */}
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              功能特点
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 使用专业的 pinyin-pro 库，识别准确率高</p>
            <p>• 支持多种声调格式（符号、数字、无声调）</p>
            <p>• 自动处理多音字，选择最常用读音</p>
            <p>• 保留英文、数字和标点符号</p>
            <p>• 支持完整的中文字符集，包括生僻字</p>
            <p>• 高性能转换，可处理大量文本</p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              使用场景
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 中文学习和教学材料制作</p>
            <p>• 拼音输入法词库生成</p>
            <p>• 中文内容国际化处理</p>
            <p>• 语音合成前处理</p>
            <p>• SEO优化URL生成</p>
            <p>• 数据库拼音索引建立</p>
          </CardContent>
        </Card>
      </div>

      {/* 声调格式示例 */}
      <Card className="mt-4 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">声调格式对比</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded bg-background">
                <p className="font-medium mb-2">无声调</p>
                <p className="font-mono text-lg">ni hao shi jie</p>
                <p className="text-xs text-muted-foreground mt-2">适合：URL、文件名</p>
              </div>
              <div className="text-center p-4 rounded bg-background">
                <p className="font-medium mb-2">符号声调</p>
                <p className="font-mono text-lg">nǐ hǎo shì jiè</p>
                <p className="text-xs text-muted-foreground mt-2">适合：教学材料、出版物</p>
              </div>
              <div className="text-center p-4 rounded bg-background">
                <p className="font-medium mb-2">数字声调</p>
                <p className="font-mono text-lg">ni3 hao3 shi4 jie4</p>
                <p className="text-xs text-muted-foreground mt-2">适合：输入法、数据处理</p>
              </div>
            </div>
            <Alert>
              <AlertDescription>
                原文：你好世界 - 不同的声调格式适用于不同的使用场景
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
