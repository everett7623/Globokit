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
  
  // 欧洲
  UK: { name: '英国', flag: '🇬🇧', timezone: 'UTC+0', currency: 'GBP', region: '欧洲' },
  DE: { name: '德国', flag: '🇩🇪', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  FR: { name: '法国', flag: '🇫🇷', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  IT: { name: '意大利', flag: '🇮🇹', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  ES: { name: '西班牙', flag: '🇪🇸', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  NL: { name: '荷兰', flag: '🇳🇱', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  BE: { name: '比利时', flag: '🇧🇪', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  CH: { name: '瑞士', flag: '🇨🇭', timezone: 'UTC+1', currency: 'CHF', region: '欧洲' },
  SE: { name: '瑞典', flag: '🇸🇪', timezone: 'UTC+1', currency: 'SEK', region: '欧洲' },
  NO: { name: '挪威', flag: '🇳🇴', timezone: 'UTC+1', currency: 'NOK', region: '欧洲' },
  DK: { name: '丹麦', flag: '🇩🇰', timezone: 'UTC+1', currency: 'DKK', region: '欧洲' },
  FI: { name: '芬兰', flag: '🇫🇮', timezone: 'UTC+2', currency: 'EUR', region: '欧洲' },
  PL: { name: '波兰', flag: '🇵🇱', timezone: 'UTC+1', currency: 'PLN', region: '欧洲' },
  CZ: { name: '捷克', flag: '🇨🇿', timezone: 'UTC+1', currency: 'CZK', region: '欧洲' },
  AT: { name: '奥地利', flag: '🇦🇹', timezone: 'UTC+1', currency: 'EUR', region: '欧洲' },
  GR: { name: '希腊', flag: '🇬🇷', timezone: 'UTC+2', currency: 'EUR', region: '欧洲' },
  PT: { name: '葡萄牙', flag: '🇵🇹', timezone: 'UTC+0', currency: 'EUR', region: '欧洲' },
  IE: { name: '爱尔兰', flag: '🇮🇪', timezone: 'UTC+0', currency: 'EUR', region: '欧洲' },
  
  // 亚太
  JP: { name: '日本', flag: '🇯🇵', timezone: 'UTC+9', currency: 'JPY', region: '亚太' },
  KR: { name: '韩国', flag: '🇰🇷', timezone: 'UTC+9', currency: 'KRW', region: '亚太' },
  CN: { name: '中国', flag: '🇨🇳', timezone: 'UTC+8', currency: 'CNY', region: '亚太' },
  HK: { name: '香港', flag: '🇭🇰', timezone: 'UTC+8', currency: 'HKD', region: '亚太' },
  TW: { name: '台湾', flag: '🇹🇼', timezone: 'UTC+8', currency: 'TWD', region: '亚太' },
  SG: { name: '新加坡', flag: '🇸🇬', timezone: 'UTC+8', currency: 'SGD', region: '亚太' },
  MY: { name: '马来西亚', flag: '🇲🇾', timezone: 'UTC+8', currency: 'MYR', region: '亚太' },
  TH: { name: '泰国', flag: '🇹🇭', timezone: 'UTC+7', currency: 'THB', region: '亚太' },
  ID: { name: '印度尼西亚', flag: '🇮🇩', timezone: 'UTC+7', currency: 'IDR', region: '亚太' },
  PH: { name: '菲律宾', flag: '🇵🇭', timezone: 'UTC+8', currency: 'PHP', region: '亚太' },
  VN: { name: '越南', flag: '🇻🇳', timezone: 'UTC+7', currency: 'VND', region: '亚太' },
  IN: { name: '印度', flag: '🇮🇳', timezone: 'UTC+5:30', currency: 'INR', region: '亚太' },
  AU: { name: '澳大利亚', flag: '🇦🇺', timezone: 'UTC+10', currency: 'AUD', region: '亚太' },
  NZ: { name: '新西兰', flag: '🇳🇿', timezone: 'UTC+12', currency: 'NZD', region: '亚太' },
  
  // 中东
  AE: { name: '阿联酋', flag: '🇦🇪', timezone: 'UTC+4', currency: 'AED', region: '中东' },
  SA: { name: '沙特阿拉伯', flag: '🇸🇦', timezone: 'UTC+3', currency: 'SAR', region: '中东' },
  IL: { name: '以色列', flag: '🇮🇱', timezone: 'UTC+2', currency: 'ILS', region: '中东' },
  TR: { name: '土耳其', flag: '🇹🇷', timezone: 'UTC+3', currency: 'TRY', region: '中东' },
  EG: { name: '埃及', flag: '🇪🇬', timezone: 'UTC+2', currency: 'EGP', region: '中东' },
  
  // 南美
  BR: { name: '巴西', flag: '🇧🇷', timezone: 'UTC-3', currency: 'BRL', region: '南美' },
  AR: { name: '阿根廷', flag: '🇦🇷', timezone: 'UTC-3', currency: 'ARS', region: '南美' },
  CL: { name: '智利', flag: '🇨🇱', timezone: 'UTC-3', currency: 'CLP', region: '南美' },
  CO: { name: '哥伦比亚', flag: '🇨🇴', timezone: 'UTC-5', currency: 'COP', region: '南美' },
  PE: { name: '秘鲁', flag: '🇵🇪', timezone: 'UTC-5', currency: 'PEN', region: '南美' },
  
  // 非洲
  ZA: { name: '南非', flag: '🇿🇦', timezone: 'UTC+2', currency: 'ZAR', region: '非洲' },
  NG: { name: '尼日利亚', flag: '🇳🇬', timezone: 'UTC+1', currency: 'NGN', region: '非洲' },
  KE: { name: '肯尼亚', flag: '🇰🇪', timezone: 'UTC+3', currency: 'KES', region: '非洲' },
  
  // 东欧
  RU: { name: '俄罗斯', flag: '🇷🇺', timezone: 'UTC+3', currency: 'RUB', region: '东欧' },
  UA: { name: '乌克兰', flag: '🇺🇦', timezone: 'UTC+2', currency: 'UAH', region: '东欧' },
}

// 国际热门节假日（全球性节日）
export const internationalHolidays: Holiday[] = [
  { date: '01-01', name: "New Year's Day", localName: '新年', type: 'international', impact: 'high', description: '全球大部分国家庆祝' },
  { date: '02-14', name: "Valentine's Day", localName: '情人节', type: 'international', impact: 'low', description: '全球商业节日' },
  { date: '03-08', name: "International Women's Day", localName: '国际妇女节', type: 'international', impact: 'medium', description: '部分国家法定假日' },
  { date: '05-01', name: 'Labour Day', localName: '劳动节', type: 'international', impact: 'high', description: '多数国家法定假日' },
  { date: '10-31', name: 'Halloween', localName: '万圣节', type: 'international', impact: 'low', description: '西方国家流行' },
  { date: '11-11', name: "Singles' Day", localName: '双十一/光棍节', type: 'international', impact: 'medium', description: '全球最大购物节' },
  { date: '12-24', name: 'Christmas Eve', localName: '平安夜', type: 'international', impact: 'high', description: '基督教国家' },
  { date: '12-25', name: 'Christmas Day', localName: '圣诞节', type: 'international', impact: 'high', description: '西方最重要节日' },
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
  
  // 伊斯兰教（注：伊斯兰历日期可能有1-2天偏差）
  { date: '2025-03-01', name: 'Isra and Mi\'raj', localName: '夜行登霄', type: 'observance', impact: 'medium', description: '伊斯兰教：纪念先知夜行' },
  { date: '2025-03-28', name: 'Ramadan Begins', localName: '斋月开始', type: 'observance', impact: 'high', description: '伊斯兰教：斋戒月开始' },
  { date: '2025-04-23', name: 'Laylat al-Qadr', localName: '盖德尔夜', type: 'observance', impact: 'high', description: '伊斯兰教：权力之夜' },
  { date: '2025-04-27', name: 'Eid al-Fitr', localName: '开斋节', type: 'observance', impact: 'high', description: '伊斯兰教：斋月结束庆典' },
  { date: '2025-07-04', name: 'Eid al-Adha', localName: '宰牲节/古尔邦节', type: 'observance', impact: 'high', description: '伊斯兰教：献祭节' },
  { date: '2025-07-27', name: 'Muharram/Islamic New Year', localName: '伊斯兰新年', type: 'observance', impact: 'medium', description: '伊斯兰教：新年' },
  { date: '2025-08-05', name: 'Ashura', localName: '阿舒拉节', type: 'observance', impact: 'medium', description: '伊斯兰教：什叶派重要节日' },
  { date: '2025-10-05', name: 'Mawlid al-Nabi', localName: '圣纪节', type: 'observance', impact: 'medium', description: '伊斯兰教：先知诞辰' },
  
  // 印度教
  { date: '2025-03-14', name: 'Holi', localName: '洒红节/胡里节', type: 'observance', impact: 'high', description: '印度教：色彩节' },
  { date: '2025-03-30', name: 'Ram Navami', localName: '罗摩诞辰', type: 'observance', impact: 'medium', description: '印度教：罗摩神诞辰' },
  { date: '2025-08-16', name: 'Janmashtami', localName: '黑天诞辰', type: 'observance', impact: 'medium', description: '印度教：黑天神诞辰' },
  { date: '2025-08-28', name: 'Ganesh Chaturthi', localName: '象头神节', type: 'observance', impact: 'medium', description: '印度教：象头神诞辰' },
  { date: '2025-10-02', name: 'Navaratri Begins', localName: '九夜节开始', type: 'observance', impact: 'medium', description: '印度教：女神节' },
  { date: '2025-10-11', name: 'Dussehra', localName: '十胜节', type: 'observance', impact: 'high', description: '印度教：庆祝罗摩战胜罗波那' },
  { date: '2025-10-31', name: 'Diwali', localName: '排灯节/万灯节', type: 'observance', impact: 'high', description: '印度教：光明节' },
  { date: '2025-11-01', name: 'Bhai Dooj', localName: '兄妹节', type: 'observance', impact: 'low', description: '印度教：兄妹情谊节' },
  
  // 佛教
  { date: '2025-02-12', name: 'Mahayana New Year', localName: '大乘佛教新年', type: 'observance', impact: 'medium', description: '佛教：大乘新年' },
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
]

// 购物季和促销节日
export const shoppingHolidays: Holiday[] = [
  // 全球购物节
  { date: '01-01', name: 'New Year Sales', localName: '新年促销', type: 'observance', impact: 'medium', description: '全球：新年清仓促销' },
  { date: '11-11', name: "Singles' Day", localName: '双十一', type: 'observance', impact: 'high', description: '中国发起，全球最大网购节' },
  { date: '11-29', name: 'Black Friday', localName: '黑色星期五', type: 'observance', impact: 'high', description: '美国发起，全球购物狂欢' },
  { date: '12-02', name: 'Cyber Monday', localName: '网络星期一', type: 'observance', impact: 'high', description: '线上购物节' },
  { date: '12-12', name: 'Double 12', localName: '双十二', type: 'observance', impact: 'medium', description: '年终购物节' },
  { date: '12-26', name: 'Boxing Day Sales', localName: '节礼日促销', type: 'observance', impact: 'high', description: '英联邦国家传统促销日' },
  
  // 地区性购物季
  { date: '06-18', name: '618 Shopping Festival', localName: '618购物节', type: 'observance', impact: 'medium', description: '中国年中购物节' },
  { date: '08-08', name: 'August Sale', localName: '88购物节', type: 'observance', impact: 'low', description: '东南亚购物节' },
  { date: '09-09', name: '9.9 Shopping Day', localName: '99大促', type: 'observance', impact: 'low', description: '东南亚购物节' },
  { date: '10-10', name: '10.10 Sale', localName: '双十购物节', type: 'observance', impact: 'medium', description: '亚洲购物节' },
  
  // 行业特定购物季
  { date: '07-15', name: 'Amazon Prime Day', localName: '亚马逊会员日', type: 'observance', impact: 'high', description: '全球最大电商促销（日期每年略有变化）' },
  { date: '03-08', name: "Women's Day Sales", localName: '妇女节促销', type: 'observance', impact: 'low', description: '女性用品促销' },
  { date: '05-10', name: "Mother's Day Sales", localName: '母亲节促销', type: 'observance', impact: 'medium', description: '礼品类促销高峰' },
  { date: '06-15', name: "Father's Day Sales", localName: '父亲节促销', type: 'observance', impact: 'low', description: '男性用品促销' },
  { date: '09-01', name: 'Back to School', localName: '返校季', type: 'observance', impact: 'medium', description: '学生用品采购高峰' },
  
  // 季节性促销
  { date: '01-15', name: 'Winter Clearance', localName: '冬季清仓', type: 'observance', impact: 'medium', description: '冬装清仓' },
  { date: '03-20', name: 'Spring Sale', localName: '春季促销', type: 'observance', impact: 'low', description: '换季促销' },
  { date: '06-21', name: 'Summer Sale', localName: '夏季促销', type: 'observance', impact: 'medium', description: '夏装促销' },
  { date: '09-22', name: 'Fall/Autumn Sale', localName: '秋季促销', type: 'observance', impact: 'low', description: '秋装上新' },
  { date: '07-01', name: 'Mid-Year Sale', localName: '年中大促', type: 'observance', impact: 'medium', description: '年中清仓' },
  { date: '12-31', name: 'Year-End Clearance', localName: '年终清仓', type: 'observance', impact: 'high', description: '年底大清仓' },
]

// 获取所有特殊日期（包括宗教节日和购物季）
export function getAllSpecialDates(year: number = 2025): {
  religious: Holiday[],
  shopping: Holiday[]
} {
  // 对于购物季，添加年份
  const shoppingWithYear = shoppingHolidays.map(holiday => ({
    ...holiday,
    date: `${year}-${holiday.date}`
  }))
  
  return {
    religious: year === 2025 ? religiousHolidays2025 : [],
    shopping: shoppingWithYear
  }
}

// 节假日数据生成函数（支持多年份）
export function generateHolidayData(year: number): Record<string, Holiday[]> {
  // 基础节假日模板（每年固定日期的节日）
  const baseHolidays: Record<string, Omit<Holiday, 'date'>[]> = {
    US: [
      { name: "New Year's Day", type: 'public', impact: 'high' },
      { name: 'Independence Day', type: 'public', impact: 'high' },
      { name: 'Veterans Day', type: 'public', impact: 'medium' },
      { name: 'Christmas Day', type: 'public', impact: 'high' },
    ],
    UK: [
      { name: "New Year's Day", type: 'public', impact: 'high' },
      { name: 'Christmas Day', type: 'public', impact: 'high' },
      { name: 'Boxing Day', type: 'public', impact: 'high' },
    ],
    CN: [
      { name: '元旦', localName: "New Year's Day", type: 'public', impact: 'medium' },
      { name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
      { name: '清明节', localName: 'Qingming Festival', type: 'public', impact: 'medium' },
      { name: '劳动节', localName: 'Labour Day', type: 'public', impact: 'medium' },
      { name: '端午节', localName: 'Dragon Boat Festival', type: 'public', impact: 'medium' },
      { name: '中秋节', localName: 'Mid-Autumn Festival', type: 'public', impact: 'high' },
      { name: '国庆节', localName: 'National Day', type: 'public', impact: 'high' },
    ],
    // 添加更多国家...
  }
  
  // 这里应该根据年份计算实际日期，特别是移动节日
  // 为了示例，我们返回一些固定数据
  return getHolidaysForYear(year)
}

// 获取特定年份的节假日数据
function getHolidaysForYear(year: number): Record<string, Holiday[]> {
  // 2025年数据
  if (year === 2025) {
    return holidays2025
  }
  
  // 2026年数据
  if (year === 2026) {
    return holidays2026
  }
  
  // 其他年份返回估算数据或空数据
  return {}
}

// 2025年各国节假日数据
export const holidays2025: Record<string, Holiday[]> = {
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
  UK: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'high' },
    { date: '2025-05-05', name: 'Early May Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-05-26', name: 'Spring Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-08-25', name: 'Summer Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' },
  ],
  DE: [
    { date: '2025-01-01', name: 'Neujahr', localName: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-06', name: 'Heilige Drei Könige', localName: 'Epiphany', type: 'regional', impact: 'low' },
    { date: '2025-04-18', name: 'Karfreitag', localName: 'Good Friday', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Ostermontag', localName: 'Easter Monday', type: 'public', impact: 'high' },
    { date: '2025-05-01', name: 'Tag der Arbeit', localName: 'Labour Day', type: 'public', impact: 'high' },
    { date: '2025-05-29', name: 'Christi Himmelfahrt', localName: 'Ascension Day', type: 'public', impact: 'medium' },
    { date: '2025-06-09', name: 'Pfingstmontag', localName: 'Whit Monday', type: 'public', impact: 'medium' },
    { date: '2025-10-03', name: 'Tag der Deutschen Einheit', localName: 'German Unity Day', type: 'public', impact: 'high' },
    { date: '2025-12-25', name: '1. Weihnachtstag', localName: 'Christmas Day', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: '2. Weihnachtstag', localName: 'Boxing Day', type: 'public', impact: 'high' },
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
  CN: [
    { date: '2025-01-01', name: '元旦', localName: "New Year's Day", type: 'public', impact: 'medium' },
    { date: '2025-01-28', name: '春节除夕', localName: 'Spring Festival Eve', type: 'public', impact: 'high' },
    { date: '2025-01-29', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2025-01-30', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2025-01-31', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2025-02-01', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2025-02-02', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2025-04-04', name: '清明节', localName: 'Qingming Festival', type: 'public', impact: 'medium' },
    { date: '2025-05-01', name: '劳动节', localName: 'Labour Day', type: 'public', impact: 'medium' },
    { date: '2025-05-31', name: '端午节', localName: 'Dragon Boat Festival', type: 'public', impact: 'medium' },
    { date: '2025-10-01', name: '国庆节', localName: 'National Day', type: 'public', impact: 'high' },
    { date: '2025-10-06', name: '中秋节', localName: 'Mid-Autumn Festival', type: 'public', impact: 'high' },
  ],
  // 在 holidays2025 中添加更多国家的数据模板

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
  // 添加更多国家的2025年数据...
}

// 2026年各国节假日数据（预测）
export const holidays2026: Record<string, Holiday[]> = {
  US: [
    { date: '2026-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2026-01-19', name: 'Martin Luther King Jr. Day', type: 'public', impact: 'medium' },
    { date: '2026-02-16', name: "Presidents' Day", type: 'public', impact: 'medium' },
    { date: '2026-05-25', name: 'Memorial Day', type: 'public', impact: 'high' },
    { date: '2026-07-04', name: 'Independence Day', type: 'public', impact: 'high' },
    { date: '2026-09-07', name: 'Labor Day', type: 'public', impact: 'high' },
    { date: '2026-10-12', name: 'Columbus Day', type: 'public', impact: 'low' },
    { date: '2026-11-11', name: 'Veterans Day', type: 'public', impact: 'medium' },
    { date: '2026-11-26', name: 'Thanksgiving Day', type: 'public', impact: 'high' },
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
    { date: '2026-12-26', name: 'Boxing Day', type: 'public', impact: 'high' },
  ],
  CN: [
    { date: '2026-01-01', name: '元旦', localName: "New Year's Day", type: 'public', impact: 'medium' },
    { date: '2026-02-16', name: '春节除夕', localName: 'Spring Festival Eve', type: 'public', impact: 'high' },
    { date: '2026-02-17', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2026-02-18', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2026-02-19', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2026-02-20', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2026-02-21', name: '春节', localName: 'Spring Festival', type: 'public', impact: 'high' },
    { date: '2026-04-05', name: '清明节', localName: 'Qingming Festival', type: 'public', impact: 'medium' },
    { date: '2026-05-01', name: '劳动节', localName: 'Labour Day', type: 'public', impact: 'medium' },
    { date: '2026-06-19', name: '端午节', localName: 'Dragon Boat Festival', type: 'public', impact: 'medium' },
    { date: '2026-09-25', name: '中秋节', localName: 'Mid-Autumn Festival', type: 'public', impact: 'high' },
    { date: '2026-10-01', name: '国庆节', localName: 'National Day', type: 'public', impact: 'high' },
  ],
  // 添加更多国家的2026年数据...
}

// 节假日对外贸的影响说明
export const impactDescriptions = {
  high: '重大影响：政府机构、银行、大部分企业关闭，物流停运',
  medium: '中等影响：部分企业放假，物流可能延迟',
  low: '轻微影响：部分地区或行业放假，整体影响较小'
}

// 获取特定国家的节假日
export function getCountryHolidays(countryCode: string, year: number = new Date().getFullYear()): Holiday[] {
  const yearHolidays = generateHolidayData(year)
  return yearHolidays[countryCode] || []
}

// 获取即将到来的节假日
export function getUpcomingHolidays(daysAhead: number = 30, year: number = new Date().getFullYear()): UpcomingHoliday[] {
  const today = new Date()
  const upcoming: UpcomingHoliday[] = []
  const yearHolidays = generateHolidayData(year)
  
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
    const currentYear = today.getFullYear()
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
  
  // 添加宗教节日
  const { religious } = getAllSpecialDates(year)
  religious.forEach(holiday => {
    const holidayDate = new Date(holiday.date)
    const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntil > 0 && daysUntil <= daysAhead) {
      upcoming.push({
        ...holiday,
        country: '宗教节日',
        flag: '🙏',
        daysUntil
      })
    }
  })
  
  // 添加购物节（只添加影响较大的）
  const { shopping } = getAllSpecialDates(year)
  shopping.filter(h => h.impact !== 'low').forEach(holiday => {
    const holidayDate = new Date(holiday.date)
    const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntil > 0 && daysUntil <= daysAhead) {
      upcoming.push({
        ...holiday,
        country: '购物节',
        flag: '🛍️',
        daysUntil
      })
    }
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
