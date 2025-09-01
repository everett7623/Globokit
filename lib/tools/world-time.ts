// 名称: 世界时间工具函数
// 描述: 处理时区转换和时间格式化的核心逻辑
// 路径: seedtool/lib/tools/world-time.ts
// 作者: Jensfrank
// 更新时间: 2025-09-01

/**
 * 格式化时间显示
 * @param date Date对象
 * @returns 格式化的时间字符串 (HH:MM:SS)
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * 获取时区偏移量
 * @param timezone 时区标识符
 * @returns UTC偏移量字符串 (例如: +08:00)
 */
export function getTimeZoneOffset(timezone: string): string {
  const now = new Date()
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
  
  const diff = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60)
  const hours = Math.floor(Math.abs(diff))
  const minutes = Math.floor((Math.abs(diff) - hours) * 60)
  
  const sign = diff >= 0 ? '+' : '-'
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

/**
 * 判断是否为工作时间
 * @param date 当地时间的Date对象
 * @returns 是否在工作时间内 (周一至周五 9:00-18:00)
 */
export function isBusinessHours(date: Date): boolean {
  const day = date.getDay()
  const hour = date.getHours()
  
  // 周一至周五 (1-5)
  if (day >= 1 && day <= 5) {
    // 9:00 - 18:00
    return hour >= 9 && hour < 18
  }
  
  return false
}

/**
 * 计算两个时区之间的时差
 * @param timezone1 第一个时区
 * @param timezone2 第二个时区
 * @returns 时差（小时）
 */
export function getTimeDifference(timezone1: string, timezone2: string): number {
  const now = new Date()
  
  // 获取两个时区的偏移量
  const date1 = new Date(now.toLocaleString('en-US', { timeZone: timezone1 }))
  const date2 = new Date(now.toLocaleString('en-US', { timeZone: timezone2 }))
  
  // 计算UTC偏移量
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
  
  const offset1 = (date1.getTime() - utcDate.getTime()) / (1000 * 60 * 60)
  const offset2 = (date2.getTime() - utcDate.getTime()) / (1000 * 60 * 60)
  
  return Math.round(offset1 - offset2)
}

/**
 * 获取时区的标准名称
 * @param timezone 时区标识符
 * @returns 时区的标准名称
 */
export function getTimeZoneName(timezone: string): string {
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: timezone,
    timeZoneName: 'long'
  })
  
  const parts = formatter.formatToParts(new Date())
  const timeZoneName = parts.find(part => part.type === 'timeZoneName')
  
  return timeZoneName?.value || timezone
}

/**
 * 获取最佳会议时间
 * @param timezones 参与者所在的时区列表
 * @returns 建议的会议时间段
 */
export function getBestMeetingTime(timezones: string[]): {
  start: number
  end: number
  score: number
}[] {
  const meetingTimes: { start: number; end: number; score: number }[] = []
  
  // 检查每个小时
  for (let hour = 0; hour < 24; hour++) {
    let score = 0
    let validForAll = true
    
    for (const timezone of timezones) {
      const now = new Date()
      now.setHours(hour, 0, 0, 0)
      
      const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
      const localHour = localTime.getHours()
      
      // 评分规则
      if (localHour >= 9 && localHour < 12) {
        score += 3 // 上午最佳
      } else if (localHour >= 14 && localHour < 17) {
        score += 2 // 下午次佳
      } else if (localHour >= 8 && localHour < 9) {
        score += 1 // 早上可接受
      } else if (localHour >= 17 && localHour < 19) {
        score += 1 // 傍晚可接受
      } else if (localHour < 7 || localHour >= 22) {
        validForAll = false // 太早或太晚
        break
      }
    }
    
    if (validForAll && score > 0) {
      meetingTimes.push({
        start: hour,
        end: (hour + 1) % 24,
        score: score / timezones.length
      })
    }
  }
  
  // 按评分排序
  return meetingTimes.sort((a, b) => b.score - a.score).slice(0, 3)
}

/**
 * 获取下一个工作时间
 * @param timezone 时区
 * @returns 下一个工作时间的描述
 */
export function getNextBusinessHours(timezone: string): string {
  const now = new Date()
  const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
  
  const hour = localTime.getHours()
  const day = localTime.getDay()
  
  // 当前是工作时间
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
    return '当前为工作时间'
  }
  
  // 工作日但不在工作时间
  if (day >= 1 && day <= 5) {
    if (hour < 9) {
      return `今天 9:00 开始工作`
    } else {
      return `明天 9:00 开始工作`
    }
  }
  
  // 周末
  let daysUntilMonday = day === 0 ? 1 : 8 - day
  return `${daysUntilMonday}天后（周一）9:00 开始工作`
}

