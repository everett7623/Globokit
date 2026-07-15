// 名称: 全球货币符号大全
// 描述: 查看和复制全球各国货币符号，便于外贸报价和合同编写
// 路径: Globokit/app/tools/currency-symbols/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useEffect, useState } from 'react'
import { CurrencyControls } from './currency-controls'
import { CurrencyReference, CurrencyStats } from './currency-info-panels'
import { CurrencyList } from './currency-list'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrencyData, type Currency } from '@/lib/tools/currency-symbols'

export default function CurrencySymbolsPage() {
  const [currencies] = useState<Currency[]>(() => getCurrencyData())
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('currencyFavorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }
  const toggleFavorite = (code: string) => {
    const newFavorites = favorites.includes(code) ? favorites.filter((favorite) => favorite !== code) : [...favorites, code]
    setFavorites(newFavorites)
    localStorage.setItem('currencyFavorites', JSON.stringify(newFavorites))
  }
  const normalizedSearchTerm = searchTerm.toLowerCase()
  const filteredCurrencies = currencies.filter((currency) => {
    const matchesSearch = currency.code.toLowerCase().includes(normalizedSearchTerm)
      || currency.name.toLowerCase().includes(normalizedSearchTerm)
      || currency.nameEn.toLowerCase().includes(normalizedSearchTerm)
      || currency.country.toLowerCase().includes(normalizedSearchTerm)
      || currency.countryEn.toLowerCase().includes(normalizedSearchTerm)
      || currency.symbol.includes(searchTerm)
    const matchesRegion = selectedRegion === 'all'
      || (selectedRegion === 'favorites' && favorites.includes(currency.code))
      || currency.region === selectedRegion
    return matchesSearch && matchesRegion && (!showOnlyPopular || currency.popular)
  })
  const groupedCurrencies = filteredCurrencies.reduce<Record<string, Currency[]>>((groups, currency) => {
    if (!groups[currency.region]) groups[currency.region] = []
    groups[currency.region].push(currency)
    return groups
  }, {})

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球货币符号大全</h1>
        <p className="text-muted-foreground">查看和复制全球货币符号，覆盖主要贸易国家和长尾市场</p>
      </div>
      <CurrencyStats
        totalCount={currencies.length}
        popularCount={currencies.filter((currency) => currency.popular).length}
        tradingCount={currencies.filter((currency) => currency.trading).length}
        favoriteCount={favorites.length}
      />
      <Card>
        <CardHeader>
          <CardTitle>货币符号查询</CardTitle>
          <CardDescription>查找和复制全球各种货币的符号、代码和适用国家</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CurrencyControls
            selectedRegion={selectedRegion}
            searchTerm={searchTerm}
            favoriteCount={favorites.length}
            showOnlyPopular={showOnlyPopular}
            onRegionChange={setSelectedRegion}
            onSearchChange={setSearchTerm}
            onTogglePopular={() => setShowOnlyPopular((value) => !value)}
          />
          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            <CurrencyList
              groupedCurrencies={groupedCurrencies}
              filteredCount={filteredCurrencies.length}
              selectedRegion={selectedRegion}
              favorites={favorites}
              copiedCode={copiedCode}
              onToggleFavorite={toggleFavorite}
              onCopy={copyToClipboard}
            />
          </div>
        </CardContent>
      </Card>
      <CurrencyReference />
    </>
  )
}
