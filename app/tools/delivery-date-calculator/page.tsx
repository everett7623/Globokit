// 名称: 外贸交期计算器页面
// 描述: 以 Asia/Shanghai 业务日期初始化交期计算器
// 路径: Globokit/app/tools/delivery-date-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-21

import { DeliveryDateTool } from './delivery-date-tool'
import { getDateKeyInTimeZone } from '@/lib/tools/delivery-date-calculator'

export default function DeliveryDateCalculatorPage() {
  return <DeliveryDateTool defaultStartDate={getDateKeyInTimeZone(new Date())} />
}
