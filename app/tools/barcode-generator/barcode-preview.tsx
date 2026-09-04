// 名称: 条码预览与下载
// 描述: 使用浏览器端编码器渲染条码并导出 PNG/SVG
// 路径: Globokit/app/tools/barcode-generator/barcode-preview.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useEffect, useRef, useState } from 'react'
import { CircleAlert, Download, FileCode2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  formatBarcodeError,
  getBarcodeFormat,
  type BarcodeRenderRequest,
} from '@/lib/tools/barcode-generator'

interface BarcodePreviewProps {
  request: BarcodeRenderRequest
  inputError: string
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function BarcodePreview({ request, inputError }: BarcodePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [result, setResult] = useState<{ request: BarcodeRenderRequest; svg: string; error: string } | null>(null)
  const format = getBarcodeFormat(request.formatId)
  const loading = result?.request !== request
  const svg = loading ? '' : result?.svg ?? ''
  const renderError = loading ? '' : result?.error ?? ''
  const activeError = inputError || renderError
  const canDownload = !loading && !activeError && Boolean(svg)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    async function render() {
      try {
        const { renderBarcode } = await import('./barcode-renderer').catch(() => {
          throw new Error('条码编码器加载失败，请点击“生成条码”重试')
        })
        // 切换请求或卸载后，旧异步任务不可再绘制 canvas 或更新结果。
        if (cancelled || !canvas) return
        const nextSvg = renderBarcode(request, canvas)
        setResult({ request, svg: nextSvg, error: '' })
      } catch (caughtError) {
        if (cancelled) return
        if (canvas) { canvas.width = 1; canvas.height = 1 }
        setResult({ request, svg: '', error: formatBarcodeError(caughtError) })
      }
    }
    void render()
    return () => { cancelled = true }
  }, [request])

  function downloadPng() {
    const canvas = canvasRef.current
    if (!canvas || !canDownload) return
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `globokit-${request.formatId}.png`)
      else setResult((current) => current?.request === request
        ? { ...current, error: '浏览器未能生成 PNG 文件，请重新生成后尝试下载 SVG' }
        : current)
    }, 'image/png')
  }

  function downloadSvg() {
    if (!canDownload) return
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `globokit-${request.formatId}.svg`)
  }

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span>生成结果</span>
          <span className="text-sm font-normal text-muted-foreground">{format.label}</span>
        </CardTitle>
        <CardDescription>白底、深色条纹，并按格式保留静区；下载文件保持原始像素尺寸。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div aria-busy={loading} className="flex min-h-80 items-center justify-center overflow-auto rounded-lg border bg-white p-6">
          <canvas ref={canvasRef} className={activeError || loading ? 'hidden' : 'h-auto max-w-full'} aria-label={`${format.label} 条码预览`} />
          {activeError ? <p className="text-sm text-slate-500">修正数据或重试后重新生成预览</p>
            : loading && <p role="status" className="text-sm text-slate-500">正在加载编码器并生成条码…</p>}
        </div>

        {!inputError && renderError && (
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertDescription>{renderError}</AlertDescription>
          </Alert>
        )}

        {!inputError && (
          <div className="rounded-md border bg-muted/40 p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">规范化编码内容</p>
            <p className="break-all font-mono text-sm leading-6">{request.displayText}</p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="outline" onClick={downloadPng} disabled={!canDownload}>
            <Download className="mr-2 h-4 w-4" />
            下载 PNG
          </Button>
          <Button type="button" variant="outline" onClick={downloadSvg} disabled={!canDownload}>
            <FileCode2 className="mr-2 h-4 w-4" />
            下载 SVG
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
