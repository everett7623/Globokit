// 名称: 工具页专用布局
// 描述: 为工具类页面提供统一的布局结构，包含顶部面包屑导航与底部相关工具推荐
// 路径: Globokit/app/tools/layout.tsx
// 作者: everettlabs
// 更新时间: 2026-11-25

import { RelatedTools } from '@/components/tools/related-tools'
import { ToolBreadcrumb } from '@/components/tools/tool-breadcrumb'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <ToolBreadcrumb />
      {children}
      <RelatedTools />
    </section>
  )
}
