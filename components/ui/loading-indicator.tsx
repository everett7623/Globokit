// 名称: 加载指示器组件
// 描述: 统一的加载状态和骨架屏
// 路径: Globokit/components/ui/loading-indicator.tsx
// 作者: everettlabs
// 更新时间: 2026-07-30

'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

/**
 * 加载指示器
 */
export function LoadingIndicator({ size = 'md', text, className }: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-muted-foreground', sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}

/**
 * 骨架屏加载器
 */
export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse space-y-4', className)}>
      <div className="h-4 w-3/4 rounded bg-muted"></div>
      <div className="h-4 w-1/2 rounded bg-muted"></div>
      <div className="h-4 w-5/6 rounded bg-muted"></div>
    </div>
  )
}

/**
 * 卡片骨架屏
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <SkeletonLoader />
    </div>
  )
}

/**
 * 内联加载指示器（用于按钮内）
 */
export function InlineLoader({ className }: { className?: string }) {
  return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />
}
