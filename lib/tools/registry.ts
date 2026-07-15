// 名称: 工具注册表
// 描述: 聚合工具元数据，作为导航、首页、SEO 和结构化数据的单一入口
// 路径: Globokit/lib/tools/registry.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { barcodeGeneratorTool } from './registry-barcode'
import { FINANCE_TOOLS } from './registry-finance'
import { GENERAL_TOOLS } from './registry-general'
import { LOGISTICS_TOOLS } from './registry-logistics'
import { TOOL_CATEGORIES, type ToolCategory, type ToolMeta } from './registry-types'

export type { ToolCategory, ToolMeta } from './registry-types'

export const TOOL_REGISTRY: ToolMeta[] = [
  ...FINANCE_TOOLS,
  ...LOGISTICS_TOOLS,
  ...GENERAL_TOOLS,
  barcodeGeneratorTool,
]

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOL_REGISTRY.find((tool) => tool.slug === slug)
}

export function getToolsByCategory(): Record<ToolCategory, ToolMeta[]> {
  const categories = Object.fromEntries(
    TOOL_CATEGORIES.map((category) => [category, [] as ToolMeta[]])
  ) as Record<ToolCategory, ToolMeta[]>

  for (const tool of TOOL_REGISTRY) {
    categories[tool.category].push(tool)
  }

  return categories
}

export function getActiveCategories(): ToolCategory[] {
  const grouped = getToolsByCategory()
  return TOOL_CATEGORIES.filter((category) => grouped[category].length > 0)
}
