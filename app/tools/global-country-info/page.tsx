// 名称: 全球国家信息查询
// 描述: 查询世界各国的中英文名称、区号、代码、时区、域名等信息
// 路径: Globokit/app/tools/global-country-info/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useEffect, useMemo, useState } from 'react'
import { CountryControls, MajorTradeCountries } from './country-controls'
import { CountryDetailModal } from './country-detail-modal'
import { exportCountriesCsv, filterAndSortCountries, type SortField, type SortOrder } from './country-page-data'
import { CountryTable } from './country-table'
import { CountryTips } from './country-tips'
import type { CountryInfo } from '@/lib/tools/global-country-info'

export default function GlobalCountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [continentFilter, setContinentFilter] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>('none')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [showOnlyMajorTrade, setShowOnlyMajorTrade] = useState(false)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('countryFavorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])
  const countries = useMemo(() => filterAndSortCountries({ searchTerm, continentFilter, favorites, sortField, sortOrder, showOnlyFavorites, showOnlyMajorTrade }), [searchTerm, continentFilter, favorites, sortField, sortOrder, showOnlyFavorites, showOnlyMajorTrade])
  const toggleFavorite = (iso2: string) => {
    const next = favorites.includes(iso2) ? favorites.filter((favorite) => favorite !== iso2) : [...favorites, iso2]
    setFavorites(next); localStorage.setItem('countryFavorites', JSON.stringify(next))
  }
  const handleSort = (field: SortField) => {
    if (sortField === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortOrder('asc') }
  }
  const toggleRow = (iso2: string) => setExpandedRows((rows) => rows.includes(iso2) ? rows.filter((row) => row !== iso2) : [...rows, iso2])

  return <><div className="mb-8"><h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1><p className="text-muted-foreground">快速查找世界各国的区号、代码、时差等关键信息，包含外贸相关的商务礼仪和贸易注意事项</p></div><MajorTradeCountries showOnlyMajorTrade={showOnlyMajorTrade} onSelect={setSelectedCountry} onToggleFilter={() => setShowOnlyMajorTrade((value) => !value)} /><CountryControls searchTerm={searchTerm} continentFilter={continentFilter} showOnlyFavorites={showOnlyFavorites} resultCount={countries.length} favoriteCount={favorites.length} onSearch={setSearchTerm} onContinent={setContinentFilter} onToggleFavorites={() => setShowOnlyFavorites((value) => !value)} onExport={() => exportCountriesCsv(countries)} /><CountryTable countries={countries} favorites={favorites} expandedRows={expandedRows} sortField={sortField} sortOrder={sortOrder} onSort={handleSort} onToggleFavorite={toggleFavorite} onToggleRow={toggleRow} onSelect={setSelectedCountry} /><CountryTips />{selectedCountry && <CountryDetailModal country={selectedCountry} favorites={favorites} onToggleFavorite={toggleFavorite} onClose={() => setSelectedCountry(null)} />}</>
}
