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
UK: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: 'Early May Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-05-26', name: 'Spring Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-08-25', name: 'Summer Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' },
],

DE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neujahr', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Karfreitag', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ostermontag', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Tag der Arbeit', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Christi Himmelfahrt', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pfingstmontag', type: 'public', impact: 'medium' },
  { date: '2025-10-03', name: 'German Unity Day', localName: 'Tag der Deutschen Einheit', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Erster Weihnachtstag', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Zweiter Weihnachtstag', type: 'public', impact: 'high' },
],

FR: [
  { date: '2025-01-01', name: "New Year's Day", localName: "Jour de l'An", type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Lundi de Pâques', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Fête du Travail', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Victory in Europe Day', localName: 'Victoire 1945', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Ascension', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Lundi de Pentecôte', type: 'public', impact: 'medium' },
  { date: '2025-07-14', name: 'Bastille Day', localName: 'Fête Nationale', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Assomption', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Toussaint', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Armistice Day', localName: 'Armistice 1918', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Noël', type: 'public', impact: 'high' },
],

IT: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Capodanno', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Epifania', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: "Lunedì dell'Angelo", type: 'public', impact: 'medium' },
  { date: '2025-04-25', name: 'Liberation Day', localName: 'Festa della Liberazione', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Festa del Lavoro', type: 'public', impact: 'high' },
  { date: '2025-06-02', name: 'Republic Day', localName: 'Festa della Repubblica', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Ferragosto', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Ognissanti', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Immacolata Concezione', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Natale', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Santo Stefano', type: 'public', impact: 'high' },
],

ES: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Año Nuevo', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Día de Reyes / Epifanía del Señor', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Viernes Santo', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Día del Trabajo', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Asunción de la Virgen', type: 'public', impact: 'medium' },
  { date: '2025-10-12', name: 'National Day of Spain', localName: 'Fiesta Nacional de España', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Día de Todos los Santos', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Constitution Day', localName: 'Día de la Constitución Española', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Inmaculada Concepción', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Navidad', type: 'public', impact: 'high' },
],

NL: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nieuwjaarsdag', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Goede Vrijdag', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Eerste Paasdag', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Tweede Paasdag', type: 'public', impact: 'medium' },
  { date: '2025-04-26', name: "King's Day", localName: 'Koningsdag', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Liberation Day', localName: 'Bevrijdingsdag', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Hemelvaartsdag', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Eerste Pinksterdag', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Tweede Pinksterdag', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Eerste Kerstdag', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Tweede Kerstdag', type: 'public', impact: 'high' },
],

BE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nieuwjaar', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Paasmaandag', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Dag van de Arbeid', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'O.L.H. Hemelvaart', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pinkstermaandag', type: 'public', impact: 'medium' },
  { date: '2025-07-21', name: 'Belgian National Day', localName: 'Nationale feestdag', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Onze Lieve Vrouw Hemelvaart', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Allerheiligen', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Armistice Day', localName: 'Wapenstilstand', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Kerstmis', type: 'public', impact: 'high' },
],

CH: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neujahr', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Karfreitag', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ostermontag', type: 'regional', impact: 'medium' }, // Not all cantons
  { date: '2025-05-01', name: 'Labour Day', localName: 'Tag der Arbeit', type: 'regional', impact: 'medium' }, // Not all cantons
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Auffahrt', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pfingstmontag', type: 'regional', impact: 'medium' }, // Not all cantons
  { date: '2025-08-01', name: 'Swiss National Day', localName: 'Nationalfeiertag', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Weihnachten', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Stephanstag', type: 'regional', impact: 'medium' }, // Not all cantons
],

AT: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neujahr', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Heilige Drei Könige', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ostermontag', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Staatsfeiertag', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Christi Himmelfahrt', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Pfingstmontag', type: 'public', impact: 'medium' },
  { date: '2025-06-19', name: 'Corpus Christi', localName: 'Fronleichnam', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Mariä Himmelfahrt', type: 'public', impact: 'medium' },
  { date: '2025-10-26', name: 'Austrian National Day', localName: 'Nationalfeiertag', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Allerheiligen', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', localName: 'Mariä Empfängnis', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Christtag', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Stefanitag', type: 'public', impact: 'high' },
],

IE: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-03-17', name: "St. Patrick's Day", type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: 'May Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'June Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-08-04', name: 'August Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-10-27', name: 'October Bank Holiday', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: "St. Stephen's Day", type: 'public', impact: 'high' },
],

LU: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Neijoerschdag', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Ouschterméindeg', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Dag vun der Aarbecht', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Europe Day', localName: 'Europadag', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Ascension', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Péngschtméindeg', type: 'public', impact: 'medium' },
  { date: '2025-06-23', name: 'Luxembourg National Day', localName: 'Nationalfeierdag', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', localName: 'Léiffrawëschdag', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Allerhellgen', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Chrëschtdag', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Stiefesdag', type: 'public', impact: 'high' },
],
// Northern Europe
SE: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nyårsdagen', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Trettondedag jul', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Långfredagen', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Påskdagen', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Annandag påsk', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Första maj', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kristi himmelsfärds dag', type: 'public', impact: 'medium' },
  { date: '2025-06-06', name: 'Sweden National Day', localName: 'Sveriges nationaldag', type: 'public', impact: 'high' },
  { date: '2025-06-21', name: 'Midsummer Day', localName: 'Midsommardagen', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Alla helgons dag', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Juldagen', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Annandag jul', type: 'public', impact: 'high' },
],

NO: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Første nyttårsdag', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Skjærtorsdag', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Langfredag', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Første påskedag', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Andre påskedag', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Arbeidernes internasjonale kampdag', type: 'public', impact: 'high' },
  { date: '2025-05-17', name: 'Constitution Day', localName: 'Grunnlovsdagen', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kristi Himmelfartsdag', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Første pinsedag', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Andre pinsedag', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Første juledag', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Andre juledag', type: 'public', impact: 'high' },
],

DK: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nytårsdag', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Skærtorsdag', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Langfredag', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Påskedag', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Anden påskedag', type: 'public', impact: 'medium' },
  { date: '2025-05-16', name: 'Great Prayer Day', localName: 'Store Bededag', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Kristi Himmelfartsdag', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Pinsedag', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Anden Pinsedag', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Juledag', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Anden Juledag', type: 'public', impact: 'high' },
],

FI: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Uudenvuodenpäivä', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', localName: 'Loppiainen', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Pitkäperjantai', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', localName: 'Pääsiäissunnuntai', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Toinen pääsiäispäivä', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'May Day', localName: 'Vappu', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Helatorstai', type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Whit Sunday', localName: 'Helluntaipäivä', type: 'public', impact: 'high' },
  { date: '2025-06-21', name: 'Midsummer Day', localName: 'Juhannuspäivä', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', localName: 'Pyhäinpäivä', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Independence Day', localName: 'Itsenäisyyspäivä', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Joulupäivä', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Tapaninpäivä', type: 'public', impact: 'high' },
],

