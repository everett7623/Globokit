// 名称: 全球国家信息查询
// 描述: 查询世界各国的中英文名称、区号、代码、时区、域名等信息
// 路径: seedtool/app/tools/country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-24

"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

// 如果导入失败，请检查 @/lib/tools/country-info 文件是否存在
// 临时使用下面的数据进行测试
const CONTINENTS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  northAmerica: '北美洲',
  southAmerica: '南美洲',
  oceania: '大洋洲'
};

interface Country {
  name: string;
  nameEn: string;
  capital: string;
  capitalEn: string;
  continent: string;
  iso2: string;
  iso3: string;
  phoneCode: string;
  domain: string;
  timezone: string;
  currency: string;
  currencyName: string;
  languages: string[];
  tradePorts?: string[];
  businessHours?: string;
  holidays?: string[];
}

// 测试数据
const COUNTRIES: Country[] = [
  {
    name: '中国',
    nameEn: 'China',
    capital: '北京',
    capitalEn: 'Beijing',
    continent: 'asia',
    iso2: 'CN',
    iso3: 'CHN',
    phoneCode: '+86',
    domain: '.cn',
    timezone: 'UTC+8',
    currency: 'CNY',
    currencyName: '人民币',
    languages: ['中文'],
    tradePorts: ['上海', '深圳', '宁波舟山'],
    businessHours: '周一至周五 9:00-18:00',
    holidays: ['春节', '国庆节']
  },
  {
    name: '美国',
    nameEn: 'United States',
    capital: '华盛顿',
    capitalEn: 'Washington D.C.',
    continent: 'northAmerica',
    iso2: 'US',
    iso3: 'USA',
    phoneCode: '+1',
    domain: '.us',
    timezone: 'UTC-5 to UTC-10',
    currency: 'USD',
    currencyName: '美元',
    languages: ['英语'],
    tradePorts: ['洛杉矶', '纽约'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '英国',
    nameEn: 'United Kingdom',
    capital: '伦敦',
    capitalEn: 'London',
    continent: 'europe',
    iso2: 'GB',
    iso3: 'GBR',
    phoneCode: '+44',
    domain: '.uk',
    timezone: 'UTC+0',
    currency: 'GBP',
    currencyName: '英镑',
    languages: ['英语'],
    tradePorts: ['伦敦', '利物浦'],
    businessHours: '周一至周五 9:00-17:00'
  }
];

// 工具函数
const searchCountries = (query: string): Country[] => {
  if (!query.trim()) return COUNTRIES;
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(lowerQuery) ||
    country.nameEn.toLowerCase().includes(lowerQuery) ||
    country.iso2.toLowerCase().includes(lowerQuery) ||
    country.iso3.toLowerCase().includes(lowerQuery) ||
    country.phoneCode.includes(query)
  );
};

const filterCountriesByContinent = (continentKey: string): Country[] => {
  if (!continentKey) return COUNTRIES;
  return COUNTRIES.filter(country => country.continent === continentKey);
};

const getContinentOptions = () => {
  return Object.entries(CONTINENTS).map(([key, name]) => ({ key, name }));
};

export default function CountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [copiedCountry, setCopiedCountry] = useState<string | null>(null);

  const filteredCountries = useMemo(() => {
    let result = COUNTRIES;
    
    if (selectedContinent) {
      result = filterCountriesByContinent(selectedContinent);
    }
    
    if (searchTerm) {
      result = searchCountries(searchTerm).filter(country => 
        !selectedContinent || country.continent === selectedContinent
      );
    }
    
    return result;
  }, [searchTerm, selectedContinent]);

  const continentOptions = getContinentOptions();

  const generateCountryInfoText = (country: Country): string => {
    const lines = [
      `国家/地区: ${country.name} (${country.nameEn})`,
      `首都: ${country.capital} (${country.capitalEn})`,
      `所属大洲: ${CONTINENTS[country.continent] || country.continent}`,
      `官方语言: ${country.languages.join(', ')}`,
      `货币: ${country.currencyName} (${country.currency})`,
      `国际电话区号: ${country.phoneCode}`,
      `国家代码 (ISO2/3): ${country.iso2} / ${country.iso3}`,
      `域名后缀: ${country.domain}`,
      `主要时区: ${country.timezone}`,
    ];
    
    if (country.tradePorts && country.tradePorts.length > 0) {
      lines.push(`主要贸易港口: ${country.tradePorts.join(', ')}`);
    }
    if (country.businessHours) {
      lines.push(`工作时间: ${country.businessHours}`);
    }
    if (country.holidays && country.holidays.length > 0) {
      lines.push(`重要节假日: ${country.holidays.join(', ')}`);
    }
    
    return lines.join('\n');
  };

  const handleCopy = async (country: Country) => {
    try {
      const infoText = generateCountryInfoText(country);
      await navigator.clipboard.writeText(infoText);
      setCopiedCountry(country.iso2);
      setTimeout(() => setCopiedCountry(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">全球国家信息查询</CardTitle>
          <p className="text-muted-foreground">查询世界各国的中英文名称、区号、代码、时区、域名等信息</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="搜索国家/地区名称、代码、区号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select value={selectedContinent} onValueChange={setSelectedContinent}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="选择大洲" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">全部大洲</SelectItem>
                {continentOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              共找到 {filteredCountries.length} 个国家/地区
            </p>
            
            {filteredCountries.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredCountries.map((country) => {
                  const isCopied = copiedCountry === country.iso2;
                  return (
                    <Card key={country.iso2} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{country.name}</h3>
                            <p className="text-sm text-muted-foreground">{country.nameEn}</p>
                          </div>
                          <Badge variant="secondary">
                            {CONTINENTS[country.continent] || country.continent}
                          </Badge>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">首都:</span> {country.capital}
                          </div>
                          <div>
                            <span className="font-medium">语言:</span> {country.languages.join(', ')}
                          </div>
                          <div>
                            <span className="font-medium">货币:</span> {country.currencyName} ({country.currency})
                          </div>
                          <div>
                            <span className="font-medium">区号:</span> {country.phoneCode}
                          </div>
                          <div>
                            <span className="font-medium">代码:</span> {country.iso2} / {country.iso3}
                          </div>
                          <div>
                            <span className="font-medium">域名:</span> {country.domain}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">时区:</span> {country.timezone}
                          </div>
                          {country.tradePorts && country.tradePorts.length > 0 && (
                            <div className="col-span-2">
                              <span className="font-medium">港口:</span> {country.tradePorts.join(', ')}
                            </div>
                          )}
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(country)}
                            className="gap-2"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-4 w-4" />
                                已复制
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                复制信息
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                未找到匹配的国家/地区。
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
