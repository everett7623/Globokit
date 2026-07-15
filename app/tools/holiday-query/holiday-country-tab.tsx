// 名称: 节假日国家查询
// 描述: 展示查询条件、国家信息、年度提示和节假日列表
// 路径: Globokit/app/tools/holiday-query/holiday-country-tab.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { AlertCircle, Calendar, Info, MapPin, TrendingUp } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getHolidayTypeName, getImpactLevelName, impactDescriptions, SUPPORTED_HOLIDAY_YEARS, type Country, type Holiday } from '@/lib/tools/holiday-query'

const HOT_COUNTRIES = ['US', 'GB', 'DE', 'JP', 'FR', 'IN', 'AU', 'CA', 'KR', 'BR', 'AE', 'SG']

interface HolidayCountryTabProps {
  selectedCountry: string
  selectedYear: string
  selectedMonth: string
  selectedRegion: string
  selectedYearNumber: number
  countryInfo?: Country
  countries: Record<string, Country>
  filteredCountries: Array<[string, Country]>
  filteredHolidays: Holiday[]
  regionNames: string[]
  onCountry: (value: string) => void
  onYear: (value: string) => void
  onMonth: (value: string) => void
  onRegion: (value: string) => void
}

export function HolidayCountryTab(props: HolidayCountryTabProps) {
  return <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SelectField id="region" label="地区筛选" value={props.selectedRegion} onChange={props.onRegion}><SelectItem value="all">全部地区</SelectItem>{props.regionNames.map((region) => <SelectItem key={region} value={region}>{region}</SelectItem>)}</SelectField>
      <div><Label htmlFor="country">选择国家/地区</Label><Select value={props.selectedCountry} onValueChange={props.onCountry}><SelectTrigger id="country"><SelectValue /></SelectTrigger><SelectContent className="max-h-[300px]"><SelectItem value="divider-hot" disabled><span className="flex items-center gap-2 font-semibold text-orange-600"><TrendingUp className="h-3.5 w-3.5" />热门国家</span></SelectItem>{HOT_COUNTRIES.map((code) => { const country = props.countries[code]; return country ? <SelectItem key={code} value={code}><span className="flex items-center gap-2"><span>{country.flag}</span><span>{country.name}</span><Badge variant="outline" className="text-xs ml-auto">热门</Badge></span></SelectItem> : null })}<SelectItem value="divider-all" disabled><span className="font-semibold">所有国家/地区</span></SelectItem>{props.filteredCountries.map(([code, country]) => <SelectItem key={code} value={code}><span className="flex items-center gap-2"><span>{country.flag}</span><span>{country.name}</span><span className="text-xs text-muted-foreground ml-auto">{country.region}</span></span></SelectItem>)}</SelectContent></Select></div>
      <SelectField id="year" label="年份" value={props.selectedYear} onChange={props.onYear}>{SUPPORTED_HOLIDAY_YEARS.map((year) => <SelectItem key={year} value={year.toString()}>{year}年{year >= 2026 ? '（预测）' : ''}</SelectItem>)}</SelectField>
      <SelectField id="month" label="月份筛选" value={props.selectedMonth} onChange={props.onMonth}><SelectItem value="all">全年</SelectItem>{Array.from({ length: 12 }, (_, index) => <SelectItem key={index + 1} value={(index + 1).toString()}>{index + 1}月</SelectItem>)}</SelectField>
    </div>
    {props.countryInfo && <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-3xl">{props.countryInfo.flag}</span><div><h3 className="font-semibold text-lg">{props.countryInfo.name}</h3><p className="text-sm text-muted-foreground"><MapPin className="inline h-3 w-3 mr-1" />{props.countryInfo.region} | 时区: {props.countryInfo.timezone} | 货币: {props.countryInfo.currency}</p></div></div><Badge variant="outline" className="text-lg px-3 py-1">{props.filteredHolidays.length} 个节假日</Badge></div></CardContent></Card>}
    {props.selectedYearNumber >= 2026 && <Alert><Info className="h-4 w-4" /><AlertDescription>{props.selectedYear}年节假日为批量生成/预测数据，实际日期以各国官方公布为准</AlertDescription></Alert>}
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">{props.filteredHolidays.length > 0 ? props.filteredHolidays.map((holiday, index) => <HolidayCard key={index} holiday={holiday} />) : <Alert><AlertCircle className="h-4 w-4" /><AlertDescription>该国家在{props.selectedYear}年{props.selectedMonth !== 'all' ? `${props.selectedMonth}月` : ''}暂无节假日数据</AlertDescription></Alert>}</div>
  </div>
}

function SelectField({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) { return <div><Label htmlFor={id}>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger id={id}><SelectValue /></SelectTrigger><SelectContent>{children}</SelectContent></Select></div> }

function HolidayCard({ holiday }: { holiday: Holiday }) {
  const date = new Date(holiday.date)
  return <Card><CardContent className="pt-6"><div className="flex items-start justify-between"><div className="space-y-2 flex-1"><div className="flex items-center gap-2"><h4 className="font-semibold">{holiday.name}{(holiday.nameCN || holiday.localName) && <span className="text-sm text-muted-foreground ml-2">({holiday.nameCN || holiday.localName})</span>}</h4><Badge variant={holiday.type === 'public' ? 'default' : 'secondary'}>{getHolidayTypeName(holiday.type)}</Badge></div><p className="text-sm text-muted-foreground"><Calendar className="inline h-3 w-3 mr-1" />{date.toLocaleDateString('zh-CN')} ({date.toLocaleDateString('zh-CN', { weekday: 'long' })})</p><div className="flex items-center gap-2"><Badge variant={holiday.impact === 'high' ? 'destructive' : holiday.impact === 'medium' ? 'default' : 'secondary'} className="text-xs">{getImpactLevelName(holiday.impact)}影响</Badge><span className="text-xs text-muted-foreground">{impactDescriptions[holiday.impact]}</span></div></div></div></CardContent></Card>
}
