// 名称: Release 一致性校验
// 描述: 校验 CHANGELOG 声明的当前版本 Release 已真实存在（需要网络）
// 路径: Globokit/scripts/assert-release-consistency.cjs
// 作者: everettlabs
//
// 背景：assert-version-consistency.cjs 只检查 CHANGELOG 里是否写了 Release 链接，
// 无法发现「链接声明了但 Release 没建」的假绿灯，这里补上可达性校验。

const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const root = path.join(__dirname, '..')
const { version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const tag = 'v' + version

function resolveRepoSlug() {
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY
  }
  try {
    const remote = execFileSync('git', ['-C', root, 'config', '--get', 'remote.origin.url'], { encoding: 'utf8' }).trim()
    const match = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/)
    if (match) {
      return match[1] + '/' + match[2]
    }
  } catch {
    // 没有 git remote 时回落到下面的显式报错
  }
  return null
}

async function main() {
  const slug = resolveRepoSlug()
  if (!slug) {
    console.error('Release 一致性校验失败：无法确定仓库地址（缺少 git remote 或 GITHUB_REPOSITORY）')
    process.exitCode = 1
    return
  }

  const url = 'https://api.github.com/repos/' + slug + '/releases/tags/' + tag
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'globokit-release-check' }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = 'Bearer ' + process.env.GITHUB_TOKEN
  }

  let response
  try {
    response = await fetch(url, { headers })
  } catch (error) {
    console.error('Release 一致性校验失败：无法访问 GitHub API（' + String(error).slice(0, 120) + '）')
    process.exitCode = 1
    return
  }

  if (response.status === 200) {
    const payload = await response.json()
    console.log('Release 一致性校验通过：' + tag + '（' + payload.html_url + '）')
    return
  }

  if (response.status === 404) {
    console.error('Release 一致性校验失败：' + slug + ' 上不存在 ' + tag + ' 的 Release')
    console.error('- CHANGELOG 已经声明了 releases/tag/' + tag + ' 链接，请创建同名 tag 与 Release')
    console.error('- 参考 VERSIONING.md 的发布流程第 5 步')
    process.exitCode = 1
    return
  }

  console.error('Release 一致性校验失败：GitHub API 返回 HTTP ' + response.status)
  process.exitCode = 1
}

main()
