// 名称: 国际条码与图片压缩工具注册信息
// 描述: 独立维护文件与格式转换分类的部分工具元数据，避免继续扩大主注册表文件
// 路径: Globokit/lib/tools/registry-barcode.ts
// 作者: everettlabs
// 更新时间: 2026-10-12

import type { ToolMeta } from './registry-types'

export const barcodeGeneratorTool: ToolMeta = {
  id: 'barcode-generator',
  slug: 'barcode-generator',
  title: '国际条码生成器',
  shortTitle: '国际条码生成器',
  description: '按 GS1 26.0 规范生成 GS1 DataMatrix、GS1-128 及常用一维和二维条码',
  category: '文件与格式转换',
  iconName: 'ScanBarcode',
  href: '/tools/barcode-generator',
  updatedAt: '2026-07-15',
  badge: '新增',
  keywords: ['barcode', '条码', 'GS1', 'DataMatrix', 'QR Code', 'EAN', 'UPC', 'ITF-14', 'ISBN'],
  seoTitle: '国际条码生成器 - GS1 DataMatrix/EAN/UPC 在线生成 | Globokit',
  seoDescription: '免费在线生成符合 GS1 26.0 数据规则的 GS1 DataMatrix、GS1-128，以及 QR Code、EAN-13、UPC-A、ITF-14 等常用条码',
  useCases: ['外贸产品标签制作', '物流外箱条码生成', 'GS1 数据与校验位核对'],
  relatedTools: ['json-formatter', 'special-char', 'global-country-info'],
}

export const imageCompressorTool: ToolMeta = {
  id: 'image-compressor',
  slug: 'image-compressor',
  title: '产品图片压缩工具',
  shortTitle: '图片压缩',
  description: '浏览器本地批量压缩产品图片，支持质量、最大边长与 JPEG/WebP/PNG 输出',
  category: '文件与格式转换',
  iconName: 'ImageDown',
  href: '/tools/image-compressor',
  updatedAt: '2026-10-12',
  badge: '新增',
  keywords: ['image compressor', '图片压缩', '产品图', '批量压缩', 'WebP', 'JPEG', '发客户图片'],
  seoTitle: '产品图片压缩工具 - 批量本地压缩不发服务器 | Globokit',
  seoDescription: '免费在线图片压缩工具，批量压缩产品图片支持质量、尺寸与 JPEG/WebP/PNG 输出，全部在浏览器本地处理不上传，适合发客户邮件与平台上传前的体积优化',
  useCases: ['开发信附件体积优化', 'B2B 平台上传前压缩', '产品图批量转 WebP'],
  relatedTools: ['barcode-generator', 'packing-list-generator', 'invoice-generator', 'email-signature-generator'],
}
