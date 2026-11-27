// 名称: GA4 轻量交互事件封装
// 描述: 统一发送无个人数据的工具交互事件（复制、速搜跳转、置顶收藏），仅在生产站存在 gtag 时触发
// 路径: Globokit/lib/analytics.ts
// 作者: everettlabs
// 更新时间: 2026-11-27

type AnalyticsParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void
  }
}

export function extractToolSlugFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'tools' && segments[1]) return segments[1]
  return segments[0] ?? 'home'
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch {
    // 忽略统计脚本异常，不影响业务交互
  }
}
