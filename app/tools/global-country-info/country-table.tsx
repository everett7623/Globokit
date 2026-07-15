// 名称: 国家信息表格
// 描述: 展示国家列表、响应式详情行、排序和行操作
// 路径: Globokit/app/tools/global-country-info/country-table.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Fragment } from 'react'
import { ChevronDown, ChevronUp, Clock, DollarSign, Eye, Globe, Globe2, Hash, Languages, Map, MapPin, Phone, Star, StarOff, TrendingUp, Users } from 'lucide-react'
import { CopyButton } from '@/components/tools/copy-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPopulation, getFlagEmoji, getTimeDifference, type CountryInfo } from '@/lib/tools/global-country-info'
import { MAJOR_TRADE_COUNTRIES, TRANSCONTINENTAL_COUNTRIES, type SortField, type SortOrder } from './country-page-data'

interface CountryTableProps {
  countries: CountryInfo[]
  favorites: string[]
  expandedRows: string[]
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
  onToggleFavorite: (iso2: string) => void
  onToggleRow: (iso2: string) => void
  onSelect: (country: CountryInfo) => void
}

export function CountryTable(props: CountryTableProps) {
  return <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b bg-muted/50"><SortHeading label="国家/地区" field="name" onSort={props.onSort} sortField={props.sortField} sortOrder={props.sortOrder} /><SortHeading label="大洲" field="continent" className="hidden md:table-cell" onSort={props.onSort} sortField={props.sortField} sortOrder={props.sortOrder} /><th className="text-left p-4 font-medium">国际区号</th><th className="text-left p-4 font-medium hidden lg:table-cell">国家代码</th><SortHeading label="时差" field="timezone" className="hidden xl:table-cell" onSort={props.onSort} sortField={props.sortField} sortOrder={props.sortOrder} /><th className="text-left p-4 font-medium hidden xl:table-cell">货币</th><th className="text-center p-4 font-medium">操作</th></tr></thead><tbody>{props.countries.map((country) => <CountryRows key={country.iso2} country={country} favorite={props.favorites.includes(country.iso2)} expanded={props.expandedRows.includes(country.iso2)} onToggleFavorite={props.onToggleFavorite} onToggleRow={props.onToggleRow} onSelect={props.onSelect} />)}</tbody></table>{props.countries.length === 0 && <div className="text-center py-16"><Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">未找到匹配的国家信息</p><p className="text-sm text-muted-foreground mt-1">请尝试调整搜索条件</p></div>}</div></CardContent></Card>
}

function CountryRows({ country, favorite, expanded, onToggleFavorite, onToggleRow, onSelect }: { country: CountryInfo; favorite: boolean; expanded: boolean; onToggleFavorite: (iso2: string) => void; onToggleRow: (iso2: string) => void; onSelect: (country: CountryInfo) => void }) {
  const difference = getTimeDifference(country.timezone)
  const timeDisplay = `UTC${difference >= 0 ? '+' : ''}${difference}`
  const major = MAJOR_TRADE_COUNTRIES.includes(country.iso2)
  const transcontinental = Object.prototype.hasOwnProperty.call(TRANSCONTINENTAL_COUNTRIES, country.iso2)
  return <Fragment><tr className={`border-b transition-colors hover:bg-muted/50 ${favorite ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''}`}>
    <td className="p-4"><div className="flex items-center gap-3"><span className="text-2xl">{getFlagEmoji(country.iso2)}</span><div><div className="font-medium flex items-center gap-2">{country.name_cn}{major && <Badge variant="default" className="text-xs"><TrendingUp className="h-3 w-3 mr-1" />贸易大国</Badge>}</div><div className="text-sm text-muted-foreground">{country.name_en}</div></div></div></td>
    <td className="p-4 hidden md:table-cell">{transcontinental ? <Badge variant="outline" className="text-xs"><Map className="h-3 w-3 mr-1" />跨洲</Badge> : <Badge variant="outline">{country.continent_cn}</Badge>}</td>
    <td className="p-4"><span className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span className="font-mono">{country.dial_code}</span><CopyButton text={country.dial_code} className="h-6 w-6" /></span></td>
    <td className="p-4 hidden lg:table-cell"><span className="flex items-center gap-2"><Hash className="h-4 w-4 text-muted-foreground" /><span className="font-mono text-sm">{country.iso2} / {country.iso3}</span><CopyButton text={`${country.iso2} / ${country.iso3}`} className="h-6 w-6" /></span></td>
    <td className="p-4 hidden xl:table-cell"><span className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="font-mono text-sm">{timeDisplay}</span></span></td>
    <td className="p-4 hidden xl:table-cell"><span className="flex items-center gap-2"><span className="text-lg">{country.currency_symbol}</span><span className="text-sm">{country.currency_code}</span></span></td>
    <td className="p-4"><div className="flex items-center justify-center gap-2"><IconButton title="收藏" onClick={() => onToggleFavorite(country.iso2)}>{favorite ? <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : <StarOff className="h-4 w-4" />}</IconButton><IconButton title="查看详情" onClick={() => onSelect(country)}><Eye className="h-4 w-4" /></IconButton><Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={() => onToggleRow(country.iso2)} title="展开">{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button></div></td>
  </tr>{expanded && <tr className="lg:hidden"><td colSpan={7} className="p-4 bg-muted/30"><div className="grid gap-3 text-sm"><MobileRow icon={Globe2} label="大洲:" value={country.continent_cn}>{transcontinental && <Badge variant="secondary" className="text-xs"><Map className="h-3 w-3 mr-1" />跨洲国家</Badge>}</MobileRow><MobileRow icon={MapPin} label="首都:" value={`${country.capital_cn} (${country.capital_en})`} /><MobileRow icon={Hash} label="国家代码:" value={`${country.iso2} / ${country.iso3}`} mono><CopyButton text={`${country.iso2} / ${country.iso3}`} className="h-6 w-6" /></MobileRow><MobileRow icon={Clock} label="时差:" value={timeDisplay} mono /><MobileRow icon={DollarSign} label="货币:" value={`${country.currency_name_cn} (${country.currency_symbol} ${country.currency_code})`} /><MobileRow icon={Globe} label="域名:" value={country.tld} mono /><MobileRow icon={Languages} label="语言:" value={country.language_cn.join(', ')} /><MobileRow icon={Users} label="人口:" value={formatPopulation(country.population)} />{major && <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-muted-foreground" /><Badge variant="default" className="text-xs">主要贸易伙伴国</Badge></div>}</div></td></tr>}</Fragment>
}

function SortHeading({ label, field, className = '', onSort, sortField, sortOrder }: { label: string; field: SortField; className?: string; onSort: (field: SortField) => void; sortField: SortField; sortOrder: SortOrder }) { return <th className={`text-left p-4 font-medium ${className}`}><Button variant="ghost" size="sm" className="h-auto p-0 font-medium hover:bg-transparent" onClick={() => onSort(field)}>{label}{sortField === field && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</Button></th> }
function IconButton({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) { return <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClick} title={title}>{children}</Button> }
function MobileRow({ icon: Icon, label, value, mono = false, children }: { icon: typeof Globe; label: string; value: string; mono?: boolean; children?: React.ReactNode }) { return <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">{label}</span><span className={mono ? 'font-mono' : ''}>{value}</span>{children}</div> }
