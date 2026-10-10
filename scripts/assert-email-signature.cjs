// 名称: 邮件签名生成器专项测试
// 描述: 覆盖 HTML 转义、链接拼装、可选字段与校验
// 路径: Globokit/scripts/assert-email-signature.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  escapeHtml,
  generateEmailSignature,
} = loadTypescriptModule('lib/tools/email-signature-generator.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

function createInput(overrides = {}) {
  return {
    name: 'Everett Zhang',
    title: 'Sales Manager',
    company: 'Globokit Trading Co., Ltd.',
    phone: '+86 574 8888 6666',
    mobile: '+86 138 0000 0000',
    email: 'everett@globokit.com',
    website: 'www.globokit.com',
    address: 'No. 88 Zhongshan East Road, Ningbo',
    whatsapp: '+86 138 0000 0000',
    logoUrl: '',
    ...overrides,
  }
}

// 转义
equal(escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;', 'HTML 标签应被转义')
equal(escapeHtml('A & "B" \'C\''), 'A &amp; &quot;B&quot; &#39;C&#39;', '特殊字符应全部转义')

// 完整签名
const sig = generateEmailSignature(createInput())
check(sig.html.includes('<table'), 'HTML 应使用 table 布局（邮件客户端兼容）')
check(sig.html.includes('style='), 'HTML 应全部内联样式')
check(sig.html.includes('Everett Zhang'), 'HTML 应含姓名')
check(sig.html.includes('mailto:everett@globokit.com'), '邮箱应生成 mailto 链接')
check(sig.html.includes('https://www.globokit.com'), '无协议网址应自动补 https')
check(sig.html.includes('Tel'), '应包含 Tel 行')
check(sig.html.includes('WhatsApp'), '应包含 WhatsApp 行')
check(sig.html.includes('Addr'), '应包含地址行')
check(!sig.html.includes('logo'), '未填 logo 不应输出图片标签')

check(sig.text.startsWith('Everett Zhang | Sales Manager | Globokit Trading Co., Ltd.'), '纯文本首行应为姓名|职位|公司')
check(sig.text.includes('Email: everett@globokit.com'), '纯文本应含邮箱')
check(sig.text.includes('Web: www.globokit.com'), '纯文本应含网址原始输入')

// 最小签名：只填姓名+邮箱+手机
const minimal = generateEmailSignature(createInput({
  title: '', company: '', phone: '', website: '', address: '', whatsapp: '', logoUrl: '',
}))
check(minimal.html.includes('Mob'), '手机应渲染为 Mob 行')
check(!minimal.html.includes('Tel'), '未填座机不应输出 Tel 行')
check(!minimal.html.includes('Web'), '未填网址不应输出 Web 行')
check(!minimal.text.includes('undefined'), '纯文本不应出现 undefined')

// XSS 防护
const malicious = generateEmailSignature(createInput({
  name: '<img src=x onerror=alert(1)>',
  company: 'A&B "Quotes"',
}))
check(!malicious.html.includes('<img src=x'), '姓名中的 HTML 标签必须被转义')
check(malicious.html.includes('&lt;img src=x'), '恶意输入应以转义文本呈现')
check(malicious.html.includes('A&amp;B &quot;Quotes&quot;'), '公司名特殊字符应转义')

// logo
const withLogo = generateEmailSignature(createInput({ logoUrl: 'https://example.com/logo.png' }))
check(withLogo.html.includes('<img src="https://example.com/logo.png"'), 'logo 应输出 img 标签')
check(withLogo.html.includes('width="96"'), 'logo 应固定 96 宽度')

// 校验
throws(() => generateEmailSignature(createInput({ name: '  ' })), /姓名/, '姓名为空应报错')
throws(() => generateEmailSignature(createInput({ email: '' })), /邮箱/, '邮箱为空应报错')
throws(() => generateEmailSignature(createInput({ email: 'not-an-email' })), /邮箱格式/, '邮箱格式错误应报错')
throws(() => generateEmailSignature(createInput({ phone: '', mobile: '' })), /至少填写一项/, '座机手机全空应报错')
throws(() => generateEmailSignature(createInput({ website: 'a b c' })), /网址/, '网址含空格应报错')

console.log(`email-signature-generator: ${assertionCount} 条断言全部通过`)
