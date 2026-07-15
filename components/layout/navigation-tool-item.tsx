// 名称: 导航工具卡片
// 描述: 复用桌面与移动导航中的工具入口样式
// 路径: Globokit/components/layout/navigation-tool-item.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { ToolMeta } from '@/lib/tools/registry'
import { getToolBadgeClassName } from '@/lib/tools/registry-ui'
import { cn } from '@/lib/utils'

interface NavigationToolItemProps {
  tool: ToolMeta
  active: boolean
  compact?: boolean
  onClick: () => void
}

export function NavigationToolItem({ tool, active, compact = false, onClick }: NavigationToolItemProps) {
  return (
    <Link
      href={tool.href}
      onClick={onClick}
      className={cn(
        'group block rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-md hover:shadow-emerald-900/5 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10',
        active
          ? 'border-emerald-300 bg-emerald-50/80 dark:border-cyan-300/50 dark:bg-cyan-300/10'
          : 'border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/[0.03]',
        compact && 'p-3'
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
          {tool.shortTitle}
        </span>
        {tool.badge && (
          <Badge variant="outline" className={cn('shrink-0 border-0 px-2 py-0 text-[10px]', getToolBadgeClassName(tool.badge))}>
            {tool.badge}
          </Badge>
        )}
      </div>
      <p className={cn('line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400', compact && 'line-clamp-1')}>
        {tool.description}
      </p>
    </Link>
  )
}
