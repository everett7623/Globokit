// 名称: 特殊字符检查与转换
// 描述: 检查文本中的特殊字符，并提供清理或替换选项
// 路径: seedtool/app/tools/special-char/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Copy, 
  Check, 
  AlertCircle, 
  Info, 
  Search,
  RefreshCw,
  FileWarning,
  Shield
} from 'lucide-react'
import { 
  findSpecialCharacters, 
  removeSpecialCharacters,
  replaceSmartQuotes,
  normalizeWhitespace,
  removeNonPrintable
} from '@/lib/tools/special-char'

interface SpecialChar {
  char: string
  code: string
  name: string
  count: number
}

export default function SpecialCharPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [specialChars, setSpecialChars] = useState<SpecialChar[]>([])
  const [isCopied, setIsCopied] = useState(false)
  const [options, setOptions] = useState({
    removeSpecial: true,
    replaceSmartQuotes: true,
    normalizeWhitespace: true,
    removeNonPrintable: true,
    preserveCommon: true
  })

  // 实时检测特殊字符
  useEffect(() => {
    if (inputText) {
      const chars = findSpecialCharacters(inputText)
      setSpecialChars(chars)
    } else {
      setSpecialChars([])
    }
  }, [inputText])

  const handleClean = () => {
    if (!inputText) return

    let result = inputText

    // 按选项处理文本
    if (options.replaceSmartQuotes) {
      result = replaceSmartQuotes(result)
    }
    
    if (options.normalizeWhitespace) {
      result = normalizeWhitespace(result)
    }
    
    if (options.removeNonPrintable) {
      result = removeNonPrintable(result)
    }
    
    if (options.removeSpecial) {
      result = removeSpecialCharacters(result, options.preserveCommon)
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
    setSpecialChars([])
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* 标题区域 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">特殊字符检查与转换</h1>
        <p className="text-muted-foreground">
          检查并清理文本中的特殊字符，避免在邮件或文档中出现乱码
        </p>
      </div>

      {/* 检测结果 */}
      {specialChars.length > 0 && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">检测到 {specialChars.length} 种特殊字符：</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {specialChars.map((char, index) => (
                <Badge key={index} variant="secondary" className="font-mono">
                  "{char.char}" ({char.count}次)
                </Badge>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 主要功能区 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileWarning className="h-5 w-5" />
                输入文本
              </span>
              <Badge variant="outline">{inputText.length} 字符</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="粘贴需要检查的文本..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>

        {/* 结果区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                清理结果
              </span>
              {outputText && (
                <Badge variant="success">已清理</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[300px] resize-none bg-muted"
              placeholder="清理后的文本将显示在这里..."
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

      {/* 清理选项 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            清理选项
          </CardTitle>
          <CardDescription>
            选择需要执行的清理操作
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="remove-special" className="flex-1 cursor-pointer">
                <div className="font-medium">移除特殊字符</div>
                <div className="text-sm text-muted-foreground">删除所有非常规字符</div>
              </Label>
              <Switch
                id="remove-special"
                checked={options.removeSpecial}
                onCheckedChange={(checked) => setOptions({...options, removeSpecial: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="smart-quotes" className="flex-1 cursor-pointer">
                <div className="font-medium">替换智能引号</div>
                <div className="text-sm text-muted-foreground">将弯引号替换为直引号</div>
              </Label>
              <Switch
                id="smart-quotes"
                checked={options.replaceSmartQuotes}
                onCheckedChange={(checked) => setOptions({...options, replaceSmartQuotes: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="whitespace" className="flex-1 cursor-pointer">
                <div className="font-medium">规范化空白字符</div>
                <div className="text-sm text-muted-foreground">统一各种空格和换行</div>
              </Label>
              <Switch
                id="whitespace"
                checked={options.normalizeWhitespace}
                onCheckedChange={(checked) => setOptions({...options, normalizeWhitespace: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="non-printable" className="flex-1 cursor-pointer">
                <div className="font-medium">移除不可见字符</div>
                <div className="text-sm text-muted-foreground">删除零宽度空格等</div>
              </Label>
              <Switch
                id="non-printable"
                checked={options.removeNonPrintable}
                onCheckedChange={(checked) => setOptions({...options, removeNonPrintable: checked})}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="preserve-common" className="flex-1 cursor-pointer">
                <div className="font-medium">保留常用标点</div>
                <div className="text-sm text-muted-foreground">保留逗号、句号等常用符号</div>
              </Label>
              <Switch
                id="preserve-common"
                checked={options.preserveCommon}
                onCheckedChange={(checked) => setOptions({...options, preserveCommon: checked})}
                disabled={!options.removeSpecial}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleClean} 
            className="w-full"
            size="lg"
            disabled={!inputText}
          >
            <Shield className="h-4 w-4 mr-2" />
            清理特殊字符
          </Button>
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
          <p>• 自动检测中英文标点、特殊符号等</p>
          <p>• 智能替换：将特殊字符替换为相近的标准字符</p>
          <p>• 完全清理：只保留标准ASCII字符，适合纯英文环境</p>
          <p>• 常见场景：邮件发送、文档编辑、系统录入等</p>
          <p>• 高亮显示检测到的特殊字符，方便识别和处理</p>
        </CardContent>
      </Card>
    </div>
  )
}
