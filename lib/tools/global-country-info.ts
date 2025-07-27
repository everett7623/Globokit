// 名称: 全球国家信息查询
// 描述: 提供全球国家和地区的详细信息，包括代码、区号、时区、外贸相关信息等
// 路径: seedtool/lib/tools/global-country-info.ts
// 作者: Jensfrank
// 更新时间: 2025-07-27

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

/**
 * 获取使用特定语言的国家
 */
export const getCountriesByLanguage = (language: string) => {
  return COUNTRY_DATA.filter(country => 
    country.language_cn.includes(language) || country.language_en.includes(language)
  );
};

/**
 * 搜索国家
 */
export const searchCountries = (query: string) => {
  const term = query.toLowerCase();
  return COUNTRY_DATA.filter(country => {
    return (
      country.name_cn.toLowerCase().includes(term) ||
      country.name_en.toLowerCase().includes(term) ||
      country.iso2.toLowerCase().includes(term) ||
      country.iso3.toLowerCase().includes(term) ||
      country.capital_cn.toLowerCase().includes(term) ||
      country.capital_en.toLowerCase().includes(term) ||
      country.dial_code.includes(term) ||
      country.currency_code.toLowerCase().includes(term) ||
      country.language_cn.some(lang => lang.toLowerCase().includes(term)) ||
      country.language_en.some(lang => lang.toLowerCase().includes(term))
    );
  });
};

/**
 * 获取国家详细信息
 */
export const getCountryByCode = (code: string) => {
  return COUNTRY_DATA.find(country => 
    country.iso2 === code.toUpperCase() || country.iso3 === code.toUpperCase()
  );
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
};*
 * 获取使用特定语言的国家
 */
export const getCountriesByLanguage = (language: string) => {
  return COUNTRY_DATA.filter(country => 
    country.language_cn.includes(language) || country.language_en.includes(language)
  );
};

/**
 * 搜索国家
 */
export const searchCountries = (query: string) => {
  const term = query.toLowerCase();
  return COUNTRY_DATA.filter(country => {
    return (
      country.name_cn.toLowerCase().includes(term) ||
      country.name_en.toLowerCase().includes(term) ||
      country.iso2.toLowerCase().includes(term) ||
      country.iso3.toLowerCase().includes(term) ||
      country.capital_cn.toLowerCase().includes(term) ||
      country.capital_en.toLowerCase().includes(term) ||
      country.dial_code.includes(term) ||
      country.currency_code.toLowerCase().includes(term) ||
      country.language_cn.some(lang => lang.toLowerCase().includes(term)) ||
      country.language_en.some(lang => lang.toLowerCase().includes(term))
    );
  });
};

/**
 * 获取国家详细信息
 */
