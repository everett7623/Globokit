
// 名称: 全球国家信息查询
// 描述: 提供全球国家和地区的详细信息，包括代码、区号、时区、外贸相关信息等
// 路径: seedtool/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-25

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

// 数据来源: 结合了多个公开数据集，并进行了整理
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
    power_plug: "C/D",
    voltage: "230V"
  },
  { 
    name_cn: "肯尼亚", 
    name_en: "Kenya", 
    iso2: "KE", 
    iso3: "KEN", 
    dial_code: "+254", 
    capital_cn: "内罗毕", 
    capital_en: "Nairobi", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".ke", 
    timezone: "Africa/Nairobi", 
    currency_code: "KES", 
    currency_name_cn: "肯尼亚先令",
    currency_symbol: "KSh",
    language_cn: ["斯瓦希里语", "英语"],
    language_en: ["Swahili", "English"],
    religion: ["基督教", "伊斯兰教", "传统宗教"],
    area_km2: 580367,
    population: 53800000,
    major_ports: ["蒙巴萨港", "拉穆港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "握手问候",
      "尊重年长者",
      "时间观念改善中",
      "英语通用"
    ],
    major_holidays: ["新年(1月1日)", "劳动节(5月1日)", "独立日(12月12日)", "圣诞节(12月25日)"],
    trade_notes: [
      "东非贸易中心",
      "英语优势",
      "移动支付发达",
      "基础设施改善中"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "埃塞俄比亚", 
    name_en: "Ethiopia", 
    iso2: "ET", 
    iso3: "ETH", 
    dial_code: "+251", 
    capital_cn: "亚的斯亚贝巴", 
    capital_en: "Addis Ababa", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".et", 
    timezone: "Africa/Addis_Ababa", 
    currency_code: "ETB", 
    currency_name_cn: "埃塞俄比亚比尔",
    currency_symbol: "Br",
    language_cn: ["阿姆哈拉语"],
    language_en: ["Amharic"],
    religion: ["基督教", "伊斯兰教"],
    area_km2: 1104300,
    population: 115000000,
    major_ports: [],
    business_hours: "周一至周五 8:30-17:30",
    business_etiquette: [
      "尊重传统",
      "时间观念灵活",
      "咖啡仪式重要",
      "避免直接拒绝"
    ],
    major_holidays: ["新年(9月11日)", "圣诞节(1月7日)", "复活节", "独立日(5月28日)"],
    trade_notes: [
      "咖啡原产地",
      "基础设施发展快",
      "官僚程序多",
      "使用独特历法"
    ],
    driving_side: "right",
    power_plug: "C/E/F",
    voltage: "220V"
  },
  { 
    name_cn: "加纳", 
    name_en: "Ghana", 
    iso2: "GH", 
    iso3: "GHA", 
    dial_code: "+233", 
    capital_cn: "阿克拉", 
    capital_en: "Accra", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".gh", 
    timezone: "Africa/Accra", 
    currency_code: "GHS", 
    currency_name_cn: "加纳塞地",
    currency_symbol: "₵",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教", "伊斯兰教", "传统宗教"],
    area_km2: 238533,
    population: 31100000,
    major_ports: ["特马港", "塔科拉迪港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "握手重要",
      "尊重长者",
      "时间观念灵活",
      "正式称呼"
    ],
    major_holidays: ["新年(1月1日)", "独立日(3月6日)", "劳动节(5月1日)", "圣诞节(12月25日)"],
    trade_notes: [
      "可可出口大国",
      "英语官方语言",
      "民主稳定",
      "手续繁琐"
    ],
    driving_side: "right",
    power_plug: "D/G",
    voltage: "230V"
  },
  { 
    name_cn: "乌克兰", 
    name_en: "Ukraine", 
    iso2: "UA", 
    iso3: "UKR", 
    dial_code: "+380", 
    capital_cn: "基辅", 
    capital_en: "Kyiv", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".ua", 
    timezone: "Europe/Kiev", 
    currency_code: "UAH", 
    currency_name_cn: "乌克兰格里夫纳",
    currency_symbol: "₴",
    language_cn: ["乌克兰语"],
    language_en: ["Ukrainian"],
    religion: ["东正教", "天主教"],
    area_km2: 603550,
    population: 41000000,
    major_ports: ["敖德萨港", "南方港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "握手和眼神接触",
      "正式称呼",
      "耐心重要",
      "小礼物受欢迎"
    ],
    major_holidays: ["新年(1月1日)", "东正教圣诞节(1月7日)", "独立日(8月24日)"],
    trade_notes: [
      "农业大国",
      "IT产业发展",
      "官僚主义存在",
      "当前局势复杂"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "白俄罗斯", 
    name_en: "Belarus", 
    iso2: "BY", 
    iso3: "BLR", 
    dial_code: "+375", 
    capital_cn: "明斯克", 
    capital_en: "Minsk", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".by", 
    timezone: "Europe/Minsk", 
    currency_code: "BYN", 
    currency_name_cn: "白俄罗斯卢布",
    currency_symbol: "Br",
    language_cn: ["白俄罗斯语", "俄语"],
    language_en: ["Belarusian", "Russian"],
    religion: ["东正教", "天主教"],
    area_km2: 207600,
    population: 9400000,
    major_ports: [],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "正式保守",
      "等级分明",
      "耐心必要",
      "避免政治话题"
    ],
    major_holidays: ["新年(1月1日)", "东正教圣诞节(1月7日)", "独立日(7月3日)"],
    trade_notes: [
      "工业基础好",
      "俄语主导",
      "国家控制强",
      "决策集中"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "古巴", 
    name_en: "Cuba", 
    iso2: "CU", 
    iso3: "CUB", 
    dial_code: "+53", 
    capital_cn: "哈瓦那", 
    capital_en: "Havana", 
    continent_cn: "北美洲", 
    continent_en: "North America", 
    tld: ".cu", 
    timezone: "America/Havana", 
    currency_code: "CUP", 
    currency_name_cn: "古巴比索",
    currency_symbol: "$",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "无宗教"],
    area_km2: 109884,
    population: 11300000,
    major_ports: ["哈瓦那港", "圣地亚哥港"],
    business_hours: "周一至周五 8:30-17:30",
    business_etiquette: [
      "个人关系重要",
      "时间观念灵活",
      "官僚程序复杂",
      "现金交易多"
    ],
    major_holidays: ["解放日(1月1日)", "劳动节(5月1日)", "革命日(7月26日)"],
    trade_notes: [
      "经济体制特殊",
      "美元流通",
      "基础设施老旧",
      "旅游业重要"
    ],
    driving_side: "right",
    power_plug: "A/B/C/L",
    voltage: "110V/220V"
  },
  { 
    name_cn: "牙买加", 
    name_en: "Jamaica", 
    iso2: "JM", 
    iso3: "JAM", 
    dial_code: "+1-876", 
    capital_cn: "金斯敦", 
    capital_en: "Kingston", 
    continent_cn: "北美洲", 
    continent_en: "North America", 
    tld: ".jm", 
    timezone: "America/Jamaica", 
    currency_code: "JMD", 
    currency_name_cn: "牙买加元",
    currency_symbol: "J$",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教"],
    area_km2: 10991,
    population: 2700000,
    major_ports: ["金斯敦港", "蒙特哥贝港"],
    business_hours: "周一至周五 8:30-16:30",
    business_etiquette: [
      "轻松友好",
      "时间观念灵活",
      "个人关系重要",
      "避免催促"
    ],
    major_holidays: ["新年(1月1日)", "独立日(8月6日)", "圣诞节(12月25日)"],
    trade_notes: [
      "旅游业发达",
      "英语优势",
      "音乐文化重要",
      "商务较非正式"
    ],
    driving_side: "left",
    power_plug: "A/B",
    voltage: "110V"
  },
  { 
    name_cn: "冰岛", 
    name_en: "Iceland", 
    iso2: "IS", 
    iso3: "ISL", 
    dial_code: "+354", 
    capital_cn: "雷克雅未克", 
    capital_en: "Reykjavik", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".is", 
    timezone: "Atlantic/Reykjavik", 
    currency_code: "ISK", 
    currency_name_cn: "冰岛克朗",
    currency_symbol: "kr",
    language_cn: ["冰岛语"],
    language_en: ["Icelandic"],
    religion: ["基督教路德宗"],
    area_km2: 103000,
    population: 370000,
    major_ports: ["雷克雅未克港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "平等非正式",
      "准时重要",
      "直接坦率",
      "环保意识强"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "国庆日(6月17日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "渔业发达",
      "清洁能源",
      "英语普及",
      "创新精神"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "卢森堡", 
    name_en: "Luxembourg", 
    iso2: "LU", 
    iso3: "LUX", 
    dial_code: "+352", 
    capital_cn: "卢森堡市", 
    capital_en: "Luxembourg City", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".lu", 
    timezone: "Europe/Luxembourg", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["卢森堡语", "法语", "德语"],
    language_en: ["Luxembourgish", "French", "German"],
    religion: ["天主教"],
    area_km2: 2586,
    population: 640000,
    major_ports: [],
    business_hours: "周一至周五 8:30-17:30",
    business_etiquette: [
      "多语言能力",
      "正式保守",
      "准时关键",
      "国际化程度高"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "国庆日(6月23日)", "圣诞节(12月25日)"],
    trade_notes: [
      "金融中心",
      "多语言优势",
      "欧盟机构所在地",
      "生活成本高"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "马耳他", 
    name_en: "Malta", 
    iso2: "MT", 
    iso3: "MLT", 
    dial_code: "+356", 
    capital_cn: "瓦莱塔", 
    capital_en: "Valletta", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".mt", 
    timezone: "Europe/Malta", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["马耳他语", "英语"],
    language_en: ["Maltese", "English"],
    religion: ["天主教"],
    area_km2: 316,
    population: 520000,
    major_ports: ["瓦莱塔港", "马尔萨什洛克港"],
    business_hours: "周一至周五 8:30-17:00",
    business_etiquette: [
      "英语通用",
      "地中海文化",
      "家族企业多",
      "关系重要"
    ],
    major_holidays: ["新年(1月1日)", "圣约瑟夫节(3月19日)", "独立日(9月21日)", "圣诞节(12月25日)"],
    trade_notes: [
      "旅游业发达",
      "金融服务业",
      "英语优势大",
      "欧盟成员国"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "230V"
  },
  { 
    name_cn: "塞浦路斯", 
    name_en: "Cyprus", 
    iso2: "CY", 
    iso3: "CYP", 
    dial_code: "+357", 
    capital_cn: "尼科西亚", 
    capital_en: "Nicosia", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".cy", 
    timezone: "Asia/Nicosia", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["希腊语", "土耳其语"],
    language_en: ["Greek", "Turkish"],
    religion: ["东正教", "伊斯兰教"],
    area_km2: 9251,
    population: 1200000,
    major_ports: ["利马索尔港", "拉纳卡港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "英语广泛使用",
      "地中海风格",
      "时间观念灵活",
      "社交重要"
    ],
    major_holidays: ["新年(1月1日)", "独立日(10月1日)", "希腊国庆日(3月25日)", "圣诞节(12月25日)"],
    trade_notes: [
      "航运业发达",
      "金融服务",
      "旅游业重要",
      "南北分治"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "克罗地亚", 
    name_en: "Croatia", 
    iso2: "HR", 
    iso3: "HRV", 
    dial_code: "+385", 
    capital_cn: "萨格勒布", 
    capital_en: "Zagreb", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".hr", 
    timezone: "Europe/Zagreb", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["克罗地亚语"],
    language_en: ["Croatian"],
    religion: ["天主教"],
    area_km2: 56594,
    population: 4000000,
    major_ports: ["里耶卡港", "斯普利特港"],
    business_hours: "周一至周五 8:00-16:00",
    business_etiquette: [
      "正式保守",
      "准时重要",
      "等级观念",
      "避免个人话题"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "国庆日(6月25日)", "圣诞节(12月25日)"],
    trade_notes: [
      "旅游业发达",
      "造船业强",
      "欧盟成员",
      "德语有用"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "斯洛文尼亚", 
    name_en: "Slovenia", 
    iso2: "SI", 
    iso3: "SVN", 
    dial_code: "+386", 
    capital_cn: "卢布尔雅那", 
    capital_en: "Ljubljana", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".si", 
    timezone: "Europe/Ljubljana", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["斯洛文尼亚语"],
    language_en: ["Slovenian"],
    religion: ["天主教"],
    area_km2: 20273,
    population: 2100000,
    major_ports: ["科佩尔港"],
    business_hours: "周一至周五 8:00-16:00",
    business_etiquette: [
      "准时严格",
      "正式着装",
      "环保意识强",
      "质量导向"
    ],
    major_holidays: ["新年(1月1日)", "文化节(2月8日)", "国庆日(6月25日)", "圣诞节(12月25日)"],
    trade_notes: [
      "工业发达",
      "地理位置优越",
      "英语德语通用",
      "环保标准高"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "斯洛伐克", 
    name_en: "Slovakia", 
    iso2: "SK", 
    iso3: "SVK", 
    dial_code: "+421", 
    capital_cn: "布拉迪斯拉发", 
    capital_en: "Bratislava", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".sk", 
    timezone: "Europe/Bratislava", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["斯洛伐克语"],
    language_en: ["Slovak"],
    religion: ["天主教"],
    area_km2: 49035,
    population: 5500000,
    major_ports: ["布拉迪斯拉发港"],
    business_hours: "周一至周五 8:00-16:30",
    business_etiquette: [
      "正式保守",
      "等级分明",
      "准时重要",
      "小礼物习俗"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "宪法日(9月1日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "汽车工业强",
      "欧元区成员",
      "德语有帮助",
      "决策较慢"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "230V"
  },
  { 
    name_cn: "爱沙尼亚", 
    name_en: "Estonia", 
    iso2: "EE", 
    iso3: "EST", 
    dial_code: "+372", 
    capital_cn: "塔林", 
    capital_en: "Tallinn", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".ee", 
    timezone: "Europe/Tallinn", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["爱沙尼亚语"],
    language_en: ["Estonian"],
    religion: ["无宗教", "基督教"],
    area_km2: 45228,
    population: 1300000,
    major_ports: ["塔林港", "穆加港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "准时重要",
      "直接坦率",
      "科技发达",
      "英语普及"
    ],
    major_holidays: ["新年(1月1日)", "独立日(2月24日)", "胜利日(6月23日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "数字化程度高",
      "创业环境好",
      "英语水平高",
      "北欧影响强"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "拉脱维亚", 
    name_en: "Latvia", 
    iso2: "LV", 
    iso3: "LVA", 
    dial_code: "+371", 
    capital_cn: "里加", 
    capital_en: "Riga", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".lv", 
    timezone: "Europe/Riga", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["拉脱维亚语"],
    language_en: ["Latvian"],
    religion: ["基督教路德宗", "天主教", "东正教"],
    area_km2: 64559,
    population: 1900000,
    major_ports: ["里加港", "文茨皮尔斯港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "准时关键",
      "正式保守",
      "小礼物传统",
      "避免夸张"
    ],
    major_holidays: ["新年(1月1日)", "仲夏节(6月23-24日)", "独立日(11月18日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "物流枢纽",
      "俄语仍有用",
      "木材出口",
      "欧盟成员"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "立陶宛", 
    name_en: "Lithuania", 
    iso2: "LT", 
    iso3: "LTU", 
    dial_code: "+370", 
    capital_cn: "维尔纽斯", 
    capital_en: "Vilnius", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".lt", 
    timezone: "Europe/Vilnius", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["立陶宛语"],
    language_en: ["Lithuanian"],
    religion: ["天主教"],
    area_km2: 65300,
    population: 2800000,
    major_ports: ["克莱佩达港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "正式礼貌",
      "准时重要",
      "称呼用姓氏",
      "避免个人话题"
    ],
    major_holidays: ["新年(1月1日)", "独立日(2月16日)", "复活节(3-4月)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "IT产业发展",
      "激光技术强",
      "英语普及中",
      "欧元区成员"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
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
 * 按地区分组国家
 */
export const getCountriesByContinent = () => {
  const grouped = new Map<string, typeof COUNTRY_DATA>();
  COUNTRY_DATA.forEach(country => {
    const continent = country.continent_cn;
    if (!grouped.has(continent)) {
      grouped.set(continent, []);
    }
    grouped.get(continent)!.push(country);
  });
  return grouped;
};

/**
 * 获取使用特定货币的国家
 */
export const getCountriesByCurrency = (currencyCode: string) => {
  return COUNTRY_DATA.filter(country => country.currency_code === currencyCode);
};

/*