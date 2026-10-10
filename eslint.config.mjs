// 名称: ESLint 扁平配置
// 描述: 基于 eslint-config-next 的 core-web-vitals 规则集，适配 ESLint 9+ flat config
// 路径: Globokit/eslint.config.mjs
// 作者: everettlabs
// 更新时间: 2026-10-09

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default [
  { ignores: ['.next/**', 'node_modules/**', '.ui-test-bundles/**', '.web-verify/**'] },
  ...nextCoreWebVitals,
]
