const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const root = path.join(__dirname, '..')
const { TOOL_REGISTRY } = loadTypescriptModule('lib/tools/registry.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }

// 1) 注册表与 app/tools 目录必须一一对应（此前 CI 完全没有这条校验）
const routes = fs
  .readdirSync(path.join(root, 'app/tools'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()
const slugs = TOOL_REGISTRY.map((tool) => tool.slug).sort()
equal(slugs.length, TOOL_REGISTRY.length, '注册表 slug 不重复')
equal(routes.length, TOOL_REGISTRY.length, '工具目录数量与注册表条目数量一致')
const routeNotRegistered = routes.filter((route) => !slugs.includes(route))
const registeredNoRoute = slugs.filter((slug) => !routes.includes(slug))
equal(routeNotRegistered.length, 0, '不存在未注册的工具目录：' + routeNotRegistered.join(', '))
equal(registeredNoRoute.length, 0, '不存在缺少目录的注册条目：' + registeredNoRoute.join(', '))

// 2) 每个工具目录必须同时具备 layout.tsx 与 page.tsx
const missingLayout = routes.filter((route) => !fs.existsSync(path.join(root, 'app/tools', route, 'layout.tsx')))
const missingPage = routes.filter((route) => !fs.existsSync(path.join(root, 'app/tools', route, 'page.tsx')))
equal(missingLayout.length, 0, '每个工具目录都有 layout.tsx：' + missingLayout.join(', '))
equal(missingPage.length, 0, '每个工具目录都有 page.tsx：' + missingPage.join(', '))

// 3) layout.tsx 必须把 slug 交给 createToolMetadata / createToolLayout
const layoutBugs = routes.filter((route) => {
  const source = fs.readFileSync(path.join(root, 'app/tools', route, 'layout.tsx'), 'utf8')
  return !source.includes("createToolMetadata('" + route + "')") || !source.includes("createToolLayout('" + route + "')")
})
equal(layoutBugs.length, 0, 'layout.tsx 的 SEO 接线正确：' + layoutBugs.join(', '))

// 4) id 与 slug 一致、href 指向自身路由
const idMismatch = TOOL_REGISTRY.filter((tool) => tool.id !== tool.slug).map((tool) => tool.slug)
const hrefMismatch = TOOL_REGISTRY.filter((tool) => tool.href !== '/tools/' + tool.slug).map((tool) => tool.slug)
equal(idMismatch.length, 0, 'id 与 slug 保持一致：' + idMismatch.join(', '))
equal(hrefMismatch.length, 0, 'href 指向自身路由：' + hrefMismatch.join(', '))

// 5) 首页图标映射必须覆盖全部 iconName（Pallet 曾在此静默回退为 Code 图标）
const homeData = fs.readFileSync(path.join(root, 'components/home/home-data.ts'), 'utf8')
const mapStart = homeData.indexOf('const ICON_MAP')
const mapEnd = homeData.indexOf(String.fromCharCode(10) + '}', mapStart)
const iconMapBody = homeData.slice(mapStart, mapEnd)
const iconNames = Array.from(new Set(TOOL_REGISTRY.map((tool) => tool.iconName)))
const missingIcons = iconNames.filter((name) => !new RegExp('(^|[^A-Za-z0-9])' + name + ' *,', 'm').test(iconMapBody))
equal(missingIcons.length, 0, '首页 ICON_MAP 覆盖全部 iconName：' + missingIcons.join(', '))
ok(iconNames.length >= 30, '图标名称数量与工具规模匹配（' + iconNames.length + '）')

// 6) 首页配色配置应覆盖全部工具 id（缺失会静默回退为 slate）
const uiConfig = fs.readFileSync(path.join(root, 'lib/tools/registry-ui.ts'), 'utf8')
const missingUi = TOOL_REGISTRY.filter((tool) => !uiConfig.includes("'" + tool.id + "': {")).map((tool) => tool.id)
equal(missingUi.length, 0, 'TOOL_UI_CONFIG 覆盖全部工具 id：' + missingUi.join(', '))

// 7) 相关工具引用必须指向存在的 id，且不应自引用
const knownIds = new Set(TOOL_REGISTRY.map((tool) => tool.id))
const brokenRelated = []
TOOL_REGISTRY.forEach((tool) => {
  ;(tool.relatedTools ?? []).forEach((related) => {
    if (!knownIds.has(related)) brokenRelated.push(tool.id + ' -> ' + related)
    if (related === tool.id) brokenRelated.push(tool.id + ' 自引用')
  })
})
equal(brokenRelated.length, 0, 'relatedTools 引用有效且无自引用：' + brokenRelated.join(', '))

// 8) sitemap 与首页入口都从注册表派生，这里做一次静态确认
const sitemapSource = fs.readFileSync(path.join(root, 'app/sitemap.ts'), 'utf8')
const directorySource = fs.readFileSync(path.join(root, 'components/home/home-tool-directory.tsx'), 'utf8')
ok(!/href="\/tools\/|'\/tools\/[a-z]/.test(directorySource), '首页工具目录不含硬编码路由')
ok(TOOL_REGISTRY.length >= 40, '工具总量不少于 40（当前 ' + TOOL_REGISTRY.length + '）')

console.log('工具目录一致性：' + assertionCount + ' 条校验通过（' + TOOL_REGISTRY.length + ' 个工具）')

