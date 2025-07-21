// 名称: 英文大小写转换
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: seedtool/app/tools/text-case/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Type, Info, RefreshCw, FileText } from 'lucide-react'
import { 
  toUpperCase, 
  toLowerCase, 
  toCapitalize, 
  toSentenceCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase
} from '@/lib/tools/text-case'

type CaseType = 'upper' | 'lower' | 'capitalize' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'pascal'

export default function TextCasePage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedCase, setSelectedCase] = useState<CaseType>('sentence')
  const [isCopied, setIsCopied] = useState(false)

  const caseOptions = [
    { value: 'upper', label: '全部大写', example: 'HELLO WORLD' },
    { value: 'lower', label: '全部小写', example: 'hello world' },
    { value: 'capitalize', label: '首字母大写', example: 'Hello World' },
    { value: 'sentence', label: '句子首字母大写', example: 'Hello world. How are you?' },
    { value: 'camel', label: '驼峰命名', example: 'helloWorld' },
    { value: 'pascal', label: 'Pascal命名', example: 'HelloWorld' },
    { value: 'snake', label: '下划线命名', example: 'hello_world' },
    { value: 'kebab', label: '短横线命名', example: 'hello-world' }
  ]

  const handleConvert = () => {
    if (!inputText) return

    let result = ''
    switch (selectedCase) {
      case 'upper':
        result = toUpperCase(inputText)
        break
      case 'lower':
        result = toLowerCase(inputText)
        break
      case 'capitalize':
        result = toCapitalize(inputText)
        break
      case 'sentence':
        result = toSentenceCase(inputText)
        break
      case 'camel':
        result = toCamelCase(inputText)
        break
      case 'snake':
        result = toSnakeCase(inputText)
        break
      case 'kebab':
        result = toKebabCase(inputText)
        break
      case 'pascal':
        result = toPascalCase(inputText)
        break
    }
    setOutputText(result)
  }

  const copyToClipboard = () => {
    if (!outputText) return
    
    navigator.clipboard.writeText(outputText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
  }

  // 实时转换
  const handleInputChange = (text: string) => {
    setInputText(text)
    if (text) {
      handleConvertWithCase(text, selectedCase)
    } else {
      setOutputText('')
    }
  }

  const handleCaseChange = (caseType: CaseType) => {
    setSelectedCase(caseType)
    if (inputText) {
      handleConvertWithCase(inputText, caseType)
    }
  }

  const handleConvertWithCase = (text: string, caseType: CaseType) => {
    let result = ''
    switch (caseType) {
      case 'upper':
        result = toUpperCase(text)
        break
      case 'lower':
        result = toLowerCase(text)
        break
      case 'capitalize':
        result = toCapitalize(text)
        break
      case 'sentence':
        result = toSentenceCase(text)
        break
      case 'camel':
        result = toCamelCase(text)
        break
      case 'snake':
        result = toSnakeCase(text)
        break
      case 'kebab':
        result = toKebabCase(text)
        break
      case 'pascal':
        result = toPascalCase(text)
        break
    }
    setOutputText(result)
  }

  // 获取当前选中的案例
  const currentExample = caseOptions.find(opt => opt.value === selectedCase)

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* 标题区域 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">英文大小写转换</h1>
        <p className="text-muted-foreground">
          快速转换英文文本的大小写格式，支持多种转换模式和编程命名规范
        </p>
      </div>

      {/* 转换类型选择 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Type className="h-5 w-5" />
            转换类型
          </CardTitle>
          <CardDescription>
            选择您需要的转换格式
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {caseOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedCase === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleCaseChange(option.value as CaseType)}
                className="justify-start"
              >
                <div className="text-left">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs opacity-70">{option.example}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 主要功能区 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                输入文本
              </span>
              <Badge variant="outline">{inputText.length} 字符</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="请输入需要转换的英文文本..."
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>

        {/* 结果区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                转换结果
              </span>
              {currentExample && (
                <Badge>{currentExample.label}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[300px] resize-none bg-muted"
              placeholder="转换结果将显示在这里..."
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={copyToClipboard}
                disabled={!outputText}
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
              <Button
                variant="outline"
                onClick={clearAll}
                disabled={!inputText && !outputText}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                清空
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">文档格式化：</h4>
            <p>• 全部大写：将所有字母转换为大写</p>
            <p>• 全部小写：将所有字母转换为小写</p>
            <p>• 首字母大写：每个单词首字母大写</p>
            <p>• 句子格式：每个句子首字母大写</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">编程命名规范：</h4>
            <p>• 驼峰命名：首单词小写，后续单词首字母大写</p>
            <p>• Pascal命名：每个单词首字母大写，无分隔符</p>
            <p>• 下划线命名：单词间用下划线分隔</p>
            <p>• 短横线命名：单词间用短横线分隔</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
