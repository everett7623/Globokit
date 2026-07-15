// 名称: 宗教节日标签页
// 描述: 按宗教分组展示 2025 年参考节日
// 路径: Globokit/app/tools/holiday-query/holiday-religious-tab.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { AlertCircle, Globe, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getImpactLevelName, religiousHolidays2025, type Holiday } from '@/lib/tools/holiday-query'

const GROUPS = [
  { title: '伊斯兰教节日', match: '伊斯兰教', note: '影响中东、东南亚、南亚、北非', color: 'text-emerald-600' },
  { title: '基督教节日', match: '基督教', note: '影响欧美、拉美、非洲', color: 'text-blue-600' },
  { title: '印度教节日', match: '印度教', note: '影响印度、尼泊尔、斯里兰卡', color: 'text-orange-600' },
]

export function ReligiousHolidayTab() {
  const other = religiousHolidays2025.filter((holiday) => !GROUPS.some((group) => holiday.description?.includes(group.match)))
  return <div className="space-y-4"><Alert><Info className="h-4 w-4" /><AlertDescription>主要宗教节日对相关国家和地区的商业活动有重要影响。以下日期为2025年参考数据。注意：伊斯兰历和部分宗教历法日期可能有1-2天偏差。</AlertDescription></Alert><div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">{GROUPS.map((group) => <ReligionGroup key={group.match} title={group.title} note={group.note} color={group.color} holidays={religiousHolidays2025.filter((holiday) => holiday.description?.includes(group.match))} />)}<ReligionGroup title="其他宗教节日" holidays={other} /></div></div>
}

function ReligionGroup({ title, holidays, note, color }: { title: string; holidays: Holiday[]; note?: string; color?: string }) {
  return <div><h3 className="font-semibold mb-3 flex items-center gap-2">{note && <Globe className={`h-4 w-4 ${color}`} />}{title}{note && <Badge variant="outline">{note}</Badge>}</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{holidays.map((holiday, index) => <Card key={index}><CardContent className="pt-4"><div className="space-y-2"><div className="flex items-center justify-between"><h4 className="font-semibold">{holiday.name}</h4><Badge variant={holiday.impact === 'high' ? 'destructive' : 'default'}>{getImpactLevelName(holiday.impact)}影响</Badge></div><p className="text-sm text-muted-foreground">{holiday.nameCN || holiday.localName} • {new Date(holiday.date).toLocaleDateString('zh-CN')}</p><p className="text-xs">{holiday.description}</p>{holiday.name.includes('Ramadan') && <Alert className="mt-2"><AlertCircle className="h-3 w-3" /><AlertDescription className="text-xs">斋月期间，穆斯林国家工作时间缩短，商务活动减少</AlertDescription></Alert>}</div></CardContent></Card>)}</div></div>
}