IS: [
  { date: '2025-01-01', name: "New Year's Day", localName: 'Nýársdagur', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', localName: 'Skírdagur', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', localName: 'Föstudagurinn langi', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', localName: 'Annar í páskum', type: 'public', impact: 'medium' },
  { date: '2025-04-24', name: 'First Day of Summer', localName: 'Sumardagurinn fyrsti', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', localName: 'Verkalýðsdagurinn', type: 'public', impact: 'high' },
  { date: '2025-05-29', name: 'Ascension Day', localName: 'Uppstigningardagur', type: 'public', impact: 'medium' },
  { date: '2025-06-09', name: 'Whit Monday', localName: 'Annar í hvítasunnu', type: 'public', impact: 'medium' },
  { date: '2025-06-17', name: 'National Day', localName: 'Lýðveldisdagurinn', type: 'public', impact: 'high' },
  { date: '2025-08-04', name: 'Commerce Day', localName: 'Frídagur verslunarmanna', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', localName: 'Jóladagur', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', localName: 'Annar í jólum', type: 'public', impact: 'high' },
],
// Southern Europe
GR: [
  { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Clean Monday', type: 'public', impact: 'medium' },
  { date: '2025-03-25', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-10-28', name: 'Ohi Day', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

PT: [
  { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
  { date: '2025-03-04', name: 'Carnival', type: 'observance', impact: 'low' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-25', name: 'Freedom Day', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-10', name: 'Portugal Day', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'medium' },
  { date: '2025-10-05', name: 'Republic Day', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints\' Day', type: 'public', impact: 'medium' },
  { date: '2025-12-01', name: 'Restoration of Independence', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
],

MT: [
  { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
  { date: '2025-02-10', name: 'Feast of Shipwreck of St. Paul', type: 'public', impact: 'medium' },
  { date: '2025-03-19', name: 'Feast of St. Joseph', type: 'public', impact: 'medium' },
  { date: '2025-03-31', name: 'Freedom Day', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-07', name: 'Sette Giugno', type: 'public', impact: 'medium' },
  { date: '2025-06-29', name: 'Feast of St. Peter and St. Paul', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-09-08', name: 'Feast of Our Lady of Victories', type: 'public', impact: 'medium' },
  { date: '2025-09-21', name: 'Independence Day', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Immaculate Conception', type: 'public', impact: 'medium' },
  { date: '2025-12-13', name: 'Republic Day', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
],

CY: [
  { date: '2025-01-01', name: 'New Year\'s Day', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Green Monday', type: 'public', impact: 'medium' },
  { date: '2025-03-25', name: 'Greek Independence Day', type: 'public', impact: 'high' },
  { date: '2025-04-01', name: 'National Day', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Pentecost Monday', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-10-01', name: 'Cyprus Independence Day', type: 'public', impact: 'high' },
  { date: '2025-10-28', name: 'Ohi Day', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],
// Eastern Europe
PL: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-03', name: 'Constitution Day', type: 'public', impact: 'high' },
  { date: '2025-06-08', name: 'Pentecost', type: 'public', impact: 'medium' },
  { date: '2025-06-19', name: 'Corpus Christi', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', type: 'public', impact: 'medium' },
  { date: '2025-11-11', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

CZ: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Liberation Day', type: 'public', impact: 'high' },
  { date: '2025-07-05', name: 'St. Cyril and Methodius Day', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Jan Hus Day', type: 'public', impact: 'medium' },
  { date: '2025-09-28', name: 'Czech Statehood Day', type: 'public', impact: 'high' },
  { date: '2025-10-28', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-11-17', name: 'Freedom Day', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

HU: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-03-15', name: 'National Day', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', type: 'public', impact: 'medium' },
  { date: '2025-08-20', name: 'St. Stephen Day', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'National Day', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

RO: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", type: 'public', impact: 'high' },
  { date: '2025-01-24', name: 'Union Day', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-01', name: "Children's Day", type: 'public', impact: 'medium' },
  { date: '2025-06-08', name: 'Pentecost', type: 'public', impact: 'high' },
  { date: '2025-06-09', name: 'Whit Monday', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-11-30', name: 'St. Andrew Day', type: 'public', impact: 'medium' },
  { date: '2025-12-01', name: 'National Day', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

BG: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-03-03', name: 'Liberation Day', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'St. George Day', type: 'public', impact: 'high' },
  { date: '2025-05-24', name: 'Cyril and Methodius Day', type: 'public', impact: 'high' },
  { date: '2025-09-06', name: 'Unification Day', type: 'public', impact: 'high' },
  { date: '2025-09-22', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-12-24', name: 'Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

SK: [
  { date: '2025-01-01', name: 'Slovak Republic Day', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-08', name: 'Liberation Day', type: 'public', impact: 'high' },
  { date: '2025-07-05', name: 'St. Cyril and Methodius Day', type: 'public', impact: 'medium' },
  { date: '2025-08-29', name: 'Slovak National Uprising Day', type: 'public', impact: 'high' },
  { date: '2025-09-01', name: 'Constitution Day', type: 'public', impact: 'high' },
  { date: '2025-09-15', name: 'Our Lady of Sorrows Day', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'All Saints Day', type: 'public', impact: 'medium' },
  { date: '2025-11-17', name: 'Freedom Day', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

HR: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Epiphany', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-19', name: 'Corpus Christi', type: 'public', impact: 'medium' },
  { date: '2025-06-22', name: 'Anti-Fascist Struggle Day', type: 'public', impact: 'high' },
  { date: '2025-06-25', name: 'Statehood Day', type: 'public', impact: 'high' },
  { date: '2025-08-05', name: 'Victory Day', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', type: 'public', impact: 'medium' },
  { date: '2025-11-18', name: 'Remembrance Day', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

SI: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", type: 'public', impact: 'high' },
  { date: '2025-02-08', name: 'Prešeren Day', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-04-27', name: 'Day of Uprising', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-02', name: 'Labour Day (Second Day)', type: 'public', impact: 'high' },
  { date: '2025-06-08', name: 'Pentecost', type: 'public', impact: 'medium' },
  { date: '2025-06-25', name: 'Statehood Day', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-10-31', name: 'Reformation Day', type: 'public', impact: 'medium' },
  { date: '2025-11-01', name: 'Remembrance Day', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Independence Day', type: 'public', impact: 'high' }
],

LT: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-02-16', name: 'Restoration of the State Day', type: 'public', impact: 'high' },
  { date: '2025-03-11', name: 'Restoration of Independence Day', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Midsummer Day', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Statehood Day', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Assumption of Mary', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints Day', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'All Souls Day', type: 'public', impact: 'medium' },
  { date: '2025-12-24', name: 'Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
],

LV: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-03-31', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-04', name: 'Independence Declaration Day', type: 'public', impact: 'high' },
  { date: '2025-06-23', name: 'Midsummer Eve', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Midsummer Day', type: 'public', impact: 'high' },
  { date: '2025-11-18', name: 'Proclamation Day', type: 'public', impact: 'high' },
  { date: '2025-12-24', name: 'Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: "New Year's Eve", type: 'public', impact: 'high' }
],

EE: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-02-24', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Spring Day', type: 'public', impact: 'high' },
  { date: '2025-06-23', name: 'Victory Day', type: 'public', impact: 'high' },
  { date: '2025-06-24', name: 'Midsummer Day', type: 'public', impact: 'high' },
  { date: '2025-08-20', name: 'Restoration of Independence Day', type: 'public', impact: 'high' },
  { date: '2025-12-24', name: 'Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
]
// CIS (Commonwealth of Independent States)
RU: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-02', name: 'New Year Holidays', type: 'public', impact: 'high' },
  { date: '2025-01-03', name: 'New Year Holidays', type: 'public', impact: 'high' },
  { date: '2025-01-04', name: 'New Year Holidays', type: 'public', impact: 'high' },
  { date: '2025-01-05', name: 'New Year Holidays', type: 'public', impact: 'high' },
  { date: '2025-01-06', name: 'Orthodox Christmas Eve', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', type: 'public', impact: 'high' },
  { date: '2025-02-23', name: 'Defender of the Fatherland Day', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "International Women's Day", type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Spring and Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', type: 'public', impact: 'high' },
  { date: '2025-06-12', name: 'Russia Day', type: 'public', impact: 'high' },
  { date: '2025-11-04', name: 'National Unity Day', type: 'public', impact: 'high' }
],

UA: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "International Women's Day", type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Easter Sunday', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', type: 'public', impact: 'high' },
  { date: '2025-06-08', name: 'Trinity Sunday', type: 'public', impact: 'high' },
  { date: '2025-06-28', name: 'Constitution Day', type: 'public', impact: 'high' },
  { date: '2025-08-24', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-10-14', name: 'Defenders Day', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
],

BY: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "Women's Day", type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Orthodox Easter', type: 'public', impact: 'high' },
  { date: '2025-04-29', name: 'Radunica', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', type: 'public', impact: 'high' },
  { date: '2025-07-03', name: 'Independence Day', type: 'public', impact: 'high' },
  { date: '2025-11-07', name: 'October Revolution Day', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Catholic Christmas', type: 'public', impact: 'high' }
],

KZ: [
  { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
  { date: '2025-01-02', name: "New Year's Day (Second Day)", type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Orthodox Christmas', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: "International Women's Day", type: 'public', impact: 'high' },
  { date: '2025-03-21', name: 'Nauryz', type: 'public', impact: 'high' },
  { date: '2025-03-22', name: 'Nauryz (Second Day)', type: 'public', impact: 'high' },
  { date: '2025-03-23', name: 'Nauryz (Third Day)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Unity Day', type: 'public', impact: 'high' },
  { date: '2025-05-07', name: 'Defender of the Fatherland Day', type: 'public', impact: 'high' },
  { date: '2025-05-09', name: 'Victory Day', type: 'public', impact: 'high' },
  { date: '2025-06-01', name: 'Eid al-Fitr', type: 'public', impact: 'high' },
  { date: '2025-07-06', name: 'Capital Day', type: 'public', impact: 'high' },
  { date: '2025-08-30', name: 'Constitution Day', type: 'public', impact: 'high' },
  { date: '2025-10-25', name: 'Republic Day', type: 'public', impact: 'high' },
  { date: '2025-12-16', name: 'Independence Day', type: 'public', impact: 'high' }
],
  
// East Asia
JP: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameLocal: '元日', type: 'public', impact: 'high' },
  { date: '2025-01-13', name: 'Coming of Age Day', nameLocal: '成人の日', type: 'public', impact: 'medium' },
  { date: '2025-02-11', name: 'National Foundation Day', nameLocal: '建国記念の日', type: 'public', impact: 'medium' },
  { date: '2025-03-20', name: 'Spring Equinox', nameLocal: '春分の日', type: 'public', impact: 'medium' },
  { date: '2025-04-29', name: 'Showa Day', nameLocal: '昭和の日', type: 'public', impact: 'medium' },
  { date: '2025-05-03', name: 'Constitution Memorial Day', nameLocal: '憲法記念日', type: 'public', impact: 'high' },
  { date: '2025-05-04', name: 'Greenery Day', nameLocal: 'みどりの日', type: 'public', impact: 'medium' },
  { date: '2025-05-05', name: 'Children\'s Day', nameLocal: 'こどもの日', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Substitute Holiday', nameLocal: '振替休日', type: 'public', impact: 'high' },
  { date: '2025-07-21', name: 'Marine Day', nameLocal: '海の日', type: 'public', impact: 'medium' },
  { date: '2025-08-11', name: 'Mountain Day', nameLocal: '山の日', type: 'public', impact: 'medium' },
  { date: '2025-09-15', name: 'Respect for the Aged Day', nameLocal: '敬老の日', type: 'public', impact: 'medium' },
  { date: '2025-09-23', name: 'Autumn Equinox', nameLocal: '秋分の日', type: 'public', impact: 'medium' },
  { date: '2025-10-13', name: 'Sports Day', nameLocal: 'スポーツの日', type: 'public', impact: 'medium' },
  { date: '2025-11-03', name: 'Culture Day', nameLocal: '文化の日', type: 'public', impact: 'medium' },
  { date: '2025-11-23', name: 'Labor Thanksgiving Day', nameLocal: '勤労感謝の日', type: 'public', impact: 'medium' },
  { date: '2025-11-24', name: 'Substitute Holiday', nameLocal: '振替休日', type: 'public', impact: 'medium' },
  { date: '2025-12-23', name: 'Emperor\'s Birthday', nameLocal: '天皇誕生日', type: 'public', impact: 'medium' }
],

KR: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameLocal: '신정', nameChinese: '新正', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: 'Lunar New Year', nameLocal: '설날', nameChinese: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Lunar New Year', nameLocal: '설날', nameChinese: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Lunar New Year', nameLocal: '설날', nameChinese: '春节', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Independence Movement Day', nameLocal: '삼일절', nameChinese: '三一节', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Children\'s Day', nameLocal: '어린이날', nameChinese: '儿童节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Buddha\'s Birthday (Substitute Holiday)', nameLocal: '석가탄신일 대체공휴일', nameChinese: '佛诞节替代假日', type: 'public', impact: 'medium' },
  { date: '2025-06-06', name: 'Memorial Day', nameLocal: '현충일', nameChinese: '显忠日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Liberation Day', nameLocal: '광복절', nameChinese: '光复节', type: 'public', impact: 'high' },
  { date: '2025-10-03', name: 'National Foundation Day', nameLocal: '개천절', nameChinese: '开天节', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'Hangeul Day', nameLocal: '한글날', nameChinese: '韩文日', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'Mid-Autumn Festival', nameLocal: '추석', nameChinese: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-14', name: 'Mid-Autumn Festival', nameLocal: '추석', nameChinese: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-15', name: 'Mid-Autumn Festival', nameLocal: '추석', nameChinese: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', nameLocal: '성탄절', nameChinese: '圣诞节', type: 'public', impact: 'high' }
],

HK: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameLocal: 'New Year\'s Day', nameChinese: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Lunar New Year\'s Day', nameLocal: 'Lunar New Year\'s Day', nameChinese: '农历新年', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Second Day of Lunar New Year', nameLocal: 'The second day of Lunar New Year', nameChinese: '农历年初二', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Third Day of Lunar New Year', nameLocal: 'The third day of Lunar New Year', nameChinese: '农历年初三', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Ching Ming Festival', nameLocal: 'Ching Ming Festival', nameChinese: '清明节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', nameLocal: 'Good Friday', nameChinese: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', nameLocal: 'Easter Saturday', nameChinese: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', nameLocal: 'Easter Monday', nameChinese: '复活节翌日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', nameLocal: 'Labour Day', nameChinese: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Buddha\'s Birthday', nameLocal: 'Buddha\'s Birthday', nameChinese: '佛诞节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Dragon Boat Festival', nameLocal: 'Tuen Ng Festival', nameChinese: '端午节', type: 'public', impact: 'medium' },
  { date: '2025-07-01', name: 'HKSAR Establishment Day', nameLocal: 'Hong Kong Special Administrative Region Establishment Day', nameChinese: '香港特别行政区成立纪念日', type: 'public', impact: 'high' },
  { date: '2025-09-08', name: 'Day after Mid-Autumn Festival', nameLocal: 'The day following the Mid-Autumn Festival', nameChinese: '中秋节翌日', type: 'public', impact: 'medium' },
  { date: '2025-10-01', name: 'National Day', nameLocal: 'National Day', nameChinese: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-10-02', name: 'Chung Yeung Festival', nameLocal: 'Chung Yeung Festival', nameChinese: '重阳节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameLocal: 'Christmas Day', nameChinese: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-26', name: 'Boxing Day', nameLocal: 'Boxing Day', nameChinese: '节礼日', type: 'public', impact: 'high' }
],

TW: [
  { date: '2025-01-01', name: 'Republic of China Founding Day', nameLocal: '中華民國開國紀念日', nameChinese: '中华民国开国纪念日', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: 'Lunar New Year\'s Eve', nameLocal: '農曆除夕', nameChinese: '农历除夕', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Lunar New Year', nameLocal: '春節', nameChinese: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Lunar New Year', nameLocal: '春節', nameChinese: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Lunar New Year', nameLocal: '春節', nameChinese: '春节', type: 'public', impact: 'high' },
  { date: '2025-02-28', name: 'Peace Memorial Day', nameLocal: '和平紀念日', nameChinese: '和平纪念日', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Children\'s Day', nameLocal: '兒童節', nameChinese: '儿童节', type: 'public', impact: 'medium' },
  { date: '2025-04-05', name: 'Tomb Sweeping Day', nameLocal: '清明節', nameChinese: '清明节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Dragon Boat Festival', nameLocal: '端午節', nameChinese: '端午节', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Mid-Autumn Festival', nameLocal: '中秋節', nameChinese: '中秋节', type: 'public', impact: 'high' },
  { date: '2025-10-10', name: 'National Day', nameLocal: '國慶日', nameChinese: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'Republic of China Founding Day (Substitute)', nameLocal: '中華民國開國紀念日 (補假)', nameChinese: '中华民国开国纪念日 (补假)', type: 'public', impact: 'high' }
],

MO: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameLocal: '元旦', nameChinese: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'First Day of Lunar New Year', nameLocal: '農曆正月初一', nameChinese: '农历正月初一', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Second Day of Lunar New Year', nameLocal: '農曆正月初二', nameChinese: '农历正月初二', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Third Day of Lunar New Year', nameLocal: '農曆正月初三', nameChinese: '农历正月初三', type: 'public', impact: 'high' },
  { date: '2025-04-04', name: 'Ching Ming Festival', nameLocal: '清明節', nameChinese: '清明节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', nameLocal: '耶穌受難日', nameChinese: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-19', name: 'Easter Saturday', nameLocal: '復活節前日', nameChinese: '复活节前日', type: 'public', impact: 'medium' },
  { date: '2025-04-21', name: 'Easter Monday', nameLocal: '復活節翌日', nameChinese: '复活节翌日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'Labour Day', nameLocal: '勞動節', nameChinese: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-06', name: 'Buddha\'s Birthday', nameLocal: '佛誕節', nameChinese: '佛诞节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Dragon Boat Festival', nameLocal: '端午節', nameChinese: '端午节', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Day after Mid-Autumn Festival', nameLocal: '中秋節翌日', nameChinese: '中秋节翌日', type: 'public', impact: 'medium' },
  { date: '2025-10-01', name: 'National Day of PRC', nameLocal: '中華人民共和國國慶日', nameChinese: '中华人民共和国国庆日', type: 'public', impact: 'high' },
  { date: '2025-10-02', name: 'Day after National Day of PRC', nameLocal: '中華人民共和國國慶日翌日', nameChinese: '中华人民共和国国庆日翌日', type: 'public', impact: 'high' },
  { date: '2025-10-03', name: 'Chung Yeung Festival', nameLocal: '重陽節', nameChinese: '重阳节', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'All Souls\' Day (Substitute)', nameLocal: '追思節 (補假)', nameChinese: '追思节 (补假)', type: 'public', impact: 'medium' },
  { date: '2025-12-08', name: 'Feast of Immaculate Conception', nameLocal: '聖母無原罪瞻禮', nameChinese: '圣母无原罪瞻礼', type: 'public', impact: 'medium' },
  { date: '2025-12-20', name: 'Macao SAR Establishment Day', nameLocal: '澳門特別行政區成立紀念日', nameChinese: '澳门特别行政区成立纪念日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', nameLocal: '聖誕節', nameChinese: '圣诞节', type: 'public', impact: 'high' }
],
// Southeast Asia
// Singapore 新加坡
SG: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Chinese New Year (2nd Day)', nameCN: '春节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Vesak Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Hari Raya Haji', nameCN: '哈芝节', type: 'public', impact: 'medium' },
  { date: '2025-08-09', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Deepavali', nameCN: '屠妖节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Malaysia 马来西亚
MY: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Chinese New Year (2nd Day)', nameCN: '春节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-02-09', name: 'Thaipusam', nameCN: '大宝森节', type: 'public', impact: 'medium' },
  { date: '2025-03-03', name: 'Isra and Mi\'raj', nameCN: '夜行登霄节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Hari Raya Aidilfitri', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Hari Raya Aidilfitri (2nd Day)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Wesak Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-06-02', name: 'Yang di-Pertuan Agong\'s Birthday', nameCN: '最高元首诞辰', type: 'public', impact: 'high' },
  { date: '2025-07-28', name: 'Hari Raya Aidiladha', nameCN: '哈芝节', type: 'public', impact: 'medium' },
  { date: '2025-08-31', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-09-16', name: 'Malaysia Day', nameCN: '马来西亚日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Deepavali', nameCN: '屠妖节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Thailand 泰国
TH: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-12', name: 'Makha Bucha Day', nameCN: '万佛节', type: 'public', impact: 'medium' },
  { date: '2025-04-06', name: 'Chakri Day', nameCN: '却克里王朝纪念日', type: 'public', impact: 'medium' },
  { date: '2025-04-07', name: 'Chakri Day (Observed)', nameCN: '却克里王朝纪念日 (补假)', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Songkran Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Songkran Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Songkran Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-04', name: 'Coronation Day', nameCN: '加冕节', type: 'public', impact: 'high' },
  { date: '2025-05-05', name: 'Coronation Day (Observed)', nameCN: '加冕节 (补假)', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Visakha Bucha Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-06-03', name: 'Queen\'s Birthday', nameCN: '王后诞辰', type: 'public', impact: 'high' },
  { date: '2025-07-20', name: 'Asalha Bucha Day', nameCN: '三宝节', type: 'public', impact: 'medium' },
  { date: '2025-07-21', name: 'Buddhist Lent Day', nameCN: '入雨节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'King\'s Birthday', nameCN: '国王诞辰', type: 'public', impact: 'high' },
  { date: '2025-08-12', name: 'Queen Mother\'s Birthday', nameCN: '王太后诞辰', type: 'public', impact: 'high' },
  { date: '2025-10-13', name: 'King Bhumibol Memorial Day', nameCN: '普密蓬国王纪念日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Chulalongkorn Day', nameCN: '五世王纪念日', type: 'public', impact: 'high' },
  { date: '2025-12-05', name: 'King Bhumibol\'s Birthday', nameCN: '普密蓬国王诞辰', type: 'public', impact: 'high' },
  { date: '2025-12-10', name: 'Constitution Day', nameCN: '宪法日', type: 'public', impact: 'medium' },
  { date: '2025-12-31', name: 'New Year\'s Eve', nameCN: '除夕', type: 'public', impact: 'high' }
],

// Indonesia 印度尼西亚
ID: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Isra and Mi\'raj', nameCN: '夜行登霄节', type: 'public', impact: 'medium' },
  { date: '2025-03-29', name: 'Nyepi (Balinese New Year)', nameCN: '安宁日 (巴厘岛新年)', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr Holiday', nameCN: '开斋节假期', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr Holiday', nameCN: '开斋节假期', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Vesak Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Ascension Day', nameCN: '耶稣升天节', type: 'public', impact: 'medium' },
  { date: '2025-06-01', name: 'Pancasila Day', nameCN: '建国五原则日', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Eid al-Adha', nameCN: '宰牲节', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Islamic New Year', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-08-17', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Philippines 菲律宾
PH: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-02-25', name: 'People Power Anniversary', nameCN: '人民力量革命纪念日', type: 'observance', impact: 'medium' },
  { date: '2025-04-09', name: 'Araw ng Kagitingan', nameCN: '英勇日', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Maundy Thursday', nameCN: '濯足节', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-12', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-08-21', name: 'Ninoy Aquino Day', nameCN: '尼诺·阿基诺日', type: 'public', impact: 'medium' },
  { date: '2025-08-25', name: 'National Heroes Day', nameCN: '国家英雄日', type: 'public', impact: 'high' },
  { date: '2025-11-01', name: 'All Saints\' Day', nameCN: '万圣节', type: 'public', impact: 'medium' },
  { date: '2025-11-02', name: 'All Souls\' Day', nameCN: '万灵节', type: 'observance', impact: 'low' },
  { date: '2025-11-30', name: 'Bonifacio Day', nameCN: '博尼法西奥日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' },
  { date: '2025-12-30', name: 'Rizal Day', nameCN: '黎刹日', type: 'public', impact: 'high' },
  { date: '2025-12-31', name: 'New Year\'s Eve', nameCN: '除夕', type: 'public', impact: 'high' }
],

// Vietnam 越南
VN: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-28', name: 'Tet Holiday', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Tet Holiday', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-01-30', name: 'Tet Holiday', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-01-31', name: 'Tet Holiday', nameCN: '春节假期', type: 'public', impact: 'high' },
  { date: '2025-04-30', name: 'Reunification Day', nameCN: '统一日', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-09-02', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// Myanmar 缅甸
MM: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-04', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-02-12', name: 'Union Day', nameCN: '联邦日', type: 'public', impact: 'medium' },
  { date: '2025-03-02', name: 'Peasants\' Day', nameCN: '农民节', type: 'public', impact: 'medium' },
  { date: '2025-03-27', name: 'Armed Forces Day', nameCN: '建军节', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Thingyan Water Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Thingyan Water Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Thingyan Water Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-16', name: 'Thingyan Water Festival', nameCN: '泼水节', type: 'public', impact: 'high' },
  { date: '2025-04-17', name: 'Myanmar New Year', nameCN: '缅甸新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Full Moon Day of Kason', nameCN: '卡松月圆日', type: 'public', impact: 'medium' },
  { date: '2025-07-19', name: 'Martyrs\' Day', nameCN: '烈士节', type: 'public', impact: 'high' },
  { date: '2025-08-10', name: 'Full Moon Day of Waso', nameCN: '瓦索月圆日', type: 'public', impact: 'medium' },
  { date: '2025-10-09', name: 'Full Moon Day of Thadingyut', nameCN: '达丁玉月圆日', type: 'public', impact: 'medium' },
  { date: '2025-11-07', name: 'Full Moon Day of Tazaungmone', nameCN: '达桑芒月圆日', type: 'public', impact: 'medium' },
  { date: '2025-11-17', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Cambodia 柬埔寨
KH: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-07', name: 'Victory Day', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: 'International Women\'s Day', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Khmer New Year', nameCN: '高棉新年', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Khmer New Year', nameCN: '高棉新年', type: 'public', impact: 'high' },
  { date: '2025-04-16', name: 'Khmer New Year', nameCN: '高棉新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Vesak Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-05-14', name: 'King\'s Birthday', nameCN: '国王诞辰', type: 'public', impact: 'high' },
  { date: '2025-05-20', name: 'Day of Remembrance', nameCN: '追思日', type: 'public', impact: 'medium' },
  { date: '2025-06-01', name: 'International Children\'s Day', nameCN: '国际儿童节', type: 'public', impact: 'medium' },
  { date: '2025-06-18', name: 'Queen Mother\'s Birthday', nameCN: '王太后诞辰', type: 'public', impact: 'high' },
  { date: '2025-09-24', name: 'Constitution Day', nameCN: '宪法日', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'Pchum Ben Festival', nameCN: '亡人节', type: 'public', impact: 'high' },
  { date: '2025-10-10', name: 'Pchum Ben Festival', nameCN: '亡人节', type: 'public', impact: 'high' },
  { date: '2025-10-11', name: 'Pchum Ben Festival', nameCN: '亡人节', type: 'public', impact: 'high' },
  { date: '2025-10-15', name: 'King Sihanouk Memorial Day', nameCN: '西哈努克国王纪念日', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Paris Peace Agreement Day', nameCN: '巴黎和平协定日', type: 'public', impact: 'medium' },
  { date: '2025-10-29', name: 'Coronation Day', nameCN: '加冕日', type: 'public', impact: 'high' },
  { date: '2025-11-07', name: 'Water Festival', nameCN: '送水节', type: 'public', impact: 'high' },
  { date: '2025-11-08', name: 'Water Festival', nameCN: '送水节', type: 'public', impact: 'high' },
  { date: '2025-11-09', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' }
],

// Laos 老挝
LA: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-03-08', name: 'International Women\'s Day', nameCN: '国际妇女节', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Lao New Year (Pi Mai)', nameCN: '老挝新年', type: 'public', impact: 'high' },
  { date: '2025-04-15', name: 'Lao New Year (Pi Mai)', nameCN: '老挝新年', type: 'public', impact: 'high' },
  { date: '2025-04-16', name: 'Lao New Year (Pi Mai)', nameCN: '老挝新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Vesak Day', nameCN: '卫塞节', type: 'public', impact: 'medium' },
  { date: '2025-06-01', name: 'Children\'s Day', nameCN: '儿童节', type: 'public', impact: 'medium' },
  { date: '2025-07-28', name: 'Asalha Bucha Day', nameCN: '三宝节', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'That Luang Festival', nameCN: '塔銮节', type: 'public', impact: 'high' },
  { date: '2025-10-09', name: 'End of Buddhist Lent', nameCN: '佛教斋戒结束日', type: 'public', impact: 'medium' },
  { date: '2025-10-10', name: 'Boat Racing Festival', nameCN: '龙舟节', type: 'public', impact: 'medium' },
  { date: '2025-12-02', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' }
],

// Brunei 文莱
BN: [
  { date: '2025-01-01', name: 'New Year\'s Day', nameCN: '元旦', type: 'public', impact: 'high' },
  { date: '2025-01-29', name: 'Chinese New Year', nameCN: '春节', type: 'public', impact: 'high' },
  { date: '2025-02-08', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-03-01', name: 'Isra and Mi\'raj', nameCN: '夜行登霄节', type: 'public', impact: 'medium' },
  { date: '2025-04-20', name: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (2nd Day)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (3rd Day)', nameCN: '开斋节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-05-31', name: 'Armed Forces Day', nameCN: '建军节', type: 'public', impact: 'medium' },
  { date: '2025-06-15', name: 'Eid al-Adha', nameCN: '宰牲节', type: 'public', impact: 'medium' },
  { date: '2025-07-06', name: 'Islamic New Year', nameCN: '伊斯兰新年', type: 'public', impact: 'medium' },
  { date: '2025-07-15', name: 'Sultan\'s Birthday', nameCN: '苏丹诞辰', type: 'public', impact: 'high' },
  { date: '2025-08-01', name: 'Isra and Mi\'raj (Observed)', nameCN: '夜行登霄节 (补假)', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
]
// South Asia 南亚

// India 印度
IN: [
  { date: '2025-01-26', name: 'Republic Day', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-03-14', name: 'Holi', nameCN: '洒红节', type: 'public', impact: 'medium' },
  { date: '2025-04-04', name: 'Mahavir Jayanti', nameCN: '马哈维尔诞辰', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Ram Navami', nameCN: '罗摩诞辰节', type: 'public', impact: 'medium' },
  { date: '2025-04-18', name: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Buddha Purnima', nameCN: '佛陀诞辰', type: 'public', impact: 'medium' },
  { date: '2025-08-15', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', nameCN: '甘地诞辰', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Diwali', nameCN: '排灯节', type: 'public', impact: 'high' },
  { date: '2025-11-02', name: 'Guru Nanak Jayanti', nameCN: '古鲁那纳克诞辰', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Pakistan 巴基斯坦
PK: [
  { date: '2025-02-05', name: 'Kashmir Day', nameCN: '克什米尔日', type: 'public', impact: 'medium' },
  { date: '2025-03-23', name: 'Pakistan Day', nameCN: '巴基斯坦日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', nameCN: '开斋节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Eid al-Adha', nameCN: '宰牲节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha (Day 2)', nameCN: '宰牲节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 3)', nameCN: '宰牲节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-07-16', name: 'Ashura', nameCN: '阿舒拉节', type: 'public', impact: 'medium' },
  { date: '2025-07-17', name: 'Ashura (Day 2)', nameCN: '阿舒拉节 (第二天)', type: 'public', impact: 'medium' },
  { date: '2025-08-14', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-09-14', name: 'Eid Milad-un-Nabi', nameCN: '先知诞辰', type: 'public', impact: 'medium' },
  { date: '2025-11-09', name: 'Iqbal Day', nameCN: '伊克巴尔日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Quaid-e-Azam Day / Christmas', nameCN: '国父节 / 圣诞节', type: 'public', impact: 'high' }
],

// Bangladesh 孟加拉国
BD: [
  { date: '2025-02-21', name: 'Shaheed Day and International Mother Language Day', nameCN: '烈士日暨国际母语日', type: 'public', impact: 'high' },
  { date: '2025-03-17', name: 'Bangabandhu\'s Birthday', nameCN: '国父谢赫·穆吉布诞辰', type: 'public', impact: 'high' },
  { date: '2025-03-26', name: 'Independence Day', nameCN: '独立日', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Bengali New Year', nameCN: '孟加拉新年', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Eid al-Fitr', nameCN: '开斋节', type: 'public', impact: 'high' },
  { date: '2025-04-21', name: 'Eid al-Fitr (Day 2)', nameCN: '开斋节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-04-22', name: 'Eid al-Fitr (Day 3)', nameCN: '开斋节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'May Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-06-16', name: 'Eid al-Adha', nameCN: '宰牲节', type: 'public', impact: 'high' },
  { date: '2025-06-17', name: 'Eid al-Adha (Day 2)', nameCN: '宰牲节 (第二天)', type: 'public', impact: 'high' },
  { date: '2025-06-18', name: 'Eid al-Adha (Day 3)', nameCN: '宰牲节 (第三天)', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'National Mourning Day', nameCN: '国家哀悼日', type: 'public', impact: 'high' },
  { date: '2025-09-14', name: 'Eid-e-Milad-un-Nabi', nameCN: '先知诞辰', type: 'public', impact: 'medium' },
  { date: '2025-10-06', name: 'Durga Puja (Bijoya Dashami)', nameCN: '难近母节 (胜利十日)', type: 'public', impact: 'medium' },
  { date: '2025-12-16', name: 'Victory Day', nameCN: '胜利日', type: 'public', impact: 'high' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Sri Lanka 斯里兰卡
LK: [
  { date: '2025-01-15', name: 'Tamil Thai Pongal Day', nameCN: '泰米尔泰节', type: 'public', impact: 'medium' },
  { date: '2025-02-04', name: 'National Day', nameCN: '国庆日', type: 'public', impact: 'high' },
  { date: '2025-02-12', name: 'Navam Full Moon Poya Day', nameCN: '纳瓦姆满月日', type: 'public', impact: 'medium' },
  { date: '2025-03-14', name: 'Maha Shivaratri', nameCN: '湿婆神节', type: 'public', impact: 'medium' },
  { date: '2025-03-14', name: 'Medin Full Moon Poya Day', nameCN: '麦丁满月日', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Day prior to Sinhala & Tamil New Year', nameCN: '僧伽罗泰米尔新年前夕', type: 'public', impact: 'high' },
  { date: '2025-04-14', name: 'Sinhala & Tamil New Year', nameCN: '僧伽罗泰米尔新年', type: 'public', impact: 'high' },
  { date: '2025-04-18', name: 'Good Friday', nameCN: '耶稣受难日', type: 'public', impact: 'high' },
  { date: '2025-04-20', name: 'Bak Full Moon Poya Day', nameCN: '巴克满月日', type: 'public', impact: 'medium' },
  { date: '2025-05-01', name: 'May Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Vesak Full Moon Poya Day', nameCN: '卫塞满月日', type: 'public', impact: 'high' },
  { date: '2025-05-13', name: 'Day following Vesak Full Moon Poya Day', nameCN: '卫塞满月日翌日', type: 'public', impact: 'medium' },
  { date: '2025-06-11', name: 'Poson Full Moon Poya Day', nameCN: '波桑满月日', type: 'public', impact: 'medium' },
  { date: '2025-07-10', name: 'Esala Full Moon Poya Day', nameCN: '埃萨拉满月日', type: 'public', impact: 'medium' },
  { date: '2025-08-09', name: 'Nikini Full Moon Poya Day', nameCN: '尼基尼满月日', type: 'public', impact: 'medium' },
  { date: '2025-09-08', name: 'Binara Full Moon Poya Day', nameCN: '宾纳拉满月日', type: 'public', impact: 'medium' },
  { date: '2025-10-08', name: 'Vap Full Moon Poya Day', nameCN: '瓦普满月日', type: 'public', impact: 'medium' },
  { date: '2025-11-06', name: 'Il Full Moon Poya Day', nameCN: '伊尔满月日', type: 'public', impact: 'medium' },
  { date: '2025-12-06', name: 'Unduvap Full Moon Poya Day', nameCN: '乌杜瓦普满月日', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
],

// Nepal 尼泊尔
NP: [
  { date: '2025-01-14', name: 'Maghe Sankranti', nameCN: '摩伽节', type: 'public', impact: 'medium' },
  { date: '2025-02-19', name: 'Prajaatantra Diwas (Democracy Day)', nameCN: '民主日', type: 'public', impact: 'medium' },
  { date: '2025-03-01', name: 'Maha Shivaratri', nameCN: '湿婆神节', type: 'public', impact: 'medium' },
  { date: '2025-03-08', name: 'International Women\'s Day', nameCN: '国际妇女节', type: 'public', impact: 'medium' },
  { date: '2025-03-22', name: 'Fagu Purnima (Holi)', nameCN: '洒红节', type: 'public', impact: 'medium' },
  { date: '2025-04-13', name: 'Nepali New Year', nameCN: '尼泊尔新年', type: 'public', impact: 'high' },
  { date: '2025-05-01', name: 'Labour Day', nameCN: '劳动节', type: 'public', impact: 'high' },
  { date: '2025-05-12', name: 'Buddha Jayanti', nameCN: '佛陀诞辰', type: 'public', impact: 'medium' },
  { date: '2025-05-29', name: 'Republic Day', nameCN: '共和国日', type: 'public', impact: 'high' },
  { date: '2025-08-15', name: 'Krishna Janmashtami', nameCN: '克利须那诞辰', type: 'public', impact: 'medium' },
  { date: '2025-10-02', name: 'Ghatasthapana', nameCN: '德赛节开始', type: 'public', impact: 'medium' },
  { date: '2025-10-09', name: 'Dashain (Bijaya Dashami)', nameCN: '德赛节 (胜利十日)', type: 'public', impact: 'high' },
  { date: '2025-10-23', name: 'Tihar (Laxmi Puja)', nameCN: '提哈尔节 (财富女神节)', type: 'public', impact: 'high' },
  { date: '2025-10-24', name: 'Tihar (Govardhan Puja)', nameCN: '提哈尔节 (戈瓦尔丹节)', type: 'public', impact: 'high' },
  { date: '2025-10-26', name: 'Chhath Puja', nameCN: '恰特节', type: 'public', impact: 'medium' },
  { date: '2025-12-25', name: 'Christmas Day', nameCN: '圣诞节', type: 'public', impact: 'high' }
]
// Middle East

// AE 阿联酋 United Arab Emirates
AE: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-04-21, name: Eid al-Fitr (Day 2), nameCN: 开斋节（第二天）, type: public, impact: high },
  { date: 2025-04-22, name: Eid al-Fitr (Day 3), nameCN: 开斋节（第三天）, type: public, impact: high },
  { date: 2025-06-16, name: Arafat Day, nameCN: 阿拉法特日, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-06-18, name: Eid al-Adha (Day 2), nameCN: 古尔邦节（第二天）, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year (Al Hijra), nameCN: 伊斯兰新年, type: public, impact: medium },
  { date: 2025-09-15, name: Prophet Muhammad's Birthday, nameCN: 先知穆罕默德诞辰, type: public, impact: medium },
  { date: 2025-12-02, name: National Day, nameCN: 国庆日, type: public, impact: high },
  { date: 2025-12-03, name: National Day (Day 2), nameCN: 国庆日（第二天）, type: public, impact: high }
],

// BH 巴林 Bahrain
BH: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-04-21, name: Eid al-Fitr (Day 2), nameCN: 开斋节（第二天）, type: public, impact: high },
  { date: 2025-06-16, name: Arafat Day, nameCN: 阿拉法特日, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-06-18, name: Eid al-Adha (Day 2), nameCN: 古尔邦节（第二天）, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year, nameCN: 伊斯兰新年, type: public, impact: medium },
  { date: 2025-09-15, name: Prophet Muhammad's Birthday, nameCN: 穆罕默德诞辰, type: public, impact: medium },
  { date: 2025-12-16, name: National Day, nameCN: 国庆日, type: public, impact: high },
  { date: 2025-12-17, name: National Day (Day 2), nameCN: 国庆日（第二天）, type: public, impact: high }
],

// EG 埃及 Egypt
EG: [
  { date: 2025-01-07, name: Coptic Christmas Day, nameCN: 科普特圣诞节, type: public, impact: medium },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-04-25, name: Sinai Liberation Day, nameCN: 西奈解放日, type: public, impact: medium },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year, nameCN: 伊斯兰新年, type: public, impact: medium },
  { date: 2025-07-23, name: Revolution Day, nameCN: 革命日, type: public, impact: medium },
  { date: 2025-10-06, name: Armed Forces Day, nameCN: 武装部队日, type: public, impact: medium }
],

// IL 以色列 Israel
IL: [
  { date: 2025-04-13, name: Passover (Pesach), nameCN: 逾越节, type: public, impact: high },
  { date: 2025-04-21, name: Passover Holiday Ends, nameCN: 逾越节结束, type: public, impact: medium },
  { date: 2025-05-01, name: Holocaust Remembrance Day, nameCN: 大屠杀纪念日, type: observance, impact: low },
  { date: 2025-05-06, name: Israeli Independence Day, nameCN: 以色列独立日, type: public, impact: high },
  { date: 2025-06-02, name: Shavuot, nameCN: 七七节, type: public, impact: high },
  { date: 2025-10-03, name: Rosh Hashanah, nameCN: 犹太新年, type: public, impact: high },
  { date: 2025-10-12, name: Yom Kippur, nameCN: 赎罪日, type: public, impact: high },
  { date: 2025-10-17, name: Sukkot, nameCN: 住棚节, type: public, impact: high }
],

// IQ 伊拉克 Iraq
IQ: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-03-21, name: Nowruz (Kurdish New Year), nameCN: 库尔德新年, type: public, impact: medium },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year, nameCN: 伊斯兰新年, type: public, impact: medium },
  { date: 2025-10-03, name: Iraqi Independence Day, nameCN: 独立日, type: public, impact: high }
],

// IR 伊朗 Iran
IR: [
  { date: 2025-03-20, name: Nowruz, nameCN: 波斯新年, type: public, impact: high },
  { date: 2025-03-21, name: Nowruz Holiday, nameCN: 新年假期, type: public, impact: high },
  { date: 2025-03-22, name: Nowruz Holiday, nameCN: 新年假期, type: public, impact: high },
  { date: 2025-03-23, name: Nowruz Holiday, nameCN: 新年假期, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year, nameCN: 伊斯兰新年, type: public, impact: medium }
],

// JO 约旦 Jordan
JO: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year, nameCN: 伊斯兰新年, type: public, impact: medium },
  { date: 2025-05-25, name: Independence Day, nameCN: 独立日, type: public, impact: high }
],

// KW 科威特 Kuwait
KW: [
  { date: 2025-02-25, name: National Day, nameCN: 国庆日, type: public, impact: high },
  { date: 2025-02-26, name: Liberation Day, nameCN: 解放日, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high }
],

// LB 黎巴嫩 Lebanon
LB: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-07-07, name: Islamic New Year, nameCN: 伊斯兰新年, type: public, impact: medium },
  { date: 2025-11-22, name: Independence Day, nameCN: 独立日, type: public, impact: high }
],

// OM 阿曼 Oman
OM: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-11-18, name: National Day, nameCN: 国庆日, type: public, impact: high }
],

// QA 卡塔尔 Qatar
QA: [
  { date: 2025-01-01, name: New Year's Day, nameCN: 元旦, type: public, impact: high },
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-12-18, name: National Day, nameCN: 国庆日, type: public, impact: high }
],

// SA 沙特阿拉伯 Saudi Arabia
SA: [
  { date: 2025-04-20, name: Eid al-Fitr, nameCN: 开斋节, type: public, impact: high },
  { date: 2025-04-21, name: Eid al-Fitr (Day 2), nameCN: 开斋节（第二天）, type: public, impact: high },
  { date: 2025-04-22, name: Eid al-Fitr (Day 3), nameCN: 开斋节（第三天）, type: public, impact: high },
  { date: 2025-04-23, name: Eid al-Fitr (Day 4), nameCN: 开斋节（第四天）, type: public, impact: high },
  { date: 2025-06-16, name: Arafat Day, nameCN: 阿拉法特日, type: public, impact: high },
  { date: 2025-06-17, name: Eid al-Adha, nameCN: 古尔邦节, type: public, impact: high },
  { date: 2025-06-18, name: Eid al-Adha (Day 2), nameCN: 古尔邦节（第二天）, type: public, impact: high },
  { date: 2025-06-19, name: Eid al-Adha (Day 3), nameCN: 古尔邦节（第三天）, type: public, impact: high },
  { date: 2025-09-23, name: National Day, nameCN: 国庆日, type: public, impact: high }
],

// TR 土耳其 Turkey
TR: [
  { date: 2025-04-23, name: National Sovereignty and Children's Day, nameCN: 国民主权与儿童节, type: public, impact: high },
  { date: 2025-05-01, name: Labour and Solidarity Day, nameCN: 劳动节, type: public, impact: high },
  { date: 2025-05-19, name: Commemoration of Atatürk, Youth and Sports Day, nameCN: 阿塔图尔克纪念日暨青年与体育日, type: public, impact: high },
  { date: 2025-07-15, name: Democracy and National Unity Day, nameCN: 民主团结日, type: public, impact: medium },
  { date: 2025-08-30, name: Victory Day, nameCN: 胜利日, type: public, impact: high },
  { date: 2025-10-29, name: Republic Day, nameCN: 共和国日, type: public, impact: high }
]

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
