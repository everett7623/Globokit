// 名称: 邮件签名生成逻辑
// 描述: 生成 Outlook/Gmail 兼容的内联样式 HTML 签名与纯文本签名，用户输入全部转义防注入
// 路径: Globokit/lib/tools/email-signature-generator.ts
// 作者: everettlabs
// 更新时间: 2026-10-10

export interface EmailSignatureInput {
  name: string
  title: string
  company: string
  phone: string
  mobile: string
  email: string
  website: string
  address: string
  whatsapp: string
  logoUrl: string
}

export interface EmailSignature {
  html: string
  text: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** 转义 HTML 特殊字符，防止用户输入破坏邮件结构。 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeHttpUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function validateSignatureInput(input: EmailSignatureInput): void {
  if (!input.name.trim()) throw new Error('姓名不能为空')
  if (!input.email.trim()) throw new Error('邮箱不能为空')
  if (!EMAIL_PATTERN.test(input.email.trim())) throw new Error('邮箱格式不正确')
  if (!input.phone.trim() && !input.mobile.trim()) throw new Error('座机与手机至少填写一项')
  if (input.website.trim() && /\s/.test(input.website.trim())) throw new Error('网址不能包含空格')
}

export function generateEmailSignature(rawInput: EmailSignatureInput): EmailSignature {
  validateSignatureInput(rawInput)
  const name = escapeHtml(rawInput.name.trim())
  const title = escapeHtml(rawInput.title.trim())
  const company = escapeHtml(rawInput.company.trim())
  const phone = escapeHtml(rawInput.phone.trim())
  const mobile = escapeHtml(rawInput.mobile.trim())
  const email = rawInput.email.trim()
  const emailHtml = escapeHtml(email)
  const websiteUrl = normalizeHttpUrl(rawInput.website)
  const website = escapeHtml(rawInput.website.trim())
  const address = escapeHtml(rawInput.address.trim())
  const whatsapp = escapeHtml(rawInput.whatsapp.trim())
  const logoUrl = escapeHtml(rawInput.logoUrl.trim())

  const contactRows: string[] = []
  const textLines: string[] = []

  if (phone) {
    contactRows.push(row('Tel', `<a href="tel:${escapeHtml(rawInput.phone.trim().replace(/\s+/g, ''))}" style="color:#0f766e;text-decoration:none;">${phone}</a>`))
    textLines.push(`Tel: ${rawInput.phone.trim()}`)
  }
  if (mobile) {
    contactRows.push(row('Mob', `<a href="tel:${escapeHtml(rawInput.mobile.trim().replace(/\s+/g, ''))}" style="color:#0f766e;text-decoration:none;">${mobile}</a>`))
    textLines.push(`Mobile/WhatsApp: ${rawInput.mobile.trim()}`)
  }
  if (whatsapp) {
    contactRows.push(row('WhatsApp', whatsapp))
    textLines.push(`WhatsApp: ${rawInput.whatsapp.trim()}`)
  }
  contactRows.push(row('Email', `<a href="mailto:${emailHtml}" style="color:#0f766e;text-decoration:none;">${emailHtml}</a>`))
  textLines.push(`Email: ${email}`)
  if (websiteUrl) {
    contactRows.push(row('Web', `<a href="${escapeHtml(websiteUrl)}" style="color:#0f766e;text-decoration:none;">${website}</a>`))
    textLines.push(`Web: ${rawInput.website.trim()}`)
  }
  if (address) {
    contactRows.push(row('Addr', address))
    textLines.push(`Addr: ${rawInput.address.trim()}`)
  }

  const logoCell = logoUrl
    ? `<td width="96" valign="top" style="padding-right:14px;"><img src="${logoUrl}" alt="${company || name}" width="96" style="display:block;border:0;border-radius:6px;" /></td>`
    : ''

  const html = [
    '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#334155;line-height:1.5;">',
    '<tr>',
    logoCell,
    '<td valign="top" style="padding-left:', logoUrl ? '0' : '0', ';">',
    '<table cellpadding="0" cellspacing="0" border="0">',
    `<tr><td style="padding-bottom:4px;"><span style="font-size:15px;font-weight:bold;color:#0f172a;">${name}</span>${title ? `&nbsp;<span style="font-size:12px;color:#64748b;">${title}</span>` : ''}</td></tr>`,
    company ? `<tr><td style="padding-bottom:6px;"><span style="font-size:13px;font-weight:bold;color:#0f766e;">${company}</span></td></tr>` : '',
    ...contactRows.map((line) => `<tr><td style="padding:1px 0;font-size:12px;color:#475569;">${line}</td></tr>`),
    '</table>',
    '</td>',
    '</tr>',
    '</table>',
  ].filter((line) => line !== '').join('\n')

  const textHeader = [rawInput.name.trim(), rawInput.title.trim(), rawInput.company.trim()].filter(Boolean).join(' | ')
  const text = [textHeader, ...textLines].join('\n')

  return { html, text }
}

function row(label: string, content: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0"><tr><td width="52" valign="top" style="color:#94a3b8;font-size:11px;padding-top:1px;">${label}</td><td valign="top">${content}</td></tr></table>`
}
