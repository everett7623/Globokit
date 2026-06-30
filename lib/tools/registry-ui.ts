// 名称: 工具 UI 配置
// 描述: 为工具注册表条目提供 UI 样式映射（颜色、徽章颜色等）
// 路径: Globokit/lib/tools/registry-ui.ts
// 作者: Jensfrank
// 更新时间: 2026-07-01

/**
 * UI styling configuration for tools on the homepage.
 * Maps tool IDs to their color scheme and badge styling.
 */
export const TOOL_UI_CONFIG: Record<
  string,
  {
    color: string
    bgColor: string
    badgeColor?: string
  }
> = {
  'rmb-converter': {
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    badgeColor: 'bg-orange-100 text-orange-700',
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
    badgeColor: 'bg-green-100 text-green-700',
  },
  'world-time': {
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    badgeColor: 'bg-green-100 text-green-700',
  },
  'currency-symbols': {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    badgeColor: 'bg-green-100 text-green-700',
  },
  'global-country-info': {
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    badgeColor: 'bg-green-100 text-green-700',
  },
  'vps-calculator': {
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
  'incoterms': {
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    badgeColor: 'bg-teal-100 text-teal-700',
  },
  'json-formatter': {
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
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
