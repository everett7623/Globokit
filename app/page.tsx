// 名称: 外贸工具集首页
// 描述: 组合高频入口、业务流程、工具目录、精选资源与团队说明
// 路径: Globokit/app/page.tsx
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-15

import { HomeHero } from '@/components/home/home-hero'
import { HomeResources } from '@/components/home/home-resources'
import { HomeSummary } from '@/components/home/home-summary'
import { HomeToolDirectory } from '@/components/home/home-tool-directory'
import { HomeWorkflows } from '@/components/home/home-workflows'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HomeHero />
      <HomeWorkflows />
      <HomeToolDirectory />
      <HomeResources />
      <HomeSummary />
    </div>
  )
}
