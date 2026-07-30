#!/usr/bin/env node
// 名称: 批量应用 UX 增强组件
// 描述: 为剩余工具批量替换复制按钮、添加移动端包装器
// 路径: Globokit/scripts/apply-ux-remaining.mjs
// 用法: node scripts/apply-ux-remaining.mjs

import { readFileSync, writeFileSync } from 'fs'

const read = (path) => readFileSync(path, 'utf-8')
const write = (path, content) => {
  writeFileSync(path, content, 'utf-8')
  console.log(`✓ ${path}`)
}

// ─────────────────────────────────────────────
// 1. 海运费用拆分计算器 (Pattern A: 有 form 组件)
// ─────────────────────────────────────────────
{
  const p = 'app/tools/ocean-freight-calculator/page.tsx'
  let c = read(p)
  c = c.replace(
    `import { calculateOceanFreight, type OceanFreightInputs, type OceanFreightMode } from '@/lib/tools/ocean-freight-calculator'`,
    `import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'\nimport { calculateOceanFreight, type OceanFreightInputs, type OceanFreightMode } from '@/lib/tools/ocean-freight-calculator'`
  )
  c = c.replace(`\n  const [copied, setCopied] = useState(false)\n`, '\n')
  // 替换 copySummary 函数 → getSummaryText
  c = c.replace(
    /  const copySummary = async \(\) => \{[\s\S]*?window\.setTimeout\(\(\) => setCopied\(false\), 1800\)\n  \}/,
    `  const getSummaryText = () => [\n      '海运费用拆分测算', \`运输方式：\${result.modeLabel}\`, \`数量：\${result.quantity} 件\`, \`计费体积：\${formatNumber(result.chargeableCbm, 3)} CBM\`,\n      \`总毛重：\${formatNumber(toNumber(form.totalWeightKg), 2)} kg\`, \`海运费：\${formatCny(result.freightCny)}\`, \`目的港费用：\${formatCny(result.destinationChargeCny)}\`,\n      \`起运端费用：\${formatCny(result.originSubtotalCny)}\`, \`保险费：\${formatCny(result.insuranceFeeCny)}\`, \`总费用：\${formatCny(result.totalCostCny)}\`,\n      \`每CBM：\${formatCny(result.perCbmCny)}\`, \`每件摊费：\${formatCny(result.perCartonCny)}\`,\n    ].join('\\n')`
  )
  // 修复排版错误 + 更新 JSX
  c = c.replace('gap-6lg:grid-cols', 'gap-6 lg:grid-cols')
  c = c.replace('form={form} copied={copied} onFieldChange', 'form={form} onFieldChange')
  c = c.replace('onCopy={copySummary}', 'summaryText={getSummaryText()}')
  // 包裹 MobileFriendlyWrapper
  c = c.replace('  return (\n    <>\n', '  return (\n    <MobileFriendlyWrapper>\n')
  c = c.replace('    </>\n  )\n}', '    </MobileFriendlyWrapper>\n  )\n}')
  write(p, c)
}

// ocean-freight form 组件
{
  const p = 'app/tools/ocean-freight-calculator/ocean-freight-form.tsx'
  let c = read(p)
  c = c.replace(
    `import { Calculator, Check, ClipboardCopy, Info, RotateCcw } from 'lucide-react'`,
    `import { Calculator, Info, RotateCcw } from 'lucide-react'`
  )
  c = c.replace(
    `import { OCEAN_PRESETS, type FormState, type NumericField } from './ocean-freight-page-data'`,
    `import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'\nimport { MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'\nimport { OCEAN_PRESETS, type FormState, type NumericField } from './ocean-freight-page-data'`
  )
  c = c.replace('  copied: boolean\n', '')
  c = c.replace('  onCopy: () => void\n', '  summaryText: string\n')
  c = c.replace(
    `        <div className="flex flex-wrap gap-2">\n          <Button type="button" onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{props.copied ? '已复制' : '复制测算摘要'}</Button>\n          <Button type="button" variant="outline" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button>\n        </div>`,
    `        <MobileButtonGroup>\n          <EnhancedCopyButton text={props.summaryText}>复制测算摘要</EnhancedCopyButton>\n          <Button type="button" variant="outline" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button>\n        </MobileButtonGroup>`
  )
  write(p, c)
}

