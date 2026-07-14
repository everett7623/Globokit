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
  | '主机与建站'
  | '域名服务'
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
    href: 'https://go.uukk.de/laifaxin',
    description: '外贸客户搜索、开发信、邮件跟进和客户管理，更贴近外贸获客场景。',
    bestFor: ['客户开发', '邮件营销', '线索管理'],
    badge: '首推',
  },
  {
    id: 'talordata',
    name: 'TalorData',
    type: '代理网络',
    href: 'https://go.uukk.de/talordata',
    description: '全球住宅代理资源，适合做跨区域页面检查、市场价格观察和本地化测试。',
    bestFor: ['区域测试', '价格监测', '市场调研'],
  },
  {
    id: 'novproxy',
    name: 'Novproxy',
    type: '代理网络',
    href: 'https://go.uukk.de/novproxy',
    description: '住宅与动态代理资源，适合跨区域访问测试、页面检查和账号环境准备。',
    bestFor: ['动态代理', '区域访问', '页面检查'],
  },
  {
    id: 'smartproxy',
    name: 'Smartproxy / Decodo',
    type: '代理网络',
    href: 'https://go.uukk.de/smartproxy',
    description: '成熟代理与数据采集平台，适合需要稳定全球覆盖的业务调研。',
    bestFor: ['公开数据', '广告验证', 'SERP 观察'],
  },
  {
    id: 'webshare',
    name: 'Webshare',
    type: '代理网络',
    href: 'https://go.uukk.de/webshare',
    description: '成本友好的代理选择，适合轻量测试、站点检查和团队入门使用。',
    bestFor: ['轻量测试', '预算友好', '静态代理'],
  },
  {
    id: 'adspower',
    name: 'AdsPower',
    type: '浏览器环境',
    href: 'https://go.uukk.de/adspower',
    description: '浏览器环境和资料隔离工具，适合团队管理多个业务环境与区域账号。',
    bestFor: ['环境隔离', '团队协作', '账号资料管理'],
  },
  {
    id: 'hubstudio',
    name: 'Hubstudio',
    type: '浏览器环境',
    href: 'https://go.uukk.de/hubstudio',
    description: '多环境浏览器管理工具，适合外贸团队做账号资料隔离和协作。',
    bestFor: ['多环境管理', '团队协作', '资料隔离'],
  },
  {
    id: 'brightdata',
    name: 'Bright Data',
    type: '企业数据',
    href: 'https://go.uukk.de/brightdata',
    description: '企业级公开数据采集和代理平台，适合预算充足的数据团队。',
    bestFor: ['公开数据', '企业调研', '数据集'],
    badge: '企业级',
  },
  {
    id: 'dmit',
    name: 'DMIT',
    type: '主机与建站',
    href: 'https://go.uukk.de/dmit',
    description: '高性能云服务器资源，适合外贸独立站、落地页、监控服务和开发环境。',
    bestFor: ['VPS', '独立站', '开发环境'],
    badge: 'VPS',
  },
  {
    id: 'hostinger',
    name: 'Hostinger',
    type: '主机与建站',
    href: 'https://go.uukk.de/hostinger',
    description: '虚拟主机与 WordPress 建站平台，适合不想自己维护服务器的小团队。',
    bestFor: ['虚拟主机', 'WordPress', '建站入门'],
    badge: '入门',
  },
  {
    id: 'chemicloud',
    name: 'ChemiCloud',
    type: '主机与建站',
    href: 'https://go.uukk.de/chemicloud',
    description: '面向中小企业网站的共享主机，适合外贸官网、WordPress 和轻量独立站。',
    bestFor: ['共享主机', 'WordPress', '企业官网'],
  },
  {
    id: 'cloudways',
    name: 'Cloudways',
    type: '主机与建站',
    href: 'https://go.uukk.de/cloudways',
    description: '托管云主机平台，适合已有访问量、需要更高弹性和性能的外贸独立站。',
    bestFor: ['托管云', '高访问量', '性能优化'],
    badge: '托管云',
  },
  {
    id: 'kinsta',
    name: 'Kinsta',
    type: '主机与建站',
    href: 'https://go.uukk.de/kinsta',
    description: '高端托管 WordPress 平台，适合预算更充足、重视速度和稳定性的商业站点。',
    bestFor: ['托管 WordPress', '高性能', '商业站点'],
  },
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    type: '主机与建站',
    href: 'https://pages.cloudflare.com/',
    description: '前端站点部署平台，适合官网、落地页、文档站和轻量静态项目。',
    bestFor: ['静态站点', '落地页', '前端部署'],
  },
  {
    id: 'namesilo',
    name: 'NameSilo',
    type: '域名服务',
    href: 'https://go.uukk.de/namesilo',
    description: '域名注册、DNS、邮箱转发和基础建站服务，适合外贸品牌域名管理。',
    bestFor: ['域名注册', 'DNS 管理', '品牌邮箱'],
    badge: '域名',
  },
  {
    id: 'namecheap',
    name: 'Namecheap',
    type: '域名服务',
    href: 'https://www.namecheap.com/',
    description: '常用域名注册商，适合域名、DNS、邮箱和基础主机集中管理。',
    bestFor: ['域名注册', 'DNS 管理', '邮箱服务'],
  },
  {
    id: 'cloudflare-registrar',
    name: 'Cloudflare Registrar',
    type: '域名服务',
    href: 'https://www.cloudflare.com/products/registrar/',
    description: '与 Cloudflare DNS、安全和 CDN 深度结合，适合已经使用 Cloudflare 的站点。',
    bestFor: ['域名注册', 'DNSSEC', 'Cloudflare DNS'],
  },
  {
    id: 'usappid',
    name: 'USAPPID',
    type: '账号与支付',
    href: 'https://go.uukk.de/usid',
    description: '美区 Apple ID 相关资源，适合准备海外应用、AI App 和订阅服务场景。',
    bestFor: ['美区账号', '海外应用', '订阅准备'],
  },
  {
    id: 'xiaohuojian',
    name: '美区火箭',
    type: '账号与支付',
    href: 'https://go.uukk.de/xiaohuojian',
    description: '面向美区应用和订阅使用的配套资源，可作为出海工具链的补充入口。',
    bestFor: ['美区应用', '订阅工具', '出海准备'],
  },
  {
    id: 'gpt-mj',
    name: 'GPT / MJ',
    type: 'AI 工具',
    href: 'https://go.uukk.de/yinhe',
    description: 'AI 与设计工具服务资源，适合外贸内容生成、图片素材和日常办公提效。',
    bestFor: ['AI 办公', '图片生成', '内容素材'],
    badge: 'AI',
  },
  {
    id: 'nexsms',
    name: 'NexSMS',
    type: '验证服务',
    href: 'https://go.uukk.de/nexsms',
    description: '短信验证服务资源，适合合规的出海账号测试和业务验证流程。',
    bestFor: ['短信验证', '账号测试', '流程验证'],
  },
  {
    id: 'smsman',
    name: 'SMS-Man',
    type: '验证服务',
    href: 'https://go.uukk.de/smsman',
    description: '多地区短信验证服务，适合跨境业务测试和必要的账号验证准备。',
    bestFor: ['多地区验证', '业务测试', '账号准备'],
  },
  {
    id: 'bitget',
    name: 'Bitget',
    type: '账号与支付',
    href: 'https://go.uukk.de/bitget',
    description: '可作为虚拟美元卡和出海支付的补充入口，用于购买 AI 工具等订阅服务。',
    bestFor: ['虚拟卡', 'AI 订阅', '出海支付'],
  },
  {
    id: 'bitgetwallet',
    name: 'Bitget Wallet',
    type: '账号与支付',
    href: 'https://go.uukk.de/bitgetwallet',
    description: 'Web3 钱包和支付补充工具，适合需要更便捷身份验证与备用支付的出海场景。',
    bestFor: ['钱包工具', '身份验证', '支付备用'],
  },
]
