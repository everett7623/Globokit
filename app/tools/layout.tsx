// 路径: seedtool/app/tools/layout.tsx
// 更新时间: 2025-07-22
// 说明: 工具页面专用布局（如果需要特殊样式）

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