// ─────────────────────────────────────────────
// 2. 出口退税计算器 (Pattern B: 全内联)
// ─────────────────────────────────────────────
{
  const p = 'app/tools/export-tax-rebate-calculator/page.tsx'
  let c = read(p)
  // 移除 Check/ClipboardCopy，加 EnhancedCopyButton
  c = c.replace(
    `import { Calculator, Check, ClipboardCopy, Info, Percent, ReceiptText, RotateCcw, TrendingUp, Wallet } from 'lucide-react'`,
    `import { Calculator, Info, Percent, ReceiptText, RotateCcw, TrendingUp, Wallet } from 'lucide-react'\nimport { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'\nimport { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'`
  )
  c = c.replace(`\n  const [copied, setCopied] = useState(false)\n`, '\n')
  // 替换 copy 函数
  c = c.replace(
    /  const copy = async \(\) => \{[\s\S]*?setCopied\(true\); window\.setTimeout\(\(\) => setCopied\(false\), 1800\) \}/,
    `  const getSummaryText = () => [\`出口退税测算\`,\`采购口径：\${form.purchaseTaxMode === 'tax-inclusive' ? '含税采购' : '未税采购'}\`,\`增值税率/退税率：\${form.vatRatePercent}% / \${form.rebateRatePercent}%\`,\`FOB 收入：\${money.format(result.fobRevenueCny)}\`,\`预计退税：\${money.format(result.estimatedRebateCny)}\`,\`征退税差成本：\${money.format(result.nonRefundableTaxCostCny)}\`,\`采购现金支出：\${money.format(result.purchaseCashOutflowCny)}\`,\`出口费用：\${money.format(result.exportExpenseCny)}\`,\`退税后利润：\${money.format(result.profitBeforeTaxCny)}\`,\`利润率：\${result.profitMarginPercent.toFixed(2)}%\`].join('\\n')`
  )
  // 替换复制按钮
  c = c.replace(
    `<Button onClick={copy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制测算摘要'}</Button>`,
    `<EnhancedCopyButton text={getSummaryText()}>复制测算摘要</EnhancedCopyButton>`
  )
  // 包裹 MobileFriendlyWrapper
  c = c.replace('  return <><div className="mb-8">', '  return <MobileFriendlyWrapper><div className="mb-8">')
  c = c.replace(/  return <><div className="mb-8">/, '  return <MobileFriendlyWrapper><div className="mb-8">')
  c = c.replace(/<\/>\s*\n\}[\s]*$/, `</MobileFriendlyWrapper>\n}\n`)
  write(p, c)
}

// ─────────────────────────────────────────────
// 3. 托盘装载计算器 (Pattern B: 全内联)
// ─────────────────────────────────────────────
{
  const p = 'app/tools/pallet-load-calculator/page.tsx'
  let c = read(p)
  c = c.replace(
    `import { Boxes, Check, ClipboardCopy, Info, Layers3, RotateCcw, Weight } from 'lucide-react'`,
    `import { Boxes, Info, Layers3, RotateCcw, Weight } from 'lucide-react'\nimport { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'\nimport { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'`
  )
  c = c.replace(`\n  const [copied, setCopied] = useState(false)\n`, '\n')
  c = c.replace(
    /  const copy = async \(\) => \{[\s\S]*?setCopied\(true\); window\.setTimeout\(\(\) => setCopied\(false\), 1800\)\n  \}/,
    `  const getSummaryText = () => ['托盘装载测算', \`纸箱：\${form.cartonLengthCm} × \${form.cartonWidthCm} × \${form.cartonHeightCm} cm，\${form.cartonWeightKg} kg/箱\`, \`货物总数：\${form.cartonQuantity} 箱\`, \`托盘：\${result.pallet.name}\`, \`限制：含托高 \${form.maxLoadedHeightCm} cm，单托毛重 \${form.maxGrossWeightKg} kg\`, \`单层：\${result.bestOrientation.cartonsPerLayer} 箱\`, \`层数：\${result.maxLayers} 层\`, \`单托：\${result.cartonsPerPallet} 箱\`, \`预计托盘数：\${result.requiredPallets} 托（末托 \${result.lastPalletCartons} 箱）\`, \`单托毛重：\${result.grossWeightKg} kg\`, \`含托高度：\${result.loadedHeightCm} cm\`, \`限制因素：\${result.limitingFactor === 'weight' ? '载重' : '尺寸/高度'}\`].join('\\n')`
  )
  c = c.replace(
    `<Button onClick={copy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制装载摘要'}</Button>`,
    `<EnhancedCopyButton text={getSummaryText()}>复制装载摘要</EnhancedCopyButton>`
  )
  c = c.replace('  return <>\n', '  return <MobileFriendlyWrapper>\n')
  c = c.replace(/  <\/>\n\}[\s]*$/, '  </MobileFriendlyWrapper>\n}\n')
  write(p, c)
}

