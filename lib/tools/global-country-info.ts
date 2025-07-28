// 名称: 全球国家信息查询
// 描述: 提供全球国家和地区的详细信息，包括代码、区号、时区等
// 路径: seedtool/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-26

export interface CountryInfo {
  name_cn: string;
  name_en: string;
  iso2: string;
  iso3: string;
  capital_cn: string;
  capital_en: string;
  continent_cn: string;
  continent_en: string;
  dial_code: string;
  tld: string;
  timezone: string;
  currency_code: string;
  currency_name_cn: string;
  currency_symbol: string;
  language_cn: string[];
  language_en: string[];
  religion: string[];
  area_km2: number;
  population: number;
  driving_side: 'left' | 'right';
  power_plug: string;
  voltage: string;
}

// 精简版数据用于测试
export const COUNTRY_DATA: CountryInfo[] = [
  { 
    name_cn: "中国", 
    name_en: "China", 
    iso2: "CN", 
    iso3: "CHN", 
    dial_code: "+86", 
    capital_cn: "北京", 
    capital_en: "Beijing", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".cn", 
    timezone: "Asia/Shanghai", 
    currency_code: "CNY", 
    currency_name_cn: "人民币",
    currency_symbol: "¥",
    language_cn: ["汉语"],
    language_en: ["Chinese"],
    religion: ["无宗教", "佛教"],
    area_km2: 9596961,
    population: 1411000000,
    driving_side: "right",
    power_plug: "A/C/I",
    voltage: "220V"
  },
  { 
    name_cn: "美国", 
    name_en: "United States", 
    iso2: "US", 
    iso3: "USA", 
    dial_code: "+1", 
    capital_cn: "华盛顿", 
    capital_en: "Washington, D.C.", 
    continent_cn: "北美洲", 
    continent_en: "North America", 
    tld: ".us", 
    timezone: "America/New_York", 
    currency_code: "USD", 
    currency_name_cn: "美元",
    currency_symbol: "$",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教"],
    area_km2: 9833517,
    population: 331900000,
    driving_side: "right",
    power_plug: "A/B",
    voltage: "120V"
  },
  { 
    name_cn: "日本", 
    name_en: "Japan", 
    iso2: "JP", 
    iso3: "JPN", 
    dial_code: "+81", 
    capital_cn: "东京", 
    capital_en: "Tokyo", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".jp", 
    timezone: "Asia/Tokyo", 
    currency_code: "JPY", 
    currency_name_cn: "日元",
    currency_symbol: "¥",
    language_cn: ["日语"],
    language_en: ["Japanese"],
    religion: ["神道教", "佛教"],
    area_km2: 377975,
    population: 125800000,
    driving_side: "left",
    power_plug: "A/B",
    voltage: "100V"
  },
  { 
    name_cn: "德国", 
    name_en: "Germany", 
    iso2: "DE", 
    iso3: "DEU", 
    dial_code: "+49", 
    capital_cn: "柏林", 
    capital_en: "Berlin", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".de", 
    timezone: "Europe/Berlin", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["德语"],
    language_en: ["German"],
    religion: ["基督教"],
    area_km2: 357022,
    population: 83200000,
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "英国", 
    name_en: "United Kingdom", 
    iso2: "GB", 
    iso3: "GBR", 
    dial_code: "+44", 
    capital_cn: "伦敦", 
    capital_en: "London", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".uk", 
    timezone: "Europe/London", 
    currency_code: "GBP", 
    currency_name_cn: "英镑",
    currency_symbol: "£",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教"],
    area_km2: 242495,
    population: 67500000,
    driving_side: "left",
    power_plug: "G",
    voltage: "230V"
  }
];

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
