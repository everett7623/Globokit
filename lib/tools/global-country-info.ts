// 名称: 全球国家信息查询
// 描述: 提供全球国家和地区的详细信息，包括代码、区号、时区、外贸相关信息等
// 路径: seedtool/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-26

export interface CountryInfo {
  // 基础信息
  name_cn: string;
  name_en: string;
  iso2: string;
  iso3: string;
  capital_cn: string;
  capital_en: string;
  continent_cn: string;
  continent_en: string;
  
  // 通讯信息
  dial_code: string;
  tld: string;
  timezone: string;
  
  // 文化信息
  currency_code: string;
  currency_name_cn: string;
  currency_symbol: string;
  language_cn: string[];
  language_en: string[];
  religion: string[];
  
  // 地理信息
  area_km2: number;
  population: number;
  
  // 外贸相关
  major_ports?: string[];
  business_hours?: string;
  business_etiquette?: string[];
  major_holidays?: string[];
  trade_notes?: string[];
  
  // 其他
  driving_side: 'left' | 'right';
  power_plug: string;
  voltage: string;
}

// 精简版数据用于测试
export const COUNTRY_DATA: CountryInfo[] = [
  { 
    name_cn: "中国", 
    name_en: "China", 
    iso2: "CN", 
    iso3: "CHN", 
    dial_code: "+86", 
    capital_cn: "北京", 
    capital_en: "Beijing", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".cn", 
    timezone: "Asia/Shanghai", 
    currency_code: "CNY", 
    currency_name_cn: "人民币",
    currency_symbol: "¥",
    language_cn: ["汉语", "普通话"],
    language_en: ["Chinese", "Mandarin"],
    religion: ["无宗教", "佛教", "道教", "基督教"],
    area_km2: 9596961,
    population: 1411000000,
    major_ports: ["上海港", "宁波舟山港", "深圳港", "广州港", "青岛港", "天津港", "大连港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "交换名片时双手递接",
      "初次见面握手即可",
      "避免谈论政治敏感话题",
      "商务宴请是建立关系的重要方式"
    ],
    major_holidays: ["春节(1-2月)", "清明节(4月)", "劳动节(5月1日)", "端午节(5-6月)", "中秋节(9-10月)", "国庆节(10月1-7日)"],
    trade_notes: [
      "注重建立长期合作关系",
      "重视面子和人情",
      "决策过程可能较长",
      "合同细节需要仔细确认"
    ],
    driving_side: "right",
    power_plug: "A/C/I",
    voltage: "220V"
  },
  { 
    name_cn: "美国", 
    name_en: "United States", 
    iso2: "US", 
    iso3: "USA", 
    dial_code: "+1", 
    capital_cn: "华盛顿", 
    capital_en: "Washington, D.C.", 
    continent_cn: "北美洲", 
    continent_en: "North America", 
    tld: ".us", 
    timezone: "America/New_York", 
    currency_code: "USD", 
    currency_name_cn: "美元",
    currency_symbol: "$",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教", "天主教", "犹太教", "无宗教"],
    area_km2: 9833517,
    population: 331900000,
    major_ports: ["洛杉矶港", "长滩港", "纽约新泽西港", "萨凡纳港", "休斯顿港", "西雅图港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "准时非常重要",
      "握手要有力",
      "直接坦率的沟通风格",
      "注重个人空间"
    ],
    major_holidays: ["新年(1月1日)", "独立日(7月4日)", "感恩节(11月第4个周四)", "圣诞节(12月25日)"],
    trade_notes: [
      "重视合同和法律条款",
      "决策速度较快",
      "注重效率和结果",
      "电子邮件是主要沟通方式"
    ],
    driving_side: "right",
    power_plug: "A/B",
    voltage: "120V"
  },
  { 
    name_cn: "日本", 
    name_en: "Japan", 
    iso2: "JP", 
    iso3: "JPN", 
    dial_code: "+81", 
    capital_cn: "东京", 
    capital_en: "Tokyo", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".jp", 
    timezone: "Asia/Tokyo", 
    currency_code: "JPY", 
    currency_name_cn: "日元",
    currency_symbol: "¥",
    language_cn: ["日语"],
    language_en: ["Japanese"],
    religion: ["神道教", "佛教", "无宗教"],
    area_km2: 377975,
    population: 125800000,
    major_ports: ["东京港", "横滨港", "名古屋港", "大阪港", "神户港", "千叶港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "交换名片(名刺)极其重要，双手递接",
      "鞠躬是基本礼仪",
      "避免直接说'不'",
      "重视集体决策",
      "守时是基本要求"
    ],
    major_holidays: ["新年(1月1-3日)", "黄金周(4月末-5月初)", "盂兰盆节(8月中旬)", "体育节(10月第2个周一)"],
    trade_notes: [
      "注重细节和品质",
      "决策过程较慢但执行彻底",
      "重视长期合作关系",
      "偏好面对面会议"
    ],
    driving_side: "left",
    power_plug: "A/B",
    voltage: "100V"
  },
  { 
    name_cn: "德国", 
    name_en: "Germany", 
    iso2: "DE", 
    iso3: "DEU", 
    dial_code: "+49", 
    capital_cn: "柏林", 
    capital_en: "Berlin", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".de", 
    timezone: "Europe/Berlin", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["德语"],
    language_en: ["German"],
    religion: ["基督教", "天主教", "无宗教"],
    area_km2: 357022,
    population: 83200000,
    major_ports: ["汉堡港", "不来梅港", "威廉港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "极其准时",
      "正式称呼(使用头衔)",
      "握手要坚定",
      "重视隐私"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "劳动节(5月1日)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "高度重视质量和标准",
      "喜欢详细的计划和文档",
      "决策基于数据和事实",
      "守时是商务基本要求"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "英国", 
    name_en: "United Kingdom", 
    iso2: "GB", 
    iso3: "GBR", 
    dial_code: "+44", 
    capital_cn: "伦敦", 
    capital_en: "London", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".uk", 
    timezone: "Europe/London", 
    currency_code: "GBP", 
    currency_name_cn: "英镑",
    currency_symbol: "£",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教", "无宗教", "伊斯兰教"],
    area_km2: 242495,
    population: 67500000,
    major_ports: ["费利克斯托港", "南安普顿港", "伦敦港", "利物浦港"],
    business_hours: "周一至周五 9:00-17:30",
    business_etiquette: [
      "保持礼貌和含蓄",
      "避免过于直接",
      "重视幽默感",
      "着装相对正式"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "春季银行假日(5月)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "重视传统和礼仪",
      "谈判风格较为间接",
      "决策可能需要时间",
      "下午茶文化仍然重要"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "230V"
  }
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
 * 获取指定时区与本地的时差（小时）
 */
export function getTimeDifference(targetTimezone: string): number {
  try {
    const now = new Date();
    const localTimeString = now.toLocaleString('en-US', { timeZone: targetTimezone });
    const targetDate = new Date(localTimeString);
    const diff = now.getTime() - targetDate.getTime();
    return Math.round(diff / (1000 * 60 * 30)) / 2;
  } catch (e) {
    console.error(`Invalid timezone provided: ${targetTimezone}`);
    return 0;
  }
}

/**
 * 获取所有大洲的唯一列表
 */
export const getContinents = () => {
  const continents = new Set(COUNTRY_DATA.map(c => c.continent_cn));
  return Array.from(continents);
};

/**
 * 获取所有货币的唯一列表
 */
export const getCurrencies = () => {
  const currencies = new Map<string, string>();
  COUNTRY_DATA.forEach(country => {
    if (country.currency_code && country.currency_name_cn) {
      currencies.set(country.currency_code, country.currency_name_cn);
    }
  });
  return Array.from(currencies.entries()).map(([code, name]) => ({ code, name }));
};

/**
 * 获取所有语言的唯一列表
 */
export const getLanguages = () => {
  const languages = new Set<string>();
  COUNTRY_DATA.forEach(country => {
    country.language_cn.forEach(lang => languages.add(lang));
  });
  return Array.from(languages).sort();
};

/**
 * 格式化人口数字
 */
export const formatPopulation = (population: number): string => {
  if (population >= 1e9) return `${(population / 1e9).toFixed(1)}B`;
  if (population >= 1e6) return `${(population / 1e6).toFixed(1)}M`;
  if (population >= 1e3) return `${(population / 1e3).toFixed(1)}K`;
  return population.toString();
};

/**
 * 格式化面积
 */
export const formatArea = (area: number): string => {
  return new Intl.NumberFormat('zh-CN').format(area) + ' km²';
};
