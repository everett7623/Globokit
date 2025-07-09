// lib/tools/holiday-query.ts

export interface Country {
  name: string
  flag: string
  timezone: string
  currency: string
}

export interface Holiday {
  date: string
  name: string
  type: 'public' | 'regional' | 'observance'
  impact: 'high' | 'medium' | 'low'
}

export interface UpcomingHoliday extends Holiday {
  country: string
  flag: string
  daysUntil: number
}

// 国家/地区数据
export const countries: Record<string, Country> = {
  US: { name: '美国', flag: '🇺🇸', timezone: 'UTC-5', currency: 'USD' },
  UK: { name: '英国', flag: '🇬🇧', timezone: 'UTC+0', currency: 'GBP' },
  DE: { name: '德国', flag: '🇩🇪', timezone: 'UTC+1', currency: 'EUR' },
  FR: { name: '法国', flag: '🇫🇷', timezone: 'UTC+1', currency: 'EUR' },
  JP: { name: '日本', flag: '🇯🇵', timezone: 'UTC+9', currency: 'JPY' },
  KR: { name: '韩国', flag: '🇰🇷', timezone: 'UTC+9', currency: 'KRW' },
  SG: { name: '新加坡', flag: '🇸🇬', timezone: 'UTC+8', currency: 'SGD' },
  AU: { name: '澳大利亚', flag: '🇦🇺', timezone: 'UTC+10', currency: 'AUD' },
  CA: { name: '加拿大', flag: '🇨🇦', timezone: 'UTC-5', currency: 'CAD' },
  BR: { name: '巴西', flag: '🇧🇷', timezone: 'UTC-3', currency: 'BRL' },
  IN: { name: '印度', flag: '🇮🇳', timezone: 'UTC+5:30', currency: 'INR' },
  AE: { name: '阿联酋', flag: '🇦🇪', timezone: 'UTC+4', currency: 'AED' }
}

