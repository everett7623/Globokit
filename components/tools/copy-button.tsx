// 名称: 通用复制按钮组件
// 描述: 封装剪贴板复制逻辑与交互反馈的复用组件
// 路径: Globokit/components/tools/copy-button.tsx
// 作者: everettlabs
// 更新时间: 2026-01-08

import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  return <EnhancedCopyButton text={text} variant="outline" size="icon" iconOnly title="复制" className={className} />
}
