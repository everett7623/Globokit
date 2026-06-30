// 名称: JSON 格式化与转换
// 描述: 验证、格式化、压缩 JSON 及转换为 CSV 等格式
// 路径: Globokit/app/tools/json-formatter/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-07-01

import JSONFormatterTool from './json-formatter-tool'

export default function JSONFormatterPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">JSON 格式化与转换</h1>
        <p className="text-muted-foreground">
          快速验证、格式化、压缩 JSON 数据，支持与 CSV 互相转换，便于数据导入导出。
        </p>
      </div>

      <JSONFormatterTool />
    </>
  )
}
