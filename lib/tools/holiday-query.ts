// 名称: 节假日数据查询函数
// 描述: 提供各国公共节假日的查询与日期计算逻辑
// 路径: Globokit/lib/tools/holiday-query.ts
// 作者: Jensfrank
// 更新时间: 2026-07-06

import { COUNTRY_DATA, getFlagEmoji } from './global-country-info'
import { generatedHolidays2026, generatedHolidays2027 } from './holiday-query-generated'

export interface Country {
  name: string
  flag: string
  timezone: string
  currency: string
  region: string
}

export interface Holiday {
  date: string
  name: string
  localName?: string
  nameCN?: string
  type: 'public' | 'regional' | 'observance' | 'international'
  impact: 'high' | 'medium' | 'low'
  description?: string
}

export interface UpcomingHoliday extends Holiday {
  country: string
  flag: string
  daysUntil: number
}

export const SUPPORTED_HOLIDAY_YEARS = [2025, 2026, 2027] as const

function mergeHolidayRecords(
  generated: Record<string, Holiday[]>,
  curated: Record<string, Holiday[]> = {}
): Record<string, Holiday[]> {
  return {
    ...generated,
    ...curated,
  }
}

// 手工维护的贸易国家/地区数据（按业务地区分组）
const CURATED_COUNTRIES: Record<string, Country> = {
  // 北美
  US: { name: '美国', flag: '🇺🇸', timezone: 'America/New_York', currency: 'USD', region: '北美' },
  CA: { name: '加拿大', flag: '🇨🇦', timezone: 'America/Toronto', currency: 'CAD', region: '北美' },
  MX: { name: '墨西哥', flag: '🇲🇽', timezone: 'America/Mexico_City', currency: 'MXN', region: '北美' },
  
  // 西欧
  GB: { name: '英国', flag: '🇬🇧', timezone: 'Europe/London', currency: 'GBP', region: '西欧' },
  DE: { name: '德国', flag: '🇩🇪', timezone: 'Europe/Berlin', currency: 'EUR', region: '西欧' },
  FR: { name: '法国', flag: '🇫🇷', timezone: 'Europe/Paris', currency: 'EUR', region: '西欧' },
  IT: { name: '意大利', flag: '🇮🇹', timezone: 'Europe/Rome', currency: 'EUR', region: '西欧' },
  ES: { name: '西班牙', flag: '🇪🇸', timezone: 'Europe/Madrid', currency: 'EUR', region: '西欧' },
  NL: { name: '荷兰', flag: '🇳🇱', timezone: 'Europe/Amsterdam', currency: 'EUR', region: '西欧' },
  BE: { name: '比利时', flag: '🇧🇪', timezone: 'Europe/Brussels', currency: 'EUR', region: '西欧' },
  CH: { name: '瑞士', flag: '🇨🇭', timezone: 'Europe/Zurich', currency: 'CHF', region: '西欧' },
  AT: { name: '奥地利', flag: '🇦🇹', timezone: 'Europe/Vienna', currency: 'EUR', region: '西欧' },
  IE: { name: '爱尔兰', flag: '🇮🇪', timezone: 'Europe/Dublin', currency: 'EUR', region: '西欧' },
  LU: { name: '卢森堡', flag: '🇱🇺', timezone: 'Europe/Luxembourg', currency: 'EUR', region: '西欧' },
  
  // 北欧
  SE: { name: '瑞典', flag: '🇸🇪', timezone: 'UTC+1', currency: 'SEK', region: '北欧' },
  NO: { name: '挪威', flag: '🇳🇴', timezone: 'UTC+1', currency: 'NOK', region: '北欧' },
  DK: { name: '丹麦', flag: '🇩🇰', timezone: 'UTC+1', currency: 'DKK', region: '北欧' },
  FI: { name: '芬兰', flag: '🇫🇮', timezone: 'UTC+2', currency: 'EUR', region: '北欧' },
  IS: { name: '冰岛', flag: '🇮🇸', timezone: 'UTC+0', currency: 'ISK', region: '北欧' },
  
  // 南欧
  GR: { name: '希腊', flag: '🇬🇷', timezone: 'UTC+2', currency: 'EUR', region: '南欧' },
  PT: { name: '葡萄牙', flag: '🇵🇹', timezone: 'UTC+0', currency: 'EUR', region: '南欧' },
  MT: { name: '马耳他', flag: '🇲🇹', timezone: 'UTC+1', currency: 'EUR', region: '南欧' },
  CY: { name: '塞浦路斯', flag: '🇨🇾', timezone: 'UTC+2', currency: 'EUR', region: '南欧' },
  
  // 东欧
  PL: { name: '波兰', flag: '🇵🇱', timezone: 'UTC+1', currency: 'PLN', region: '东欧' },
  CZ: { name: '捷克', flag: '🇨🇿', timezone: 'UTC+1', currency: 'CZK', region: '东欧' },
  HU: { name: '匈牙利', flag: '🇭🇺', timezone: 'UTC+1', currency: 'HUF', region: '东欧' },
  RO: { name: '罗马尼亚', flag: '🇷🇴', timezone: 'UTC+2', currency: 'RON', region: '东欧' },
  BG: { name: '保加利亚', flag: '🇧🇬', timezone: 'UTC+2', currency: 'BGN', region: '东欧' },
  SK: { name: '斯洛伐克', flag: '🇸🇰', timezone: 'UTC+1', currency: 'EUR', region: '东欧' },
  HR: { name: '克罗地亚', flag: '🇭🇷', timezone: 'UTC+1', currency: 'EUR', region: '东欧' },
  SI: { name: '斯洛文尼亚', flag: '🇸🇮', timezone: 'UTC+1', currency: 'EUR', region: '东欧' },
  LT: { name: '立陶宛', flag: '🇱🇹', timezone: 'UTC+2', currency: 'EUR', region: '东欧' },
  LV: { name: '拉脱维亚', flag: '🇱🇻', timezone: 'UTC+2', currency: 'EUR', region: '东欧' },
  EE: { name: '爱沙尼亚', flag: '🇪🇪', timezone: 'UTC+2', currency: 'EUR', region: '东欧' },
  
  // 独联体
  RU: { name: '俄罗斯', flag: '🇷🇺', timezone: 'UTC+3', currency: 'RUB', region: '独联体' },
  UA: { name: '乌克兰', flag: '🇺🇦', timezone: 'UTC+2', currency: 'UAH', region: '独联体' },
  BY: { name: '白俄罗斯', flag: '🇧🇾', timezone: 'UTC+3', currency: 'BYN', region: '独联体' },
  KZ: { name: '哈萨克斯坦', flag: '🇰🇿', timezone: 'UTC+6', currency: 'KZT', region: '独联体' },
  
  // 东亚
  JP: { name: '日本', flag: '🇯🇵', timezone: 'UTC+9', currency: 'JPY', region: '东亚' },
  KR: { name: '韩国', flag: '🇰🇷', timezone: 'UTC+9', currency: 'KRW', region: '东亚' },
  HK: { name: '中国香港', flag: '🇭🇰', timezone: 'UTC+8', currency: 'HKD', region: '东亚' },
  TW: { name: '中国台湾', flag: '🇹🇼', timezone: 'UTC+8', currency: 'TWD', region: '东亚' },
  MO: { name: '中国澳门', flag: '🇲🇴', timezone: 'UTC+8', currency: 'MOP', region: '东亚' },
  
  // 东南亚
  SG: { name: '新加坡', flag: '🇸🇬', timezone: 'UTC+8', currency: 'SGD', region: '东南亚' },
  MY: { name: '马来西亚', flag: '🇲🇾', timezone: 'UTC+8', currency: 'MYR', region: '东南亚' },
  TH: { name: '泰国', flag: '🇹🇭', timezone: 'UTC+7', currency: 'THB', region: '东南亚' },
  ID: { name: '印度尼西亚', flag: '🇮🇩', timezone: 'UTC+7', currency: 'IDR', region: '东南亚' },
  PH: { name: '菲律宾', flag: '🇵🇭', timezone: 'UTC+8', currency: 'PHP', region: '东南亚' },
  VN: { name: '越南', flag: '🇻🇳', timezone: 'UTC+7', currency: 'VND', region: '东南亚' },
  MM: { name: '缅甸', flag: '🇲🇲', timezone: 'UTC+6:30', currency: 'MMK', region: '东南亚' },
  KH: { name: '柬埔寨', flag: '🇰🇭', timezone: 'UTC+7', currency: 'KHR', region: '东南亚' },
  LA: { name: '老挝', flag: '🇱🇦', timezone: 'UTC+7', currency: 'LAK', region: '东南亚' },
  BN: { name: '文莱', flag: '🇧🇳', timezone: 'UTC+8', currency: 'BND', region: '东南亚' },
  
  // 南亚
  IN: { name: '印度', flag: '🇮🇳', timezone: 'UTC+5:30', currency: 'INR', region: '南亚' },
  PK: { name: '巴基斯坦', flag: '🇵🇰', timezone: 'UTC+5', currency: 'PKR', region: '南亚' },
  BD: { name: '孟加拉国', flag: '🇧🇩', timezone: 'UTC+6', currency: 'BDT', region: '南亚' },
  LK: { name: '斯里兰卡', flag: '🇱🇰', timezone: 'UTC+5:30', currency: 'LKR', region: '南亚' },
  NP: { name: '尼泊尔', flag: '🇳🇵', timezone: 'UTC+5:45', currency: 'NPR', region: '南亚' },
  
  // 中东
  AE: { name: '阿联酋', flag: '🇦🇪', timezone: 'UTC+4', currency: 'AED', region: '中东' },
  SA: { name: '沙特阿拉伯', flag: '🇸🇦', timezone: 'UTC+3', currency: 'SAR', region: '中东' },
  IL: { name: '以色列', flag: '🇮🇱', timezone: 'UTC+2', currency: 'ILS', region: '中东' },
  TR: { name: '土耳其', flag: '🇹🇷', timezone: 'UTC+3', currency: 'TRY', region: '中东' },
  EG: { name: '埃及', flag: '🇪🇬', timezone: 'UTC+2', currency: 'EGP', region: '中东' },
  IR: { name: '伊朗', flag: '🇮🇷', timezone: 'UTC+3:30', currency: 'IRR', region: '中东' },
  IQ: { name: '伊拉克', flag: '🇮🇶', timezone: 'UTC+3', currency: 'IQD', region: '中东' },
  JO: { name: '约旦', flag: '🇯🇴', timezone: 'UTC+2', currency: 'JOD', region: '中东' },
  KW: { name: '科威特', flag: '🇰🇼', timezone: 'UTC+3', currency: 'KWD', region: '中东' },
  QA: { name: '卡塔尔', flag: '🇶🇦', timezone: 'UTC+3', currency: 'QAR', region: '中东' },
  BH: { name: '巴林', flag: '🇧🇭', timezone: 'UTC+3', currency: 'BHD', region: '中东' },
  OM: { name: '阿曼', flag: '🇴🇲', timezone: 'UTC+4', currency: 'OMR', region: '中东' },
  LB: { name: '黎巴嫩', flag: '🇱🇧', timezone: 'UTC+2', currency: 'LBP', region: '中东' },
  
  // 大洋洲
  AU: { name: '澳大利亚', flag: '🇦🇺', timezone: 'UTC+10', currency: 'AUD', region: '大洋洲' },
  NZ: { name: '新西兰', flag: '🇳🇿', timezone: 'UTC+12', currency: 'NZD', region: '大洋洲' },
  FJ: { name: '斐济', flag: '🇫🇯', timezone: 'UTC+12', currency: 'FJD', region: '大洋洲' },
  PG: { name: '巴布亚新几内亚', flag: '🇵🇬', timezone: 'UTC+10', currency: 'PGK', region: '大洋洲' },
  
  // 南美
  BR: { name: '巴西', flag: '🇧🇷', timezone: 'UTC-3', currency: 'BRL', region: '南美' },
  AR: { name: '阿根廷', flag: '🇦🇷', timezone: 'UTC-3', currency: 'ARS', region: '南美' },
  CL: { name: '智利', flag: '🇨🇱', timezone: 'UTC-3', currency: 'CLP', region: '南美' },
  CO: { name: '哥伦比亚', flag: '🇨🇴', timezone: 'UTC-5', currency: 'COP', region: '南美' },
  PE: { name: '秘鲁', flag: '🇵🇪', timezone: 'UTC-5', currency: 'PEN', region: '南美' },
  VE: { name: '委内瑞拉', flag: '🇻🇪', timezone: 'UTC-4', currency: 'VES', region: '南美' },
  EC: { name: '厄瓜多尔', flag: '🇪🇨', timezone: 'UTC-5', currency: 'USD', region: '南美' },
  UY: { name: '乌拉圭', flag: '🇺🇾', timezone: 'UTC-3', currency: 'UYU', region: '南美' },
  PY: { name: '巴拉圭', flag: '🇵🇾', timezone: 'UTC-3', currency: 'PYG', region: '南美' },
  BO: { name: '玻利维亚', flag: '🇧🇴', timezone: 'UTC-4', currency: 'BOB', region: '南美' },
  
  // 中美洲
  PA: { name: '巴拿马', flag: '🇵🇦', timezone: 'UTC-5', currency: 'PAB', region: '中美洲' },
  CR: { name: '哥斯达黎加', flag: '🇨🇷', timezone: 'UTC-6', currency: 'CRC', region: '中美洲' },
  GT: { name: '危地马拉', flag: '🇬🇹', timezone: 'UTC-6', currency: 'GTQ', region: '中美洲' },
  SV: { name: '萨尔瓦多', flag: '🇸🇻', timezone: 'UTC-6', currency: 'USD', region: '中美洲' },
  HN: { name: '洪都拉斯', flag: '🇭🇳', timezone: 'UTC-6', currency: 'HNL', region: '中美洲' },
  NI: { name: '尼加拉瓜', flag: '🇳🇮', timezone: 'UTC-6', currency: 'NIO', region: '中美洲' },
  
  // 加勒比
  CU: { name: '古巴', flag: '🇨🇺', timezone: 'UTC-5', currency: 'CUP', region: '加勒比' },
  DO: { name: '多米尼加', flag: '🇩🇴', timezone: 'UTC-4', currency: 'DOP', region: '加勒比' },
  JM: { name: '牙买加', flag: '🇯🇲', timezone: 'UTC-5', currency: 'JMD', region: '加勒比' },
  TT: { name: '特立尼达和多巴哥', flag: '🇹🇹', timezone: 'UTC-4', currency: 'TTD', region: '加勒比' },
  
  // 非洲
  ZA: { name: '南非', flag: '🇿🇦', timezone: 'UTC+2', currency: 'ZAR', region: '非洲' },
  NG: { name: '尼日利亚', flag: '🇳🇬', timezone: 'UTC+1', currency: 'NGN', region: '非洲' },
  KE: { name: '肯尼亚', flag: '🇰🇪', timezone: 'UTC+3', currency: 'KES', region: '非洲' },
  MA: { name: '摩洛哥', flag: '🇲🇦', timezone: 'UTC+1', currency: 'MAD', region: '非洲' },
  GH: { name: '加纳', flag: '🇬🇭', timezone: 'UTC+0', currency: 'GHS', region: '非洲' },
  ET: { name: '埃塞俄比亚', flag: '🇪🇹', timezone: 'UTC+3', currency: 'ETB', region: '非洲' },
  TZ: { name: '坦桑尼亚', flag: '🇹🇿', timezone: 'UTC+3', currency: 'TZS', region: '非洲' },
  UG: { name: '乌干达', flag: '🇺🇬', timezone: 'UTC+3', currency: 'UGX', region: '非洲' },
  DZ: { name: '阿尔及利亚', flag: '🇩🇿', timezone: 'UTC+1', currency: 'DZD', region: '非洲' },
  TN: { name: '突尼斯', flag: '🇹🇳', timezone: 'UTC+1', currency: 'TND', region: '非洲' },
  ZW: { name: '津巴布韦', flag: '🇿🇼', timezone: 'UTC+2', currency: 'ZWL', region: '非洲' },
  CM: { name: '喀麦隆', flag: '🇨🇲', timezone: 'UTC+1', currency: 'XAF', region: '非洲' },
  CI: { name: '科特迪瓦', flag: '🇨🇮', timezone: 'UTC+0', currency: 'XOF', region: '非洲' },
  SN: { name: '塞内加尔', flag: '🇸🇳', timezone: 'UTC+0', currency: 'XOF', region: '非洲' },
}

const COUNTRY_DATA_BY_ISO2 = new Map(COUNTRY_DATA.map((country) => [country.iso2, country]))

function getHolidayRegion(continent: string): string {
  const regionMap: Record<string, string> = {
    '亚洲': '亚洲',
    '欧洲': '欧洲',
    '欧洲/亚洲': '中东',
    '北美洲': '北美',
    '南美洲': '南美',
    '非洲': '非洲',
    '大洋洲': '大洋洲',
  }

  return regionMap[continent] || '其他'
}

function buildCountryDirectory(): Record<string, Country> {
  const directory: Record<string, Country> = {}

  for (const country of COUNTRY_DATA) {
    directory[country.iso2] = {
      name: country.name_cn,
      flag: getFlagEmoji(country.iso2),
      timezone: country.timezone,
      currency: country.currency_code,
      region: getHolidayRegion(country.continent_cn),
    }
  }

  for (const [code, country] of Object.entries(CURATED_COUNTRIES)) {
    const countryInfo = COUNTRY_DATA_BY_ISO2.get(code)
    directory[code] = {
      ...country,
      flag: countryInfo ? getFlagEmoji(code) : country.flag,
      timezone: countryInfo?.timezone || country.timezone,
      currency: countryInfo?.currency_code || country.currency,
      region: country.region,
    }
  }

  return Object.fromEntries(
    Object.entries(directory).sort(([, a], [, b]) => {
      const regionCompare = a.region.localeCompare(b.region, 'zh-CN')
      if (regionCompare !== 0) return regionCompare
      return a.name.localeCompare(b.name, 'zh-CN')
    })
  )
}

// 完整国家/地区目录：详细节假日来自下方数据，国家基础信息来自全局国家库补齐。
export const countries: Record<string, Country> = buildCountryDirectory()

// 国际热门节假日（全球性节日）
export const internationalHolidays: Holiday[] = [
  { date: '01-01', name: "New Year's Day", localName: '新年', type: 'international', impact: 'high', description: '全球大部分国家庆祝' },
  { date: '02-14', name: "Valentine's Day", localName: '情人节', type: 'international', impact: 'low', description: '全球商业节日' },
  { date: '03-08', name: "International Women's Day", localName: '国际妇女节', type: 'international', impact: 'medium', description: '部分国家法定假日' },
  { date: '03-17', name: "St. Patrick's Day", localName: '圣帕特里克节', type: 'international', impact: 'low', description: '爱尔兰传统节日，全球庆祝' },
  { date: '04-22', name: 'Earth Day', localName: '地球日', type: 'international', impact: 'low', description: '环保主题日' },
  { date: '05-01', name: 'Labour Day', localName: '劳动节', type: 'international', impact: 'high', description: '多数国家法定假日' },
  { date: '06-05', name: 'World Environment Day', localName: '世界环境日', type: 'international', impact: 'low', description: '联合国环境日' },
  { date: '10-24', name: 'United Nations Day', localName: '联合国日', type: 'international', impact: 'low', description: '纪念联合国成立' },
  { date: '10-31', name: 'Halloween', localName: '万圣节', type: 'international', impact: 'low', description: '西方国家流行' },
  { date: '11-11', name: "Singles' Day", localName: '双十一/光棍节', type: 'international', impact: 'medium', description: '全球最大购物节' },
  { date: '12-24', name: 'Christmas Eve', localName: '平安夜', type: 'international', impact: 'high', description: '基督教国家' },
  { date: '12-25', name: 'Christmas Day', localName: '圣诞节', type: 'international', impact: 'high', description: '西方最重要节日' },
  { date: '12-31', name: "New Year's Eve", localName: '除夕', type: 'international', impact: 'medium', description: '跨年夜' },
]

