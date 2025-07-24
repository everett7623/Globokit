// 名称: 全球国家信息查询
// 描述: 查询世界各国的中英文名称、区号、代码、时区、域名等信息
// 路径: seedtool/app/tools/country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-24

'use client'

import { useState } from 'react'

export default function CountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const countries = [
    {
      name: '中国',
      nameEn: 'China',
      capital: '北京',
      phoneCode: '+86',
      iso2: 'CN',
      iso3: 'CHN',
      domain: '.cn',
      timezone: 'UTC+8'
    },
    {
      name: '美国',
      nameEn: 'United States',
      capital: '华盛顿',
      phoneCode: '+1',
      iso2: 'US',
      iso3: 'USA',
      domain: '.us',
      timezone: 'UTC-5 to UTC-10'
    }
  ]
  
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        全球国家信息查询
      </h1>
      
      <input
        type="text"
        placeholder="搜索国家..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredCountries.map((country) => (
          <div
            key={country.iso2}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px'
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {country.name} ({country.nameEn})
            </h2>
            <p>首都: {country.capital}</p>
            <p>电话区号: {country.phoneCode}</p>
            <p>国家代码: {country.iso2} / {country.iso3}</p>
            <p>域名: {country.domain}</p>
            <p>时区: {country.timezone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
