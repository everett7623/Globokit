// 名称: 全球国家信息工具函数
// 描述: 提供全球各国的基础信息、通讯代码、时区等数据
// 路径: seedtool/lib/tools/country-info.ts
// 作者: Jensfrank (基于 amz123.com 数据)
// 更新时间: 2025-07-24

export interface Country {
  name: string           // 中文名称
  nameEn: string        // 英文名称
  capital: string       // 首都中文
  capitalEn: string     // 首都英文
  continent: string     // 大洲 (内部键名，如 'asia')
  continentName?: string // 大洲中文名称 (可选，用于显示)
  iso2: string         // ISO 2位代码
  iso3: string         // ISO 3位代码
  phoneCode: string    // 电话区号
  domain: string       // 域名后缀
  timezone: string     // 主要时区
  currency: string     // 货币代码
  currencyName: string // 货币名称
  languages: string[]  // 官方语言
  tradePorts?: string[] // 主要贸易港口
  businessHours?: string // 工作时间
  holidays?: string[]   // 重要节假日
}

// 大洲分类 (内部键名到中文名称的映射)
export const CONTINENTS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  northAmerica: '北美洲',
  southAmerica: '南美洲',
  oceania: '大洋洲',
  antarctica: '南极洲'
}

// 国家数据 (此处为示例，实际应包含所有国家)
export const COUNTRIES: Country[] = [
  // --- 亚洲 ---
  {
    name: '中国',
    nameEn: 'China',
    capital: '北京',
    capitalEn: 'Beijing',
    continent: 'asia',
    iso2: 'CN',
    iso3: 'CHN',
    phoneCode: '+86',
    domain: '.cn',
    timezone: 'UTC+8',
    currency: 'CNY',
    currencyName: '人民币',
    languages: ['中文'],
    tradePorts: ['上海', '深圳', '宁波舟山', '广州', '青岛', '天津', '厦门', '大连'],
    businessHours: '周一至周五 9:00-18:00',
    holidays: ['春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节']
  },
  {
    name: '日本',
    nameEn: 'Japan',
    capital: '东京',
    capitalEn: 'Tokyo',
    continent: 'asia',
    iso2: 'JP',
    iso3: 'JPN',
    phoneCode: '+81',
    domain: '.jp',
    timezone: 'UTC+9',
    currency: 'JPY',
    currencyName: '日元',
    languages: ['日语'],
    tradePorts: ['东京', '横滨', '大阪', '神户', '名古屋'],
    businessHours: '周一至周五 9:00-17:00',
    holidays: ['元旦', '成人节', '建国纪念日', '春分', '昭和日', '宪法纪念日', '绿之日', '儿童节']
  },
  {
    name: '韩国',
    nameEn: 'South Korea',
    capital: '首尔',
    capitalEn: 'Seoul',
    continent: 'asia',
    iso2: 'KR',
    iso3: 'KOR',
    phoneCode: '+82',
    domain: '.kr',
    timezone: 'UTC+9',
    currency: 'KRW',
    currencyName: '韩元',
    languages: ['韩语'],
    tradePorts: ['釜山', '仁川', '蔚山', '光阳'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '印度',
    nameEn: 'India',
    capital: '新德里',
    capitalEn: 'New Delhi',
    continent: 'asia',
    iso2: 'IN',
    iso3: 'IND',
    phoneCode: '+91',
    domain: '.in',
    timezone: 'UTC+5:30',
    currency: 'INR',
    currencyName: '印度卢比',
    languages: ['印地语', '英语'],
    tradePorts: ['孟买', '钦奈', '加尔各答', '科钦'],
    businessHours: '周一至周六 10:00-18:00'
  },
  {
    name: '新加坡',
    nameEn: 'Singapore',
    capital: '新加坡',
    capitalEn: 'Singapore',
    continent: 'asia',
    iso2: 'SG',
    iso3: 'SGP',
    phoneCode: '+65',
    domain: '.sg',
    timezone: 'UTC+8',
    currency: 'SGD',
    currencyName: '新加坡元',
    languages: ['英语', '中文', '马来语', '泰米尔语'],
    tradePorts: ['新加坡港'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '泰国',
    nameEn: 'Thailand',
    capital: '曼谷',
    capitalEn: 'Bangkok',
    continent: 'asia',
    iso2: 'TH',
    iso3: 'THA',
    phoneCode: '+66',
    domain: '.th',
    timezone: 'UTC+7',
    currency: 'THB',
    currencyName: '泰铢',
    languages: ['泰语'],
    tradePorts: ['曼谷', '林查班'],
    businessHours: '周一至周五 8:30-17:30'
  },
  {
    name: '马来西亚',
    nameEn: 'Malaysia',
    capital: '吉隆坡',
    capitalEn: 'Kuala Lumpur',
    continent: 'asia',
    iso2: 'MY',
    iso3: 'MYS',
    phoneCode: '+60',
    domain: '.my',
    timezone: 'UTC+8',
    currency: 'MYR',
    currencyName: '马来西亚林吉特',
    languages: ['马来语', '英语'],
    tradePorts: ['巴生港', '槟城', '柔佛'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '印度尼西亚',
    nameEn: 'Indonesia',
    capital: '雅加达',
    capitalEn: 'Jakarta',
    continent: 'asia',
    iso2: 'ID',
    iso3: 'IDN',
    phoneCode: '+62',
    domain: '.id',
    timezone: 'UTC+7',
    currency: 'IDR',
    currencyName: '印尼盾',
    languages: ['印尼语'],
    tradePorts: ['雅加达', '泗水', '三宝垄'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '菲律宾',
    nameEn: 'Philippines',
    capital: '马尼拉',
    capitalEn: 'Manila',
    continent: 'asia',
    iso2: 'PH',
    iso3: 'PHL',
    phoneCode: '+63',
    domain: '.ph',
    timezone: 'UTC+8',
    currency: 'PHP',
    currencyName: '菲律宾比索',
    languages: ['菲律宾语', '英语'],
    tradePorts: ['马尼拉', '苏比克湾', '宿务'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '越南',
    nameEn: 'Vietnam',
    capital: '河内',
    capitalEn: 'Hanoi',
    continent: 'asia',
    iso2: 'VN',
    iso3: 'VNM',
    phoneCode: '+84',
    domain: '.vn',
    timezone: 'UTC+7',
    currency: 'VND',
    currencyName: '越南盾',
    languages: ['越南语'],
    tradePorts: ['胡志明市', '海防', '岘港'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '阿联酋',
    nameEn: 'United Arab Emirates',
    capital: '阿布扎比',
    capitalEn: 'Abu Dhabi',
    continent: 'asia',
    iso2: 'AE',
    iso3: 'ARE',
    phoneCode: '+971',
    domain: '.ae',
    timezone: 'UTC+4',
    currency: 'AED',
    currencyName: '阿联酋迪拉姆',
    languages: ['阿拉伯语', '英语'],
    tradePorts: ['迪拜', '阿布扎比', '沙迦'],
    businessHours: '周日至周四 8:00-18:00'
  },
  {
    name: '沙特阿拉伯',
    nameEn: 'Saudi Arabia',
    capital: '利雅得',
    capitalEn: 'Riyadh',
    continent: 'asia',
    iso2: 'SA',
    iso3: 'SAU',
    phoneCode: '+966',
    domain: '.sa',
    timezone: 'UTC+3',
    currency: 'SAR',
    currencyName: '沙特里亚尔',
    languages: ['阿拉伯语'],
    tradePorts: ['吉达', '达曼', '吉赞'],
    businessHours: '周日至周四 8:00-17:00'
  },
  {
    name: '以色列',
    nameEn: 'Israel',
    capital: '耶路撒冷',
    capitalEn: 'Jerusalem',
    continent: 'asia',
    iso2: 'IL',
    iso3: 'ISR',
    phoneCode: '+972',
    domain: '.il',
    timezone: 'UTC+2',
    currency: 'ILS',
    currencyName: '新谢克尔',
    languages: ['希伯来语', '阿拉伯语'],
    tradePorts: ['海法', '阿什杜德'],
    businessHours: '周日至周四 8:00-17:00'
  },
  {
    name: '土耳其',
    nameEn: 'Turkey',
    capital: '安卡拉',
    capitalEn: 'Ankara',
    continent: 'asia',
    iso2: 'TR',
    iso3: 'TUR',
    phoneCode: '+90',
    domain: '.tr',
    timezone: 'UTC+3',
    currency: 'TRY',
    currencyName: '土耳其里拉',
    languages: ['土耳其语'],
    tradePorts: ['伊斯坦布尔', '伊兹密尔', '梅尔辛'],
    businessHours: '周一至周五 8:30-17:30'
  },
  // --- 欧洲 ---
  {
    name: '英国',
    nameEn: 'United Kingdom',
    capital: '伦敦',
    capitalEn: 'London',
    continent: 'europe',
    iso2: 'GB',
    iso3: 'GBR',
    phoneCode: '+44',
    domain: '.uk',
    timezone: 'UTC+0',
    currency: 'GBP',
    currencyName: '英镑',
    languages: ['英语'],
    tradePorts: ['伦敦', '利物浦', '南安普顿', '费利克斯托'],
    businessHours: '周一至周五 9:00-17:00',
    holidays: ['新年', '复活节', '五月初银行假日', '春季银行假日', '夏季银行假日', '圣诞节', '节礼日']
  },
  {
    name: '德国',
    nameEn: 'Germany',
    capital: '柏林',
    capitalEn: 'Berlin',
    continent: 'europe',
    iso2: 'DE',
    iso3: 'DEU',
    phoneCode: '+49',
    domain: '.de',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['德语'],
    tradePorts: ['汉堡', '不来梅', '威廉港'],
    businessHours: '周一至周五 8:00-17:00',
    holidays: ['新年', '复活节', '劳动节', '德国统一日', '圣诞节']
  },
  {
    name: '法国',
    nameEn: 'France',
    capital: '巴黎',
    capitalEn: 'Paris',
    continent: 'europe',
    iso2: 'FR',
    iso3: 'FRA',
    phoneCode: '+33',
    domain: '.fr',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['法语'],
    tradePorts: ['马赛', '勒阿弗尔', '敦刻尔克'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '意大利',
    nameEn: 'Italy',
    capital: '罗马',
    capitalEn: 'Rome',
    continent: 'europe',
    iso2: 'IT',
    iso3: 'ITA',
    phoneCode: '+39',
    domain: '.it',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['意大利语'],
    tradePorts: ['热那亚', '的里雅斯特', '那不勒斯', '威尼斯'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '西班牙',
    nameEn: 'Spain',
    capital: '马德里',
    capitalEn: 'Madrid',
    continent: 'europe',
    iso2: 'ES',
    iso3: 'ESP',
    phoneCode: '+34',
    domain: '.es',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['西班牙语'],
    tradePorts: ['巴塞罗那', '瓦伦西亚', '阿尔赫西拉斯', '毕尔巴鄂'],
    businessHours: '周一至周五 9:00-14:00, 15:00-18:00'
  },
  {
    name: '荷兰',
    nameEn: 'Netherlands',
    capital: '阿姆斯特丹',
    capitalEn: 'Amsterdam',
    continent: 'europe',
    iso2: 'NL',
    iso3: 'NLD',
    phoneCode: '+31',
    domain: '.nl',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['荷兰语'],
    tradePorts: ['鹿特丹', '阿姆斯特丹'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '比利时',
    nameEn: 'Belgium',
    capital: '布鲁塞尔',
    capitalEn: 'Brussels',
    continent: 'europe',
    iso2: 'BE',
    iso3: 'BEL',
    phoneCode: '+32',
    domain: '.be',
    timezone: 'UTC+1',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['荷兰语', '法语', '德语'],
    tradePorts: ['安特卫普', '泽布吕赫'],
    businessHours: '周一至周五 8:30-17:00'
  },
  {
    name: '瑞士',
    nameEn: 'Switzerland',
    capital: '伯尔尼',
    capitalEn: 'Bern',
    continent: 'europe',
    iso2: 'CH',
    iso3: 'CHE',
    phoneCode: '+41',
    domain: '.ch',
    timezone: 'UTC+1',
    currency: 'CHF',
    currencyName: '瑞士法郎',
    languages: ['德语', '法语', '意大利语', '罗曼什语'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '瑞典',
    nameEn: 'Sweden',
    capital: '斯德哥尔摩',
    capitalEn: 'Stockholm',
    continent: 'europe',
    iso2: 'SE',
    iso3: 'SWE',
    phoneCode: '+46',
    domain: '.se',
    timezone: 'UTC+1',
    currency: 'SEK',
    currencyName: '瑞典克朗',
    languages: ['瑞典语'],
    tradePorts: ['哥德堡', '斯德哥尔摩', '马尔默'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '挪威',
    nameEn: 'Norway',
    capital: '奥斯陆',
    capitalEn: 'Oslo',
    continent: 'europe',
    iso2: 'NO',
    iso3: 'NOR',
    phoneCode: '+47',
    domain: '.no',
    timezone: 'UTC+1',
    currency: 'NOK',
    currencyName: '挪威克朗',
    languages: ['挪威语'],
    tradePorts: ['奥斯陆', '卑尔根', '斯塔万格'],
    businessHours: '周一至周五 8:00-16:00'
  },
  {
    name: '丹麦',
    nameEn: 'Denmark',
    capital: '哥本哈根',
    capitalEn: 'Copenhagen',
    continent: 'europe',
    iso2: 'DK',
    iso3: 'DNK',
    phoneCode: '+45',
    domain: '.dk',
    timezone: 'UTC+1',
    currency: 'DKK',
    currencyName: '丹麦克朗',
    languages: ['丹麦语'],
    tradePorts: ['哥本哈根', '奥胡斯'],
    businessHours: '周一至周五 8:00-16:00'
  },
  {
    name: '芬兰',
    nameEn: 'Finland',
    capital: '赫尔辛基',
    capitalEn: 'Helsinki',
    continent: 'europe',
    iso2: 'FI',
    iso3: 'FIN',
    phoneCode: '+358',
    domain: '.fi',
    timezone: 'UTC+2',
    currency: 'EUR',
    currencyName: '欧元',
    languages: ['芬兰语', '瑞典语'],
    tradePorts: ['赫尔辛基', '科特卡', '图尔库'],
    businessHours: '周一至周五 8:00-16:00'
  },
  {
    name: '俄罗斯',
    nameEn: 'Russia',
    capital: '莫斯科',
    capitalEn: 'Moscow',
    continent: 'europe',
    iso2: 'RU',
    iso3: 'RUS',
    phoneCode: '+7',
    domain: '.ru',
    timezone: 'UTC+3',
    currency: 'RUB',
    currencyName: '俄罗斯卢布',
    languages: ['俄语'],
    tradePorts: ['圣彼得堡', '新罗西斯克', '符拉迪沃斯托克'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '波兰',
    nameEn: 'Poland',
    capital: '华沙',
    capitalEn: 'Warsaw',
    continent: 'europe',
    iso2: 'PL',
    iso3: 'POL',
    phoneCode: '+48',
    domain: '.pl',
    timezone: 'UTC+1',
    currency: 'PLN',
    currencyName: '波兰兹罗提',
    languages: ['波兰语'],
    tradePorts: ['格但斯克', '格丁尼亚', '什切青'],
    businessHours: '周一至周五 8:00-16:00'
  },
  // --- 北美洲 ---
  {
    name: '美国',
    nameEn: 'United States',
    capital: '华盛顿',
    capitalEn: 'Washington D.C.',
    continent: 'northAmerica',
    iso2: 'US',
    iso3: 'USA',
    phoneCode: '+1',
    domain: '.us',
    timezone: 'UTC-5 to UTC-10', // 注意：美国横跨多个时区
    currency: 'USD',
    currencyName: '美元',
    languages: ['英语'],
    tradePorts: ['洛杉矶', '长滩', '纽约/新泽西', '萨凡纳', '休斯顿', '诺福克', '西雅图', '奥克兰'],
    businessHours: '周一至周五 9:00-17:00',
    holidays: ['新年', '马丁路德金日', '总统日', '阵亡将士纪念日', '独立日', '劳动节', '哥伦布日', '退伍军人节', '感恩节', '圣诞节']
  },
  {
    name: '加拿大',
    nameEn: 'Canada',
    capital: '渥太华',
    capitalEn: 'Ottawa',
    continent: 'northAmerica',
    iso2: 'CA',
    iso3: 'CAN',
    phoneCode: '+1',
    domain: '.ca',
    timezone: 'UTC-3.5 to UTC-8', // 注意：加拿大横跨多个时区
    currency: 'CAD',
    currencyName: '加拿大元',
    languages: ['英语', '法语'],
    tradePorts: ['温哥华', '蒙特利尔', '哈利法克斯', '圣约翰'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '墨西哥',
    nameEn: 'Mexico',
    capital: '墨西哥城',
    capitalEn: 'Mexico City',
    continent: 'northAmerica',
    iso2: 'MX',
    iso3: 'MEX',
    phoneCode: '+52',
    domain: '.mx',
    timezone: 'UTC-6 to UTC-8', // 注意：墨西哥横跨多个时区
    currency: 'MXN',
    currencyName: '墨西哥比索',
    languages: ['西班牙语'],
    tradePorts: ['曼萨尼约', '拉萨罗卡德纳斯', '韦拉克鲁斯'],
    businessHours: '周一至周五 9:00-18:00'
  },
  // --- 南美洲 ---
  {
    name: '巴西',
    nameEn: 'Brazil',
    capital: '巴西利亚',
    capitalEn: 'Brasília',
    continent: 'southAmerica',
    iso2: 'BR',
    iso3: 'BRA',
    phoneCode: '+55',
    domain: '.br',
    timezone: 'UTC-3 to UTC-5', // 注意：巴西横跨多个时区
    currency: 'BRL',
    currencyName: '巴西雷亚尔',
    languages: ['葡萄牙语'],
    tradePorts: ['桑托斯', '帕拉纳瓜', '里约热内卢', '伊塔雅伊'],
    businessHours: '周一至周五 8:00-18:00'
  },
  {
    name: '阿根廷',
    nameEn: 'Argentina',
    capital: '布宜诺斯艾利斯',
    capitalEn: 'Buenos Aires',
    continent: 'southAmerica',
    iso2: 'AR',
    iso3: 'ARG',
    phoneCode: '+54',
    domain: '.ar',
    timezone: 'UTC-3',
    currency: 'ARS',
    currencyName: '阿根廷比索',
    languages: ['西班牙语'],
    tradePorts: ['布宜诺斯艾利斯', '罗萨里奥'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '智利',
    nameEn: 'Chile',
    capital: '圣地亚哥',
    capitalEn: 'Santiago',
    continent: 'southAmerica',
    iso2: 'CL',
    iso3: 'CHL',
    phoneCode: '+56',
    domain: '.cl',
    timezone: 'UTC-4',
    currency: 'CLP',
    currencyName: '智利比索',
    languages: ['西班牙语'],
    tradePorts: ['瓦尔帕莱索', '圣安东尼奥'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '秘鲁',
    nameEn: 'Peru',
    capital: '利马',
    capitalEn: 'Lima',
    continent: 'southAmerica',
    iso2: 'PE',
    iso3: 'PER',
    phoneCode: '+51',
    domain: '.pe',
    timezone: 'UTC-5',
    currency: 'PEN',
    currencyName: '秘鲁索尔',
    languages: ['西班牙语'],
    tradePorts: ['卡亚俄', '派塔'],
    businessHours: '周一至周五 9:00-18:00'
  },
  {
    name: '哥伦比亚',
    nameEn: 'Colombia',
    capital: '波哥大',
    capitalEn: 'Bogotá',
    continent: 'southAmerica',
    iso2: 'CO',
    iso3: 'COL',
    phoneCode: '+57',
    domain: '.co',
    timezone: 'UTC-5',
    currency: 'COP',
    currencyName: '哥伦比亚比索',
    languages: ['西班牙语'],
    tradePorts: ['卡塔赫纳', '布埃纳文图拉', '巴兰基亚'],
    businessHours: '周一至周五 8:00-17:00'
  },
  // --- 非洲 ---
  {
    name: '南非',
    nameEn: 'South Africa',
    capital: '比勒陀利亚',
    capitalEn: 'Pretoria',
    continent: 'africa',
    iso2: 'ZA',
    iso3: 'ZAF',
    phoneCode: '+27',
    domain: '.za',
    timezone: 'UTC+2',
    currency: 'ZAR',
    currencyName: '南非兰特',
    languages: ['英语', '南非荷兰语', '祖鲁语'],
    tradePorts: ['德班', '开普敦', '伊丽莎白港'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '埃及',
    nameEn: 'Egypt',
    capital: '开罗',
    capitalEn: 'Cairo',
    continent: 'africa',
    iso2: 'EG',
    iso3: 'EGY',
    phoneCode: '+20',
    domain: '.eg',
    timezone: 'UTC+2',
    currency: 'EGP',
    currencyName: '埃及镑',
    languages: ['阿拉伯语'],
    tradePorts: ['亚历山大', '塞得港', '苏伊士'],
    businessHours: '周日至周四 8:00-16:00'
  },
  {
    name: '尼日利亚',
    nameEn: 'Nigeria',
    capital: '阿布贾',
    capitalEn: 'Abuja',
    continent: 'africa',
    iso2: 'NG',
    iso3: 'NGA',
    phoneCode: '+234',
    domain: '.ng',
    timezone: 'UTC+1',
    currency: 'NGN',
    currencyName: '尼日利亚奈拉',
    languages: ['英语'],
    tradePorts: ['拉各斯', '哈科特港'],
    businessHours: '周一至周五 8:00-17:00'
  },
  {
    name: '肯尼亚',
    nameEn: 'Kenya',
    capital: '内罗毕',
    capitalEn: 'Nairobi',
    continent: 'africa',
    iso2: 'KE',
    iso3: 'KEN',
    phoneCode: '+254',
    domain: '.ke',
    timezone: 'UTC+3',
    currency: 'KES',
    currencyName: '肯尼亚先令',
    languages: ['英语', '斯瓦希里语'],
    tradePorts: ['蒙巴萨', '内罗毕'],
    businessHours: '周一至周五 8:00-17:00'
  },
  // --- 大洋洲 ---
  {
    name: '澳大利亚',
    nameEn: 'Australia',
    capital: '堪培拉',
    capitalEn: 'Canberra',
    continent: 'oceania',
    iso2: 'AU',
    iso3: 'AUS',
    phoneCode: '+61',
    domain: '.au',
    timezone: 'UTC+8 to UTC+11', // 注意：澳大利亚横跨多个时区
    currency: 'AUD',
    currencyName: '澳大利亚元',
    languages: ['英语'],
    tradePorts: ['悉尼', '墨尔本', '布里斯班', '弗里曼特尔'],
    businessHours: '周一至周五 9:00-17:00'
  },
  {
    name: '新西兰',
    nameEn: 'New Zealand',
    capital: '惠灵顿',
    capitalEn: 'Wellington',
    continent: 'oceania',
    iso2: 'NZ',
    iso3: 'NZL',
    phoneCode: '+64',
    domain: '.nz',
    timezone: 'UTC+12',
    currency: 'NZD',
    currencyName: '新西兰元',
    languages: ['英语', '毛利语'],
    tradePorts: ['奥克兰', '惠灵顿', '利特尔顿'],
    businessHours: '周一至周五 9:00-17:00'
  }
  // ... 可以继续添加更多国家 ...
]

// --- 工具函数 ---

/**
 * 根据国家代码 (ISO2) 查找国家信息
 */
export function getCountryByCode(isoCode: string): Country | undefined {
  return COUNTRIES.find(country => country.iso2.toLowerCase() === isoCode.toLowerCase());
}

/**
 * 根据关键词 (名称, 代码, 区号) 搜索国家
 */
export function searchCountries(query: string): Country[] {
  if (!query.trim()) return COUNTRIES;
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(lowerQuery) ||
    country.nameEn.toLowerCase().includes(lowerQuery) ||
    country.iso2.toLowerCase().includes(lowerQuery) ||
    country.iso3.toLowerCase().includes(lowerQuery) ||
    country.phoneCode.includes(lowerQuery) // 区号可能包含查询词 (如 '+1' 包含 '1')
  );
}

/**
 * 根据大洲筛选国家
 */
export function filterCountriesByContinent(continentKey: string): Country[] {
  if (!continentKey) return COUNTRIES;
  return COUNTRIES.filter(country => country.continent === continentKey);
}

/**
 * 获取所有大洲选项 (用于筛选器)
 */
export function getContinentOptions() {
  return Object.entries(CONTINENTS).map(([key, name]) => ({ key, name }));
}
