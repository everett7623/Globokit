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
  AE: { name: '阿联酋', flag: '🇦🇪', timezone: 'UTC+4', currency: 'AED' },
  IT: { name: '意大利', flag: '🇮🇹', timezone: 'UTC+1', currency: 'EUR' },
  ES: { name: '西班牙', flag: '🇪🇸', timezone: 'UTC+1', currency: 'EUR' },
  NL: { name: '荷兰', flag: '🇳🇱', timezone: 'UTC+1', currency: 'EUR' },
  CH: { name: '瑞士', flag: '🇨🇭', timezone: 'UTC+1', currency: 'CHF' },
  RU: { name: '俄罗斯', flag: '🇷🇺', timezone: 'UTC+3', currency: 'RUB' },
  MX: { name: '墨西哥', flag: '🇲🇽', timezone: 'UTC-6', currency: 'MXN' },
  ZA: { name: '南非', flag: '🇿🇦', timezone: 'UTC+2', currency: 'ZAR' },
  MY: { name: '马来西亚', flag: '🇲🇾', timezone: 'UTC+8', currency: 'MYR' },
  TH: { name: '泰国', flag: '🇹🇭', timezone: 'UTC+7', currency: 'THB' }
}

// 各国节假日数据，按年份存储
export const holidays: Record<number, Record<string, Holiday[]>> = {
  2025: {
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
    ],
    IT: [
      { date: '2025-01-01', name: 'Capodanno', type: 'public', impact: 'high' },
      { date: '2025-01-06', name: 'Epifania', type: 'public', impact: 'medium' },
      { date: '2025-04-18', name: 'Venerdì Santo', type: 'public', impact: 'high' },
      { date: '2025-04-21', name: 'Lunedì dell\'Angelo', type: 'public', impact: 'high' },
      { date: '2025-05-01', name: 'Festa del Lavoro', type: 'public', impact: 'high' },
      { date: '2025-06-02', name: 'Festa della Repubblica', type: 'public', impact: 'high' },
      { date: '2025-08-15', name: 'Assunzione', type: 'public', impact: 'medium' },
      { date: '2025-11-01', name: 'Ognissanti', type: 'public', impact: 'medium' },
      { date: '2025-12-25', name: 'Natale', type: 'public', impact: 'high' },
      { date: '2025-12-26', name: 'Santo Stefano', type: 'public', impact: 'high' }
    ],
    ES: [
      { date: '2025-01-01', name: 'Año Nuevo', type: 'public', impact: 'high' },
      { date: '2025-01-06', name: 'Día de los Reyes Magos', type: 'public', impact: 'medium' },
      { date: '2025-04-18', name: 'Viernes Santo', type: 'public', impact: 'high' },
      { date: '2025-04-21', name: 'Lunes de Pascua', type: 'public', impact: 'high' },
      { date: '2025-05-01', name: 'Día del Trabajo', type: 'public', impact: 'high' },
      { date: '2025-10-12', name: 'Fiesta Nacional de España', type: 'public', impact: 'high' },
      { date: '2025-11-01', name: 'Todos los Santos', type: 'public', impact: 'medium' },
      { date: '2025-12-06', name: 'Día de la Constitución', type: 'public', impact: 'medium' },
      { date: '2025-12-08', name: 'Inmaculada Concepción', type: 'public', impact: 'medium' },
      { date: '2025-12-25', name: 'Navidad', type: 'public', impact: 'high' }
    ],
    NL: [
      { date: '2025-01-01', name: 'Nieuwjaarsdag', type: 'public', impact: 'high' },
      { date: '2025-04-18', name: 'Goede Vrijdag', type: 'public', impact: 'high' },
      { date: '2025-04-21', name: 'Tweede Paasdag', type: 'public', impact: 'high' },
      { date: '2025-05-05', name: 'Bevrijdingsdag', type: 'public', impact: 'medium' },
      { date: '2025-05-29', name: 'Hemelvaartsdag', type: 'public', impact: 'medium' },
      { date: '2025-06-09', name: 'Tweede Pinksterdag', type: 'public', impact: 'medium' },
      { date: '2025-12-25', name: 'Eerste Kerstdag', type: 'public', impact: 'high' },
      { date: '2025-12-26', name: 'Tweede Kerstdag', type: 'public', impact: 'high' }
    ],
    CH: [
      { date: '2025-01-01', name: 'Neujahrstag', type: 'public', impact: 'high' },
      { date: '2025-01-02', name: 'Berchtoldstag', type: 'public', impact: 'medium' },
      { date: '2025-04-18', name: 'Karfreitag', type: 'public', impact: 'high' },
      { date: '2025-04-21', name: 'Ostermontag', type: 'public', impact: 'high' },
      { date: '2025-05-01', name: 'Tag der Arbeit', type: 'public', impact: 'high' },
      { date: '2025-05-29', name: 'Auffahrt', type: 'public', impact: 'medium' },
      { date: '2025-06-09', name: 'Pfingstmontag', type: 'public', impact: 'medium' },
      { date: '2025-08-01', name: 'Bundesfeiertag', type: 'public', impact: 'high' },
      { date: '2025-12-25', name: 'Weihnachten', type: 'public', impact: 'high' },
      { date: '2025-12-26', name: 'Stephanstag', type: 'public', impact: 'high' }
    ],
    RU: [
      { date: '2025-01-01', name: 'Новый год', type: 'public', impact: 'high' },
      { date: '2025-01-02', name: 'Новый год', type: 'public', impact: 'high' },
      { date: '2025-01-03', name: 'Новый год', type: 'public', impact: 'high' },
      { date: '2025-01-04', name: 'Новый год', type: 'public', impact: 'high' },
      { date: '2025-01-05', name: 'Новый год', type: 'public', impact: 'high' },
      { date: '2025-01-06', name: 'Рождество Христово', type: 'public', impact: 'high' },
      { date: '2025-01-07', name: 'Рождество Христово', type: 'public', impact: 'high' },
      { date: '2025-02-23', name: 'День защитника Отечества', type: 'public', impact: 'high' },
      { date: '2025-03-08', name: 'Международный женский день', type: 'public', impact: 'high' },
      { date: '2025-05-01', name: 'Праздник Весны и Труда', type: 'public', impact: 'high' },
      { date: '2025-05-09', name: 'День Победы', type: 'public', impact: 'high' },
      { date: '2025-06-12', name: 'День России', type: 'public', impact: 'high' },
      { date: '2025-11-04', name: 'День народного единства', type: 'public', impact: 'high' }
    ],
    MX: [
      { date: '2025-01-01', name: 'Año Nuevo', type: 'public', impact: 'high' },
      { date: '2025-02-05', name: 'Día de la Constitución', type: 'public', impact: 'medium' },
      { date: '2025-03-18', name: 'Natalicio de Benito Juárez', type: 'public', impact: 'medium' },
      { date: '2025-05-01', name: 'Día del Trabajo', type: 'public', impact: 'high' },
      { date: '2025-09-16', name: 'Día de la Independencia', type: 'public', impact: 'high' },
      { date: '2025-11-20', name: 'Día de la Revolución', type: 'public', impact: 'medium' },
      { date: '2025-12-25', name: 'Navidad', type: 'public', impact: 'high' }
    ],
    ZA: [
      { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
      { date: '2025-03-21', name: 'Human Rights Day', type: 'public', impact: 'medium' },
      { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
      { date: '2025-04-21', name: 'Family Day', type: 'public', impact: 'high' },
      { date: '2025-05-01', name: 'Workers\' Day', type: 'public', impact: 'high' },
      { date: '2025-06-16', name: 'Youth Day', type: 'public', impact: 'medium' },
      { date: '2025-08-09', name: 'National Women\'s Day', type: 'public', impact: 'medium' },
      { date: '2025-09-24', name: 'Heritage Day', type: 'public', impact: 'medium' },
      { date: '2025-12-16', name: 'Day of Reconciliation', type: 'public', impact: 'medium' },
      { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
      { date: '2025-12-26', name: 'Day of Goodwill', type: 'public', impact: 'high' }
    ],
    MY: [
      { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
      { date: '2025-01-29', name: 'Chinese New Year', type: 'public', impact: 'high' },
      { date: '2025-01-30', name: 'Chinese New Year', type: 'public', impact: 'high' },
      { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'medium' },
      { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'medium' },
      { date: '2025-05-12', name: 'Vesak Day', type: 'public', impact: 'medium' },
      { date: '2025-06-06', name: 'Hari Raya Aidilfitri', type: 'public', impact: 'high' },
      { date: '2025-06-07', name: 'Hari Raya Aidilfitri', type: 'public', impact: 'high' },
      { date: '2025-08-31', name: 'National Day', type: 'public', impact: 'high' },
      { date: '2025-09-14', name: 'Hari Raya Haji', type: 'public', impact: 'high' },
      { date: '2025-11-16', name: 'Deepavali', type: 'public', impact: 'medium' },
      { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
    ],
    TH: [
      { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
      { date: '2025-02-18', name: 'Makha Bucha Day', type: 'public', impact: 'medium' },
      { date: '2025-04-13', name: 'Songkran Festival', type: 'public', impact: 'high' },
      { date: '2025-04-14', name: 'Songkran Festival', type: 'public', impact: 'high' },
      { date: '2025-04-15', name: 'Songkran Festival', type: 'public', impact: 'high' },
      { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'medium' },
      { date: '2025-05-26', name: 'Visakha Bucha Day', type: 'public', impact: 'medium' },
      { date: '2025-07-26', name: 'Asarnha Bucha Day', type: 'public', impact: 'medium' },
      { date: '2025-07-27', name: 'Khao Phansa Day', type: 'public', impact: 'medium' },
      { date: '2025-10-13', name: 'Chulalongkorn Day', type: 'public', impact: 'medium' },
      { date: '2025-12-05', name: 'King Bhumibol Adulyadej Memorial Day', type: 'public', impact: 'medium' },
      { date: '2025-12-10', name: 'Human Rights Day', type: 'public', impact: 'medium' },
      { date: '2025-12-31', name: 'New Year\'s Eve', type: 'public', impact: 'high' }
    ]
  }
  // 可以继续添加其他年份的节假日数据
}

// 节假日对外贸的影响说明
export const impactDescriptions = {
  high: '重大影响：政府机构、银行、大部分企业关闭，物流停运',
  medium: '中等影响：部分企业放假，物流可能延迟',
  low: '轻微影响：部分地区或行业放假，整体影响较小'
}

// 获取特定国家和年份的节假日
export function getCountryHolidays(countryCode: string, year: number = new Date().getFullYear()): Holiday[] {
  return holidays[year]?.[countryCode] || []
}

// 获取即将到来的节假日
export function getUpcomingHolidays(daysAhead: number = 30, year: number = new Date().getFullYear()): UpcomingHoliday[] {
  const today = new Date()
  const upcoming: UpcomingHoliday[] = []
  
  Object.entries(holidays[year] || {}).forEach(([countryCode, holidays]) => {
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