// 2025年各国节假日数据
export const holidays2025: Record<string, Holiday[]> = {
  US: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-20', name: 'Martin Luther King Jr. Day', type: 'public', impact: 'medium' },
    { date: '2025-02-17', name: "Presidents' Day", type: 'public', impact: 'medium' },
    { date: '2025-03-31', name: 'Cesar Chavez Day', type: 'regional', impact: 'low' },
    { date: '2025-05-26', name: 'Memorial Day', type: 'public', impact: 'high' },
    { date: '2025-06-19', name: 'Juneteenth', type: 'public', impact: 'medium' },
    { date: '2025-07-04', name: 'Independence Day', type: 'public', impact: 'high' },
    { date: '2025-09-01', name: 'Labor Day', type: 'public', impact: 'high' },
    { date: '2025-10-13', name: 'Columbus Day', type: 'public', impact: 'low' },
    { date: '2025-11-11', name: 'Veterans Day', type: 'public', impact: 'medium' },
    { date: '2025-11-27', name: 'Thanksgiving Day', type: 'public', impact: 'high' },
    { date: '2025-11-28', name: 'Black Friday', type: 'observance', impact: 'high' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
  ],
  UK: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'high' },
    { date: '2025-05-05', name: 'Early May Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-05-26', name: 'Spring Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-08-25', name: 'Summer Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
  ],
  DE: [
    { date: '2025-01-01', name: 'Neujahr', type: 'public', impact: 'high' },
    { date: '2025-01-06', name: 'Heilige Drei Könige', type: 'regional', impact: 'low' },
    { date: '2025-04-18', name: 'Karfreitag', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Ostermontag', type: 'public', impact: 'high' },
    { date: '2025-05-01', name: 'Tag der Arbeit', type: 'public', impact: 'high' },
    { date: '2025-05-29', name: 'Christi Himmelfahrt', type: 'public', impact: 'medium' },
    { date: '2025-06-09', name: 'Pfingstmontag', type: 'public', impact: 'medium' },
    { date: '2025-10-03', name: 'Tag der Deutschen Einheit', type: 'public', impact: 'high' },
    { date: '2025-12-25', name: '1. Weihnachtstag', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: '2. Weihnachtstag', type: 'public', impact: 'high' }
  ],
  JP: [
    { date: '2025-01-01', name: '元日 (New Year)', type: 'public', impact: 'high' },
    { date: '2025-01-13', name: '成人の日 (Coming of Age Day)', type: 'public', impact: 'medium' },
    { date: '2025-02-11', name: '建国記念の日 (National Foundation Day)', type: 'public', impact: 'medium' },
    { date: '2025-02-23', name: '天皇誕生日 (Emperor\'s Birthday)', type: 'public', impact: 'medium' },
    { date: '2025-03-20', name: '春分の日 (Vernal Equinox)', type: 'public', impact: 'medium' },
    { date: '2025-04-29', name: '昭和の日 (Showa Day)', type: 'public', impact: 'high' },
    { date: '2025-05-03', name: '憲法記念日 (Constitution Day)', type: 'public', impact: 'high' },
    { date: '2025-05-04', name: 'みどりの日 (Greenery Day)', type: 'public', impact: 'high' },
    { date: '2025-05-05', name: 'こどもの日 (Children\'s Day)', type: 'public', impact: 'high' },
    { date: '2025-07-21', name: '海の日 (Marine Day)', type: 'public', impact: 'medium' },
    { date: '2025-08-11', name: '山の日 (Mountain Day)', type: 'public', impact: 'medium' },
    { date: '2025-09-15', name: '敬老の日 (Respect for the Aged Day)', type: 'public', impact: 'medium' },
    { date: '2025-09-23', name: '秋分の日 (Autumnal Equinox)', type: 'public', impact: 'medium' },
    { date: '2025-10-13', name: 'スポーツの日 (Sports Day)', type: 'public', impact: 'medium' },
    { date: '2025-11-03', name: '文化の日 (Culture Day)', type: 'public', impact: 'medium' },
    { date: '2025-11-23', name: '勤労感謝の日 (Labor Thanksgiving)', type: 'public', impact: 'medium' }
  ],
  // 添加更多国家...
  FR: [
    { date: '2025-01-01', name: 'Jour de l\'an', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Lundi de Pâques', type: 'public', impact: 'high' },
    { date: '2025-05-01', name: 'Fête du Travail', type: 'public', impact: 'high' },
    { date: '2025-05-08', name: 'Victoire 1945', type: 'public', impact: 'medium' },
    { date: '2025-05-29', name: 'Ascension', type: 'public', impact: 'medium' },
    { date: '2025-06-09', name: 'Lundi de Pentecôte', type: 'public', impact: 'medium' },
    { date: '2025-07-14', name: 'Fête nationale', type: 'public', impact: 'high' },
    { date: '2025-08-15', name: 'Assomption', type: 'public', impact: 'medium' },
    { date: '2025-11-01', name: 'Toussaint', type: 'public', impact: 'medium' },
    { date: '2025-11-11', name: 'Armistice 1918', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Noël', type: 'public', impact: 'high' }
  ]
}

// 节假日对外贸的影响说明
export const impactDescriptions = {
  high: '重大影响：政府机构、银行、大部分企业关闭，物流停运',
  medium: '中等影响：部分企业放假，物流可能延迟',
  low: '轻微影响：部分地区或行业放假，整体影响较小'
}

// 获取特定国家的节假日
export function getCountryHolidays(countryCode: string): Holiday[] {
  return holidays2025[countryCode] || []
}

// 获取即将到来的节假日
export function getUpcomingHolidays(daysAhead: number = 30): UpcomingHoliday[] {
  const today = new Date()
  const upcoming: UpcomingHoliday[] = []
  
  Object.entries(holidays2025).forEach(([countryCode, holidays]) => {
    holidays.forEach(holiday => {
      const holidayDate = new Date(holiday.date)
      const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysUntil > 0 && daysUntil <= daysAhead) {
        upcoming.push({
          ...holiday,
          country: countries[countryCode].name,
          flag: countries[countryCode].flag,
          daysUntil
        })
      }
    })
  })
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil)
}

// 按月份筛选节假日
export function filterHolidaysByMonth(holidays: Holiday[], month: number): Holiday[] {
  return holidays.filter(holiday => {
    const holidayMonth = new Date(holiday.date).getMonth() + 1
    return holidayMonth === month
  })
}

// 获取节假日类型的中文名称
export function getHolidayTypeName(type: Holiday['type']): string {
  const typeNames = {
    public: '法定假日',
    regional: '地区假日',
    observance: '纪念日'
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
