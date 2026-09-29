// 名称: 工具页交互测试打包脚本
// 描述: 把待测工具页与其依赖打包为 CommonJS bundle，供 jsdom 环境直接渲染
// 路径: Globokit/scripts/build-ui-bundles.cjs
// 作者: everettlabs
// 更新时间: 2026-09-18

const fs = require('node:fs')
const path = require('node:path')
const esbuild = require('esbuild')

const root = path.join(__dirname, '..')
const outDir = path.join(root, '.ui-test-bundles')
const pages = [
  { name: 'remittance', entry: 'app/tools/remittance-cost-calculator/page.tsx' },
  { name: 'inquiry', entry: 'app/tools/inquiry-priority-scorer/page.tsx' },
  { name: 'server-cost', entry: 'app/tools/server-cost-comparison/page.tsx' },
  { name: 'yaml-json', entry: 'app/tools/yaml-json-converter/page.tsx' },
]

fs.mkdirSync(outDir, { recursive: true })

esbuild.buildSync({
  entryPoints: pages.map((page) => ({ in: path.join(root, page.entry), out: page.name })),
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'node20',
  jsx: 'automatic',
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
  alias: { '@': root },
  external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'next'],
  outdir: outDir,
  outExtension: { '.js': '.cjs' },
  logLevel: 'warning',
})

console.log('交互测试 bundle 已生成：' + pages.map((page) => page.name).join('、'))

