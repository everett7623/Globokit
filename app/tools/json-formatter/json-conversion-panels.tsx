// 名称: JSON 转换面板
// 描述: 展示 JSON 与 CSV 双向转换界面
// 路径: Globokit/app/tools/json-formatter/json-conversion-panels.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { AlertCircle, Check, Copy } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'

export interface ConversionResult {
  success: boolean
  data: string
  error: string
}

interface ResultProps {
  label: string
  result: ConversionResult
  copied: boolean
  className: string
  onCopy: (text: string) => void
}

function ConversionResultView({ label, result, copied, className, onCopy }: ResultProps) {
  if (result.success) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>{label}</Label>
          <Button variant="ghost" size="sm" onClick={() => onCopy(result.data)}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <textarea readOnly value={result.data} className={className} />
      </div>
    )
  }

  if (!result.error) return null
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{result.error}</AlertDescription>
    </Alert>
  )
}

interface JsonConversionPanelsProps {
  input: string
  csvInput: string
  jsonToCsvResult: ConversionResult
  csvToJsonResult: ConversionResult
  copied: boolean
  onInputChange: (value: string) => void
  onCsvInputChange: (value: string) => void
  onCopy: (text: string) => void
}

export function JsonConversionPanels(props: JsonConversionPanelsProps) {
  return (
    <>
      <TabsContent value="convert" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="json-to-csv">JSON 数组</Label>
          <textarea id="json-to-csv" placeholder='输入 JSON 数组，例如: [{"name":"张三","age":30},{"name":"李四","age":25}]' value={props.input} onChange={(event) => props.onInputChange(event.target.value)} className="h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        </div>
        <ConversionResultView label="CSV 结果" result={props.jsonToCsvResult} copied={props.copied} onCopy={props.onCopy} className="h-24 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono" />
      </TabsContent>

      <TabsContent value="csv" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv-to-json">CSV 输入</Label>
          <textarea id="csv-to-json" placeholder="输入 CSV 数据，首行为列名" value={props.csvInput} onChange={(event) => props.onCsvInputChange(event.target.value)} className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        </div>
        <ConversionResultView label="JSON 结果" result={props.csvToJsonResult} copied={props.copied} onCopy={props.onCopy} className="h-48 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono" />
      </TabsContent>
    </>
  )
}
