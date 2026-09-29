# 版本号发布规范

项目版本号只有一个来源：`package.json` 的 `version` 字段。`package-lock.json` 必须与其一致；README 徽章、README 当前版本、CHANGELOG 小节和 Release 链接必须使用相同的 SemVer 版本（展示时加 `v` 前缀）。

发布或准备发布时，必须按以下顺序执行：

1. 只修改 `package.json` 的 `version`，再运行 `npm install --package-lock-only` 同步锁文件。
2. 在 `CHANGELOG.md` 的 `[Unreleased]` 下归档同版本小节，并补充同版本 Release 链接。
3. 更新 README 的版本徽章和当前版本链接。
4. 执行 `npm run test:version`；该检查已接入 `npm test` 和 CI，任何不一致都会阻止合并。
5. 所有 CI 检查通过后，创建同版本 Git tag：`v<package.json version>`，再创建同名 GitHub Release。

禁止手工维护第二个“当前版本”来源，也禁止使用与 `package.json` 不同的 tag 或 Release 版本。
