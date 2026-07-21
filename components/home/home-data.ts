// 名称: 首页展示数据
// 描述: 聚合首页工具图标、业务流程、统计与精选资源映射
// 路径: Globokit/components/home/home-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import type { ComponentType } from 'react'
import {
  AlertCircle,
  Bot,
  Calendar,
  CalendarClock,
  Calculator,
  CircleDollarSign,
  Clock,
  Code,
  Code2,
  Container,
  CreditCard,
  Database,
  FileCheck2,
  FileSearch,
  Fingerprint,
  GitCompareArrows,
  Globe,
  HandCoins,
  Hash,
  Languages,
  MailCheck,
  MessageSquare,
  Network,
  Plane,
  ReceiptText,
  Ruler,
  ScanBarcode,
  Server,
  ShieldCheck,
  Ship,
  TrendingUp,
  Type,
  Zap,
} from 'lucide-react'
import { PARTNER_RESOURCES, type PartnerResourceType } from '@/lib/partner-resources'
import { TOOL_REGISTRY, type ToolCategory, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'
import { TOOL_UI_CONFIG, getToolBadgeClassName } from '@/lib/tools/registry-ui'

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Calculator,
  Type,
  AlertCircle,
  Hash,
  Languages,
  Calendar,
  CalendarClock,
  Clock,
  CircleDollarSign,
  Globe,
  Server,
  FileSearch,
  Code2,
  ReceiptText,
  Container,
  Plane,
  Ship,
  FileCheck2,
  GitCompareArrows,
  HandCoins,
  ScanBarcode,
  Ruler,
}

export const HOME_TOOLS = TOOL_REGISTRY.map((tool) => {
  const uiConfig = TOOL_UI_CONFIG[tool.id] || {
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
  }

  return {
    ...tool,
    icon: ICON_MAP[tool.iconName] || Code,
    badgeClassName: getToolBadgeClassName(tool.badge),
    ...uiConfig,
  }
})

export const HOME_TOOLS_BY_CATEGORY = getToolsByCategory()
export const HOME_ACTIVE_CATEGORIES = getActiveCategories()

const heroToolIds = [
  'quote-calculator',
  'import-landed-cost-calculator',
  'container-load-calculator',
  'air-freight-calculator',
  'global-country-info',
]

export const HERO_TOOLS = heroToolIds
  .map((id) => HOME_TOOLS.find((tool) => tool.id === id))
  .filter((tool): tool is (typeof HOME_TOOLS)[number] => Boolean(tool))

export const HOME_STATS = [
  { label: '工具总数', value: `${HOME_TOOLS.length}`, icon: Zap },
  { label: '业务场景', value: `${HOME_ACTIVE_CATEGORIES.length}`, icon: ShieldCheck },
  { label: '全球资料', value: '200+', icon: Globe },
  { label: '持续优化', value: 'Live', icon: TrendingUp },
]

export const WORKFLOW_GROUPS: Array<{
  title: string
  caption: string
  category: ToolCategory
  icon: ComponentType<{ className?: string }>
  accent: string
}> = [
  { title: '报价与利润', caption: '报价、金额、货币符号', category: '财务报价', icon: CircleDollarSign, accent: 'from-emerald-500 to-cyan-500' },
  { title: '出货与条款', caption: '装柜、贸易术语、交付边界', category: '物流与装柜', icon: Ship, accent: 'from-lime-500 to-emerald-500' },
  { title: '全球市场资料', caption: '国家、时区、节假日', category: '国家与货币', icon: Globe, accent: 'from-cyan-500 to-sky-500' },
  { title: '文本与单据', caption: '邮件、名称、数据格式', category: '文本处理', icon: Type, accent: 'from-amber-500 to-orange-500' },
]

export const PARTNER_TYPE_META: Record<PartnerResourceType, { icon: ComponentType<{ className?: string }>; tone: string }> = {
  '客户开发': { icon: MailCheck, tone: 'text-emerald-600 dark:text-emerald-300' },
  '代理网络': { icon: Network, tone: 'text-cyan-600 dark:text-cyan-300' },
  '浏览器环境': { icon: Fingerprint, tone: 'text-violet-600 dark:text-violet-300' },
  '企业数据': { icon: Database, tone: 'text-amber-600 dark:text-amber-300' },
  '主机与建站': { icon: Server, tone: 'text-indigo-600 dark:text-indigo-300' },
  '域名服务': { icon: Globe, tone: 'text-blue-600 dark:text-blue-300' },
  '账号与支付': { icon: CreditCard, tone: 'text-sky-600 dark:text-sky-300' },
  'AI 工具': { icon: Bot, tone: 'text-fuchsia-600 dark:text-fuchsia-300' },
  '验证服务': { icon: MessageSquare, tone: 'text-orange-600 dark:text-orange-300' },
}

const featuredPartnerResourceIds = [
  'laifaxin',
  'talordata',
  'usappid',
  'xiaohuojian',
  'gpt-mj',
  'bitgetwallet',
  'dmit',
  'namesilo',
]

export const FEATURED_PARTNER_RESOURCES = featuredPartnerResourceIds
  .map((id) => PARTNER_RESOURCES.find((resource) => resource.id === id))
  .filter((resource): resource is (typeof PARTNER_RESOURCES)[number] => Boolean(resource))
