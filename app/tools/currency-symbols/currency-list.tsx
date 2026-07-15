// 名称: 货币查询列表
// 描述: 按地区展示货币卡片及复制、收藏操作
// 路径: Globokit/app/tools/currency-symbols/currency-list.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Check, Coins, Copy, Star, StarOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CURRENCY_REGIONS, formatCurrencyExample, type Currency } from '@/lib/tools/currency-symbols'

interface CurrencyListProps {
  groupedCurrencies: Record<string, Currency[]>
  filteredCount: number
  selectedRegion: string
  favorites: string[]
  copiedCode: string | null
  onToggleFavorite: (code: string) => void
  onCopy: (text: string, code: string) => void
}

export function CurrencyList(props: CurrencyListProps) {
  if (props.selectedRegion === 'favorites' && props.favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">还没有收藏任何货币，点击星标收藏常用货币</p>
      </div>
    )
  }
  if (props.filteredCount === 0) {
    return (
      <div className="text-center py-12">
        <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">没有找到匹配的货币</p>
      </div>
    )
  }

  return Object.entries(props.groupedCurrencies).map(([region, currencies]) => (
    <div key={region}>
      {props.selectedRegion === 'all' && (
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Badge variant="outline">{CURRENCY_REGIONS[region] || region}</Badge>
          <span className="text-sm text-muted-foreground">({currencies.length}种)</span>
        </h3>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currencies.map((currency) => (
          <Card key={currency.code} className={`overflow-hidden transition-all hover:shadow-lg ${props.favorites.includes(currency.code) ? 'ring-2 ring-yellow-400' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">{currency.symbol}</span>
                    <span>{currency.code}</span>
                    <Button variant="ghost" size="sm" className="ml-1 h-6 w-6 p-0" onClick={() => props.onToggleFavorite(currency.code)}>
                      {props.favorites.includes(currency.code) ? <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : <StarOff className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                  <CardDescription>{currency.name} ({currency.nameEn})</CardDescription>
                </div>
                <div className="flex gap-1">
                  {currency.popular && <Badge variant="default" className="bg-blue-500">常用</Badge>}
                  {currency.trading && <Badge variant="default" className="bg-green-500">贸易</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">国家/地区：</span>
                  <span className="font-medium break-words" title={`${currency.country} (${currency.countryEn})`}>{currency.country}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">示例：</span>
                  <span className="font-mono">{formatCurrencyExample(currency.symbol, currency.decimals)}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <CopyAction label="复制符号" copied={props.copiedCode === `${currency.code}-symbol`} onClick={() => props.onCopy(currency.symbol, `${currency.code}-symbol`)} />
                  <CopyAction label="复制代码" copied={props.copiedCode === `${currency.code}-code`} onClick={() => props.onCopy(currency.code, `${currency.code}-code`)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ))
}

function CopyAction({ label, copied, onClick }: { label: string; copied: boolean; onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" className="flex-1" onClick={onClick}>
      {copied ? <><Check className="h-4 w-4 mr-1" />已复制</> : <><Copy className="h-4 w-4 mr-1" />{label}</>}
    </Button>
  )
}