export const getCountryByCode = (code: string) => {
  return COUNTRY_DATA.find(country => 
    country.iso2 === code.toUpperCase() || country.iso3 === code.toUpperCase()
  );
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
};: "A/C/I",
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
  },
  { 
    name_cn: "法国", 
    name_en: "France", 
    iso2: "FR", 
    iso3: "FRA", 
    dial_code: "+33", 
    capital_cn: "巴黎", 
    capital_en: "Paris", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".fr", 
    timezone: "Europe/Paris", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["法语"],
    language_en: ["French"],
    religion: ["天主教", "无宗教", "伊斯兰教"],
    area_km2: 643801,
    population: 67400000,
    major_ports: ["马赛港", "勒阿弗尔港", "敦刻尔克港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "重视法语",
      "着装讲究",
      "午餐时间较长",
      "握手要轻"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "劳动节(5月1日)", "国庆日(7月14日)", "圣诞节(12月25日)"],
    trade_notes: [
      "重视个人关系",
      "决策层级分明",
      "午餐可能是商务活动",
      "8月份多数人度假"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "230V"
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
    name_cn: "巴西", 
    name_en: "Brazil", 
    iso2: "BR", 
    iso3: "BRA", 
    dial_code: "+55", 
    capital_cn: "巴西利亚", 
    capital_en: "Brasília", 
    continent_cn: "南美洲", 
    continent_en: "South America", 
    tld: ".br", 
    timezone: "America/Sao_Paulo", 
    currency_code: "BRL", 
    currency_name_cn: "巴西雷亚尔",
    currency_symbol: "R$",
    language_cn: ["葡萄牙语"],
    language_en: ["Portuguese"],
    religion: ["天主教", "基督教", "无宗教"],
    area_km2: 8515767,
    population: 212600000,
    major_ports: ["桑托斯港", "里约热内卢港", "巴拉那瓜港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "重视个人关系",
      "身体接触较多",
      "时间观念灵活",
      "着装因地区而异"
    ],
    major_holidays: ["新年(1月1日)", "狂欢节(2-3月)", "独立日(9月7日)", "圣诞节(12月25日)"],
    trade_notes: [
      "建立信任很重要",
      "决策可能较慢",
      "葡萄牙语是优势",
      "避免着急催促"
    ],
    driving_side: "right",
    power_plug: "C/N",
    voltage: "127V/220V"
  },
  { 
    name_cn: "俄罗斯", 
    name_en: "Russia", 
    iso2: "RU", 
    iso3: "RUS", 
    dial_code: "+7", 
    capital_cn: "莫斯科", 
    capital_en: "Moscow", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".ru", 
    timezone: "Europe/Moscow", 
    currency_code: "RUB", 
    currency_name_cn: "俄罗斯卢布",
    currency_symbol: "₽",
    language_cn: ["俄语"],
    language_en: ["Russian"],
    religion: ["东正教", "伊斯兰教", "无宗教"],
    area_km2: 17098242,
    population: 146000000,
    major_ports: ["圣彼得堡港", "新罗西斯克港", "符拉迪沃斯托克港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "握手要有力",
      "保持正式",
      "准备详细资料",
      "耐心很重要"
    ],
    major_holidays: ["新年(1月1-8日)", "祖国保卫者日(2月23日)", "胜利日(5月9日)", "俄罗斯日(6月12日)"],
    trade_notes: [
      "决策集中化",
      "重视个人关系",
      "谈判可能漫长",
      "书面协议重要"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "加拿大", 
    name_en: "Canada", 
    iso2: "CA", 
    iso3: "CAN", 
    dial_code: "+1", 
    capital_cn: "渥太华", 
    capital_en: "Ottawa", 
    continent_cn: "北美洲", 
    continent_en: "North America", 
    tld: ".ca", 
    timezone: "America/Toronto", 
    currency_code: "CAD", 
    currency_name_cn: "加拿大元",
    currency_symbol: "C$",
    language_cn: ["英语", "法语"],
    language_en: ["English", "French"],
    religion: ["基督教", "天主教", "无宗教"],
    area_km2: 9984670,
    population: 38000000,
    major_ports: ["温哥华港", "蒙特利尔港", "哈利法克斯港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "准时重要",
      "尊重多元文化",
      "较为非正式",
      "注意法语区差异"
    ],
    major_holidays: ["新年(1月1日)", "加拿大日(7月1日)", "感恩节(10月第2个周一)", "圣诞节(12月25日)"],
    trade_notes: [
      "注重环保和可持续",
      "决策相对民主",
      "重视工作生活平衡",
      "多元文化意识强"
    ],
    driving_side: "right",
    power_plug: "A/B",
    voltage: "120V"
  },
  { 
    name_cn: "澳大利亚", 
    name_en: "Australia", 
    iso2: "AU", 
    iso3: "AUS", 
    dial_code: "+61", 
    capital_cn: "堪培拉", 
    capital_en: "Canberra", 
    continent_cn: "大洋洲", 
    continent_en: "Oceania", 
    tld: ".au", 
    timezone: "Australia/Sydney", 
    currency_code: "AUD", 
    currency_name_cn: "澳大利亚元",
    currency_symbol: "A$",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教", "无宗教", "天主教"],
    area_km2: 7692024,
    population: 25700000,
    major_ports: ["悉尼港", "墨尔本港", "布里斯班港", "弗里曼特尔港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "非正式友好",
      "直接坦率",
      "准时但灵活",
      "重视平等"
    ],
    major_holidays: ["新年(1月1日)", "澳大利亚日(1月26日)", "复活节(3-4月)", "圣诞节(12月25日)"],
    trade_notes: [
      "商务风格轻松",
      "重视诚信",
      "决策较快",
      "夏季是12-2月"
    ],
    driving_side: "left",
    power_plug: "I",
    voltage: "230V"
  },
  { 
    name_cn: "墨西哥", 
    name_en: "Mexico", 
    iso2: "MX", 
    iso3: "MEX", 
    dial_code: "+52", 
    capital_cn: "墨西哥城", 
    capital_en: "Mexico City", 
    continent_cn: "北美洲", 
    continent_en: "North America", 
    tld: ".mx", 
    timezone: "America/Mexico_City", 
    currency_code: "MXN", 
    currency_name_cn: "墨西哥比索",
    currency_symbol: "$",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "基督教"],
    area_km2: 1964375,
    population: 128900000,
    major_ports: ["曼萨尼约港", "拉萨罗卡德纳斯港", "韦拉克鲁斯港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "重视个人关系",
      "时间观念灵活",
      "正式称呼重要",
      "家庭价值观强"
    ],
    major_holidays: ["新年(1月1日)", "宪法日(2月第1个周一)", "独立日(9月16日)", "亡灵节(11月1-2日)"],
    trade_notes: [
      "建立信任关键",
      "等级制度明显",
      "午餐时间较长",
      "西班牙语优势大"
    ],
    driving_side: "right",
    power_plug: "A/B",
    voltage: "127V"
  },
  { 
    name_cn: "意大利", 
    name_en: "Italy", 
    iso2: "IT", 
    iso3: "ITA", 
    dial_code: "+39", 
    capital_cn: "罗马", 
    capital_en: "Rome", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".it", 
    timezone: "Europe/Rome", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["意大利语"],
    language_en: ["Italian"],
    religion: ["天主教", "无宗教"],
    area_km2: 301340,
    population: 60300000,
    major_ports: ["热那亚港", "的里雅斯特港", "那不勒斯港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "着装讲究",
      "重视美食",
      "建立关系重要",
      "时间观念较灵活"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "解放日(4月25日)", "共和国日(6月2日)", "圣诞节(12月25日)"],
    trade_notes: [
      "重视风格和设计",
      "家族企业多",
      "南北差异大",
      "8月多数度假"
    ],
    driving_side: "right",
    power_plug: "C/F/L",
    voltage: "230V"
  },
  { 
    name_cn: "西班牙", 
    name_en: "Spain", 
    iso2: "ES", 
    iso3: "ESP", 
    dial_code: "+34", 
    capital_cn: "马德里", 
    capital_en: "Madrid", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".es", 
    timezone: "Europe/Madrid", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "无宗教"],
    area_km2: 505990,
    population: 47400000,
    major_ports: ["巴塞罗那港", "瓦伦西亚港", "阿尔赫西拉斯港"],
    business_hours: "周一至周五 9:00-14:00, 16:00-19:00",
    business_etiquette: [
      "个人关系优先",
      "午休时间长",
      "晚餐时间很晚",
      "避免催促"
    ],
    major_holidays: ["新年(1月1日)", "主显节(1月6日)", "圣周(3-4月)", "国庆日(10月12日)", "圣诞节(12月25日)"],
    trade_notes: [
      "决策可能较慢",
      "地区差异明显",
      "8月多数度假",
      "重视生活质量"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "荷兰", 
    name_en: "Netherlands", 
    iso2: "NL", 
    iso3: "NLD", 
    dial_code: "+31", 
    capital_cn: "阿姆斯特丹", 
    capital_en: "Amsterdam", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".nl", 
    timezone: "Europe/Amsterdam", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["荷兰语"],
    language_en: ["Dutch"],
    religion: ["无宗教", "天主教", "基督教"],
    area_km2: 41543,
    population: 17500000,
    major_ports: ["鹿特丹港", "阿姆斯特丹港"],
    business_hours: "周一至周五 9:00-17:30",
    business_etiquette: [
      "直接坦率",
      "准时严格",
      "平等意识强",
      "务实高效"
    ],
    major_holidays: ["新年(1月1日)", "国王日(4月27日)", "解放日(5月5日)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "决策民主",
      "英语水平高",
      "环保意识强",
      "注重工作效率"
    ],
    driving_side: "right",
    power_plug: "C/F",
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
    name_cn: "阿根廷", 
    name_en: "Argentina", 
    iso2: "AR", 
    iso3: "ARG", 
    dial_code: "+54", 
    capital_cn: "布宜诺斯艾利斯", 
    capital_en: "Buenos Aires", 
    continent_cn: "南美洲", 
    continent_en: "South America", 
    tld: ".ar", 
    timezone: "America/Argentina/Buenos_Aires", 
    currency_code: "ARS", 
    currency_name_cn: "阿根廷比索",
    currency_symbol: "$",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "基督教"],
    area_km2: 2780400,
    population: 45200000,
    major_ports: ["布宜诺斯艾利斯港", "罗萨里奥港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "重视个人关系",
      "着装正式",
      "晚餐时间很晚",
      "身体接触多"
    ],
    major_holidays: ["新年(1月1日)", "独立日(7月9日)", "圣诞节(12月25日)"],
    trade_notes: [
      "建立信任重要",
      "时间观念灵活",
      "等级制度存在",
      "避免催促"
    ],
    driving_side: "right",
    power_plug: "C/I",
    voltage: "220V"
  },
  { 
    name_cn: "南非", 
    name_en: "South Africa", 
    iso2: "ZA", 
    iso3: "ZAF", 
    dial_code: "+27", 
    capital_cn: "比勒陀利亚", 
    capital_en: "Pretoria", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".za", 
    timezone: "Africa/Johannesburg", 
    currency_code: "ZAR", 
    currency_name_cn: "南非兰特",
    currency_symbol: "R",
    language_cn: ["英语", "南非荷兰语", "祖鲁语"],
    language_en: ["English", "Afrikaans", "Zulu"],
    religion: ["基督教", "传统宗教", "伊斯兰教"],
    area_km2: 1221037,
    population: 59300000,
    major_ports: ["德班港", "开普敦港", "伊丽莎白港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "多元文化意识",
      "守时重要",
      "直接沟通",
      "尊重差异"
    ],
    major_holidays: ["新年(1月1日)", "人权日(3月21日)", "自由日(4月27日)", "圣诞节(12月25日)"],
    trade_notes: [
      "英语商务语言",
      "注意安全问题",
      "种族敏感性",
      "商务正式"
    ],
    driving_side: "left",
    power_plug: "M",
    voltage: "230V"
  },
  { 
    name_cn: "埃及", 
    name_en: "Egypt", 
    iso2: "EG", 
    iso3: "EGY", 
    dial_code: "+20", 
    capital_cn: "开罗", 
    capital_en: "Cairo", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".eg", 
    timezone: "Africa/Cairo", 
    currency_code: "EGP", 
    currency_name_cn: "埃及镑",
    currency_symbol: "£",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教", "基督教"],
    area_km2: 1001450,
    population: 102300000,
    major_ports: ["亚历山大港", "塞得港", "苏伊士港"],
    business_hours: "周日至周四 9:00-17:00",
    business_etiquette: [
      "建立关系优先",
      "耐心很重要",
      "避免左手",
      "尊重宗教"
    ],
    major_holidays: ["新年(1月1日)", "科普特圣诞节(1月7日)", "开斋节", "国庆日(7月23日)"],
    trade_notes: [
      "周五周六周末",
      "官僚程序多",
      "个人关系关键",
      "谈判需时间"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "220V"
  },
  { 
    name_cn: "尼日利亚", 
    name_en: "Nigeria", 
    iso2: "NG", 
    iso3: "NGA", 
    dial_code: "+234", 
    capital_cn: "阿布贾", 
    capital_en: "Abuja", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".ng", 
    timezone: "Africa/Lagos", 
    currency_code: "NGN", 
    currency_name_cn: "尼日利亚奈拉",
    currency_symbol: "₦",
    language_cn: ["英语"],
    language_en: ["English"],
    religion: ["基督教", "伊斯兰教", "传统宗教"],
    area_km2: 923768,
    population: 206100000,
    major_ports: ["拉各斯港", "哈科特港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "尊重年长者",
      "建立信任重要",
      "时间观念灵活",
      "注意宗教差异"
    ],
    major_holidays: ["新年(1月1日)", "独立日(10月1日)", "圣诞节(12月25日)"],
    trade_notes: [
      "关系网络重要",
      "谈判可能漫长",
      "等级制度明显",
      "面对面会议优先"
    ],
    driving_side: "right",
    power_plug: "D/G",
    voltage: "230V"
  },
  { 
    name_cn: "波兰", 
    name_en: "Poland", 
    iso2: "PL", 
    iso3: "POL", 
    dial_code: "+48", 
    capital_cn: "华沙", 
    capital_en: "Warsaw", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".pl", 
    timezone: "Europe/Warsaw", 
    currency_code: "PLN", 
    currency_name_cn: "波兰兹罗提",
    currency_symbol: "zł",
    language_cn: ["波兰语"],
    language_en: ["Polish"],
    religion: ["天主教", "东正教"],
    area_km2: 312696,
    population: 37800000,
    major_ports: ["格但斯克港", "格丁尼亚港", "什切青港"],
    business_hours: "周一至周五 8:00-16:00",
    business_etiquette: [
      "握手和眼神接触",
      "正式称呼",
      "准时重要",
      "小礼物受欢迎"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "宪法日(5月3日)", "独立日(11月11日)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "重视教育和头衔",
      "决策可能缓慢",
      "书面确认重要",
      "建立信任需时"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "230V"
  },
  { 
    name_cn: "瑞士", 
    name_en: "Switzerland", 
    iso2: "CH", 
    iso3: "CHE", 
    dial_code: "+41", 
    capital_cn: "伯尔尼", 
    capital_en: "Bern", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".ch", 
    timezone: "Europe/Zurich", 
    currency_code: "CHF", 
    currency_name_cn: "瑞士法郎",
    currency_symbol: "Fr",
    language_cn: ["德语", "法语", "意大利语", "罗曼什语"],
    language_en: ["German", "French", "Italian", "Romansh"],
    religion: ["基督教", "天主教", "无宗教"],
    area_km2: 41285,
    population: 8700000,
    major_ports: ["巴塞尔港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "极度准时",
      "保守正式",
      "重视隐私",
      "质量至上"
    ],
    major_holidays: ["新年(1月1-2日)", "复活节(3-4月)", "劳动节(5月1日)", "国庆日(8月1日)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "精确和效率",
      "高质量标准",
      "保密性强",
      "决策谨慎"
    ],
    driving_side: "right",
    power_plug: "J",
    voltage: "230V"
  },
  { 
    name_cn: "瑞典", 
    name_en: "Sweden", 
    iso2: "SE", 
    iso3: "SWE", 
    dial_code: "+46", 
    capital_cn: "斯德哥尔摩", 
    capital_en: "Stockholm", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".se", 
    timezone: "Europe/Stockholm", 
    currency_code: "SEK", 
    currency_name_cn: "瑞典克朗",
    currency_symbol: "kr",
    language_cn: ["瑞典语"],
    language_en: ["Swedish"],
    religion: ["基督教路德宗", "无宗教"],
    area_km2: 450295,
    population: 10400000,
    major_ports: ["哥德堡港", "斯德哥尔摩港", "马尔默港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "平等和非正式",
      "准时很重要",
      "避免夸耀",
      "环保意识强"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "仲夏节(6月)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "共识决策",
      "工作生活平衡",
      "创新开放",
      "英语水平高"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "挪威", 
    name_en: "Norway", 
    iso2: "NO", 
    iso3: "NOR", 
    dial_code: "+47", 
    capital_cn: "奥斯陆", 
    capital_en: "Oslo", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".no", 
    timezone: "Europe/Oslo", 
    currency_code: "NOK", 
    currency_name_cn: "挪威克朗",
    currency_symbol: "kr",
    language_cn: ["挪威语"],
    language_en: ["Norwegian"],
    religion: ["基督教路德宗", "无宗教"],
    area_km2: 323802,
    population: 5400000,
    major_ports: ["奥斯陆港", "卑尔根港", "斯塔万格港"],
    business_hours: "周一至周五 8:00-16:00",
    business_etiquette: [
      "平等主义",
      "非正式风格",
      "准时重要",
      "直接沟通"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "宪法日(5月17日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "工作生活平衡",
      "环保意识高",
      "决策民主",
      "夏季度假普遍"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "丹麦", 
    name_en: "Denmark", 
    iso2: "DK", 
    iso3: "DNK", 
    dial_code: "+45", 
    capital_cn: "哥本哈根", 
    capital_en: "Copenhagen", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".dk", 
    timezone: "Europe/Copenhagen", 
    currency_code: "DKK", 
    currency_name_cn: "丹麦克朗",
    currency_symbol: "kr",
    language_cn: ["丹麦语"],
    language_en: ["Danish"],
    religion: ["基督教路德宗", "无宗教"],
    area_km2: 43094,
    population: 5800000,
    major_ports: ["哥本哈根港", "奥胡斯港"],
    business_hours: "周一至周五 8:00-16:00",
    business_etiquette: [
      "非正式平等",
      "准时重要",
      "工作生活平衡",
      "直接但友好"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "宪法日(6月5日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "扁平化管理",
      "创新思维",
      "英语流利",
      "幸福感文化"
    ],
    driving_side: "right",
    power_plug: "C/E/F/K",
    voltage: "230V"
  },
  { 
    name_cn: "芬兰", 
    name_en: "Finland", 
    iso2: "FI", 
    iso3: "FIN", 
    dial_code: "+358", 
    capital_cn: "赫尔辛基", 
    capital_en: "Helsinki", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".fi", 
    timezone: "Europe/Helsinki", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["芬兰语", "瑞典语"],
    language_en: ["Finnish", "Swedish"],
    religion: ["基督教路德宗", "无宗教"],
    area_km2: 338424,
    population: 5500000,
    major_ports: ["赫尔辛基港", "科特卡港", "图尔库港"],
    business_hours: "周一至周五 8:00-16:00",
    business_etiquette: [
      "守时严格",
      "沉默正常",
      "避免小谈",
      "桑拿文化"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "仲夏节(6月)", "独立日(12月6日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "技术创新强",
      "诚信至上",
      "决策缓慢彻底",
      "英语水平高"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "奥地利", 
    name_en: "Austria", 
    iso2: "AT", 
    iso3: "AUT", 
    dial_code: "+43", 
    capital_cn: "维也纳", 
    capital_en: "Vienna", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".at", 
    timezone: "Europe/Vienna", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["德语"],
    language_en: ["German"],
    religion: ["天主教", "基督教", "无宗教"],
    area_km2: 83879,
    population: 9000000,
    major_ports: ["林茨港", "维也纳港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "正式和保守",
      "头衔重要",
      "准时关键",
      "握手礼仪"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "劳动节(5月1日)", "国庆日(10月26日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "重视传统",
      "等级分明",
      "决策缓慢",
      "质量优先"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "比利时", 
    name_en: "Belgium", 
    iso2: "BE", 
    iso3: "BEL", 
    dial_code: "+32", 
    capital_cn: "布鲁塞尔", 
    capital_en: "Brussels", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".be", 
    timezone: "Europe/Brussels", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["荷兰语", "法语", "德语"],
    language_en: ["Dutch", "French", "German"],
    religion: ["天主教", "无宗教"],
    area_km2: 30688,
    population: 11600000,
    major_ports: ["安特卫普港", "泽布吕赫港", "根特港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "多语言能力",
      "正式着装",
      "守时重要",
      "地区差异大"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "劳动节(5月1日)", "国庆日(7月21日)", "圣诞节(12月25日)"],
    trade_notes: [
      "欧盟总部",
      "语言选择敏感",
      "官僚程序多",
      "商务午餐重要"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "230V"
  },
  { 
    name_cn: "葡萄牙", 
    name_en: "Portugal", 
    iso2: "PT", 
    iso3: "PRT", 
    dial_code: "+351", 
    capital_cn: "里斯本", 
    capital_en: "Lisbon", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".pt", 
    timezone: "Europe/Lisbon", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["葡萄牙语"],
    language_en: ["Portuguese"],
    religion: ["天主教", "无宗教"],
    area_km2: 92090,
    population: 10300000,
    major_ports: ["里斯本港", "锡尼什港", "莱雄斯港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "保守正式",
      "建立关系重要",
      "时间观念灵活",
      "等级制度存在"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "自由日(4月25日)", "国庆日(6月10日)", "圣诞节(12月25日)"],
    trade_notes: [
      "个人关系优先",
      "决策较慢",
      "避免直接拒绝",
      "午餐时间长"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "希腊", 
    name_en: "Greece", 
    iso2: "GR", 
    iso3: "GRC", 
    dial_code: "+30", 
    capital_cn: "雅典", 
    capital_en: "Athens", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".gr", 
    timezone: "Europe/Athens", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["希腊语"],
    language_en: ["Greek"],
    religion: ["东正教", "无宗教"],
    area_km2: 131957,
    population: 10700000,
    major_ports: ["比雷埃夫斯港", "塞萨洛尼基港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "重视个人关系",
      "时间观念灵活",
      "热情好客",
      "避免催促"
    ],
    major_holidays: ["新年(1月1日)", "独立日(3月25日)", "复活节(4-5月)", "圣诞节(12月25日)"],
    trade_notes: [
      "关系导向强",
      "决策缓慢",
      "官僚主义",
      "8月多数度假"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "捷克", 
    name_en: "Czech Republic", 
    iso2: "CZ", 
    iso3: "CZE", 
    dial_code: "+420", 
    capital_cn: "布拉格", 
    capital_en: "Prague", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".cz", 
    timezone: "Europe/Prague", 
    currency_code: "CZK", 
    currency_name_cn: "捷克克朗",
    currency_symbol: "Kč",
    language_cn: ["捷克语"],
    language_en: ["Czech"],
    religion: ["无宗教", "天主教"],
    area_km2: 78867,
    population: 10700000,
    major_ports: ["德辛港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "正式保守",
      "头衔重要",
      "守时关键",
      "避免个人话题"
    ],
    major_holidays: ["新年(1月1日)", "复活节(3-4月)", "劳动节(5月1日)", "圣瓦茨拉夫日(9月28日)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "技术水平高",
      "官僚程序多",
      "决策缓慢",
      "质量意识强"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "230V"
  },
  { 
    name_cn: "匈牙利", 
    name_en: "Hungary", 
    iso2: "HU", 
    iso3: "HUN", 
    dial_code: "+36", 
    capital_cn: "布达佩斯", 
    capital_en: "Budapest", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".hu", 
    timezone: "Europe/Budapest", 
    currency_code: "HUF", 
    currency_name_cn: "匈牙利福林",
    currency_symbol: "Ft",
    language_cn: ["匈牙利语"],
    language_en: ["Hungarian"],
    religion: ["天主教", "基督教", "无宗教"],
    area_km2: 93028,
    population: 9700000,
    major_ports: ["布达佩斯港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "正式礼貌",
      "握手和眼神接触",
      "准时重要",
      "称呼用姓氏"
    ],
    major_holidays: ["新年(1月1日)", "国庆日(3月15日)", "复活节(3-4月)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "等级制度明显",
      "决策集中",
      "书面确认重要",
      "避免过度熟悉"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "罗马尼亚", 
    name_en: "Romania", 
    iso2: "RO", 
    iso3: "ROU", 
    dial_code: "+40", 
    capital_cn: "布加勒斯特", 
    capital_en: "Bucharest", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".ro", 
    timezone: "Europe/Bucharest", 
    currency_code: "RON", 
    currency_name_cn: "罗马尼亚列伊",
    currency_symbol: "lei",
    language_cn: ["罗马尼亚语"],
    language_en: ["Romanian"],
    religion: ["东正教", "天主教"],
    area_km2: 238397,
    population: 19200000,
    major_ports: ["康斯坦察港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "正式着装",
      "等级观念",
      "建立信任重要",
      "避免直接批评"
    ],
    major_holidays: ["新年(1月1-2日)", "复活节(4-5月)", "劳动节(5月1日)", "国庆日(12月1日)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "官僚程序复杂",
      "个人关系关键",
      "决策缓慢",
      "礼物交换常见"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "保加利亚", 
    name_en: "Bulgaria", 
    iso2: "BG", 
    iso3: "BGR", 
    dial_code: "+359", 
    capital_cn: "索非亚", 
    capital_en: "Sofia", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".bg", 
    timezone: "Europe/Sofia", 
    currency_code: "BGN", 
    currency_name_cn: "保加利亚列弗",
    currency_symbol: "лв",
    language_cn: ["保加利亚语"],
    language_en: ["Bulgarian"],
    religion: ["东正教", "伊斯兰教"],
    area_km2: 110879,
    population: 6900000,
    major_ports: ["瓦尔纳港", "布尔加斯港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "握手要坚定",
      "保持眼神接触",
      "称呼正式",
      "注意摇头点头相反"
    ],
    major_holidays: ["新年(1月1日)", "解放日(3月3日)", "复活节(4-5月)", "圣诞节(12月24-26日)"],
    trade_notes: [
      "等级制度存在",
      "决策缓慢",
      "关系网重要",
      "耐心必要"
    ],
    driving_side: "right",
    power_plug: "C/F",
    voltage: "230V"
  },
  { 
    name_cn: "爱尔兰", 
    name_en: "Ireland", 
    iso2: "IE", 
    iso3: "IRL", 
    dial_code: "+353", 
    capital_cn: "都柏林", 
    capital_en: "Dublin", 
    continent_cn: "欧洲", 
    continent_en: "Europe", 
    tld: ".ie", 
    timezone: "Europe/Dublin", 
    currency_code: "EUR", 
    currency_name_cn: "欧元",
    currency_symbol: "€",
    language_cn: ["英语", "爱尔兰语"],
    language_en: ["English", "Irish"],
    religion: ["天主教", "无宗教"],
    area_km2: 70273,
    population: 5000000,
    major_ports: ["都柏林港", "科克港"],
    business_hours: "周一至周五 9:00-17:30",
    business_etiquette: [
      "友好非正式",
      "幽默感重要",
      "建立关系优先",
      "避免过度直接"
    ],
    major_holidays: ["新年(1月1日)", "圣帕特里克节(3月17日)", "复活节(3-4月)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "关系导向",
      "决策可能慢",
      "社交重要",
      "避免施压"
    ],
    driving_side: "left",
    power_plug: "G",
    voltage: "230V"
  },
  { 
    name_cn: "新西兰", 
    name_en: "New Zealand", 
    iso2: "NZ", 
    iso3: "NZL", 
    dial_code: "+64", 
    capital_cn: "惠灵顿", 
    capital_en: "Wellington", 
    continent_cn: "大洋洲", 
    continent_en: "Oceania", 
    tld: ".nz", 
    timezone: "Pacific/Auckland", 
    currency_code: "NZD", 
    currency_name_cn: "新西兰元",
    currency_symbol: "NZ$",
    language_cn: ["英语", "毛利语"],
    language_en: ["English", "Māori"],
    religion: ["基督教", "无宗教"],
    area_km2: 268838,
    population: 5100000,
    major_ports: ["奥克兰港", "陶朗加港", "惠灵顿港"],
    business_hours: "周一至周五 9:00-17:00",
    business_etiquette: [
      "非正式友好",
      "直接坦率",
      "尊重毛利文化",
      "环保意识强"
    ],
    major_holidays: ["新年(1月1日)", "怀唐伊日(2月6日)", "复活节(3-4月)", "圣诞节(12月25-26日)"],
    trade_notes: [
      "创新开放",
      "质量意识高",
      "决策快速",
      "工作生活平衡"
    ],
    driving_side: "left",
    power_plug: "I",
    voltage: "230V"
  },
  { 
    name_cn: "智利", 
    name_en: "Chile", 
    iso2: "CL", 
    iso3: "CHL", 
    dial_code: "+56", 
    capital_cn: "圣地亚哥", 
    capital_en: "Santiago", 
    continent_cn: "南美洲", 
    continent_en: "South America", 
    tld: ".cl", 
    timezone: "America/Santiago", 
    currency_code: "CLP", 
    currency_name_cn: "智利比索",
    currency_symbol: "$",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "基督教"],
    area_km2: 756102,
    population: 19100000,
    major_ports: ["瓦尔帕莱索港", "圣安东尼奥港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "正式保守",
      "等级分明",
      "守时重要",
      "着装讲究"
    ],
    major_holidays: ["新年(1月1日)", "劳动节(5月1日)", "独立日(9月18日)", "圣诞节(12月25日)"],
    trade_notes: [
      "关系网络重要",
      "决策集中",
      "避免冲突",
      "商务午餐常见"
    ],
    driving_side: "right",
    power_plug: "C/L",
    voltage: "220V"
  },
  { 
    name_cn: "秘鲁", 
    name_en: "Peru", 
    iso2: "PE", 
    iso3: "PER", 
    dial_code: "+51", 
    capital_cn: "利马", 
    capital_en: "Lima", 
    continent_cn: "南美洲", 
    continent_en: "South America", 
    tld: ".pe", 
    timezone: "America/Lima", 
    currency_code: "PEN", 
    currency_name_cn: "秘鲁索尔",
    currency_symbol: "S/",
    language_cn: ["西班牙语", "克丘亚语"],
    language_en: ["Spanish", "Quechua"],
    religion: ["天主教", "基督教"],
    area_km2: 1285216,
    population: 33000000,
    major_ports: ["卡亚俄港", "派塔港"],
    business_hours: "周一至周五 9:00-18:00",
    business_etiquette: [
      "正式礼貌",
      "建立关系重要",
      "时间观念灵活",
      "尊重等级"
    ],
    major_holidays: ["新年(1月1日)", "劳动节(5月1日)", "独立日(7月28-29日)", "圣诞节(12月25日)"],
    trade_notes: [
      "个人关系优先",
      "决策缓慢",
      "避免施压",
      "社交活动重要"
    ],
    driving_side: "right",
    power_plug: "A/B/C",
    voltage: "220V"
  },
  { 
    name_cn: "哥伦比亚", 
    name_en: "Colombia", 
    iso2: "CO", 
    iso3: "COL", 
    dial_code: "+57", 
    capital_cn: "波哥大", 
    capital_en: "Bogotá", 
    continent_cn: "南美洲", 
    continent_en: "South America", 
    tld: ".co", 
    timezone: "America/Bogota", 
    currency_code: "COP", 
    currency_name_cn: "哥伦比亚比索",
    currency_symbol: "$",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "基督教"],
    area_km2: 1141748,
    population: 50900000,
    major_ports: ["布埃纳文图拉港", "卡塔赫纳港", "巴兰基亚港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "重视个人关系",
      "正式着装",
      "时间观念改善中",
      "避免直接拒绝"
    ],
    major_holidays: ["新年(1月1日)", "劳动节(5月1日)", "独立日(7月20日)", "圣诞节(12月25日)"],
    trade_notes: [
      "关系网络关键",
      "等级制度存在",
      "决策可能慢",
      "地区差异大"
    ],
    driving_side: "right",
    power_plug: "A/B",
    voltage: "110V"
  },
  { 
    name_cn: "委内瑞拉", 
    name_en: "Venezuela", 
    iso2: "VE", 
    iso3: "VEN", 
    dial_code: "+58", 
    capital_cn: "加拉加斯", 
    capital_en: "Caracas", 
    continent_cn: "南美洲", 
    continent_en: "South America", 
    tld: ".ve", 
    timezone: "America/Caracas", 
    currency_code: "VES", 
    currency_name_cn: "委内瑞拉玻利瓦尔",
    currency_symbol: "Bs",
    language_cn: ["西班牙语"],
    language_en: ["Spanish"],
    religion: ["天主教", "基督教"],
    area_km2: 916445,
    population: 28400000,
    major_ports: ["拉瓜伊拉港", "马拉开波港", "卡贝略港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "个人关系重要",
      "时间观念灵活",
      "避免政治话题",
      "正式着装"
    ],
    major_holidays: ["新年(1月1日)", "独立日(7月5日)", "圣诞节(12月25日)"],
    trade_notes: [
      "经济不稳定",
      "关系网络关键",
      "官僚主义严重",
      "美元使用普遍"
    ],
    driving_side: "right",
    power_plug: "A/B",
    voltage: "120V"
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
    name_cn: "约旦", 
    name_en: "Jordan", 
    iso2: "JO", 
    iso3: "JOR", 
    dial_code: "+962", 
    capital_cn: "安曼", 
    capital_en: "Amman", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".jo", 
    timezone: "Asia/Amman", 
    currency_code: "JOD", 
    currency_name_cn: "约旦第纳尔",
    currency_symbol: "JD",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教", "基督教"],
    area_km2: 89342,
    population: 10200000,
    major_ports: ["亚喀巴港"],
    business_hours: "周日至周四 8:30-15:30",
    business_etiquette: [
      "建立关系优先",
      "尊重伊斯兰传统",
      "款待文化",
      "避免左手"
    ],
    major_holidays: ["新年(1月1日)", "开斋节", "宰牲节", "独立日(5月25日)"],
    trade_notes: [
      "地区贸易枢纽",
      "英语使用广泛",
      "关系网络重要",
      "决策可能缓慢"
    ],
    driving_side: "right",
    power_plug: "C/D/F/G/J",
    voltage: "230V"
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
    name_cn: "科威特", 
    name_en: "Kuwait", 
    iso2: "KW", 
    iso3: "KWT", 
    dial_code: "+965", 
    capital_cn: "科威特城", 
    capital_en: "Kuwait City", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".kw", 
    timezone: "Asia/Kuwait", 
    currency_code: "KWD", 
    currency_name_cn: "科威特第纳尔",
    currency_symbol: "د.ك",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教"],
    area_km2: 17818,
    population: 4300000,
    major_ports: ["舒韦赫港", "舒艾巴港"],
    business_hours: "周日至周四 8:00-15:00",
    business_etiquette: [
      "保守着装",
      "尊重伊斯兰传统",
      "建立信任重要",
      "耐心必要"
    ],
    major_holidays: ["新年(1月1日)", "国庆日(2月25日)", "解放日(2月26日)", "开斋节", "宰牲节"],
    trade_notes: [
      "石油资源丰富",
      "决策缓慢",
      "关系优先",
      "英语商务通用"
    ],
    driving_side: "right",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "卡塔尔", 
    name_en: "Qatar", 
    iso2: "QA", 
    iso3: "QAT", 
    dial_code: "+974", 
    capital_cn: "多哈", 
    capital_en: "Doha", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".qa", 
    timezone: "Asia/Qatar", 
    currency_code: "QAR", 
    currency_name_cn: "卡塔尔里亚尔",
    currency_symbol: "ر.ق",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教"],
    area_km2: 11586,
    population: 2900000,
    major_ports: ["哈马德港"],
    business_hours: "周日至周四 7:30-14:30",
    business_etiquette: [
      "保守着装",
      "耐心和尊重",
      "关系建立重要",
      "避免直接拒绝"
    ],
    major_holidays: ["新年(1月1日)", "国庆日(12月18日)", "开斋节", "宰牲节"],
    trade_notes: [
      "天然气出口大国",
      "基础设施现代",
      "英语广泛使用",
      "商务环境国际化"
    ],
    driving_side: "right",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "巴林", 
    name_en: "Bahrain", 
    iso2: "BH", 
    iso3: "BHR", 
    dial_code: "+973", 
    capital_cn: "麦纳麦", 
    capital_en: "Manama", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".bh", 
    timezone: "Asia/Bahrain", 
    currency_code: "BHD", 
    currency_name_cn: "巴林第纳尔",
    currency_symbol: "BD",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教"],
    area_km2: 760,
    population: 1700000,
    major_ports: ["米纳萨勒曼港"],
    business_hours: "周日至周四 8:00-15:00",
    business_etiquette: [
      "尊重当地习俗",
      "建立个人关系",
      "着装保守",
      "耐心交流"
    ],
    major_holidays: ["新年(1月1日)", "国庆日(12月16日)", "开斋节", "宰牲节"],
    trade_notes: [
      "金融中心",
      "英语普及",
      "相对开放",
      "周末是周五周六"
    ],
    driving_side: "right",
    power_plug: "G",
    voltage: "230V"
  },
  { 
    name_cn: "阿曼", 
    name_en: "Oman", 
    iso2: "OM", 
    iso3: "OMN", 
    dial_code: "+968", 
    capital_cn: "马斯喀特", 
    capital_en: "Muscat", 
    continent_cn: "亚洲", 
    continent_en: "Asia", 
    tld: ".om", 
    timezone: "Asia/Muscat", 
    currency_code: "OMR", 
    currency_name_cn: "阿曼里亚尔",
    currency_symbol: "ر.ع.",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教"],
    area_km2: 309500,
    population: 5100000,
    major_ports: ["苏哈尔港", "塞拉莱港"],
    business_hours: "周日至周四 8:00-15:00",
    business_etiquette: [
      "传统保守",
      "尊重习俗",
      "建立信任",
      "款待文化"
    ],
    major_holidays: ["新年(1月1日)", "国庆日(11月18日)", "开斋节", "宰牲节"],
    trade_notes: [
      "石油天然气资源",
      "政治稳定",
      "决策缓慢",
      "英语使用增加"
    ],
    driving_side: "right",
    power_plug: "G",
    voltage: "240V"
  },
  { 
    name_cn: "摩洛哥", 
    name_en: "Morocco", 
    iso2: "MA", 
    iso3: "MAR", 
    dial_code: "+212", 
    capital_cn: "拉巴特", 
    capital_en: "Rabat", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".ma", 
    timezone: "Africa/Casablanca", 
    currency_code: "MAD", 
    currency_name_cn: "摩洛哥迪拉姆",
    currency_symbol: "د.م.",
    language_cn: ["阿拉伯语", "柏柏尔语"],
    language_en: ["Arabic", "Berber"],
    religion: ["伊斯兰教"],
    area_km2: 446550,
    population: 37000000,
    major_ports: ["卡萨布兰卡港", "丹吉尔港"],
    business_hours: "周一至周五 8:30-18:30",
    business_etiquette: [
      "法语重要",
      "建立关系",
      "谈判耐心",
      "尊重传统"
    ],
    major_holidays: ["新年(1月1日)", "独立日(11月18日)", "开斋节", "宰牲节"],
    trade_notes: [
      "法语商务语言",
      "地理位置优越",
      "等级制度存在",
      "茶文化重要"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "220V"
  },
  { 
    name_cn: "突尼斯", 
    name_en: "Tunisia", 
    iso2: "TN", 
    iso3: "TUN", 
    dial_code: "+216", 
    capital_cn: "突尼斯市", 
    capital_en: "Tunis", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".tn", 
    timezone: "Africa/Tunis", 
    currency_code: "TND", 
    currency_name_cn: "突尼斯第纳尔",
    currency_symbol: "د.ت",
    language_cn: ["阿拉伯语"],
    language_en: ["Arabic"],
    religion: ["伊斯兰教"],
    area_km2: 163610,
    population: 11800000,
    major_ports: ["拉德斯港", "比塞大港"],
    business_hours: "周一至周五 8:00-17:00",
    business_etiquette: [
      "法语广泛使用",
      "握手问候",
      "建立关系",
      "避免催促"
    ],
    major_holidays: ["新年(1月1日)", "独立日(3月20日)", "共和国日(7月25日)", "开斋节"],
    trade_notes: [
      "地中海贸易",
      "法语优势",
      "旅游业发达",
      "官僚程序存在"
    ],
    driving_side: "right",
    power_plug: "C/E",
    voltage: "230V"
  },
  { 
    name_cn: "阿尔及利亚", 
    name_en: "Algeria", 
    iso2: "DZ", 
    iso3: "DZA", 
    dial_code: "+213", 
    capital_cn: "阿尔及尔", 
    capital_en: "Algiers", 
    continent_cn: "非洲", 
    continent_en: "Africa", 
    tld: ".dz", 
    timezone: "Africa/Algiers", 
    currency_code: "DZD", 
    currency_name_cn: "阿尔及利亚第纳尔",
    currency_symbol: "د.ج",
    language_cn: ["阿拉伯语", "柏柏尔语"],
    language_en: ["Arabic", "Berber"],
    religion: ["伊斯兰教"],
    area_km2: 2381741,
    population: 44000000,
    major_ports: ["阿尔及尔港", "奥兰港"],
    business_hours: "周日至周四 8:00-16:30",
    business_etiquette: [
      "法语商务语言",
      "正式保守",
      "等级分明",
      "耐心重要"
    ],
    major_holidays: ["新年(1月1日)", "独立日(7月5日)", "革命日(11月1日)", "开斋节"],
    trade_notes: [
      "石油天然气资源",
      "官僚主义严重",
      "法语必要",
      "决策缓慢"
    ],
    driving_side: "right",
    power_plug
