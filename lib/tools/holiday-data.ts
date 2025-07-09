// lib/tools/holiday-data.ts
// 备用的节假日数据（当 API 不可用时使用）

export interface Holiday {
  date: string
  name: string
  type: 'public' | 'regional' | 'observance'
  impact: 'high' | 'medium' | 'low'
}

export interface Country {
  code: string
  name: string
  flag: string
  timezone: string
  currency: string
}

// 主要贸易国家列表
export const countries: Record<string, Country> = {
  US: { code: 'US', name: '美国', flag: '🇺🇸', timezone: 'UTC-5', currency: 'USD' },
  UK: { code: 'UK', name: '英国', flag: '🇬🇧', timezone: 'UTC+0', currency: 'GBP' },
  DE: { code: 'DE', name: '德国', flag: '🇩🇪', timezone: 'UTC+1', currency: 'EUR' },
  FR: { code: 'FR', name: '法国', flag: '🇫🇷', timezone: 'UTC+1', currency: 'EUR' },
  IT: { code: 'IT', name: '意大利', flag: '🇮🇹', timezone: 'UTC+1', currency: 'EUR' },
  ES: { code: 'ES', name: '西班牙', flag: '🇪🇸', timezone: 'UTC+1', currency: 'EUR' },
  JP: { code: 'JP', name: '日本', flag: '🇯🇵', timezone: 'UTC+9', currency: 'JPY' },
  KR: { code: 'KR', name: '韩国', flag: '🇰🇷', timezone: 'UTC+9', currency: 'KRW' },
  CN: { code: 'CN', name: '中国', flag: '🇨🇳', timezone: 'UTC+8', currency: 'CNY' },
  SG: { code: 'SG', name: '新加坡', flag: '🇸🇬', timezone: 'UTC+8', currency: 'SGD' },
  AU: { code: 'AU', name: '澳大利亚', flag: '🇦🇺', timezone: 'UTC+10', currency: 'AUD' },
  NZ: { code: 'NZ', name: '新西兰', flag: '🇳🇿', timezone: 'UTC+12', currency: 'NZD' },
  CA: { code: 'CA', name: '加拿大', flag: '🇨🇦', timezone: 'UTC-5', currency: 'CAD' },
  MX: { code: 'MX', name: '墨西哥', flag: '🇲🇽', timezone: 'UTC-6', currency: 'MXN' },
  BR: { code: 'BR', name: '巴西', flag: '🇧🇷', timezone: 'UTC-3', currency: 'BRL' },
  IN: { code: 'IN', name: '印度', flag: '🇮🇳', timezone: 'UTC+5:30', currency: 'INR' },
  RU: { code: 'RU', name: '俄罗斯', flag: '🇷🇺', timezone: 'UTC+3', currency: 'RUB' },
  AE: { code: 'AE', name: '阿联酋', flag: '🇦🇪', timezone: 'UTC+4', currency: 'AED' },
  SA: { code: 'SA', name: '沙特阿拉伯', flag: '🇸🇦', timezone: 'UTC+3', currency: 'SAR' },
  TH: { code: 'TH', name: '泰国', flag: '🇹🇭', timezone: 'UTC+7', currency: 'THB' },
  MY: { code: 'MY', name: '马来西亚', flag: '🇲🇾', timezone: 'UTC+8', currency: 'MYR' },
  ID: { code: 'ID', name: '印度尼西亚', flag: '🇮🇩', timezone: 'UTC+7', currency: 'IDR' },
  VN: { code: 'VN', name: '越南', flag: '🇻🇳', timezone: 'UTC+7', currency: 'VND' },
  PH: { code: 'PH', name: '菲律宾', flag: '🇵🇭', timezone: 'UTC+8', currency: 'PHP' }
}

// 2025年主要国家节假日数据（备用）
export const holidays2025: Record<string, Holiday[]> = {
  US: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-20', name: 'Martin Luther King Jr. Day', type: 'public', impact: 'medium' },
    { date: '2025-02-17', name: "Presidents' Day", type: 'public', impact: 'medium' },
    { date: '2025-05-26', name: 'Memorial Day', type: 'public', impact: 'high' },
    { date: '2025-07-04', name: 'Independence Day', type: 'public', impact: 'high' },
    { date: '2025-09-01', name: 'Labor Day', type: 'public', impact: 'high' },
    { date: '2025-10-13', name: 'Columbus Day', type: 'public', impact: 'low' },
    { date: '2025-11-11', name: 'Veterans Day', type: 'public', impact: 'medium' },
    { date: '2025-11-27', name: 'Thanksgiving Day', type: 'public', impact: 'high' },
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
  CN: [
    { date: '2025-01-01', name: '元旦', type: 'public', impact: 'medium' },
    { date: '2025-01-28', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-01-29', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-01-30', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-01-31', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-02-01', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-02-02', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-02-03', name: '春节', type: 'public', impact: 'high' },
    { date: '2025-04-04', name: '清明节', type: 'public', impact: 'medium' },
    { date: '2025-05-01', name: '劳动节', type: 'public', impact: 'medium' },
    { date: '2025-05-31', name: '端午节', type: 'public', impact: 'medium' },
    { date: '2025-10-01', name: '国庆节', type: 'public', impact: 'high' },
    { date: '2025-10-06', name: '中秋节', type: 'public', impact: 'high' }
  ]
  // 可以继续添加其他国家...
}
