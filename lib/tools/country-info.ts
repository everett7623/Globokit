// 名称: 全球国家信息工具函数
// 描述: 提供全球各国的基础信息、通讯代码、时区等数据
// 路径: seedtool/lib/tools/country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-24

export interface Country {
  name: string           // 中文名称
  nameEn: string        // 英文名称
  capital: string       // 首都中文
  capitalEn: string     // 首都英文
  continent: string     // 大洲
  iso2: string         // ISO 2位代码
  iso3: string         // ISO 3位代码
  phoneCode: string    // 电话区号
  domain: string       // 域名后缀
  timezone: string     // 主要时区
  currency: string     // 货币代码
  currencyName: string // 货币名称
  languages: string[]  // 官方语言
  tradePorts?: string[] // 主要贸易港口
  businessHours?: string // 工作时间
  holidays?: string[]   // 重要节假日
}

// 大洲分类
export const CONTINENTS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  northAmerica: '北美洲',
  southAmerica: '南美洲',
  oceania: '大洋洲',
  antarctica: '南极洲'
}

// 国家数据
export const COUNTRIES: Country[] = [
  // 亚洲
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
    tradePorts: ['上海', '深圳', '宁波舟山', '广州', '青岛'],
    businessHours: '周一至周五 9:00-18:00',
    holidays: ['春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节']
  },
  {
    name: '日本',
    nameEn: 'Japan',
    capital: '东京',
    capitalEn: 'Tokyo',
    continent: 'asia',
    iso2: 'JP',
    iso3: 'JPN',
    phoneCode: '+81',
    domain: '.jp',
    timezone: 'UTC+9',
    currency: 'JPY',
    currencyName: '日元',
    languages: ['日语'],
    tradePorts: ['东京', '横滨', '大阪', '神户'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '韩国',
    nameEn: 'South Korea',
    capital: '首尔',
    capitalEn: 'Seoul',
    continent: 'asia',
    iso2: 'KR',
    iso3: 'KOR',
    phoneCode: '+82',
    domain: '.kr',
    timezone: 'UTC+9',
    currency: 'KRW',
    currencyName: '韩元',
    languages: ['韩语'],
    tradePorts: ['釜山', '仁川'],
    businessHours: '周一至周五 9:00-18:00'
  },
  // 北美洲
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
    tradePorts: ['洛杉矶', '长滩', '纽约', '萨凡纳'],
    businessHours: '周一至周五 9:00-17:00',
    holidays: ['新年', '独立日', '感恩节', '圣诞节']
  },
  {
    name: '加拿大',
    nameEn: 'Canada',
    capital: '渥太华',
    capitalEn: 'Ottawa',
    continent: 'northAmerica',
    iso2: 'CA',
    iso3: 'CAN',
    phoneCode: '+1',
    domain: '.ca',
    timezone: 'UTC-3.5 to UTC-8',
    currency: 'CAD',
    currencyName: '加拿大元',
    languages: ['英语', '法语'],
    tradePorts: ['温哥华', '蒙特利尔'],
    businessHours: '周一至周五 9:00-17:00'
  },
  // 欧洲
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
    tradePorts: ['伦敦', '利物浦', '南安普顿'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '德国',
    nameEn: 'Germany',
    capital: '柏林',
    capitalEn: 'Berlin',
    continent: 'europe',
    iso2: 'DE',
    iso3: 'DEU',
    phoneCode: '+49',
    domain: '.de',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['德语'],
    tradePorts: ['汉堡', '不来梅'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '法国',
    nameEn: 'France',
    capital: '巴黎',
    capitalEn: 'Paris',
    continent: 'europe',
    iso2: 'FR',
    iso3: 'FRA',
    phoneCode: '+33',
    domain: '.fr',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['法语'],
    tradePorts: ['马赛', '勒阿弗尔'],
    businessHours: '周一至周五 9:00-17:00'
  },
  // 大洋洲
  {
    name: '澳大利亚',
    nameEn: 'Australia',
    capital: '堪培拉',
    capitalEn: 'Canberra',
    continent: 'oceania',
    iso2: 'AU',
    iso3: 'AUS',
    phoneCode: '+61',
    domain: '.au',
    timezone: 'UTC+8 to UTC+11',
    currency: 'AUD',
    currencyName: '澳大利亚元',
    languages: ['英语'],
    tradePorts: ['悉尼', '墨尔本', '布里斯班'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '新西兰',
    nameEn: 'New Zealand',
    capital: '惠灵顿',
    capitalEn: 'Wellington',
    continent: 'oceania',
    iso2: 'NZ',
    iso3: 'NZL',
    phoneCode: '+64',
    domain: '.nz',
    timezone: 'UTC+12',
    currency: 'NZD',
    currencyName: '新西兰元',
    languages: ['英语', '毛利语'],
    tradePorts: ['奥克兰', '惠灵顿'],
    businessHours: '周一至周五 9:00-17:00'
  }
]

/**
 * 根据关键词搜索国家
 */
export function searchCountries(query: string): Country[] {
  if (!query.trim()) return COUNTRIES;
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(lowerQuery) ||
    country.nameEn.toLowerCase().includes(lowerQuery) ||
    country.iso2.toLowerCase().includes(lowerQuery) ||
    country.iso3.toLowerCase().includes(lowerQuery) ||
    country.phoneCode.includes(query)
  );
}

/**
 * 根据大洲筛选国家
 */
export function filterCountriesByContinent(continentKey: string): Country[] {
  if (!continentKey) return COUNTRIES;
  return COUNTRIES.filter(country => country.continent === continentKey);
}

/**
 * 获取所有大洲选项
 */
export function getContinentOptions() {
  return Object.entries(CONTINENTS).map(([key, name]) => ({ key, name }));
}
