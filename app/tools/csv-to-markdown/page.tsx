// 名称: CSV 与 Markdown 表格互转工具
// 描述: 在浏览器本地完成 CSV 与 Markdown 表格的互相转换
// 路径: Globokit/app/tools/csv-to-markdown/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-16

'use client'

import { useMemo, useState } from 'react'
import { ArrowLeftRight, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileFriendlyWrapper, MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'
import { csvToMarkdown, markdownToCsv } from '@/lib/tools/csv-to-markdown'

const SAMPLE_CSV = '产品,数量,单价\nBluetooth Earbuds,500,12.5\nUSB-C Cable,1000,1.8'
const SAMPLE_MARKDOWN = '| 产品 | 数量 | 单价 |\n| --- | --- | --- |\n| Bluetooth Earbuds | 500 | 12.5 |'

type Direction = 'csv-to-md' | 'md-to-csv'

const DIRECTION_LABELS: Record<Direction, string> = {
  'csv-to-md': 'CSV → Markdown',
  'md-to-csv': 'Markdown → CSV',
}

export default function CsvToMarkdownPage() {
  const [direction, setDirection] = useState<Direction>('csv-to-md')
  const [input, setInput] = useState(SAMPLE_CSV)

  const result = useMemo(
    () => (direction === 'csv-to-md' ? csvToMarkdown(input) : markdownToCsv(input)),
    [direction, input]
  )

  const swapDirection = () => {
    const next: Direction = direction === 'csv-to-md' ? 'md-to-csv' : 'csv-to-md'
    setDirection(next)
    if (result.ok) setInput(result.output)
  }

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">CSV 与 Markdown 表格互转</h1>
        <p className="text-muted-foreground">把客户表格快速转成 Markdown 写入文档，或把 Markdown 表格还原为 CSV 交给 Excel</p>
      </div>

      <MobileButtonGroup className="mb-6">
        {(Object.keys(DIRECTION_LABELS) as Direction[]).map((item) => (
          <Button key={item} type="button" variant={direction === item ? 'default' : 'outline'} onClick={() => setDirection(item)}>
            {DIRECTION_LABELS[item]}
          </Button>
        ))}
      </MobileButtonGroup>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{direction === 'csv-to-md' ? 'CSV 输入' : 'Markdown 输入'}</CardTitle>
            <CardDescription>
              {direction === 'csv-to-md' ? '支持带引号的 CSV 字段，逗号分隔，第一行作为表头' : '每行以 | 开头并结尾，自动跳过 --- 分隔行'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-md-input">原始内容</Label>
              <Textarea
                id="csv-md-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={direction === 'csv-to-md' ? '粘贴 CSV 文本' : '粘贴 Markdown 表格'}
                className="min-h-[240px] font-mono text-sm"
              />
            </div>
            <MobileButtonGroup>
              <Button type="button" variant="outline" onClick={swapDirection}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />交换方向
              </Button>
              <Button type="button" variant="outline" onClick={() => setInput(direction === 'csv-to-md' ? SAMPLE_CSV : SAMPLE_MARKDOWN)}>
                <RotateCcw className="mr-2 h-4 w-4" />恢复示例
              </Button>
            </MobileButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>转换结果</CardTitle>
            <CardDescription>
              {result.ok ? `${result.columnCount} 列，含表头共 ${result.rowCount + 1} 行` : '等待有效输入'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!result.ok && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertDescription>{result.error}</AlertDescription>
              </Alert>
            )}
            <Textarea
              aria-label="转换结果"
              readOnly
              value={result.ok ? result.output : ''}
              placeholder="转换结果将显示在这里"
              className="min-h-[240px] font-mono text-sm"
            />
            <MobileButtonGroup>
              <EnhancedCopyButton text={result.ok ? result.output : ''} disabled={!result.ok}>复制结果</EnhancedCopyButton>
            </MobileButtonGroup>
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}
