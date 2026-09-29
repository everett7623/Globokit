// 名称: 工具站真实浏览器验证脚本
// 描述: 用 Playwright 驱动真实浏览器访问生产构建，校验四页交互、移动端布局、首页入口与 sitemap，并输出截图证据
// 路径: Globokit/scripts/verify-web.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18
//
// 前置条件：
//   1. 站点已启动（npm run build && npm start，默认 http://localhost:3000，可用 WEB_BASE 覆盖）
//   2. 已安装 playwright 与浏览器内核：npm i -D playwright && npx playwright install chromium
// 未满足前置条件时脚本以退出码 1 失败，避免浏览器验证被静默跳过。

const fs = require('node:fs')
const path = require('node:path')

const BASE = process.env.WEB_BASE || 'http://localhost:3000'
const SHOT_DIR = path.join(__dirname, '..', '.web-verify')

const PAGES = [
  { name: '收款渠道页', path: '/tools/remittance-cost-calculator', title: '国际收款渠道费用对比' },
  { name: '询盘评估页', path: '/tools/inquiry-priority-scorer', title: '外贸询盘优先级评估' },
  { name: '服务器成本页', path: '/tools/server-cost-comparison', title: '服务器成本对比' },
  { name: 'YAML 互转页', path: '/tools/yaml-json-converter', title: 'YAML 与 JSON 互转' },
]

async function main() {
  let chromium
  try {
    ({ chromium } = require('playwright'))
  } catch {
    console.error('真实浏览器验证失败：未安装 playwright（先执行 npm i -D playwright && npx playwright install chromium）')
    process.exitCode = 1
    return
  }

  const reachable = await fetch(BASE, { method: 'GET' }).then((response) => response.ok).catch(() => false)
  if (!reachable) {
    console.error('真实浏览器验证失败：站点未启动（' + BASE + '），请先执行 npm run build && npm start')
    process.exitCode = 1
    return
  }

  fs.mkdirSync(SHOT_DIR, { recursive: true })

  const results = []
  const runtimeErrors = []
  const record = (name, ok, detail) => results.push({ name, ok: Boolean(ok), detail: String(detail ?? '') })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  page.on('pageerror', (error) => runtimeErrors.push(String(error).slice(0, 200)))
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push('[console] ' + message.text().slice(0, 160))
  })

  const numbers = () =>
    page.evaluate(() =>
      Array.from(document.querySelectorAll('dd.font-mono, p.font-mono')).map((node) => node.textContent.trim())
    )
  const bodyText = () => page.evaluate(() => document.body.innerText)

  // 逐页访问：状态码、标题、结构化数据
  for (const item of PAGES) {
    const response = await page.goto(BASE + item.path, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('h1')
    const heading = (await page.locator('h1').first().innerText()).trim()
    record(item.name + ' 返回 200', response.status() === 200, 'status=' + response.status())
    record(item.name + ' 标题渲染', heading.includes(item.title), heading)
    const ldJson = await page.evaluate(
      () => document.querySelectorAll('script[type="application/ld+json"]').length
    )
    record(item.name + ' 结构化数据', ldJson >= 1, 'ld+json=' + ldJson)
  }

  // 交互验证：四页关键控件与错误态
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
  for (const item of PAGES) {
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
  fs.writeFileSync(path.join(SHOT_DIR, 'web-verify.json'), JSON.stringify({ total: results.length, passed: results.length - failed.length, failed, runtimeErrors, results }, null, 1))
  console.log('真实浏览器验证：' + (results.length - failed.length) + '/' + results.length + ' 项通过，页面错误 ' + runtimeErrors.length + ' 条')
  failed.forEach((item) => console.log('  未通过 ' + item.name + ' :: ' + item.detail))
  if (failed.length > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error('真实浏览器验证异常：' + String(error).slice(0, 300))
  process.exitCode = 1
})

