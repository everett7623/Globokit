// 名称: 询盘优先级评估页交互测试
// 描述: 在 jsdom 环境中渲染工具页组件并驱动真实交互，验证表单、按钮与结果刷新
// 路径: Globokit/scripts/assert-ui-inquiry.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18

const assert = require('node:assert/strict')
const path = require('node:path')
const { createEnvironment } = require('./ui-test-env.cjs')

const { window } = createEnvironment()
const React = require('react')
const { createRoot } = require('react-dom/client')
const page = require(path.join(__dirname, '..', '.ui-test-bundles', 'inquiry.cjs'))

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

ok(text('h1').includes('外贸询盘优先级评估'), '页面标题渲染')
const scoreBefore = text('span.font-mono.text-3xl')
ok(scoreBefore !== '', '总分渲染 ' + scoreBefore)
ok(all('button[aria-pressed]').length >= 14, '十四个维度开关渲染')

const target = findByText('button[aria-pressed]', '缺失')
ok(Boolean(target), '存在处于缺失状态的维度')
click(target)
const scoreAfter = text('span.font-mono.text-3xl')
ok(scoreBefore !== scoreAfter, '切换维度后总分变化 ' + scoreBefore + ' -> ' + scoreAfter)
ok(bodyText().includes('小时内首次回复'), '页面给出建议响应时限')

const scoreBeforeLength = text('span.font-mono.text-3xl')
setValue(q('#messageLength'), '9')
const scoreAfterLength = text('span.font-mono.text-3xl')
ok(scoreBeforeLength !== scoreAfterLength || scoreBeforeLength === '98', '正文段落数影响加分')

ok(findByText('button', '复制中文追问') !== undefined, '中文追问按钮存在')
ok(findByText('button', '复制英文追问') !== undefined, '英文追问按钮存在')
ok(findByText('button', '复制评估摘要') !== undefined, '评估摘要按钮存在')
ok(bodyText().includes('已满足信息'), '页面展示已满足信息分组')
ok(bodyText().includes('待补齐信息'), '页面展示待补齐信息分组')

console.log("询盘评估页交互：" + assertionCount + " 条断言通过")
