// 名称: 国家信息检索函数
// 描述: 提供国家代码、区号、时区等综合信息的查询逻辑
// 路径: Globokit/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2026-01-08

import countryData from './data/global-country-info.json'

export interface CountryInfo {
  // 基础信息
  name_cn: string;
  name_en: string;
  iso2: string;
  iso3: string;
  capital_cn: string;
  capital_en: string;
  continent_cn: string;
  continent_en: string;
  
  // 通讯信息
  dial_code: string;
  tld: string;
  timezone: string;
  
  // 文化信息
  currency_code: string;
  currency_name_cn: string;
  currency_symbol: string;
  language_cn: string[];
  language_en: string[];
  religion: string[];
  
  // 地理信息
  area_km2: number;
  population: number;
  
  // 外贸相关
  major_ports?: string[];
  business_hours?: string;
  business_etiquette?: string[];
  major_holidays?: string[];
  trade_notes?: string[];
  
  // 其他
  driving_side: 'left' | 'right';
  power_plug: string;
  voltage: string;
}

export const COUNTRY_DATA = countryData as unknown as CountryInfo[]
/**
 * 获取国旗的emoji表示
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * 获取指定时区与本地的时差（小时）
 */
export function getTimeDifference(targetTimezone: string): number {
  try {
    const now = new Date();
    const localTimeString = now.toLocaleString('en-US', { timeZone: targetTimezone });
    const targetDate = new Date(localTimeString);
    const diff = now.getTime() - targetDate.getTime();
    return Math.round(diff / (1000 * 60 * 30)) / 2;
  } catch (e) {
    console.error(`Invalid timezone provided: ${targetTimezone}`);
    return 0;
  }
}

/**
 * 获取所有大洲的唯一列表
 */
export const getContinents = () => {
  const continents = new Set(COUNTRY_DATA.map(c => c.continent_cn));
  return Array.from(continents);
};

/**
 * 获取所有货币的唯一列表
 */
export const getCurrencies = () => {
  const currencies = new Map<string, string>();
  COUNTRY_DATA.forEach(country => {
    if (country.currency_code && country.currency_name_cn) {
      currencies.set(country.currency_code, country.currency_name_cn);
    }
  });
  return Array.from(currencies.entries()).map(([code, name]) => ({ code, name }));
};

/**
 * 获取所有语言的唯一列表
 */
export const getLanguages = () => {
  const languages = new Set<string>();
  COUNTRY_DATA.forEach(country => {
    country.language_cn.forEach(lang => languages.add(lang));
  });
  return Array.from(languages).sort();
};

/**
 * 格式化人口数字
 */
export const formatPopulation = (population: number): string => {
  if (population >= 1e9) return `${(population / 1e9).toFixed(1)}B`;
  if (population >= 1e6) return `${(population / 1e6).toFixed(1)}M`;
  if (population >= 1e3) return `${(population / 1e3).toFixed(1)}K`;
  return population.toString();
};

/**
 * 格式化面积
 */
export const formatArea = (area: number): string => {
  return new Intl.NumberFormat('zh-CN').format(area) + ' km²';
};