// 宗教节日（2025年具体日期）
export const religiousHolidays2025: Holiday[] = [
  // 基督教
  { date: '2025-01-06', name: 'Epiphany', localName: '主显节', type: 'observance', impact: 'medium', description: '基督教：纪念贤士朝拜圣婴' },
  { date: '2025-03-05', name: 'Ash Wednesday', localName: '圣灰星期三', type: 'observance', impact: 'low', description: '基督教：四旬期开始' },
  { date: '2025-04-13', name: 'Palm Sunday', localName: '棕枝主日', type: 'observance', impact: 'medium', description: '基督教：纪念耶稣进入耶路撒冷' },
  { date: '2025-04-18', name: 'Good Friday', localName: '耶稣受难日', type: 'observance', impact: 'high', description: '基督教：纪念耶稣受难' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: '复活节', type: 'observance', impact: 'high', description: '基督教：纪念耶稣复活' },
  { date: '2025-05-29', name: 'Ascension Day', localName: '耶稣升天节', type: 'observance', impact: 'medium', description: '基督教：纪念耶稣升天' },
  { date: '2025-06-08', name: 'Pentecost', localName: '圣灵降临节', type: 'observance', impact: 'medium', description: '基督教：纪念圣灵降临' },
  { date: '2025-11-01', name: 'All Saints Day', localName: '诸圣节', type: 'observance', impact: 'medium', description: '基督教：纪念所有圣徒' },

  // 伊斯兰教（注：伊斯兰历日期可能有1-2天偏差，以下日期为预测）
  { date: '2025-01-27', name: 'Isra and Mi\'raj', localName: '夜行登霄', type: 'observance', impact: 'medium', description: '伊斯兰教：纪念先知夜行与登霄' },
  { date: '2025-02-28', name: 'Ramadan Begins', localName: '斋月开始', type: 'observance', impact: 'high', description: '伊斯兰教：斋戒月开始' },
  { date: '2025-03-25', name: 'Laylat al-Qadr', localName: '盖德尔夜', type: 'observance', impact: 'high', description: '伊斯兰教：权力之夜，斋月最后十天中的奇数夜之一' },
  { date: '2025-03-30', name: 'Eid al-Fitr', localName: '开斋节', type: 'observance', impact: 'high', description: '伊斯兰教：斋月结束庆典' },
  { date: '2025-06-06', name: 'Eid al-Adha', localName: '宰牲节/古尔邦节', type: 'observance', impact: 'high', description: '伊斯兰教：献祭节' },
  { date: '2025-06-26', name: 'Muharram/Islamic New Year', localName: '伊斯兰新年', type: 'observance', impact: 'medium', description: '伊斯兰教：伊斯兰历新年' },
  { date: '2025-07-05', name: 'Ashura', localName: '阿舒拉节', type: 'observance', impact: 'medium', description: '伊斯兰教：什叶派纪念侯赛因殉难，逊尼派纪念诺亚方舟停泊等' },
  { date: '2025-09-04', name: 'Mawlid al-Nabi', localName: '圣纪节', type: 'observance', impact: 'medium', description: '伊斯兰教：先知穆罕默德诞辰' },

  // 印度教
  { date: '2025-01-14', name: 'Makar Sankranti', localName: '丰收节', type: 'observance', impact: 'medium', description: '印度教：太阳节，庆祝太阳进入摩羯座' },
  { date: '2025-02-26', name: 'Maha Shivaratri', localName: '湿婆节', type: 'observance', impact: 'high', description: '印度教：纪念湿婆神' }, // 新增
  { date: '2025-03-14', name: 'Holi', localName: '洒红节/胡里节', type: 'observance', impact: 'high', description: '印度教：色彩节，庆祝冬去春来' },
  { date: '2025-04-06', name: 'Ram Navami', localName: '罗摩诞辰', type: 'observance', impact: 'medium', description: '印度教：罗摩神诞辰' }, // 修正日期
  { date: '2025-08-16', name: 'Janmashtami', localName: '黑天诞辰', type: 'observance', impact: 'medium', description: '印度教：黑天神诞辰' },
  { date: '2025-08-27', name: 'Ganesh Chaturthi', localName: '象头神节', type: 'observance', impact: 'medium', description: '印度教：象头神诞辰' },
  { date: '2025-10-02', name: 'Navaratri Begins', localName: '九夜节开始', type: 'observance', impact: 'medium', description: '印度教：女神节，庆祝杜尔迦女神' },
  { date: '2025-10-12', name: 'Dussehra', localName: '十胜节', type: 'observance', impact: 'high', description: '印度教：庆祝罗摩战胜罗波那，或杜尔迦女神战胜水牛魔' },
  { date: '2025-11-01', name: 'Diwali', localName: '排灯节/万灯节', type: 'observance', impact: 'high', description: '印度教：光明节，庆祝正义战胜邪恶，光明战胜黑暗' },

  // 佛教
  // 注：农历新年（春节）虽然在东亚地区广泛庆祝，但在佛教中并非普遍性的宗教节日，更偏向文化节日。
  { date: '2025-01-29', name: 'Lunar New Year', localName: '农历新年/春节', type: 'observance', impact: 'high', description: '东亚：农历新年，多地华人与部分佛教徒庆祝的文化节日。' },
  { date: '2025-01-14', name: 'Mahayana New Year', localName: '大乘佛教新年', type: 'observance', impact: 'low', description: '佛教：大乘佛教新年' }, // 新增
  { date: '2025-02-15', name: 'Nirvana Day', localName: '涅槃节', type: 'observance', impact: 'medium', description: '佛教：纪念佛陀涅槃' }, // 新增
  { date: '2025-05-12', name: 'Vesak/Buddha Purnima', localName: '卫塞节/佛诞', type: 'observance', impact: 'high', description: '佛教：佛陀诞生、成道、涅槃的纪念日' },
  { date: '2025-07-10', name: 'Asalha Puja', localName: '阿莎叻哈节', type: 'observance', impact: 'medium', description: '佛教：纪念佛陀首次讲道，三宝（佛、法、僧）具足之日' }, // 修正日期
  { date: '2025-12-08', name: 'Bodhi Day', localName: '菩提日', type: 'observance', impact: 'medium', description: '佛教：纪念佛陀证悟成道' }, // 新增

  // 犹太教
  { date: '2025-03-13', name: 'Purim', localName: '普珥节', type: 'observance', impact: 'medium', description: '犹太教：纪念犹太人在波斯帝国时期摆脱灭族危机' }, // 新增
  { date: '2025-04-12', name: 'Passover Begins', localName: '逾越节开始', type: 'observance', impact: 'high', description: '犹太教：纪念以色列人出埃及' },
  { date: '2025-06-01', name: 'Shavuot', localName: '七七节', type: 'observance', impact: 'medium', description: '犹太教：纪念摩西在西奈山获得十诫，也是收获节' },
  { date: '2025-09-22', name: 'Rosh Hashanah', localName: '犹太新年', type: 'observance', impact: 'high', description: '犹太教：犹太历新年' },
  { date: '2025-10-01', name: 'Yom Kippur', localName: '赎罪日', type: 'observance', impact: 'high', description: '犹太教：最神圣的日子，用于忏悔和祈祷' },
  { date: '2025-10-06', name: 'Sukkot Begins', localName: '住棚节开始', type: 'observance', impact: 'medium', description: '犹太教：纪念以色列人在旷野漂流时住帐篷，也是收获感恩节' },
  { date: '2025-12-14', name: 'Hanukkah Begins', localName: '光明节开始', type: 'observance', impact: 'medium', description: '犹太教：灯节，纪念马卡比家族反抗希腊统治并洁净圣殿' },

  // 锡克教
  { date: '2025-01-13', name: 'Lohri', localName: '洛里节', type: 'observance', impact: 'low', description: '锡克教/印度教：冬季丰收节' },
  { date: '2025-04-14', name: 'Vaisakhi', localName: '丰收节', type: 'observance', impact: 'medium', description: '锡克教：新年和卡尔萨（Khalsa）的建立日' }, // 修正日期
  { date: '2025-11-05', name: 'Guru Nanak Jayanti', localName: '古鲁那纳克诞辰', type: 'observance', impact: 'high', description: '锡克教：锡克教创始人古鲁那纳克诞辰' }, // 修正日期

  // 东正教
  { date: '2025-01-07', name: 'Orthodox Christmas', localName: '东正教圣诞节', type: 'observance', impact: 'high', description: '东正教：圣诞节，遵循儒略历' },
  { date: '2025-04-20', name: 'Orthodox Palm Sunday', localName: '东正教棕枝主日', type: 'observance', impact: 'medium', description: '东正教：纪念耶稣进入耶路撒冷，遵循儒略历' }, // 新增
  { date: '2025-04-25', name: 'Orthodox Good Friday', localName: '东正教耶稣受难日', type: 'observance', impact: 'high', description: '东正教：纪念耶稣受难，遵循儒略历' }, // 新增
  { date: '2025-04-27', name: 'Orthodox Easter', localName: '东正教复活节', type: 'observance', impact: 'high', description: '东正教：复活节，遵循儒略历' },
  { date: '2025-06-05', name: 'Orthodox Ascension Day', localName: '东正教耶稣升天节', type: 'observance', impact: 'medium', description: '东正教：纪念耶稣升天，遵循儒略历' }, // 新增
  { date: '2025-06-15', name: 'Orthodox Pentecost', localName: '东正教圣灵降临节', type: 'observance', impact: 'medium', description: '东正教：纪念圣灵降临，遵循儒略历' }, // 新增

  // 巴哈伊信仰（Baha'i Faith） - 重要缺失
  // 巴哈伊历法每年有 19 个月，每月 19 天，外加 4 或 5 个闰日（Ayyám-i-Há）。
  // 节日日期会根据日历年而略有不同，以下为 2025 年的预测日期。
  { date: '2025-03-01', name: 'Ayyám-i-Há Ends', localName: '圣日节结束', type: 'observance', impact: 'low', description: '巴哈伊信仰：斋月前的闰日结束' }, // 修正日期，之前是 25 Feb-1 Mar
  { date: '2025-03-02', name: 'Fast Begins', localName: '斋戒月开始', type: 'observance', impact: 'high', description: '巴哈伊信仰：为期 19 天的斋戒月开始' }, // 修正日期
  { date: '2025-03-20', name: 'Naw-Rúz', localName: '新年', type: 'observance', impact: 'high', description: '巴哈伊信仰：巴哈伊新年，春分日' },
  { date: '2025-04-20', name: 'First Day of Ridván', localName: '里兹万节首日', type: 'observance', impact: 'high', description: '巴哈伊信仰：巴哈欧拉在里兹万花园宣示使命的第一天' },
  { date: '2025-04-28', name: 'Ninth Day of Ridván', localName: '里兹万节第九日', type: 'observance', impact: 'high', description: '巴哈伊信仰：巴哈欧拉的家人在里兹万花园与他会合' },
  { date: '2025-05-01', name: 'Twelfth Day of Ridván', localName: '里兹万节第十二日', type: 'observance', impact: 'high', description: '巴哈伊信仰：巴哈欧拉离开里兹万花园前往君士坦丁堡' },
  { date: '2025-05-23', name: 'Declaration of the Báb', localName: '巴布宣告日', type: 'observance', impact: 'high', description: '巴哈伊信仰：纪念巴布宣示其使命' },
  { date: '2025-05-28', name: 'Ascension of Baháʼuʼlláh', localName: '巴哈欧拉升天日', type: 'observance', impact: 'high', description: '巴哈伊信仰：纪念巴哈欧拉逝世' },
  { date: '2025-07-09', name: 'Martyrdom of the Báb', localName: '巴布殉道日', type: 'observance', impact: 'high', description: '巴哈伊信仰：纪念巴布殉道' },
  { date: '2025-10-22', name: 'Birth of the Báb', localName: '巴布诞辰', type: 'observance', impact: 'high', description: '巴哈伊信仰：纪念巴布诞辰' },
  { date: '2025-10-23', name: 'Birth of Baháʼuʼlláh', localName: '巴哈欧拉诞辰', type: 'observance', impact: 'high', description: '巴哈伊信仰：纪念巴哈欧拉诞辰' },
  { date: '2025-11-25', name: 'Day of the Covenant', localName: '圣约日', type: 'observance', impact: 'low', description: '巴哈伊信仰：纪念巴哈欧拉任命阿博都巴哈为继承人' },
  { date: '2025-11-27', name: 'Ascension of ʻAbduʼl-Bahá', localName: '阿博都巴哈升天日', type: 'observance', impact: 'high', description: '巴哈伊信仰：纪念阿博都巴哈逝世' },
];

// 节假日对外贸的影响说明
export const impactDescriptions = {
  high: '重大影响：政府机构、银行、大部分企业关闭，物流停运',
  medium: '中等影响：部分企业放假，物流可能延迟',
  low: '轻微影响：部分地区或行业放假，整体影响较小'
}

// 节假日数据生成函数（支持多年份）
export function generateHolidayData(year: number): Record<string, Holiday[]> {
  if (year === 2025) {
    return holidays2025
  }
  if (year === 2026) {
    return holidays2026
  }
  if (year === 2027) {
    return holidays2027
  }
  return {}
}

// 2025年各国节假日数据
export const holidays2025: Record<string, Holiday[]> = {

// North America
// United States 美国
US: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-20', name: 'Martin Luther King Jr. Day', localName: 'Martin Luther King Jr. Day', nameCN: '马丁·路德·金纪念日', type: 'public', impact: 'medium' },
  { date: '2025-02-17', name: 'Presidents\' Day', localName: 'Presidents\' Day', nameCN: '总统日', type: 'public', impact: 'medium' },
  { date: '2025-05-26', name: 'Memorial Day', localName: 'Memorial Day', nameCN: '阵亡将士纪念日', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Juneteenth', localName: 'Juneteenth National Independence Day', nameCN: '解放日', type: 'public', impact: 'medium' },
  { date: '2025-07-04', name: 'Independence Day', localName: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-09-01', name: 'Labor Day', localName: 'Labor Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'Columbus Day', localName: 'Columbus Day', nameCN: '哥伦布日', type: 'public', impact: 'low' },
  { date: '2025-11-11', name: 'Veterans Day', localName: 'Veterans Day', nameCN: '退伍军人节', type: 'public', impact: 'medium' },
  { date: '2025-11-27', name: 'Thanksgiving Day', localName: 'Thanksgiving Day', nameCN: '感恩节', type: 'public', impact: 'high' },
  { date: '2025-11-28', name: 'Black Friday', localName: 'Black Friday', nameCN: '黑色星期五', type: 'observance', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Canada 加拿大
CA: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '新年', type: 'public', impact: 'high' },
  { date: '2025-02-17', name: 'Family Day', localName: 'Family Day', nameCN: '家庭日', type: 'regional', impact: 'medium' }, // Most provinces
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'regional', impact: 'medium' }, // Some provinces
  { date: '2025-05-19', name: 'Victoria Day', localName: 'Victoria Day', nameCN: '维多利亚日', type: 'public', impact: 'medium' },
  { date: '2025-07-01', name: 'Canada Day', localName: 'Canada Day', nameCN: '加拿大日', type: 'public', impact: 'high' },
  { date: '2025-08-04', name: 'Civic Holiday', localName: 'Civic Holiday', nameCN: '公民假日', type: 'regional', impact: 'low' }, // Most provinces, names vary
  { date: '2025-09-01', name: 'Labour Day', localName: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-09-30', name: 'National Day for Truth and Reconciliation', localName: 'National Day for Truth and Reconciliation', nameCN: '真相与和解日', type: 'public', impact: 'medium' },
  { date: '2025-10-13', name: 'Thanksgiving', localName: 'Thanksgiving Day', nameCN: '感恩节', type: 'public', impact: 'high' },
  { date: '2025-11-11', name: 'Remembrance Day', localName: 'Remembrance Day', nameCN: '纪念日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],

// Mexico 墨西哥
MX: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '新年', type: 'public', impact: 'high' },
  { date: '2025-02-03', name: 'Día de la Constitución', localName: 'Día de la Constitución', nameCN: '宪法日', type: 'public', impact: 'medium' },
  { date: '2025-03-17', name: 'Natalicio de Benito Juárez', localName: 'Natalicio de Benito Juárez', nameCN: '贝尼托·华雷斯诞辰', type: 'public', impact: 'medium' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'observance', impact: 'low' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-09-16', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-11-17', name: 'Día de la Revolución', localName: 'Día de la Revolución', nameCN: '革命日', type: 'public', impact: 'medium' },
  { date: '2025-12-01', name: 'Transmisión del Poder Ejecutivo Federal', localName: 'Transmisión del Poder Ejecutivo Federal', nameCN: '总统就职日', type: 'public', impact: 'low' }, // 每6年举行
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Western Europe
// United Kingdom 英国
GB: [
  { date: '2025-01-01', name: "New Year's Day", localName: "New Year's Day", nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: 'Early May Bank Holiday', localName: 'Early May Bank Holiday', nameCN: '五月初银行假日', type: 'public', impact: 'medium' },
  { date: '2025-05-26', name: 'Spring Bank Holiday', localName: 'Spring Bank Holiday', nameCN: '春季银行假日', type: 'public', impact: 'medium' },
  { date: '2025-08-25', name: 'Summer Bank Holiday', localName: 'Summer Bank Holiday', nameCN: '夏季银行假日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],

// Germany 德国
DE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neujahr', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Karfreitag', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ostermontag', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Tag der Arbeit', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Christi Himmelfahrt', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pfingstmontag', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-10-03', name: 'German Unity Day', localName: 'Tag der Deutschen Einheit', nameCN: '德国统一日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Erster Weihnachtstag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Zweiter Weihnachtstag', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// France 法国
FR: [
  { date: '2025-01-01', name: "New Year's Day", localName: "Jour de l'An", nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Lundi de Pâques', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Fête du Travail', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Victory in Europe Day', localName: 'Victoire 1945', nameCN: '欧洲胜利日', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Ascension', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Lundi de Pentecôte', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-07-14', name: 'Bastille Day', localName: 'Fête Nationale', nameCN: '巴士底日（法国国庆日）', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Assomption', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Toussaint', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Armistice Day', localName: 'Armistice 1918', nameCN: '停战日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Noël', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Italy 意大利
IT: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Capodanno', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Epifania', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: "Lunedì dell'Angelo", nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-25', name: 'Liberation Day', localName: 'Festa della Liberazione', nameCN: '解放日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Festa del Lavoro', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Republic Day', localName: 'Festa della Repubblica', nameCN: '共和国日', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Ferragosto', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Ognissanti', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Immacolata Concezione', nameCN: '圣母无染原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Natale', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Santo Stefano', nameCN: '圣斯德望日', type: 'public', impact: 'high' }
],

// Spain 西班牙
ES: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Día de Reyes / Epifanía del Señor', nameCN: '三王节（主显节）', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Asunción de la Virgen', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-10-12', name: 'National Day of Spain', localName: 'Fiesta Nacional de España', nameCN: '西班牙国庆日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Día de Todos los Santos', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Constitution Day', localName: 'Día de la Constitución Española', nameCN: '宪法日', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Inmaculada Concepción', nameCN: '圣母无染原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Netherlands 荷兰
NL: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nieuwjaarsdag', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Goede Vrijdag', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Eerste Paasdag', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Tweede Paasdag', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-26', name: "King's Day", localName: 'Koningsdag', nameCN: '国王日', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Liberation Day', localName: 'Bevrijdingsdag', nameCN: '解放日', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Hemelvaartsdag', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Eerste Pinksterdag', nameCN: '圣灵降临节星期日', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Tweede Pinksterdag', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Eerste Kerstdag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Tweede Kerstdag', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Belgium 比利时
BE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nieuwjaar', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Paasmaandag', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Dag van de Arbeid', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'O.L.H. Hemelvaart', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pinkstermaandag', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-07-21', name: 'Belgian National Day', localName: 'Nationale feestdag', nameCN: '比利时国庆日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Onze Lieve Vrouw Hemelvaart', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Allerheiligen', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Armistice Day', localName: 'Wapenstilstand', nameCN: '停战日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Kerstmis', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Switzerland 瑞士
CH: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neujahr', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Karfreitag', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ostermontag', nameCN: '复活节星期一', type: 'regional', impact: 'medium' }, // Not all cantons
  { date: '2025-05-01', name: 'Labour Day', localName: 'Tag der Arbeit', nameCN: '劳动节', type: 'regional', impact: 'medium' }, // Not all cantons
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Auffahrt', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pfingstmontag', nameCN: '圣灵降临节星期一', type: 'regional', impact: 'medium' }, // Not all cantons
  { date: '2025-08-01', name: 'Swiss National Day', localName: 'Nationalfeiertag', nameCN: '瑞士国庆日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Weihnachten', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Stephanstag', nameCN: '圣斯德望日', type: 'regional', impact: 'medium' } // Not all cantons
],

// Austria 奥地利
AT: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neujahr', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Heilige Drei Könige', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ostermontag', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Staatsfeiertag', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Christi Himmelfahrt', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pfingstmontag', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Fronleichnam', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Mariä Himmelfahrt', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-10-26', name: 'Austrian National Day', localName: 'Nationalfeiertag', nameCN: '奥地利国庆日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Allerheiligen', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Mariä Empfängnis', nameCN: '圣母无染原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christtag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Stefanitag', nameCN: '圣斯德望日', type: 'public', impact: 'high' }
],

// Ireland 爱尔兰
IE: [
  { date: '2025-01-01', name: "New Year's Day", localName: "New Year's Day", nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-17', name: "St. Patrick's Day", localName: "St. Patrick's Day", nameCN: '圣帕特里克节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: 'May Bank Holiday', localName: 'May Bank Holiday', nameCN: '五月银行假日', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'June Bank Holiday', localName: 'June Bank Holiday', nameCN: '六月银行假日', type: 'public', impact: 'medium' },
  { date: '2025-08-04', name: 'August Bank Holiday', localName: 'August Bank Holiday', nameCN: '八月银行假日', type: 'public', impact: 'medium' },
  { date: '2025-10-27', name: 'October Bank Holiday', localName: 'October Bank Holiday', nameCN: '十月银行假日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: "St. Stephen's Day", localName: "St. Stephen's Day", nameCN: '圣斯德望日', type: 'public', impact: 'high' }
],

// Luxembourg 卢森堡
LU: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neijoerschdag', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ouschterméindeg', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Dag vun der Aarbecht', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Europe Day', localName: 'Europadag', nameCN: '欧洲日', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Ascension', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Péngschtméindeg', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-06-23', name: 'Luxembourg National Day', localName: 'Nationalfeierdag', nameCN: '卢森堡国庆日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Léiffrawëschdag', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Allerhellgen', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Chrëschtdag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Stiefesdag', nameCN: '节礼日', type: 'public', impact: 'high' }
],

// Northern Europe
// Sweden 瑞典
SE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nyårsdagen', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Trettondedag jul', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Långfredagen', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Påskdagen', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Annandag påsk', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Första maj', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kristi himmelsfärds dag', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-06', name: 'Sweden National Day', localName: 'Sveriges nationaldag', nameCN: '瑞典国庆日', type: 'public', impact: 'high' },
  { date: '2025-06-21', name: 'Midsummer Day', localName: 'Midsommardagen', nameCN: '仲夏节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Alla helgons dag', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Juldagen', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Annandag jul', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Norway 挪威
NO: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Første nyttårsdag', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Skjærtorsdag', nameCN: '濯足节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Langfredag', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Første påskedag', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Andre påskedag', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Arbeidernes internasjonale kampdag', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-17', name: 'Constitution Day', localName: 'Grunnlovsdagen', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kristi Himmelfartsdag', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Første pinsedag', nameCN: '圣灵降临节星期日', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Andre pinsedag', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Første juledag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Andre juledag', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Denmark 丹麦
DK: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nytårsdag', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Skærtorsdag', nameCN: '濯足节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Langfredag', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Påskedag', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Anden påskedag', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-16', name: 'Great Prayer Day', localName: 'Store Bededag', nameCN: '大祈祷日', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kristi Himmelfartsdag', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Pinsedag', nameCN: '圣灵降临节星期日', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Anden Pinsedag', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Juledag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Anden Juledag', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Finland 芬兰
FI: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Uudenvuodenpäivä', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Loppiainen', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Pitkäperjantai', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Pääsiäissunnuntai', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Toinen pääsiäispäivä', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'May Day', localName: 'Vappu', nameCN: '五一节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Helatorstai', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Helluntaipäivä', nameCN: '圣灵降临节星期日', type: 'public', impact: 'high' },
  { date: '2025-06-21', name: 'Midsummer Day', localName: 'Juhannuspäivä', nameCN: '仲夏节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Pyhäinpäivä', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Independence Day', localName: 'Itsenäisyyspäivä', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Joulupäivä', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Tapaninpäivä', nameCN: '圣塔帕尼日', type: 'public', impact: 'high' }
],

