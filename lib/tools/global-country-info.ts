// 名称: 全球国家信息查询
// 描述: 提供全球国家和地区的详细信息，包括代码、区号、时区等
// 路径: seedtool/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-25

export interface CountryInfo {
  name_cn: string;
  name_en: string;
  iso2: string;
  iso3: string;
  dial_code: string;
  capital_cn: string;
  capital_en: string;
  continent_cn: string;
  continent_en: string;
  tld: string;
  timezone: string;
  currency_code: string;
  currency_name_cn: string;
}

// 数据来源: 结合了多个公开数据集，并进行了整理
export const COUNTRY_DATA: CountryInfo[] = [
  { name_cn: "阿富汗", name_en: "Afghanistan", iso2: "AF", iso3: "AFG", dial_code: "+93", capital_cn: "喀布尔", capital_en: "Kabul", continent_cn: "亚洲", continent_en: "Asia", tld: ".af", timezone: "Asia/Kabul", currency_code: "AFN", currency_name_cn: "阿富汗尼" },
  { name_cn: "中国", name_en: "China", iso2: "CN", iso3: "CHN", dial_code: "+86", capital_cn: "北京", capital_en: "Beijing", continent_cn: "亚洲", continent_en: "Asia", tld: ".cn", timezone: "Asia/Shanghai", currency_code: "CNY", currency_name_cn: "人民币" },
  { name_cn: "美国", name_en: "United States", iso2: "US", iso3: "USA", dial_code: "+1", capital_cn: "华盛顿", capital_en: "Washington, D.C.", continent_cn: "北美洲", continent_en: "North America", tld: ".us", timezone: "America/New_York", currency_code: "USD", currency_name_cn: "美元" },
  { name_cn: "日本", name_en: "Japan", iso2: "JP", iso3: "JPN", dial_code: "+81", capital_cn: "东京", capital_en: "Tokyo", continent_cn: "亚洲", continent_en: "Asia", tld: ".jp", timezone: "Asia/Tokyo", currency_code: "JPY", currency_name_cn: "日元" },
  { name_cn: "德国", name_en: "Germany", iso2: "DE", iso3: "DEU", dial_code: "+49", capital_cn: "柏林", capital_en: "Berlin", continent_cn: "欧洲", continent_en: "Europe", tld: ".de", timezone: "Europe/Berlin", currency_code: "EUR", currency_name_cn: "欧元" },
  { name_cn: "英国", name_en: "United Kingdom", iso2: "GB", iso3: "GBR", dial_code: "+44", capital_cn: "伦敦", capital_en: "London", continent_cn: "欧洲", continent_en: "Europe", tld: ".uk", timezone: "Europe/London", currency_code: "GBP", currency_name_cn: "英镑" },
  { name_cn: "法国", name_en: "France", iso2: "FR", iso3: "FRA", dial_code: "+33", capital_cn: "巴黎", capital_en: "Paris", continent_cn: "欧洲", continent_en: "Europe", tld: ".fr", timezone: "Europe/Paris", currency_code: "EUR", currency_name_cn: "欧元" },
  { name_cn: "俄罗斯", name_en: "Russia", iso2: "RU", iso3: "RUS", dial_code: "+7", capital_cn: "莫斯科", capital_en: "Moscow", continent_cn: "欧洲", continent_en: "Europe", tld: ".ru", timezone: "Europe/Moscow", currency_code: "RUB", currency_name_cn: "俄罗斯卢布" },
  { name_cn: "加拿大", name_en: "Canada", iso2: "CA", iso3: "CAN", dial_code: "+1", capital_cn: "渥太华", capital_en: "Ottawa", continent_cn: "北美洲", continent_en: "North America", tld: ".ca", timezone: "America/Toronto", currency_code: "CAD", currency_name_cn: "加拿大元" },
  { name_cn: "澳大利亚", name_en: "Australia", iso2: "AU", iso3: "AUS", dial_code: "+61", capital_cn: "堪培拉", capital_en: "Canberra", continent_cn: "大洋洲", continent_en: "Oceania", tld: ".au", timezone: "Australia/Sydney", currency_code: "AUD", currency_name_cn: "澳大利亚元" },
  { name_cn: "巴西", name_en: "Brazil", iso2: "BR", iso3: "BRA", dial_code: "+55", capital_cn: "巴西利亚", capital_en: "Brasília", continent_cn: "南美洲", continent_en: "South America", tld: ".br", timezone: "America/Sao_Paulo", currency_code: "BRL", currency_name_cn: "巴西雷亚尔" },
  { name_cn: "印度", name_en: "India", iso2: "IN", iso3: "IND", dial_code: "+91", capital_cn: "新德里", capital_en: "New Delhi", continent_cn: "亚洲", continent_en: "Asia", tld: ".in", timezone: "Asia/Kolkata", currency_code: "INR", currency_name_cn: "印度卢比" },
  { name_cn: "韩国", name_en: "South Korea", iso2: "KR", iso3: "KOR", dial_code: "+82", capital_cn: "首尔", capital_en: "Seoul", continent_cn: "亚洲", continent_en: "Asia", tld: ".kr", timezone: "Asia/Seoul", currency_code: "KRW", currency_name_cn: "韩元" },
];

/**
 * 获取国旗的emoji表示
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * [已重写] 获取指定时区与本地的时差（小时）
 */
export function getTimeDifference(targetTimezone: string): number {
  try {
    const now = new Date();
    // 获取本地时间（格林尼治时间）的字符串，格式如 "1/25/2025, 10:00:00 AM"
    const localTimeString = now.toLocaleString('en-US', { timeZone: targetTimezone });
    // 将该字符串转回 Date 对象。此时JS引擎会用本地时区来解析它
    const targetDate = new Date(localTimeString);
    // 计算本地当前时间与目标时区时间的毫秒差
    const diff = now.getTime() - targetDate.getTime();
    // 将毫秒差转换为小时并四舍五入到最近的半小时
    return Math.round(diff / (1000 * 60 * 30)) / 2;
  } catch (e) {
    console.error(`Invalid timezone provided: ${targetTimezone}`);
    return 0; // 如果时区名称错误，返回0
  }
}

/**
 * 获取所有大洲的唯一列表
 */
export const getContinents = () => {
  const continents = new Set(COUNTRY_DATA.map(c => c.continent_cn));
  return Array.from(continents);
};
