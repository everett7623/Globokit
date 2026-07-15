// 名称: 工具页专用布局
// 描述: 为工具类页面提供统一的布局结构（预留面包屑或侧边栏位置）
// 路径: Globokit/app/tools/layout.tsx
// 作者: everettlabs
// 更新时间: 2026-01-08

import { RelatedTools } from '@/components/tools/related-tools'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-[1440px]">
      {children}
      <RelatedTools />
    </section>
  )
}
