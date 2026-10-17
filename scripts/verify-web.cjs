// 名称: 工具站真实浏览器验证脚本
// 描述: 用 Playwright 驱动真实浏览器访问生产构建，遍历全站页面校验状态码、标题、canonical 与结构化数据，并对代表性页面做交互与移动端验证
// 路径: Globokit/scripts/verify-web.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10
//
// 前置条件：
//   1. 站点已启动（npm run build && npm start，默认 http://localhost:3000，可用 WEB_BASE 覆盖）
//   2. 已安装 playwright（devDependencies）与浏览器内核：npx playwright install chromium
// 任一前置条件不满足时脚本以退出码 1 失败——浏览器验证不允许静默跳过。

const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const BASE = process.env.WEB_BASE || 'http://localhost:3000'
const SHOT_DIR = path.join(__dirname, '..', '.web-verify')

// 交互与移动端验证的代表性页面
const INTERACTIVE_PAGES = [
  { name: '收款渠道页', path: '/tools/remittance-cost-calculator', title: '国际收款渠道费用对比' },
  { name: '询盘评估页', path: '/tools/inquiry-priority-scorer', title: '外贸询盘优先级评估' },
  { name: '服务器成本页', path: '/tools/server-cost-comparison', title: '服务器成本对比' },
  { name: 'YAML 互转页', path: '/tools/yaml-json-converter', title: 'YAML 与 JSON 互转' },
]

// 全站静态入口
const STATIC_PAGES = [
  { name: '资源页', path: '/resources', title: '外贸业务资源' },
  { name: '关于页', path: '/about', title: '一站式工具箱' },
  { name: '隐私政策页', path: '/privacy', title: '你的数据只属于你的浏览器' },
]

function fail(message) {
  console.error('真实浏览器验证失败：' + message)
  process.exitCode = 1
}

