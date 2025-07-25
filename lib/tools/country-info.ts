// 文件路径: seedtool/lib/tools/country-info.ts
// 描述: 提供全球国家信息数据和相关函数

// @ts-nocheck
// Disabling TypeScript checking for this file due to the large and complex data structure.

export interface Country {
  name_zh: string;
  name_en: string;
  iso2: string;
  iso3: string;
  phone_code: string;
  capital: string;
  continent: string;
  continent_zh: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  languages: string[];
  tld: string;
  timezones: string[];
  major_ports: string[];
  work_week: string;
  etiquette: {
    greetings: string;
    meetings: string;
    gifts: string;
  };
  trade_notes: string[];
}

export const ALL_COUNTRIES: Country[] = [
  // Data for major trading countries. Add more as needed.
  {
    name_zh: '美国',
    name_en: 'United States',
    iso2: 'US',
    iso3: 'USA',
    phone_code: '1',
    capital: 'Washington, D.C.',
    continent: 'North America',
    continent_zh: '北美洲',
    currency: { code: 'USD', name: 'United States Dollar', symbol: '$' },
    languages: ['English'],
    tld: '.us',
    timezones: ['UTC-05:00', 'UTC-06:00', 'UTC-07:00', 'UTC-08:00', 'UTC-09:00', 'UTC-10:00'],
    major_ports: ['Los Angeles', 'Long Beach', 'New York/New Jersey'],
    work_week: '周一至周五, 9am-5pm',
    etiquette: {
      greetings: '习惯握手，眼神交流很重要。',
      meetings: '会议准时开始，注重效率和直接沟通。',
      gifts: '商务送礼不普遍，如送礼应在会后，礼物不宜贵重。'
    },
    trade_notes: ['法律体系复杂，注意合规性。', '市场竞争激烈，品牌和营销是关键。']
  },
  {
    name_zh: '中国',
    name_en: 'China',
    iso2: 'CN',
    iso3: 'CHN',
    phone_code: '86',
    capital: 'Beijing',
    continent: 'Asia',
    continent_zh: '亚洲',
    currency: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    languages: ['Mandarin'],
    tld: '.cn',
    timezones: ['UTC+08:00'],
    major_ports: ['Shanghai', 'Shenzhen', 'Ningbo-Zhoushan'],
    work_week: '周一至周五, 9am-6pm',
    etiquette: {
      greetings: '握手是标准问候方式，职位高者先伸手。',
      meetings: '守时非常重要，交换名片时用双手。',
      gifts: '送礼是建立关系的一部分，但要避免过于贵重以免被误认为贿赂。'
    },
    trade_notes: ['关系（Guanxi）在商业中很重要。', '节假日期间（如春节）物流和生产会暂停。']
  },
  {
    name_zh: '德国',
    name_en: 'Germany',
    iso2: 'DE',
    iso3: 'DEU',
    phone_code: '49',
    capital: 'Berlin',
    continent: 'Europe',
    continent_zh: '欧洲',
    currency: { code: 'EUR', name: 'Euro', symbol: '€' },
    languages: ['German'],
    tld: '.de',
    timezones: ['UTC+01:00'],
    major_ports: ['Hamburg', 'Bremen/Bremerhaven', 'Wilhelmshaven'],
    work_week: '周一至周五, 8am-5pm',
    etiquette: {
      greetings: '握手坚定有力，称呼对方的姓氏和头衔。',
      meetings: '极度重视准时和计划，议程明确。',
      gifts: '送高质量、有品牌但不浮夸的礼物。'
    },
    trade_notes: ['产品质量和技术标准要求高。', '重视合同和书面协议。']
  },
  {
    name_zh: '日本',
    name_en: 'Japan',
    iso2: 'JP',
    iso3: 'JPN',
    phone_code: '81',
    capital: 'Tokyo',
    continent: 'Asia',
    continent_zh: '亚洲',
    currency: { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    languages: ['Japanese'],
    tld: '.jp',
    timezones: ['UTC+09:00'],
    major_ports: ['Tokyo', 'Yokohama', 'Nagoya'],
    work_week: '周一至周五, 9am-6pm, 加班文化普遍',
    etiquette: {
      greetings: '鞠躬是传统问候，商务场合也常握手。',
      meetings: '非常守时，等级制度分明，决策过程可能较长。',
      gifts: '送礼和收礼有复杂的礼仪，包装很重要。'
    },
    trade_notes: ['建立长期信任关系是成功的关键。', '对细节和质量有极高的追求。']
  },
  {
    name_zh: '英国',
    name_en: 'United Kingdom',
    iso2: 'GB',
    iso3: 'GBR',
    phone_code: '44',
    capital: 'London',
    continent: 'Europe',
    continent_zh: '欧洲',
    currency: { code: 'GBP', name: 'British Pound', symbol: '£' },
    languages: ['English'],
    tld: '.uk',
    timezones: ['UTC+00:00'],
    major_ports: ['Felixstowe', 'Southampton', 'London'],
    work_week: '周一至周五, 9am-5pm',
    etiquette: {
      greetings: '握手是标准方式，沟通风格相对保守和礼貌。',
      meetings: '准时，议程清晰，商务午餐或晚餐是常见的社交方式。',
      gifts: '商务送礼不常见，小纪念品即可。'
    },
    trade_notes: ['金融和服务业发达。', '脱欧后贸易政策和法规有变化，需关注。']
  },
  {
    name_zh: '印度',
    name_en: 'India',
    iso2: 'IN',
    iso3: 'IND',
    phone_code: '91',
    capital: 'New Delhi',
    continent: 'Asia',
    continent_zh: '亚洲',
    currency: { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    languages: ['Hindi', 'English'],
    tld: '.in',
    timezones: ['UTC+05:30'],
    major_ports: ['Jawaharlal Nehru Port (Nhava Sheva)', 'Mundra', 'Chennai'],
    work_week: '周一至周六, 10am-6pm',
    etiquette: {
      greetings: '商务场合多用握手，传统问候是“Namaste”。',
      meetings: '等级观念强，与决策者建立关系很重要。',
      gifts: '送礼是常见做法，但要避免与宗教相关的物品。'
    },
    trade_notes: ['市场巨大但多样化，各地区差异大。', '官僚程序可能比较复杂。']
  },
  {
    name_zh: '巴西',
    name_en: 'Brazil',
    iso2: 'BR',
    iso3: 'BRA',
    phone_code: '55',
    capital: 'Brasília',
    continent: 'South America',
    continent_zh: '南美洲',
    currency: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    languages: ['Portuguese'],
    tld: '.br',
    timezones: ['UTC-02:00', 'UTC-03:00', 'UTC-04:00', 'UTC-05:00'],
    major_ports: ['Santos', 'Itajaí', 'Paranaguá'],
    work_week: '周一至周五, 8:30am-5:30pm',
    etiquette: {
      greetings: '握手并伴随口头问候，关系好后可能有拍背等动作。',
      meetings: '会议开始可能不那么准时，重视人际关系。',
      gifts: '送一些有品牌标志的小礼物比较受欢迎。'
    },
    trade_notes: ['进口关税和税收体系复杂。', '本地化和建立当地联系很重要。']
  },
  {
    name_zh: '俄罗斯',
    name_en: 'Russia',
    iso2: 'RU',
    iso3: 'RUS',
    phone_code: '7',
    capital: 'Moscow',
    continent: 'Europe/Asia',
    continent_zh: '欧洲/亚洲',
    currency: { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    languages: ['Russian'],
    tld: '.ru',
    timezones: ['UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00'],
    major_ports: ['Novorossiysk', 'Saint Petersburg', 'Vladivostok'],
    work_week: '周一至周五, 9am-6pm',
    etiquette: {
      greetings: '坚定地握手，保持眼神接触。',
      meetings: '谈判可能很艰难直接，耐心和毅力是关键。',
      gifts: '送礼表示尊重，有公司标志的礼物是不错的选择。'
    },
    trade_notes: ['政府对经济有较强干预。', '了解当前的国际贸易制裁情况非常重要。']
  }
];

// 获取国旗emoji的函数 (与世界时间工具中的相同)
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
