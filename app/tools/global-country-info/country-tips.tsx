// 名称: 国家信息使用提示
// 描述: 展示表格与详情功能说明
// 路径: Globokit/app/tools/global-country-info/country-tips.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Eye, Info, Map, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CountryTips() {
  return <Card className="mt-6 bg-muted/30"><CardHeader><CardTitle className="text-base flex items-center gap-2"><Info className="h-4 w-4" />使用提示</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>• 点击<Eye className="h-4 w-4 inline mx-1" />查看按钮可查看国家的详细信息，包括商务礼仪、贸易注意事项等</p><p>• 带有<TrendingUp className="h-4 w-4 inline mx-1" />标记的是全球贸易额前20的主要贸易伙伴国</p><p>• 跨洲国家（如俄罗斯、土耳其等）会显示<Map className="h-4 w-4 inline mx-1" />跨洲标记</p><p>• 点击表头可对国家名称、大洲和时差进行排序</p><p>• 收藏的国家会优先显示在列表顶部，并有黄色背景标识</p><p>• 支持导出当前筛选结果为CSV文件，包含所有详细信息</p><p>• 时差显示为相对于您当前设备时区的小时差</p></CardContent></Card>
}
