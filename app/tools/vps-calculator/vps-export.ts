// 名称: VPS 报告导出
// 描述: 构建 VPS 剩余价值 Markdown 报告
// 路径: Globokit/app/tools/vps-calculator/vps-export.ts
// 作者: wwj
// 更新时间: 2026-07-15

import { formatCurrency, formatDate, RENEWAL_PERIODS, SUPPORTED_CURRENCIES, type CalculationResult } from '@/lib/tools/vps-calculator'

interface VpsMarkdownOptions {
  result: CalculationResult
  currency: string
  renewalPeriod: string
  purchaseDate: string
  purchasePrice: string
}

export function buildVpsMarkdown(options: VpsMarkdownOptions) {
  const { result, currency, renewalPeriod, purchaseDate, purchasePrice } = options
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
更多工具请访问：Globokit.com
`.trim()
}
