// 名称: 节假日工具说明
// 描述: 展示统计、外贸影响提示和使用说明
// 路径: Globokit/app/tools/holiday-query/holiday-info.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { AlertCircle, Calendar, Clock, DollarSign, Globe, Info, Mail, Plane, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HolidayStats({ totalCountries, totalHolidays, upcomingCount, detailedCountries, year }: { totalCountries: number; totalHolidays: number; upcomingCount: number; detailedCountries: number; year: string }) {
  const stats = [
    { label: '覆盖国家', value: `${totalCountries}+`, note: '个国家/地区目录', icon: Globe, tone: '' },
    { label: '年度节假日', value: totalHolidays, note: `${year}年总计`, icon: Calendar, tone: '' },
    { label: '即将到来', value: upcomingCount, note: '7天内节假日', icon: Clock, tone: 'text-orange-600' },
    { label: '详细数据', value: detailedCountries, note: '国有年度明细', icon: TrendingUp, tone: '' },
  ]
  return <div className="grid gap-4 mb-6 md:grid-cols-4">{stats.map((item) => { const Icon = item.icon; return <Card key={item.label}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle></CardHeader><CardContent><div className={`text-2xl font-bold ${item.tone}`}>{item.value}</div><p className="text-xs text-muted-foreground">{item.note}</p></CardContent></Card> })}</div>
}

const IMPACT_CARDS = [
  { title: '邮件回复', icon: Mail, items: ['节前1-2天回复变慢', '长假期间基本无回复', '节后2-3天逐步恢复'] },
  { title: '物流影响', icon: Plane, items: ['海运：节前爆仓涨价', '空运：假期停飞减班', '清关：延迟3-7天'] },
  { title: '付款提醒', icon: DollarSign, items: ['银行假期暂停转账', '节前催收账款', '预留充足时间'] },
  { title: '重要提醒', icon: AlertCircle, items: ['圣诞节：欧美停工2周', '斋月：中东效率降低', '春节：东亚停工2周'] },
]

export function HolidayInfo() {
  return <><div className="grid gap-4 mt-6 md:grid-cols-4">{IMPACT_CARDS.map((card) => { const Icon = card.icon; return <Card key={card.title} className="bg-muted/50"><CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Icon className="h-4 w-4" />{card.title}</CardTitle></CardHeader><CardContent className="space-y-1 text-sm text-muted-foreground">{card.items.map((item) => <p key={item}>• {item}</p>)}</CardContent></Card> })}</div><Card className="mt-4 bg-muted/50"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />使用说明</CardTitle></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h4 className="font-medium mb-2">功能特点</h4><ul className="space-y-1 text-sm text-muted-foreground"><li>• 覆盖全球100+主要贸易国家和地区</li><li>• 包含公共假期、银行假期、宗教节日</li><li>• 提供节假日对商业活动的影响评级</li><li>• 支持按地区、国家、月份筛选查看</li><li>• 实时提醒即将到来的重要节假日</li><li>• 年历视图直观展示节假日分布</li></ul></div><div><h4 className="font-medium mb-2">影响等级说明</h4><div className="space-y-2 text-sm"><Impact level="高影响" variant="destructive" text="大部分企业停工，银行关闭" /><Impact level="中影响" variant="default" text="部分企业放假，效率降低" /><Impact level="低影响" variant="secondary" text="正常工作，个别行业受影响" /></div></div></div></CardContent></Card></>
}

function Impact({ level, variant, text }: { level: string; variant: 'destructive' | 'default' | 'secondary'; text: string }) { return <div className="flex items-center gap-2"><Badge variant={variant}>{level}</Badge><span className="text-muted-foreground">{text}</span></div> }
