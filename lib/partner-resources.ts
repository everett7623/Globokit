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
    description: 'Web3 钱包和支付补充工具，适合需要更便捷身份验证与备用支付的出海场景。',
    bestFor: ['钱包工具', '身份验证', '支付备用'],
  },
]
