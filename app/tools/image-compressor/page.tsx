// 名称: 图片压缩工具
// 描述: 浏览器本地批量压缩产品图片，支持质量、尺寸与输出格式调整
// 路径: Globokit/app/tools/image-compressor/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-12

'use client'

import { useCallback, useRef, useState } from 'react'
import { Download, ImageDown, RefreshCw, Trash2 } from 'lucide-react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  OUTPUT_TYPES,
  buildOutputFileName,
  calculateTargetDimensions,
  formatFileSize,
  needsWhiteBackdrop,
  savingsPercent,
  type OutputType,
} from '@/lib/tools/image-compressor'

interface CompressItem {
  id: string
  name: string
  originalSize: number
  inputType: string
  originalWidth: number
  originalHeight: number
  status: 'pending' | 'done' | 'error'
  outputUrl?: string
  outputSize?: number
  outputName?: string
  outputWidth?: number
  outputHeight?: number
  error?: string
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('图片解析失败，文件可能已损坏'))
    }
    image.src = url
  })
}

export default function ImageCompressorPage() {
  const [maxSide, setMaxSide] = useState('1920')
  const [qualityPercent, setQualityPercent] = useState('80')
  const [outputType, setOutputType] = useState<OutputType>('image/jpeg')
  const [items, setItems] = useState<CompressItem[]>([])
  const [notice, setNotice] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const compressOne = useCallback(async (item: CompressItem, file: File): Promise<CompressItem> => {
    const sideLimit = maxSide
    const quality = qualityPercent
    const format = outputType
    try {
      const image = await loadImage(file)
      const target = calculateTargetDimensions(image.naturalWidth, image.naturalHeight, toNumber(sideLimit))
      const canvas = document.createElement('canvas')
      canvas.width = target.width
      canvas.height = target.height
      const context = canvas.getContext('2d')
      if (!context) throw new Error('浏览器不支持 canvas 绘制')
      if (needsWhiteBackdrop(item.inputType, format)) {
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
      context.drawImage(image, 0, 0, target.width, target.height)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, toNumber(quality) / 100))
      if (!blob) throw new Error('压缩输出失败，请调整参数重试')
      return {
        ...item,
        originalWidth: image.naturalWidth,
        originalHeight: image.naturalHeight,
        status: 'done',
        outputUrl: URL.createObjectURL(blob),
        outputSize: blob.size,
        outputName: buildOutputFileName(item.name, format),
        outputWidth: target.width,
        outputHeight: target.height,
      }
    } catch (error) {
      return { ...item, status: 'error', error: error instanceof Error ? error.message : '压缩失败' }
    }
  }, [maxSide, qualityPercent, outputType])

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    const unsupported = files.filter((file) => !file.type.startsWith('image/'))
    if (unsupported.length > 0) {
      setNotice(`已跳过 ${unsupported.length} 个非图片文件`)
    } else {
      setNotice('')
    }
    const images = files.filter((file) => file.type.startsWith('image/')).slice(0, 20)
    const newItems: CompressItem[] = images.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      originalSize: file.size,
      inputType: file.type,
      originalWidth: 0,
      originalHeight: 0,
      status: 'pending',
    }))
    setItems((current) => [...newItems, ...current])
    for (let index = 0; index < images.length; index += 1) {
      const done = await compressOne(newItems[index], images[index])
      setItems((current) => current.map((item) => (item.id === done.id ? done : item)))
    }
  }, [compressOne])

  const totalOriginal = items.filter((item) => item.status === 'done').reduce((sum, item) => sum + item.originalSize, 0)
  const totalOutput = items.filter((item) => item.status === 'done').reduce((sum, item) => sum + (item.outputSize ?? 0), 0)

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">产品图片压缩工具</h1>
        <p className="text-muted-foreground">发客户、传平台前把产品图压到目标体积：全部处理在你的浏览器本地完成，图片不会上传到任何服务器。支持批量最多 20 张。</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.2fr)]">
        <Card className="print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageDown className="h-5 w-5" />压缩设置</CardTitle>
            <CardDescription>调整后点击重新压缩即可按新参数处理已选图片</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="image-input">选择图片</Label>
              <input
                ref={inputRef}
                id="image-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="block w-full cursor-pointer rounded-md border border-dashed p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white dark:bg-white/4 dark:file:bg-white dark:file:text-slate-950"
                onChange={(event) => {
                  void handleFiles(event.target.files)
                  event.target.value = ''
                }}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxSide">最大边长（px，等比缩放）</Label>
                <FormattedInput id="maxSide" value={maxSide} onChange={setMaxSide} format="number" maxDecimals={0} className="h-11 font-medium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quality">压缩质量：{qualityPercent}%</Label>
                <input
                  id="quality"
                  type="range"
                  min={30}
                  max={95}
                  step={5}
                  value={toNumber(qualityPercent)}
                  onChange={(event) => setQualityPercent(event.target.value)}
                  className="mt-3 w-full accent-emerald-600"
                  disabled={outputType === 'image/png'}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="outputType">输出格式</Label>
              <Select value={outputType} onValueChange={(value) => setOutputType(value as OutputType)}>
                <SelectTrigger id="outputType" className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {OUTPUT_TYPES.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {needsWhiteBackdrop('image/png', outputType) && <p className="text-xs text-amber-600 dark:text-amber-300">透明 PNG 转 JPEG 会自动铺白底；需要保留透明请选 WebP。</p>}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={items.length === 0}
              onClick={() => {
                setNotice('')
                void Promise.all(items.map(async (item) => {
                  const response = await fetch(item.outputUrl ?? 'data:,')
                  const blob = await response.blob()
                  const file = new File([blob], item.name, { type: item.inputType })
                  return compressOne(item, file)
                })).then((redone) => setItems(redone))
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />按当前参数重新压缩
            </Button>
            {notice && <EnhancedAlert type="info" message={notice} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>压缩结果</CardTitle>
                <CardDescription>
                  {items.length === 0 ? '选择图片后这里显示前后对比' : `完成 ${items.filter((item) => item.status === 'done').length}/${items.length} 张`}
                  {totalOriginal > 0 && totalOutput > 0 ? ` · 合计 ${formatFileSize(totalOriginal)} → ${formatFileSize(totalOutput)}（节省 ${savingsPercent(totalOriginal, totalOutput)}%）` : ''}
                </CardDescription>
              </div>
              {items.length > 0 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setItems([])}>
                  <Trash2 className="mr-2 h-4 w-4" />清空
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">选择或拖入图片开始压缩</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="rounded-md border bg-muted/20 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-semibold" title={item.name}>{item.name}</p>
                    {item.status === 'done' && (
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300">
                        {formatFileSize(item.originalSize)} → {formatFileSize(item.outputSize ?? 0)}（省 {savingsPercent(item.originalSize, item.outputSize ?? 0)}%）
                      </span>
                    )}
                    {item.status === 'pending' && <span className="text-xs text-muted-foreground">压缩中…</span>}
                    {item.status === 'error' && <span className="text-xs text-red-600 dark:text-red-400">{item.error}</span>}
                  </div>
                  {item.status === 'done' && (
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{item.originalWidth}×{item.originalHeight} → {item.outputWidth}×{item.outputHeight}</span>
                      <a
                        href={item.outputUrl}
                        download={item.outputName}
                        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200"
                      >
                        <Download className="h-3.5 w-3.5" />下载 {item.outputName}
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}
