// 名称: 节假日年历标签页
// 描述: 按月份展示选定国家的年度节假日分布
// 路径: Globokit/app/tools/holiday-query/holiday-calendar-tab.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Calendar } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { filterHolidaysByMonth, type Country, type Holiday } from '@/lib/tools/holiday-query'

export function HolidayCalendarTab({ country, year, holidays, onMonth }: { country?: Country; year: string; holidays: Holiday[]; onMonth: (month: string) => void }) {
  return <div className="space-y-4"><Alert><Calendar className="h-4 w-4" /><AlertDescription>{country?.name || '国家'} {year}年节假日分布图，点击月份查看详情</AlertDescription></Alert><div className="grid grid-cols-3 md:grid-cols-4 gap-4">{Array.from({ length: 12 }, (_, index) => { const monthHolidays = filterHolidaysByMonth(holidays, index + 1); const highImpact = monthHolidays.some((holiday) => holiday.impact === 'high'); return <Card key={index} className={`cursor-pointer transition-all hover:shadow-lg ${monthHolidays.length > 0 ? 'border-primary' : ''} ${highImpact ? 'border-red-500' : ''}`} onClick={() => onMonth((index + 1).toString())}><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center justify-between">{index + 1}月{monthHolidays.length > 0 && <Badge variant={highImpact ? 'destructive' : 'outline'} className="text-xs">{monthHolidays.length}</Badge>}</CardTitle></CardHeader><CardContent>{monthHolidays.length > 0 ? <div className="space-y-1">{monthHolidays.slice(0, 3).map((holiday, holidayIndex) => <div key={holidayIndex} className="text-xs"><span className="font-medium">{new Date(holiday.date).getDate()}日</span><p className="text-muted-foreground truncate">{holiday.name}</p></div>)}{monthHolidays.length > 3 && <p className="text-xs text-muted-foreground">+{monthHolidays.length - 3} 更多...</p>}</div> : <p className="text-xs text-muted-foreground">无节假日</p>}</CardContent></Card> })}</div></div>
}
