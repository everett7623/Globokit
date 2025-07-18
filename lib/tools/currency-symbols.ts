// 名称: 货币符号工具函数
// 描述: 提供全球货币符号数据和格式化函数
// 路径: seedtool/lib/tools/currency-symbols.ts
// 作者: Jensfrank
// 更新时间: 2025-07-18

// 货币地区分类
export const CURRENCY_REGIONS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  americas: '美洲',
  africa: '非洲',
  oceania: '大洋洲',
  middle_east: '中东'
}

// 全球货币数据
const CURRENCIES = [
  // 亚洲货币
  { code: 'CNY', name: '人民币', nameEn: 'Chinese Yuan', symbol: '¥', country: '中国', countryEn: 'China', region: 'asia', decimals: 2, popular: true, trading: true },
  { code: 'JPY', name: '日元', nameEn: 'Japanese Yen', symbol: '¥', country: '日本', countryEn: 'Japan', region: 'asia', decimals: 0, popular: true, trading: true },
  { code: 'KRW', name: '韩元', nameEn: 'South Korean Won', symbol: '₩', country: '韩国', countryEn: 'South Korea', region: 'asia', decimals: 0, popular: true },
  { code: 'HKD', name: '港元', nameEn: 'Hong Kong Dollar', symbol: 'HK$', country: '中国香港', countryEn: 'Hong Kong', region: 'asia', decimals: 2, popular: true },
  { code: 'TWD', name: '新台币', nameEn: 'New Taiwan Dollar', symbol: 'NT$', country: '中国台湾', countryEn: 'Taiwan', region: 'asia', decimals: 2 },
  { code: 'SGD', name: '新加坡元', nameEn: 'Singapore Dollar', symbol: 'S$', country: '新加坡', countryEn: 'Singapore', region: 'asia', decimals: 2, popular: true },
  { code: 'MYR', name: '马来西亚林吉特', nameEn: 'Malaysian Ringgit', symbol: 'RM', country: '马来西亚', countryEn: 'Malaysia', region: 'asia', decimals: 2 },
  { code: 'THB', name: '泰铢', nameEn: 'Thai Baht', symbol: '฿', country: '泰国', countryEn: 'Thailand', region: 'asia', decimals: 2 },
  { code: 'IDR', name: '印尼盾', nameEn: 'Indonesian Rupiah', symbol: 'Rp', country: '印度尼西亚', countryEn: 'Indonesia', region: 'asia', decimals: 2 },
  { code: 'PHP', name: '菲律宾比索', nameEn: 'Philippine Peso', symbol: '₱', country: '菲律宾', countryEn: 'Philippines', region: 'asia', decimals: 2 },
  { code: 'VND', name: '越南盾', nameEn: 'Vietnamese Dong', symbol: '₫', country: '越南', countryEn: 'Vietnam', region: 'asia', decimals: 0 },
  { code: 'INR', name: '印度卢比', nameEn: 'Indian Rupee', symbol: '₹', country: '印度', countryEn: 'India', region: 'asia', decimals: 2, popular: true },
  { code: 'PKR', name: '巴基斯坦卢比', nameEn: 'Pakistani Rupee', symbol: '₨', country: '巴基斯坦', countryEn: 'Pakistan', region: 'asia', decimals: 2 },
  { code: 'BDT', name: '孟加拉塔卡', nameEn: 'Bangladeshi Taka', symbol: '৳', country: '孟加拉国', countryEn: 'Bangladesh', region: 'asia', decimals: 2 },
  { code: 'LKR', name: '斯里兰卡卢比', nameEn: 'Sri Lankan Rupee', symbol: 'Rs', country: '斯里兰卡', countryEn: 'Sri Lanka', region: 'asia', decimals: 2 },
  { code: 'NPR', name: '尼泊尔卢比', nameEn: 'Nepalese Rupee', symbol: 'रू', country: '尼泊尔', countryEn: 'Nepal', region: 'asia', decimals: 2 },
  { code: 'MMK', name: '缅甸元', nameEn: 'Myanmar Kyat', symbol: 'K', country: '缅甸', countryEn: 'Myanmar', region: 'asia', decimals: 2 },
  { code: 'KHR', name: '柬埔寨瑞尔', nameEn: 'Cambodian Riel', symbol: '៛', country: '柬埔寨', countryEn: 'Cambodia', region: 'asia', decimals: 2 },
  { code: 'LAK', name: '老挝基普', nameEn: 'Lao Kip', symbol: '₭', country: '老挝', countryEn: 'Laos', region: 'asia', decimals: 2 },
  { code: 'BND', name: '文莱元', nameEn: 'Brunei Dollar', symbol: 'B$', country: '文莱', countryEn: 'Brunei', region: 'asia', decimals: 2 },
  { code: 'MOP', name: '澳门元', nameEn: 'Macanese Pataca', symbol: 'MOP$', country: '中国澳门', countryEn: 'Macau', region: 'asia', decimals: 2 },
  { code: 'MNT', name: '蒙古图格里克', nameEn: 'Mongolian Tugrik', symbol: '₮', country: '蒙古', countryEn: 'Mongolia', region: 'asia', decimals: 2 },
  { code: 'KZT', name: '哈萨克斯坦坚戈', nameEn: 'Kazakhstani Tenge', symbol: '₸', country: '哈萨克斯坦', countryEn: 'Kazakhstan', region: 'asia', decimals: 2 },
  { code: 'UZS', name: '乌兹别克斯坦索姆', nameEn: 'Uzbekistani Som', symbol: 'лв', country: '乌兹别克斯坦', countryEn: 'Uzbekistan', region: 'asia', decimals: 2 },
  
  // 欧洲货币
  { code: 'EUR', name: '欧元', nameEn: 'Euro', symbol: '€', country: '欧元区', countryEn: 'Eurozone', region: 'europe', decimals: 2, popular: true, trading: true },
  { code: 'GBP', name: '英镑', nameEn: 'British Pound', symbol: '£', country: '英国', countryEn: 'United Kingdom', region: 'europe', decimals: 2, popular: true, trading: true },
  { code: 'CHF', name: '瑞士法郎', nameEn: 'Swiss Franc', symbol: 'Fr', country: '瑞士', countryEn: 'Switzerland', region: 'europe', decimals: 2, popular: true, trading: true },
  { code: 'SEK', name: '瑞典克朗', nameEn: 'Swedish Krona', symbol: 'kr', country: '瑞典', countryEn: 'Sweden', region: 'europe', decimals: 2 },
  { code: 'NOK', name: '挪威克朗', nameEn: 'Norwegian Krone', symbol: 'kr', country: '挪威', countryEn: 'Norway', region: 'europe', decimals: 2 },
  { code: 'DKK', name: '丹麦克朗', nameEn: 'Danish Krone', symbol: 'kr', country: '丹麦', countryEn: 'Denmark', region: 'europe', decimals: 2 },
  { code: 'PLN', name: '波兰兹罗提', nameEn: 'Polish Zloty', symbol: 'zł', country: '波兰', countryEn: 'Poland', region: 'europe', decimals: 2 },
  { code: 'CZK', name: '捷克克朗', nameEn: 'Czech Koruna', symbol: 'Kč', country: '捷克', countryEn: 'Czech Republic', region: 'europe', decimals: 2 },
  { code: 'HUF', name: '匈牙利福林', nameEn: 'Hungarian Forint', symbol: 'Ft', country: '匈牙利', countryEn: 'Hungary', region: 'europe', decimals: 2 },
  { code: 'RON', name: '罗马尼亚列伊', nameEn: 'Romanian Leu', symbol: 'lei', country: '罗马尼亚', countryEn: 'Romania', region: 'europe', decimals: 2 },
  { code: 'BGN', name: '保加利亚列弗', nameEn: 'Bulgarian Lev', symbol: 'лв', country: '保加利亚', countryEn: 'Bulgaria', region: 'europe', decimals: 2 },
  { code: 'HRK', name: '克罗地亚库纳', nameEn: 'Croatian Kuna', symbol: 'kn', country: '克罗地亚', countryEn: 'Croatia', region: 'europe', decimals: 2 },
  { code: 'RUB', name: '俄罗斯卢布', nameEn: 'Russian Ruble', symbol: '₽', country: '俄罗斯', countryEn: 'Russia', region: 'europe', decimals: 2, popular: true },
  { code: 'UAH', name: '乌克兰格里夫纳', nameEn: 'Ukrainian Hryvnia', symbol: '₴', country: '乌克兰', countryEn: 'Ukraine', region: 'europe', decimals: 2 },
  { code: 'TRY', name: '土耳其里拉', nameEn: 'Turkish Lira', symbol: '₺', country: '土耳其', countryEn: 'Turkey', region: 'europe', decimals: 2 },
  { code: 'ISK', name: '冰岛克朗', nameEn: 'Icelandic Króna', symbol: 'kr', country: '冰岛', countryEn: 'Iceland', region: 'europe', decimals: 0 },
  { code: 'RSD', name: '塞尔维亚第纳尔', nameEn: 'Serbian Dinar', symbol: 'дин', country: '塞尔维亚', countryEn: 'Serbia', region: 'europe', decimals: 2 },
  { code: 'BAM', name: '波黑马克', nameEn: 'Bosnia Mark', symbol: 'KM', country: '波黑', countryEn: 'Bosnia and Herzegovina', region: 'europe', decimals: 2 },
  { code: 'MKD', name: '马其顿第纳尔', nameEn: 'Macedonian Denar', symbol: 'ден', country: '北马其顿', countryEn: 'North Macedonia', region: 'europe', decimals: 2 },
  { code: 'ALL', name: '阿尔巴尼亚列克', nameEn: 'Albanian Lek', symbol: 'L', country: '阿尔巴尼亚', countryEn: 'Albania', region: 'europe', decimals: 2 },
  { code: 'MDL', name: '摩尔多瓦列伊', nameEn: 'Moldovan Leu', symbol: 'L', country: '摩尔多瓦', countryEn: 'Moldova', region: 'europe', decimals: 2 },
  { code: 'BYN', name: '白俄罗斯卢布', nameEn: 'Belarusian Ruble', symbol: 'Br', country: '白俄罗斯', countryEn: 'Belarus', region: 'europe', decimals: 2 },
  { code: 'GEL', name: '格鲁吉亚拉里', nameEn: 'Georgian Lari', symbol: '₾', country: '格鲁吉亚', countryEn: 'Georgia', region: 'europe', decimals: 2 },
  { code: 'AMD', name: '亚美尼亚德拉姆', nameEn: 'Armenian Dram', symbol: '֏', country: '亚美尼亚', countryEn: 'Armenia', region: 'europe', decimals: 2 },
  { code: 'AZN', name: '阿塞拜疆马纳特', nameEn: 'Azerbaijani Manat', symbol: '₼', country: '阿塞拜疆', countryEn: 'Azerbaijan', region: 'europe', decimals: 2 },
  
  // 美洲货币
  { code: 'USD', name: '美元', nameEn: 'US Dollar', symbol: '$', country: '美国', countryEn: 'United States', region: 'americas', decimals: 2, popular: true, trading: true },
  { code: 'CAD', name: '加拿大元', nameEn: 'Canadian Dollar', symbol: 'C$', country: '加拿大', countryEn: 'Canada', region: 'americas', decimals: 2, popular: true, trading: true },
