// 名称: 发布一致性校验
// 描述: 校验 package.json 版本对应的 Git tag 与 GitHub Release 真实存在，弥补版本号校验只查字符串的盲区
// 路径: Globokit/scripts/assert-release-consistency.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10
//
// 用法：npm run test:release（需网络与 gh CLI；离线环境会明确失败，请发布前在有网环境执行）
// 注意：本脚本独立于 npm test（离线开发不应被阻塞），CI 的 release-check 工作流在 tag 推送时调用。

const { execFileSync } = require('node:child_process')
const assert = require('node:assert/strict')

const version = require('../package.json').version
const tag = `v${version}`
const repo = 'everett7623/Globokit'

function ghJson(args) {
  return execFileSync('gh', ['api', ...args], {
    encoding: 'utf8',
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 30000,
  })
}

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}

// 1. 本地 Git tag 存在
let localTag = false
try {
  execFileSync('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`], { stdio: 'ignore' })
  localTag = true
} catch {
  localTag = false
}
check(localTag, `本地应存在 Git tag ${tag}（git tag -a ${tag} -m ... 后重新提交）`)

// 2. 远端 tag 存在
let remoteTag = false
try {
  const output = ghJson([`repos/${repo}/git/ref/tags/${tag}`])
  remoteTag = JSON.parse(output) && true
} catch {
  remoteTag = false
}
check(remoteTag, `远端应存在 tag ${tag}（git push origin ${tag}）`)

// 3. GitHub Release 存在（assert-version-consistency 只查 CHANGELOG 链接字符串，查不出 Release 缺失）
let release = null
try {
  release = JSON.parse(ghJson([`repos/${repo}/releases/tags/${tag}`]))
} catch {
  release = null
}
check(release && release.html_url, `GitHub 应存在 ${tag} 的 Release（gh release create ${tag} --verify-tag ...）`)
check(release && release.tag_name === tag, `Release 绑定的 tag 应为 ${tag}`)

console.log(`release-consistency: ${assertionCount} 条断言通过（${tag} tag 与 Release 均已发布）`)
