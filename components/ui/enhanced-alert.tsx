// 名称: 增强型错误提示
// 描述: 更友好的错误信息展示和恢复建议
// 路径: Globokit/components/ui/enhanced-alert.tsx
// 作者: everettlabs
// 更新时间: 2026-07-30

'use client'

import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EnhancedAlertProps {
  type?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * 增强型提示框
 *
 * 功能:
 * - 清晰的视觉层次
 * - 可操作的错误恢复
 * - 图标辅助识别
 * - ARIA 可访问性
 */
export function EnhancedAlert({ type = 'info', title, message, action, className }: EnhancedAlertProps) {
  const config = {
    error: {
      icon: XCircle,
      variant: 'destructive' as const,
      iconColor: 'text-red-600 dark:text-red-400',
      defaultTitle: '错误',
    },
    warning: {
      icon: AlertCircle,
      variant: 'default' as const,
      iconColor: 'text-amber-600 dark:text-amber-400',
      defaultTitle: '警告',
    },
    info: {
      icon: Info,
      variant: 'default' as const,
      iconColor: 'text-blue-600 dark:text-blue-400',
      defaultTitle: '提示',
    },
    success: {
      icon: CheckCircle2,
      variant: 'default' as const,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      defaultTitle: '成功',
    },
  }

  const { icon: Icon, variant, iconColor, defaultTitle } = config[type]

  return (
    <Alert
      variant={variant}
      className={cn(
        'relative',
        type === 'warning' && 'border-amber-200 bg-amber-50 dark:border-amber-300/20 dark:bg-amber-300/10',
        type === 'info' && 'border-blue-200 bg-blue-50 dark:border-blue-300/20 dark:bg-blue-300/10',
        type === 'success' && 'border-emerald-200 bg-emerald-50 dark:border-emerald-300/20 dark:bg-emerald-300/10',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('h-4 w-4', iconColor)} />
      {title && <AlertTitle>{title || defaultTitle}</AlertTitle>}
      <AlertDescription className="flex items-start justify-between gap-4">
        <span className="flex-1">{message}</span>
        {action && (
          <Button size="sm" variant="outline" onClick={action.onClick} className="shrink-0">
            {action.label}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

/**
 * 错误边界提示
 */
export function ErrorBoundaryAlert({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <EnhancedAlert
      type="error"
      title="出错了"
      message={error.message || '页面加载失败，请重试'}
      action={{ label: '重新加载', onClick: reset }}
    />
  )
}
