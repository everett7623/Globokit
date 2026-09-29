// 名称: 服务器成本对比页交互测试
// 描述: 在 jsdom 环境中渲染工具页组件并驱动真实交互，验证表单、按钮与结果刷新
// 路径: Globokit/scripts/assert-ui-server-cost.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18

const assert = require('node:assert/strict')
const path = require('node:path')
const { createEnvironment } = require('./ui-test-env.cjs')

const { window } = createEnvironment()
const React = require('react')
const { createRoot } = require('react-dom/client')
const page = require(path.join(__dirname, '..', '.ui-test-bundles', 'server-cost.cjs'))

let assertionCount = 0
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }

const q = (selector) => document.querySelector(selector)
const all = (selector) => Array.from(document.querySelectorAll(selector))
const text = (selector) => (q(selector)?.textContent ?? '').trim()
const bodyText = () => document.body.textContent ?? ''
const numbers = () => all('dd.font-mono, p.font-mono').map((node) => node.textContent.trim())
const click = (node) => React.act(() => { node.dispatchEvent(new window.MouseEvent('click', { bubbles: true })) })
const findByText = (selector, needle) => all(selector).find((node) => node.textContent.includes(needle))
const setValue = (node, value) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  React.act(() => {
    setter.call(node, value)
    node.dispatchEvent(new window.Event('input', { bubbles: true }))
    node.dispatchEvent(new window.Event('change', { bubbles: true }))
  })
}
const setTextArea = (node, value) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
  React.act(() => {
    setter.call(node, value)
    node.dispatchEvent(new window.Event('input', { bubbles: true }))
    node.dispatchEvent(new window.Event('change', { bubbles: true }))
  })
}

const root = createRoot(document.getElementById('root'))
React.act(() => { root.render(React.createElement(page.default)) })

ok(text('h1').includes('服务器成本对比'), '页面标题渲染')
const promoInputs = () => all('input[id$="-promo"]')
const initialCount = promoInputs().length
ok(initialCount >= 2, '默认渲染多个方案 ' + initialCount + ' 个')
ok(bodyText().includes('续费价高于套餐价'), '识别活动机续费价风险并告警')

click(findByText('button', '增加方案'))
equal(promoInputs().length, initialCount + 1, '点击增加方案后多出一个方案')
click(findByText('button', '删除末位'))
equal(promoInputs().length, initialCount, '点击删除末位后方案数量还原')

const costBefore = numbers().join('|')
setValue(promoInputs()[0], '500')
ok(costBefore !== numbers().join('|'), '修改套餐价后成本结果刷新')

const holdingBefore = numbers().join('|')
setValue(q('#holdingMonths'), '36')
ok(holdingBefore !== numbers().join('|'), '修改持有月数后总成本刷新')

const rateBefore = numbers().join('|')
setValue(q('#exchangeRate'), '7.80')
ok(rateBefore !== numbers().join('|'), '修改汇率后成本同步变化')

const flagButtons = () => all('button[aria-pressed]')
ok(flagButtons().length >= initialCount * 2, '每个方案都有控制面板与备份开关')
const flagBefore = flagButtons()[0].textContent.trim()
click(flagButtons()[0])
ok(flagBefore !== flagButtons()[0].textContent.trim(), '方案配置开关可切换')
ok(findByText('button', '复制对比摘要') !== undefined, '对比摘要复制按钮存在')

console.log("服务器成本页交互：" + assertionCount + " 条断言通过")
