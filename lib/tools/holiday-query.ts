// lib/tools/holiday-query.ts

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
  type: 'public' | 'regional' | 'observance' | 'international'
  impact: 'high' | 'medium' | 'low'
  description?: string
}

export interface UpcomingHoliday extends Holiday {
  country: string
  flag: string
  daysUntil: number
}

// 扩展的国家/地区数据（按地区分组）
export const countries: Record<string, Country> = {
  // 北美
  US: { name: '美国', flag: '🇺🇸', timezone: 'UTC-5', currency: 'USD', region: '北美' },
  CA: { name: '加拿大', flag: '🇨🇦', timezone: 'UTC-5', currency: 'CAD', region: '北美' },
  MX: { name: '墨西哥', flag: '🇲🇽', timezone: 'UTC-6', currency: 'MXN', region: '北美' },
  
  // 西欧
  UK: { name: '英国', flag: '🇬🇧', timezone: 'UTC+0', currency: 'GBP', region: '西欧' },
  DE: { name: '德国', flag: '🇩🇪', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  FR: { name: '法国', flag: '🇫🇷', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  IT: { name: '意大利', flag: '🇮🇹', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  ES: { name: '西班牙', flag: '🇪🇸', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  NL: { name: '荷兰', flag: '🇳🇱', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  BE: { name: '比利时', flag: '🇧🇪', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  CH: { name: '瑞士', flag: '🇨🇭', timezone: 'UTC+1', currency: 'CHF', region: '西欧' },
  AT: { name: '奥地利', flag: '🇦🇹', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  IE: { name: '爱尔兰', flag: '🇮🇪', timezone: 'UTC+0', currency: 'EUR', region: '西欧' },
  LU: { name: '卢森堡', flag: '🇱🇺', timezone: 'UTC+1', currency: 'EUR', region: '西欧' },
  
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
  HK: { name: '香港', flag: '🇭🇰', timezone: 'UTC+8', currency: 'HKD', region: '东亚' },
  TW: { name: '台湾', flag: '🇹🇼', timezone: 'UTC+8', currency: 'TWD', region: '东亚' },
  MO: { name: '澳门', flag: '🇲🇴', timezone: 'UTC+8', currency: 'MOP', region: '东亚' },
  
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
  
  // 伊斯兰教（注：伊斯兰历日期可能有1-2天偏差）
  { date: '2025-01-27', name: 'Isra and Mi\'raj', localName: '夜行登霄', type: 'observance', impact: 'medium', description: '伊斯兰教：纪念先知夜行' },
  { date: '2025-02-28', name: 'Ramadan Begins', localName: '斋月开始', type: 'observance', impact: 'high', description: '伊斯兰教：斋戒月开始' },
  { date: '2025-03-25', name: 'Laylat al-Qadr', localName: '盖德尔夜', type: 'observance', impact: 'high', description: '伊斯兰教：权力之夜' },
  { date: '2025-03-30', name: 'Eid al-Fitr', localName: '开斋节', type: 'observance', impact: 'high', description: '伊斯兰教：斋月结束庆典' },
  { date: '2025-06-06', name: 'Eid al-Adha', localName: '宰牲节/古尔邦节', type: 'observance', impact: 'high', description: '伊斯兰教：献祭节' },
  { date: '2025-06-26', name: 'Muharram/Islamic New Year', localName: '伊斯兰新年', type: 'observance', impact: 'medium', description: '伊斯兰教：新年' },
  { date: '2025-07-05', name: 'Ashura', localName: '阿舒拉节', type: 'observance', impact: 'medium', description: '伊斯兰教：什叶派重要节日' },
  { date: '2025-09-04', name: 'Mawlid al-Nabi', localName: '圣纪节', type: 'observance', impact: 'medium', description: '伊斯兰教：先知诞辰' },
  
  // 印度教
  { date: '2025-01-14', name: 'Makar Sankranti', localName: '丰收节', type: 'observance', impact: 'medium', description: '印度教：太阳节' },
  { date: '2025-03-14', name: 'Holi', localName: '洒红节/胡里节', type: 'observance', impact: 'high', description: '印度教：色彩节' },
  { date: '2025-03-30', name: 'Ram Navami', localName: '罗摩诞辰', type: 'observance', impact: 'medium', description: '印度教：罗摩神诞辰' },
  { date: '2025-08-16', name: 'Janmashtami', localName: '黑天诞辰', type: 'observance', impact: 'medium', description: '印度教：黑天神诞辰' },
  { date: '2025-08-27', name: 'Ganesh Chaturthi', localName: '象头神节', type: 'observance', impact: 'medium', description: '印度教：象头神诞辰' },
  { date: '2025-10-02', name: 'Navaratri Begins', localName: '九夜节开始', type: 'observance', impact: 'medium', description: '印度教：女神节' },
  { date: '2025-10-12', name: 'Dussehra', localName: '十胜节', type: 'observance', impact: 'high', description: '印度教：庆祝罗摩战胜罗波那' },
  { date: '2025-11-01', name: 'Diwali', localName: '排灯节/万灯节', type: 'observance', impact: 'high', description: '印度教：光明节' },
  
  // 佛教
  { date: '2025-02-12', name: 'Chinese New Year', localName: '春节', type: 'observance', impact: 'high', description: '东亚：农历新年' },
  { date: '2025-05-12', name: 'Vesak/Buddha Purnima', localName: '卫塞节/佛诞', type: 'observance', impact: 'high', description: '佛教：佛陀诞生、成道、涅槃' },
  { date: '2025-07-11', name: 'Asalha Puja', localName: '阿莎叻哈节', type: 'observance', impact: 'medium', description: '佛教：纪念佛陀首次讲道' },
  
  // 犹太教
  { date: '2025-04-12', name: 'Passover Begins', localName: '逾越节开始', type: 'observance', impact: 'high', description: '犹太教：纪念出埃及' },
  { date: '2025-06-01', name: 'Shavuot', localName: '七七节', type: 'observance', impact: 'medium', description: '犹太教：收获节' },
  { date: '2025-09-22', name: 'Rosh Hashanah', localName: '犹太新年', type: 'observance', impact: 'high', description: '犹太教：新年' },
  { date: '2025-10-01', name: 'Yom Kippur', localName: '赎罪日', type: 'observance', impact: 'high', description: '犹太教：最神圣的日子' },
  { date: '2025-10-06', name: 'Sukkot Begins', localName: '住棚节开始', type: 'observance', impact: 'medium', description: '犹太教：收获感恩节' },
  { date: '2025-12-14', name: 'Hanukkah Begins', localName: '光明节开始', type: 'observance', impact: 'medium', description: '犹太教：灯节' },
  
  // 锡克教
  { date: '2025-01-13', name: 'Lohri', localName: '洛里节', type: 'observance', impact: 'low', description: '锡克教/印度教：丰收节' },
  { date: '2025-04-13', name: 'Vaisakhi', localName: '丰收节', type: 'observance', impact: 'medium', description: '锡克教：新年和收获节' },
  { date: '2025-11-15', name: 'Guru Nanak Jayanti', localName: '古鲁那纳克诞辰', type: 'observance', impact: 'high', description: '锡克教：创始人诞辰' },
  
  // 东正教
  { date: '2025-01-07', name: 'Orthodox Christmas', localName: '东正教圣诞节', type: 'observance', impact: 'high', description: '东正教：圣诞节' },
  { date: '2025-04-27', name: 'Orthodox Easter', localName: '东正教复活节', type: 'observance', impact: 'high', description: '东正教：复活节' },
]

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
  return {}
}

// 2025年各国节假日数据
export const holidays2025: Record<string, Holiday[]> = {
  // North America
  US: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-20', name: 'Martin Luther King Jr. Day', type: 'public', impact: 'medium' },
    { date: '2025-02-17', name: "Presidents' Day", type: 'public', impact: 'medium' },
    { date: '2025-05-26', name: 'Memorial Day', type: 'public', impact: 'high' },
    { date: '2025-06-19', name: 'Juneteenth', type: 'public', impact: 'medium' },
    { date: '2025-07-04', name: 'Independence Day', type: 'public', impact: 'high' },
    { date: '2025-09-01', name: 'Labor Day', type: 'public', impact: 'high' },
    { date: '2025-10-13', name: 'Columbus Day', type: 'public', impact: 'low' },
    { date: '2025-11-11', name: 'Veterans Day', type: 'public', impact: 'medium' },
    { date: '2025-11-27', name: 'Thanksgiving Day', type: 'public', impact: 'high' },
    { date: '2025-11-28', name: 'Black Friday', type: 'observance', impact: 'high' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  ],
  CA: [
    { date: '2025-01-01', name: "New Year's Day", localName: '新年', type: 'public', impact: 'high' },
    { date: '2025-02-17', name: 'Family Day', localName: '家庭日', type: 'regional', impact: 'medium' }, // Most provinces
    { date: '2025-04-18', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Easter Monday', localName: '复活节星期一', type: 'regional', impact: 'medium' }, // Some provinces
    { date: '2025-05-19', name: 'Victoria Day', localName: '维多利亚日', type: 'public', impact: 'medium' },
    { date: '2025-07-01', name: 'Canada Day', localName: '加拿大日', type: 'public', impact: 'high' },
    { date: '2025-08-04', name: 'Civic Holiday', localName: '公民假日', type: 'regional', impact: 'low' }, // Most provinces, names vary
    { date: '2025-09-01', name: 'Labour Day', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2025-09-30', name: 'National Day for Truth and Reconciliation', localName: '真相与和解日', type: 'public', impact: 'medium' },
    { date: '2025-10-13', name: 'Thanksgiving', localName: '感恩节', type: 'public', impact: 'high' },
    { date: '2025-11-11', name: 'Remembrance Day', localName: '纪念日', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Christmas Day', localName: '圣诞节', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: 'Boxing Day', localName: '节礼日', type: 'public', impact: 'high' },
  ],
  MX: [
    { date: '2025-01-01', name: 'Año Nuevo', localName: '新年', type: 'public', impact: 'high' },
    { date: '2025-02-03', name: 'Día de la Constitución', localName: '宪法日', type: 'public', impact: 'medium' },
    { date: '2025-03-17', name: 'Natalicio de Benito Juárez', localName: '贝尼托·华雷斯诞辰', type: 'public', impact: 'medium' },
    { date: '2025-04-17', name: 'Jueves Santo', localName: '濯足节', type: 'observance', impact: 'low' },
    { date: '2025-04-18', name: 'Viernes Santo', localName: '耶稣受难日', type: 'public', impact: 'high' },
    { date: '2025-05-01', name: 'Día del Trabajo', localName: '劳动节', type: 'public', impact: 'high' },
    { date: '2025-09-16', name: 'Día de la Independencia', localName: '独立日', type: 'public', impact: 'high' },
    { date: '2025-11-17', name: 'Día de la Revolución', localName: '革命日', type: 'public', impact: 'medium' },
    { date: '2025-12-01', name: 'Transmisión del Poder Ejecutivo Federal', localName: '总统就职日', type: 'public', impact: 'low' }, // Every 6 years
    { date: '2025-12-25', name: 'Navidad', localName: '圣诞节', type: 'public', impact: 'high' },
  ],
  // Western Europe
  UK: [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-05", "name": "Early May Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-05-26", "name": "Spring Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-08-25", "name": "Summer Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  DE: [
    { "date": "2025-01-01", "name": "Neujahr", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Karfreitag", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Ostermontag", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Tag der Arbeit", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Christi Himmelfahrt", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Pfingstmontag", "type": "public", "impact": "medium" },
    { "date": "2025-10-03", "name": "Tag der Deutschen Einheit", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Erster Weihnachtstag", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Zweiter Weihnachtstag", "type": "public", "impact": "high" }
  ],
  FR: [
    { "date": "2025-01-01", "name": "Jour de l'An", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Lundi de Pâques", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Fête du Travail", "type": "public", "impact": "high" },
    { "date": "2025-05-08", "name": "Victoire 1945", "type": "public", "impact": "medium" },
    { "date": "2025-05-29", "name": "Ascension", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Lundi de Pentecôte", "type": "public", "impact": "medium" },
    { "date": "2025-07-14", "name": "Fête Nationale", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Assomption", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Toussaint", "type": "public", "impact": "medium" },
    { "date": "2025-11-11", "name": "Armistice 1918", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Noël", "type": "public", "impact": "high" }
  ],
  IT: [
    { "date": "2025-01-01", "name": "Capodanno", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Epifania", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Lunedì dell'Angelo", "type": "public", "impact": "medium" },
    { "date": "2025-04-25", "name": "Festa della Liberazione", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Festa del Lavoro", "type": "public", "impact": "high" },
    { "date": "2025-06-02", "name": "Festa della Repubblica", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Ferragosto", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Ognissanti", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Immacolata Concezione", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Natale", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Santo Stefano", "type": "public", "impact": "high" }
  ],
  ES: [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Día de Reyes / Epifanía del Señor", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Asunción de la Virgen", "type": "public", "impact": "medium" },
    { "date": "2025-10-12", "name": "Fiesta Nacional de España", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Día de Todos los Santos", "type": "public", "impact": "medium" },
    { "date": "2025-12-06", "name": "Día de la Constitución Española", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Inmaculada Concepción", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  NL: [
    { "date": "2025-01-01", "name": "Nieuwjaarsdag", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Goede Vrijdag", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eerste Paasdag", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Tweede Paasdag", "type": "public", "impact": "medium" },
    { "date": "2025-04-26", "name": "Koningsdag", "type": "public", "impact": "high" },
    { "date": "2025-05-05", "name": "Bevrijdingsdag", "type": "public", "impact": "medium" },
    { "date": "2025-05-29", "name": "Hemelvaartsdag", "type": "public", "impact": "medium" },
    { "date": "2025-06-08", "name": "Eerste Pinksterdag", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "Tweede Pinksterdag", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Eerste Kerstdag", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Tweede Kerstdag", "type": "public", "impact": "high" }
  ],
  BE: [
    { "date": "2025-01-01", "name": "Nieuwjaar", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Paasmaandag", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Dag van de Arbeid", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "O.L.H. Hemelvaart", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Pinkstermaandag", "type": "public", "impact": "medium" },
    { "date": "2025-07-21", "name": "Nationale feestdag", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Onze Lieve Vrouw Hemelvaart", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Allerheiligen", "type": "public", "impact": "medium" },
    { "date": "2025-11-11", "name": "Wapenstilstand", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Kerstmis", "type": "public", "impact": "high" }
  ],
  CH: [
    { "date": "2025-01-01", "name": "Neujahr", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Karfreitag", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Ostermontag", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Tag der Arbeit", "type": "public", "impact": "medium" },
    { "date": "2025-05-29", "name": "Auffahrt", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Pfingstmontag", "type": "public", "impact": "medium" },
    { "date": "2025-08-01", "name": "Nationalfeiertag", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Weihnachten", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Stephanstag", "type": "public", "impact": "medium" }
  ],
  AT: [
    { "date": "2025-01-01", "name": "Neujahr", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Heilige Drei Könige", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Ostermontag", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Staatsfeiertag", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Christi Himmelfahrt", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Pfingstmontag", "type": "public", "impact": "medium" },
    { "date": "2025-06-19", "name": "Fronleichnam", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Mariä Himmelfahrt", "type": "public", "impact": "medium" },
    { "date": "2025-10-26", "name": "Nationalfeiertag", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Allerheiligen", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Mariä Empfängnis", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christtag", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Stefanitag", "type": "public", "impact": "high" }
  ],
  IE: [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-03-17", "name": "St. Patrick's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-05", "name": "May Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-06-02", "name": "June Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-08-04", "name": "August Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-10-27", "name": "October Bank Holiday", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "St. Stephen's Day", "type": "public", "impact": "high" }
  ],
  LU: [
    { "date": "2025-01-01", "name": "Neijoerschdag", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Ouschterméindeg", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Dag vun der Aarbecht", "type": "public", "impact": "high" },
    { "date": "2025-05-09", "name": "Europadag", "type": "public", "impact": "medium" },
    { "date": "2025-05-29", "name": "Ascension", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Péngschtméindeg", "type": "public", "impact": "medium" },
    { "date": "2025-06-23", "name": "Nationalfeierdag", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Léiffrawëschdag", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Allerhellgen", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Chrëschtdag", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Stiefesdag", "type": "public", "impact": "high" }
  ],
  // Northern Europe
  SE: [
    { "date": "2025-01-01", "name": "Nyårsdagen", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Trettondedag jul", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Långfredagen", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Påskdagen", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Annandag påsk", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Första maj", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Kristi himmelsfärds dag", "type": "public", "impact": "medium" },
    { "date": "2025-06-06", "name": "Sveriges nationaldag", "type": "public", "impact": "high" },
    { "date": "2025-06-21", "name": "Midsommardagen", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Alla helgons dag", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Juldagen", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Annandag jul", "type": "public", "impact": "high" }
  ],
  NO: [
    { "date": "2025-01-01", "name": "Første nyttårsdag", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Skjærtorsdag", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Langfredag", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Første påskedag", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Andre påskedag", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Arbeidernes internasjonale kampdag", "type": "public", "impact": "high" },
    { "date": "2025-05-17", "name": "Grunnlovsdagen", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Kristi Himmelfartsdag", "type": "public", "impact": "medium" },
    { "date": "2025-06-08", "name": "Første pinsedag", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "Andre pinsedag", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Første juledag", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Andre juledag", "type": "public", "impact": "high" }
  ],
  DK: [
    { "date": "2025-01-01", "name": "Nytårsdag", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Skærtorsdag", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Langfredag", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Påskedag", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Anden påskedag", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Store Bededag", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Kristi Himmelfartsdag", "type": "public", "impact": "medium" },
    { "date": "2025-06-08", "name": "Pinsedag", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "Anden Pinsedag", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Juledag", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Anden Juledag", "type": "public", "impact": "high" }
  ],
  FI: [
    { "date": "2025-01-01", "name": "Uudenvuodenpäivä", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Loppiainen", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Pitkäperjantai", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Pääsiäissunnuntai", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Toinen pääsiäispäivä", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Vappu", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Helatorstai", "type": "public", "impact": "medium" },
    { "date": "2025-06-08", "name": "Helluntaipäivä", "type": "public", "impact": "high" },
    { "date": "2025-06-21", "name": "Juhannuspäivä", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Pyhäinpäivä", "type": "public", "impact": "medium" },
    { "date": "2025-12-06", "name": "Itsenäisyyspäivä", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Joulupäivä", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Tapaninpäivä", "type": "public", "impact": "high" }
  ],
  IS: [
    { "date": "2025-01-01", "name": "Nýársdagur", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Skírdagur", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Föstudagurinn langi", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Annar í páskum", "type": "public", "impact": "medium" },
    { "date": "2025-04-24", "name": "Sumardagurinn fyrsti", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Verkalýðsdagurinn", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Uppstigningardagur", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Annar í hvítasunnu", "type": "public", "impact": "medium" },
    { "date": "2025-06-17", "name": "Lýðveldisdagurinn", "type": "public", "impact": "high" },
    { "date": "2025-08-04", "name": "Frídagur verslunarmanna", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Jóladagur", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Annar í jólum", "type": "public", "impact": "high" }
  ],
  // Southern Europe
  GR: [
    { "date": "2025-01-01", "name": "Πρωτοχρονιά", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Θεοφάνια", "type": "public", "impact": "medium" },
    { "date": "2025-03-03", "name": "Καθαρά Δευτέρα", "type": "public", "impact": "medium" },
    { "date": "2025-03-25", "name": "Επέτειος της Επανάστασης του 1821", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Μεγάλη Παρασκευή", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Κυριακή του Πάσχα", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Δευτέρα του Πάσχα", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Πρωτομαγιά", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "Αγίου Πνεύματος", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Κοίμηση της Θεοτόκου", "type": "public", "impact": "high" },
    { "date": "2025-10-28", "name": "Επέτειος του «Όχι»", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Χριστούγεννα", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Δεύτερη ημέρα Χριστουγέννων", "type": "public", "impact": "high" }
  ],
  PT: [
    { "date": "2025-01-01", "name": "Ano Novo", "type": "public", "impact": "high" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "observance", "impact": "low" },
    { "date": "2025-04-18", "name": "Sexta-feira Santa", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Páscoa", "type": "public", "impact": "high" },
    { "date": "2025-04-25", "name": "Dia da Liberdade", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Dia do Trabalhador", "type": "public", "impact": "high" },
    { "date": "2025-06-10", "name": "Dia de Portugal, de Camões e das Comunidades Portuguesas", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Assunção de Nossa Senhora", "type": "public", "impact": "medium" },
    { "date": "2025-10-05", "name": "Implantação da República", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Dia de Todos os Santos", "type": "public", "impact": "medium" },
    { "date": "2025-12-01", "name": "Restauração da Independência", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Imaculada Conceição", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Natal", "type": "public", "impact": "high" }
  ],
  MT: [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-10", "name": "Feast of Shipwreck of St. Paul", "type": "public", "impact": "medium" },
    { "date": "2025-03-19", "name": "Feast of St. Joseph", "type": "public", "impact": "medium" },
    { "date": "2025-03-31", "name": "Freedom Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Worker's Day", "type": "public", "impact": "high" },
    { "date": "2025-06-07", "name": "Sette Giugno", "type": "public", "impact": "medium" },
    { "date": "2025-06-29", "name": "Feast of St. Peter and St. Paul", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Feast of the Assumption", "type": "public", "impact": "high" },
    { "date": "2025-09-08", "name": "Feast of Our Lady of Victories", "type": "public", "impact": "medium" },
    { "date": "2025-09-21", "name": "Independence Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Feast of the Immaculate Conception", "type": "public", "impact": "medium" },
    { "date": "2025-12-13", "name": "Republic Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  CY: [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Epiphany", "type": "public", "impact": "medium" },
    { "date": "2025-03-03", "name": "Green Monday", "type": "public", "impact": "medium" },
    { "date": "2025-03-25", "name": "Greek Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-04-01", "name": "National Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Easter Sunday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "Pentecost Monday (Kataklysmos)", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Assumption of the Virgin Mary", "type": "public", "impact": "high" },
    { "date": "2025-10-01", "name": "Cyprus Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-10-28", "name": "Ohi Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  // Eastern Europe
  PL: [
    { "date": "2025-01-01", "name": "Nowy Rok", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Trzech Króli", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Wielkanoc", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Poniedziałek Wielkanocny", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Święto Pracy", "type": "public", "impact": "high" },
    { "date": "2025-05-03", "name": "Święto Narodowe Trzeciego Maja", "type": "public", "impact": "high" },
    { "date": "2025-06-08", "name": "Zesłanie Ducha Świętego (Zielone Świątki)", "type": "public", "impact": "medium" },
    { "date": "2025-06-19", "name": "Boże Ciało", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Wniebowzięcie Najświętszej Maryi Panny", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Wszystkich Świętych", "type": "public", "impact": "medium" },
    { "date": "2025-11-11", "name": "Narodowe Święto Niepodległości", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Boże Narodzenie (pierwszy dzień)", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boże Narodzenie (drugi dzień)", "type": "public", "impact": "high" }
  ],
  CZ: [
    { "date": "2025-01-01", "name": "Nový rok", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Velký pátek", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Velikonoční pondělí", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Svátek práce", "type": "public", "impact": "high" },
    { "date": "2025-05-08", "name": "Den vítězství", "type": "public", "impact": "high" },
    { "date": "2025-07-05", "name": "Den slovanských věrozvěstů Cyrila a Metoděje", "type": "public", "impact": "medium" },
    { "date": "2025-07-06", "name": "Den upálení mistra Jana Husa", "type": "public", "impact": "medium" },
    { "date": "2025-09-28", "name": "Den české státnosti", "type": "public", "impact": "high" },
    { "date": "2025-10-28", "name": "Den vzniku samostatného československého státu", "type": "public", "impact": "high" },
    { "date": "2025-11-17", "name": "Den boje za svobodu a demokracii", "type": "public", "impact": "medium" },
    { "date": "2025-12-24", "name": "Štědrý den", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "1. svátek vánoční", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "2. svátek vánoční", "type": "public", "impact": "high" }
  ],
  HU: [
    { "date": "2025-01-01", "name": "Újév", "type": "public", "impact": "high" },
    { "date": "2025-03-15", "name": "Nemzeti ünnep", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Húsvét hétfő", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "A munka ünnepe", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "Pünkösdhétfő", "type": "public", "impact": "medium" },
    { "date": "2025-08-20", "name": "Államalapítás ünnepe", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Nemzeti ünnep", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Mindenszentek", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Karácsony", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Karácsony másnapja", "type": "public", "impact": "high" }
  ],
  RO: [
    { "date": "2025-01-01", "name": "Anul Nou", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "A doua zi de Anul Nou", "type": "public", "impact": "high" },
    { "date": "2025-01-24", "name": "Ziua Unirii Principatelor Române", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Paștele", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "A doua zi de Paște", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Ziua Muncii", "type": "public", "impact": "high" },
    { "date": "2025-06-01", "name": "Ziua Copilului", "type": "public", "impact": "medium" },
    { "date": "2025-06-08", "name": "Rusalii", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "A doua zi de Rusalii", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Adormirea Maicii Domnului", "type": "public", "impact": "high" },
    { "date": "2025-11-30", "name": "Sfântul Andrei", "type": "public", "impact": "medium" },
    { "date": "2025-12-01", "name": "Ziua Națională a României", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Crăciunul", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "A doua zi de Crăciun", "type": "public", "impact": "high" }
  ],
  BG: [
    { "date": "2025-01-01", "name": "Нова година", "type": "public", "impact": "high" },
    { "date": "2025-03-03", "name": "Ден на Освобождението на България от османско иго", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Разпети петък", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Великден", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Велики понеделник", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Ден на труда и на международната работническа солидарност", "type": "public", "impact": "high" },
    { "date": "2025-05-06", "name": "Гергьовден, Ден на храбростта и празник на Българската армия", "type": "public", "impact": "high" },
    { "date": "2025-05-24", "name": "Ден на светите братя Кирил и Методий, на българската азбука, просвета и култура и на славянската книжовност", "type": "public", "impact": "high" },
    { "date": "2025-09-06", "name": "Ден на Съединението", "type": "public", "impact": "high" },
    { "date": "2025-09-22", "name": "Ден на Независимостта на България", "type": "public", "impact": "high" },
    { "date": "2025-12-24", "name": "Бъдни вечер", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Рождество Христово", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Втори ден на Рождество Христово", "type": "public", "impact": "high" }
  ],
  SK: [
    { "date": "2025-01-01", "name": "Deň vzniku Slovenskej republiky", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Zjavenie Pána (Traja králi)", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Veľký piatok", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Veľkonočný pondelok", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Sviatok práce", "type": "public", "impact": "high" },
    { "date": "2025-05-08", "name": "Deň víťazstva nad fašizmom", "type": "public", "impact": "high" },
    { "date": "2025-07-05", "name": "Sviatok svätého Cyrila a Metoda", "type": "public", "impact": "medium" },
    { "date": "2025-08-29", "name": "Výročie SNP", "type": "public", "impact": "high" },
    { "date": "2025-09-01", "name": "Deň Ústavy Slovenskej republiky", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Sviatok Sedembolestnej Panny Márie", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Sviatok Všetkých svätých", "type": "public", "impact": "medium" },
    { "date": "2025-11-17", "name": "Deň boja za slobodu a demokraciu", "type": "public", "impact": "medium" },
    { "date": "2025-12-24", "name": "Štedrý deň", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Prvý sviatok vianočný", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Druhý sviatok vianočný", "type": "public", "impact": "high" }
  ],
  HR: [
    { "date": "2025-01-01", "name": "Nova Godina", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Sveta tri kralja", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Uskrs i uskrsni ponedjeljak", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Praznik rada", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Tijelovo", "type": "public", "impact": "medium" },
    { "date": "2025-06-22", "name": "Dan antifašističke borbe", "type": "public", "impact": "high" },
    { "date": "2025-06-25", "name": "Dan državnosti", "type": "public", "impact": "high" },
    { "date": "2025-08-05", "name": "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Velika Gospa", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Dan svih svetih", "type": "public", "impact": "medium" },
    { "date": "2025-11-18", "name": "Dan sjećanja na žrtve Domovinskog rata i Dan sjećanja na žrtvu Vukovara i Škabrnje", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Božić", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Sveti Stjepan", "type": "public", "impact": "high" }
  ],
  SI: [
    { "date": "2025-01-01", "name": "Novo leto", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "Novo leto", "type": "public", "impact": "high" },
    { "date": "2025-02-08", "name": "Prešernov dan, slovenski kulturni praznik", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Velikonočni ponedeljek", "type": "public", "impact": "medium" },
    { "date": "2025-04-27", "name": "Dan upora proti okupatorju", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Praznik dela", "type": "public", "impact": "high" },
    { "date": "2025-05-02", "name": "Praznik dela", "type": "public", "impact": "high" },
    { "date": "2025-06-08", "name": "Binkošti", "type": "public", "impact": "medium" },
    { "date": "2025-06-25", "name": "Dan državnosti", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Marijino vnebovzetje", "type": "public", "impact": "high" },
    { "date": "2025-10-31", "name": "Dan reformacije", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Dan spomina na mrtve", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Božič", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Dan samostojnosti in enotnosti", "type": "public", "impact": "high" }
  ],
  LT: [
    { "date": "2025-01-01", "name": "Naujieji Metai", "type": "public", "impact": "high" },
    { "date": "2025-02-16", "name": "Lietuvos valstybės atkūrimo diena", "type": "public", "impact": "high" },
    { "date": "2025-03-11", "name": "Lietuvos Nepriklausomybės atkūrimo diena", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Velykos", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Antroji Velykų diena", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Tarptautinė darbo diena", "type": "public", "impact": "high" },
    { "date": "2025-06-24", "name": "Joninės (Rasos)", "type": "public", "impact": "medium" },
    { "date": "2025-07-06", "name": "Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Žolinė (Švč. Mergelės Marijos Ėmimo į dangų diena)", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Visų Šventųjų diena", "type": "public", "impact": "medium" },
    { "date": "2025-11-02", "name": "Vėlinės", "type": "public", "impact": "medium" },
    { "date": "2025-12-24", "name": "Kūčios", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Kalėdos", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Antroji Kalėdų diena", "type": "public", "impact": "high" }
  ],
  LV: [
    { "date": "2025-01-01", "name": "Jaunā gada diena", "type": "public", "impact": "high" },
    { "date": "2025-03-31", "name": "Lielā Piektdiena", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Pirmās Lieldienas", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Otrās Lieldienas", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Darba svētki, Latvijas Republikas Satversmes sapulces sasaukšanas diena", "type": "public", "impact": "high" },
    { "date": "2025-05-04", "name": "Latvijas Republikas Neatkarības deklarācijas pasludināšanas diena", "type": "public", "impact": "high" },
    { "date": "2025-06-23", "name": "Līgo diena", "type": "public", "impact": "high" },
    { "date": "2025-06-24", "name": "Jāņu diena", "type": "public", "impact": "high" },
    { "date": "2025-11-18", "name": "Latvijas Republikas proklamēšanas diena", "type": "public", "impact": "high" },
    { "date": "2025-12-24", "name": "Ziemassvētku vakars", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Pirmie Ziemassvētki", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Otrie Ziemassvētki", "type": "public", "impact": "high" },
    { "date": "2025-12-31", "name": "Vecgada vakars", "type": "public", "impact": "high" }
  ],
  EE: [
    { "date": "2025-01-01", "name": "uusaasta", "type": "public", "impact": "high" },
    { "date": "2025-02-24", "name": "iseseisvuspäev", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "suur reede", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "ülestõusmispühade 1. püha", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "kevadpüha", "type": "public", "impact": "high" },
    { "date": "2025-06-23", "name": "võidupüha", "type": "public", "impact": "high" },
    { "date": "2025-06-24", "name": "jaanipäev", "type": "public", "impact": "high" },
    { "date": "2025-08-20", "name": "taasiseseisvumispäev", "type": "public", "impact": "high" },
    { "date": "2025-12-24", "name": "jõululaupäev", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "esimene jõulupüha", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "teine jõulupüha", "type": "public", "impact": "high" }
  ],
  // CIS
  RU: [
    { "date": "2025-01-01", "name": "Новый год", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "Новогодние каникулы", "type": "public", "impact": "high" },
    { "date": "2025-01-03", "name": "Новогодние каникулы", "type": "public", "impact": "high" },
    { "date": "2025-01-04", "name": "Новогодние каникулы", "type": "public", "impact": "high" },
    { "date": "2025-01-05", "name": "Новогодние каникулы", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Рождество Христово", "type": "public", "impact": "high" },
    { "date": "2025-01-07", "name": "Рождество Христово", "type": "public", "impact": "high" },
    { "date": "2025-02-23", "name": "День защитника Отечества", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "Международный женский день", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Праздник Весны и Труда", "type": "public", "impact": "high" },
    { "date": "2025-05-09", "name": "День Победы", "type": "public", "impact": "high" },
    { "date": "2025-06-12", "name": "День России", "type": "public", "impact": "high" },
    { "date": "2025-11-04", "name": "День народного единства", "type": "public", "impact": "high" }
  ],
  UA: [
    { "date": "2025-01-01", "name": "Новий рік", "type": "public", "impact": "high" },
    { "date": "2025-01-07", "name": "Різдво Христове (за юліанським календарем)", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "Міжнародний жіночий день", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Великдень", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "День праці", "type": "public", "impact": "high" },
    { "date": "2025-05-09", "name": "День Перемоги над нацизмом у Другій світовій війні", "type": "public", "impact": "high" },
    { "date": "2025-06-08", "name": "Трійця", "type": "public", "impact": "high" },
    { "date": "2025-06-28", "name": "День Конституції України", "type": "public", "impact": "high" },
    { "date": "2025-08-24", "name": "День Незалежності України", "type": "public", "impact": "high" },
    { "date": "2025-10-14", "name": "День захисників і захисниць України", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Різдво Христове (за григоріанським календарем)", "type": "public", "impact": "high" }
  ],
  BY: [
    { "date": "2025-01-01", "name": "Новый год", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "Новый год (перенос)", "type": "public", "impact": "high" },
    { "date": "2025-01-07", "name": "Рождество Христово (православное)", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "День женщин", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Пасха (православная)", "type": "public", "impact": "high" },
    { "date": "2025-04-29", "name": "Радуница", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Праздник труда", "type": "public", "impact": "high" },
    { "date": "2025-05-09", "name": "День Победы", "type": "public", "impact": "high" },
    { "date": "2025-07-03", "name": "День Независимости Республики Беларусь (День Республики)", "type": "public", "impact": "high" },
    { "date": "2025-11-07", "name": "День Октябрьской революции", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Рождество Христово (католическое)", "type": "public", "impact": "high" }
  ],
  KZ: [
    { "date": "2025-01-01", "name": "Новый год", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "Новый год", "type": "public", "impact": "high" },
    { "date": "2025-01-07", "name": "Православное Рождество", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "Международный женский день", "type": "public", "impact": "high" },
    { "date": "2025-03-21", "name": "Наурыз мейрамы", "type": "public", "impact": "high" },
    { "date": "2025-03-22", "name": "Наурыз мейрамы", "type": "public", "impact": "high" },
    { "date": "2025-03-23", "name": "Наурыз мейрамы", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Праздник единства народа Казахстана", "type": "public", "impact": "high" },
    { "date": "2025-05-07", "name": "День защитника Отечества", "type": "public", "impact": "high" },
    { "date": "2025-05-09", "name": "День Победы", "type": "public", "impact": "high" },
    { "date": "2025-06-01", "name": "Айт", "type": "public", "impact": "high" },
    { "date": "2025-07-06", "name": "День столицы", "type": "public", "impact": "high" },
    { "date": "2025-08-30", "name": "День Конституции Республики Казахстан", "type": "public", "impact": "high" },
    { "date": "2025-10-25", "name": "День Республики", "type": "public", "impact": "high" },
    { "date": "2025-12-16", "name": "День Независимости", "type": "public", "impact": "high" }
  ],
// East Asia
  "JP": [
    { "date": "2025-01-01", "name": "元日", "type": "public", "impact": "high" },
    { "date": "2025-01-13", "name": "成人の日", "type": "public", "impact": "medium" },
    { "date": "2025-02-11", "name": "建国記念の日", "type": "public", "impact": "medium" },
    { "date": "2025-03-20", "name": "春分の日", "type": "public", "impact": "medium" },
    { "date": "2025-04-29", "name": "昭和の日", "type": "public", "impact": "medium" },
    { "date": "2025-05-03", "name": "憲法記念日", "type": "public", "impact": "high" },
    { "date": "2025-05-04", "name": "みどりの日", "type": "public", "impact": "medium" },
    { "date": "2025-05-05", "name": "こどもの日", "type": "public", "impact": "high" },
    { "date": "2025-05-06", "name": "振替休日", "type": "public", "impact": "high" },
    { "date": "2025-07-21", "name": "海の日", "type": "public", "impact": "medium" },
    { "date": "2025-08-11", "name": "山の日", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "敬老の日", "type": "public", "impact": "medium" },
    { "date": "2025-09-23", "name": "秋分の日", "type": "public", "impact": "medium" },
    { "date": "2025-10-13", "name": "スポーツの日", "type": "public", "impact": "medium" },
    { "date": "2025-11-03", "name": "文化の日", "type": "public", "impact": "medium" },
    { "date": "2025-11-23", "name": "勤労感謝の日", "type": "public", "impact": "medium" },
    { "date": "2025-11-24", "name": "振替休日", "type": "public", "impact": "medium" },
    { "date": "2025-12-23", "name": "天皇誕生日", "type": "public", "impact": "medium" }
  ],
  "KR": [
    { "date": "2025-01-01", "name": "신정", "type": "public", "impact": "high" },
    { "date": "2025-01-28", "name": "설날", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "설날", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "설날", "type": "public", "impact": "high" },
    { "date": "2025-03-01", "name": "삼일절", "type": "public", "impact": "high" },
    { "date": "2025-05-05", "name": "어린이날", "type": "public", "impact": "high" },
    { "date": "2025-05-06", "name": "석가탄신일 대체공휴일", "type": "public", "impact": "medium" },
    { "date": "2025-06-06", "name": "현충일", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "광복절", "type": "public", "impact": "high" },
    { "date": "2025-10-03", "name": "개천절", "type": "public", "impact": "high" },
    { "date": "2025-10-09", "name": "한글날", "type": "public", "impact": "high" },
    { "date": "2025-10-13", "name": "추석", "type": "public", "impact": "high" },
    { "date": "2025-10-14", "name": "추석", "type": "public", "impact": "high" },
    { "date": "2025-10-15", "name": "추석", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "성탄절", "type": "public", "impact": "high" }
  ],
  "HK": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Lunar New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "The second day of Lunar New Year", "type": "public", "impact": "high" },
    { "date": "2025-01-31", "name": "The third day of Lunar New Year", "type": "public", "impact": "high" },
    { "date": "2025-04-04", "name": "Ching Ming Festival", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Easter Saturday", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-06", "name": "Buddha's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-06-02", "name": "Tuen Ng Festival", "type": "public", "impact": "medium" },
    { "date": "2025-07-01", "name": "Hong Kong Special Administrative Region Establishment Day", "type": "public", "impact": "high" },
    { "date": "2025-09-08", "name": "The day following the Mid-Autumn Festival", "type": "public", "impact": "medium" },
    { "date": "2025-10-01", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-10-02", "name": "Chung Yeung Festival", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "TW": [
    { "date": "2025-01-01", "name": "中華民國開國紀念日", "type": "public", "impact": "high" },
    { "date": "2025-01-28", "name": "農曆除夕", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "春節", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "春節", "type": "public", "impact": "high" },
    { "date": "2025-01-31", "name": "春節", "type": "public", "impact": "high" },
    { "date": "2025-02-28", "name": "和平紀念日", "type": "public", "impact": "high" },
    { "date": "2025-04-04", "name": "兒童節", "type": "public", "impact": "medium" },
    { "date": "2025-04-05", "name": "清明節", "type": "public", "impact": "medium" },
    { "date": "2025-06-02", "name": "端午節", "type": "public", "impact": "medium" },
    { "date": "2025-09-08", "name": "中秋節", "type": "public", "impact": "high" },
    { "date": "2025-10-10", "name": "國慶日", "type": "public", "impact": "high" },
    { "date": "2025-12-31", "name": "中華民國開國紀念日 (補假)", "type": "public", "impact": "high" }
  ],
  "MO": [
    { "date": "2025-01-01", "name": "元旦", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "農曆正月初一", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "農曆正月初二", "type": "public", "impact": "high" },
    { "date": "2025-01-31", "name": "農曆正月初三", "type": "public", "impact": "high" },
    { "date": "2025-04-04", "name": "清明節", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "耶穌受難日", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "復活節前日", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "復活節翌日", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "勞動節", "type": "public", "impact": "high" },
    { "date": "2025-05-06", "name": "佛誕節", "type": "public", "impact": "medium" },
    { "date": "2025-06-02", "name": "端午節", "type": "public", "impact": "medium" },
    { "date": "2025-09-08", "name": "中秋節翌日", "type": "public", "impact": "medium" },
    { "date": "2025-10-01", "name": "中華人民共和國國慶日", "type": "public", "impact": "high" },
    { "date": "2025-10-02", "name": "中華人民共和國國慶日翌日", "type": "public", "impact": "high" },
    { "date": "2025-10-03", "name": "重陽節", "type": "public", "impact": "medium" },
    { "date": "2025-11-02", "name": "追思節 (補假)", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "聖母無原罪瞻禮", "type": "public", "impact": "medium" },
    { "date": "2025-12-20", "name": "澳門特別行政區成立紀念日", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "聖誕節", "type": "public", "impact": "high" }
  ],
  // Southeast Asia
  "SG": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Chinese New Year", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "Chinese New Year (2nd day)", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-13", "name": "Vesak Day", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "Hari Raya Haji", "type": "public", "impact": "medium" },
    { "date": "2025-08-09", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Deepavali", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "MY": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Chinese New Year", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "Chinese New Year (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-02-09", "name": "Thaipusam", "type": "public", "impact": "medium" },
    { "date": "2025-03-03", "name": "Isra Mikraj", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Hari Raya Aidilfitri", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Hari Raya Aidilfitri (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-13", "name": "Wesak Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-02", "name": "Agong's Birthday", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Hari Raya Aidiladha", "type": "public", "impact": "medium" },
    { "date": "2025-08-31", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-09-16", "name": "Malaysia Day", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Deepavali", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "TH": [
    { "date": "2025-01-01", "name": "วันขึ้นปีใหม่", "type": "public", "impact": "high" },
    { "date": "2025-02-12", "name": "วันมาฆบูชา", "type": "public", "impact": "medium" },
    { "date": "2025-04-06", "name": "วันจักรี", "type": "public", "impact": "medium" },
    { "date": "2025-04-07", "name": "วันหยุดชดเชยวันจักรี", "type": "public", "impact": "medium" },
    { "date": "2025-04-13", "name": "วันสงกรานต์", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "วันสงกรานต์", "type": "public", "impact": "high" },
    { "date": "2025-04-15", "name": "วันสงกรานต์", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "วันแรงงานแห่งชาติ", "type": "public", "impact": "high" },
    { "date": "2025-05-04", "name": "วันฉัตรมงคล", "type": "public", "impact": "high" },
    { "date": "2025-05-05", "name": "วันหยุดชดเชยวันฉัตรมงคล", "type": "public", "impact": "high" },
    { "date": "2025-05-12", "name": "วันวิสาขบูชา", "type": "public", "impact": "medium" },
    { "date": "2025-06-03", "name": "วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ พระบรมราชินี", "type": "public", "impact": "high" },
    { "date": "2025-07-20", "name": "วันอาสาฬหบูชา", "type": "public", "impact": "medium" },
    { "date": "2025-07-21", "name": "วันเข้าพรรษา", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว", "type": "public", "impact": "high" },
    { "date": "2025-08-12", "name": "วันเฉลิมพระชนมพรรษาสมเด็จพระบรมราชชนนีพันปีหลวง", "type": "public", "impact": "high" },
    { "date": "2025-10-13", "name": "วันคล้ายวันสวรรคต พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "วันปิยมหาราช", "type": "public", "impact": "high" },
    { "date": "2025-12-05", "name": "วันคล้ายวันพระบรมราชสมภพของพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร วันพ่อแห่งชาติ และวันชาติ", "type": "public", "impact": "high" },
    { "date": "2025-12-10", "name": "วันรัฐธรรมนูญ", "type": "public", "impact": "medium" },
    { "date": "2025-12-31", "name": "วันสิ้นปี", "type": "public", "impact": "high" }
  ],
  "ID": [
    { "date": "2025-01-01", "name": "Tahun Baru Masehi", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Tahun Baru Imlek", "type": "public", "impact": "high" },
    { "date": "2025-03-01", "name": "Isra Mi'raj Nabi Muhammad SAW", "type": "public", "impact": "medium" },
    { "date": "2025-03-29", "name": "Hari Raya Nyepi Tahun Baru Saka 1947", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Wafat Isa Al Masih", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Hari Raya Idul Fitri 1446 Hijriah", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Cuti Bersama Idul Fitri", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Cuti Bersama Idul Fitri", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Hari Buruh Internasional", "type": "public", "impact": "high" },
    { "date": "2025-05-13", "name": "Hari Raya Waisak 2569 BE", "type": "public", "impact": "medium" },
    { "date": "2025-05-29", "name": "Kenaikan Isa Al Masih", "type": "public", "impact": "medium" },
    { "date": "2025-06-01", "name": "Hari Lahir Pancasila", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Hari Raya Idul Adha 1446 Hijriah", "type": "public", "impact": "medium" },
    { "date": "2025-07-06", "name": "Tahun Baru Islam 1447 Hijriah", "type": "public", "impact": "medium" },
    { "date": "2025-08-17", "name": "Hari Kemerdekaan Republik Indonesia", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Hari Raya Natal", "type": "public", "impact": "high" }
  ],
  "PH": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-25", "name": "EDSA People Power Revolution Anniversary", "type": "observance", "impact": "medium" },
    { "date": "2025-04-09", "name": "Araw ng Kagitingan", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Maundy Thursday", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labor Day", "type": "public", "impact": "high" },
    { "date": "2025-06-12", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-08-21", "name": "Ninoy Aquino Day", "type": "public", "impact": "medium" },
    { "date": "2025-08-25", "name": "National Heroes Day", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "All Saints' Day", "type": "public", "impact": "medium" },
    { "date": "2025-11-02", "name": "All Souls' Day", "type": "observance", "impact": "low" },
    { "date": "2025-11-30", "name": "Bonifacio Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-30", "name": "Rizal Day", "type": "public", "impact": "high" },
    { "date": "2025-12-31", "name": "Last Day of the Year", "type": "public", "impact": "high" }
  ],
  "VN": [
    { "date": "2025-01-01", "name": "Tết Dương lịch", "type": "public", "impact": "high" },
    { "date": "2025-01-28", "name": "Tết Nguyên Đán", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Tết Nguyên Đán", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "Tết Nguyên Đán", "type": "public", "impact": "high" },
    { "date": "2025-01-31", "name": "Tết Nguyên Đán", "type": "public", "impact": "high" },
    { "date": "2025-04-30", "name": "Ngày Giải phóng miền Nam", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Ngày Quốc tế Lao động", "type": "public", "impact": "high" },
    { "date": "2025-09-02", "name": "Ngày Quốc Khánh", "type": "public", "impact": "high" }
  ],
  "MM": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-04", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-02-12", "name": "Union Day", "type": "public", "impact": "medium" },
    { "date": "2025-03-02", "name": "Peasants' Day", "type": "public", "impact": "medium" },
    { "date": "2025-03-27", "name": "Armed Forces' Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-13", "name": "Thingyan (Water Festival)", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "Thingyan (Water Festival)", "type": "public", "impact": "high" },
    { "date": "2025-04-15", "name": "Thingyan (Water Festival)", "type": "public", "impact": "high" },
    { "date": "2025-04-16", "name": "Thingyan (Water Festival)", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Myanmar New Year", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-12", "name": "Full Moon Day of Kason", "type": "public", "impact": "medium" },
    { "date": "2025-07-19", "name": "Martyrs' Day", "type": "public", "impact": "high" },
    { "date": "2025-08-10", "name": "Full Moon Day of Waso", "type": "public", "impact": "medium" },
    { "date": "2025-10-09", "name": "Full Moon Day of Thadingyut", "type": "public", "impact": "medium" },
    { "date": "2025-11-07", "name": "Full Moon Day of Tazaungmone", "type": "public", "impact": "medium" },
    { "date": "2025-11-17", "name": "National Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "KH": [
    { "date": "2025-01-01", "name": "International New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-07", "name": "Victory Day over Genocide Regime", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "International Women's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "Khmer New Year", "type": "public", "impact": "high" },
    { "date": "2025-04-15", "name": "Khmer New Year", "type": "public", "impact": "high" },
    { "date": "2025-04-16", "name": "Khmer New Year", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "International Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-13", "name": "Visak Bochea Day", "type": "public", "impact": "medium" },
    { "date": "2025-05-14", "name": "Birthday of His Majesty King Norodom Sihamoni", "type": "public", "impact": "high" },
    { "date": "2025-05-20", "name": "National Day of Remembrance", "type": "public", "impact": "medium" },
    { "date": "2025-06-01", "name": "International Children's Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-18", "name": "Birthday of Her Majesty the Queen-Mother Norodom Monineath Sihanouk", "type": "public", "impact": "high" },
    { "date": "2025-09-24", "name": "Constitution Day", "type": "public", "impact": "high" },
    { "date": "2025-10-09", "name": "Pchum Ben Day", "type": "public", "impact": "high" },
    { "date": "2025-10-10", "name": "Pchum Ben Day", "type": "public", "impact": "high" },
    { "date": "2025-10-11", "name": "Pchum Ben Day", "type": "public", "impact": "high" },
    { "date": "2025-10-15", "name": "Commemoration Day of King Norodom Sihanouk", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Paris Peace Accord Day", "type": "public", "impact": "medium" },
    { "date": "2025-10-29", "name": "Coronation Day of His Majesty King Norodom Sihamoni", "type": "public", "impact": "high" },
    { "date": "2025-11-07", "name": "Water Festival", "type": "public", "impact": "high" },
    { "date": "2025-11-08", "name": "Water Festival", "type": "public", "impact": "high" },
    { "date": "2025-11-09", "name": "Independence Day", "type": "public", "impact": "high" }
  ],
  "LA": [
    { "date": "2025-01-01", "name": "International New Year", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "International Women's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "Lao New Year (Pi Mai)", "type": "public", "impact": "high" },
    { "date": "2025-04-15", "name": "Lao New Year (Pi Mai)", "type": "public", "impact": "high" },
    { "date": "2025-04-16", "name": "Lao New Year (Pi Mai)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-12", "name": "Visakha Bucha", "type": "public", "impact": "medium" },
    { "date": "2025-06-01", "name": "National Children's Day", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "Boun Asalaha Bucha", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "That Luang Festival", "type": "public", "impact": "high" },
    { "date": "2025-10-09", "name": "Awk Phansa (End of Buddhist Lent)", "type": "public", "impact": "medium" },
    { "date": "2025-10-10", "name": "Boat Racing Festival (Boun Suang Heua)", "type": "public", "impact": "medium" },
    { "date": "2025-12-02", "name": "Lao National Day", "type": "public", "impact": "high" }
  ],
  "BN": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Chinese New Year", "type": "public", "impact": "high" },
    { "date": "2025-02-08", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-03-01", "name": "Israk Mikraj", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Hari Raya Aidilfitri", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Hari Raya Aidilfitri (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Hari Raya Aidilfitri (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-31", "name": "Royal Brunei Armed Forces Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-15", "name": "First Day of Dzulhijjah (Hari Raya Aidiladha)", "type": "public", "impact": "medium" },
    { "date": "2025-07-06", "name": "Islamic New Year (Ma'al Hijrah)", "type": "public", "impact": "medium" },
    { "date": "2025-07-15", "name": "His Majesty the Sultan's Birthday", "type": "public", "impact": "high" },
    { "date": "2025-08-01", "name": "Isra' Mi'raj (holiday in lieu)", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  // South Asia
  "IN": [
    { "date": "2025-01-26", "name": "Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-03-14", "name": "Holi", "type": "public", "impact": "medium" },
    { "date": "2025-04-04", "name": "Mahavir Jayanti", "type": "public", "impact": "medium" },
    { "date": "2025-04-13", "name": "Ram Navami", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid-ul-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-05-12", "name": "Buddha Purnima", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-10-02", "name": "Gandhi Jayanti", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Diwali", "type": "public", "impact": "high" },
    { "date": "2025-11-02", "name": "Guru Nanak Jayanti", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "PK": [
    { "date": "2025-02-05", "name": "Kashmir Day", "type": "public", "impact": "medium" },
    { "date": "2025-03-23", "name": "Pakistan Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid-ul-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid-ul-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid-ul-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Eid-ul-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid-ul-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid-ul-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-16", "name": "Ashura", "type": "public", "impact": "medium" },
    { "date": "2025-07-17", "name": "Ashura (Day 2)", "type": "public", "impact": "medium" },
    { "date": "2025-08-14", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-09-14", "name": "Eid Milad-un-Nabi", "type": "public", "impact": "medium" },
    { "date": "2025-11-09", "name": "Iqbal Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Quaid-e-Azam Day / Christmas", "type": "public", "impact": "high" }
  ],
  "BD": [
    { "date": "2025-02-21", "name": "Shaheed Day and International Mother Language Day", "type": "public", "impact": "high" },
    { "date": "2025-03-17", "name": "Bangabandhu's Birthday", "type": "public", "impact": "high" },
    { "date": "2025-03-26", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "Bengali New Year", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid-ul-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid-ul-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid-ul-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "May Day", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Eid-ul-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid-ul-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid-ul-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "National Mourning Day", "type": "public", "impact": "high" },
    { "date": "2025-09-14", "name": "Eid-e-Milad-un-Nabi", "type": "public", "impact": "medium" },
    { "date": "2025-10-06", "name": "Durga Puja (Bijoya Dashami)", "type": "public", "impact": "medium" },
    { "date": "2025-12-16", "name": "Victory Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "impact": "high" }
  ],
  "LK": [
    { "date": "2025-01-15", "name": "Tamil Thai Pongal Day", "type": "public", "impact": "medium" },
    { "date": "2025-02-04", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-02-12", "name": "Navam Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-03-14", "name": "Maha Shivaratri", "type": "public", "impact": "medium" },
    { "date": "2025-03-14", "name": "Medin Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-13", "name": "Day prior to Sinhala & Tamil New Year", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "Sinhala & Tamil New Year", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Bak Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "May Day", "type": "public", "impact": "high" },
    { "date": "2025-05-12", "name": "Vesak Full Moon Poya Day", "type": "public", "impact": "high" },
    { "date": "2025-05-13", "name": "Day following Vesak Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-11", "name": "Poson Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-07-10", "name": "Esala Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-08-09", "name": "Nikini Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-09-08", "name": "Binara Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-10-08", "name": "Vap Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-11-06", "name": "Il Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-06", "name": "Unduvap Full Moon Poya Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "NP": [
    { "date": "2025-01-14", "name": "Maghe Sankranti", "type": "public", "impact": "medium" },
    { "date": "2025-02-19", "name": "Prajaatantra Diwas (Democracy Day)", "type": "public", "impact": "medium" },
    { "date": "2025-03-01", "name": "Maha Shivaratri", "type": "public", "impact": "medium" },
    { "date": "2025-03-08", "name": "International Women's Day", "type": "public", "impact": "medium" },
    { "date": "2025-03-22", "name": "Fagu Purnima (Holi)", "type": "public", "impact": "medium" },
    { "date": "2025-04-13", "name": "Nepali New Year", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-12", "name": "Buddha Jayanti", "type": "public", "impact": "medium" },
    { "date": "2025-05-29", "name": "Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Krishna Janmashtami", "type": "public", "impact": "medium" },
    { "date": "2025-10-02", "name": "Ghatasthapana", "type": "public", "impact": "medium" },
    { "date": "2025-10-09", "name": "Dashain (Bijaya Dashami)", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Tihar (Laxmi Puja)", "type": "public", "impact": "high" },
    { "date": "2025-10-24", "name": "Tihar (Govardhan Puja)", "type": "public", "impact": "high" },
    { "date": "2025-10-26", "name": "Chhath Puja", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  // Middle East
  "AE": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafat Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year (Al Hijra)", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet Muhammad's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-12-02", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-12-03", "name": "National Day (Day 2)", "type": "public", "impact": "high" }
  ],
  "SA": [
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-04-23", "name": "Eid al-Fitr (Day 4)", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafat Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-09-23", "name": "National Day", "type": "public", "impact": "high" }
  ],
  "IL": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "observance", "impact": "low" },
    { "date": "2025-03-14", "name": "Purim", "type": "observance", "impact": "medium" },
    { "date": "2025-04-13", "name": "Passover (Pesach)", "type": "public", "impact": "high" },
    { "date": "2025-04-14", "name": "Passover (Pesach) (Day 2)", "type": "observance", "impact": "medium" },
    { "date": "2025-04-15", "name": "Passover (Pesach) (Day 3)", "type": "observance", "impact": "medium" },
    { "date": "2025-04-16", "name": "Passover (Pesach) (Day 4)", "type": "observance", "impact": "medium" },
    { "date": "2025-04-17", "name": "Passover (Pesach) (Day 5)", "type": "observance", "impact": "medium" },
    { "date": "2025-04-18", "name": "Passover (Pesach) (Day 6)", "type": "public", "impact": "high" },
    { "date": "2025-04-23", "name": "Yom HaShoah", "type": "observance", "impact": "low" },
    { "date": "2025-04-29", "name": "Yom HaZikaron", "type": "observance", "impact": "low" },
    { "date": "2025-04-30", "name": "Yom HaAtzmaut", "type": "public", "impact": "high" },
    { "date": "2025-06-02", "name": "Shavuot", "type": "public", "impact": "high" },
    { "date": "2025-07-27", "name": "Tisha B'Av", "type": "observance", "impact": "medium" },
    { "date": "2025-09-23", "name": "Rosh Hashanah", "type": "public", "impact": "high" },
    { "date": "2025-09-24", "name": "Rosh Hashanah (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-10-02", "name": "Yom Kippur", "type": "public", "impact": "high" },
    { "date": "2025-10-07", "name": "Sukkot", "type": "public", "impact": "high" },
    { "date": "2025-10-08", "name": "Sukkot (Day 2)", "type": "observance", "impact": "medium" },
    { "date": "2025-10-09", "name": "Sukkot (Day 3)", "type": "observance", "impact": "medium" },
    { "date": "2025-10-10", "name": "Sukkot (Day 4)", "type": "observance", "impact": "medium" },
    { "date": "2025-10-11", "name": "Sukkot (Day 5)", "type": "observance", "impact": "medium" },
    { "date": "2025-10-12", "name": "Sukkot (Day 6)", "type": "observance", "impact": "medium" },
    { "date": "2025-10-13", "name": "Simchat Torah / Shemini Atzeret", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Hanukkah", "type": "observance", "impact": "low" }
  ],
  "TR": [
    { "date": "2025-01-01", "name": "Yılbaşı", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Ramazan Bayramı Arife", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Ramazan Bayramı (1. Gün)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Ramazan Bayramı (2. Gün)", "type": "public", "impact": "high" },
    { "date": "2025-04-23", "name": "Ulusal Egemenlik ve Çocuk Bayramı", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Emek ve Dayanışma Günü", "type": "public", "impact": "high" },
    { "date": "2025-05-19", "name": "Atatürk'ü Anma, Gençlik ve Spor Bayramı", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Kurban Bayramı Arife", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Kurban Bayramı (1. Gün)", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Kurban Bayramı (2. Gün)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Kurban Bayramı (3. Gün)", "type": "public", "impact": "high" },
    { "date": "2025-06-20", "name": "Kurban Bayramı (4. Gün)", "type": "public", "impact": "high" },
    { "date": "2025-07-15", "name": "Demokrasi ve Milli Birlik Günü", "type": "public", "impact": "high" },
    { "date": "2025-08-30", "name": "Zafer Bayramı", "type": "public", "impact": "high" },
    { "date": "2025-10-29", "name": "Cumhuriyet Bayramı", "type": "public", "impact": "high" }
  ],
  "EG": [
    { "date": "2025-01-07", "name": "Coptic Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-01-25", "name": "Revolution Day, Police Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Sham El Nessim", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-25", "name": "Sinai Liberation Day", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafa Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-30", "name": "June 30th Revolution", "type": "public", "impact": "medium" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-07-23", "name": "Revolution Day", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-10-06", "name": "Armed Forces Day", "type": "public", "impact": "high" }
  ],
  "IR": [
    { "date": "2025-03-20", "name": "Nowruz (Persian New Year)", "type": "public", "impact": "high" },
    { "date": "2025-03-21", "name": "Nowruz (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-03-22", "name": "Nowruz (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-03-23", "name": "Nowruz (Day 4)", "type": "public", "impact": "high" },
    { "date": "2025-04-01", "name": "Islamic Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-04-02", "name": "Sizdah Bedar (Nature's Day)", "type": "public", "impact": "high" },
    { "date": "2025-04-12", "name": "Martyrdom of Imam Ali", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-04", "name": "Demise of Imam Khomeini", "type": "public", "impact": "high" },
    { "date": "2025-06-05", "name": "15 Khordad Uprising", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha (Feast of Sacrifice)", "type": "public", "impact": "high" },
    { "date": "2025-06-25", "name": "Eid al-Ghadir", "type": "public", "impact": "medium" },
    { "date": "2025-07-06", "name": "Ashura", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Tasua", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Arba'een", "type": "public", "impact": "medium" },
    { "date": "2025-10-27", "name": "Prophet Muhammad's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "observance", "impact": "low" }
  ],
  "IQ": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Army Day", "type": "public", "impact": "high" },
    { "date": "2025-04-09", "name": "Baghdad Liberation Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-07-14", "name": "Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-10-03", "name": "Iraqi National Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "JO": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-30", "name": "Tree Day", "type": "observance", "impact": "low" },
    { "date": "2025-03-22", "name": "Arab League Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labor Day", "type": "public", "impact": "high" },
    { "date": "2025-05-25", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafat Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "KW": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-25", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-02-26", "name": "Liberation Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafat Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" }
  ],
  "QA": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-11", "name": "National Sports Day", "type": "public", "impact": "medium" },
    { "date": "2025-02-18", "name": "National Day of Mourning", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafat Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-12-18", "name": "Qatar National Day", "type": "public", "impact": "high" }
  ],
  "BH": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-12-16", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-12-17", "name": "National Day (Day 2)", "type": "public", "impact": "high" }
  ],
  "OM": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Arafat Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-11-18", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-11-19", "name": "National Day (Day 2)", "type": "public", "impact": "high" }
  ],
  "LB": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Epiphany (Armenian Christmas)", "type": "public", "impact": "medium" },
    { "date": "2025-02-09", "name": "Saint Maron's Day", "type": "public", "impact": "medium" },
    { "date": "2025-02-14", "name": "St. Valentine's Day", "type": "public", "impact": "low" },
    { "date": "2025-03-21", "name": "Mother's Day", "type": "public", "impact": "medium" },
    { "date": "2025-03-25", "name": "Annunciation Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday (Western)", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Easter Sunday (Western)", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday (Western)", "type": "public", "impact": "medium" },
    { "date": "2025-04-27", "name": "Good Friday (Orthodox)", "type": "public", "impact": "high" },
    { "date": "2025-04-29", "name": "Easter Sunday (Orthodox)", "type": "public", "impact": "high" },
    { "date": "2025-04-30", "name": "Easter Monday (Orthodox)", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-25", "name": "Liberation Day", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Assumption of Mary", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-11-22", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  // Oceania
  "AU": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-26", "name": "Australia Day", "type": "public", "impact": "high" },
    { "date": "2025-01-27", "name": "Australia Day (holiday in lieu)", "type": "public", "impact": "high" },
    { "date": "2025-03-03", "name": "Labour Day (WA)", "type": "public", "impact": "medium" },
    { "date": "2025-03-10", "name": "Labour Day (VIC)", "type": "public", "impact": "medium" },
    { "date": "2025-03-10", "name": "Eight Hours Day (TAS)", "type": "public", "impact": "medium" },
    { "date": "2025-03-17", "name": "Canberra Day (ACT)", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Easter Saturday", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Easter Sunday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-04-25", "name": "ANZAC Day", "type": "public", "impact": "high" },
    { "date": "2025-05-05", "name": "Labour Day (QLD)", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Queen's Birthday", "type": "public", "impact": "high" },
    { "date": "2025-08-04", "name": "Picnic Day (NT)", "type": "public", "impact": "medium" },
    { "date": "2025-10-06", "name": "Labour Day (NSW, SA, ACT)", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "NZ": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "Day after New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-06", "name": "Waitangi Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-04-25", "name": "ANZAC Day", "type": "public", "impact": "high" },
    { "date": "2025-06-02", "name": "Queen's Birthday", "type": "public", "impact": "high" },
    { "date": "2025-10-27", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "FJ": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Easter Saturday", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-06-02", "name": "Ratu Sir Lala Sukuna Day", "type": "public", "impact": "medium" },
    { "date": "2025-09-08", "name": "Prophet Mohammed's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-10-10", "name": "Fiji Day", "type": "public", "impact": "high" },
    { "date": "2025-11-03", "name": "Diwali", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "PG": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Easter Saturday", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Easter Sunday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Queen's Birthday", "type": "public", "impact": "high" },
    { "date": "2025-07-23", "name": "National Remembrance Day", "type": "public", "impact": "medium" },
    { "date": "2025-09-16", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  // South America
  "BR": [
    { "date": "2025-01-01", "name": "Confraternização Universal", "type": "public", "impact": "high" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "observance", "impact": "medium" },
    { "date": "2025-03-05", "name": "Quarta-feira de Cinzas", "type": "observance", "impact": "low" },
    { "date": "2025-04-18", "name": "Paixão de Cristo", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Tiradentes", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Dia do Trabalho", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Corpus Christi", "type": "public", "impact": "medium" },
    { "date": "2025-09-07", "name": "Independência do Brasil", "type": "public", "impact": "high" },
    { "date": "2025-10-12", "name": "Nossa Senhora Aparecida", "type": "public", "impact": "high" },
    { "date": "2025-11-02", "name": "Finados", "type": "public", "impact": "medium" },
    { "date": "2025-11-15", "name": "Proclamação da República", "type": "public", "impact": "high" },
    { "date": "2025-11-20", "name": "Dia da Consciência Negra", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Natal", "type": "public", "impact": "high" }
  ],
  "AR": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-03-03", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-03-24", "name": "Día Nacional de la Memoria por la Verdad y la Justicia", "type": "public", "impact": "high" },
    { "date": "2025-04-02", "name": "Día del Veterano y de los Caídos en la Guerra de Malvinas", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajador", "type": "public", "impact": "high" },
    { "date": "2025-05-25", "name": "Día de la Revolución de Mayo", "type": "public", "impact": "high" },
    { "date": "2025-06-20", "name": "Paso a la Inmortalidad del Gral. Manuel Belgrano", "type": "public", "impact": "high" },
    { "date": "2025-07-09", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-08-18", "name": "Paso a la Inmortalidad del Gral. José de San Martín", "type": "public", "impact": "high" },
    { "date": "2025-10-13", "name": "Día del Respeto a la Diversidad Cultural", "type": "public", "impact": "medium" },
    { "date": "2025-11-24", "name": "Día de la Soberanía Nacional", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Inmaculada Concepción de María", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "CL": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Sábado Santo", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Día Nacional del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-05-21", "name": "Día de las Glorias Navales", "type": "public", "impact": "high" },
    { "date": "2025-06-27", "name": "Día de San Pedro y San Pablo", "type": "public", "impact": "medium" },
    { "date": "2025-07-16", "name": "Día de la Virgen del Carmen", "type": "public", "impact": "medium" },
    { "date": "2025-08-15", "name": "Asunción de la Virgen", "type": "public", "impact": "high" },
    { "date": "2025-09-18", "name": "Día de la Independencia Nacional", "type": "public", "impact": "high" },
    { "date": "2025-09-19", "name": "Día de las Glorias del Ejército", "type": "public", "impact": "high" },
    { "date": "2025-10-13", "name": "Día del Descubrimiento de Dos Mundos", "type": "public", "impact": "medium" },
    { "date": "2025-10-31", "name": "Día Nacional de las Iglesias Evangélicas y Protestantes", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Día de Todos los Santos", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Inmaculada Concepción", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "CO": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Día de los Reyes Magos", "type": "public", "impact": "medium" },
    { "date": "2025-03-24", "name": "Día de San José", "type": "public", "impact": "medium" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-06-02", "name": "Día de la Ascensión", "type": "public", "impact": "medium" },
    { "date": "2025-06-23", "name": "Corpus Christi", "type": "public", "impact": "medium" },
    { "date": "2025-06-30", "name": "Día del Sagrado Corazón de Jesús", "type": "public", "impact": "medium" },
    { "date": "2025-07-20", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-08-07", "name": "Batalla de Boyacá", "type": "public", "impact": "high" },
    { "date": "2025-08-18", "name": "Asunción de la Virgen", "type": "public", "impact": "medium" },
    { "date": "2025-10-13", "name": "Día de la Raza", "type": "public", "impact": "medium" },
    { "date": "2025-11-03", "name": "Día de Todos los Santos", "type": "public", "impact": "medium" },
    { "date": "2025-11-17", "name": "Independencia de Cartagena", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Día de la Inmaculada Concepción", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "PE": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-06-29", "name": "Día de San Pedro y San Pablo", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-07-29", "name": "Fiestas Patrias", "type": "public", "impact": "high" },
    { "date": "2025-08-30", "name": "Santa Rosa de Lima", "type": "public", "impact": "medium" },
    { "date": "2025-10-08", "name": "Combate de Angamos", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Día de Todos los Santos", "type": "public", "impact": "medium" },
    { "date": "2025-12-08", "name": "Inmaculada Concepción", "type": "public", "impact": "high" },
    { "date": "2025-12-09", "name": "Batalla de Ayacucho", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "VE": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Día de Reyes", "type": "observance", "impact": "low" },
    { "date": "2025-03-03", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-04-19", "name": "Declaración de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajador", "type": "public", "impact": "high" },
    { "date": "2025-06-24", "name": "Batalla de Carabobo", "type": "public", "impact": "high" },
    { "date": "2025-07-05", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-07-24", "name": "Natalicio del Libertador Simón Bolívar", "type": "public", "impact": "high" },
    { "date": "2025-10-12", "name": "Día de la Resistencia Indígena", "type": "public", "impact": "medium" },
    { "date": "2025-12-24", "name": "Víspera de Navidad", "type": "observance", "impact": "low" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" },
    { "date": "2025-12-31", "name": "Víspera de Año Nuevo", "type": "observance", "impact": "low" }
  ],
  "EC": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-03-03", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-05-24", "name": "Batalla de Pichincha", "type": "public", "impact": "high" },
    { "date": "2025-08-10", "name": "Primer Grito de Independencia", "type": "public", "impact": "high" },
    { "date": "2025-10-09", "name": "Independencia de Guayaquil", "type": "public", "impact": "high" },
    { "date": "2025-11-02", "name": "Día de los Difuntos", "type": "public", "impact": "medium" },
    { "date": "2025-11-03", "name": "Independencia de Cuenca", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "UY": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Día de Reyes", "type": "public", "impact": "medium" },
    { "date": "2025-03-03", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Día de la Armada", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Día de los Trabajadores", "type": "public", "impact": "high" },
    { "date": "2025-05-18", "name": "Batalla de Las Piedras", "type": "public", "impact": "medium" },
    { "date": "2025-06-19", "name": "Natalicio de Artigas", "type": "public", "impact": "high" },
    { "date": "2025-07-18", "name": "Jura de la Constitución", "type": "public", "impact": "high" },
    { "date": "2025-08-25", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-10-13", "name": "Día de la Raza", "type": "public", "impact": "medium" },
    { "date": "2025-11-02", "name": "Día de los Difuntos", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "PY": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-03-01", "name": "Día de los Héroes", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajador", "type": "public", "impact": "high" },
    { "date": "2025-05-14", "name": "Día de la Independencia Nacional", "type": "public", "impact": "high" },
    { "date": "2025-05-15", "name": "Día de la Independencia Nacional (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-12", "name": "Día de la Paz del Chaco", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Día de la Fundación de Asunción", "type": "public", "impact": "high" },
    { "date": "2025-12-08", "name": "Día de la Virgen de Caacupé", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "BO": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-22", "name": "Día del Estado Plurinacional de Bolivia", "type": "public", "impact": "high" },
    { "date": "2025-03-03", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-03-04", "name": "Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Corpus Christi", "type": "public", "impact": "medium" },
    { "date": "2025-08-06", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-11-02", "name": "Día de Todos Santos", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  // Central America
  "PA": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-09", "name": "Día de los Mártires", "type": "public", "impact": "high" },
    { "date": "2025-03-04", "name": "Martes de Carnaval", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-11-03", "name": "Día de la Separación de Panamá de Colombia", "type": "public", "impact": "high" },
    { "date": "2025-11-04", "name": "Día de los Símbolos Patrios", "type": "public", "impact": "medium" },
    { "date": "2025-11-05", "name": "Día de la Colón", "type": "public", "impact": "medium" },
    { "date": "2025-11-10", "name": "Primer Grito de Independencia de la Villa de Los Santos", "type": "public", "impact": "high" },
    { "date": "2025-11-28", "name": "Día de la Independencia de Panamá de España", "type": "public", "impact": "high" },
    { "date": "2025-12-08", "name": "Día de la Madre", "type": "public", "impact": "high" },
    { "date": "2025-12-20", "name": "Día de Duelo Nacional", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Día de Navidad", "type": "public", "impact": "high" }
  ],
  "CR": [
    { "date": "2025-01-01", "name": "Día de Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-11", "name": "Día de Juan Santamaría", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajador", "type": "public", "impact": "high" },
    { "date": "2025-07-25", "name": "Anexión del Partido de Nicoya", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Día de la Madre", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-10-12", "name": "Día de las Culturas", "type": "public", "impact": "medium" },
    { "date": "2025-12-01", "name": "Día de la Abolición del Ejército", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Día de Navidad", "type": "public", "impact": "high" }
  ],
  "GT": [
    { "date": "2025-01-01", "name": "Día de Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Sábado Santo", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-06-30", "name": "Día del Ejército", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Día de la Asunción", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-10-20", "name": "Día de la Revolución", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "Día de Todos los Santos", "type": "public", "impact": "medium" },
    { "date": "2025-12-24", "name": "Noche Buena", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Día de Navidad", "type": "public", "impact": "high" },
    { "date": "2025-12-31", "name": "Noche Vieja", "type": "public", "impact": "high" }
  ],
  "SV": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Sábado Santo", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Día Internacional del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-08-03", "name": "Día del Comercio", "type": "public", "impact": "medium" },
    { "date": "2025-08-04", "name": "Día del Empleado Público", "type": "public", "impact": "medium" },
    { "date": "2025-08-05", "name": "Fiestas Agostinas (Día de San Salvador)", "type": "public", "impact": "high" },
    { "date": "2025-08-06", "name": "Fiestas Agostinas (Día de la Transfiguración)", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-11-02", "name": "Día de los Difuntos", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "HN": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Sábado de Gloria", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-10-03", "name": "Día del Soldado", "type": "public", "impact": "medium" },
    { "date": "2025-10-12", "name": "Día de la Raza", "type": "public", "impact": "medium" },
    { "date": "2025-10-21", "name": "Día de las Fuerzas Armadas", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" }
  ],
  "NI": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-04-17", "name": "Jueves Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Sábado Santo", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Día Internacional de los Trabajadores", "type": "public", "impact": "high" },
    { "date": "2025-07-19", "name": "Día de la Revolución Sandinista", "type": "public", "impact": "high" },
    { "date": "2025-09-14", "name": "Batalla de San Jacinto", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-12-08", "name": "Día de la Inmaculada Concepción", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Día de Navidad", "type": "public", "impact": "high" }
  ],
  // Caribbean
  "CU": [
    { "date": "2025-01-01", "name": "Día de la Liberación", "type": "public", "impact": "high" },
    { "date": "2025-01-02", "name": "Día de la Victoria", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día Internacional de los Trabajadores", "type": "public", "impact": "high" },
    { "date": "2025-07-25", "name": "Día de la Revolución (asueto)", "type": "public", "impact": "high" },
    { "date": "2025-07-26", "name": "Día de la Rebeldía Nacional", "type": "public", "impact": "high" },
    { "date": "2025-07-27", "name": "Día de la Rebeldía Nacional (asueto)", "type": "public", "impact": "high" },
    { "date": "2025-10-10", "name": "Día de la Independencia", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Navidad", "type": "public", "impact": "high" },
    { "date": "2025-12-31", "name": "Noche Vieja", "type": "public", "impact": "high" }
  ],
  "DO": [
    { "date": "2025-01-01", "name": "Año Nuevo", "type": "public", "impact": "high" },
    { "date": "2025-01-06", "name": "Día de Reyes", "type": "public", "impact": "medium" },
    { "date": "2025-01-21", "name": "Día de la Altagracia", "type": "public", "impact": "medium" },
    { "date": "2025-01-26", "name": "Día de Duarte", "type": "public", "impact": "high" },
    { "date": "2025-02-27", "name": "Día de la Independencia Nacional", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Viernes Santo", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Día del Trabajo", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Corpus Christi", "type": "public", "impact": "medium" },
    { "date": "2025-08-16", "name": "Día de la Restauración", "type": "public", "impact": "high" },
    { "date": "2025-09-24", "name": "Día de Nuestra Señora de las Mercedes", "type": "public", "impact": "medium" },
    { "date": "2025-11-06", "name": "Día de la Constitución", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Día de Navidad", "type": "public", "impact": "high" }
  ],
  "JM": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-23", "name": "Ash Wednesday", "type": "observance", "impact": "low" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-23", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-08-01", "name": "Emancipation Day", "type": "public", "impact": "high" },
    { "date": "2025-08-06", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-10-20", "name": "National Heroes Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "TT": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-03-03", "name": "Carnival Monday", "type": "public", "impact": "high" },
    { "date": "2025-03-04", "name": "Carnival Tuesday", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-30", "name": "Indian Arrival Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-19", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid-ul-Fitr (subject to moon sighting)", "type": "public", "impact": "high" },
    { "date": "2025-08-01", "name": "Emancipation Day", "type": "public", "impact": "high" },
    { "date": "2025-08-31", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-09-24", "name": "Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-10-23", "name": "Divali (subject to moon sighting)", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  // Africa
  "ZA": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-03-21", "name": "Human Rights Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Family Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-27", "name": "Freedom Day", "type": "public", "impact": "high" },
    { "date": "2025-04-28", "name": "Freedom Day (holiday in lieu)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Workers' Day", "type": "public", "impact": "high" },
    { "date": "2025-06-16", "name": "Youth Day", "type": "public", "impact": "high" },
    { "date": "2025-08-09", "name": "National Women's Day", "type": "public", "impact": "high" },
    { "date": "2025-08-11", "name": "National Women's Day (holiday in lieu)", "type": "public", "impact": "high" },
    { "date": "2025-09-24", "name": "Heritage Day", "type": "public", "impact": "high" },
    { "date": "2025-12-16", "name": "Day of Reconciliation", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Day of Goodwill", "type": "public", "impact": "high" }
  ],
  "NG": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Workers' Day", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Democracy Day", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-07-29", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-09-16", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-10-01", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "KE": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-01", "name": "Madaraka Day", "type": "public", "impact": "high" },
    { "date": "2025-06-02", "name": "Madaraka Day (holiday in lieu)", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-10-10", "name": "Huduma Day", "type": "public", "impact": "medium" },
    { "date": "2025-10-20", "name": "Mashujaa Day", "type": "public", "impact": "high" },
    { "date": "2025-12-12", "name": "Jamhuri Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "MA": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-11", "name": "Proclamation of Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-01-29", "name": "Amazigh New Year (Yennayer)", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-07-30", "name": "Feast of the Throne", "type": "public", "impact": "high" },
    { "date": "2025-08-14", "name": "Oued Eddahab Day", "type": "public", "impact": "medium" },
    { "date": "2025-08-20", "name": "Revolution of the King and the People", "type": "public", "impact": "high" },
    { "date": "2025-08-21", "name": "Youth Day", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-11-06", "name": "Green March Day", "type": "public", "impact": "high" },
    { "date": "2025-11-18", "name": "Independence Day", "type": "public", "impact": "high" }
  ],
  "GH": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-07", "name": "Constitution Day", "type": "public", "impact": "high" },
    { "date": "2025-03-06", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "May Day", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-08-04", "name": "Founders' Day", "type": "public", "impact": "high" },
    { "date": "2025-09-21", "name": "Kwame Nkrumah Memorial Day", "type": "public", "impact": "high" },
    { "date": "2025-09-22", "name": "Kwame Nkrumah Memorial Day (holiday in lieu)", "type": "public", "impact": "high" },
    { "date": "2025-12-05", "name": "Farmers' Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "ET": [
    { "date": "2025-01-07", "name": "Genna (Christmas)", "type": "public", "impact": "high" },
    { "date": "2025-01-19", "name": "Timkat (Epiphany)", "type": "public", "impact": "high" },
    { "date": "2025-03-02", "name": "Adwa Victory Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Fasika (Easter)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "International Labor Day", "type": "public", "impact": "high" },
    { "date": "2025-05-05", "name": "Patriots' Victory Day", "type": "public", "impact": "high" },
    { "date": "2025-05-28", "name": "Derg Downfall Day", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-09-11", "name": "Enkutatash (Ethiopian New Year)", "type": "public", "impact": "high" },
    { "date": "2025-09-27", "name": "Meskel (Finding of the True Cross)", "type": "public", "impact": "high" },
    { "date": "2025-12-16", "name": "Eid al-Adha", "type": "public", "impact": "high" }
  ],
  "TZ": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-12", "name": "Zanzibar Revolution Day", "type": "public", "impact": "high" },
    { "date": "2025-04-07", "name": "Karume Day", "type": "public", "impact": "medium" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-04-26", "name": "Union Day", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "International Workers' Day", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Saba Saba", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-08-08", "name": "Nane Nane", "type": "public", "impact": "medium" },
    { "date": "2025-10-14", "name": "Nyerere Day", "type": "public", "impact": "high" },
    { "date": "2025-12-09", "name": "Independence and Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "UG": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-26", "name": "Liberation Day", "type": "public", "impact": "high" },
    { "date": "2025-01-27", "name": "Liberation Day (holiday in lieu)", "type": "public", "impact": "high" },
    { "date": "2025-03-08", "name": "International Women's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-03", "name": "Martyrs' Day", "type": "public", "impact": "high" },
    { "date": "2025-06-09", "name": "National Heroes' Day", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-10-09", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-12-09", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "DZ": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-12", "name": "Amazigh New Year (Yennayer)", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-05", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-11-01", "name": "Revolution Day", "type": "public", "impact": "high" }
  ],
  "TN": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-01-14", "name": "Revolution and Youth Day", "type": "public", "impact": "high" },
    { "date": "2025-03-20", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-04-09", "name": "Martyrs' Day", "type": "public", "impact": "high" },
    { "date": "2025-04-20", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Eid al-Fitr (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-04-22", "name": "Eid al-Fitr (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-06-17", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-06-18", "name": "Eid al-Adha (Day 2)", "type": "public", "impact": "high" },
    { "date": "2025-06-19", "name": "Eid al-Adha (Day 3)", "type": "public", "impact": "high" },
    { "date": "2025-07-07", "name": "Islamic New Year", "type": "public", "impact": "medium" },
    { "date": "2025-07-25", "name": "Republic Day", "type": "public", "impact": "high" },
    { "date": "2025-08-13", "name": "Women's Day", "type": "public", "impact": "medium" },
    { "date": "2025-09-15", "name": "Prophet's Birthday", "type": "public", "impact": "medium" },
    { "date": "2025-10-15", "name": "Evacuation Day", "type": "public", "impact": "high" }
  ],
  "ZW": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-04-19", "name": "Easter Saturday", "type": "public", "impact": "medium" },
    { "date": "2025-04-20", "name": "Easter Sunday", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-04-21", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Workers' Day", "type": "public", "impact": "high" },
    { "date": "2025-05-25", "name": "Africa Day", "type": "public", "impact": "medium" },
    { "date": "2025-05-26", "name": "Africa Day (holiday in lieu)", "type": "public", "impact": "medium" },
    { "date": "2025-08-11", "name": "Heroes' Day", "type": "public", "impact": "high" },
    { "date": "2025-08-12", "name": "Defence Forces National Holiday", "type": "public", "impact": "high" },
    { "date": "2025-12-22", "name": "National Unity Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" },
    { "date": "2025-12-26", "name": "Boxing Day", "type": "public", "impact": "high" }
  ],
  "CM": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-02-11", "name": "Youth Day", "type": "public", "impact": "high" },
    { "date": "2025-04-18", "name": "Good Friday", "type": "public", "impact": "high" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-20", "name": "National Day", "type": "public", "impact": "high" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "CI": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Ascension Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Pentecost Monday", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "Eid al-Fitr", "type": "public", "impact": "high" },
    { "date": "2025-08-07", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Assumption Day", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Eid al-Adha", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "All Saints' Day", "type": "public", "impact": "medium" },
    { "date": "2025-11-15", "name": "National Peace Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ],
  "SN": [
    { "date": "2025-01-01", "name": "New Year's Day", "type": "public", "impact": "high" },
    { "date": "2025-04-04", "name": "Independence Day", "type": "public", "impact": "high" },
    { "date": "2025-04-21", "name": "Easter Monday", "type": "public", "impact": "medium" },
    { "date": "2025-05-01", "name": "Labour Day", "type": "public", "impact": "high" },
    { "date": "2025-05-29", "name": "Ascension Day", "type": "public", "impact": "medium" },
    { "date": "2025-06-09", "name": "Pentecost Monday", "type": "public", "impact": "medium" },
    { "date": "2025-07-28", "name": "Korité (Eid al-Fitr)", "type": "public", "impact": "high" },
    { "date": "2025-08-15", "name": "Assumption Day", "type": "public", "impact": "high" },
    { "date": "2025-09-15", "name": "Tabaski (Eid al-Adha)", "type": "public", "impact": "high" },
    { "date": "2025-11-01", "name": "All Saints' Day", "type": "public", "impact": "medium" },
    { "date": "2025-12-25", "name": "Christmas Day", "type": "public", "impact": "high" }
  ]
}

// 2026年各国节假日数据（预测）
export const holidays2026: Record<string, Holiday[]> = {
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
  UK: [
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
  // 添加更多国家数据...
}

// 获取特定国家的节假日
export function getCountryHolidays(countryCode: string, year: number = new Date().getFullYear()): Holiday[] {
  const yearHolidays = generateHolidayData(year)
  return yearHolidays[countryCode] || []
}

// 获取即将到来的节假日
export function getUpcomingHolidays(daysAhead: number = 30): UpcomingHoliday[] {
  const today = new Date()
  const currentYear = today.getFullYear()
  const upcoming: UpcomingHoliday[] = []
  const yearHolidays = generateHolidayData(currentYear)
  
  // 国家法定节假日
  Object.entries(yearHolidays).forEach(([countryCode, holidays]) => {
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
  
  // 添加国际节假日
  internationalHolidays.forEach(holiday => {
    const holidayDate = new Date(`${currentYear}-${holiday.date}`)
    const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntil > 0 && daysUntil <= daysAhead) {
      upcoming.push({
        ...holiday,
        date: holidayDate.toISOString().split('T')[0],
        country: '国际',
        flag: '🌍',
        daysUntil
      })
    }
  })
  
  // 添加重要宗教节日
  if (currentYear === 2025) {
    religiousHolidays2025.forEach(holiday => {
      const holidayDate = new Date(holiday.date)
      const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
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
    const holidayMonth = new Date(holiday.date).getMonth() + 1
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
  
  return grouped
}
