// 名称: jsdom 交互测试环境
// 描述: 为工具页组件测试提供浏览器级全局对象（DOM、事件、观察器与样式 API）
// 路径: Globokit/scripts/ui-test-env.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18

const { JSDOM } = require('jsdom')

function createEnvironment() {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: 'http://localhost:3000',
    pretendToBeVisual: true,
  })
  const window = dom.window

  const globals = [
    'window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'HTMLTextAreaElement',
    'HTMLSelectElement', 'HTMLButtonElement', 'HTMLLabelElement', 'HTMLFormElement', 'HTMLDivElement',
    'HTMLSpanElement', 'Element', 'Node', 'DocumentFragment', 'Event', 'CustomEvent', 'KeyboardEvent',
    'MouseEvent', 'PointerEvent', 'FocusEvent', 'InputEvent', 'WheelEvent', 'SVGElement', 'DOMParser',
    'XMLSerializer', 'MutationObserver', 'Range', 'CSSStyleDeclaration', 'DOMRect', 'AbortSignal', 'Blob',
  ]
  global.window = window
  global.document = window.document
  global.navigator = window.navigator
  globals.forEach((key) => {
    if (window[key] !== undefined) global[key] = window[key]
  })

  global.getComputedStyle = window.getComputedStyle.bind(window)
  global.requestAnimationFrame = (callback) => window.setTimeout(() => callback(Date.now()), 0)
  global.cancelAnimationFrame = (id) => window.clearTimeout(id)
  global.IS_REACT_ACT_ENVIRONMENT = true

  window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  })
  global.matchMedia = window.matchMedia

  const noopObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  global.ResizeObserver = window.ResizeObserver || noopObserver
  window.ResizeObserver = global.ResizeObserver
  global.IntersectionObserver = noopObserver
  window.IntersectionObserver = noopObserver

  window.HTMLElement.prototype.getBoundingClientRect = function () {
    return { x: 0, y: 0, width: 320, height: 44, top: 0, left: 0, right: 320, bottom: 44, toJSON() { return {} } }
  }
  window.Element.prototype.scrollIntoView = function () {}
  window.HTMLElement.prototype.hasPointerCapture = function () { return false }
  window.HTMLElement.prototype.setPointerCapture = function () {}
  window.HTMLElement.prototype.releasePointerCapture = function () {}

  global.fetch = window.fetch = async () => ({ ok: true, status: 200, json: async () => ({}) })

  return { window, dom }
}

module.exports = { createEnvironment }

