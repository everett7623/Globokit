# 项目精简与性能检查（2026-10-17）

## 远程与本地

- 已执行 `git fetch --all --prune`；检查时本地 `main` 与 `origin/main` 均为 `292c5aa`，领先/落后均为 0，原工作区干净。
- `origin/codex/barcode-and-file-size-optimization` 已被主分支包含。
- `origin/codex/remove-redundant-vercel-workflow` 唯一额外提交删除 `deploy.yml`；主分支已无此文件，无需再次合并旧分支。
- 未删除实际远程分支，未提交或推送本轮修改。

## 已完成

- 通过 TypeScript 引用扫描与全仓文本复核，删除无引用的 `tool-card.tsx`、`dialog.tsx`、`separator.tsx`、`lib/accessibility.ts`。
- 删除一次性的 `scripts/apply-ux-remaining.mjs`，它直接改写源码，已无命令或文档引用。
- 移除未使用的 Radix alert-dialog、dialog、separator 及被原生绘制替代的 html2canvas，共四个直接依赖，同步锁文件；未升级其他锁定版本。
- 首页两个主题背景层合并为一个，由 CSS 按当前主题选择图片。浏览器独立上下文验证：浅色仅请求 96,027 字节的白天图片，深色仅请求 84,610 字节的夜间图片。
- VPS 图片导出改为原生 Canvas 绘制固定版式报告，移除无法解析现代 CSS `lab()` 颜色的 DOM 截图库。实际下载 PNG 后检查了内容，并增加空白图片检测、失败提示及重试回归测试。
- VPS 清空价格、日期或输入非法价格时会清除旧计算结果，重置同时清除导出错误提示。
- VPS 页头改用本地图标，消除远程 favicon 的图片代理失败与网络依赖。
- Analytics 仅在 `globokit.com` 和 `www.globokit.com` 初始化，避免本地和预览环境发送统计；CSP 放行实际使用的 `https://www.google.com/g/collect` 路径，参考 [Google 官方 CSP 指南](https://developers.google.com/tag-platform/security/guides/csp?hl=en)。
- 修正 README 的过期版本替代文本及已删除文件的目录说明。

## 验证结果

- `npm test`：32 组通过。
- `npm run validate:data`：通过。
- `npm run lint`、`npm run typecheck`：通过。
- `npm run test:ui`：56 条交互断言通过。
- `npm run build`：通过，生成 62 个静态页面。
- `git diff --check`：通过。
- 最终生产构建上的 `npm run test:web`：244/244 项通过，运行错误 0 条，退出码 0。覆盖 PNG 下载、非空图片、失败可见、重试恢复、清空输入和 Analytics 正式/预览/本地域名逻辑。
- 浏览器回归仅隔离已确认的 AdGuard 注入脚本，避免其改变 head 节点顺序产生 hydration 误报；依然严格记录站点运行错误。汇率接口使用固定响应，断网回退由 VPS 专项测试覆盖，不能据此认定真实供应商接口在当前网络可用。
- 本机网络将汇率 API 解析到本地地址空间，实际请求受到浏览器网络策略限制；站点保留原有参考汇率回退和提示。未放宽浏览器网络限制。
- 本地忽略目录 `.web-verify/` 保存最终 JSON 记录、PNG 下载样本及页面截图；报告记录了使用的接口固定响应及隔离内容。
- 开发服务自动生成的 `AGENTS.md` 保留了当前 Next.js 版本的本地文档阅读提示；生产构建已恢复 `next-env.d.ts`，无该文件的改动。

## 后续检查项与合并判断

- npm 操作提示已有 ESLint 10 与部分插件声明支持至 ESLint 9 的 peer 兼容警告；当前 lint 可通过，本轮未变更其版本。
- `CopyButton` 已委托 `EnhancedCopyButton` 实现，保留薄包装可维持各工具页现有默认样式，无需批量改写调用方。
- 表单、结果、页面数据文件分别承担交互、展示、静态配置职责，未发现仅凭文件数量就值得合并的依据。保留现有拆分，避免重建大型页面。
- 迁移说明、历史计划与任务记录不是运行时代码，本轮保留，避免丢失项目决策背景。
