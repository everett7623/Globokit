// 名称: 条码预览与下载
// 描述: 使用浏览器端编码器渲染条码并导出 PNG/SVG
// 路径: Globokit/app/tools/barcode-generator/barcode-preview.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  code128,
  code39,
  datamatrix,
  drawingSVG,
  ean13,
  ean8,
  gs1_128,
  gs1datamatrix,
  itf14,
  qrcode,
  upca,
  type RenderOptions,
} from '@bwip-js/browser'
import { CircleAlert, Download, FileCode2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  formatBarcodeError,
  getBarcodeFormat,
  type BarcodeFormatId,
  type BarcodeRenderRequest,
} from '@/lib/tools/barcode-generator'

interface BarcodePreviewProps {
  request: BarcodeRenderRequest
  inputError: string
}

type BarcodeEncoder = typeof qrcode

const ENCODERS: Record<BarcodeFormatId, BarcodeEncoder> = {
  gs1datamatrix,
  'gs1-128': gs1_128,
  qrcode,
  datamatrix,
  code128,
  code39,
  ean13,
  ean8,
  upca,
  itf14,
  isbn13: ean13,
}

function createOptions(request: BarcodeRenderRequest): RenderOptions {
  const format = getBarcodeFormat(request.formatId)
  const qrPadding = request.formatId === 'qrcode' ? 4 : 2

  return {
    bcid: format.bcid,
    text: request.encodedText,
    scale: request.scale,
    backgroundcolor: 'FFFFFF',
    barcolor: '111827',
    textcolor: '111827',
    paddingwidth: format.is2D ? qrPadding : 12,
    paddingheight: format.is2D ? qrPadding : 3,
    ...(!format.is2D && {
      height: 18,
      includetext: true,
      textxalign: 'center' as const,
      textsize: 10,
      guardwhitespace: ['ean13', 'ean8', 'upca', 'isbn13'].includes(request.formatId),
    }),
  }
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
  const [svg, setSvg] = useState('')
  const [renderError, setRenderError] = useState('')
  const format = getBarcodeFormat(request.formatId)
  const activeError = inputError || renderError

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const options = createOptions(request)
      const encoder = ENCODERS[request.formatId]
      encoder(canvas, options)
      setSvg(encoder(options, drawingSVG()))
      setRenderError('')
    } catch (caughtError) {
      canvas.width = 1
      canvas.height = 1
      setSvg('')
      setRenderError(formatBarcodeError(caughtError))
    }
  }, [request])

  function downloadPng() {
    const canvas = canvasRef.current
    if (!canvas || activeError) return
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `globokit-${request.formatId}.png`)
      else setRenderError('浏览器未能生成 PNG 文件，请尝试下载 SVG')
    }, 'image/png')
  }

  function downloadSvg() {
    if (!svg || activeError) return
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
        <div className="flex min-h-80 items-center justify-center overflow-auto rounded-lg border bg-white p-6">
          <canvas ref={canvasRef} className={activeError ? 'hidden' : 'h-auto max-w-full'} aria-label={`${format.label} 条码预览`} />
          {activeError && <p className="text-sm text-slate-500">修正数据后重新生成预览</p>}
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
          <Button type="button" variant="outline" onClick={downloadPng} disabled={Boolean(activeError)}>
            <Download className="mr-2 h-4 w-4" />
            下载 PNG
          </Button>
          <Button type="button" variant="outline" onClick={downloadSvg} disabled={!svg || Boolean(activeError)}>
            <FileCode2 className="mr-2 h-4 w-4" />
            下载 SVG
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
