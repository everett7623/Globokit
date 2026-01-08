// 名称: 工具页专用布局
// 描述: 为工具类页面提供统一的布局结构（预留面包屑或侧边栏位置）
// 路径: Globokit/app/tools/layout.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 如果工具页面需要特殊的布局或样式，可以在这里添加 */}
      {/* 例如：面包屑导航、侧边栏等 */}
      {children}
    </>
  )
}
