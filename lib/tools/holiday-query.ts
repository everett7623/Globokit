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
  JP: [
    { date: '2025-01-01', name: '元日', localName: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-13', name: '成人の日', localName: 'Coming of Age Day', type: 'public', impact: 'medium' },
    { date: '2025-02-11', name: '建国記念の日', localName: 'National Foundation Day', type: 'public', impact: 'medium' },
    { date: '2025-02-23', name: '天皇誕生日', localName: "Emperor's Birthday", type: 'public', impact: 'medium' },
    { date: '2025-03-20', name: '春分の日', localName: 'Vernal Equinox', type: 'public', impact: 'medium' },
    { date: '2025-04-29', name: '昭和の日', localName: 'Showa Day', type: 'public', impact: 'high' },
    { date: '2025-05-03', name: '憲法記念日', localName: 'Constitution Day', type: 'public', impact: 'high' },
    { date: '2025-05-04', name: 'みどりの日', localName: 'Greenery Day', type: 'public', impact: 'high' },
    { date: '2025-05-05', name: 'こどもの日', localName: "Children's Day", type: 'public', impact: 'high' },
    { date: '2025-07-21', name: '海の日', localName: 'Marine Day', type: 'public', impact: 'medium' },
    { date: '2025-08-11', name: '山の日', localName: 'Mountain Day', type: 'public', impact: 'medium' },
    { date: '2025-09-15', name: '敬老の日', localName: 'Respect for the Aged Day', type: 'public', impact: 'medium' },
    { date: '2025-09-23', name: '秋分の日', localName: 'Autumnal Equinox', type: 'public', impact: 'medium' },
    { date: '2025-10-13', name: 'スポーツの日', localName: 'Sports Day', type: 'public', impact: 'medium' },
    { date: '2025-11-03', name: '文化の日', localName: 'Culture Day', type: 'public', impact: 'medium' },
    { date: '2025-11-23', name: '勤労感謝の日', localName: 'Labor Thanksgiving', type: 'public', impact: 'medium' },
  ],
// 法国
FR: [
  { date: '2025-01-01', name: 'Jour de l\'an', localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Lundi de Pâques', localName: '复活节星期一', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Fête du Travail', localName: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Victoire 1945', localName: '二战胜利日', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension', localName: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Lundi de Pentecôte', localName: '圣灵降临节', type: 'public', impact: 'medium' },
  { date: '2025-07-14', name: 'Fête nationale', localName: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assomption', localName: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'Toussaint', localName: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Armistice 1918', localName: '一战停战日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Noël', localName: '圣诞节', type: 'public', impact: 'high' },
],

// 意大利
IT: [
  { date: '2025-01-01', name: 'Capodanno', localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epifania', localName: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Lunedì di Pasqua', localName: '复活节星期一', type: 'public', impact: 'high' },
  { date: '2025-04-25', name: 'Festa della Liberazione', localName: '解放日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Festa del Lavoro', localName: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Festa della Repubblica', localName: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Ferragosto', localName: '八月节', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'Ognissanti', localName: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immacolata Concezione', localName: '圣母无染原罪节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Natale', localName: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Santo Stefano', localName: '圣斯德望日', type: 'public', impact: 'high' },
],

// 西班牙
ES: [
  { date: '2025-01-01', name: 'Año Nuevo', localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epifanía del Señor', localName: '主显节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Viernes Santo', localName: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Día del Trabajador', localName: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Asunción de la Virgen', localName: '圣母升天节', type: 'public', impact: 'medium' },
  { date: '2025-10-12', name: 'Fiesta Nacional', localName: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'Todos los Santos', localName: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Día de la Constitución', localName: '宪法日', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Inmaculada Concepción', localName: '圣母无染原罪节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Navidad', localName: '圣诞节', type: 'public', impact: 'high' },
],

// 韩国
KR: [
  { date: '2025-01-01', name: '신정', localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: '설날', localName: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: '설날', localName: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: '설날', localName: '春节', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: '삼일절', localName: '三一节', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: '어린이날', localName: '儿童节', type: 'public', impact: 'medium' },
  { date: '2025-06-06', name: '현충일', localName: '显忠日', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: '광복절', localName: '光复节', type: 'public', impact: 'medium' },
  { date: '2025-10-03', name: '개천절', localName: '开天节', type: 'public', impact: 'medium' },
  { date: '2025-10-05', name: '추석', localName: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-06', name: '추석', localName: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-07', name: '추석', localName: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: '한글날', localName: '韩文日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: '성탄절', localName: '圣诞节', type: 'public', impact: 'high' },
],

// 印度
IN: [
  { date: '2025-01-26', name: 'Republic Day', localName: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-03-17', name: 'Holi', localName: '洒红节', type: 'public', impact: 'high' },
  { date: '2025-03-30', name: 'Eid ul-Fitr', localName: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-10', name: 'Ram Navami', localName: '罗摩诞辰', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'medium' },
  { date: '2025-05-12', name: 'Buddha Purnima', localName: '佛诞日', type: 'public', impact: 'medium' },
  { date: '2025-06-07', name: 'Eid ul-Adha', localName: '宰牲节', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Independence Day', localName: '独立日', type: 'public', impact: 'high' },
  { date: '2025-08-16', name: 'Janmashtami', localName: '黑天诞辰', type: 'public', impact: 'medium' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', localName: '甘地诞辰', type: 'public', impact: 'high' },
  { date: '2025-10-20', name: 'Dussehra', localName: '十胜节', type: 'public', impact: 'high' },
  { date: '2025-11-10', name: 'Diwali', localName: '排灯节', type: 'public', impact: 'high' },
  { date: '2025-11-15', name: 'Guru Nanak Jayanti', localName: '古鲁那纳克诞辰', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas', localName: '圣诞节', type: 'public', impact: 'medium' },
],

// 巴西
BR: [
  { date: '2025-01-01', name: 'Ano Novo', localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Carnaval', localName: '狂欢节', type: 'public', impact: 'high' },
  { date: '2025-03-04', name: 'Carnaval', localName: '狂欢节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Sexta-feira Santa', localName: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Tiradentes', localName: '蒂拉登特斯日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Dia do Trabalho', localName: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: '基督圣体节', type: 'public', impact: 'medium' },
  { date: '2025-09-07', name: 'Independência', localName: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-12', name: 'Nossa Senhora Aparecida', localName: '圣母显现日', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'Finados', localName: '万灵节', type: 'public', impact: 'medium' },
  { date: '2025-11-15', name: 'Proclamação da República', localName: '共和国成立日', type: 'public', impact: 'medium' },
  { date: '2025-11-20', name: 'Consciência Negra', localName: '黑人意识日', type: 'regional', impact: 'low' },
  { date: '2025-12-25', name: 'Natal', localName: '圣诞节', type: 'public', impact: 'high' },
],

// 加拿大
CA: [
  { date: '2025-01-01', name: "New Year's Day", localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-02-17', name: 'Family Day', localName: '家庭日', type: 'regional', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: '复活节星期一', type: 'regional', impact: 'medium' },
  { date: '2025-05-19', name: 'Victoria Day', localName: '维多利亚日', type: 'public', impact: 'medium' },
  { date: '2025-07-01', name: 'Canada Day', localName: '加拿大日', type: 'public', impact: 'high' },
  { date: '2025-08-04', name: 'Civic Holiday', localName: '公民假日', type: 'regional', impact: 'low' },
  { date: '2025-09-01', name: 'Labour Day', localName: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-09-30', name: 'Truth and Reconciliation Day', localName: '真相与和解日', type: 'public', impact: 'medium' },
  { date: '2025-10-13', name: 'Thanksgiving', localName: '感恩节', type: 'public', impact: 'high' },
  { date: '2025-11-11', name: 'Remembrance Day', localName: '纪念日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: '节礼日', type: 'public', impact: 'high' },
],

// 澳大利亚
AU: [
  { date: '2025-01-01', name: "New Year's Day", localName: '新年', type: 'public', impact: 'high' },
  { date: '2025-01-26', name: 'Australia Day', localName: '澳大利亚日', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', localName: '复活节星期六', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: '复活节星期一', type: 'public', impact: 'high' },
  { date: '2025-04-25', name: 'Anzac Day', localName: '澳新军团日', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: "Queen's Birthday", localName: '女王生日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: '节礼日', type: 'public', impact: 'high' },
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