// Iceland 冰岛
IS: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nýársdagur', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Skírdagur', nameCN: '濯足节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Föstudagurinn langi', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Annar í páskum', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-24', name: 'First Day of Summer', localName: 'Sumardagurinn fyrsti', nameCN: '夏季第一天', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Verkalýðsdagurinn', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Uppstigningardagur', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Annar í hvítasunnu', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-06-17', name: 'National Day', localName: 'Lýðveldisdagurinn', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-08-04', name: 'Commerce Day', localName: 'Frídagur verslunarmanna', nameCN: '商人假日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Jóladagur', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Annar í jólum', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Southern Europe
// Greece 希腊
GR: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Πρωτοχρονιά', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Θεοφάνεια', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Clean Monday', localName: 'Καθαρά Δευτέρα', nameCN: '洁净星期一', type: 'public', impact: 'medium' },
  { date: '2025-03-25', name: 'Independence Day', localName: 'Εικοστή Πέμπτη Μαρτίου', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Μεγάλη Παρασκευή', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Κυριακή του Πάσχα', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Δευτέρα του Πάσχα', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Εργατική Πρωτομαγιά', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Δευτέρα του Πεντηκοστής', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Κοίμηση της Θεοτόκου', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-10-28', name: 'Ohi Day', localName: 'Ημέρα του Όχι', nameCN: '不服从日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Χριστούγεννα', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Επόμενη ημέρα Χριστουγέννων', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Portugal 葡萄牙
PT: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Ano Novo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-04', name: 'Carnival', localName: 'Carnaval', nameCN: '狂欢节', type: 'observance', impact: 'low' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Sexta-feira Santa', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Domingo de Páscoa', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-25', name: 'Freedom Day', localName: 'Dia da Liberdade', nameCN: '自由日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Dia do Trabalhador', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-10', name: 'Portugal Day', localName: 'Dia de Portugal', nameCN: '葡萄牙日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Assunção da Virgem', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-10-05', name: 'Republic Day', localName: 'Dia da República', nameCN: '共和国日', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints\' Day', localName: 'Dia de Todos os Santos', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-01', name: 'Restoration of Independence', localName: 'Restauração da Independência', nameCN: '独立恢复日', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Imaculada Conceição', nameCN: '圣母无染原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Natal', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Malta 马耳他
MT: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Jum il-Bidu tal-Isem il-Ġdid', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-10', name: 'Feast of Shipwreck of St. Paul', localName: 'Festa tal-Ġenieqed ta\' San Pawl', nameCN: '圣保罗海难节', type: 'public', impact: 'medium' },
  { date: '2025-03-19', name: 'Feast of St. Joseph', localName: 'Festa ta\' San Ġużepp', nameCN: '圣约瑟夫节', type: 'public', impact: 'medium' },
  { date: '2025-03-31', name: 'Freedom Day', localName: 'Jum il-Ħelsien', nameCN: '自由日', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Il-Ġimgħa l-Kbira', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Jum il-Ħaddiem', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-07', name: 'Sette Giugno', localName: 'Sette Giugno', nameCN: '六月七日事件纪念日', type: 'public', impact: 'medium' },
  { date: '2025-06-29', name: 'Feast of St. Peter and St. Paul', localName: 'Festa ta\' San Pietru u San Pawl', nameCN: '圣彼得和圣保罗节', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Assunzjoni tal-Virġin', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-09-08', name: 'Feast of Our Lady of Victories', localName: 'Festa tal-Madonna tal-Vittorji', nameCN: '胜利圣母节', type: 'public', impact: 'medium' },
  { date: '2025-09-21', name: 'Independence Day', localName: 'Jum l-Indipendenza', nameCN: '独立日', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Konċizzjoni Immakulata', nameCN: '圣母无染原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-13', name: 'Republic Day', localName: 'Jum ir-Repubblika', nameCN: '共和国日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Il-Milied', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Cyprus 塞浦路斯
CY: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Πρωτοχρονιά', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Θεοφάνεια', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Green Monday', localName: 'Πράσινη Δευτέρα', nameCN: '绿色星期一', type: 'public', impact: 'medium' },
  { date: '2025-03-25', name: 'Greek Independence Day', localName: 'Εικοστή Πέμπτη Μαρτίου', nameCN: '希腊独立日', type: 'public', impact: 'high' },
  { date: '2025-04-01', name: 'National Day', localName: 'Εθνική Ημέρα', nameCN: '国庆日', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Μεγάλη Παρασκευή', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Κυριακή του Πάσχα', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Δευτέρα του Πάσχα', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Εργατική Πρωτομαγιά', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Pentecost Monday', localName: 'Δευτέρα του Πεντηκοστής', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Κοίμηση της Θεοτόκου', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-10-01', name: 'Cyprus Independence Day', localName: 'Ημέρα Ανεξαρτησίας Κύπρου', nameCN: '塞浦路斯独立日', type: 'public', impact: 'high' },
  { date: '2025-10-28', name: 'Ohi Day', localName: 'Ημέρα του Όχι', nameCN: '不服从日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Χριστούγεννα', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Επόμενη ημέρα Χριστουγέννων', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Eastern Europe
// Poland 波兰
PL: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nowy Rok', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Święto Trzech Króli', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Niedziela Wielkanocna', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Poniedziałek Wielkanocny', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Święto Pracy', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-03', name: 'Constitution Day', localName: 'Święto Konstytucji 3 Maja', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-06-08', name: 'Pentecost', localName: 'Zielone Świątki', nameCN: '圣灵降临节', type: 'public', impact: 'medium' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Boże Ciało', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Wniebowzięcie Najświętszej Maryi Panny', nameCN: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Wszystkich Świętych', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Independence Day', localName: 'Dzień Niepodległości', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Boże Narodzenie', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Drugi Dzień Bożego Narodzenia', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Czech Republic 捷克
CZ: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nový rok', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Velký pátek', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Velikonoční pondělí', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Svátek práce', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Liberation Day', localName: 'Den osvobození', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-07-05', name: 'St. Cyril and Methodius Day', localName: 'Den slovanských věrozvěstů Cyrila a Metoděje', nameCN: '圣西里尔和美多德日', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Jan Hus Day', localName: 'Den upálení mistra Jana Husa', nameCN: '扬·胡斯日', type: 'public', impact: 'medium' },
  { date: '2025-09-28', name: 'Czech Statehood Day', localName: 'Den české státnosti', nameCN: '捷克国家日', type: 'public', impact: 'high' },
  { date: '2025-10-28', name: 'Independence Day', localName: 'Den vzniku samostatné československé státnosti', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-11-17', name: 'Freedom Day', localName: 'Den boje za svobodu a demokracii', nameCN: '自由日', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Christmas Eve', localName: 'Štědrý den', nameCN: '平安夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: '1. svátek vánoční', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: '2. svátek vánoční', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Hungary 匈牙利
HU: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Újév', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-15', name: 'National Day', localName: 'Nemzeti ünnep', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Húsvéti hétfő', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Munkásnap', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pünkösd hétfő', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-08-20', name: 'St. Stephen Day', localName: 'Szent István napja', nameCN: '圣斯蒂芬日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'National Day', localName: '1956-os forradalom és szabadságharc napja', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Mindenszentek napja', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Karácsony', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Karácsony másnapja', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Romania 罗马尼亚
RO: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Anul Nou', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", localName: 'Al doilea zi de Anul Nou', nameCN: '元旦次日', type: 'public', impact: 'high' },
  { date: '2025-01-24', name: 'Union Day', localName: 'Ziua Unirii', nameCN: '统一日', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Duminica de Paște', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Luni de Paște', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Ziua Muncii', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-01', name: "Children's Day", localName: 'Ziua Copilului', nameCN: '儿童节', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Pentecost', localName: 'Rusalii', nameCN: '圣灵降临节', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Luni de Rusalii', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Adormirea Maicii Domnului', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-11-30', name: 'St. Andrew Day', localName: 'Sfântul Andrei', nameCN: '圣安德鲁日', type: 'public', impact: 'medium' },
  { date: '2025-12-01', name: 'National Day', localName: 'Ziua Națională', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Crăciun', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Al doilea zi de Crăciun', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Bulgaria 保加利亚
BG: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Нова година', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Liberation Day', localName: 'Ден на Освобождението', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Велики петък', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Велика неделя', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Велики понеделник', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Ден на труда', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'St. George Day', localName: 'Гергьовден', nameCN: '圣乔治日', type: 'public', impact: 'high' },
  { date: '2025-05-24', name: 'Cyril and Methodius Day', localName: 'Ден на Кирил и Методий', nameCN: '西里尔和美多德日', type: 'public', impact: 'high' },
  { date: '2025-09-06', name: 'Unification Day', localName: 'Ден на Съединението', nameCN: '统一日', type: 'public', impact: 'high' },
  { date: '2025-09-22', name: 'Independence Day', localName: 'Ден на Независимостта', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-24', name: 'Christmas Eve', localName: 'Бъдни вечер', nameCN: '平安夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Рождество Христово', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Рождество Христово (второ)', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Slovakia 斯洛伐克
SK: [
  { date: '2025-01-01', name: 'Slovak Republic Day', localName: 'Deň vzniku Slovenskej republiky', nameCN: '斯洛伐克共和国日', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Zjavenie Pána', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Veľký piatok', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Veľkonočný pondelok', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Sviatok práce', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Liberation Day', localName: 'Deň osvobozenia', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-07-05', name: 'St. Cyril and Methodius Day', localName: 'Sviatok svätých Cyrila a Metoda', nameCN: '圣西里尔和美多德日', type: 'public', impact: 'medium' },
  { date: '2025-08-29', name: 'Slovak National Uprising Day', localName: 'Deň Slovenského národného povstania', nameCN: '斯洛伐克民族起义日', type: 'public', impact: 'high' },
  { date: '2025-09-01', name: 'Constitution Day', localName: 'Deň Ústavy Slovenskej republiky', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Our Lady of Sorrows Day', localName: 'Sviatok Panny Márie Sedembolestnej', nameCN: '圣母七苦日', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Sviatok všetkých svätých', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-17', name: 'Freedom Day', localName: 'Deň boja za slobodu a demokraciu', nameCN: '自由日', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Christmas Eve', localName: 'Štedrý deň', nameCN: '平安夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Prvý sviatok vianočný', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Druhý sviatok vianočný', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Croatia 克罗地亚
HR: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nova godina', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Bogojavljenje', nameCN: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Uskrs', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Uskrsni ponedjeljak', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Dan rada', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Tijelca i krvi Isusa Krista', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-06-22', name: 'Anti-Fascist Struggle Day', localName: 'Dan antifašističke borbe', nameCN: '反法西斯斗争日', type: 'public', impact: 'high' },
  { date: '2025-06-25', name: 'Statehood Day', localName: 'Dan državnosti', nameCN: '国家日', type: 'public', impact: 'high' },
  { date: '2025-08-05', name: 'Victory Day', localName: 'Dan pobjede i domovinske zahvalnosti', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Velika Gospa', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Svi svetci', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-18', name: 'Remembrance Day', localName: 'Dan sjećanja na žrtve Domovinskog rata', nameCN: '纪念日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Božić', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Sveti Stjepan', nameCN: '圣斯德望日', type: 'public', impact: 'high' }
],

// Slovenia 斯洛文尼亚
SI: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nova leto', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", localName: 'Drugi dan novega leta', nameCN: '元旦次日', type: 'public', impact: 'high' },
  { date: '2025-02-08', name: 'Prešeren Day', localName: 'Prešernov dan', nameCN: '普雷舍伦日', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Velikonočni ponedeljek', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-27', name: 'Day of Uprising', localName: 'Dan upora proti okupatorju', nameCN: '反占领起义日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Praznik dela', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-02', name: 'Labour Day (Second Day)', localName: 'Drugi dan praznika dela', nameCN: '劳动节次日', type: 'public', impact: 'high' },
  { date: '2025-06-08', name: 'Pentecost', localName: 'Binkoštna nedelja', nameCN: '圣灵降临节', type: 'public', impact: 'medium' },
  { date: '2025-06-25', name: 'Statehood Day', localName: 'Dan državnosti', nameCN: '国家日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Marijino vnebovzetje', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-10-31', name: 'Reformation Day', localName: 'Dan reformacije', nameCN: '宗教改革日', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'Remembrance Day', localName: 'Dan spomina na mrtve', nameCN: '亡灵纪念日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Božič', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Independence Day', localName: 'Dan neodvisnosti', nameCN: '独立日', type: 'public', impact: 'high' }
],

// Lithuania 立陶宛
LT: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Naujieji metai', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-16', name: 'Restoration of the State Day', localName: 'Lietuvos valstybės atkūrimo diena', nameCN: '国家恢复日', type: 'public', impact: 'high' },
  { date: '2025-03-11', name: 'Restoration of Independence Day', localName: 'Lietuvos nepriklausomybės atkūrimo diena', nameCN: '独立恢复日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Velykos', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Velykų antroji diena', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Darbo diena', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Midsummer Day', localName: 'Joninės', nameCN: '仲夏节', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Statehood Day', localName: 'Valstybės diena', nameCN: '国家日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Šv. Mergelės Marijos ėmimo į dangų diena', nameCN: '圣母升天节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Visų šventųjų diena', nameCN: '诸圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'All Souls Day', localName: 'Mirusiųjų atminimo diena', nameCN: '万灵节', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Christmas Eve', localName: 'Kūčios', nameCN: '平安夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Kalėdos', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Kalėdų antroji diena', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// Latvia 拉脱维亚
LV: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Jaunais gads', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-31', name: 'Good Friday', localName: 'Lielā pieteika', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Lieldienas', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Otrās Lieldienas', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Darba diena', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-04', name: 'Independence Declaration Day', localName: 'Neatkarības deklarācijas diena', nameCN: '独立宣言日', type: 'public', impact: 'high' },
  { date: '2025-06-23', name: 'Midsummer Eve', localName: 'Jāņi', nameCN: '仲夏夜', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Midsummer Day', localName: 'Jāņu diena', nameCN: '仲夏节', type: 'public', impact: 'high' },
  { date: '2025-11-18', name: 'Proclamation Day', localName: 'Latvijas Republikas proklamēšanas diena', nameCN: '共和国宣告日', type: 'public', impact: 'high' },
  { date: '2025-12-24', name: 'Christmas Eve', localName: 'Ziemassvētku vakars', nameCN: '平安夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Ziemassvētki', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Otrie Ziemassvētki', nameCN: '圣诞节次日', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: "New Year's Eve", localName: 'Vecgada vakars', nameCN: '新年前夜', type: 'public', impact: 'high' }
],

// Estonia 爱沙尼亚
EE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Uus aasta', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-24', name: 'Independence Day', localName: 'Iseseisvuspäev', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Suur reede', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Ülestõusmispühade pühapäev', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Spring Day', localName: 'Kevadpüha', nameCN: '春日', type: 'public', impact: 'high' },
  { date: '2025-06-23', name: 'Victory Day', localName: 'Võidupüha', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Midsummer Day', localName: 'Jaanipäev', nameCN: '仲夏节', type: 'public', impact: 'high' },
  { date: '2025-08-20', name: 'Restoration of Independence Day', localName: 'Iseseisvuse taastamise päev', nameCN: '独立恢复日', type: 'public', impact: 'high' },
  { date: '2025-12-24', name: 'Christmas Eve', localName: 'Jõuluvana', nameCN: '平安夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Esimene jõulupäev', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Teine jõulupäev', nameCN: '圣诞节次日', type: 'public', impact: 'high' }
],

// CIS (Commonwealth of Independent States)
// Russia 俄罗斯
RU: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Новый год', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: 'New Year Holidays', localName: 'Новогодние каникулы', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-01-03', name: 'New Year Holidays', localName: 'Новогодние каникулы', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-01-04', name: 'New Year Holidays', localName: 'Новогодние каникулы', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-01-05', name: 'New Year Holidays', localName: 'Новогодние каникулы', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Orthodox Christmas Eve', localName: 'Святой вечер', nameCN: '东正教平安夜', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', localName: 'Рождество Христово', nameCN: '东正教圣诞节', type: 'public', impact: 'high' },
  { date: '2025-02-23', name: 'Defender of the Fatherland Day', localName: 'День защитника Отечества', nameCN: '祖国保卫者日', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "International Women's Day", localName: 'Международный женский день', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Spring and Labour Day', localName: 'День весны и труда', nameCN: '春天与劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', localName: 'День победы', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-06-12', name: 'Russia Day', localName: 'День России', nameCN: '俄罗斯日', type: 'public', impact: 'high' },
  { date: '2025-11-04', name: 'National Unity Day', localName: 'День народного единства', nameCN: '民族统一日', type: 'public', impact: 'high' }
],

// Ukraine 乌克兰
UA: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Новий рік', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', localName: 'Різдво Христове', nameCN: '东正教圣诞节', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "International Women's Day", localName: 'Міжнародний жіночий день', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Великдень', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'День праці', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', localName: 'День перемоги', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-06-08', name: 'Trinity Sunday', localName: 'Трійця', nameCN: '三位一体主日', type: 'public', impact: 'high' },
  { date: '2025-06-28', name: 'Constitution Day', localName: 'День Конституції України', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-08-24', name: 'Independence Day', localName: 'День незалежності України', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-14', name: 'Defenders Day', localName: 'День захисників України', nameCN: '保卫者日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Різдво', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Belarus 白俄罗斯
BY: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Новы год', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", localName: 'Другі дзень Новага года', nameCN: '元旦次日', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', localName: 'Хрыстовае Растваэнне', nameCN: '东正教圣诞节', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "Women's Day", localName: 'Дзень жанчын', nameCN: '妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Orthodox Easter', localName: 'Вялікідзень', nameCN: '东正教复活节', type: 'public', impact: 'high' },
  { date: '2025-04-29', name: 'Radunica', localName: 'Радуніка', nameCN: '拉杜尼察节', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Дзень працы', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', localName: 'Дзень перамогі', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-07-03', name: 'Independence Day', localName: 'Дзень Незалежнасці', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-11-07', name: 'October Revolution Day', localName: 'Дзень Кастрычніцкай рэвалюцыі', nameCN: '十月革命纪念日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Catholic Christmas', localName: 'Каталіцкае Растваэнне', nameCN: '天主教圣诞节', type: 'public', impact: 'high' }
],

// Kazakhstan 哈萨克斯坦
KZ: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Жаңа жыл', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", localName: 'Жаңа жылдың екінші күні', nameCN: '元旦次日', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', localName: 'Православный Рождество', nameCN: '东正教圣诞节', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "International Women's Day", localName: 'Халықаралық әйелдер күнi', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-03-21', name: 'Nauryz', localName: 'Наурыз мейрамы', nameCN: '纳乌鲁斯节', type: 'public', impact: 'high' },
  { date: '2025-03-22', name: 'Nauryz (Second Day)', localName: 'Наурыздың екінші күні', nameCN: '纳乌鲁斯节次日', type: 'public', impact: 'high' },
  { date: '2025-03-23', name: 'Nauryz (Third Day)', localName: 'Наурыздың үшінші күні', nameCN: '纳乌鲁斯节第三日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Unity Day', localName: 'Бірлігі күні', nameCN: '团结日', type: 'public', impact: 'high' },
  { date: '2025-05-07', name: 'Defender of the Fatherland Day', localName: 'Отеңдік қорғаушы күні', nameCN: '祖国保卫者日', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', localName: 'Қалай күні', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-06-01', name: 'Eid al-Fitr', localName: 'Рамазан айырымдары', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-07-06', name: 'Capital Day', localName: 'Қала күні', nameCN: '首都日', type: 'public', impact: 'high' },
  { date: '2025-08-30', name: 'Constitution Day', localName: 'Құқық күні', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-10-25', name: 'Republic Day', localName: 'Республика күні', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-12-16', name: 'Independence Day', localName: 'Тәуелсіздік күні', nameCN: '独立日', type: 'public', impact: 'high' }
],

// East Asia
// Japan 日本
JP: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: '元日', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-13', name: 'Coming of Age Day', localName: '成人の日', nameCN: '成人节', type: 'public', impact: 'medium' },
  { date: '2025-02-11', name: 'National Foundation Day', localName: '建国記念の日', nameCN: '建国纪念日', type: 'public', impact: 'medium' },
  { date: '2025-03-20', name: 'Spring Equinox', localName: '春分の日', nameCN: '春分日', type: 'public', impact: 'medium' },
  { date: '2025-04-29', name: 'Showa Day', localName: '昭和の日', nameCN: '昭和日', type: 'public', impact: 'medium' },
  { date: '2025-05-03', name: 'Constitution Memorial Day', localName: '憲法記念日', nameCN: '宪法纪念日', type: 'public', impact: 'high' },
  { date: '2025-05-04', name: 'Greenery Day', localName: 'みどりの日', nameCN: '绿化节', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: 'Children\'s Day', localName: 'こどもの日', nameCN: '儿童节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Substitute Holiday', localName: '振替休日', nameCN: '调休日', type: 'public', impact: 'high' },
  { date: '2025-07-21', name: 'Marine Day', localName: '海の日', nameCN: '海洋节', type: 'public', impact: 'medium' },
  { date: '2025-08-11', name: 'Mountain Day', localName: '山の日', nameCN: '山之日', type: 'public', impact: 'medium' },
  { date: '2025-09-15', name: 'Respect for the Aged Day', localName: '敬老の日', nameCN: '敬老日', type: 'public', impact: 'medium' },
  { date: '2025-09-23', name: 'Autumn Equinox', localName: '秋分の日', nameCN: '秋分日', type: 'public', impact: 'medium' },
  { date: '2025-10-13', name: 'Sports Day', localName: 'スポーツの日', nameCN: '体育节', type: 'public', impact: 'medium' },
  { date: '2025-11-03', name: 'Culture Day', localName: '文化の日', nameCN: '文化节', type: 'public', impact: 'medium' },
  { date: '2025-11-23', name: 'Labor Thanksgiving Day', localName: '勤労感謝の日', nameCN: '勤劳感谢日', type: 'public', impact: 'medium' },
  { date: '2025-11-24', name: 'Substitute Holiday', localName: '振替休日', nameCN: '调休日', type: 'public', impact: 'medium' },
  { date: '2025-12-23', name: 'Emperor\'s Birthday', localName: '天皇誕生日', nameCN: '天皇诞辰', type: 'public', impact: 'medium' }
],

// South Korea 韩国
KR: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: '신정', nameCN: '新正', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: 'Lunar New Year', localName: '설날', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Lunar New Year', localName: '설날', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Lunar New Year', localName: '설날', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Independence Movement Day', localName: '삼일절', nameCN: '三一节', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Children\'s Day', localName: '어린이날', nameCN: '儿童节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Buddha\'s Birthday (Substitute Holiday)', localName: '석가탄신일 대체공휴일', nameCN: '佛诞节替代假日', type: 'public', impact: 'medium' },
  { date: '2025-06-06', name: 'Memorial Day', localName: '현충일', nameCN: '显忠日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Liberation Day', localName: '광복절', nameCN: '光复节', type: 'public', impact: 'high' },
  { date: '2025-10-03', name: 'National Foundation Day', localName: '개천절', nameCN: '开天节', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'Hangeul Day', localName: '한글날', nameCN: '韩文日', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'Mid-Autumn Festival', localName: '추석', nameCN: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-14', name: 'Mid-Autumn Festival', localName: '추석', nameCN: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-15', name: 'Mid-Autumn Festival', localName: '추석', nameCN: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: '성탄절', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Hong Kong, China 中国香港
HK: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Lunar New Year\'s Day', localName: 'Lunar New Year\'s Day', nameCN: '农历新年', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Second Day of Lunar New Year', localName: 'The second day of Lunar New Year', nameCN: '农历年初二', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Third Day of Lunar New Year', localName: 'The third day of Lunar New Year', nameCN: '农历年初三', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Ching Ming Festival', localName: 'Ching Ming Festival', nameCN: '清明节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: 'Easter Saturday', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节翌日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Buddha\'s Birthday', localName: 'Buddha\'s Birthday', nameCN: '佛诞节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Dragon Boat Festival', localName: 'Tuen Ng Festival', nameCN: '端午节', type: 'public', impact: 'medium' },
  { date: '2025-07-01', name: 'HKSAR Establishment Day', localName: 'Hong Kong Special Administrative Region Establishment Day', nameCN: '香港特别行政区成立纪念日', type: 'public', impact: 'high' },
  { date: '2025-09-08', name: 'Day after Mid-Autumn Festival', localName: 'The day following the Mid-Autumn Festival', nameCN: '中秋节翌日', type: 'public', impact: 'medium' },
  { date: '2025-10-01', name: 'National Day', localName: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-10-02', name: 'Chung Yeung Festival', localName: 'Chung Yeung Festival', nameCN: '重阳节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],

// Taiwan, China 中国台湾
TW: [
  { date: '2025-01-01', name: 'Republic of China Founding Day', localName: '中華民國開國紀念日', nameCN: '中华民国开国纪念日', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: 'Lunar New Year\'s Eve', localName: '農曆除夕', nameCN: '农历除夕', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Lunar New Year', localName: '春節', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Lunar New Year', localName: '春節', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Lunar New Year', localName: '春節', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-02-28', name: 'Peace Memorial Day', localName: '和平紀念日', nameCN: '和平纪念日', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Children\'s Day', localName: '兒童節', nameCN: '儿童节', type: 'public', impact: 'medium' },
  { date: '2025-04-05', name: 'Tomb Sweeping Day', localName: '清明節', nameCN: '清明节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Dragon Boat Festival', localName: '端午節', nameCN: '端午节', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Mid-Autumn Festival', localName: '中秋節', nameCN: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-10', name: 'National Day', localName: '國慶日', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'Republic of China Founding Day (Substitute)', localName: '中華民國開國紀念日 (補假)', nameCN: '中华民国开国纪念日 (补假)', type: 'public', impact: 'high' }
],

// Macao, China 中国澳门
MO: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: '元旦', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'First Day of Lunar New Year', localName: '農曆正月初一', nameCN: '农历正月初一', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Second Day of Lunar New Year', localName: '農曆正月初二', nameCN: '农历正月初二', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Third Day of Lunar New Year', localName: '農曆正月初三', nameCN: '农历正月初三', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Ching Ming Festival', localName: '清明節', nameCN: '清明节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: '耶穌受難日', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: '復活節前日', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: '復活節翌日', nameCN: '复活节翌日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: '勞動節', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Buddha\'s Birthday', localName: '佛誕節', nameCN: '佛诞节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Dragon Boat Festival', localName: '端午節', nameCN: '端午节', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Day after Mid-Autumn Festival', localName: '中秋節翌日', nameCN: '中秋节翌日', type: 'public', impact: 'medium' },
  { date: '2025-10-01', name: 'National Day of PRC', localName: '中華人民共和國國慶日', nameCN: '中华人民共和国国庆日', type: 'public', impact: 'high' },
  { date: '2025-10-02', name: 'Day after National Day of PRC', localName: '中華人民共和國國慶日翌日', nameCN: '中华人民共和国国庆日翌日', type: 'public', impact: 'high' },
  { date: '2025-10-03', name: 'Chung Yeung Festival', localName: '重陽節', nameCN: '重阳节', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'All Souls\' Day (Substitute)', localName: '追思節 (補假)', nameCN: '追思节 (补假)', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Feast of Immaculate Conception', localName: '聖母無原罪瞻禮', nameCN: '圣母无原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-20', name: 'Macao SAR Establishment Day', localName: '澳門特別行政區成立紀念日', nameCN: '澳门特别行政区成立纪念日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: '聖誕節', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
  
// Southeast Asia
// Singapore 新加坡
SG: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', localName: 'Chinese New Year', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Chinese New Year (2nd Day)', localName: 'Chinese New Year (2nd Day)', nameCN: '春节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Vesak Day', localName: 'Vesak Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Hari Raya Haji', localName: 'Hari Raya Haji', nameCN: '哈芝节', type: 'public', impact: 'medium' },
  { date: '2025-08-09', name: 'National Day', localName: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Deepavali', localName: 'Deepavali', nameCN: '屠妖节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Malaysia 马来西亚
MY: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Hari Tahun Baru', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', localName: 'Hari Raya Cina', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Chinese New Year (2nd Day)', localName: 'Hari Raya Cina (Hari Kedua)', nameCN: '春节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-02-09', name: 'Thaipusam', localName: 'Thaipusam', nameCN: '大宝森节', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Isra and Mi\'raj', localName: 'Isra dan Mi\'raj', nameCN: '夜行登霄节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Hari Raya Aidilfitri', localName: 'Hari Raya Aidilfitri', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Hari Raya Aidilfitri (2nd Day)', localName: 'Hari Raya Aidilfitri (Hari Kedua)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Hari Buruh', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Wesak Day', localName: 'Hari Wesak', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Yang di-Pertuan Agong\'s Birthday', localName: 'Hari Lahir Yang di-Pertuan Agong', nameCN: '最高元首诞辰', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Hari Raya Aidiladha', localName: 'Hari Raya Aidiladha', nameCN: '哈芝节', type: 'public', impact: 'medium' },
  { date: '2025-08-31', name: 'National Day', localName: 'Hari Kebangsaan', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-09-16', name: 'Malaysia Day', localName: 'Hari Malaysia', nameCN: '马来西亚日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Deepavali', localName: 'Deepavali', nameCN: '屠妖节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Hari Krismas', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Thailand 泰国
TH: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'วันขึ้นปีใหม่', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-12', name: 'Makha Bucha Day', localName: 'วันมะขะบูชา', nameCN: '万佛节', type: 'public', impact: 'medium' },
  { date: '2025-04-06', name: 'Chakri Day', localName: 'วันจักรี', nameCN: '却克里王朝纪念日', type: 'public', impact: 'medium' },
  { date: '2025-04-07', name: 'Chakri Day (Observed)', localName: 'วันจักรี (observed)', nameCN: '却克里王朝纪念日 (补假)', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Songkran Festival', localName: 'เทศกาลสงกรานต์', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Songkran Festival', localName: 'เทศกาลสงกรานต์', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Songkran Festival', localName: 'เทศกาลสงกรานต์', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'วันแรงงาน', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-04', name: 'Coronation Day', localName: 'วันฉัตรมงคล', nameCN: '加冕节', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Coronation Day (Observed)', localName: 'วันฉัตรมงคล (observed)', nameCN: '加冕节 (补假)', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Visakha Bucha Day', localName: 'วันวิสาขบูชา', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-06-03', name: 'Queen\'s Birthday', localName: 'วันเฉลิมพระชนมพรรษา พระราชินี', nameCN: '王后诞辰', type: 'public', impact: 'high' },
  { date: '2025-07-20', name: 'Asalha Bucha Day', localName: 'วันอาสาฬหาบูชา', nameCN: '三宝节', type: 'public', impact: 'medium' },
  { date: '2025-07-21', name: 'Buddhist Lent Day', localName: 'วันเข้าพรรษา', nameCN: '入雨节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'King\'s Birthday', localName: 'วันเฉลิมพระชนมพรรษา พระมหากษัตริย์', nameCN: '国王诞辰', type: 'public', impact: 'high' },
  { date: '2025-08-12', name: 'Queen Mother\'s Birthday', localName: 'วันเฉลิมพระชนมพรรษา พระ皇太后', nameCN: '王太后诞辰', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'King Bhumibol Memorial Day', localName: 'วันจำลองพระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช', nameCN: '普密蓬国王纪念日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Chulalongkorn Day', localName: 'วันจุฬาลงกรณ์', nameCN: '五世王纪念日', type: 'public', impact: 'high' },
  { date: '2025-12-05', name: 'King Bhumibol\'s Birthday', localName: 'วันเฉลิมพระชนมพรรษา พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช', nameCN: '普密蓬国王诞辰', type: 'public', impact: 'high' },
  { date: '2025-12-10', name: 'Constitution Day', localName: 'วันรัฐธรรมนูญ', nameCN: '宪法日', type: 'public', impact: 'medium' },
  { date: '2025-12-31', name: 'New Year\'s Eve', localName: 'วันสิ้นปี', nameCN: '除夕', type: 'public', impact: 'high' }
],

// Indonesia 印度尼西亚
ID: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Hari Tahun Baru', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', localName: 'Tahun Baru Imlek', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Isra and Mi\'raj', localName: 'Isra Mi\'raj', nameCN: '夜行登霄节', type: 'public', impact: 'medium' },
  { date: '2025-03-29', name: 'Nyepi (Balinese New Year)', localName: 'Nyepi (Tahun Baru Bali)', nameCN: '安宁日 (巴厘岛新年)', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Jumat Agung', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'Hari Raya Idul Fitri', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr Holiday', localName: 'Liburan Hari Raya Idul Fitri', nameCN: '开斋节假期', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr Holiday', localName: 'Liburan Hari Raya Idul Fitri', nameCN: '开斋节假期', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Hari Buruh', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Vesak Day', localName: 'Hari Vesak', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kenaikan Yesus Kristus', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-01', name: 'Pancasila Day', localName: 'Hari Pancasila', nameCN: '建国五原则日', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Eid al-Adha', localName: 'Hari Raya Idul Adha', nameCN: '宰牲节', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Islamic New Year', localName: 'Tahun Baru Hijriyah', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-08-17', name: 'Independence Day', localName: 'Hari Kemerdekaan', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Hari Natal', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Philippines 菲律宾
PH: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Araw ng Bagong Taon', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-25', name: 'People Power Anniversary', localName: 'Anibersaryo ng People Power', nameCN: '人民力量革命纪念日', type: 'observance', impact: 'medium' },
  { date: '2025-04-09', name: 'Araw ng Kagitingan', localName: 'Araw ng Kagitingan', nameCN: '英勇日', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Huwebes Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Biyernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Araw ng Manggagawa', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-12', name: 'Independence Day', localName: 'Araw ng Kalayaan', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-08-21', name: 'Ninoy Aquino Day', localName: 'Araw ni Ninoy Aquino', nameCN: '尼诺·阿基诺日', type: 'public', impact: 'medium' },
  { date: '2025-08-25', name: 'National Heroes Day', localName: 'Araw ng mga Bayani', nameCN: '国家英雄日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints\' Day', localName: 'Araw ng mga Santo', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'All Souls\' Day', localName: 'Araw ng mga Kaluluwa', nameCN: '万灵节', type: 'observance', impact: 'low' },
  { date: '2025-11-30', name: 'Bonifacio Day', localName: 'Araw ni Bonifacio', nameCN: '博尼法西奥日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Araw ng Pasko', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-30', name: 'Rizal Day', localName: 'Araw ni Rizal', nameCN: '黎刹日', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'New Year\'s Eve', localName: 'Bisperas ng Bagong Taon', nameCN: '除夕', type: 'public', impact: 'high' }
],

// Vietnam 越南
VN: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Ngày Năm Mới', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: 'Tet Holiday', localName: 'Ngày Tết', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Tet Holiday', localName: 'Ngày Tết', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Tet Holiday', localName: 'Ngày Tết', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Tet Holiday', localName: 'Ngày Tết', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-04-30', name: 'Reunification Day', localName: 'Ngày Thống Nhất', nameCN: '统一日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Ngày Quốc Tế Lao Động', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-09-02', name: 'National Day', localName: 'Ngày Quốc Khánh', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// Myanmar 缅甸
MM: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'နှစ်သစ်ရက်', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-04', name: 'Independence Day', localName: 'လွတ်လပ်ရေးနေ့', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-02-12', name: 'Union Day', localName: 'ပြည်ထောင်စုနေ့', nameCN: '联邦日', type: 'public', impact: 'medium' },
  { date: '2025-03-02', name: 'Peasants\' Day', localName: 'တောင်သူလယ်သမားနေ့', nameCN: '农民节', type: 'public', impact: 'medium' },
  { date: '2025-03-27', name: 'Armed Forces Day', localName: 'တပ်မတော်နေ့', nameCN: '建军节', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Thingyan Water Festival', localName: 'သင်္ကြန်ရေပွဲ', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Thingyan Water Festival', localName: 'သင်္ကြန်ရေပွဲ', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Thingyan Water Festival', localName: 'သင်္ကြန်ရေပွဲ', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-16', name: 'Thingyan Water Festival', localName: 'သင်္ကြန်ရေပွဲ', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Myanmar New Year', localName: 'မြန်မာနှစ်သစ်', nameCN: '缅甸新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'အလုပ်သမားနေ့', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Full Moon Day of Kason', localName: 'ကဆုန်လပြည့်နေ့', nameCN: '卡松月圆日', type: 'public', impact: 'medium' },
  { date: '2025-07-19', name: 'Martyrs\' Day', localName: 'အာဇာနည်နေ့', nameCN: '烈士节', type: 'public', impact: 'high' },
  { date: '2025-08-10', name: 'Full Moon Day of Waso', localName: 'ဝါဆိုလပြည့်နေ့', nameCN: '瓦索月圆日', type: 'public', impact: 'medium' },
  { date: '2025-10-09', name: 'Full Moon Day of Thadingyut', localName: 'သီတင်းကျွတ်လပြည့်နေ့', nameCN: '达丁玉月圆日', type: 'public', impact: 'medium' },
  { date: '2025-11-07', name: 'Full Moon Day of Tazaungmone', localName: 'တန်ဆောင်မုန်လပြည့်နေ့', nameCN: '达桑芒月圆日', type: 'public', impact: 'medium' },
  { date: '2025-11-17', name: 'National Day', localName: 'အမျိုးသားနေ့', nameCN: '国庆日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'ခရစ္စမတ်နေ့', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Cambodia 柬埔寨
KH: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'ថ្ងៃឆ្នាំថ្មី', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Victory Day', localName: 'ថ្ងៃជ័យជំនះ', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: 'International Women\'s Day', localName: 'ថ្ងៃស្ត្រីអន្តរជាតិ', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Khmer New Year', localName: 'បុណ្យចូលឆ្នាំខ្មែរ', nameCN: '高棉新年', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Khmer New Year', localName: 'បុណ្យចូលឆ្នាំខ្មែរ', nameCN: '高棉新年', type: 'public', impact: 'high' },
  { date: '2025-04-16', name: 'Khmer New Year', localName: 'បុណ្យចូលឆ្នាំខ្មែរ', nameCN: '高棉新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'ថ្ងៃពលកម្ម', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Vesak Day', localName: 'វិសាខបុណ្យ', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-05-14', name: 'King\'s Birthday', localName: 'ថ្ងៃកំណើតរបស់ព្រះមហាក្សត្រ', nameCN: '国王诞辰', type: 'public', impact: 'high' },
  { date: '2025-05-20', name: 'Day of Remembrance', localName: 'ថ្ងៃចងចាំ', nameCN: '追思日', type: 'public', impact: 'medium' },
  { date: '2025-06-01', name: 'International Children\'s Day', localName: 'ថ្ងៃកុមារអន្តរជាតិ', nameCN: '国际儿童节', type: 'public', impact: 'medium' },
  { date: '2025-06-18', name: 'Queen Mother\'s Birthday', localName: 'ថ្ងៃកំណើតរបស់ព្រះមហាក្សត្រី', nameCN: '王太后诞辰', type: 'public', impact: 'high' },
  { date: '2025-09-24', name: 'Constitution Day', localName: 'ថ្ងៃរដ្ឋធម្មនុញ្ញ', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'Pchum Ben Festival', localName: 'បុណ្យភ្ជុំបិណ្ឌ', nameCN: '亡人节', type: 'public', impact: 'high' },
  { date: '2025-10-10', name: 'Pchum Ben Festival', localName: 'បុណ្យភ្ជុំបិណ្ឌ', nameCN: '亡人节', type: 'public', impact: 'high' },
  { date: '2025-10-11', name: 'Pchum Ben Festival', localName: 'បុណ្យភ្ជុំបិណ្ឌ', nameCN: '亡人节', type: 'public', impact: 'high' },
  { date: '2025-10-15', name: 'King Sihanouk Memorial Day', localName: 'ថ្ងៃចងចាំព្រះមហាក្សត្រសីហនុ', nameCN: '西哈努克国王纪念日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Paris Peace Agreement Day', localName: 'ថ្ងៃសមझौতាសន្តិភាពប៉ារីស', nameCN: '巴黎和平协定日', type: 'public', impact: 'medium' },
  { date: '2025-10-29', name: 'Coronation Day', localName: 'ថ្ងៃសម្តេចក្រម', nameCN: '加冕日', type: 'public', impact: 'high' },
  { date: '2025-11-07', name: 'Water Festival', localName: 'បុណ្យអុំទម្លោះ', nameCN: '送水节', type: 'public', impact: 'high' },
  { date: '2025-11-08', name: 'Water Festival', localName: 'បុណ្យអុំទម្លោះ', nameCN: '送水节', type: 'public', impact: 'high' },
  { date: '2025-11-09', name: 'Independence Day', localName: 'ថ្ងៃឯករាជ្យ', nameCN: '独立日', type: 'public', impact: 'high' }
],

// Laos 老挝
LA: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'ວັນປີໃຫມ່', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: 'International Women\'s Day', localName: 'ວັນສตรີສາກົນ', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Lao New Year (Pi Mai)', localName: 'ປີໃຫມ່ລາວ (ປີໄມ)', nameCN: '老挝新年', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Lao New Year (Pi Mai)', localName: 'ປີໃຫມ່ລາວ (ປີໄມ)', nameCN: '老挝新年', type: 'public', impact: 'high' },
  { date: '2025-04-16', name: 'Lao New Year (Pi Mai)', localName: 'ປີໃຫມ່ລາວ (ປີໄມ)', nameCN: '老挝新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'ວັນແຮງງານທຸກຊົນ', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Vesak Day', localName: 'ວັນວີສາຂະບູชາ', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-06-01', name: 'Children\'s Day', localName: 'ວັນລູກເດັກ', nameCN: '儿童节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Asalha Bucha Day', localName: 'ວັນອາສາຮາບູຊາ', nameCN: '三宝节', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'That Luang Festival', localName: 'ພະທະລູງ', nameCN: '塔銮节', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'End of Buddhist Lent', localName: 'ວັນສິງຫາ', nameCN: '佛教斋戒结束日', type: 'public', impact: 'medium' },
  { date: '2025-10-10', name: 'Boat Racing Festival', localName: 'ວັນແຂວນແມ່ນໍ້າ', nameCN: '龙舟节', type: 'public', impact: 'medium' },
  { date: '2025-12-02', name: 'National Day', localName: 'ວັນສາກົນ', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// Brunei 文莱
BN: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Hari Tahun Baru', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', localName: 'Tahun Baru Cina', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-02-08', name: 'National Day', localName: 'Hari Kebangsaan', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Isra and Mi\'raj', localName: 'Isra dan Mi\'raj', nameCN: '夜行登霄节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'Hari Raya Aidilfitri', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (2nd Day)', localName: 'Hari Raya Aidilfitri (Hari Kedua)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (3rd Day)', localName: 'Hari Raya Aidilfitri (Hari Ketiga)', nameCN: '开斋节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-05-31', name: 'Armed Forces Day', localName: 'Hari Angkatan Bersenjata', nameCN: '建军节', type: 'public', impact: 'medium' },
  { date: '2025-06-15', name: 'Eid al-Adha', localName: 'Hari Raya Aidiladha', nameCN: '宰牲节', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Islamic New Year', localName: 'Tahun Baru Hijrah', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-07-15', name: 'Sultan\'s Birthday', localName: 'Hari Lahir Sultan', nameCN: '苏丹诞辰', type: 'public', impact: 'high' },
  { date: '2025-08-01', name: 'Isra and Mi\'raj (Observed)', localName: 'Isra dan Mi\'raj (observed)', nameCN: '夜行登霄节 (补假)', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Hari Krismas', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// South Asia 南亚

// India 印度
IN: [
  { date: '2025-01-26', name: 'Republic Day', localName: 'गणतंत्र दिवस', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-03-14', name: 'Holi', localName: 'होली', nameCN: '洒红节', type: 'public', impact: 'medium' },
  { date: '2025-04-04', name: 'Mahavir Jayanti', localName: 'महावीर जयंती', nameCN: '马哈维尔诞辰', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Ram Navami', localName: 'राम नवमी', nameCN: '罗摩诞辰节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'गुड फ्राइडे', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr', localName: 'ईद उल फितर', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Buddha Purnima', localName: 'बुद्ध पूर्णिमा', nameCN: '佛陀诞辰', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Independence Day', localName: 'स्वतंत्रता दिवस', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', localName: 'गांधी जयंती', nameCN: '甘地诞辰', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Diwali', localName: 'दिवाली', nameCN: '排灯节', type: 'public', impact: 'high' },
  { date: '2025-11-02', name: 'Guru Nanak Jayanti', localName: 'गुरु नानक जयंती', nameCN: '古鲁那纳克诞辰', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'क्रिसमस', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Pakistan 巴基斯坦
PK: [
  { date: '2025-02-05', name: 'Kashmir Day', localName: 'یوم کشمیر', nameCN: '克什米尔日', type: 'public', impact: 'medium' },
  { date: '2025-03-23', name: 'Pakistan Day', localName: 'یوم پاکستان', nameCN: '巴基斯坦日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عید الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عید الفطر (دوسرا دن)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', localName: 'عید الفطر (تیسرا دن)', nameCN: '开斋节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'یوم مزدور', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Eid al-Adha', localName: 'عید الاضحی', nameCN: '宰牲节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha (Day 2)', localName: 'عید الاضحی (دوسرا دن)', nameCN: '宰牲节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 3)', localName: 'عید الاضحی (تیسرا دن)', nameCN: '宰牲节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-07-16', name: 'Ashura', localName: 'عاشورا', nameCN: '阿舒拉节', type: 'public', impact: 'medium' },
  { date: '2025-07-17', name: 'Ashura (Day 2)', localName: 'عاشورا (دوسرا دن)', nameCN: '阿舒拉节 (第二天)', type: 'public', impact: 'medium' },
  { date: '2025-08-14', name: 'Independence Day', localName: 'یوم آزادی', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-09-14', name: 'Eid Milad-un-Nabi', localName: 'عید میلاد النبی', nameCN: '先知诞辰', type: 'public', impact: 'medium' },
  { date: '2025-11-09', name: 'Iqbal Day', localName: 'یوم اقبال', nameCN: '伊克巴尔日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Quaid-e-Azam Day / Christmas', localName: 'یوم قائد اعظم / کرسمس', nameCN: '国父节 / 圣诞节', type: 'public', impact: 'high' }
],

// Bangladesh 孟加拉国
BD: [
  { date: '2025-02-21', name: 'Shaheed Day and International Mother Language Day', localName: 'শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস', nameCN: '烈士日暨国际母语日', type: 'public', impact: 'high' },
  { date: '2025-03-17', name: 'Bangabandhu\'s Birthday', localName: 'বঙ্গবন্ধু জন্মদিবস', nameCN: '国父谢赫·穆吉布诞辰', type: 'public', impact: 'high' },
  { date: '2025-03-26', name: 'Independence Day', localName: 'স্বাধীনতা দিবস', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Bengali New Year', localName: 'পহেলা বৈশাখ', nameCN: '孟加拉新年', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'ঈদুল ফিতর', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'ঈদুল ফিতর (দ্বিতীয় দিন)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', localName: 'ঈদুল ফিতর (তৃতীয় দিন)', nameCN: '开斋节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'May Day', localName: 'মে দিবস', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Eid al-Adha', localName: 'ঈদুল আযহা', nameCN: '宰牲节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha (Day 2)', localName: 'ঈদুল আযহা (দ্বিতীয় দিন)', nameCN: '宰牲节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 3)', localName: 'ঈদুল আযহা (তৃতীয় দিন)', nameCN: '宰牲节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'National Mourning Day', localName: 'জাতীয় শোক দিবস', nameCN: '国家哀悼日', type: 'public', impact: 'high' },
  { date: '2025-09-14', name: 'Eid-e-Milad-un-Nabi', localName: 'ঈদে মিলাদুন্নবি', nameCN: '先知诞辰', type: 'public', impact: 'medium' },
  { date: '2025-10-06', name: 'Durga Puja (Bijoya Dashami)', localName: 'দুর্গা পূজা (বিজয়া দশমী)', nameCN: '难近母节 (胜利十日)', type: 'public', impact: 'medium' },
  { date: '2025-12-16', name: 'Victory Day', localName: 'বিজয় দিবস', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'ক্রিসমাস', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Sri Lanka 斯里兰卡
LK: [
  { date: '2025-01-15', name: 'Tamil Thai Pongal Day', localName: 'தமிழ் தை பொங்கல்', nameCN: '泰米尔泰节', type: 'public', impact: 'medium' },
  { date: '2025-02-04', name: 'National Day', localName: 'ජාතික දිනය', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-02-12', name: 'Navam Full Moon Poya Day', localName: 'නවම පෝය', nameCN: '纳瓦姆满月日', type: 'public', impact: 'medium' },
  { date: '2025-03-14', name: 'Maha Shivaratri', localName: 'මහා ಶಿವರಾತ್ರಿ', nameCN: '湿婆神节', type: 'public', impact: 'medium' },
  { date: '2025-03-14', name: 'Medin Full Moon Poya Day', localName: 'මෙදින් පෝය', nameCN: '麦丁满月日', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Day prior to Sinhala & Tamil New Year', localName: 'සිංහල සහ தமிழ් නව වසර පෙර දිනය', nameCN: '僧伽罗泰米尔新年前夕', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Sinhala & Tamil New Year', localName: 'සිංහල සහ தமிழ් නව වසර', nameCN: '僧伽罗泰米尔新年', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'ගුඩ් ප්‍රයිඩේ', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Bak Full Moon Poya Day', localName: 'බක් පෝය', nameCN: '巴克满月日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'May Day', localName: 'මැයි දිනය', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Vesak Full Moon Poya Day', localName: 'වෙසක් පෝය', nameCN: '卫塞满月日', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Day following Vesak Full Moon Poya Day', localName: 'වෙසක් පෝයෙන් පසු දිනය', nameCN: '卫塞满月日翌日', type: 'public', impact: 'medium' },
  { date: '2025-06-11', name: 'Poson Full Moon Poya Day', localName: 'පොසොන් පෝය', nameCN: '波桑满月日', type: 'public', impact: 'medium' },
  { date: '2025-07-10', name: 'Esala Full Moon Poya Day', localName: 'ඊසාල පෝය', nameCN: '埃萨拉满月日', type: 'public', impact: 'medium' },
  { date: '2025-08-09', name: 'Nikini Full Moon Poya Day', localName: 'නිකිණි පෝය', nameCN: '尼基尼满月日', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Binara Full Moon Poya Day', localName: 'බිනර පෝය', nameCN: '宾纳拉满月日', type: 'public', impact: 'medium' },
  { date: '2025-10-08', name: 'Vap Full Moon Poya Day', localName: 'වාප් පෝය', nameCN: '瓦普满月日', type: 'public', impact: 'medium' },
  { date: '2025-11-06', name: 'Il Full Moon Poya Day', localName: 'ඉල් පෝය', nameCN: '伊尔满月日', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Unduvap Full Moon Poya Day', localName: 'උඳුවප් පෝය', nameCN: '乌杜瓦普满月日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'ක්‍රිස්මස් දිනය', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Nepal 尼泊尔
NP: [
  { date: '2025-01-14', name: 'Maghe Sankranti', localName: 'माघे संक्रान्ति', nameCN: '摩伽节', type: 'public', impact: 'medium' },
  { date: '2025-02-19', name: 'Prajaatantra Diwas (Democracy Day)', localName: 'प्रजातन्त्र दिवस', nameCN: '民主日', type: 'public', impact: 'medium' },
  { date: '2025-03-01', name: 'Maha Shivaratri', localName: 'महाशिवरात्रि', nameCN: '湿婆神节', type: 'public', impact: 'medium' },
  { date: '2025-03-08', name: 'International Women\'s Day', localName: 'अन्तर्राष्ट्रिय महिला दिवस', nameCN: '国际妇女节', type: 'public', impact: 'medium' },
  { date: '2025-03-22', name: 'Fagu Purnima (Holi)', localName: 'फागु पूर्णिमा (होली)', nameCN: '洒红节', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Nepali New Year', localName: 'नेपाली नयाँ वर्ष', nameCN: '尼泊尔新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'मजदूर दिवस', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Buddha Jayanti', localName: 'बुद्ध जयन्ती', nameCN: '佛陀诞辰', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Republic Day', localName: 'गणतन्त्र दिवस', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Krishna Janmashtami', localName: 'कृष्ण जन्माष्टमी', nameCN: '克利须那诞辰', type: 'public', impact: 'medium' },
  { date: '2025-10-02', name: 'Ghatasthapana', localName: 'घटस्थापना', nameCN: '德赛节开始', type: 'public', impact: 'medium' },
  { date: '2025-10-09', name: 'Dashain (Bijaya Dashami)', localName: 'दशैं (विजय दशमी)', nameCN: '德赛节 (胜利十日)', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Tihar (Laxmi Puja)', localName: 'तिहार (लक्ष्मी पूजा)', nameCN: '提哈尔节 (财富女神节)', type: 'public', impact: 'high' },
  { date: '2025-10-24', name: 'Tihar (Govardhan Puja)', localName: 'तिहार (गोवर्धन पूजा)', nameCN: '提哈尔节 (戈瓦尔丹节)', type: 'public', impact: 'high' },
  { date: '2025-10-26', name: 'Chhath Puja', localName: 'छठ पूजा', nameCN: '恰特节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'क्रिसमस', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Middle East 中东

// AE 阿联酋 United Arab Emirates
AE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عيد الفطر (اليوم الثاني)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', localName: 'عيد الفطر (اليوم الثالث)', nameCN: '开斋节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Arafat Day', localName: 'يوم عرفة', nameCN: '阿拉法特日', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 2)', localName: 'عيد الأضحى (اليوم الثاني)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year (Al Hijra)', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-09-15', name: "Prophet Muhammad's Birthday", localName: 'مولد النبي محمد', nameCN: '先知穆罕默德诞辰', type: 'public', impact: 'medium' },
  { date: '2025-12-02', name: 'National Day', localName: 'اليوم الوطني', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-12-03', name: 'National Day (Day 2)', localName: 'اليوم الوطني (اليوم الثاني)', nameCN: '国庆日（第二天）', type: 'public', impact: 'high' }
],

// BH 巴林 Bahrain
BH: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عيد الفطر (اليوم الثاني)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Arafat Day', localName: 'يوم عرفة', nameCN: '阿拉法特日', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 2)', localName: 'عيد الأضحى (اليوم الثاني)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-09-15', name: "Prophet Muhammad's Birthday", localName: 'مولد النبي محمد', nameCN: '穆罕默德诞辰', type: 'public', impact: 'medium' },
  { date: '2025-12-16', name: 'National Day', localName: 'اليوم الوطني', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-12-17', name: 'National Day (Day 2)', localName: 'اليوم الوطني (اليوم الثاني)', nameCN: '国庆日（第二天）', type: 'public', impact: 'high' }
],

// EG 埃及 Egypt
EG: [
  { date: '2025-01-07', name: 'Coptic Christmas Day', localName: 'عيد الميلاد القبطي', nameCN: '科普特圣诞节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-25', name: 'Sinai Liberation Day', localName: 'يوم تحرير سيناء', nameCN: '西奈解放日', type: 'public', impact: 'medium' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-07-23', name: 'Revolution Day', localName: 'يوم الثورة', nameCN: '革命日', type: 'public', impact: 'medium' },
  { date: '2025-10-06', name: 'Armed Forces Day', localName: 'يوم القوات المسلحة', nameCN: '武装部队日', type: 'public', impact: 'medium' }
],

// IL 以色列 Israel
IL: [
  { date: '2025-04-13', name: 'Passover (Pesach)', localName: 'פסח', nameCN: '逾越节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Passover Holiday Ends', localName: 'סוף חג פסח', nameCN: '逾越节结束', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Holocaust Remembrance Day', localName: 'יום הזיכרון לשואה ולגבורה', nameCN: '大屠杀纪念日', type: 'observance', impact: 'low' },
  { date: '2025-05-06', name: 'Israeli Independence Day', localName: 'יום העצמאות לישראל', nameCN: '以色列独立日', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Shavuot', localName: 'שבועות', nameCN: '七七节', type: 'public', impact: 'high' },
  { date: '2025-10-03', name: 'Rosh Hashanah', localName: 'ראש השנה', nameCN: '犹太新年', type: 'public', impact: 'high' },
  { date: '2025-10-12', name: 'Yom Kippur', localName: 'יום כיפור', nameCN: '赎罪日', type: 'public', impact: 'high' },
  { date: '2025-10-17', name: 'Sukkot', localName: 'סוכות', nameCN: '住棚节', type: 'public', impact: 'high' }
],

// IQ 伊拉克 Iraq
IQ: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-21', name: 'Nowruz (Kurdish New Year)', localName: 'نوروز (سنة كردية جديدة)', nameCN: '库尔德新年', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-10-03', name: 'Iraqi Independence Day', localName: 'يوم الاستقلال العراقي', nameCN: '独立日', type: 'public', impact: 'high' }
],

// IR 伊朗 Iran
IR: [
  { date: '2025-03-20', name: 'Nowruz', localName: 'نوروز', nameCN: '波斯新年', type: 'public', impact: 'high' },
  { date: '2025-03-21', name: 'Nowruz Holiday', localName: 'عطلة نوروز', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-03-22', name: 'Nowruz Holiday', localName: 'عطلة نوروز', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-03-23', name: 'Nowruz Holiday', localName: 'عطلة نوروز', nameCN: '新年假期', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عید قربان', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس سال هجری', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' }
],

// JO 约旦 Jordan
JO: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-05-25', name: 'Independence Day', localName: 'يوم الاستقلال', nameCN: '独立日', type: 'public', impact: 'high' }
],

// KW 科威特 Kuwait
KW: [
  { date: '2025-02-25', name: 'National Day', localName: 'اليوم الوطني', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-02-26', name: 'Liberation Day', localName: 'يوم التحرير', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' }
],

// LB 黎巴嫩 Lebanon
LB: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-11-22', name: 'Independence Day', localName: 'يوم الاستقلال', nameCN: '独立日', type: 'public', impact: 'high' }
],

// OM 阿曼 Oman
OM: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-11-18', name: 'National Day', localName: 'اليوم الوطني', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// QA 卡塔尔 Qatar
QA: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-12-18', name: 'National Day', localName: 'اليوم الوطني', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// SA 沙特阿拉伯 Saudi Arabia
SA: [
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عيد الفطر (اليوم الثاني)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', localName: 'عيد الفطر (اليوم الثالث)', nameCN: '开斋节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-04-23', name: 'Eid al-Fitr (Day 4)', localName: 'عيد الفطر (اليوم الرابع)', nameCN: '开斋节（第四天）', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Arafat Day', localName: 'يوم عرفة', nameCN: '阿拉法特日', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 2)', localName: 'عيد الأضحى (اليوم الثاني)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Eid al-Adha (Day 3)', localName: 'عيد الأضحى (اليوم الثالث)', nameCN: '古尔邦节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-09-23', name: 'National Day', localName: 'اليوم الوطني', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// TR 土耳其 Turkey
TR: [
  { date: '2025-04-23', name: 'National Sovereignty and Children\'s Day', localName: 'Ulusal Egemenlik ve Çocuk Bayramı', nameCN: '国民主权与儿童节', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour and Solidarity Day', localName: 'Emek ve Dayanışma Günü', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-19', name: 'Commemoration of Atatürk, Youth and Sports Day', localName: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', nameCN: '阿塔图尔克纪念日暨青年与体育日', type: 'public', impact: 'high' },
  { date: '2025-07-15', name: 'Democracy and National Unity Day', localName: 'Demokrasi ve Ulusal Birlik Günü', nameCN: '民主团结日', type: 'public', impact: 'medium' },
  { date: '2025-08-30', name: 'Victory Day', localName: 'Zafer Bayramı', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-10-29', name: 'Republic Day', localName: 'Cumhuriyet Bayramı', nameCN: '共和国日', type: 'public', impact: 'high' }
],

// Oceania 大洋洲
// Australia 澳大利亚
AU: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-26', name: 'Australia Day', localName: 'Australia Day', nameCN: '澳大利亚日', type: 'public', impact: 'high' },
  { date: '2025-01-27', name: 'Australia Day (holiday in lieu)', localName: 'Australia Day (holiday in lieu)', nameCN: '澳大利亚日（补假）', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Labour Day (WA)', localName: 'Labour Day (WA)', nameCN: '劳动节（西澳大利亚州）', type: 'public', impact: 'medium' },
  { date: '2025-03-10', name: 'Labour Day (VIC)', localName: 'Labour Day (VIC)', nameCN: '劳动节（维多利亚州）', type: 'public', impact: 'medium' },
  { date: '2025-03-10', name: 'Eight Hours Day (TAS)', localName: 'Eight Hours Day (TAS)', nameCN: '八小时工作日纪念日（塔斯马尼亚州）', type: 'public', impact: 'medium' },
  { date: '2025-03-17', name: 'Canberra Day (ACT)', localName: 'Canberra Day (ACT)', nameCN: '堪培拉日（澳大利亚首都领地）', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: 'Easter Saturday', nameCN: '复活节前日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Easter Sunday', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-25', name: 'ANZAC Day', localName: 'ANZAC Day', nameCN: '澳新军团日', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Labour Day (QLD)', localName: 'Labour Day (QLD)', nameCN: '劳动节（昆士兰州）', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Queen\'s Birthday', localName: 'Queen\'s Birthday', nameCN: '女王诞辰日', type: 'public', impact: 'high' },
  { date: '2025-08-04', name: 'Picnic Day (NT)', localName: 'Picnic Day (NT)', nameCN: '野餐日（北领地）', type: 'public', impact: 'medium' },
  { date: '2025-10-06', name: 'Labour Day (NSW, SA, ACT)', localName: 'Labour Day (NSW, SA, ACT)', nameCN: '劳动节（新南威尔士州、南澳大利亚州、澳大利亚首都领地）', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// New Zealand 新西兰
NZ: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: 'Day after New Year\'s Day', localName: 'Day after New Year\'s Day', nameCN: '元旦次日', type: 'public', impact: 'high' },
  { date: '2025-02-06', name: 'Waitangi Day', localName: 'Waitangi Day', nameCN: '怀唐伊日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-25', name: 'ANZAC Day', localName: 'ANZAC Day', nameCN: '澳新军团日', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Queen\'s Birthday', localName: 'Queen\'s Birthday', nameCN: '女王诞辰日', type: 'public', impact: 'high' },
  { date: '2025-10-27', name: 'Labour Day', localName: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Fiji 斐济
FJ: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: 'Easter Saturday', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Ratu Sir Lala Sukuna Day', localName: 'Ratu Sir Lala Sukuna Day', nameCN: '拉图·拉拉·苏库纳日', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Prophet Mohammed\'s Birthday', localName: 'Prophet Mohammed\'s Birthday', nameCN: '先知穆罕默德诞辰', type: 'public', impact: 'medium' },
  { date: '2025-10-10', name: 'Fiji Day', localName: 'Fiji Day', nameCN: '斐济日', type: 'public', impact: 'high' },
  { date: '2025-11-03', name: 'Diwali', localName: 'Diwali', nameCN: '排灯节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Papua New Guinea 巴布亚新几内亚
PG: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: 'Easter Saturday', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Easter Sunday', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Queen\'s Birthday', localName: 'Queen\'s Birthday', nameCN: '女王诞辰日', type: 'public', impact: 'high' },
  { date: '2025-07-23', name: 'National Remembrance Day', localName: 'National Remembrance Day', nameCN: '国家纪念日', type: 'public', impact: 'medium' },
  { date: '2025-09-16', name: 'Independence Day', localName: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// South America 南美洲
// Brazil 巴西
BR: [
  { date: '2025-01-01', name: 'Confraternização Universal', localName: 'Confraternização Universal', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-04', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'observance', impact: 'medium' },
  { date: '2025-03-05', name: 'Quarta-feira de Cinzas', localName: 'Quarta-feira de Cinzas', nameCN: '圣灰星期三', type: 'observance', impact: 'low' },
  { date: '2025-04-18', name: 'Paixão de Cristo', localName: 'Paixão de Cristo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Tiradentes', localName: 'Tiradentes', nameCN: '蒂拉登特斯日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Dia do Trabalho', localName: 'Dia do Trabalho', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Corpus Christi', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-09-07', name: 'Independência do Brasil', localName: 'Independência do Brasil', nameCN: '巴西独立日', type: 'public', impact: 'high' },
  { date: '2025-10-12', name: 'Nossa Senhora Aparecida', localName: 'Nossa Senhora Aparecida', nameCN: '圣母显灵日', type: 'public', impact: 'high' },
  { date: '2025-11-02', name: 'Finados', localName: 'Finados', nameCN: '万灵节', type: 'public', impact: 'medium' },
  { date: '2025-11-15', name: 'Proclamação da República', localName: 'Proclamação da República', nameCN: '共和国宣言日', type: 'public', impact: 'high' },
  { date: '2025-11-20', name: 'Dia da Consciência Negra', localName: 'Dia da Consciência Negra', nameCN: '黑人意识日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Natal', localName: 'Natal', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Argentina 阿根廷
AR: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-03-04', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-03-24', name: 'Día Nacional de la Memoria por la Verdad y la Justicia', localName: 'Día Nacional de la Memoria por la Verdad y la Justicia', nameCN: '全国真相与正义纪念日', type: 'public', impact: 'high' },
  { date: '2025-04-02', name: 'Día del Veterano y de los Caídos en la Guerra de Malvinas', localName: 'Día del Veterano y de los Caídos en la Guerra de Malvinas', nameCN: '马尔维纳斯群岛战争退伍军人与阵亡者日', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajador', localName: 'Día del Trabajador', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-25', name: 'Día de la Revolución de Mayo', localName: 'Día de la Revolución de Mayo', nameCN: '五月革命日', type: 'public', impact: 'high' },
  { date: '2025-06-20', name: 'Paso a la Inmortalidad del Gral. Manuel Belgrano', localName: 'Paso a la Inmortalidad del Gral. Manuel Belgrano', nameCN: '曼努埃尔·贝尔格拉诺将军逝世纪念日', type: 'public', impact: 'high' },
  { date: '2025-07-09', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-08-18', name: 'Paso a la Inmortalidad del Gral. José de San Martín', localName: 'Paso a la Inmortalidad del Gral. José de San Martín', nameCN: '何塞·德·圣马丁将军逝世纪念日', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'Día del Respeto a la Diversidad Cultural', localName: 'Día del Respeto a la Diversidad Cultural', nameCN: '文化多样性尊重日', type: 'public', impact: 'medium' },
  { date: '2025-11-24', name: 'Día de la Soberanía Nacional', localName: 'Día de la Soberanía Nacional', nameCN: '国家主权日', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Inmaculada Concepción de María', localName: 'Inmaculada Concepción de María', nameCN: '圣母无原罪瞻礼', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Chile 智利
CL: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Sábado Santo', localName: 'Sábado Santo', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Día Nacional del Trabajo', localName: 'Día Nacional del Trabajo', nameCN: '全国劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-21', name: 'Día de las Glorias Navales', localName: 'Día de las Glorias Navales', nameCN: '海军光荣日', type: 'public', impact: 'high' },
  { date: '2025-06-27', name: 'Día de San Pedro y San Pablo', localName: 'Día de San Pedro y San Pablo', nameCN: '圣彼得和圣保罗日', type: 'public', impact: 'medium' },
  { date: '2025-07-16', name: 'Día de la Virgen del Carmen', localName: 'Día de la Virgen del Carmen', nameCN: '卡门圣母日', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Asunción de la Virgen', localName: 'Asunción de la Virgen', nameCN: '圣母升天日', type: 'public', impact: 'high' },
  { date: '2025-09-18', name: 'Día de la Independencia Nacional', localName: 'Día de la Independencia Nacional', nameCN: '国家独立日', type: 'public', impact: 'high' },
  { date: '2025-09-19', name: 'Día de las Glorias del Ejército', localName: 'Día de las Glorias del Ejército', nameCN: '军队光荣日', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'Día del Descubrimiento de Dos Mundos', localName: 'Día del Descubrimiento de Dos Mundos', nameCN: '发现两个世界日', type: 'public', impact: 'medium' },
  { date: '2025-10-31', name: 'Día Nacional de las Iglesias Evangélicas y Protestantes', localName: 'Día Nacional de las Iglesias Evangélicas y Protestantes', nameCN: '全国福音派和新教教会日', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'Día de Todos los Santos', localName: 'Día de Todos los Santos', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Inmaculada Concepción', localName: 'Inmaculada Concepción', nameCN: '圣母无原罪瞻礼', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Colombia 哥伦比亚
CO: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Día de los Reyes Magos', localName: 'Día de los Reyes Magos', nameCN: '三王节', type: 'public', impact: 'medium' },
  { date: '2025-03-24', name: 'Día de San José', localName: 'Día de San José', nameCN: '圣约瑟夫日', type: 'public', impact: 'medium' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Día de la Ascensión', localName: 'Día de la Ascensión', nameCN: '耶稣升天日', type: 'public', impact: 'medium' },
  { date: '2025-06-23', name: 'Corpus Christi', localName: 'Corpus Christi', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-06-30', name: 'Día del Sagrado Corazón de Jesús', localName: 'Día del Sagrado Corazón de Jesús', nameCN: '耶稣圣心日', type: 'public', impact: 'medium' },
  { date: '2025-07-20', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-08-07', name: 'Batalla de Boyacá', localName: 'Batalla de Boyacá', nameCN: '博亚卡战役纪念日', type: 'public', impact: 'high' },
  { date: '2025-08-18', name: 'Asunción de la Virgen', localName: 'Asunción de la Virgen', nameCN: '圣母升天日', type: 'public', impact: 'medium' },
  { date: '2025-10-13', name: 'Día de la Raza', localName: 'Día de la Raza', nameCN: '种族日', type: 'public', impact: 'medium' },
  { date: '2025-11-03', name: 'Día de Todos los Santos', localName: 'Día de Todos los Santos', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-17', name: 'Independencia de Cartagena', localName: 'Independencia de Cartagena', nameCN: '卡塔赫纳独立日', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Día de la Inmaculada Concepción', localName: 'Día de la Inmaculada Concepción', nameCN: '圣母无原罪瞻礼', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Peru 秘鲁
PE: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-29', name: 'Día de San Pedro y San Pablo', localName: 'Día de San Pedro y San Pablo', nameCN: '圣彼得和圣保罗日', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-07-29', name: 'Fiestas Patrias', localName: 'Fiestas Patrias', nameCN: '祖国节', type: 'public', impact: 'high' },
  { date: '2025-08-30', name: 'Santa Rosa de Lima', localName: 'Santa Rosa de Lima', nameCN: '利马的圣罗莎日', type: 'public', impact: 'medium' },
  { date: '2025-10-08', name: 'Combate de Angamos', localName: 'Combate de Angamos', nameCN: '安加莫斯战役日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'Día de Todos los Santos', localName: 'Día de Todos los Santos', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Inmaculada Concepción', localName: 'Inmaculada Concepción', nameCN: '圣母无原罪瞻礼', type: 'public', impact: 'high' },
  { date: '2025-12-09', name: 'Batalla de Ayacucho', localName: 'Batalla de Ayacucho', nameCN: '阿亚库乔战役日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Venezuela 委内瑞拉
VE: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Día de Reyes', localName: 'Día de Reyes', nameCN: '三王节', type: 'observance', impact: 'low' },
  { date: '2025-03-03', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-03-04', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-04-19', name: 'Declaración de la Independencia', localName: 'Declaración de la Independencia', nameCN: '独立宣言日', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajador', localName: 'Día del Trabajador', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Batalla de Carabobo', localName: 'Batalla de Carabobo', nameCN: '卡拉博博战役日', type: 'public', impact: 'high' },
  { date: '2025-07-05', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-07-24', name: 'Natalicio del Libertador Simón Bolívar', localName: 'Natalicio del Libertador Simón Bolívar', nameCN: '解放者西蒙·玻利瓦尔诞辰日', type: 'public', impact: 'high' },
  { date: '2025-10-12', name: 'Día de la Resistencia Indígena', localName: 'Día de la Resistencia Indígena', nameCN: '原住民抵抗日', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Víspera de Navidad', localName: 'Víspera de Navidad', nameCN: '圣诞夜', type: 'observance', impact: 'low' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'Víspera de Año Nuevo', localName: 'Víspera de Año Nuevo', nameCN: '新年前夜', type: 'observance', impact: 'low' }
],
// Ecuador 厄瓜多尔
EC: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-03-04', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-24', name: 'Batalla de Pichincha', localName: 'Batalla de Pichincha', nameCN: '皮钦查战役日', type: 'public', impact: 'high' },
  { date: '2025-08-10', name: 'Primer Grito de Independencia', localName: 'Primer Grito de Independencia', nameCN: '独立第一声呐喊日', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'Independencia de Guayaquil', localName: 'Independencia de Guayaquil', nameCN: '瓜亚基尔独立日', type: 'public', impact: 'high' },
  { date: '2025-11-02', name: 'Día de los Difuntos', localName: 'Día de los Difuntos', nameCN: '万灵节', type: 'public', impact: 'medium' },
  { date: '2025-11-03', name: 'Independencia de Cuenca', localName: 'Independencia de Cuenca', nameCN: '昆卡独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Uruguay 乌拉圭
UY: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Día de Reyes', localName: 'Día de Reyes', nameCN: '三王节', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-03-04', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Día de la Armada', localName: 'Día de la Armada', nameCN: '海军日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Día de los Trabajadores', localName: 'Día de los Trabajadores', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-18', name: 'Batalla de Las Piedras', localName: 'Batalla de Las Piedras', nameCN: '拉斯彼德拉斯战役日', type: 'public', impact: 'medium' },
  { date: '2025-06-19', name: 'Natalicio de Artigas', localName: 'Natalicio de Artigas', nameCN: '阿蒂加斯诞辰日', type: 'public', impact: 'high' },
  { date: '2025-07-18', name: 'Jura de la Constitución', localName: 'Jura de la Constitución', nameCN: '宪法宣誓日', type: 'public', impact: 'high' },
  { date: '2025-08-25', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'Día de la Raza', localName: 'Día de la Raza', nameCN: '种族日', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'Día de los Difuntos', localName: 'Día de los Difuntos', nameCN: '万灵节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Paraguay 巴拉圭
PY: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Día de los Héroes', localName: 'Día de los Héroes', nameCN: '英雄日', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajador', localName: 'Día del Trabajador', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-14', name: 'Día de la Independencia Nacional', localName: 'Día de la Independencia Nacional', nameCN: '国家独立日', type: 'public', impact: 'high' },
  { date: '2025-05-15', name: 'Día de la Independencia Nacional (Day 2)', localName: 'Día de la Independencia Nacional (Day 2)', nameCN: '国家独立日（第二天）', type: 'public', impact: 'high' },
  { date: '2025-06-12', name: 'Día de la Paz del Chaco', localName: 'Día de la Paz del Chaco', nameCN: '查科和平日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Día de la Fundación de Asunción', localName: 'Día de la Fundación de Asunción', nameCN: '亚松森建城日', type: 'public', impact: 'high' },
  { date: '2025-12-08', name: 'Día de la Virgen de Caacupé', localName: 'Día de la Virgen de Caacupé', nameCN: '卡库佩圣母日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Bolivia 玻利维亚
BO: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-22', name: 'Día del Estado Plurinacional de Bolivia', localName: 'Día del Estado Plurinacional de Bolivia', nameCN: '玻利维亚多民族国家日', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-03-04', name: 'Carnaval', localName: 'Carnaval', nameCN: '狂欢节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Corpus Christi', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-08-06', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-11-02', name: 'Día de Todos Santos', localName: 'Día de Todos Santos', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Central America 中美洲
// Panama 巴拿马
PA: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-09', name: 'Día de los Mártires', localName: 'Día de los Mártires', nameCN: '烈士日', type: 'public', impact: 'high' },
  { date: '2025-03-04', name: 'Martes de Carnaval', localName: 'Martes de Carnaval', nameCN: '狂欢节星期二', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-11-03', name: 'Día de la Separación de Panamá de Colombia', localName: 'Día de la Separación de Panamá de Colombia', nameCN: '巴拿马脱离哥伦比亚独立日', type: 'public', impact: 'high' },
  { date: '2025-11-04', name: 'Día de los Símbolos Patrios', localName: 'Día de los Símbolos Patrios', nameCN: '国家象征日', type: 'public', impact: 'medium' },
  { date: '2025-11-05', name: 'Día de la Colón', localName: 'Día de la Colón', nameCN: '哥伦布日', type: 'public', impact: 'medium' },
  { date: '2025-11-10', name: 'Primer Grito de Independencia de la Villa de Los Santos', localName: 'Primer Grito de Independencia de la Villa de Los Santos', nameCN: '洛斯桑托斯镇独立第一声呐喊日', type: 'public', impact: 'high' },
  { date: '2025-11-28', name: 'Día de la Independencia de Panamá de España', localName: 'Día de la Independencia de Panamá de España', nameCN: '巴拿马脱离西班牙独立日', type: 'public', impact: 'high' },
  { date: '2025-12-08', name: 'Día de la Madre', localName: 'Día de la Madre', nameCN: '母亲节', type: 'public', impact: 'high' },
  { date: '2025-12-20', name: 'Día de Duelo Nacional', localName: 'Día de Duelo Nacional', nameCN: '国家哀悼日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Día de Navidad', localName: 'Día de Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Costa Rica 哥斯达黎加
CR: [
  { date: '2025-01-01', name: 'Día de Año Nuevo', localName: 'Día de Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-11', name: 'Día de Juan Santamaría', localName: 'Día de Juan Santamaría', nameCN: '胡安·桑塔马利亚日', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajador', localName: 'Día del Trabajador', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-07-25', name: 'Anexión del Partido de Nicoya', localName: 'Anexión del Partido de Nicoya', nameCN: '尼科亚地区并入日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Día de la Madre', localName: 'Día de la Madre', nameCN: '母亲节', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-12', name: 'Día de las Culturas', localName: 'Día de las Culturas', nameCN: '文化日', type: 'public', impact: 'medium' },
  { date: '2025-12-01', name: 'Día de la Abolición del Ejército', localName: 'Día de la Abolición del Ejército', nameCN: '废除军队日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Día de Navidad', localName: 'Día de Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Guatemala 危地马拉
GT: [
  { date: '2025-01-01', name: 'Día de Año Nuevo', localName: 'Día de Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Sábado Santo', localName: 'Sábado Santo', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-30', name: 'Día del Ejército', localName: 'Día del Ejército', nameCN: '军队日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Día de la Asunción', localName: 'Día de la Asunción', nameCN: '圣母升天日', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-20', name: 'Día de la Revolución', localName: 'Día de la Revolución', nameCN: '革命日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'Día de Todos los Santos', localName: 'Día de Todos los Santos', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Noche Buena', localName: 'Noche Buena', nameCN: '圣诞夜', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Día de Navidad', localName: 'Día de Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'Noche Vieja', localName: 'Noche Vieja', nameCN: '新年前夜', type: 'public', impact: 'high' }
],
// El Salvador 萨尔瓦多
SV: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Sábado Santo', localName: 'Sábado Santo', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Día Internacional del Trabajo', localName: 'Día Internacional del Trabajo', nameCN: '国际劳动节', type: 'public', impact: 'high' },
  { date: '2025-08-03', name: 'Día del Comercio', localName: 'Día del Comercio', nameCN: '商业日', type: 'public', impact: 'medium' },
  { date: '2025-08-04', name: 'Día del Empleado Público', localName: 'Día del Empleado Público', nameCN: '公职人员日', type: 'public', impact: 'medium' },
  { date: '2025-08-05', name: 'Fiestas Agostinas (Día de San Salvador)', localName: 'Fiestas Agostinas (Día de San Salvador)', nameCN: '八月节（圣萨尔瓦多日）', type: 'public', impact: 'high' },
  { date: '2025-08-06', name: 'Fiestas Agostinas (Día de la Transfiguración)', localName: 'Fiestas Agostinas (Día de la Transfiguración)', nameCN: '八月节（耶稣显圣日）', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-11-02', name: 'Día de los Difuntos', localName: 'Día de los Difuntos', nameCN: '万灵节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Honduras 洪都拉斯
HN: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Sábado de Gloria', localName: 'Sábado de Gloria', nameCN: '荣耀周六', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-03', name: 'Día del Soldado', localName: 'Día del Soldado', nameCN: '士兵日', type: 'public', impact: 'medium' },
  { date: '2025-10-12', name: 'Día de la Raza', localName: 'Día de la Raza', nameCN: '种族日', type: 'public', impact: 'medium' },
  { date: '2025-10-21', name: 'Día de las Fuerzas Armadas', localName: 'Día de las Fuerzas Armadas', nameCN: '武装部队日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Nicaragua 尼加拉瓜
NI: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Jueves Santo', localName: 'Jueves Santo', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Sábado Santo', localName: 'Sábado Santo', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Día Internacional de los Trabajadores', localName: 'Día Internacional de los Trabajadores', nameCN: '国际劳动节', type: 'public', impact: 'high' },
  { date: '2025-07-19', name: 'Día de la Revolución Sandinista', localName: 'Día de la Revolución Sandinista', nameCN: '桑地诺革命日', type: 'public', impact: 'high' },
  { date: '2025-09-14', name: 'Batalla de San Jacinto', localName: 'Batalla de San Jacinto', nameCN: '圣哈辛托战役日', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-08', name: 'Día de la Inmaculada Concepción', localName: 'Día de la Inmaculada Concepción', nameCN: '圣母无原罪瞻礼', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Día de Navidad', localName: 'Día de Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Caribbean 加勒比地区
// Cuba 古巴
CU: [
  { date: '2025-01-01', name: 'Día de la Liberación', localName: 'Día de la Liberación', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-01-02', name: 'Día de la Victoria', localName: 'Día de la Victoria', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día Internacional de los Trabajadores', localName: 'Día Internacional de los Trabajadores', nameCN: '国际劳动节', type: 'public', impact: 'high' },
  { date: '2025-07-25', name: 'Día de la Revolución (asueto)', localName: 'Día de la Revolución (asueto)', nameCN: '革命日（补假）', type: 'public', impact: 'high' },
  { date: '2025-07-26', name: 'Día de la Rebeldía Nacional', localName: 'Día de la Rebeldía Nacional', nameCN: '民族起义日', type: 'public', impact: 'high' },
  { date: '2025-07-27', name: 'Día de la Rebeldía Nacional (asueto)', localName: 'Día de la Rebeldía Nacional (asueto)', nameCN: '民族起义日（补假）', type: 'public', impact: 'high' },
  { date: '2025-10-10', name: 'Día de la Independencia', localName: 'Día de la Independencia', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Navidad', localName: 'Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'Noche Vieja', localName: 'Noche Vieja', nameCN: '新年前夜', type: 'public', impact: 'high' }
],
// Dominican Republic 多米尼加共和国
DO: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: 'Año Nuevo', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Día de Reyes', localName: 'Día de Reyes', nameCN: '三王节', type: 'public', impact: 'medium' },
  { date: '2025-01-21', name: 'Día de la Altagracia', localName: 'Día de la Altagracia', nameCN: '阿尔塔格拉西亚圣母日', type: 'public', impact: 'medium' },
  { date: '2025-01-26', name: 'Día de Duarte', localName: 'Día de Duarte', nameCN: '杜阿尔特日', type: 'public', impact: 'high' },
  { date: '2025-02-27', name: 'Día de la Independencia Nacional', localName: 'Día de la Independencia Nacional', nameCN: '国家独立日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: 'Viernes Santo', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajo', localName: 'Día del Trabajo', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Corpus Christi', nameCN: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-08-16', name: 'Día de la Restauración', localName: 'Día de la Restauración', nameCN: '复辟日', type: 'public', impact: 'high' },
  { date: '2025-09-24', name: 'Día de Nuestra Señora de las Mercedes', localName: 'Día de Nuestra Señora de las Mercedes', nameCN: '梅塞德斯圣母日', type: 'public', impact: 'medium' },
  { date: '2025-11-06', name: 'Día de la Constitución', localName: 'Día de la Constitución', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Día de Navidad', localName: 'Día de Navidad', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Jamaica 牙买加
JM: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-23', name: 'Ash Wednesday', localName: 'Ash Wednesday', nameCN: '圣灰星期三', type: 'observance', impact: 'low' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-23', name: 'Labour Day', localName: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-08-01', name: 'Emancipation Day', localName: 'Emancipation Day', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-08-06', name: 'Independence Day', localName: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-20', name: 'National Heroes Day', localName: 'National Heroes Day', nameCN: '国家英雄日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Trinidad and Tobago 特立尼达和多巴哥
TT: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Carnival Monday', localName: 'Carnival Monday', nameCN: '狂欢节星期一', type: 'public', impact: 'high' },
  { date: '2025-03-04', name: 'Carnival Tuesday', localName: 'Carnival Tuesday', nameCN: '狂欢节星期二', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Easter Monday', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-30', name: 'Indian Arrival Day', localName: 'Indian Arrival Day', nameCN: '印度人抵达日', type: 'public', impact: 'medium' },
  { date: '2025-06-19', name: 'Labour Day', localName: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid-ul-Fitr (subject to moon sighting)', localName: 'Eid-ul-Fitr (subject to moon sighting)', nameCN: '开斋节（视月相而定）', type: 'public', impact: 'high' },
  { date: '2025-08-01', name: 'Emancipation Day', localName: 'Emancipation Day', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-08-31', name: 'Independence Day', localName: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-09-24', name: 'Republic Day', localName: 'Republic Day', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Divali (subject to moon sighting)', localName: 'Divali (subject to moon sighting)', nameCN: '排灯节（视月相而定）', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Day', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Africa 非洲
// South Africa 南非
ZA: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Nieuwjaarsdag', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-21', name: 'Human Rights Day', localName: 'Menseregte Dag', nameCN: '人权日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Goede Vrydag', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Family Day', localName: 'Familiedag', nameCN: '家庭日', type: 'public', impact: 'medium' },
  { date: '2025-04-27', name: 'Freedom Day', localName: 'Vryheidsdag', nameCN: '自由日', type: 'public', impact: 'high' },
  { date: '2025-04-28', name: 'Freedom Day (holiday in lieu)', localName: 'Vryheidsdag (vervangingsdag)', nameCN: '自由日（补假）', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Workers\' Day', localName: 'Werkerdag', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Youth Day', localName: 'Jeugd Dag', nameCN: '青年日', type: 'public', impact: 'high' },
  { date: '2025-08-09', name: 'National Women\'s Day', localName: 'Nasionale Vrouedag', nameCN: '全国妇女节', type: 'public', impact: 'high' },
  { date: '2025-08-11', name: 'National Women\'s Day (holiday in lieu)', localName: 'Nasionale Vrouedag (vervangingsdag)', nameCN: '全国妇女节（补假）', type: 'public', impact: 'high' },
  { date: '2025-09-24', name: 'Heritage Day', localName: 'Erfenisdag', nameCN: '遗产日', type: 'public', impact: 'high' },
  { date: '2025-12-16', name: 'Day of Reconciliation', localName: 'Dag van Versoeniging', nameCN: '和解日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Kersfeesdag', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Day of Goodwill', localName: 'Dag van Welwillendheid', nameCN: '善意日', type: 'public', impact: 'high' }
],
// Nigeria 尼日利亚
NG: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Ojo Titun', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Jumma\'a Mai Kyau', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Litinin Istaqulah', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Workers\' Day', localName: 'Ranar Ma\'aikata', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Democracy Day', localName: 'Ranar Dimokuradiyya', nameCN: '民主日', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'Sallar Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-07-29', name: 'Eid al-Fitr (Day 2)', localName: 'Sallar Fitr (Ranar 2)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Eid al-Adha', localName: 'Sallar Qurban', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-09-16', name: 'Eid al-Adha (Day 2)', localName: 'Sallar Qurban (Ranar 2)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-10-01', name: 'Independence Day', localName: 'Ranar \'Yancin Kai', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Ranar Kirsimeti', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Ranar Boxi', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Kenya 肯尼亚
KE: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Siku ya Mwaka Mpya', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Ijumaa Nzuri', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Jumatatu ya Pasaka', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Siku ya Wafanyakazi', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-01', name: 'Madaraka Day', localName: 'Siku ya Madaraka', nameCN: '马萨拉卡日', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Madaraka Day (holiday in lieu)', localName: 'Siku ya Madaraka (Siku ya Malipo)', nameCN: '马萨拉卡日（补假）', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid al-Adha', localName: 'Eid al-Adha', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-10-10', name: 'Huduma Day', localName: 'Siku ya Huduma', nameCN: '服务日', type: 'public', impact: 'medium' },
  { date: '2025-10-20', name: 'Mashujaa Day', localName: 'Siku ya Mashujaa', nameCN: '英雄日', type: 'public', impact: 'high' },
  { date: '2025-12-12', name: 'Jamhuri Day', localName: 'Siku ya Jamhuri', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Siku ya Krismasi', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Siku ya Boxing', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Morocco 摩洛哥
MA: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-11', name: 'Proclamation of Independence Day', localName: 'يوم إعلان الاستقلال', nameCN: '独立宣言日', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Amazigh New Year (Yennayer)', localName: 'رأس السنة الأمازيغية (يناير)', nameCN: '阿马齐格新年', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عيد الفطر (اليوم الثاني)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'يوم العمال', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 2)', localName: 'عيد الأضحى (اليوم الثاني)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-07-30', name: 'Feast of the Throne', localName: 'عيد العرش', nameCN: '王位节', type: 'public', impact: 'high' },
  { date: '2025-08-14', name: 'Oued Eddahab Day', localName: 'يوم وادي إدحب', nameCN: '乌埃德达哈卜日', type: 'public', impact: 'medium' },
  { date: '2025-08-20', name: 'Revolution of the King and the People', localName: 'ثورة الملك والشعب', nameCN: '国王与人民革命日', type: 'public', impact: 'high' },
  { date: '2025-08-21', name: 'Youth Day', localName: 'يوم الشباب', nameCN: '青年日', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Prophet\'s Birthday', localName: 'مولد النبي', nameCN: '先知诞辰日', type: 'public', impact: 'medium' },
  { date: '2025-11-06', name: 'Green March Day', localName: 'يوم المسيرة الخضراء', nameCN: '绿色进军日', type: 'public', impact: 'high' },
  { date: '2025-11-18', name: 'Independence Day', localName: 'يوم الاستقلال', nameCN: '独立日', type: 'public', impact: 'high' }
],
// Ghana 加纳
GH: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Afiaseɛ Den', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Constitution Day', localName: 'Nkosoɔ Nkroma Den', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-03-06', name: 'Independence Day', localName: 'Nkyerɛmfoo Den', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Ɛnan Fofie', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Kwaakwaa Den', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'May Day', localName: 'Ɔbenimfoo Den', nameCN: '五一劳动节', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-08-04', name: 'Founders\' Day', localName: 'Nkɔsoɔfoɔ Den', nameCN: '开国元勋日', type: 'public', impact: 'high' },
  { date: '2025-09-21', name: 'Kwame Nkrumah Memorial Day', localName: 'Kwame Nkrumah Kyerɛm Den', nameCN: '克瓦米·恩克鲁玛纪念日', type: 'public', impact: 'high' },
  { date: '2025-09-22', name: 'Kwame Nkrumah Memorial Day (holiday in lieu)', localName: 'Kwame Nkrumah Kyerɛm Den (Afiaseɛ Ho)', nameCN: '克瓦米·恩克鲁玛纪念日（补假）', type: 'public', impact: 'high' },
  { date: '2025-12-05', name: 'Farmers\' Day', localName: 'Ahenkwaa Den', nameCN: '农民日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Krisimas Den', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Boxing Den', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Ethiopia 埃塞俄比亚
ET: [
  { date: '2025-01-07', name: 'Genna (Christmas)', localName: 'ገና (ክርስቶስ)', nameCN: '埃塞俄比亚圣诞节', type: 'public', impact: 'high' },
  { date: '2025-01-19', name: 'Timkat (Epiphany)', localName: 'ጥምቃት (ኢፒፊኔ)', nameCN: '蒂姆卡特节（主显节）', type: 'public', impact: 'high' },
  { date: '2025-03-02', name: 'Adwa Victory Day', localName: 'አድዋን νίκης ημέρα', nameCN: '阿杜瓦胜利日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'ጥቅሙስ ፍሬዳይ', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Fasika (Easter)', localName: 'ፋሲካ (ፒስቶስ)', nameCN: '复活节', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'International Labor Day', localName: 'የኢንተርኔሽናል የሰራተኞች ቀን', nameCN: '国际劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Patriots\' Victory Day', localName: 'የአቅሙን νίκης ημέρα', nameCN: '爱国者胜利日', type: 'public', impact: 'high' },
  { date: '2025-05-28', name: 'Derg Downfall Day', localName: 'የደርግ የወደቀበት ቀን', nameCN: '德尔格政权倒台日', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'ኢድ አል-ፍትር', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-09-11', name: 'Enkutatash (Ethiopian New Year)', localName: 'እንቁጣጣሽ (የኢትዮጵያ አዲስ ዓመት)', nameCN: '恩库塔塔什（埃塞俄比亚新年）', type: 'public', impact: 'high' },
  { date: '2025-09-27', name: 'Meskel (Finding of the True Cross)', localName: 'መስከል (የእውነተኛው ክርስቶስ)', nameCN: '梅斯克尔节（发现真十字架日）', type: 'public', impact: 'high' },
  { date: '2025-12-16', name: 'Eid al-Adha', localName: 'ኢድ አል-አድሃ', nameCN: '古尔邦节', type: 'public', impact: 'high' }
],
// Tanzania 坦桑尼亚
TZ: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Siku ya Mwaka Mpya', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-12', name: 'Zanzibar Revolution Day', localName: 'Siku ya Mapinduzi ya Zanzibar', nameCN: '桑给巴尔革命日', type: 'public', impact: 'high' },
  { date: '2025-04-07', name: 'Karume Day', localName: 'Siku ya Karume', nameCN: '卡鲁梅日', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Ijumaa Nzuri', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Jumatatu ya Pasaka', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-26', name: 'Union Day', localName: 'Siku ya Umoja', nameCN: '团结日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'International Workers\' Day', localName: 'Siku ya Wafanyakazi wa Kimataifa', nameCN: '国际劳动节', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Saba Saba', localName: 'Saba Saba', nameCN: '七七节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-08-08', name: 'Nane Nane', localName: 'Nane Nane', nameCN: '八八节', type: 'public', impact: 'medium' },
  { date: '2025-10-14', name: 'Nyerere Day', localName: 'Siku ya Nyerere', nameCN: '尼雷尔日', type: 'public', impact: 'high' },
  { date: '2025-12-09', name: 'Independence and Republic Day', localName: 'Siku ya Uhuru na Jamhuri', nameCN: '独立与共和国日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Siku ya Krismasi', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Siku ya Boxi', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Uganda 乌干达
UG: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Siku ya Mwaka Mpya', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-26', name: 'Liberation Day', localName: 'Siku ya Ukombozi', nameCN: '解放日', type: 'public', impact: 'high' },
  { date: '2025-01-27', name: 'Liberation Day (holiday in lieu)', localName: 'Siku ya Ukombozi (Siku ya Malipo)', nameCN: '解放日（补假）', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: 'International Women\'s Day', localName: 'Siku ya Wanawake wa Kimataifa', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Ijumaa Nzuri', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Jumatatu ya Pasaka', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Siku ya Wafanyakazi', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-03', name: 'Martyrs\' Day', localName: 'Siku ya Shuhada', nameCN: '烈士日', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'National Heroes\' Day', localName: 'Siku ya Washaibu wa Kitaifa', nameCN: '国家英雄日', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'Independence Day', localName: 'Siku ya Uhuru', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-09', name: 'Eid al-Adha', localName: 'Eid al-Adha', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Siku ya Krismasi', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Siku ya Boxi', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Algeria 阿尔及利亚
DZ: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-12', name: 'Amazigh New Year (Yennayer)', localName: 'رأس السنة الأمازيغية (يناير)', nameCN: '阿马齐格新年', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عيد الفطر (اليوم الثاني)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', localName: 'عيد الفطر (اليوم الثالث)', nameCN: '开斋节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'يوم العمال', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 2)', localName: 'عيد الأضحى (اليوم الثاني)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Eid al-Adha (Day 3)', localName: 'عيد الأضحى (اليوم الثالث)', nameCN: '古尔邦节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-07-05', name: 'Independence Day', localName: 'يوم الاستقلال', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-09-15', name: 'Prophet\'s Birthday', localName: 'مولد النبي', nameCN: '先知诞辰日', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'Revolution Day', localName: 'يوم الثورة', nameCN: '革命日', type: 'public', impact: 'high' }
],
// Tunisia 突尼斯
TN: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'يوم العام الجديد', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-14', name: 'Revolution and Youth Day', localName: 'يوم الثورة والشباب', nameCN: '革命与青年日', type: 'public', impact: 'high' },
  { date: '2025-03-20', name: 'Independence Day', localName: 'يوم الاستقلال', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-09', name: 'Martyrs\' Day', localName: 'يوم الشهداء', nameCN: '烈士日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', localName: 'عيد الفطر', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', localName: 'عيد الفطر (اليوم الثاني)', nameCN: '开斋节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', localName: 'عيد الفطر (اليوم الثالث)', nameCN: '开斋节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'يوم العمال', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha', localName: 'عيد الأضحى', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 2)', localName: 'عيد الأضحى (اليوم الثاني)', nameCN: '古尔邦节（第二天）', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Eid al-Adha (Day 3)', localName: 'عيد الأضحى (اليوم الثالث)', nameCN: '古尔邦节（第三天）', type: 'public', impact: 'high' },
  { date: '2025-07-07', name: 'Islamic New Year', localName: 'رأس السنة الهجرية', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-07-25', name: 'Republic Day', localName: 'يوم الجمهورية', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-08-13', name: 'Women\'s Day', localName: 'يوم المرأة', nameCN: '妇女节', type: 'public', impact: 'medium' },
  { date: '2025-09-15', name: 'Prophet\'s Birthday', localName: 'مولد النبي', nameCN: '先知诞辰日', type: 'public', impact: 'medium' },
  { date: '2025-10-15', name: 'Evacuation Day', localName: 'يوم الإخلاء', nameCN: '撤离日', type: 'public', impact: 'high' }
],
// Zimbabwe 津巴布韦
ZW: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Zuva reGore Ritsva', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Chisimba Chakanaka', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: 'Mugovera wePasi', nameCN: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Svondo wePasi', nameCN: '复活节星期日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Muvhuro wePasi', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Independence Day', localName: 'Zuva reKuzvipira', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Workers\' Day', localName: 'Zuva reVashandi', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-25', name: 'Africa Day', localName: 'Zuva reAfrica', nameCN: '非洲日', type: 'public', impact: 'medium' },
  { date: '2025-05-26', name: 'Africa Day (holiday in lieu)', localName: 'Zuva reAfrica (Zuva reKugovera)', nameCN: '非洲日（补假）', type: 'public', impact: 'medium' },
  { date: '2025-08-11', name: 'Heroes\' Day', localName: 'Zuva reVahosi', nameCN: '英雄日', type: 'public', impact: 'high' },
  { date: '2025-08-12', name: 'Defence Forces National Holiday', localName: 'Chisimba cheHosvo Dzekudzivirira', nameCN: '国防军全国假日', type: 'public', impact: 'high' },
  { date: '2025-12-22', name: 'National Unity Day', localName: 'Zuva reKubatana Kwenzvimbo', nameCN: '国家团结日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Zuva reKristmasi', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Zuva reBoxing', nameCN: '节礼日', type: 'public', impact: 'high' }
],
// Cameroon 喀麦隆
CM: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Jour de l\'An', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-11', name: 'Youth Day', localName: 'Jour de la Jeunesse', nameCN: '青年日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Vendredi Saint', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Fête du Travail', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-20', name: 'National Day', localName: 'Jour National', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'Aïd al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Eid al-Adha', localName: 'Aïd al-Adha', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Jour de Noël', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Côte d'Ivoire 科特迪瓦
CI: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Jour de l\'An', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Lundi de Pâques', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Fête du Travail', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Ascension', nameCN: '耶稣升天日', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Pentecost Monday', localName: 'Lundi de Pentecôte', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Eid al-Fitr', localName: 'Aïd al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-08-07', name: 'Independence Day', localName: 'Jour de l\'Indépendance', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption Day', localName: 'Assomption', nameCN: '圣母升天日', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Eid al-Adha', localName: 'Aïd al-Adha', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints\' Day', localName: 'Toussaint', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-15', name: 'National Peace Day', localName: 'Jour de la Paix Nationale', nameCN: '全国和平日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Jour de Noël', nameCN: '圣诞节', type: 'public', impact: 'high' }
],
// Senegal 塞内加尔
SN: [
  { date: '2025-01-01', name: 'New Year\'s Day', localName: 'Jour de l\'An', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Independence Day', localName: 'Jour de l\'Indépendance', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Lundi de Pâques', nameCN: '复活节星期一', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Fête du Travail', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Ascension', nameCN: '耶稣升天日', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Pentecost Monday', localName: 'Lundi de Pentecôte', nameCN: '圣灵降临节星期一', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Korité (Eid al-Fitr)', localName: 'Korité (Aïd al-Fitr)', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption Day', localName: 'Assomption', nameCN: '圣母升天日', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Tabaski (Eid al-Adha)', localName: 'Tabaski (Aïd al-Adha)', nameCN: '古尔邦节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints\' Day', localName: 'Toussaint', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Jour de Noël', nameCN: '圣诞节', type: 'public', impact: 'high' }
]
}

// 2026年手工修订数据（优先覆盖生成数据）
const curatedHolidays2026: Record<string, Holiday[]> = {
  US: [
    { date: '2026-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2026-01-19', name: 'Martin Luther King Jr. Day', type: 'public', impact: 'medium' },
    { date: '2026-02-16', name: "Presidents' Day", type: 'public', impact: 'medium' },
    { date: '2026-05-25', name: 'Memorial Day', type: 'public', impact: 'high' },
    { date: '2026-06-19', name: 'Juneteenth', type: 'public', impact: 'medium' },
    { date: '2026-07-03', name: 'Independence Day (Observed)', type: 'public', impact: 'high' }, // July 4th falls on a Saturday, so observed on Friday
    { date: '2026-09-07', name: 'Labor Day', type: 'public', impact: 'high' },
    { date: '2026-10-12', name: 'Columbus Day', type: 'public', impact: 'low' },
    { date: '2026-11-11', name: 'Veterans Day', type: 'public', impact: 'medium' },
    { date: '2026-11-26', name: 'Thanksgiving Day', type: 'public', impact: 'high' },
    { date: '2026-11-27', name: 'Black Friday', type: 'observance', impact: 'high' },
    { date: '2026-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  ],
  GB: [
    { date: '2026-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2026-04-03', name: 'Good Friday', type: 'public', impact: 'high' },
    { date: '2026-04-06', name: 'Easter Monday', type: 'public', impact: 'high' },
    { date: '2026-05-04', name: 'Early May Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2026-05-25', name: 'Spring Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2026-08-31', name: 'Summer Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2026-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
    { date: '2026-12-28', name: 'Boxing Day (Substitute Day)', type: 'public', impact: 'high' }, // Boxing Day falls on a Saturday, so observed on Monday
  ],
  DE: [
    { date: '2026-01-01', name: 'Neujahr', localName: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2026-01-06', name: 'Heilige Drei Könige', localName: 'Epiphany', type: 'regional', impact: 'low' },
    { date: '2026-04-03', name: 'Karfreitag', localName: 'Good Friday', type: 'public', impact: 'high' },
    { date: '2026-04-06', name: 'Ostermontag', localName: 'Easter Monday', type: 'public', impact: 'high' },
    { date: '2026-05-01', name: 'Tag der Arbeit', localName: 'Labour Day', type: 'public', impact: 'high' },
    { date: '2026-05-14', name: 'Christi Himmelfahrt', localName: 'Ascension Day', type: 'public', impact: 'medium' },
    { date: '2026-05-25', name: 'Pfingstmontag', localName: 'Whit Monday', type: 'public', impact: 'medium' },
    { date: '2026-10-03', name: 'Tag der Deutschen Einheit', localName: 'German Unity Day', type: 'public', impact: 'high' },
    { date: '2026-12-25', name: '1. Weihnachtstag', localName: 'Christmas Day', type: 'public', impact: 'high' },
    { date: '2026-12-26', name: '2. Weihnachtstag', localName: 'Boxing Day', type: 'public', impact: 'high' },
  ],
  JP: [
    { date: '2026-01-01', name: '元日', localName: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2026-01-12', name: '成人の日', localName: 'Coming of Age Day', type: 'public', impact: 'medium' },
    { date: '2026-02-11', name: '建国記念の日', localName: 'National Foundation Day', type: 'public', impact: 'medium' },
    { date: '2026-02-23', name: '天皇誕生日', localName: "Emperor's Birthday", type: 'public', impact: 'medium' },
    { date: '2026-03-20', name: '春分の日', localName: 'Vernal Equinox', type: 'public', impact: 'medium' },
    { date: '2026-04-29', name: '昭和の日', localName: 'Showa Day', type: 'public', impact: 'high' },
    { date: '2026-05-03', name: '憲法記念日', localName: 'Constitution Memorial Day', type: 'public', impact: 'high' },
    { date: '2026-05-04', name: 'みどりの日', localName: 'Greenery Day', type: 'public', impact: 'high' },
    { date: '2026-05-05', name: 'こどもの日', localName: "Children's Day", type: 'public', impact: 'high' },
    { date: '2026-05-06', name: '振替休日', localName: 'Holiday in Lieu of Constitution Memorial Day', type: 'public', impact: 'high' }, // Constitution Memorial Day falls on a Sunday
    { date: '2026-07-20', name: '海の日', localName: 'Marine Day', type: 'public', impact: 'medium' },
    { date: '2026-08-11', name: '山の日', localName: 'Mountain Day', type: 'public', impact: 'medium' },
    { date: '2026-09-21', name: '敬老の日', localName: 'Respect for the Aged Day', type: 'public', impact: 'medium' },
    { date: '2026-09-22', name: '国民の休日', localName: 'National People\'s Day Holiday', type: 'public', impact: 'medium' }, // Silver Week (falls between two holidays)
    { date: '2026-09-23', name: '秋分の日', localName: 'Autumnal Equinox', type: 'public', impact: 'medium' },
    { date: '2026-10-12', name: 'スポーツの日', localName: 'Sports Day', type: 'public', impact: 'medium' },
    { date: '2026-11-03', name: '文化の日', localName: 'Culture Day', type: 'public', impact: 'medium' },
    { date: '2026-11-23', name: '勤労感謝の日', localName: 'Labor Thanksgiving', type: 'public', impact: 'medium' },
  ],
  FR: [
    { date: '2026-01-01', name: 'Jour de l\'an', localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-04-06', name: 'Lundi de Pâques', localName: '复活节星期一', type: 'public', impact: 'high' },
    { date: '2026-05-01', name: 'Fête du Travail', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2026-05-08', name: 'Victoire 1945', localName: '二战胜利日', type: 'public', impact: 'medium' },
    { date: '2026-05-14', name: 'Ascension', localName: '耶稣升天节', type: 'public', impact: 'medium' },
    { date: '2026-05-25', name: 'Lundi de Pentecôte', localName: '圣灵降临节', type: 'public', impact: 'medium' },
    { date: '2026-07-14', name: 'Fête nationale', localName: '国庆日', type: 'public', impact: 'high' },
    { date: '2026-08-15', name: 'Assomption', localName: '圣母升天节', type: 'public', impact: 'medium' },
    { date: '2026-11-01', name: 'Toussaint', localName: '万圣节', type: 'public', impact: 'medium' },
    { date: '2026-11-11', name: 'Armistice 1918', localName: '一战停战日', type: 'public', impact: 'medium' },
    { date: '2026-12-25', name: 'Noël', localName: '圣诞节', type: 'public', impact: 'high' },
  ],
  IT: [
    { date: '2026-01-01', name: 'Capodanno', localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-01-06', name: 'Epifania', localName: '主显节', type: 'public', impact: 'medium' },
    { date: '2026-04-06', name: 'Lunedì di Pasqua', localName: '复活节星期一', type: 'public', impact: 'high' },
    { date: '2026-04-25', name: 'Festa della Liberazione', localName: '解放日', type: 'public', impact: 'medium' },
    { date: '2026-05-01', name: 'Festa del Lavoro', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2026-06-02', name: 'Festa della Repubblica', localName: '共和国日', type: 'public', impact: 'high' },
    { date: '2026-08-15', name: 'Ferragosto', localName: '八月节', type: 'public', impact: 'high' },
    { date: '2026-11-01', name: 'Ognissanti', localName: '万圣节', type: 'public', impact: 'medium' },
    { date: '2026-12-08', name: 'Immacolata Concezione', localName: '圣母无染原罪节', type: 'public', impact: 'medium' },
    { date: '2026-12-25', name: 'Natale', localName: '圣诞节', type: 'public', impact: 'high' },
    { date: '2026-12-26', name: 'Santo Stefano', localName: '圣斯德望日', type: 'public', impact: 'high' },
  ],
  ES: [
    { date: '2026-01-01', name: 'Año Nuevo', localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-01-06', name: 'Epifanía del Señor', localName: '主显节', type: 'public', impact: 'medium' },
    { date: '2026-04-03', name: 'Viernes Santo', localName: '耶稣受难日', type: 'public', impact: 'high' },
    { date: '2026-05-01', name: 'Día del Trabajador', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2026-08-15', name: 'Asunción de la Virgen', localName: '圣母升天节', type: 'public', impact: 'medium' },
    { date: '2026-10-12', name: 'Fiesta Nacional', localName: '国庆日', type: 'public', impact: 'high' },
    { date: '2026-11-01', name: 'Todos los Santos', localName: '万圣节', type: 'public', impact: 'medium' },
    { date: '2026-12-06', name: 'Día de la Constitución', localName: '宪法日', type: 'public', impact: 'medium' },
    { date: '2026-12-08', name: 'Inmaculada Concepción', localName: '圣母无染原罪节', type: 'public', impact: 'medium' },
    { date: '2026-12-25', name: 'Navidad', localName: '圣诞节', type: 'public', impact: 'high' },
  ],
  KR: [
    { date: '2026-01-01', name: '신정', localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-02-16', name: '설날', localName: '春节', type: 'public', impact: 'high' }, // Lunar New Year
    { date: '2026-02-17', name: '설날', localName: '春节', type: 'public', impact: 'high' },
    { date: '2026-02-18', name: '설날', localName: '春节', type: 'public', impact: 'high' },
    { date: '2026-03-01', name: '삼일절', localName: '三一节', type: 'public', impact: 'medium' },
    { date: '2026-05-05', name: '어린이날', localName: '儿童节', type: 'public', impact: 'medium' },
    { date: '2026-05-25', name: '부처님 오신 날', localName: '佛诞日', type: 'public', impact: 'medium' }, // Buddha's Birthday, observed on Monday as it falls on Sunday
    { date: '2026-06-06', name: '현충일', localName: '显忠日', type: 'public', impact: 'medium' },
    { date: '2026-08-15', name: '광복절', localName: '光复节', type: 'public', impact: 'medium' },
    { date: '2026-10-03', name: '개천절', localName: '开天节', type: 'public', impact: 'medium' },
    { date: '2026-10-05', name: '추석', localName: '中秋节', type: 'public', impact: 'high' }, // Chuseok
    { date: '2026-10-06', name: '추석', localName: '中秋节', type: 'public', impact: 'high' },
    { date: '2026-10-07', name: '추석', localName: '中秋节', type: 'public', impact: 'high' },
    { date: '2026-10-09', name: '한글날', localName: '韩文日', type: 'public', impact: 'medium' },
    { date: '2026-12-25', name: '성탄절', localName: '圣诞节', type: 'public', impact: 'high' },
  ],
  IN: [
    { date: '2026-01-26', name: 'Republic Day', localName: '共和国日', type: 'public', impact: 'high' },
    { date: '2026-03-04', name: 'Holi', localName: '洒红节', type: 'public', impact: 'high' },
    { date: '2026-03-21', name: 'Eid ul-Fitr', localName: '开斋节', type: 'public', impact: 'high' }, // Tentative
    { date: '2026-03-26', name: 'Ram Navami', localName: '罗摩诞辰', type: 'public', impact: 'medium' },
    { date: '2026-04-03', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'medium' },
    { date: '2026-05-28', name: 'Buddha Purnima', localName: '佛诞日', type: 'public', impact: 'medium' }, // Tentative
    { date: '2026-06-07', name: 'Eid ul-Adha', localName: '宰牲节', type: 'public', impact: 'high' }, // Tentative
    { date: '2026-08-15', name: 'Independence Day', localName: '独立日', type: 'public', impact: 'high' },
    { date: '2026-09-04', name: 'Janmashtami', localName: '黑天诞辰', type: 'public', impact: 'medium' }, // Tentative
    { date: '2026-10-02', name: 'Gandhi Jayanti', localName: '甘地诞辰', type: 'public', impact: 'high' },
    { date: '2026-10-20', name: 'Dussehra', localName: '十胜节', type: 'public', impact: 'high' }, // Tentative
    { date: '2026-11-10', name: 'Diwali', localName: '排灯节', type: 'public', impact: 'high' }, // Tentative
    { date: '2026-11-24', name: 'Guru Nanak Jayanti', localName: '古鲁那纳克诞辰', type: 'public', impact: 'medium' }, // Tentative
    { date: '2026-12-25', name: 'Christmas', localName: '圣诞节', type: 'public', impact: 'medium' },
  ],
  BR: [
    { date: '2026-01-01', name: 'Ano Novo', localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-02-16', name: 'Carnaval', localName: '狂欢节', type: 'public', impact: 'high' },
    { date: '2026-02-17', name: 'Carnaval', localName: '狂欢节', type: 'public', impact: 'high' },
    { date: '2026-04-03', name: 'Sexta-feira Santa', localName: '耶稣受难日', type: 'public', impact: 'high' },
    { date: '2026-04-21', name: 'Tiradentes', localName: '蒂拉登特斯日', type: 'public', impact: 'medium' },
    { date: '2026-05-01', name: 'Dia do Trabalho', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2026-06-04', name: 'Corpus Christi', localName: '基督圣体节', type: 'public', impact: 'medium' },
    { date: '2026-09-07', name: 'Independência', localName: '独立日', type: 'public', impact: 'high' },
    { date: '2026-10-12', name: 'Nossa Senhora Aparecida', localName: '圣母显现日', type: 'public', impact: 'medium' },
    { date: '2026-11-02', name: 'Finados', localName: '万灵节', type: 'public', impact: 'medium' },
    { date: '2026-11-15', name: 'Proclamação da República', localName: '共和国成立日', type: 'public', impact: 'medium' },
    { date: '2026-11-20', name: 'Consciência Negra', localName: '黑人意识日', type: 'regional', impact: 'low' },
    { date: '2026-12-25', name: 'Natal', localName: '圣诞节', type: 'public', impact: 'high' },
  ],
  CA: [
    { date: '2026-01-01', name: "New Year's Day", localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-02-16', name: 'Family Day', localName: '家庭日', type: 'regional', impact: 'medium' },
    { date: '2026-04-03', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'high' },
    { date: '2026-04-06', name: 'Easter Monday', localName: '复活节星期一', type: 'regional', impact: 'medium' },
    { date: '2026-05-18', name: 'Victoria Day', localName: '维多利亚日', type: 'public', impact: 'medium' },
    { date: '2026-07-01', name: 'Canada Day', localName: '加拿大日', type: 'public', impact: 'high' },
    { date: '2026-08-03', name: 'Civic Holiday', localName: '公民假日', type: 'regional', impact: 'low' },
    { date: '2026-09-07', name: 'Labour Day', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2026-09-30', name: 'National Day for Truth and Reconciliation', localName: '真相与和解日', type: 'public', impact: 'medium' },
    { date: '2026-10-12', name: 'Thanksgiving', localName: '感恩节', type: 'public', impact: 'high' },
    { date: '2026-11-11', name: 'Remembrance Day', localName: '纪念日', type: 'public', impact: 'medium' },
    { date: '2026-12-25', name: 'Christmas Day', localName: '圣诞节', type: 'public', impact: 'high' },
    { date: '2026-12-26', name: 'Boxing Day', localName: '节礼日', type: 'public', impact: 'high' },
  ],
  AU: [
    { date: '2026-01-01', name: "New Year's Day", localName: '新年', type: 'public', impact: 'high' },
    { date: '2026-01-26', name: 'Australia Day', localName: '澳大利亚日', type: 'public', impact: 'high' },
    { date: '2026-04-03', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'high' },
    { date: '2026-04-04', name: 'Easter Saturday', localName: '复活节星期六', type: 'public', impact: 'medium' },
    { date: '2026-04-06', name: 'Easter Monday', localName: '复活节星期一', type: 'public', impact: 'high' },
    { date: '2026-04-25', name: 'Anzac Day', localName: '澳新军团日', type: 'public', impact: 'high' },
    { date: '2026-06-08', name: "King's Birthday", localName: '国王生日', type: 'public', impact: 'medium' }, // Formerly Queen's Birthday
    { date: '2026-12-25', name: 'Christmas Day', localName: '圣诞节', type: 'public', impact: 'high' },
    { date: '2026-12-28', name: 'Boxing Day (Additional Public Holiday)', localName: '节礼日', type: 'public', impact: 'high' }, // Boxing Day falls on a Saturday, so observed on Monday in many states
  ],
}

export const holidays2026: Record<string, Holiday[]> = mergeHolidayRecords(generatedHolidays2026, curatedHolidays2026)

export const holidays2027: Record<string, Holiday[]> = generatedHolidays2027

// 获取特定国家的节假日
export function getCountryHolidays(countryCode: string, year: number = new Date().getFullYear()): Holiday[] {
  const yearHolidays = generateHolidayData(year)
  return yearHolidays[countryCode] || []
}

// 获取即将到来的节假日
export function getUpcomingHolidays(daysAhead: number = 30): UpcomingHoliday[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const currentYear = today.getFullYear()
  const upcoming: UpcomingHoliday[] = []
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + Math.max(0, daysAhead))
  const years = endDate.getFullYear() === currentYear ? [currentYear] : [currentYear, endDate.getFullYear()]
  const parseLocalDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  const getDaysUntil = (date: string) => Math.round(
    (parseLocalDate(date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  // 国家法定节假日
  years.forEach((year) => {
    Object.entries(generateHolidayData(year)).forEach(([countryCode, holidays]) => {
      const country = countries[countryCode]
      if (!country) return

      holidays.forEach(holiday => {
        const daysUntil = getDaysUntil(holiday.date)
        if (daysUntil > 0 && daysUntil <= daysAhead) {
          upcoming.push({ ...holiday, country: country.name, flag: country.flag, daysUntil })
        }
      })
    })
  })
  
  // 添加国际节假日
  years.forEach((year) => {
    internationalHolidays.forEach(holiday => {
      const date = `${year}-${holiday.date}`
      const daysUntil = getDaysUntil(date)
      if (daysUntil > 0 && daysUntil <= daysAhead) {
        upcoming.push({ ...holiday, date, country: '国际', flag: '🌍', daysUntil })
      }
    })
  })
  
  // 添加重要宗教节日
  if (currentYear === 2025) {
    religiousHolidays2025.forEach(holiday => {
      const daysUntil = getDaysUntil(holiday.date)
      
      if (daysUntil > 0 && daysUntil <= daysAhead && holiday.impact === 'high') {
        upcoming.push({
          ...holiday,
          country: '宗教节日',
          flag: '🙏',
          daysUntil
        })
      }
    })
  }
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil)
}

// 按月份筛选节假日
export function filterHolidaysByMonth(holidays: Holiday[], month: number): Holiday[] {
  return holidays.filter(holiday => {
    const holidayMonth = Number(holiday.date.split('-')[1])
    return holidayMonth === month
  })
}

// 获取节假日类型的中文名称
export function getHolidayTypeName(type: Holiday['type']): string {
  const typeNames = {
    public: '法定假日',
    regional: '地区假日',
    observance: '纪念日',
    international: '国际节日'
  }
  return typeNames[type] || type
}

// 获取影响等级的中文名称
export function getImpactLevelName(impact: Holiday['impact']): string {
  const impactNames = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return impactNames[impact] || impact
}

// 按地区分组获取国家
export function getCountriesByRegion(): Record<string, Array<{ code: string; country: Country }>> {
  const grouped: Record<string, Array<{ code: string; country: Country }>> = {}
  
  Object.entries(countries).forEach(([code, country]) => {
    if (!grouped[country.region]) {
      grouped[country.region] = []
    }
    grouped[country.region].push({ code, country })
  })

  Object.values(grouped).forEach((items) => {
    items.sort((a, b) => a.country.name.localeCompare(b.country.name, 'zh-CN'))
  })
  
  return grouped
}
