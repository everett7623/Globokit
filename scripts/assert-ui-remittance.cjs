// 名称: 国际收款渠道对比页交互测试
// 描述: 在 jsdom 环境中渲染工具页组件并驱动真实交互，验证表单、按钮与结果刷新
// 路径: Globokit/scripts/assert-ui-remittance.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18

const assert = require('node:assert/strict')
const path = require('node:path')
const { createEnvironment } = require('./ui-test-env.cjs')

const { window } = createEnvironment()
const React = require('react')
const { createRoot } = require('react-dom/client')
const page = require(path.join(__dirname, '..', '.ui-test-bundles', 'remittance.cjs'))

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

ok(text('h1').includes('国际收款渠道费用对比'), '页面标题渲染')
equal(q('#orderAmount').value, '50,000', '格式化输入框按千分位显示初始金额')
ok(numbers().length >= 4, '统计与结果卡片渲染数值 ' + numbers().length + ' 项')
ok(all('input').length >= 3, '表单输入渲染 ' + all('input').length + ' 个')

const beforeAmount = numbers().join('|')
setValue(q('#orderAmount'), '320000')
const afterAmount = numbers().join('|')
ok(beforeAmount !== afterAmount, '修改订单金额后结果刷新')
ok(afterAmount.includes('97,689.00'), '按 32 万美元与 7.15 汇率折算到手金额')
ok(numbers().some((item) => item.includes('7,185.75')), '第三方渠道手续费按 3.4% 放大')

const bearerBefore = text('#feeBearer')
click(q('#feeBearer'))
const bearerAfter = text('#feeBearer')
ok(bearerBefore !== bearerAfter, '切换费用承担方生效')
ok(bearerAfter.includes('买方承担'), '切换后文案变为买方承担')

const channelButton = findByText('button[aria-pressed]', 'L/C')
ok(Boolean(channelButton), '信用证渠道开关存在')
const channelBefore = channelButton.getAttribute('aria-pressed')
click(channelButton)
const channelAfter = findByText('button[aria-pressed]', 'L/C').getAttribute('aria-pressed')
ok(channelBefore !== channelAfter, '渠道开关状态可切换')
ok(findByText('button', '复制对比摘要') !== undefined, '对比摘要复制按钮存在')
ok(findByText('button', '重置') !== undefined, '重置按钮存在')
ok(bodyText().includes('贷方费率为常见区间参考值'), '页面含费率口径说明')

console.log("收款渠道页交互：" + assertionCount + " 条断言通过")
