// 名称: 条码生成参数面板
// 描述: 提供条码格式、数据内容与输出清晰度设置
// 路径: Globokit/app/tools/barcode-generator/barcode-controls.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { CircleAlert, ScanLine } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  BARCODE_FORMATS,
  getBarcodeFormat,
  type BarcodeFormatId,
  type BarcodeScale,
} from '@/lib/tools/barcode-generator'

interface BarcodeControlsProps {
  formatId: BarcodeFormatId
  input: string
  scale: BarcodeScale
  error: string
  onFormatChange: (value: BarcodeFormatId) => void
  onInputChange: (value: string) => void
  onScaleChange: (value: BarcodeScale) => void
  onGenerate: () => void
}

export default function BarcodeControls({
  formatId,
  input,
  scale,
  error,
  onFormatChange,
  onInputChange,
  onScaleChange,
  onGenerate,
}: BarcodeControlsProps) {
  const format = getBarcodeFormat(formatId)

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>生成参数</CardTitle>
        <CardDescription>数据只在当前浏览器中编码，不会上传到第三方服务。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="barcode-format">条码格式</Label>
          <Select value={formatId} onValueChange={(value) => onFormatChange(value as BarcodeFormatId)}>
            <SelectTrigger id="barcode-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BARCODE_FORMATS.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs leading-5 text-muted-foreground">{format.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="barcode-data">编码数据</Label>
            <Button variant="ghost" size="sm" type="button" onClick={() => onInputChange(format.example)}>
              载入示例
            </Button>
          </div>
          <Textarea
            id="barcode-data"
            value={input}
            inputMode={format.numericOnly ? 'numeric' : 'text'}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder={format.placeholder}
            className="min-h-36 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">{input.length} 个字符</p>
        </div>

        {format.isGs1 && (
          <Alert className="border-emerald-200 bg-emerald-50/70 dark:border-emerald-300/20 dark:bg-emerald-300/10">
            <AlertDescription className="leading-6">
              推荐输入 <code>(01)GTIN(17)YYMMDD(10)批号</code>。也支持常见原始元素串；变量长度字段后仍有其他 AI 时，请用 <code>\F</code> 或 <code>&lt;GS&gt;</code> 分隔。
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="barcode-scale">输出清晰度</Label>
          <Select value={String(scale)} onValueChange={(value) => onScaleChange(Number(value) as BarcodeScale)}>
            <SelectTrigger id="barcode-scale">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">标准（2x）</SelectItem>
              <SelectItem value="3">高清（3x）</SelectItem>
              <SelectItem value="4">印刷预览（4x）</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="button" size="lg" className="w-full" onClick={onGenerate}>
          <ScanLine className="mr-2 h-4 w-4" />
          生成条码
        </Button>
      </CardContent>
    </Card>
  )
}
