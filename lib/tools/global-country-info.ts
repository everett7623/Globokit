// 名称: 全球国家信息查询
// 描述: 提供全球国家和地区的详细信息，包括代码、区号、时区、外贸相关信息等
// 路径: seedtool/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-28

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
    name_cn: "韩国", 
    name_en: "South Korea", 
    iso2: "KR", 
    iso3: "KOR", 
    dial_code: "+82", 
    capital_cn: "首尔", 
    capital_en: "Seoul", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".kr", 
    timezone: "Asia/Seoul", 
    currency_code: "KRW", 
    currency_name_cn: "韩元",
    currency_symbol: "₩",
    language_cn: ["韩语"],
    language_en: ["Korean"],
    religion: ["无宗教", "基督教", "佛教"],
    area_km2: 100210,
    population: 51700000,
    major_ports: ["釜山港", "仁川港", "光阳港", "蔚山港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "重视年龄和地位",
      "交换名片用双手",
      "避免直接拒绝",
      "聚餐文化重要"
    ],
    major_holidays: ["新年(1月1日)", "春节(1-2月)", "儿童节(5月5日)", "光复节(8月15日)", "中秋节(9-10月)"],
    trade_notes: [
      "决策速度快",
      "重视人际关系",
      "加班文化普遍",
      "等级观念较强"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "印度", 
    name_en: "India", 
    iso2: "IN", 
    iso3: "IND", 
    dial_code: "+91", 
    capital_cn: "新德里", 
    capital_en: "New Delhi", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".in", 
    timezone: "Asia/Kolkata", 
    currency_code: "INR", 
    currency_name_cn: "印度卢比",
    currency_symbol: "₹",
    language_cn: ["印地语", "英语"],
    language_en: ["Hindi", "English"],
    religion: ["印度教", "伊斯兰教", "基督教", "锡克教"],
    area_km2: 3287263,
    population: 1380000000,
    major_ports: ["孟买港", "金奈港", "加尔各答港", "科钦港"],
    business_hours: "周一至周六 10:00-18:00",
    business_etiquette: [
      "避免用左手",
      "注意素食者较多",
      "家庭和关系重要",
      "时间观念较灵活"
    ],
    major_holidays: ["共和国日(1月26日)", "洒红节(3月)", "排灯节(10-11月)", "独立日(8月15日)"],
    trade_notes: [
      "谈判可能需要耐心",
      "重视个人关系",
      "等级制度明显",
      "英语广泛使用"
    ],
    driving_side: "left",
    power_plug: "C/D/M",
    voltage: "230V"
  },
  { 
    name_cn: "新加坡", 
    name_en: "Singapore", 
    iso2: "SG", 
    iso3: "SGP", 
    dial_code: "+65", 
    capital_cn: "新加坡", 
    capital_en: "Singapore", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".sg", 
    timezone: "Asia/Singapore", 
    currency_code: "SGD", 
    currency_name_cn: "新加坡元",
    currency_symbol: "S$",
    language_cn: ["英语", "中文", "马来语", "泰米尔语"],
    language_en: ["English", "Chinese", "Malay", "Tamil"],
    religion: ["佛教", "基督教", "伊斯兰教", "道教", "印度教"],
    area_km2: 728,
    population: 5450000,
    major_ports: ["新加坡港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "准时非常重要",
      "尊重多元文化",
      "名片交换重要",
      "着装正式"
    ],
    major_holidays: ["新年(1月1日)", "春节(1-2月)", "开斋节", "屠妖节", "圣诞节(12月25日)"],
    trade_notes: [
      "效率极高",
      "法治严明",
      "英语为商务语言",
      "亚洲商务枢纽"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "230V"
  },
  { 
    name_cn: "泰国", 
    name_en: "Thailand", 
    iso2: "TH", 
    iso3: "THA", 
    dial_code: "+66", 
    capital_cn: "曼谷", 
    capital_en: "Bangkok", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".th", 
    timezone: "Asia/Bangkok", 
    currency_code: "THB", 
    currency_name_cn: "泰铢",
    currency_symbol: "฿",
    language_cn: ["泰语"],
    language_en: ["Thai"],
    religion: ["佛教", "伊斯兰教"],
    area_km2: 513120,
    population: 69800000,
    major_ports: ["曼谷港", "林查班港"],
    business_hours: "周一至周五 8:30-17:30",
    business_etiquette: [
      "避免触碰头部",
      "尊重王室",
      "保持微笑",
      "避免当众批评"
    ],
    major_holidays: ["新年(1月1日)", "万佛节(2月)", "宋干节(4月13-15日)", "国王生日(7月28日)"],
    trade_notes: [
      "重视面子",
      "避免冲突",
      "等级观念存在",
      "礼物文化重要"
    ],
    driving_side: "left",
    power_plug: "A/B/C",
    voltage: "230V"
  },
  { 
    name_cn: "马来西亚", 
    name_en: "Malaysia", 
    iso2: "MY", 
    iso3: "MYS", 
    dial_code: "+60", 
    capital_cn: "吉隆坡", 
    capital_en: "Kuala Lumpur", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".my", 
    timezone: "Asia/Kuala_Lumpur", 
    currency_code: "MYR", 
    currency_name_cn: "马来西亚林吉特",
    currency_symbol: "RM",
    language_cn: ["马来语", "英语", "中文"],
    language_en: ["Malay", "English", "Chinese"],
    religion: ["伊斯兰教", "佛教", "基督教", "印度教"],
    area_km2: 330803,
    population: 32400000,
    major_ports: ["巴生港", "槟城港", "柔佛港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "尊重多元文化",
      "避免左手",
      "注意宗教差异",
      "保持礼貌"
    ],
    major_holidays: ["新年(1月1日)", "春节(1-2月)", "开斋节", "屠妖节", "圣诞节(12月25日)"],
    trade_notes: [
      "英语广泛使用",
      "关系网重要",
      "决策较慢",
      "注意种族敏感"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "印度尼西亚", 
    name_en: "Indonesia", 
    iso2: "ID", 
    iso3: "IDN", 
    dial_code: "+62", 
    capital_cn: "雅加达", 
    capital_en: "Jakarta", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".id", 
    timezone: "Asia/Jakarta", 
    currency_code: "IDR", 
    currency_name_cn: "印尼盾",
    currency_symbol: "Rp",
    language_cn: ["印尼语"],
    language_en: ["Indonesian"],
    religion: ["伊斯兰教", "基督教", "印度教", "佛教"],
    area_km2: 1904569,
    population: 273500000,
    major_ports: ["丹戎不碌港", "泗水港", "三宝垄港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "避免左手",
      "尊重等级",
      "耐心重要",
      "避免直接冲突"
    ],
    major_holidays: ["新年(1月1日)", "开斋节", "宰牲节", "独立日(8月17日)"],
    trade_notes: [
      "关系优先",
      "决策缓慢",
      "避免施压",
      "注意宗教习俗"
    ],
    driving_side: "left",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "菲律宾", 
    name_en: "Philippines", 
    iso2: "PH", 
    iso3: "PHL", 
    dial_code: "+63", 
    capital_cn: "马尼拉", 
    capital_en: "Manila", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".ph", 
    timezone: "Asia/Manila", 
    currency_code: "PHP", 
    currency_name_cn: "菲律宾比索",
    currency_symbol: "₱",
    language_cn: ["菲律宾语", "英语"],
    language_en: ["Filipino", "English"],
    religion: ["天主教", "基督教", "伊斯兰教"],
    area_km2: 300000,
    population: 109600000,
    major_ports: ["马尼拉港", "苏比克港", "宿务港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "重视人际关系",
      "避免当众批评",
      "时间观念灵活",
      "尊重年长者"
    ],
    major_holidays: ["新年(1月1日)", "圣周(3-4月)", "独立日(6月12日)", "圣诞节(12月25日)"],
    trade_notes: [
      "英语优势",
      "关系网重要",
      "避免冲突",
      "家庭价值观强"
    ],
    driving_side: "right",
    power_plug: "A/B/C",
    voltage: "220V"
  },
  { 
    name_cn: "越南", 
    name_en: "Vietnam", 
    iso2: "VN", 
    iso3: "VNM", 
    dial_code: "+84", 
    capital_cn: "河内", 
    capital_en: "Hanoi", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".vn", 
    timezone: "Asia/Ho_Chi_Minh", 
    currency_code: "VND", 
    currency_name_cn: "越南盾",
    currency_symbol: "₫",
    language_cn: ["越南语"],
    language_en: ["Vietnamese"],
    religion: ["无宗教", "佛教", "天主教"],
    area_km2: 331212,
    population: 97300000,
    major_ports: ["西贡港", "海防港", "岘港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "尊重年长者",
      "名片双手递接",
      "避免过度直接",
      "建立关系重要"
    ],
    major_holidays: ["新年(1月1日)", "春节(1-2月)", "雄王节(农历3月10日)", "国庆日(9月2日)"],
    trade_notes: [
      "关系网络关键",
      "耐心很重要",
      "等级制度明显",
      "礼物交换常见"
    ],
    driving_side: "right",
    power_plug: "A/C/D",
    voltage: "220V"
  },
  { 
    name_cn: "阿联酋", 
    name_en: "United Arab Emirates", 
    iso2: "AE", 
    iso3: "ARE", 
    dial_code: "+971", 
    capital_cn: "阿布扎比", 
    capital_en: "Abu Dhabi", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".ae", 
    timezone: "Asia/Dubai", 
    currency_code: "AED", 
    currency_name_cn: "阿联酋迪拉姆",
    currency_symbol: "د.إ",
    language_cn: ["阿拉伯语", "英语"],
    language_en: ["Arabic", "English"],
    religion: ["伊斯兰教"],
    area_km2: 83600,
    population: 9890000,
    major_ports: ["迪拜港", "阿布扎比港", "沙迦港"],
    business_hours: "周日至周四 8:00-17:00",
    business_etiquette: [
      "避免左手",
      "尊重伊斯兰文化",
      "建立信任重要",
      "避免直接拒绝"
    ],
    major_holidays: ["新年(1月1日)", "开斋节", "宰牲节", "国庆日(12月2日)"],
    trade_notes: [
      "周五周六是周末",
      "斋月期间特殊",
      "重视个人关系",
      "决策可能缓慢"
    ],
    driving_side: "right",
    power_plug: "G",
    voltage: "230V"
  },
  { 
    name_cn: "沙特阿拉伯", 
    name_en: "Saudi Arabia", 
    iso2: "SA", 
    iso3: "SAU", 
    dial_code: "+966", 
    capital_cn: "利雅得", 
    capital_en: "Riyadh", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".sa", 
    timezone: "Asia/Riyadh", 
    currency_code: "SAR", 
    currency_name_cn: "沙特里亚尔",
    currency_symbol: "﷼",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教"],
    area_km2: 2149690,
    population: 34800000,
    major_ports: ["吉达港", "达曼港", "朱拜勒港"],
    business_hours: "周日至周四 8:00-15:00",
    business_etiquette: [
      "严格遵守伊斯兰教规",
      "男女商务分开",
      "避免左手",
      "耐心和尊重"
    ],
    major_holidays: ["开斋节", "宰牲节", "国庆日(9月23日)"],
    trade_notes: [
      "周五周六周末",
      "斋月特殊安排",
      "决策较慢",
      "个人关系关键"
    ],
    driving_side: "right",
    power_plug: "G",
    voltage: "230V"
  },
  { 
    name_cn: "土耳其", 
    name_en: "Turkey", 
    iso2: "TR", 
    iso3: "TUR", 
    dial_code: "+90", 
    capital_cn: "安卡拉", 
    capital_en: "Ankara", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".tr", 
    timezone: "Europe/Istanbul", 
    currency_code: "TRY", 
    currency_name_cn: "土耳其里拉",
    currency_symbol: "₺",
    language_cn: ["土耳其语"],
    language_en: ["Turkish"],
    religion: ["伊斯兰教"],
    area_km2: 783562,
    population: 84300000,
    major_ports: ["伊斯坦布尔港", "伊兹密尔港", "梅尔辛港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "建立个人关系",
      "茶文化重要",
      "避免左手",
      "尊重长者"
    ],
    major_holidays: ["新年(1月1日)", "国家主权日(4月23日)", "开斋节", "共和国日(10月29日)"],
    trade_notes: [
      "关系导向",
      "谈判需耐心",
      "等级制度存在",
      "好客文化"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "以色列", 
    name_en: "Israel", 
    iso2: "IL", 
    iso3: "ISR", 
    dial_code: "+972", 
    capital_cn: "耶路撒冷", 
    capital_en: "Jerusalem", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".il", 
    timezone: "Asia/Jerusalem", 
    currency_code: "ILS", 
    currency_name_cn: "以色列谢克尔",
    currency_symbol: "₪",
    language_cn: ["希伯来语", "阿拉伯语"],
    language_en: ["Hebrew", "Arabic"],
    religion: ["犹太教", "伊斯兰教", "基督教"],
    area_km2: 20770,
    population: 9300000,
    major_ports: ["海法港", "阿什杜德港"],
    business_hours: "周日至周四 8:00-17:00",
    business_etiquette: [
      "直接坦率",
      "非正式风格",
      "创新思维",
      "注意宗教差异"
    ],
    major_holidays: ["犹太新年(9-10月)", "赎罪日(9-10月)", "逾越节(3-4月)", "独立日(4-5月)"],
    trade_notes: [
      "周五周六安息日",
      "高科技发达",
      "英语普及",
      "安全考虑重要"
    ],
    driving_side: "right",
    power_plug: "C/H",
    voltage: "230V"
  },
  { 
    name_cn: "巴基斯坦", 
    name_en: "Pakistan", 
    iso2: "PK", 
    iso3: "PAK", 
    dial_code: "+92", 
    capital_cn: "伊斯兰堡", 
    capital_en: "Islamabad", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".pk", 
    timezone: "Asia/Karachi", 
    currency_code: "PKR", 
    currency_name_cn: "巴基斯坦卢比",
    currency_symbol: "₨",
    language_cn: ["乌尔都语", "英语"],
    language_en: ["Urdu", "English"],
    religion: ["伊斯兰教"],
    area_km2: 881913,
    population: 220900000,
    major_ports: ["卡拉奇港", "卡西姆港", "瓜达尔港"],
    business_hours: "周一至周五 9:00-17:00, 周六 9:00-13:00",
    business_etiquette: [
      "避免左手",
      "尊重伊斯兰习俗",
      "建立信任重要",
      "男女交往谨慎"
    ],
    major_holidays: ["新年(1月1日)", "巴基斯坦日(3月23日)", "独立日(8月14日)", "开斋节", "宰牲节"],
    trade_notes: [
      "关系网络关键",
      "决策层级多",
      "斋月特殊安排",
      "英语商务通用"
    ],
    driving_side: "left",
    power_plug: "C/D",
    voltage: "230V"
  },
  { 
    name_cn: "孟加拉国", 
    name_en: "Bangladesh", 
    iso2: "BD", 
    iso3: "BGD", 
    dial_code: "+880", 
    capital_cn: "达卡", 
    capital_en: "Dhaka", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".bd", 
    timezone: "Asia/Dhaka", 
    currency_code: "BDT", 
    currency_name_cn: "孟加拉塔卡",
    currency_symbol: "৳",
    language_cn: ["孟加拉语"],
    language_en: ["Bengali"],
    religion: ["伊斯兰教", "印度教"],
    area_km2: 147570,
    population: 164700000,
    major_ports: ["吉大港", "蒙格拉港"],
    business_hours: "周日至周四 9:00-17:00",
    business_etiquette: [
      "尊重年长者",
      "避免左手",
      "建立关系重要",
      "耐心必要"
    ],
    major_holidays: ["新年(1月1日)", "独立日(3月26日)", "孟加拉新年(4月14日)", "开斋节", "杜尔加女神节"],
    trade_notes: [
      "纺织业发达",
      "等级制度明显",
      "决策缓慢",
      "个人关系优先"
    ],
    driving_side: "left",
    power_plug: "C/D/G/K",
    voltage: "220V"
  },
  { 
    name_cn: "斯里兰卡", 
    name_en: "Sri Lanka", 
    iso2: "LK", 
    iso3: "LKA", 
    dial_code: "+94", 
    capital_cn: "科伦坡", 
    capital_en: "Colombo", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".lk", 
    timezone: "Asia/Colombo", 
    currency_code: "LKR", 
    currency_name_cn: "斯里兰卡卢比",
    currency_symbol: "Rs",
    language_cn: ["僧伽罗语", "泰米尔语"],
    language_en: ["Sinhala", "Tamil"],
    religion: ["佛教", "印度教", "伊斯兰教", "基督教"],
    area_km2: 65610,
    population: 21900000,
    major_ports: ["科伦坡港", "汉班托塔港"],
    business_hours: "周一至周五 8:30-17:00",
    business_etiquette: [
      "尊重等级",
      "避免用左手",
      "保守着装",
      "建立关系重要"
    ],
    major_holidays: ["新年(1月1日)", "独立日(2月4日)", "泰米尔新年(4月)", "卫塞节(5月)", "圣诞节(12月25日)"],
    trade_notes: [
      "茶叶出口大国",
      "英语广泛使用",
      "官僚程序多",
      "时间观念灵活"
    ],
    driving_side: "left",
    power_plug: "D/G",
    voltage: "230V"
  },
  { 
    name_cn: "尼泊尔", 
    name_en: "Nepal", 
    iso2: "NP", 
    iso3: "NPL", 
    dial_code: "+977", 
    capital_cn: "加德满都", 
    capital_en: "Kathmandu", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".np", 
    timezone: "Asia/Kathmandu", 
    currency_code: "NPR", 
    currency_name_cn: "尼泊尔卢比",
    currency_symbol: "₨",
    language_cn: ["尼泊尔语"],
    language_en: ["Nepali"],
    religion: ["印度教", "佛教"],
    area_km2: 147516,
    population: 29100000,
    major_ports: [],
    business_hours: "周日至周五 10:00-17:00",
    business_etiquette: [
      "双手合十问候",
      "尊重宗教习俗",
      "避免用左手",
      "保守着装"
    ],
    major_holidays: ["新年(1月1日)", "共和国日(5月29日)", "宪法日(9月20日)", "德赛节(10月)"],
    trade_notes: [
      "内陆国家依赖印度",
      "基础设施薄弱",
      "官僚程序复杂",
      "现金交易为主"
    ],
    driving_side: "left",
    power_plug: "C/D/M",
    voltage: "230V"
  },
  { 
    name_cn: "不丹", 
    name_en: "Bhutan", 
    iso2: "BT", 
    iso3: "BTN", 
    dial_code: "+975", 
    capital_cn: "廷布", 
    capital_en: "Thimphu", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".bt", 
    timezone: "Asia/Thimphu", 
    currency_code: "BTN", 
    currency_name_cn: "不丹努尔特鲁姆",
    currency_symbol: "Nu.",
    language_cn: ["宗卡语"],
    language_en: ["Dzongkha"],
    religion: ["佛教", "印度教"],
    area_km2: 38394,
    population: 771600,
    major_ports: [],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "重视环保和幸福",
      "尊重佛教传统",
      "正式场合穿传统服装",
      "避免吸烟"
    ],
    major_holidays: ["国王生日(2月21-23日)", "不丹新年(2-3月)", "国庆日(12月17日)"],
    trade_notes: [
      "重视国民幸福总值",
      "旅游业受限制",
      "水电出口重要",
      "与印度关系密切"
    ],
    driving_side: "left",
    power_plug: "C/D/F/G",
    voltage: "230V"
  },
  { 
    name_cn: "缅甸", 
    name_en: "Myanmar", 
    iso2: "MM", 
    iso3: "MMR", 
    dial_code: "+95", 
    capital_cn: "内比都", 
    capital_en: "Naypyidaw", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".mm", 
    timezone: "Asia/Yangon", 
    currency_code: "MMK", 
    currency_name_cn: "缅甸元",
    currency_symbol: "K",
    language_cn: ["缅甸语"],
    language_en: ["Burmese"],
    religion: ["佛教", "基督教", "伊斯兰教"],
    area_km2: 676578,
    population: 54400000,
    major_ports: ["仰光港", "毛淡棉港"],
    business_hours: "周一至周五 9:30-16:30",
    business_etiquette: [
      "尊重佛教传统",
      "避免触碰头部",
      "脱鞋进入某些场所",
      "保持礼貌谦逊"
    ],
    major_holidays: ["新年(1月1日)", "独立日(1月4日)", "泼水节(4月)", "烈士节(7月19日)"],
    trade_notes: [
      "政治环境复杂",
      "基础设施发展中",
      "现金交易普遍",
      "关系网络重要"
    ],
    driving_side: "right",
    power_plug: "C/D/F/G",
    voltage: "230V"
  },
  { 
    name_cn: "老挝", 
    name_en: "Laos", 
    iso2: "LA", 
    iso3: "LAO", 
    dial_code: "+856", 
    capital_cn: "万象", 
    capital_en: "Vientiane", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".la", 
    timezone: "Asia/Vientiane", 
    currency_code: "LAK", 
    currency_name_cn: "老挝基普",
    currency_symbol: "₭",
    language_cn: ["老挝语"],
    language_en: ["Lao"],
    religion: ["佛教"],
    area_km2: 236800,
    population: 7270000,
    major_ports: [],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "双手合十问候",
      "尊重佛教传统",
      "避免公开批评",
      "保持冷静耐心"
    ],
    major_holidays: ["新年(1月1日)", "老挝新年(4月13-15日)", "国庆日(12月2日)"],
    trade_notes: [
      "内陆国家",
      "基础设施有限",
      "与中国贸易增长",
      "决策过程缓慢"
    ],
    driving_side: "right",
    power_plug: "A/B/C/E/F",
    voltage: "230V"
  },
  { 
    name_cn: "柬埔寨", 
    name_en: "Cambodia", 
    iso2: "KH", 
    iso3: "KHM", 
    dial_code: "+855", 
    capital_cn: "金边", 
    capital_en: "Phnom Penh", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".kh", 
    timezone: "Asia/Phnom_Penh", 
    currency_code: "KHR", 
    currency_name_cn: "柬埔寨瑞尔",
    currency_symbol: "៛",
    language_cn: ["高棉语"],
    language_en: ["Khmer"],
    religion: ["佛教"],
    area_km2: 181035,
    population: 16700000,
    major_ports: ["西哈努克港", "金边港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "双手合十问候",
      "尊重年长者",
      "避免触碰头部",
      "保持微笑"
    ],
    major_holidays: ["新年(1月1日)", "高棉新年(4月13-15日)", "独立日(11月9日)", "水节(11月)"],
    trade_notes: [
      "美元广泛使用",
      "纺织业重要",
      "基础设施改善中",
      "与中国关系密切"
    ],
    driving_side: "right",
    power_plug: "A/C/G",
    voltage: "230V"
  },
  { 
    name_cn: "文莱", 
    name_en: "Brunei", 
    iso2: "BN", 
    iso3: "BRN", 
    dial_code: "+673", 
    capital_cn: "斯里巴加湾市", 
    capital_en: "Bandar Seri Begawan", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".bn", 
    timezone: "Asia/Brunei", 
    currency_code: "BND", 
    currency_name_cn: "文莱元",
    currency_symbol: "$",
    language_cn: ["马来语"],
    language_en: ["Malay"],
    religion: ["伊斯兰教"],
    area_km2: 5765,
    population: 437500,
    major_ports: ["摩拉港"],
    business_hours: "周一至周四、周六 8:00-17:00",
    business_etiquette: [
      "严格遵守伊斯兰教规",
      "避免用左手",
      "正式着装",
      "尊重苏丹"
    ],
    major_holidays: ["新年(1月1日)", "国庆日(2月23日)", "苏丹生日(7月15日)", "开斋节"],
    trade_notes: [
      "石油天然气经济",
      "禁酒令严格",
      "周五祈祷时间",
      "政府主导经济"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "东帝汶", 
    name_en: "Timor-Leste", 
    iso2: "TL", 
    iso3: "TLS", 
    dial_code: "+670", 
    capital_cn: "帝力", 
    capital_en: "Dili", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".tl", 
    timezone: "Asia/Dili", 
    currency_code: "USD", 
    currency_name_cn: "美元",
    currency_symbol: "$",
    language_cn: ["德顿语", "葡萄牙语"],
    language_en: ["Tetum", "Portuguese"],
    religion: ["天主教"],
    area_km2: 14874,
    population: 1318000,
    major_ports: ["帝力港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "握手问候",
      "尊重天主教传统",
      "时间观念灵活",
      "葡语有优势"
    ],
    major_holidays: ["新年(1月1日)", "独立恢复日(5月20日)", "独立公投日(8月30日)", "圣诞节(12月25日)"],
    trade_notes: [
      "石油依赖经济",
      "基础设施薄弱",
      "美元为官方货币",
      "发展潜力大"
    ],
    driving_side: "left",
    power_plug: "C/E/F/I",
    voltage: "220V"
  },
  { 
    name_cn: "马尔代夫", 
    name_en: "Maldives", 
    iso2: "MV", 
    iso3: "MDV", 
    dial_code: "+960", 
    capital_cn: "马累", 
    capital_en: "Malé", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".mv", 
    timezone: "Indian/Maldives", 
    currency_code: "MVR", 
    currency_name_cn: "马尔代夫拉菲亚",
    currency_symbol: "Rf",
    language_cn: ["迪维希语"],
    language_en: ["Dhivehi"],
    religion: ["伊斯兰教"],
    area_km2: 298,
    population: 540500,
    major_ports: ["马累港"],
    business_hours: "周日至周四 8:00-16:00",
    business_etiquette: [
      "严格遵守伊斯兰教规",
      "禁酒",
      "保守着装",
      "避免公开亲密行为"
    ],
    major_holidays: ["新年(1月1日)", "独立日(7月26日)", "共和国日(11月11日)", "开斋节"],
    trade_notes: [
      "旅游业为主",
      "进口依赖严重",
      "环保要求高",
      "岛屿物流复杂"
    ],
    driving_side: "left",
    power_plug: "C/D/G/J/K/L",
    voltage: "230V"
  },
  { 
    name_cn: "哈萨克斯坦", 
    name_en: "Kazakhstan", 
    iso2: "KZ", 
    iso3: "KAZ", 
    dial_code: "+7", 
    capital_cn: "阿斯塔纳", 
    capital_en: "Astana", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".kz", 
    timezone: "Asia/Almaty", 
    currency_code: "KZT", 
    currency_name_cn: "哈萨克斯坦坚戈",
    currency_symbol: "₸",
    language_cn: ["哈萨克语", "俄语"],
    language_en: ["Kazakh", "Russian"],
    religion: ["伊斯兰教", "基督教"],
    area_km2: 2724900,
    population: 18800000,
    major_ports: ["阿克套港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "握手问候",
      "重视年龄和地位",
      "款待文化重要",
      "耐心和尊重"
    ],
    major_holidays: ["新年(1月1日)", "独立日(12月16日)", "纳吾肉孜节(3月21日)"],
    trade_notes: [
      "石油资源丰富",
      "俄语商务通用",
      "关系网络重要",
      "官僚程序存在"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "乌兹别克斯坦", 
    name_en: "Uzbekistan", 
    iso2: "UZ", 
    iso3: "UZB", 
    dial_code: "+998", 
    capital_cn: "塔什干", 
    capital_en: "Tashkent", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".uz", 
    timezone: "Asia/Tashkent", 
    currency_code: "UZS", 
    currency_name_cn: "乌兹别克斯坦索姆",
    currency_symbol: "so'm",
    language_cn: ["乌兹别克语"],
    language_en: ["Uzbek"],
    religion: ["伊斯兰教"],
    area_km2: 447400,
    population: 34000000,
    major_ports: [],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "尊重长者",
      "款待重要",
      "避免左手",
      "建立信任关键"
    ],
    major_holidays: ["新年(1月1日)", "纳吾肉孜节(3月21日)", "独立日(9月1日)", "宪法日(12月8日)"],
    trade_notes: [
      "棉花出口大国",
      "俄语仍通用",
      "官僚主义存在",
      "现金交易多"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "吉尔吉斯斯坦", 
    name_en: "Kyrgyzstan", 
    iso2: "KG", 
    iso3: "KGZ", 
    dial_code: "+996", 
    capital_cn: "比什凯克", 
    capital_en: "Bishkek", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".kg", 
    timezone: "Asia/Bishkek", 
    currency_code: "KGS", 
    currency_name_cn: "吉尔吉斯斯坦索姆",
    currency_symbol: "с",
    language_cn: ["吉尔吉斯语", "俄语"],
    language_en: ["Kyrgyz", "Russian"],
    religion: ["伊斯兰教", "基督教"],
    area_km2: 199951,
    population: 6600000,
    major_ports: [],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "热情好客",
      "尊重传统",
      "茶文化重要",
      "关系导向"
    ],
    major_holidays: ["新年(1月1日)", "国际妇女节(3月8日)", "纳吾肉孜节(3月21日)", "独立日(8月31日)"],
    trade_notes: [
      "黄金出口重要",
      "中国贸易增长",
      "基础设施发展中",
      "山地物流挑战"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "塔吉克斯坦", 
    name_en: "Tajikistan", 
    iso2: "TJ", 
    iso3: "TJK", 
    dial_code: "+992", 
    capital_cn: "杜尚别", 
    capital_en: "Dushanbe", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".tj", 
    timezone: "Asia/Dushanbe", 
    currency_code: "TJS", 
    currency_name_cn: "塔吉克斯坦索莫尼",
    currency_symbol: "ЅМ",
    language_cn: ["塔吉克语"],
    language_en: ["Tajik"],
    religion: ["伊斯兰教"],
    area_km2: 143100,
    population: 9500000,
    major_ports: [],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "尊重伊斯兰传统",
      "热情款待",
      "等级观念",
      "耐心重要"
    ],
    major_holidays: ["新年(1月1日)", "纳吾肉孜节(3月21日)", "独立日(9月9日)"],
    trade_notes: [
      "铝和棉花出口",
      "水电资源丰富",
      "基础设施薄弱",
      "依赖侨汇"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "土库曼斯坦", 
    name_en: "Turkmenistan", 
    iso2: "TM", 
    iso3: "TKM", 
    dial_code: "+993", 
    capital_cn: "阿什哈巴德", 
    capital_en: "Ashgabat", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".tm", 
    timezone: "Asia/Ashgabat", 
    currency_code: "TMT", 
    currency_name_cn: "土库曼斯坦马纳特",
    currency_symbol: "m",
    language_cn: ["土库曼语"],
    language_en: ["Turkmen"],
    religion: ["伊斯兰教"],
    area_km2: 488100,
    population: 6000000,
    major_ports: ["土库曼巴希港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "正式保守",
      "尊重传统",
      "避免政治话题",
      "礼物交换"
    ],
    major_holidays: ["新年(1月1日)", "独立日(10月27日)", "中立日(12月12日)"],
    trade_notes: [
      "天然气资源丰富",
      "国家控制经济",
      "签证困难",
      "现金经济"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "阿富汗", 
    name_en: "Afghanistan", 
    iso2: "AF", 
    iso3: "AFG", 
    dial_code: "+93", 
    capital_cn: "喀布尔", 
    capital_en: "Kabul", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".af", 
    timezone: "Asia/Kabul", 
    currency_code: "AFN", 
    currency_name_cn: "阿富汗尼",
    currency_symbol: "؋",
    language_cn: ["达里语", "普什图语"],
    language_en: ["Dari", "Pashto"],
    religion: ["伊斯兰教"],
    area_km2: 652230,
    population: 38900000,
    major_ports: [],
    business_hours: "周六至周三 8:00-16:00",
    business_etiquette: [
      "尊重伊斯兰传统",
      "男女分开",
      "建立信任缓慢",
      "避免左手"
    ],
    major_holidays: ["新年(3月21日)", "独立日(8月19日)", "开斋节", "宰牲节"],
    trade_notes: [
      "安全形势复杂",
      "现金经济",
      "基础设施薄弱",
      "部落影响大"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "伊朗", 
    name_en: "Iran", 
    iso2: "IR", 
    iso3: "IRN", 
    dial_code: "+98", 
    capital_cn: "德黑兰", 
    capital_en: "Tehran", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".ir", 
    timezone: "Asia/Tehran", 
    currency_code: "IRR", 
    currency_name_cn: "伊朗里亚尔",
    currency_symbol: "﷼",
    language_cn: ["波斯语"],
    language_en: ["Persian"],
    religion: ["伊斯兰教(什叶派)"],
    area_km2: 1648195,
    population: 83900000,
    major_ports: ["阿巴斯港", "伊玛目霍梅尼港"],
    business_hours: "周六至周三 8:00-16:00",
    business_etiquette: [
      "建立个人关系",
      "耐心谈判",
      "避免左手",
      "尊重伊斯兰习俗"
    ],
    major_holidays: ["诺鲁孜节(3月21日)", "伊斯兰革命日(2月11日)", "开斋节"],
    trade_notes: [
      "制裁影响贸易",
      "石油经济",
      "波斯语重要",
      "关系网络关键"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "伊拉克", 
    name_en: "Iraq", 
    iso2: "IQ", 
    iso3: "IRQ", 
    dial_code: "+964", 
    capital_cn: "巴格达", 
    capital_en: "Baghdad", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".iq", 
    timezone: "Asia/Baghdad", 
    currency_code: "IQD", 
    currency_name_cn: "伊拉克第纳尔",
    currency_symbol: "ع.د",
    language_cn: ["阿拉伯语", "库尔德语"],
    language_en: ["Arabic", "Kurdish"],
    religion: ["伊斯兰教"],
    area_km2: 438317,
    population: 40200000,
    major_ports: ["乌姆盖萨尔港", "巴士拉港"],
    business_hours: "周日至周四 8:00-15:00",
    business_etiquette: [
      "建立信任重要",
      "尊重部落传统",
      "避免左手",
      "耐心必要"
    ],
    major_holidays: ["新年(1月1日)", "军队日(1月6日)", "国庆日(10月3日)", "开斋节"],
    trade_notes: [
      "石油主导经济",
      "安全考虑重要",
      "现金交易普遍",
      "基础设施重建中"
    ],
    driving_side: "right",
    power_plug: "C/D/G",
    voltage: "230V"
  },
  { 
    name_cn: "叙利亚", 
    name_en: "Syria", 
    iso2: "SY", 
    iso3: "SYR", 
    dial_code: "+963", 
    capital_cn: "大马士革", 
    capital_en: "Damascus", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".sy", 
    timezone: "Asia/Damascus", 
    currency_code: "SYP", 
    currency_name_cn: "叙利亚镑",
    currency_symbol: "£",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教", "基督教"],
    area_km2: 185180,
    population: 17500000,
    major_ports: ["拉塔基亚港", "塔尔图斯港"],
    business_hours: "周日至周四 8:00-15:00",
    business_etiquette: [
      "关系优先",
      "款待文化",
      "避免政治话题",
      "耐心谈判"
    ],
    major_holidays: ["新年(1月1日)", "独立日(4月17日)", "烈士节(5月6日)", "开斋节"],
    trade_notes: [
      "战争影响严重",
      "制裁限制",
      "基础设施受损",
      "贸易风险高"
    ],
    driving_side: "right",
    power_plug: "C/E/L",
    voltage: "220V"
  },
  { 
    name_cn: "黎巴嫩", 
    name_en: "Lebanon", 
    iso2: "LB", 
    iso3: "LBN", 
    dial_code: "+961", 
    capital_cn: "贝鲁特", 
    capital_en: "Beirut", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".lb", 
    timezone: "Asia/Beirut", 
    currency_code: "LBP", 
    currency_name_cn: "黎巴嫩镑",
    currency_symbol: "ل.ل",
    language_cn: ["阿拉伯语", "法语"],
    language_en: ["Arabic", "French"],
    religion: ["伊斯兰教", "基督教"],
    area_km2: 10452,
    population: 6800000,
    major_ports: ["贝鲁特港", "的黎波里港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "多语言能力",
      "社交重要",
      "着装时尚",
      "灵活变通"
    ],
    major_holidays: ["新年(1月1日)", "劳动节(5月1日)", "独立日(11月22日)"],
    trade_notes: [
      "银行业发达",
      "法语英语通用",
      "关系导向强",
      "经济挑战多"
    ],
    driving_side: "right",
    power_plug: "C/D/G",
    voltage: "230V"
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
