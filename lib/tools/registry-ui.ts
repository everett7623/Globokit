// 名称: 工具 UI 配置
// 描述: 为工具注册表条目提供 UI 样式映射（颜色、徽章颜色等）
// 路径: Globokit/lib/tools/registry-ui.ts
// 作者: Jensfrank
// 更新时间: 2026-07-01

/**
 * UI styling configuration for tools on the homepage.
 * Maps tool IDs to their color scheme.
 */
export const TOOL_UI_CONFIG: Record<
  string,
  {
    color: string
    bgColor: string
  }
> = {
  'rmb-converter': {
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  'text-case': {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  'special-char': {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  'number-to-english': {
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  'pinyin': {
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  'holiday-query': {
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  'world-time': {
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  'currency-symbols': {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  'global-country-info': {
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  'quote-calculator': {
    color: 'text-sky-500',
    bgColor: 'bg-sky-50',
  },
  'export-tax-rebate-calculator': {
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  'import-landed-cost-calculator': {
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  'container-load-calculator': {
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
  },
  'pallet-load-calculator': {
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
  },
  'air-freight-calculator': {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  'ocean-freight-calculator': {
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  'customs-cost-calculator': {
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  'express-channel-comparison': {
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  'vps-calculator': {
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
  },
  'incoterms': {
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  'json-formatter': {
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
}

export const TOOL_BADGE_STYLES: Record<string, string> = {
  '热门': 'bg-amber-100 text-amber-700 ring-1 ring-amber-200/80 dark:bg-amber-300/15 dark:text-amber-200 dark:ring-amber-300/20',
  '新增': 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/80 dark:bg-cyan-300/15 dark:text-cyan-200 dark:ring-cyan-300/20',
}

export function getToolBadgeClassName(badge?: string) {
  if (!badge) return ''
  return TOOL_BADGE_STYLES[badge] ?? 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/80'
}

/**
 * Map lucide icon names to their imports.
 * This allows dynamic icon rendering based on registry iconName field.
 */
export const LUCIDE_ICON_MAP: Record<string, any> = {}

/**
 * For client-side rendering, pass the actual icon components map.
 * This function should be called in client components that need icon mapping.
 */
export function setupIconMap(icons: Record<string, any>) {
  Object.assign(LUCIDE_ICON_MAP, icons)
}
