// 名称: 全球国家信息工具函数
// 描述: 提供全球各国的基础信息、通讯代码、时区等数据
// 路径: seedtool/lib/tools/country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-24

export interface Country {
  name: string
  nameEn: string
  capital: string
  capitalEn: string
  continent: string
  iso2: string
  iso3: string
  phoneCode: string
  domain: string
  timezone: string
  currency: string
  currencyName: string
  languages: string[]
  tradePorts?: string[]
  businessHours?: string
  holidays?: string[]
}

export const CONTINENTS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  northAmerica: '北美洲',
  southAmerica: '南美洲',
  oceania: '大洋洲',
  antarctica: '南极洲'
}

export const COUNTRIES: Country[] = [
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
    businessHours: '周一至周五 9:00-17:00',
    holidays: ['元旦', '成人节', '建国纪念日', '春分', '昭和日']
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
  {
    name: '新加坡',
    nameEn: 'Singapore',
    capital: '新加坡',
    capitalEn: 'Singapore',
    continent: 'asia',
    iso2: 'SG',
    iso3: 'SGP',
    phoneCode: '+65',
    domain: '.sg',
    timezone: 'UTC+8',
    currency: 'SGD',
    currencyName: '新加坡元',
    languages: ['英语', '中文', '马来语', '泰米尔语'],
    tradePorts: ['新加坡港'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '印度',
    nameEn: 'India',
    capital: '新德里',
    capitalEn: 'New Delhi',
    continent: 'asia',
    iso2: 'IN',
    iso3: 'IND',
    phoneCode: '+91',
    domain: '.in',
    timezone: 'UTC+5:30',
    currency: 'INR',
    currencyName: '印度卢比',
    languages: ['印地语', '英语'],
    tradePorts: ['孟买', '钦奈', '加尔各答'],
    businessHours: '周一至周六 10:00-18:00'
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
  {
    name: '墨西哥',
    nameEn: 'Mexico',
    capital: '墨西哥城',
    capitalEn: 'Mexico City',
    continent: 'northAmerica',
    iso2: 'MX',
    iso3: 'MEX',
    phoneCode: '+52',
    domain: '.mx',
    timezone: 'UTC-6 to UTC-8',
    currency: 'MXN',
    currencyName: '墨西哥比索',
    languages: ['西班牙语'],
    tradePorts: ['曼萨尼约', '拉萨罗卡德纳斯'],
    businessHours: '周一至周五 9:00-18:00'
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
    tradePorts: ['伦敦', '利物浦', '南安普顿'],
    businessHours: '周一至周五 9:00-17:00',
    holidays: ['新年', '复活节', '圣诞节', '节礼日']
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
    businessHours: '周一至周五 8:00-17:00',
    holidays: ['新年', '复活节', '劳动节', '圣诞节']
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
  {
    name: '意大利',
    nameEn: 'Italy',
    capital: '罗马',
    capitalEn: 'Rome',
    continent: 'europe',
    iso2: 'IT',
    iso3: 'ITA',
    phoneCode: '+39',
    domain: '.it',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['意大利语'],
    tradePorts: ['热那亚', '的里雅斯特'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '西班牙',
    nameEn: 'Spain',
    capital: '马德里',
    capitalEn: 'Madrid',
    continent: 'europe',
    iso2: 'ES',
    iso3: 'ESP',
    phoneCode: '+34',
    domain: '.es',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['西班牙语'],
    tradePorts: ['巴塞罗那', '瓦伦西亚'],
    businessHours: '周一至周五 9:00-14:00, 15:00-18:00'
  },
  {
    name: '俄罗斯',
    nameEn: 'Russia',
    capital: '莫斯科',
    capitalEn: 'Moscow',
    continent: 'europe',
    iso2: 'RU',
    iso3: 'RUS',
    phoneCode: '+7',
    domain: '.ru',
    timezone: 'UTC+3',
    currency: 'RUB',
    currencyName: '俄罗斯卢布',
    languages: ['俄语'],
    tradePorts: ['圣彼得堡', '新罗西斯克'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '巴西',
    nameEn: 'Brazil',
    capital: '巴西利亚',
    capitalEn: 'Brasília',
    continent: 'southAmerica',
    iso2: 'BR',
    iso3: 'BRA',
    phoneCode: '+55',
    domain: '.br',
    timezone: 'UTC-3 to UTC-5',
    currency: 'BRL',
    currencyName: '巴西雷亚尔',
    languages: ['葡萄牙语'],
    tradePorts: ['桑托斯', '里约热内卢'],
    businessHours: '周一至周五 8:00-18:00'
  },
  {
    name: '阿根廷',
    nameEn: 'Argentina',
    capital: '布宜诺斯艾利斯',
    capitalEn: 'Buenos Aires',
    continent: 'southAmerica',
    iso2: 'AR',
    iso3: 'ARG',
    phoneCode: '+54',
    domain: '.ar',
    timezone: 'UTC-3',
    currency: 'ARS',
    currencyName: '阿根廷比索',
    languages: ['西班牙语'],
    tradePorts: ['布宜诺斯艾利斯'],
    businessHours: '周一至周五 9:00-18:00'
  },
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
  },
  {
    name: '南非',
    nameEn: 'South Africa',
    capital: '比勒陀利亚',
    capitalEn: 'Pretoria',
    continent: 'africa',
    iso2: 'ZA',
    iso3: 'ZAF',
    phoneCode: '+27',
    domain: '.za',
    timezone: 'UTC+2',
    currency: 'ZAR',
    currencyName: '南非兰特',
    languages: ['英语', '南非荷兰语'],
    tradePorts: ['德班', '开普敦'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '埃及',
    nameEn: 'Egypt',
    capital: '开罗',
    capitalEn: 'Cairo',
    continent: 'africa',
    iso2: 'EG',
    iso3: 'EGY',
    phoneCode: '+20',
    domain: '.eg',
    timezone: 'UTC+2',
    currency: 'EGP',
    currencyName: '埃及镑',
    languages: ['阿拉伯语'],
    tradePorts: ['亚历山大', '塞得港'],
    businessHours: '周日至周四 8:00-16:00'
  }
]

export function searchCountries(query: string): Country[] {
  if (!query || !query.trim()) {
    return COUNTRIES
  }
  
  const searchTerm = query.toLowerCase().trim()
  
  return COUNTRIES.filter(country => {
    return (
      country.name.toLowerCase().includes(searchTerm) ||
      country.nameEn.toLowerCase().includes(searchTerm) ||
      country.iso2.toLowerCase() === searchTerm ||
      country.iso3.toLowerCase() === searchTerm ||
      country.phoneCode.includes(searchTerm) ||
      country.capital.toLowerCase().includes(searchTerm) ||
      country.capitalEn.toLowerCase().includes(searchTerm)
    )
  })
}

export function filterCountriesByContinent(continentKey: string): Country[] {
  if (!continentKey || continentKey === '') {
    return COUNTRIES
  }
  
  return COUNTRIES.filter(country => country.continent === continentKey)
}

export function getContinentOptions() {
  return Object.entries(CONTINENTS).map(([key, name]) => ({
    key,
    name
  }))
}
