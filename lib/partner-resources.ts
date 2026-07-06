// 名称: 外贸资源精选
// 描述: 管理可在首页展示的外贸相关资源推荐
// 路径: Globokit/lib/partner-resources.ts
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

export type PartnerResourceType =
  | '客户开发'
  | '代理网络'
  | '浏览器环境'
  | '企业数据'
  | '账号与支付'
  | 'AI 工具'
  | '验证服务'

export interface PartnerResource {
  id: string
  name: string
  type: PartnerResourceType
  href: string
  description: string
  bestFor: string[]
  badge?: string
}

export const PARTNER_RESOURCES: PartnerResource[] = [
  {
    id: 'laifaxin',
    name: '来发信',
    type: '客户开发',
    href: 'https://s.y8o.de/laifaxin',
    description: '外贸客户搜索、开发信、邮件跟进和客户管理，更贴近外贸获客场景。',
    bestFor: ['客户开发', '邮件营销', '线索管理'],
    badge: '首推',
  },
  {
    id: 'talordata',
    name: 'TalorData',
    type: '代理网络',
    href: 'https://s.y8o.de/talordata',
    description: '全球住宅代理资源，适合做跨区域页面检查、市场价格观察和本地化测试。',
    bestFor: ['区域测试', '价格监测', '市场调研'],
  },
  {
    id: 'smartproxy',
    name: 'Smartproxy / Decodo',
    type: '代理网络',
    href: 'https://s.y8o.de/smartproxy',
    description: '成熟的代理和数据采集平台，适合需要稳定全球覆盖的业务调研。',
    bestFor: ['公开数据', '广告验证', 'SERP 观察'],
  },
  {
    id: 'webshare',
    name: 'Webshare',
    type: '代理网络',
    href: 'https://s.y8o.de/webshare',
    description: '成本友好的代理选择，适合轻量测试、站点检查和小团队入门使用。',
    bestFor: ['轻量测试', '预算友好', '静态代理'],
  },
  {
    id: 'adspower',
    name: 'AdsPower',
    type: '浏览器环境',
    href: 'https://s.y8o.de/adspower',
    description: '浏览器环境和资料隔离工具，适合团队管理多个业务环境与区域账号。',
    bestFor: ['环境隔离', '团队协作', '账号资料管理'],
  },
  {
    id: 'brightdata',
    name: 'Bright Data',
    type: '企业数据',
    href: 'https://s.y8o.de/brightdata',
    description: '企业级公开数据采集和代理平台，适合预算充足的数据团队。',
    bestFor: ['公开数据', '企业调研', '数据集'],
    badge: '企业级',
  },
  {
    id: 'usappid',
    name: 'USAPPID',
    type: '账号与支付',
    href: 'https://s.y8o.de/usid',
    description: '美区 Apple ID 相关资源，适合准备海外应用、AI App 和订阅服务场景。',
    bestFor: ['美区账号', '海外应用', '订阅准备'],
  },
  {
    id: 'xiaohuojian',
    name: '美区火箭',
    type: '账号与支付',
    href: 'https://s.y8o.de/xiaohuojian',
    description: '面向美区应用和订阅使用的配套资源，可作为出海工具链的补充入口。',
    bestFor: ['美区应用', '订阅工具', '出海准备'],
  },
  {
    id: 'gpt-mj',
    name: 'GPT / MJ',
    type: 'AI 工具',
    href: 'https://s.y8o.de/yinhe',
    description: 'AI 与设计工具服务资源，适合外贸内容生成、图片素材和日常办公提效。',
    bestFor: ['AI 办公', '图片生成', '内容素材'],
    badge: 'AI',
  },
  {
    id: 'nexsms',
    name: 'NexSMS',
    type: '验证服务',
    href: 'https://s.y8o.de/nexsms',
    description: '短信验证服务资源，适合合规的出海账号测试和业务验证流程。',
    bestFor: ['短信验证', '账号测试', '流程验证'],
  },
  {
    id: 'smsman',
    name: 'SMS-Man',
    type: '验证服务',
    href: 'https://s.y8o.de/smsman',
    description: '多地区短信验证服务，适合跨境业务测试和必要的账号验证准备。',
    bestFor: ['多地区验证', '业务测试', '账号准备'],
  },
  {
    id: 'bitget',
    name: 'Bitget',
    type: '账号与支付',
    href: 'https://s.y8o.de/bitget',
    description: '可作为虚拟美元卡和出海支付的补充入口，用于购买 AI 工具等订阅服务。',
    bestFor: ['虚拟卡', 'AI 订阅', '出海支付'],
  },
  {
    id: 'bitgetwallet',
    name: 'Bitget Wallet',
    type: '账号与支付',
    href: 'https://s.y8o.de/bitgetwallet',
    description: 'Web3 钱包和支付补充工具，可作为跨境数字资产支付场景的备用入口。',
    bestFor: ['Web3 钱包', '支付备用', '数字资产'],
  },
]