async function main() {
  let chromium
  try {
    ;({ chromium } = require('playwright'))
  } catch {
    fail('未安装 playwright（npm install && npx playwright install chromium）')
    return
  }

  const reachable = await fetch(BASE, { method: 'GET' }).then((response) => response.ok).catch(() => false)
  if (!reachable) {
    fail('站点未启动（' + BASE + '）。先执行 npm run build && npm start，或设置 WEB_BASE')
    return
  }

  // 从 sitemap 收集全部工具页，保证新工具页自动纳入验证
  const sitemapText = await fetch(BASE + '/sitemap.xml').then((response) => response.text())
  const toolPaths = Array.from(sitemapText.matchAll(/<loc>([^<]*)<\/loc>/g))
    .map((match) => new URL(match[1]).pathname)
    .filter((pathname) => pathname.startsWith('/tools/'))

  fs.mkdirSync(SHOT_DIR, { recursive: true })

  const results = []
  const runtimeErrors = []
  const record = (name, ok, detail) => results.push({ name, ok: Boolean(ok), detail: String(detail ?? '') })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  // 本机 AdGuard 会向 HTML 注入此域的脚本。以空响应隔离测试环境，仍严格记录站点自身错误。
  const isolatedRequests = []
  await context.route('https://local.adguard.org/**', (route) => {
    isolatedRequests.push(route.request().url())
    return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' })
  })
  await context.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.fallback()
    const response = await route.fetch()
    if (!(response.headers()['content-type'] ?? '').includes('text/html')) return route.fulfill({ response })
    const html = await response.text()
    // 注入在 React 挂载前已改变 head 节点顺序；仅移除这个已确认的本机注入源。
    const body = html.replace(/<script\b[^>]*\bsrc\s*=\s*["'](?:https?:)?\/\/local\.adguard\.org[/?][^"']*["'][^>]*>[\s\S]*?<\/script>/gi, (script) => {
      isolatedRequests.push('[injected HTML] ' + script.slice(0, 200))
      return ''
    })
    return route.fulfill({ response, body })
  })
  // 汇率网络可用性由供应商决定；交互回归固定输入，断网回退由专项测试覆盖。
  const { FALLBACK_EXCHANGE_RATES } = loadTypescriptModule('lib/tools/vps-calculator.ts')
  await context.route('https://open.er-api.com/v6/latest/CNY', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ rates: FALLBACK_EXCHANGE_RATES }),
  }))
  const page = await context.newPage()
  let muteRuntime = false
  page.on('pageerror', (error) => {
    if (!muteRuntime) runtimeErrors.push(String(error).slice(0, 200))
  })
  page.on('console', (message) => {
    if (message.type() === 'error' && !muteRuntime) {
      let location = ''
      try {
        location = message.location()?.url ?? ''
      } catch {
        location = ''
      }
      runtimeErrors.push('[console] ' + message.text().slice(0, 160) + (location ? ' @ ' + location : ''))
    }
  })
  page.on('response', (response) => {
    if (response.status() >= 400 && !muteRuntime) {
      runtimeErrors.push('[http] ' + response.status() + ' ' + response.url())
    }
  })

  const numbers = () =>
    page.evaluate(() =>
      Array.from(document.querySelectorAll('dd.font-mono, p.font-mono')).map((node) => node.textContent.trim())
    )
  const bodyText = () => page.evaluate(() => document.body.innerText)

  // VPS 报告：实际下载 PNG，并验证失败可见、输入清空后旧报告消失。
  const vpsResponse = await page.goto(BASE + '/tools/vps-calculator', { waitUntil: 'networkidle' })
  const csp = vpsResponse.headers()['content-security-policy'] ?? ''
  record('Analytics 收集端点已加入 CSP', csp.split(';').find((directive) => directive.trim().startsWith('connect-src '))?.split(/\s+/).includes('https://www.google.com/g/collect'), '限定到实际收集路径')
  const analyticsBootstrap = await page.locator('#google-analytics').textContent()
  for (const hostname of ['globokit.com', 'www.globokit.com', 'localhost', 'preview.vercel.app']) {
    const scripts = []
    const window = { location: { hostname } }
    vm.runInNewContext(analyticsBootstrap, { window, document: { createElement: () => ({}), head: { appendChild: (script) => scripts.push(script.src) } } })
    const production = ['globokit.com', 'www.globokit.com'].includes(hostname)
    record('Analytics 域名检查 ' + hostname, production ? scripts.length === 1 && window.dataLayer?.length === 2 : scripts.length === 0 && !window.dataLayer, 'ok')
  }
  const priceInput = page.locator('input[type="number"]').first()
  const purchaseInput = page.locator('input[type="date"]').first()
  await priceInput.fill('100')
  await purchaseInput.fill('2026-01-01')
  const exportButton = page.getByRole('button', { name: '下载图片' })
  await exportButton.waitFor()
  const downloadPromise = page.waitForEvent('download')
  await exportButton.click()
  const download = await downloadPromise
  const png = fs.readFileSync(await download.path())
  record('VPS 导出有效 PNG', png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), download.suggestedFilename())
  const imageContent = await page.evaluate(async (base64) => {
    const image = new Image()
    image.src = 'data:image/png;base64,' + base64
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const data = ctx.getImageData(72, 70, 900, 60).data
    let darkPixels = 0
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 100 && data[i + 1] < 100 && data[i + 2] < 100 && data[i + 3] > 0) darkPixels += 1
    }
    return { width: image.width, height: image.height, darkPixels }
  }, png.toString('base64'))
  record('VPS PNG 包含报告内容', imageContent.width === 1440 && imageContent.height === 1180 && imageContent.darkPixels > 500, JSON.stringify(imageContent))
  fs.writeFileSync(path.join(SHOT_DIR, 'vps-export.png'), png)
  await page.evaluate(() => {
    window.__originalToBlob = HTMLCanvasElement.prototype.toBlob
    HTMLCanvasElement.prototype.toBlob = function (callback) { callback(null) }
  })
  await exportButton.click()
  await page.getByRole('alert').filter({ hasText: '图片导出失败' }).waitFor()
  record('VPS 导出失败可见且可重试', await exportButton.isEnabled(), '失败提示已显示')
  await page.evaluate(() => { HTMLCanvasElement.prototype.toBlob = window.__originalToBlob })
  const retryPromise = page.waitForEvent('download')
  await exportButton.click()
  await retryPromise
  record('VPS 导出重试恢复', await page.getByRole('alert').filter({ hasText: '图片导出失败' }).count() === 0, '下载成功且错误提示消失')
  await priceInput.fill('')
  await page.getByText('等待输入参数', { exact: true }).waitFor()
  record('VPS 清空价格移除旧报告', await exportButton.count() === 0, 'ok')
  await priceInput.fill('100')
  await exportButton.waitFor()
  await purchaseInput.fill('')
  await page.getByText('等待输入参数', { exact: true }).waitFor()
  record('VPS 清空日期移除旧报告', await exportButton.count() === 0, 'ok')
  if (['localhost', '127.0.0.1'].includes(new URL(BASE).hostname)) {
    record('本地不加载 Analytics', await page.locator('script[src*="googletagmanager.com"]').count() === 0, 'ok')
  }

  // 全量工具页：状态码、H1、canonical、结构化数据
  for (const toolPath of toolPaths) {
    const response = await page.goto(BASE + toolPath, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('h1')
    const heading = (await page.locator('h1').first().innerText()).trim()
    record(toolPath + ' 返回 200', response.status() === 200, 'status=' + response.status())
    record(toolPath + ' H1 渲染', heading.length > 0, heading)
    const canonical = await page.evaluate(() => document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '')
    record(toolPath + ' canonical', canonical.includes(toolPath), canonical)
    const ldJson = await page.evaluate(() => document.querySelectorAll('script[type="application/ld+json"]').length)
    record(toolPath + ' 结构化数据', ldJson >= 1, 'ld+json=' + ldJson)
  }

  // 全站静态页
  for (const item of STATIC_PAGES) {
    const response = await page.goto(BASE + item.path, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('h1')
    const heading = (await page.locator('h1').first().innerText()).trim()
    record(item.name + ' 返回 200', response.status() === 200, 'status=' + response.status())
    record(item.name + ' 标题渲染', heading.includes(item.title), heading)
  }

  // 404 页兜底（该段必然产生 404 响应，静音运行时记录）
  muteRuntime = true
  const notFound = await page.goto(BASE + '/tools/not-exist-page', { waitUntil: 'domcontentloaded' })
  muteRuntime = false
  record('404 页返回 404', notFound.status() === 404, 'status=' + notFound.status())
  record('404 页中文提示', (await bodyText()).includes('页面不存在'), 'ok')

  // 交互验证：代表性页面关键控件与错误态
  await page.goto(BASE + '/tools/remittance-cost-calculator', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#orderAmount')
  const amountBefore = await numbers()
  await page.locator('#orderAmount').fill('320000')
  await page.waitForTimeout(600)
  record('收款页改金额后结果刷新', JSON.stringify(amountBefore) !== JSON.stringify(await numbers()), 'ok')
  const bearerBefore = await page.locator('#feeBearer').innerText()
  await page.locator('#feeBearer').click()
  await page.waitForTimeout(400)
  record('收款页切换费用承担方', bearerBefore !== (await page.locator('#feeBearer').innerText()), 'ok')
  record('收款页渠道开关', (await page.locator('button[aria-pressed]').count()) >= 5, 'count=' + (await page.locator('button[aria-pressed]').count()))
  await page.screenshot({ path: path.join(SHOT_DIR, 'remittance.png') })

  await page.goto(BASE + '/tools/yaml-json-converter', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#yaml-json-source')
  const outputValue = () => page.locator('textarea[aria-label="转换输出"]').inputValue()
  record('YAML 页默认产出结果', (await outputValue()).length > 0, 'len=' + (await outputValue()).length)
  await page.locator('#yaml-json-source').fill('order:' + String.fromCharCode(10) + '  id: SO-9')
  await page.waitForTimeout(500)
  record('YAML 页输入联动', (await outputValue()).includes('SO-9'), 'ok')
  await page.locator('#yaml-json-source').fill('plain text without colon')
  await page.waitForTimeout(500)
  record('YAML 页错误提示与行号', (await bodyText()).includes('转换失败') && (await bodyText()).includes('第 1 行'), 'ok')

  await page.goto(BASE + '/tools/server-cost-comparison', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('input[id$="-promo"]')
  const promoCount = await page.locator('input[id$="-promo"]').count()
  await page.getByRole('button', { name: '增加方案' }).click()
  await page.waitForTimeout(500)
  record('成本页增加方案', (await page.locator('input[id$="-promo"]').count()) === promoCount + 1, 'ok')
  const costBefore = await numbers()
  await page.locator('input[id$="-promo"]').first().fill('500')
  await page.waitForTimeout(600)
  record('成本页改套餐价刷新', JSON.stringify(costBefore) !== JSON.stringify(await numbers()), 'ok')
  record('成本页续费价告警', (await bodyText()).includes('续费价高于套餐价'), 'ok')

  await page.goto(BASE + '/tools/inquiry-priority-scorer', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('span.font-mono.text-3xl')
  const scoreSelector = 'span.font-mono.text-3xl'
  const scoreBefore = await page.locator(scoreSelector).first().textContent()
  await page.locator('button[aria-pressed]').filter({ hasText: '缺失' }).first().click()
  await page.waitForTimeout(500)
  record('询盘页切维度改分', scoreBefore !== (await page.locator(scoreSelector).first().textContent()), scoreBefore + ' -> ' + (await page.locator(scoreSelector).first().textContent()))
  record('询盘页响应时限', (await bodyText()).includes('小时内首次回复'), 'ok')

  // 移动端视口与首页入口
  const mobile = await context.newPage()
  await mobile.setViewportSize({ width: 390, height: 844 })
  for (const item of INTERACTIVE_PAGES) {
    await mobile.goto(BASE + item.path, { waitUntil: 'domcontentloaded' })
    const overflow = await mobile.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    record(item.name + ' 移动端无横向溢出', overflow <= 2, 'overflow=' + overflow)
  }
  await mobile.goto(BASE + '/tools/inquiry-priority-scorer', { waitUntil: 'domcontentloaded' })
  await mobile.screenshot({ path: path.join(SHOT_DIR, 'mobile-inquiry.png') })

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  const homeText = await bodyText()
  record('首页新工具入口', homeText.includes('收款渠道对比') && homeText.includes('服务器成本'), 'ok')
  await page.screenshot({ path: path.join(SHOT_DIR, 'home.png') })

  await browser.close()
  const failed = results.filter((item) => !item.ok)
  fs.writeFileSync(path.join(SHOT_DIR, 'web-verify.json'), JSON.stringify({ total: results.length, passed: results.length - failed.length, failed, runtimeErrors, isolatedRequests, fixtures: ['CNY 汇率接口（固定内置参考值）'], results }, null, 1))
  console.log('真实浏览器验证：' + (results.length - failed.length) + '/' + results.length + ' 项通过，页面错误 ' + runtimeErrors.length + ' 条')
  failed.forEach((item) => console.log('  未通过 ' + item.name + ' :: ' + item.detail))
  if (runtimeErrors.length > 0) {
    console.error('检测到 ' + runtimeErrors.length + ' 条页面运行时错误（React hydration、未捕获异常等），验证不通过：')
    runtimeErrors.forEach((item) => console.error('  [runtime] ' + item))
    process.exitCode = 1
  }
  if (failed.length > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error('真实浏览器验证异常：' + String(error).slice(0, 300))
  process.exitCode = 1
})
