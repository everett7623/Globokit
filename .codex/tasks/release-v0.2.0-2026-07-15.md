# v0.2.0 发布任务

- 日期：2026-07-15
- 状态：发布中
- 目标：建立版本号、更新日志、README、Git tag 与 GitHub Release 同步发布流程。

## TODO

- [x] 检查现有 package 版本、Git tag 与 GitHub Release。
- [x] 确定本次 SemVer 版本为 `0.2.0`。
- [x] 更新 `package.json`、`package-lock.json`、`CHANGELOG.md` 与 `README.md`。
- [x] 执行数据校验、Lint、TypeScript 与生产构建。
- [ ] 提交并推送 `main`。
- [ ] 创建并验证 `v0.2.0` Git tag 与 GitHub Release。
- [ ] 核对 Vercel 部署与发布页面。

## 发布规则

1. 版本号、CHANGELOG、README、Git tag 和 GitHub Release 必须使用同一版本。
2. Release notes 以对应 CHANGELOG 条目为准，不在 GitHub 页面维护另一套事实来源。
3. Release 创建前必须完成项目现有质量门禁，失败时不得跳过。
