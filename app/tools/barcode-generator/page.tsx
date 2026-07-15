// 名称: 国际条码生成器
// 描述: 生成符合 GS1 数据规则及常见国际条码规范的 PNG/SVG 条码
// 路径: Globokit/app/tools/barcode-generator/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { BadgeCheck, Info, Printer } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BarcodeGeneratorTool from './barcode-generator-tool'

const notes = [
  {
    icon: BadgeCheck,
    title: 'GS1 26.0 数据规则',
    text: 'GS1 DataMatrix 采用 ISO/IEC 16022:2024 的 ECC 200 符号制和首位 FNC1，并校验 AI、日期及标识键。',
  },
  {
    icon: Info,
    title: '11 种常用格式',
    text: '覆盖 GS1 DataMatrix、GS1-128、QR、Data Matrix、Code 128/39、EAN、UPC、ITF-14 与 ISBN-13。',
  },
  {
    icon: Printer,
    title: 'PNG 与 SVG 导出',
    text: '位图适合办公预览，SVG 适合继续排版；实际量产前仍应按打印材料和扫描环境做条码质量验证。',
  },
]

export default function BarcodeGeneratorPage() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">国际条码生成器</h1>
          <p className="max-w-3xl text-muted-foreground">
            本地生成 GS1 DataMatrix、GS1-128 及常用零售、物流和通用条码，支持 PNG/SVG 下载。
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200">
          GS1 General Specifications 26.0
        </Badge>
      </div>

      <BarcodeGeneratorTool />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {notes.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Icon className="h-4 w-4 text-primary" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">{text}</CardContent>
          </Card>
        ))}
      </div>

      <Alert className="mt-6">
        <Info className="h-4 w-4" />
        <AlertTitle>生成图形不等于取得 GS1 编码授权</AlertTitle>
        <AlertDescription className="leading-6">
          EAN/UPC/GTIN/SSCC 等号码应由企业合法分配或通过所在地 GS1 成员组织取得。页面依据
          {' '}<a className="font-medium text-primary underline-offset-4 hover:underline" href="https://ref.gs1.org/standards/genspecs/" target="_blank" rel="noopener noreferrer">GS1 General Specifications 26.0</a>
          {' '}与 <a className="font-medium text-primary underline-offset-4 hover:underline" href="https://www.iso.org/standard/80926.html" target="_blank" rel="noopener noreferrer">ISO/IEC 16022:2024</a>
          {' '}生成数据和符号，但不能替代 ISO/IEC 15415:2024、15416:2025 等实体条码质量检测。
        </AlertDescription>
      </Alert>
    </>
  )
}