// ─────────────────────────────────────────────
// 4. 报关费用估算器 (Pattern B: 全内联)
// ─────────────────────────────────────────────
{
  const p = 'app/tools/customs-cost-calculator/page.tsx'
  let c = read(p)
  c = c.replace(
    `import { Calculator, Check, ClipboardCopy, FileCheck2, Info, Package, RotateCcw, ShieldCheck, Wallet } from 'lucide-react'`,
    `import { Calculator, FileCheck2, Info, Package, RotateCcw, ShieldCheck, Wallet } from 'lucide-react'\nimport { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'\nimport { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'`
  )
  c = c.replace(`\n  const [copied, setCopied] = useState(false)\n`, '\n')
  c = c.replace(
    /  const copySummary = async \(\) => \{[\s\S]*?window\.setTimeout\(\(\) => setCopied\(false\), 1800\)\n  \}/,
    `  const getSummaryText = () => [\n      '报关费用估算', \`业务方向：\${result.directionLabel}\`, \`预计总费用：\${money.format(result.totalExpectedCostCny)}\`,\n      \`报关票数：\${result.shipmentCount} 票\`, \`申报品名：\${form.declarationItemCount} 项（基础含 \${form.includedItemCount} 项）\`,\n      \`每票费用：\${money.format(result.perShipmentCny)}\`, \`每件摊费：\${money.format(result.perItemCny)}\`,\n      \`货值占比：\${result.cargoValueRatioPercent.toFixed(2)}%\`, \`查验概率：\${form.inspectionProbabilityPercent}%\`, \`查验期望成本：\${money.format(result.expectedInspectionCostCny)}\`,\n    ].join('\\n')`
  )
  c = c.replace(
    `<Button onClick={copySummary}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制估算摘要'}</Button>`,
    `<EnhancedCopyButton text={getSummaryText()}>复制估算摘要</EnhancedCopyButton>`
  )
  c = c.replace('  return <>\n', '  return <MobileFriendlyWrapper>\n')
  c = c.replace(/  <\/>\n\}[\s]*$/, '  </MobileFriendlyWrapper>\n}\n')
  write(p, c)
}

// ─────────────────────────────────────────────
// 5. 简单工具 — 仅添加 MobileFriendlyWrapper (8个)
// ─────────────────────────────────────────────
const SIMPLE_TOOLS = [
  { dir: 'barcode-generator',       returnTag: '  return (' },
  { dir: 'delivery-date-calculator', returnTag: '  return (' },
  { dir: 'global-country-info',      returnTag: '  return (' },
  { dir: 'holiday-query',            returnTag: '  return (' },
  { dir: 'incoterms',                returnTag: '  return (' },
  { dir: 'json-formatter',           returnTag: '  return (' },
  { dir: 'world-time',               returnTag: '  return (' },
]

for (const { dir } of SIMPLE_TOOLS) {
  const p = `app/tools/${dir}/page.tsx`
  let c = read(p)

  // 已有则跳过
  if (c.includes('MobileFriendlyWrapper')) { console.log(`⏭  ${p} (already done)`); continue }

  // 加 import（插到最后一个 @/ 组件 import 之后）
  const libImportIdx = c.lastIndexOf(`from '@/lib/tools/`)
  const insertAt = c.indexOf('\n', libImportIdx) + 1
  c = c.slice(0, insertAt) +
    `import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'\n` +
    c.slice(insertAt)

  // 包裹 return (  <Fragment> 或 return (  <div>
  c = c
    .replace(/(\s+return \(\s*\n\s*)<>(\s*\n)/g,    '$1<MobileFriendlyWrapper>$2')
    .replace(/(\s*)\n(\s*)<\/>(\s*\n\s*\))/g,        '\n$2</MobileFriendlyWrapper>$3')

  write(p, c)
}

console.log('\n所有文件处理完毕！运行 npm run build 验证。')
