// 名称: 国际条码生成器交互入口
// 描述: 管理条码类型、输入数据、清晰度与生成请求状态
// 路径: Globokit/app/tools/barcode-generator/barcode-generator-tool.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import BarcodeControls from './barcode-controls'
import BarcodePreview from './barcode-preview'
import {
  getBarcodeFormat,
  prepareBarcodeData,
  type BarcodeFormatId,
  type BarcodeRenderRequest,
  type BarcodeScale,
} from '@/lib/tools/barcode-generator'

const INITIAL_FORMAT: BarcodeFormatId = 'gs1datamatrix'
const INITIAL_INPUT = getBarcodeFormat(INITIAL_FORMAT).example
const INITIAL_DATA = prepareBarcodeData(INITIAL_FORMAT, INITIAL_INPUT)

export default function BarcodeGeneratorTool() {
  const [formatId, setFormatId] = useState<BarcodeFormatId>(INITIAL_FORMAT)
  const [input, setInput] = useState(INITIAL_INPUT)
  const [scale, setScale] = useState<BarcodeScale>(3)
  const [error, setError] = useState('')
  const [request, setRequest] = useState<BarcodeRenderRequest>({
    formatId: INITIAL_FORMAT,
    scale: 3,
    revision: 0,
    ...INITIAL_DATA,
  })

  function handleFormatChange(nextFormatId: BarcodeFormatId) {
    setFormatId(nextFormatId)
    setInput(getBarcodeFormat(nextFormatId).example)
    setError('')
  }

  function handleGenerate() {
    try {
      const prepared = prepareBarcodeData(formatId, input)
      setRequest((current) => ({
        formatId,
        scale,
        revision: current.revision + 1,
        ...prepared,
      }))
      setError('')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : '输入数据无效')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <BarcodeControls
        formatId={formatId}
        input={input}
        scale={scale}
        error={error}
        onFormatChange={handleFormatChange}
        onInputChange={setInput}
        onScaleChange={setScale}
        onGenerate={handleGenerate}
      />
      <BarcodePreview request={request} inputError={error} />
    </div>
  )
}
