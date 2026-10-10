const { spawnSync } = require('node:child_process')
const path = require('node:path')

const scripts = [
  'assert-version-consistency.cjs',
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
  'assert-catalog-integrity.cjs',
  'assert-remittance-cost.cjs',
  'assert-inquiry-priority.cjs',
  'assert-server-cost-comparison.cjs',
  'assert-yaml-json-converter.cjs',
  'assert-supplier-quote-comparison.cjs',
  'assert-cargo-insurance.cjs',
  'assert-lc-checklist.cjs',
  'assert-shipping-mark.cjs',
  'assert-invoice-generator.cjs',
  'assert-payment-reminder.cjs',
  'assert-currency-converter.cjs',
  'assert-commission-calculator.cjs',
  'assert-email-signature.cjs',
  'assert-packing-list.cjs',
]

for (const script of scripts) {
  const result = spawnSync(process.execPath, [path.join(__dirname, script)], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(`全部 ${scripts.length} 组专项测试通过`)
