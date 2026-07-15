// 名称: JSON 格式化面板
// 描述: 展示 JSON 统计、格式化选项与输出结果
// 路径: Globokit/app/tools/json-formatter/json-format-panel.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { AlertCircle, Check, Copy } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'
import type { ValidationResult } from '@/lib/tools/json-formatter'

interface JsonStatsProps {
  size: number
  lines: number
  minifiedSize: number
  saved: number
  isValid: boolean
}

export function JsonFormatterStats({ size, lines, minifiedSize, saved, isValid }: JsonStatsProps) {
  const items = [
    { label: '原始大小', value: `${size} B`, note: `${lines} 行` },
    { label: '压缩大小', value: `${minifiedSize} B`, note: `节省 ${saved}%` },
    { label: '功能数', value: '5', note: '种转换模式' },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.slice(0, 2).map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2"><CardTitle className="text-sm">{item.label}</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.note}</p>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">验证状态</CardTitle></CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isValid ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
          </div>
          <p className="text-xs text-muted-foreground">{isValid ? '有效' : '无效'}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">{items[2].label}</CardTitle></CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{items[2].value}</div>
          <p className="text-xs text-muted-foreground">{items[2].note}</p>
        </CardContent>
      </Card>
    </div>
  )
}

interface JsonFormatPanelProps {
  input: string
  indent: number
  sortKeys: boolean
  removeNull: boolean
  validation: ValidationResult
  formatted: string
  minified: string
  copied: boolean
  onInputChange: (value: string) => void
  onIndentChange: (value: number) => void
  onToggleSortKeys: () => void
  onToggleRemoveNull: () => void
  onCopy: (text: string) => void
}

function CopyButton({ copied, text, onCopy }: { copied: boolean; text: string; onCopy: (text: string) => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={() => onCopy(text)}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

export function JsonFormatPanel(props: JsonFormatPanelProps) {
  const { input, indent, sortKeys, removeNull, validation, formatted, minified, copied } = props

  return (
    <TabsContent value="format" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="json-input">JSON 输入</Label>
        <textarea id="json-input" placeholder="粘贴或输入 JSON 数据..." value={input} onChange={(event) => props.onInputChange(event.target.value)} className="h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
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
          <Select value={String(indent)} onValueChange={(value) => props.onIndentChange(Number(value))}>
            <SelectTrigger id="indent"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 空格</SelectItem>
              <SelectItem value="4">4 空格</SelectItem>
              <SelectItem value="8">8 空格</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-2">
          <Button variant={sortKeys ? 'default' : 'outline'} onClick={props.onToggleSortKeys} className="w-full">
            {sortKeys ? '✓' : ''} 按键排序
          </Button>
        </div>
        <div className="flex items-end gap-2">
          <Button variant={removeNull ? 'default' : 'outline'} onClick={props.onToggleRemoveNull} className="w-full">
            {removeNull ? '✓' : ''} 移除 Null
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between"><Label>格式化结果</Label><CopyButton copied={copied} text={formatted} onCopy={props.onCopy} /></div>
        <textarea readOnly value={formatted} className="h-48 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><Label>压缩结果</Label><CopyButton copied={copied} text={minified} onCopy={props.onCopy} /></div>
        <textarea readOnly value={minified} className="h-24 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono" />
      </div>
    </TabsContent>
  )
}
