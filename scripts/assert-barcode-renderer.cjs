const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

async function main() {
  // bwip-js 是 ESM；复用真实编码器，不用 mock 替代编码校验。
  const bwip = await import('@bwip-js/browser')
  const core = loadTypescriptModule('lib/tools/barcode-generator.ts')
  const source = fs.readFileSync(path.join(__dirname, '../app/tools/barcode-generator/barcode-renderer.ts'), 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const exports = {}
  Function('exports', 'require', compiled)(exports, (name) => {
    if (name === '@bwip-js/browser') return bwip
    if (name === '@/lib/tools/barcode-generator') return core
    throw new Error(`未预期的编码器依赖：${name}`)
  })
  const { renderBarcode } = exports
  let count = 0
  for (const format of core.BARCODE_FORMATS) {
    for (const scale of [2, 3, 4]) {
      const request = { formatId: format.id, scale, revision: 0, ...core.prepareBarcodeData(format.id, format.example) }
      const svg = renderBarcode(request)
      assert.match(svg, /<svg\b/, `${format.id} / ${scale}x 应生成 SVG`)
      assert.match(svg, /<path\b/, `${format.id} / ${scale}x 应包含编码图形`)
      count += 2
    }
  }
  for (const [formatId, input] of [
    ['ean13', '4006381333932'],
    ['gs1datamatrix', '(01)00401234567893(17)311332'],
  ]) {
    assert.throws(() => renderBarcode({ formatId, scale: 3, revision: 0, ...core.prepareBarcodeData(formatId, input) }))
    count += 1
  }
  console.log(`条码编码器：${count} 条断言通过（11 种格式 × 3 种清晰度及非法输入）`)
}

main().catch((error) => { console.error(error); process.exit(1) })
