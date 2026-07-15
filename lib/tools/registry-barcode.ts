// 名称: 国际条码生成器注册信息
// 描述: 独立维护条码工具元数据，避免继续扩大主注册表文件
// 路径: Globokit/lib/tools/registry-barcode.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

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
