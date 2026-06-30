'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Copy, AlertCircle, Code, Zap } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  validateJSON,
  formatJSON,
  minifyJSON,
  beautifyJSON,
  jsonToCSV,
  csvToJSON,
  type FormatOptions,
  type ValidationResult,
} from '@/lib/tools/json-formatter'

export default function JSONFormatterTool() {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState(2)
  const [sortKeys, setSortKeys] = useState(false)
  const [removeNull, setRemoveNull] = useState(false)
  const [activeTab, setActiveTab] = useState('format')
  const [copied, setCopied] = useState(false)
  const [csvInput, setCsvInput] = useState('')

  const validation = useMemo(() => validateJSON(input), [input])

  const formatted = useMemo(() => {
    if (!validation.valid || !input.trim()) return ''
    try {
      return formatJSON(input, { indent, sortKeys, removeNull })
    } catch {
      return ''
    }
  }, [input, validation.valid, indent, sortKeys, removeNull])

  const minified = useMemo(() => {
    if (!validation.valid || !input.trim()) return ''
    try {
      return minifyJSON(input)
    } catch {
      return ''
    }
  }, [input, validation.valid])

  const jsonToCsvResult = useMemo(() => {
    if (!input.trim()) return { success: false, data: '', error: '' }
    try {
      const data = jsonToCSV(input)
      return { success: true, data, error: '' }
    } catch (error) {
      return { success: false, data: '', error: String(error) }
    }
  }, [input])

  const csvToJsonResult = useMemo(() => {
    if (!csvInput.trim()) return { success: false, data: '', error: '' }
    try {
      const data = csvToJSON(csvInput)
      return { success: true, data, error: '' }
    } catch (error) {
      return { success: false, data: '', error: String(error) }
    }
  }, [csvInput])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const stats = {
    size: input.length,
    lines: input.split('\n').length,
    minifiedSize: minified.length,
    saved: Math.round(((input.length - minified.length) / input.length) * 100),
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">原始大小</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.size} B</div>
            <p className="text-xs text-muted-foreground">{stats.lines} 行</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">压缩大小</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.minifiedSize} B</div>
            <p className="text-xs text-muted-foreground">节省 {stats.saved}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">验证状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {validation.valid ? (
                <span className="text-green-600">✓</span>
              ) : (
                <span className="text-red-600">✗</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {validation.valid ? '有效' : '无效'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">功能数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">种转换模式</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="format">格式化</TabsTrigger>
          <TabsTrigger value="convert">转换</TabsTrigger>
          <TabsTrigger value="csv">CSV</TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json-input">JSON 输入</Label>
            <textarea
              id="json-input"
              placeholder="粘贴或输入 JSON 数据..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {!validation.valid && input.trim() && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                JSON 错误: {validation.error}
                {validation.errorLine && ` (第 ${validation.errorLine} 行)`}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="indent">缩进</Label>
              <Select value={String(indent)} onValueChange={(v) => setIndent(Number(v))}>
                <SelectTrigger id="indent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 空格</SelectItem>
                  <SelectItem value="4">4 空格</SelectItem>
                  <SelectItem value="8">8 空格</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant={sortKeys ? 'default' : 'outline'}
                onClick={() => setSortKeys(!sortKeys)}
                className="w-full"
              >
                {sortKeys ? '✓' : ''} 按键排序
              </Button>
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant={removeNull ? 'default' : 'outline'}
                onClick={() => setRemoveNull(!removeNull)}
                className="w-full"
              >
                {removeNull ? '✓' : ''} 移除 Null
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>格式化结果</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(formatted)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <textarea
              readOnly
              value={formatted}
              className="h-48 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>压缩结果</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(minified)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <textarea
              readOnly
              value={minified}
              className="h-24 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
            />
          </div>
        </TabsContent>

        <TabsContent value="convert" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json-to-csv">JSON 数组</Label>
            <textarea
              id="json-to-csv"
              placeholder='输入 JSON 数组，例如: [{"name":"张三","age":30},{"name":"李四","age":25}]'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {jsonToCsvResult.success ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>CSV 结果</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(jsonToCsvResult.data)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <textarea
                readOnly
                value={jsonToCsvResult.data}
                className="h-24 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
              />
            </div>
          ) : jsonToCsvResult.error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{jsonToCsvResult.error}</AlertDescription>
            </Alert>
          ) : null}
        </TabsContent>

        <TabsContent value="csv" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-to-json">CSV 输入</Label>
            <textarea
              id="csv-to-json"
              placeholder="输入 CSV 数据，首行为列名"
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {csvToJsonResult.success ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>JSON 结果</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(csvToJsonResult.data)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <textarea
                readOnly
                value={csvToJsonResult.data}
                className="h-48 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
              />
            </div>
          ) : csvToJsonResult.error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{csvToJsonResult.error}</AlertDescription>
            </Alert>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  )
}
