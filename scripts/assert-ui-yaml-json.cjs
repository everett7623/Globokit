// 名称: YAML 与 JSON 互转页交互测试
// 描述: 在 jsdom 环境中渲染工具页组件并驱动真实交互，验证表单、按钮与结果刷新
// 路径: Globokit/scripts/assert-ui-yaml-json.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18

const assert = require('node:assert/strict')
const path = require('node:path')
const { createEnvironment } = require('./ui-test-env.cjs')

const { window } = createEnvironment()
const React = require('react')
const { createRoot } = require('react-dom/client')
const page = require(path.join(__dirname, '..', '.ui-test-bundles', 'yaml-json.cjs'))

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

ok(text('h1').includes('YAML 与 JSON 互转'), '页面标题渲染')
const output = () => q('textarea[aria-label="转换输出"]')?.value ?? ''
ok(output().length > 0, '默认示例即产出转换结果')
ok(output().includes('"service": "globokit"'), '默认 YAML 示例转换为 JSON')
ok(bodyText().includes('往返校验通过'), '往返校验标记渲染')

setTextArea(q('#yaml-json-source'), 'a: 1' + String.fromCharCode(10) + 'b: true')
ok(output().includes('"a": 1'), '修改输入后 JSON 输出跟随更新')
ok(output().includes('"b": true'), '布尔值按 JSON 类型输出')

setTextArea(q('#yaml-json-source'), 'a: 1' + String.fromCharCode(10) + 'plain text')
ok(bodyText().includes('转换失败'), '非法 YAML 触发错误提示')
ok(bodyText().includes('第 2 行'), '错误提示给出行号')
equal(output(), '', '解析失败时不展示输出')

setTextArea(q('#yaml-json-source'), 'x: [1, 2, 3]')
ok(!bodyText().includes('转换失败'), '修正输入后错误提示消失')
ok(output().includes('"x"'), '数组输入正常转换')
click(findByText('button', 'JSON → YAML'))
setTextArea(q('#yaml-json-source'), 'a: 1')
ok(bodyText().includes('转换失败'), 'JSON 模式下解析 YAML 输入时给出错误提示')
setTextArea(q('#yaml-json-source'), '{"order": {"id": "SO-1", "qty": 200}}')
ok(!bodyText().includes('转换失败'), '修正输入后错误提示消失')
ok(output().includes('order:'), 'JSON 输入转换为 YAML 输出')
ok(output().includes('id: SO-1'), 'YAML 输出包含字符串键值')
ok(findByText('button', '复制结果') !== undefined, '结果复制按钮存在')
ok(findByText('button', '复制摘要') !== undefined, '摘要复制按钮存在')
ok(findByText('button', '复制结果') !== undefined, '结果复制按钮存在')
ok(findByText('button', '复制摘要') !== undefined, '摘要复制按钮存在')

console.log("YAML 互转页交互：" + assertionCount + " 条断言通过")
