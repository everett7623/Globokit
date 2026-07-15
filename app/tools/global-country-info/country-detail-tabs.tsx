// 名称: 国家详情标签内容
// 描述: 展示基础、通讯、文化和商务信息
// 路径: Globokit/app/tools/global-country-info/country-detail-tabs.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Briefcase, Building2, Calendar, Car, Clock, DollarSign, Globe, Globe2, Hash, Info, Languages, MapPin, Phone, Plug, Ship, Users, Zap } from 'lucide-react'
import { CopyButton } from '@/components/tools/copy-button'
import { Badge } from '@/components/ui/badge'
import { formatArea, formatPopulation, getTimeDifference, type CountryInfo } from '@/lib/tools/global-country-info'
import { TRANSCONTINENTAL_COUNTRIES } from './country-page-data'

export function CountryBasicTab({ country }: { country: CountryInfo }) {
  const continents = TRANSCONTINENTAL_COUNTRIES[country.iso2]
  return <div className="grid gap-4 md:grid-cols-2"><div className="space-y-3"><DetailRow icon={MapPin} label="首都" value={`${country.capital_cn} (${country.capital_en})`} /><div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><span className="flex items-center gap-2 text-muted-foreground"><Globe2 className="h-4 w-4" />大洲</span>{continents ? <div className="flex gap-1">{continents.map((continent, index) => <Badge key={continent} variant={index === 0 ? 'default' : 'secondary'}>{continent}</Badge>)}</div> : <Badge>{country.continent_cn}</Badge>}</div><DetailRow icon={Users} label="人口" value={formatPopulation(country.population)} /><DetailRow icon={Building2} label="面积" value={formatArea(country.area_km2)} /></div><div className="space-y-3"><DetailRow icon={Car} label="驾驶方向" value={country.driving_side === 'left' ? '左侧行驶' : '右侧行驶'} /><DetailRow icon={Plug} label="电源标准" value={`${country.voltage} / ${country.power_plug}型`} /><div className="p-3 bg-muted/50 rounded-lg"><div className="flex items-center gap-2 text-muted-foreground mb-2"><Info className="h-4 w-4" />宗教信仰</div><div className="flex flex-wrap gap-2">{country.religion.map((religion) => <Badge key={religion} variant="secondary">{religion}</Badge>)}</div></div></div></div>
}

export function CountryCommunicationTab({ country }: { country: CountryInfo }) {
  const difference = getTimeDifference(country.timezone)
  return <div className="grid gap-4"><CopyRow icon={Phone} label="国际电话区号" value={country.dial_code} large /><CopyRow icon={Hash} label="国家代码" value={`${country.iso2} / ${country.iso3}`} /><CopyRow icon={Globe} label="顶级域名" value={country.tld} /><div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"><span className="flex items-center gap-3"><Clock className="h-5 w-5 text-muted-foreground" />时区 / 时差</span><div className="text-right"><div className="font-medium">{country.timezone}</div><div className="text-sm text-muted-foreground">UTC{difference >= 0 ? '+' : ''}{difference} （相对本地）</div></div></div></div>
}

export function CountryCultureTab({ country }: { country: CountryInfo }) {
  return <div className="grid gap-4"><div className="p-4 bg-muted/50 rounded-lg"><div className="flex items-center gap-3 mb-3"><DollarSign className="h-5 w-5 text-muted-foreground" /><span className="font-medium">货币信息</span></div><div className="grid gap-2"><Pair label="货币名称" value={country.currency_name_cn} /><div className="flex items-center justify-between"><span className="text-muted-foreground">货币代码</span><span className="flex items-center gap-2 font-mono">{country.currency_code}<CopyButton text={country.currency_code} className="h-6 w-6" /></span></div><Pair label="货币符号" value={country.currency_symbol} large /></div></div><div className="p-4 bg-muted/50 rounded-lg"><div className="flex items-center gap-3 mb-3"><Languages className="h-5 w-5 text-muted-foreground" /><span className="font-medium">语言信息</span></div><div className="space-y-2">{country.language_cn.map((language, index) => <div key={language} className="flex items-center justify-between"><span>{language}</span><span className="text-sm text-muted-foreground">{country.language_en[index]}</span></div>)}</div></div></div>
}

export function CountryBusinessTab({ country }: { country: CountryInfo }) {
  return <div className="grid gap-4">{country.business_hours && <Section icon={Clock} title="工作时间"><p>{country.business_hours}</p></Section>}{country.major_ports && country.major_ports.length > 0 && <Section icon={Ship} title="主要港口"><div className="flex flex-wrap gap-2">{country.major_ports.map((port) => <Badge key={port} variant="outline">{port}</Badge>)}</div></Section>}{country.business_etiquette && <Section icon={Briefcase} title="商务礼仪"><BulletList items={country.business_etiquette} /></Section>}{country.major_holidays && <Section icon={Calendar} title="重要节假日"><div className="grid gap-2">{country.major_holidays.map((holiday) => <div key={holiday} className="text-sm">{holiday}</div>)}</div></Section>}{country.trade_notes && <Section icon={Zap} title="贸易注意事项"><BulletList items={country.trade_notes} /></Section>}</div>
}

type IconType = typeof MapPin
function DetailRow({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) { return <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" />{label}</span><span className="font-medium">{value}</span></div> }
function CopyRow({ icon: Icon, label, value, large = false }: { icon: IconType; label: string; value: string; large?: boolean }) { return <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"><span className="flex items-center gap-3"><Icon className="h-5 w-5 text-muted-foreground" />{label}</span><span className={`flex items-center gap-2 font-mono font-medium ${large ? 'text-xl' : ''}`}>{value}<CopyButton text={value} /></span></div> }
function Pair({ label, value, large = false }: { label: string; value: string; large?: boolean }) { return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className={large ? 'text-xl' : ''}>{value}</span></div> }
function Section({ icon: Icon, title, children }: { icon: IconType; title: string; children: React.ReactNode }) { return <div className="p-4 bg-muted/50 rounded-lg"><div className="flex items-center gap-3 mb-3"><Icon className="h-5 w-5 text-muted-foreground" /><span className="font-medium">{title}</span></div>{children}</div> }
function BulletList({ items }: { items: string[] }) { return <ul className="space-y-2">{items.map((item) => <li key={item} className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span className="text-sm">{item}</span></li>)}</ul> }
