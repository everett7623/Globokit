// 名称: VPS 报告导出
// 描述: 构建 VPS 剩余价值 Markdown 报告
// 路径: Globokit/app/tools/vps-calculator/vps-export.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { formatCurrency, formatDate, RENEWAL_PERIODS, SUPPORTED_CURRENCIES, type CalculationResult } from '@/lib/tools/vps-calculator'

export interface VpsMarkdownOptions {
  result: CalculationResult
  currency: string
  renewalPeriod: string
  purchaseDate: string
  purchasePrice: string
  rateLabel: string
}

/** 直接绘制报告，避免 DOM 截图库对现代 CSS 颜色和跨域资源的依赖。 */
export async function buildVpsImage(options: VpsMarkdownOptions & { tradeDate: string }): Promise<Blob> {
  const { result, currency, purchaseDate, purchasePrice, renewalPeriod, rateLabel, tradeDate } = options
  const symbol = SUPPORTED_CURRENCIES.find((item) => item.code === currency)?.symbol ?? currency
  const cycle = RENEWAL_PERIODS.find((item) => item.value === Number.parseInt(renewalPeriod))?.label ?? '-'
  const canvas = document.createElement('canvas')
  canvas.width = 1440
  canvas.height = 1180
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('浏览器不支持图片导出')
  const text = (value: string, x: number, y: number, size = 24, color = '#334155', bold = false, maxWidth = 1320) => {
    ctx.font = `${bold ? '600 ' : ''}${size}px system-ui, "Microsoft YaHei", sans-serif`
    ctx.fillStyle = color
    ctx.fillText(value, x, y, maxWidth)
  }
  ctx.fillStyle = '#f1f5f9'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(32, 32, 1376, 1116)
  text('VPS 剩余价值分析报告', 72, 112, 40, '#0f172a', true)
  text(`估值日期 ${tradeDate} · ${rateLabel}`, 72, 163, 22, '#64748b')

  const metrics = [
    { label: '剩余价值', value: `¥${formatCurrency(result.remainingValue)}`, color: '#1d4ed8' },
    { label: '期望售价', value: `¥${formatCurrency(result.expectedPrice)}`, color: '#6d28d9' },
    { label: result.premium >= 0 ? '预期溢价' : '预期折价', value: `${result.premium >= 0 ? '+' : '-'}¥${formatCurrency(Math.abs(result.premium))}`, color: result.premium >= 0 ? '#047857' : '#be123c' },
  ]
  metrics.forEach((metric, index) => {
    const x = 72 + index * 440
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(x, 205, 416, 145)
    text(metric.label, x + 24, 251, 24, metric.color)
    text(metric.value, x + 24, 311, 36, '#0f172a', true, 368)
  })

  const details = [
    ['原购价格', `${symbol}${purchasePrice}（约 ¥${formatCurrency(result.purchasePriceCNY)}）`],
    ['购买日期', purchaseDate],
    ['续费周期', cycle],
    ['到期日期', formatDate(new Date(result.expireDate))],
    ['总服务期限', `${result.totalDays} 天`],
    ['已用 / 剩余天数', `${result.usedDays} / ${result.remainingDays} 天`],
    ['日均成本', `¥${result.dailyPrice.toFixed(2)}`],
    ['溢价 / 折价比例', `${result.premiumPercent.toFixed(2)}%`],
  ]
  details.forEach(([label, value], index) => {
    const y = 412 + index * 64
    text(label, 80, y, 24, '#64748b')
    text(value, 480, y, 26, '#0f172a', false, 860)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(80, y + 22, 1280, 1)
  })
  const usedPercent = Math.min(100, Math.max(0, (1 - result.remainingRatio) * 100))
  text(`生命周期进度 ${usedPercent.toFixed(1)}%`, 80, 974, 24, '#64748b')
  ctx.fillStyle = '#e2e8f0'
  ctx.fillRect(80, 1000, 1280, 16)
  ctx.fillStyle = '#059669'
  ctx.fillRect(80, 1000, 1280 * usedPercent / 100, 16)
  text('Globokit.com · VPS Calculator', 80, 1092, 24, '#64748b')
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('图片生成失败')), 'image/png')
  })
}

export function buildVpsMarkdown(options: VpsMarkdownOptions) {
  const { result, currency, renewalPeriod, purchaseDate, purchasePrice, rateLabel } = options
  const symbol = SUPPORTED_CURRENCIES.find((item) => item.code === currency)?.symbol
  const cycleLabel = RENEWAL_PERIODS.find((item) => item.value === Number.parseInt(renewalPeriod))?.label
  const isProfit = result.premium >= 0
  const profitSign = isProfit ? '+' : ''
  const profitLabel = isProfit ? '溢价收益' : '折价损失'
  const now = new Date()
  const formattedTime = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  return `
# VPS 剩余价值计算结果

| 分类 | 项目 | 数值 | 说明 |
| :--- | :--- | :--- | :--- |
| **价格信息** | 原购价格 | ${symbol}${purchasePrice} | 约 ¥${formatCurrency(result.purchasePriceCNY)} |
| | 期望售价 | ¥${formatCurrency(result.expectedPrice)} | 人民币计价 |
| | 剩余价值 | ¥${formatCurrency(result.remainingValue)} | 当前估值 |
| | ${profitLabel} | ${profitSign}¥${formatCurrency(result.premium)} | 预期${isProfit ? '盈利' : '亏损'} |
| | 投资回报率 | ${profitSign}${result.premiumPercent.toFixed(2)}% | ROI 指标 |
| **时间信息** | 购买日期 | ${purchaseDate} | 起始时间 |
| | 续费周期 | ${cycleLabel} | 服务期限 |
| | 到期日期 | ${formatDate(new Date(result.expireDate))} | 截止时间 |
| | 总使用期限 | ${result.totalDays} 天 | 完整周期 |
| | 已使用时间 | ${result.usedDays} 天 | 已消耗时间 |
| | 剩余时间 | ${result.remainingDays} 天 | 可用时间 |
| | 使用进度 | ${((1 - result.remainingRatio) * 100).toFixed(0)}% | 完成度 |

## 分析结论

${isProfit
  ? `**推荐交易**\n\n按期望售价 **¥${formatCurrency(result.expectedPrice)}** 出售，可获得 **¥${formatCurrency(result.premium)}** 的额外收益，投资回报率达到 **${result.premiumPercent.toFixed(2)}%**，建议按此价格进行交易。`
  : `**性价比交易**\n\n当前定价低于剩余价值，属于折价出售。买家相当于获得了 **${formatCurrency(Math.abs(result.premium))}元** 的优惠，性价比较高。`
}

---

报告生成时间：${formattedTime}
数据来源：VPS 剩余价值计算器
汇率来源：${rateLabel}
更多工具请访问：Globokit.com
`.trim()
}
