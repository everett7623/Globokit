// 名称: 图片压缩计算逻辑
// 描述: 目标尺寸计算、输出文件命名与大小格式化，配合页面 canvas 压缩使用
// 路径: Globokit/lib/tools/image-compressor.ts
// 作者: everettlabs
// 更新时间: 2026-10-12

export interface TargetDimensions {
  width: number
  height: number
  scaled: boolean
}

export const SUPPORTED_INPUT_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const OUTPUT_TYPES = [
  { value: 'image/jpeg', label: 'JPEG（体积最小，通用）' },
  { value: 'image/webp', label: 'WebP（更小，现代浏览器）' },
  { value: 'image/png', label: 'PNG（无损，含透明）' },
] as const

export type OutputType = (typeof OUTPUT_TYPES)[number]['value']

/** 按最大边长等比缩放：宽高均不超过 maxSide 时返回原尺寸。 */
export function calculateTargetDimensions(width: number, height: number, maxSide: number): TargetDimensions {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('图片尺寸无效')
  }
  if (!Number.isFinite(maxSide) || maxSide <= 0) {
    throw new Error('最大边长必须大于 0')
  }
  const longest = Math.max(width, height)
  if (longest <= maxSide) return { width: Math.round(width), height: Math.round(height), scaled: false }
  const scale = maxSide / longest
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    scaled: true,
  }
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '--'
  if (bytes < 1024) return `${Math.round(bytes)} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function savingsPercent(originalBytes: number, compressedBytes: number): number {
  if (!Number.isFinite(originalBytes) || originalBytes <= 0) return 0
  if (!Number.isFinite(compressedBytes) || compressedBytes < 0) return 0
  return Math.max(0, Math.round((1 - compressedBytes / originalBytes) * 100))
}

/** 生成输出文件名：report.jpg → report-compressed.jpg */
export function buildOutputFileName(originalName: string, outputType: OutputType): string {
  const extension = outputType === 'image/jpeg' ? 'jpg' : outputType === 'image/webp' ? 'webp' : 'png'
  const base = originalName.replace(/\.[^.]+$/, '').trim() || 'image'
  return `${base}-compressed.${extension}`
}

/** 透明 PNG 转 JPEG 会得到黑底，页面据此强制铺白底或提示改用 WebP。 */
export function needsWhiteBackdrop(inputType: string, outputType: OutputType): boolean {
  return inputType === 'image/png' && outputType === 'image/jpeg'
}
