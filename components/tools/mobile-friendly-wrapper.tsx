// 名称: 移动端优化的工具布局
// 描述: 提供移动端友好的触摸区域和间距
// 路径: Globokit/components/tools/mobile-friendly-wrapper.tsx
// 作者: everettlabs
// 更新时间: 2026-07-30

'use client'

import { cn } from '@/lib/utils'

export interface MobileFriendlyWrapperProps {
  children: React.ReactNode
  className?: string
}

/**
 * 移动端优化包装器
 *
 * 特性:
 * - 触摸区域至少 44x44px (WCAG 标准)
 * - 按钮间距增加防误触
 * - 横屏自适应
 * - 优化滚动性能
 */
export function MobileFriendlyWrapper({ children, className }: MobileFriendlyWrapperProps) {
  return (
    <div
      className={cn(
        'mobile-optimized',
        // 基础间距
        'space-y-6',
        // 移动端优化
        'touch-manipulation', // 禁用双击缩放
        // 按钮组优化
        '[&_button]:min-h-[44px]', // 最小触摸区域
        '[&_.button-group]:gap-3', // 按钮间距
        '[&_.button-group]:flex-wrap', // 自动换行
        // 输入框优化
        '[&_input]:min-h-[44px]',
        '[&_textarea]:min-h-[88px]',
        // 选择框优化
        '[&_select]:min-h-[44px]',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * 移动端按钮组
 */
export function MobileButtonGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('button-group flex flex-wrap gap-3', className)}>
      {children}
    </div>
  )
}
