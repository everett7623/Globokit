const { spawnSync } = require('node:child_process')
const path = require('node:path')

const scripts = [
  'assert-barcode-renderer.cjs',
  'assert-unit-converter.cjs',
  'assert-delivery-date.cjs',
  'assert-freight-charge-audit.cjs',
  'assert-time-dependent-data.cjs',
  'assert-vps-calculator.cjs',
  'assert-payment-terms.cjs',
  'assert-fx-sensitivity.cjs',
  'assert-demurrage-detention.cjs',
  'assert-packaging-plan-comparison.cjs',
  'assert-tiered-quote.cjs',
  'assert-order-break-even.cjs',
  'assert-supplier-quote-comparison.cjs',
]

for (const script of scripts) {
  const result = spawnSync(process.execPath, [path.join(__dirname, script)], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(`全部 ${scripts.length} 组专项测试通过`)
