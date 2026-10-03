// 名称: 唛头预览组件
// 描述: 以纸箱印刷面样式预览唛头文本，支持复制与逐箱标签
// 路径: Globokit/app/tools/shipping-mark-generator/shipping-mark-preview.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { Info, Package, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import type { CartonLabel } from '@/lib/tools/shipping-mark-generator'
import { SHIPPING_MARK_TIPS } from './shipping-mark-data'

export interface ShippingMarkPreviewProps {
  markLines: string[]
  markText: string
  cartonLabels: CartonLabel[]
  totalCartons: number
  truncated: boolean
}

export function ShippingMarkPreview({ markLines, markText, cartonLabels, totalCartons, truncated }: ShippingMarkPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5" />唛头预览</CardTitle>
              <CardDescription>模拟外箱印刷面，逐箱风格预览见下方标签</CardDescription>
            </div>
            <EnhancedCopyButton text={markText} variant="outline" size="sm">复制全文</EnhancedCopyButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mx-auto w-fit max-w-full rounded-lg border-[3px] border-slate-800 bg-white px-8 py-6 text-center dark:border-slate-300 dark:bg-slate-900">
            {markLines.length === 0 ? (
              <p className="text-sm text-muted-foreground">填写左侧要素后生成唛头</p>
            ) : (
              markLines.map((line, index) => (
                <p key={`${index}-${line}`} className="whitespace-pre font-mono text-lg font-bold leading-8 tracking-wider text-slate-900 dark:text-slate-100">
                  {line}
                </p>
              ))
            )}
          </div>
          <p className="text-xs text-muted-foreground">印刷时保持行距与字号一致，字体建议 Arial Black 或 Impact 等粗体无衬线字体。</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" />逐箱标签预览</CardTitle>
          <CardDescription>展示前 {cartonLabels.length} 箱，{cartonNumberNote(totalCartons, truncated)}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {cartonLabels.map((label) => (
            <div key={label.cartonNo} className="rounded-md border bg-muted/20 p-3">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">CARTON {label.cartonNo}</p>
              {label.lines.map((line, index) => (
                <p key={`${index}-${line}`} className="whitespace-pre font-mono text-xs font-semibold leading-5">{line}</p>
              ))}
              <div className="mt-2">
                <EnhancedCopyButton text={label.lines.join('\n')} variant="ghost" size="sm">复制</EnhancedCopyButton>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />唛头规范提示</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            {SHIPPING_MARK_TIPS.map((tip) => <li key={tip} className="flex items-start gap-2"><Info className="mt-1 h-3.5 w-3.5 shrink-0" />{tip}</li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function cartonNumberNote(totalCartons: number, truncated: boolean): string {
  return truncated ? `共 ${totalCartons} 箱，仅预览前 5 箱` : `共 ${totalCartons} 箱`
}