/**
 * 格式化日期时间为多种格式
 * @param date Date对象
 * @param timezone 时区
 * @returns 格式化的日期时间对象
 */
export function formatDateTime(date: Date, timezone: string): {
  time12: string
  time24: string
  date: string
  iso: string
  unix: number
} {
  const options = { timeZone: timezone }
  
  return {
    time12: date.toLocaleTimeString('en-US', { ...options, hour12: true }),
    time24: date.toLocaleTimeString('zh-CN', { ...options, hour12: false }),
    date: date.toLocaleDateString('zh-CN', options),
    iso: date.toISOString(),
    unix: Math.floor(date.getTime() / 1000)
  }
}

/**
 * 转换时间到指定时区
 * @param date 原始日期时间
 * @param fromTimezone 原时区
 * @param toTimezone 目标时区
 * @returns 转换后的日期时间
 */
export function convertTimeZone(
  date: Date,
  fromTimezone: string,
  toTimezone: string
): Date {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: fromTimezone }))
  return new Date(utcDate.toLocaleString('en-US', { timeZone: toTimezone }))
}

// 主要贸易城市时区配置
export const WORLD_CITIES = [
  // 亚洲
  { name: '北京', nameEn: 'Beijing', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '上海', nameEn: 'Shanghai', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '广州', nameEn: 'Guangzhou', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '深圳', nameEn: 'Shenzhen', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '天津', nameEn: 'Tianjin', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '重庆', nameEn: 'Chongqing', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '成都', nameEn: 'Chengdu', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '香港', nameEn: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: '中国', countryCode: 'HK' },
  { name: '台北', nameEn: 'Taipei', timezone: 'Asia/Taipei', country: '中国', countryCode: 'TW' },
  { name: '东京', nameEn: 'Tokyo', timezone: 'Asia/Tokyo', country: '日本', countryCode: 'JP' },
  { name: '大阪', nameEn: 'Osaka', timezone: 'Asia/Tokyo', country: '日本', countryCode: 'JP' },
  { name: '名古屋', nameEn: 'Nagoya', timezone: 'Asia/Tokyo', country: '日本', countryCode: 'JP' },
  { name: '首尔', nameEn: 'Seoul', timezone: 'Asia/Seoul', country: '韩国', countryCode: 'KR' },
  { name: '釜山', nameEn: 'Busan', timezone: 'Asia/Seoul', country: '韩国', countryCode: 'KR' },
  { name: '新加坡', nameEn: 'Singapore', timezone: 'Asia/Singapore', country: '新加坡', countryCode: 'SG' },
  { name: '吉隆坡', nameEn: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', country: '马来西亚', countryCode: 'MY' },
  { name: '曼谷', nameEn: 'Bangkok', timezone: 'Asia/Bangkok', country: '泰国', countryCode: 'TH' },
  { name: '雅加达', nameEn: 'Jakarta', timezone: 'Asia/Jakarta', country: '印度尼西亚', countryCode: 'ID' },
  { name: '泗水', nameEn: 'Surabaya', timezone: 'Asia/Jakarta', country: '印度尼西亚', countryCode: 'ID' },
  { name: '马尼拉', nameEn: 'Manila', timezone: 'Asia/Manila', country: '菲律宾', countryCode: 'PH' },
  { name: '河内', nameEn: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh', country: '越南', countryCode: 'VN' },
  { name: '胡志明市', nameEn: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', country: '越南', countryCode: 'VN' },
  { name: '新德里', nameEn: 'New Delhi', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '孟买', nameEn: 'Mumbai', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '班加罗尔', nameEn: 'Bangalore', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '金奈', nameEn: 'Chennai', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '达卡', nameEn: 'Dhaka', timezone: 'Asia/Dhaka', country: '孟加拉国', countryCode: 'BD' },
  { name: '卡拉奇', nameEn: 'Karachi', timezone: 'Asia/Karachi', country: '巴基斯坦', countryCode: 'PK' },
  { name: '阿拉木图', nameEn: 'Almaty', timezone: 'Asia/Almaty', country: '哈萨克斯坦', countryCode: 'KZ' },
  
  // 中东
  { name: '迪拜', nameEn: 'Dubai', timezone: 'Asia/Dubai', country: '阿联酋', countryCode: 'AE' },
  { name: '阿布扎比', nameEn: 'Abu Dhabi', timezone: 'Asia/Dubai', country: '阿联酋', countryCode: 'AE' },
  { name: '利雅得', nameEn: 'Riyadh', timezone: 'Asia/Riyadh', country: '沙特阿拉伯', countryCode: 'SA' },
  { name: '吉达', nameEn: 'Jeddah', timezone: 'Asia/Riyadh', country: '沙特阿拉伯', countryCode: 'SA' },
  { name: '多哈', nameEn: 'Doha', timezone: 'Asia/Qatar', country: '卡塔尔', countryCode: 'QA' },
  { name: '科威特城', nameEn: 'Kuwait City', timezone: 'Asia/Kuwait', country: '科威特', countryCode: 'KW' },
  { name: '马斯喀特', nameEn: 'Muscat', timezone: 'Asia/Muscat', country: '阿曼', countryCode: 'OM' },
  { name: '麦纳麦', nameEn: 'Manama', timezone: 'Asia/Bahrain', country: '巴林', countryCode: 'BH' },
  { name: '特拉维夫', nameEn: 'Tel Aviv', timezone: 'Asia/Jerusalem', country: '以色列', countryCode: 'IL' },
  { name: '伊斯坦布尔', nameEn: 'Istanbul', timezone: 'Europe/Istanbul', country: '土耳其', countryCode: 'TR' },
  { name: '安卡拉', nameEn: 'Ankara', timezone: 'Europe/Istanbul', country: '土耳其', countryCode: 'TR' },
  { name: '德黑兰', nameEn: 'Tehran', timezone: 'Asia/Tehran', country: '伊朗', countryCode: 'IR' },
  
  // 欧洲
  { name: '伦敦', nameEn: 'London', timezone: 'Europe/London', country: '英国', countryCode: 'GB' },
  { name: '曼彻斯特', nameEn: 'Manchester', timezone: 'Europe/London', country: '英国', countryCode: 'GB' },
  { name: '伯明翰', nameEn: 'Birmingham', timezone: 'Europe/London', country: '英国', countryCode: 'GB' },
  { name: '巴黎', nameEn: 'Paris', timezone: 'Europe/Paris', country: '法国', countryCode: 'FR' },
  { name: '里昂', nameEn: 'Lyon', timezone: 'Europe/Paris', country: '法国', countryCode: 'FR' },
  { name: '马赛', nameEn: 'Marseille', timezone: 'Europe/Paris', country: '法国', countryCode: 'FR' },
  { name: '柏林', nameEn: 'Berlin', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '法兰克福', nameEn: 'Frankfurt', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '慕尼黑', nameEn: 'Munich', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '汉堡', nameEn: 'Hamburg', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '杜塞尔多夫', nameEn: 'Düsseldorf', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '阿姆斯特丹', nameEn: 'Amsterdam', timezone: 'Europe/Amsterdam', country: '荷兰', countryCode: 'NL' },
  { name: '鹿特丹', nameEn: 'Rotterdam', timezone: 'Europe/Amsterdam', country: '荷兰', countryCode: 'NL' },
  { name: '布鲁塞尔', nameEn: 'Brussels', timezone: 'Europe/Brussels', country: '比利时', countryCode: 'BE' },
  { name: '马德里', nameEn: 'Madrid', timezone: 'Europe/Madrid', country: '西班牙', countryCode: 'ES' },
  { name: '巴塞罗那', nameEn: 'Barcelona', timezone: 'Europe/Madrid', country: '西班牙', countryCode: 'ES' },
  { name: '罗马', nameEn: 'Rome', timezone: 'Europe/Rome', country: '意大利', countryCode: 'IT' },
  { name: '米米兰', nameEn: 'Milan', timezone: 'Europe/Rome', country: '意大利', countryCode: 'IT' },
  { name: '苏黎世', nameEn: 'Zurich', timezone: 'Europe/Zurich', country: '瑞士', countryCode: 'CH' },
  { name: '日内瓦', nameEn: 'Geneva', timezone: 'Europe/Zurich', country: '瑞士', countryCode: 'CH' },
  { name: '维也纳', nameEn: 'Vienna', timezone: 'Europe/Vienna', country: '奥地利', countryCode: 'AT' },
  { name: '华沙', nameEn: 'Warsaw', timezone: 'Europe/Warsaw', country: '波兰', countryCode: 'PL' },
  { name: '布拉格', nameEn: 'Prague', timezone: 'Europe/Prague', country: '捷克', countryCode: 'CZ' },
  { name: '布达佩斯', nameEn: 'Budapest', timezone: 'Europe/Budapest', country: '匈牙利', countryCode: 'HU' },
  { name: '布加勒斯特', nameEn: 'Bucharest', timezone: 'Europe/Bucharest', country: '罗马尼亚', countryCode: 'RO' },
  { name: '斯德哥尔摩', nameEn: 'Stockholm', timezone: 'Europe/Stockholm', country: '瑞典', countryCode: 'SE' },
  { name: '哥本哈根', nameEn: 'Copenhagen', timezone: 'Europe/Copenhagen', country: '丹麦', countryCode: 'DK' },
  { name: '奥斯陆', nameEn: 'Oslo', timezone: 'Europe/Oslo', country: '挪威', countryCode: 'NO' },
  { name: '赫尔辛基', nameEn: 'Helsinki', timezone: 'Europe/Helsinki', country: '芬兰', countryCode: 'FI' },
  { name: '莫斯科', nameEn: 'Moscow', timezone: 'Europe/Moscow', country: '俄罗斯', countryCode: 'RU' },
  { name: '圣彼得堡', nameEn: 'St. Petersburg', timezone: 'Europe/Moscow', country: '俄罗斯', countryCode: 'RU' },
  { name: '符拉迪沃斯托克', nameEn: 'Vladivostok', timezone: 'Asia/Vladivostok', country: '俄罗斯', countryCode: 'RU' },
  { name: '基辅', nameEn: 'Kyiv', timezone: 'Europe/Kiev', country: '乌克兰', countryCode: 'UA' },
  { name: '雅典', nameEn: 'Athens', timezone: 'Europe/Athens', country: '希腊', countryCode: 'GR' },
  { name: '里斯本', nameEn: 'Lisbon', timezone: 'Europe/Lisbon', country: '葡萄牙', countryCode: 'PT' },
  { name: '都柏林', nameEn: 'Dublin', timezone: 'Europe/Dublin', country: '爱尔兰', countryCode: 'IE' },
  
  // 北美
  { name: '纽约', nameEn: 'New York', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '洛杉矶', nameEn: 'Los Angeles', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '芝加哥', nameEn: 'Chicago', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '休斯顿', nameEn: 'Houston', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '迈阿密', nameEn: 'Miami', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '西雅图', nameEn: 'Seattle', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '旧金山', nameEn: 'San Francisco', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '圣地亚哥', nameEn: 'San Diego', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '波士顿', nameEn: 'Boston', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '亚特兰大', nameEn: 'Atlanta', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '达拉斯', nameEn: 'Dallas', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '丹佛', nameEn: 'Denver', timezone: 'America/Denver', country: '美国', countryCode: 'US' },
  { name: '菲尼克斯', nameEn: 'Phoenix', timezone: 'America/Phoenix', country: '美国', countryCode: 'US' },
  { name: '费城', nameEn: 'Philadelphia', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '华盛顿哥伦比亚特区', nameEn: 'Washington, D.C.', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '多伦多', nameEn: 'Toronto', timezone: 'America/Toronto', country: '加拿大', countryCode: 'CA' },
  { name: '温哥华', nameEn: 'Vancouver', timezone: 'America/Vancouver', country: '加拿大', countryCode: 'CA' },
  { name: '蒙特利尔', nameEn: 'Montreal', timezone: 'America/Toronto', country: '加拿大', countryCode: 'CA' },
  { name: '卡尔加里', nameEn: 'Calgary', timezone: 'America/Edmonton', country: '加拿大', countryCode: 'CA' },
  { name: '墨西哥城', nameEn: 'Mexico City', timezone: 'America/Mexico_City', country: '墨西哥', countryCode: 'MX' },
  { name: '瓜达拉哈拉', nameEn: 'Guadalajara', timezone: 'America/Mexico_City', country: '墨西哥', countryCode: 'MX' },
  { name: '蒙特雷', nameEn: 'Monterrey', timezone: 'America/Monterrey', country: '墨西哥', countryCode: 'MX' },
  
  // 中南美洲
  { name: '圣保罗', nameEn: 'São Paulo', timezone: 'America/Sao_Paulo', country: '巴西', countryCode: 'BR' },
  { name: '里约热内卢', nameEn: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', country: '巴西', countryCode: 'BR' },
  { name: '布宜诺斯艾利斯', nameEn: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: '阿根廷', countryCode: 'AR' },
  { name: '圣地亚哥', nameEn: 'Santiago', timezone: 'America/Santiago', country: '智利', countryCode: 'CL' },
  { name: '瓦尔帕莱索', nameEn: 'Valparaíso', timezone: 'America/Santiago', country: '智利', countryCode: 'CL' },
  { name: '利马', nameEn: 'Lima', timezone: 'America/Lima', country: '秘鲁', countryCode: 'PE' },
  { name: '波哥大', nameEn: 'Bogotá', timezone: 'America/Bogota', country: '哥伦比亚', countryCode: 'CO' },
  { name: '麦德林', nameEn: 'Medellín', timezone: 'America/Bogota', country: '哥伦比亚', countryCode: 'CO' },
  { name: '加拉加斯', nameEn: 'Caracas', timezone: 'America/Caracas', country: '委内瑞拉', countryCode: 'VE' },
  { name: '基多', nameEn: 'Quito', timezone: 'America/Guayaquil', country: '厄瓜多尔', countryCode: 'EC' },
  { name: '巴拿马城', nameEn: 'Panama City', timezone: 'America/Panama', country: '巴拿马', countryCode: 'PA' },
  { name: '蒙得维的亚', nameEn: 'Montevideo', timezone: 'America/Montevideo', country: '乌拉圭', countryCode: 'UY' },
  
  // 非洲
  { name: '开罗', nameEn: 'Cairo', timezone: 'Africa/Cairo', country: '埃及', countryCode: 'EG' },
  { name: '亚历山大', nameEn: 'Alexandria', timezone: 'Africa/Cairo', country: '埃及', countryCode: 'EG' },
  { name: '约翰内斯堡', nameEn: 'Johannesburg', timezone: 'Africa/Johannesburg', country: '南非', countryCode: 'ZA' },
  { name: '开普敦', nameEn: 'Cape Town', timezone: 'Africa/Johannesburg', country: '南非', countryCode: 'ZA' },
  { name: '德班', nameEn: 'Durban', timezone: 'Africa/Johannesburg', country: '南非', countryCode: 'ZA' },
  { name: '拉各斯', nameEn: 'Lagos', timezone: 'Africa/Lagos', country: '尼日利亚', countryCode: 'NG' },
  { name: '内罗毕', nameEn: 'Nairobi', timezone: 'Africa/Nairobi', country: '肯尼亚', countryCode: 'KE' },
  { name: '卡萨布兰卡', nameEn: 'Casablanca', timezone: 'Africa/Casablanca', country: '摩洛哥', countryCode: 'MA' },
  { name: '阿尔及尔', nameEn: 'Algiers', timezone: 'Africa/Algiers', country: '阿尔及利亚', countryCode: 'DZ' },
  { name: '突尼斯', nameEn: 'Tunis', timezone: 'Africa/Tunis', country: '突尼斯', countryCode: 'TN' },
  { name: '亚的斯亚贝巴', nameEn: 'Addis Ababa', timezone: 'Africa/Addis_Ababa', country: '埃塞俄比亚', countryCode: 'ET' },
  { name: '阿克拉', nameEn: 'Accra', timezone: 'Africa/Accra', country: '加纳', countryCode: 'GH' },
  { name: '达喀尔', nameEn: 'Dakar', timezone: 'Africa/Dakar', country: '塞内加尔', countryCode: 'SN' },
  
  // 大洋洲
  { name: '悉尼', nameEn: 'Sydney', timezone: 'Australia/Sydney', country: '澳大利亚', countryCode: 'AU' },
  { name: '墨尔本', nameEn: 'Melbourne', timezone: 'Australia/Melbourne', country: '澳大利亚', countryCode: 'AU' },
  { name: '布里斯班', nameEn: 'Brisbane', timezone: 'Australia/Brisbane', country: '澳大利亚', countryCode: 'AU' },
  { name: '珀斯', nameEn: 'Perth', timezone: 'Australia/Perth', country: '澳大利亚', countryCode: 'AU' },
  { name: '阿德莱德', nameEn: 'Adelaide', timezone: 'Australia/Adelaide', country: '澳大利亚', countryCode: 'AU' },
  { name: '奥克兰', nameEn: 'Auckland', timezone: 'Pacific/Auckland', country: '新西兰', countryCode: 'NZ' },
  { name: '惠灵顿', nameEn: 'Wellington', timezone: 'Pacific/Auckland', country: '新西兰', countryCode: 'NZ' },
  { name: '基督城', nameEn: 'Christchurch', timezone: 'Pacific/Auckland', country: '新西兰', countryCode: 'NZ' }
]
