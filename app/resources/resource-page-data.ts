// 名称: 资源页分类数据
// 描述: 定义资源分类顺序、图标样式与可见资源分组
// 路径: Globokit/app/resources/resource-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import type { ComponentType } from 'react'
import {
  Bot,
  CreditCard,
  Database,
  Fingerprint,
  Globe2,
  MailCheck,
  MessageSquare,
  Network,
  Server,
} from 'lucide-react'
import { PARTNER_RESOURCES, type PartnerResourceType } from '@/lib/partner-resources'

const RESOURCE_TYPE_ORDER: PartnerResourceType[] = [
  '客户开发',
  '代理网络',
  '浏览器环境',
  '企业数据',
  '主机与建站',
  '域名服务',
  '账号与支付',
  'AI 工具',
  '验证服务',
]

export const RESOURCE_TYPE_META: Record<
  PartnerResourceType,
  { icon: ComponentType<{ className?: string }>; tone: string; bg: string; note: string; slug: string }
> = {
  '客户开发': {
    icon: MailCheck, tone: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-300/10',
    note: '客户搜索、邮件触达和线索管理。', slug: 'lead',
  },
  '代理网络': {
    icon: Network, tone: 'text-cyan-600 dark:text-cyan-300', bg: 'bg-cyan-50 dark:bg-cyan-300/10',
    note: '区域测试、公开页面检查和市场调研。', slug: 'proxy',
  },
  '浏览器环境': {
    icon: Fingerprint, tone: 'text-violet-600 dark:text-violet-300', bg: 'bg-violet-50 dark:bg-violet-300/10',
    note: '团队多环境管理和资料隔离。', slug: 'browser',
  },
  '企业数据': {
    icon: Database, tone: 'text-amber-600 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-300/10',
    note: '企业级公开数据和预算充足的数据调研。', slug: 'data',
  },
  '主机与建站': {
    icon: Server, tone: 'text-indigo-600 dark:text-indigo-300', bg: 'bg-indigo-50 dark:bg-indigo-300/10',
    note: 'VPS、虚拟主机、落地页和独立站部署。', slug: 'hosting',
  },
  '域名服务': {
    icon: Globe2, tone: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-300/10',
    note: '品牌域名、DNS、邮箱转发和基础建站。', slug: 'domain',
  },
  '账号与支付': {
    icon: CreditCard, tone: 'text-sky-600 dark:text-sky-300', bg: 'bg-sky-50 dark:bg-sky-300/10',
    note: '美区应用、订阅准备和备用支付入口。', slug: 'account',
  },
  'AI 工具': {
    icon: Bot, tone: 'text-fuchsia-600 dark:text-fuchsia-300', bg: 'bg-fuchsia-50 dark:bg-fuchsia-300/10',
    note: '内容生成、图片素材和日常办公提效。', slug: 'ai',
  },
  '验证服务': {
    icon: MessageSquare, tone: 'text-orange-600 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-300/10',
    note: '合规业务测试和账号验证流程。', slug: 'verify',
  },
}

export const VISIBLE_RESOURCE_GROUPS = RESOURCE_TYPE_ORDER
  .map((type) => ({
    type,
    resources: PARTNER_RESOURCES.filter((resource) => resource.type === type),
  }))
  .filter((group) => group.resources.length > 0)
