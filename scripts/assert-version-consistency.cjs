// 名称: 版本号一致性校验
// 描述: 确保 package、锁文件、README 与 CHANGELOG 使用同一应用版本
// 路径: Globokit/scripts/assert-version-consistency.cjs
// 作者: everettlabs

const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..')
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const lockJson = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'))
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8')
const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8')
const version = packageJson.version

const checks = [
  [lockJson.version === version, `package-lock.json version 应为 ${version}`],
  [readme.includes(`version-v${version}-brightgreen.svg`), `README badge 应为 v${version}`],
  [readme.includes('当前版本：[`v' + version + '`]'), `README 当前版本应为 v${version}`],
  [changelog.includes(`## [${version}]`), `CHANGELOG 应包含 [${version}] 小节`],
  [changelog.includes(`[${version}]: https://github.com/everett7623/Globokit/releases/tag/v${version}`), `CHANGELOG 应链接 v${version} Release`],
]

const failed = checks.filter(([ok]) => !ok).map(([, message]) => message)
if (failed.length) {
  console.error(`版本号不一致（当前 package.json 为 ${version}）：`)
  failed.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log(`版本号一致性校验通过：v${version}`)
