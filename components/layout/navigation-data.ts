// 名称: 导航展示数据
// 描述: 维护导航分类、精选工具、新工具与外部入口映射
// 路径: Globokit/components/layout/navigation-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import type { ComponentType } from 'react'
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  Compass,
  FileCode2,
  Globe2,
  MessageSquareText,
  PackageCheck,
  Ship,
} from 'lucide-react'
import { TOOL_REGISTRY, type ToolCategory, type ToolMeta, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'

export const NAV_TOOLS_BY_CATEGORY = getToolsByCategory()
export const NAV_ACTIVE_CATEGORIES = getActiveCategories()

export const NAV_CATEGORY_META: Record<ToolCategory, { icon: ComponentType<{ className?: string }>; tone: string }> = {
  '财务报价': { icon: CircleDollarSign, tone: 'text-emerald-600 dark:text-emerald-300' },
  '文本处理': { icon: MessageSquareText, tone: 'text-sky-600 dark:text-sky-300' },
  '时间与节假日': { icon: CalendarDays, tone: 'text-amber-600 dark:text-amber-300' },
  '国家与货币': { icon: Globe2, tone: 'text-cyan-600 dark:text-cyan-300' },
  '物流与装柜': { icon: Ship, tone: 'text-lime-600 dark:text-lime-300' },
  'VPS/站长工具': { icon: BriefcaseBusiness, tone: 'text-violet-600 dark:text-violet-300' },
  '外贸沟通': { icon: PackageCheck, tone: 'text-teal-600 dark:text-teal-300' },
  '文件与格式转换': { icon: FileCode2, tone: 'text-orange-600 dark:text-orange-300' },
}

const featuredToolIds = [
  'quote-calculator',
  'express-channel-comparison',
  'container-load-calculator',
  'delivery-date-calculator',
  'global-country-info',
]

export const NAV_FEATURED_TOOLS = featuredToolIds
  .map((id) => TOOL_REGISTRY.find((tool) => tool.id === id))
  .filter((tool): tool is ToolMeta => Boolean(tool))

export const NAV_NEW_TOOLS = TOOL_REGISTRY.filter((tool) => tool.badge === '新增').slice(0, 5)

export const NAV_EXTERNAL_LINKS = [
  { href: 'https://seedloc.com', label: '博客', icon: BookOpen },
  { href: 'https://nav.seedloc.com', label: '导航站', icon: Compass },
]
