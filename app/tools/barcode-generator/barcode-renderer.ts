// 编码器独立为异步 chunk，保持命名导入以保留 tree shaking。
import {
  code128, code39, datamatrix, drawingSVG, ean13, ean8,
  gs1_128, gs1datamatrix, itf14, qrcode, upca, type RenderOptions,
} from '@bwip-js/browser'
import { getBarcodeFormat, type BarcodeFormatId, type BarcodeRenderRequest } from '@/lib/tools/barcode-generator'

const ENCODERS: Record<BarcodeFormatId, typeof qrcode> = {
  gs1datamatrix, 'gs1-128': gs1_128, qrcode, datamatrix, code128, code39,
  ean13, ean8, upca, itf14, isbn13: ean13,
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

export function renderBarcode(request: BarcodeRenderRequest, canvas?: HTMLCanvasElement): string {
  const options = createOptions(request)
  const encoder = ENCODERS[request.formatId]
  if (canvas) encoder(canvas, options)
  return encoder(options, drawingSVG())
}
