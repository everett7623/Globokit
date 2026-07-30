// 名称: 增强型复制按钮
// 描述: 带有视觉反馈和状态管理的复制按钮
// 路径: Globokit/components/tools/enhanced-copy-button.tsx
// 作者: everettlabs
// 更新时间: 2026-07-30

'use client'

import { useState } from 'react'
import { Check, ClipboardCopy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EnhancedCopyButtonProps {
  text: string
  onCopy?: () => void
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
}

/**
 * 增强型复制按钮
 *
 * 功能:
 * - 自动复制到剪贴板
 * - 视觉状态反馈（复制成功）
 * - 可自定义复制内容
 * - 错误处理
 */
export function EnhancedCopyButton({
  text,
  onCopy,
  children,
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
}: EnhancedCopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(false)
      onCopy?.()

      // 1.8秒后重置状态
      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch (err) {
      console.error('复制失败:', err)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      disabled={disabled || !text}
      className={cn(
        'transition-all',
        copied && 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500',
        error && 'bg-red-600 hover:bg-red-700',
        className
      )}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          已复制
        </>
      ) : error ? (
        <>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          复制失败
        </>
      ) : (
        <>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          {children || '复制结果'}
        </>
      )}
    </Button>
  )
}
