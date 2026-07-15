// 名称: 国际贸易术语速查
// 描述: 查询 Incoterms 2020 术语定义、风险转移点与费用责任边界
// 路径: Globokit/app/tools/incoterms/page.tsx
// 作者: everettlabs
// 更新时间: 2026-06-30

import IncotermsTool from './incoterms-tool'

export default function IncotermsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">国际贸易术语速查</h1>
        <p className="text-muted-foreground">
          基于 Incoterms 2020，快速查询 EXW/FOB/CIF/DDP 等条款的风险转移点与买卖双方费用责任。
        </p>
      </div>

      <IncotermsTool />
    </>
  )
}
