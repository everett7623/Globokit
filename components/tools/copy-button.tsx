// 名称: 通用复制按钮组件
// 描述: 封装剪贴板复制逻辑与交互反馈的复用组件
// 路径: Globokit/components/tools/copy-button.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
}
