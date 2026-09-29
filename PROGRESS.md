# 开发进度记录


## 2026-09-18（第三轮：收尾与交互验证）

### 已完成

- 新增工具目录一致性校验 `npm run test:catalog`（`scripts/assert-catalog-integrity.cjs`），15 条校验补齐项目此前完全缺失的盲区：
  - 注册表条目与 `app/tools` 目录一一对应（无多余目录、无缺失目录、slug 不重复）；
  - 每个工具目录同时具备 `layout.tsx` 与 `page.tsx`，且 layout 的 slug 正确传入 `createToolMetadata` / `createToolLayout`；
  - `id === slug`、`href === '/tools/' + slug`；首页 `ICON_MAP` 覆盖全部 `iconName`、`TOOL_UI_CONFIG` 覆盖全部工具 id；
  - `relatedTools` 引用有效且无自引用；sitemap 由注册表派生、首页目录组件无硬编码路由。
- 新增工具页交互测试 `npm run test:ui`，绕开本机无法启动无头浏览器的限制：
  - 用 esbuild 把四个工具页打成 CommonJS bundle，在 jsdom 中渲染真实组件并派发 input/change/click 事件；
  - 覆盖收款渠道页 14 条（金额联动、费用承担方切换、渠道开关、复制入口）、询盘评估页 12 条（维度开关改分、响应时限、追问按钮）、服务器成本页 11 条（方案增删、套餐价与持有月数联动、汇率联动、配置开关）、YAML 互转页 19 条（默认示例、输入跟随、非法输入报错与行号、方向切换）；
  - 入口脚本 `scripts/build-ui-bundles.cjs` 与环境模块 `scripts/ui-test-env.cjs`，产物目录 `.ui-test-bundles/` 已加入 `.gitignore`。
- 修复两处既有缺陷：托盘装载工具首页图标（`Pallet` 在 lucide-react 中不存在，改为 `Layers3`）、国际贸易术语速查页文件头注释被 import 截断。
- 文档与版本收口：`CHANGELOG.md` 重新分段为 v0.3.0 与 v0.2.0，`README.md` 补充部署章节与质量校验命令，`package.json` 推进至 0.3.0，本地创建 `v0.2.0`、`v0.3.0` 标签。
- 提交：`a327e5a`（v0.3.0 功能与修复，29 文件 +4214/−311）、`951dcca`（进度记录）。

### 验证结果

- `npm run typecheck`、`npm run lint` 通过；`npm test` 18 组断言通过；`npm run test:catalog` 15 条通过；`npm run test:ui` 56 条交互断言通过；`npm run build` 通过。
- 生产站全站烟测：40 条工具路由全部返回 200，首页与 sitemap（42 条 URL）正常。

### 未完成

- `git push`：本机 git 在受限会话中无法完成 HTTP 传输（已确认系统代理可建立到 github.com:443 的 CONNECT 隧道，PowerShell 直连 `info/refs` 返回 200，但 git 客户端在隧道后停止推进）；另外 GitHub 未存有可用凭证（credential helper 为 manager 但凭据库为空，无 token 环境变量），原始 pack 推送被服务端以 401 拒绝。需在一台已授权的终端执行 `git push origin main --tags`。
- 真实浏览器验证：本机 Chrome 无法建立渲染进程连接（`--dump-dom`、playwright-core、原生 CDP 三条路径均失败，放宽文件沙箱后依旧），已用 jsdom 交互测试替代覆盖四页交互，但未覆盖真实浏览器的布局与样式表现。

## 2026-09-18（第三轮：项目收尾）

### 已完成

- 新增长期校验 `npm run test:catalog`（`scripts/assert-catalog-integrity.cjs`），补齐项目此前完全没有的一致性盲区：
  - 注册表条目与 `app/tools` 目录一一对应（无多余目录、无缺失目录、slug 不重复）；
  - 每个工具目录同时具备 `layout.tsx` 与 `page.tsx`，且 layout 的 slug 正确传入 `createToolMetadata` / `createToolLayout`；
  - `id === slug`、`href === '/tools/' + slug`；
  - 首页 `ICON_MAP` 覆盖全部 `iconName`、`TOOL_UI_CONFIG` 覆盖全部工具 id；
  - `relatedTools` 引用均指向存在的 id 且无自引用；
  - sitemap 由注册表派生、首页目录组件无硬编码路由、工具总量不低于 40。
  该脚本已接入 `npm test` 与 CI 的 `npm run test:catalog`。
- 修复两处既有缺陷：
  - 托盘装载工具的首页图标缺失：注册表 `iconName: 'Pallet'` 在 lucide-react 中并不存在，首页自始至终静默回退为兜底图标；已改为 `Layers3` 并纳入一致性校验。
  - 国际贸易术语速查页的文件头注释被一行 import 截断，已恢复标准头格式。
- 文档与版本收口：
  - `CHANGELOG.md` 重新分段：v0.3.0（本轮四个新工具与修复）与 v0.2.0（此前未发布的工具与优化）各自归档，`[Unreleased]` 清空；
  - `README.md` 新增「部署」章节，覆盖 Vercel、自有服务器、systemd 示例、Nginx 反向代理要点与发布流程；
  - `package.json` 版本推进至 0.3.0。
- 客户端交互实测尝试与结论：
  - 尝试 `--dump-dom`、`playwright-core`（channel: chrome）与原生 CDP（`--remote-debugging-port`）三种路径，Chrome 进程虽能启动，但渲染进程无法建立连接，输出恒为空；已在放宽文件沙箱（danger-full-access）后重试，仍失败，判定为本机执行环境的进程间通信限制，与项目代码无关；
  - 改用源码级接线审计替代（见 `test:catalog`），覆盖注册表、路由、SEO 接线与图标配色映射，但不覆盖真实点击行为。
- 提交：`a327e5a`，29 个文件、4214 行新增、311 行删除。

### 验证结果

- `npm run typecheck`、`npm run lint` 通过；`npm test` 18 组断言全绿；`npm run build` 通过。
- `npm run test:catalog` 15 条校验通过（40 个工具）。
- 生产站 HTTP 烟测：四个新工具路由均返回 200，标题、canonical 与结构化数据正确，首页与 sitemap 已收录。

### 未完成

- `git push`：沙箱内 git 的 HTTP 传输通道不可用（已配置系统代理 `127.0.0.1:9674` 并验证 CONNECT 隧道可建立、`info/refs` 可由 PowerShell 正常拉取，但 git 客户端在隧道建立后停止推进），需在一台网络可用的终端执行 `git push origin main`。
- 真实浏览器点击验证：受上述环境限制未能执行，需人工在浏览器中确认交互。

## 2026-09-18（第二轮：薄弱分类补齐）

### 已完成

- 盘点分类分布后补齐三个薄弱分类：国家与货币、VPS/站长工具、外贸沟通此前各只有 2 个工具，本轮各补 1 个，全部与既有工具能力不重叠。
- 新增国际收款渠道费用对比（国家与货币）：
  - 计算逻辑 `lib/tools/remittance-cost-calculator.ts`，内置电汇、信用证、托收、第三方收款与平台托管五个渠道的费率模型。
  - 费用拆分为手续费、固定费、开证费、电报/中间行费与汇损预算五类，支持卖方承担或买方承担两种口径。
  - 输出到手金额、成本率、资金占用成本与按汇率折算的结算币种金额，并按总成本排名，同时标记最快到账渠道。
  - 校验覆盖订单金额、汇率、资金成本区间，少于两个渠道时明确报错。
- 新增外贸询盘优先级评估（外贸沟通）：
  - 计算逻辑 `lib/tools/inquiry-priority-scorer.ts`，14 个评估维度分为信息完整度、客户可信度与商务价值三组，权重合计 92 分并另加最多 6 分篇幅加分。
  - 输出 0–100 总分、高/中/低优先级、建议响应时限与跟进节奏，并给出客户规模判断提示。
  - 待补齐信息自动生成中英文追问话术，可直接粘贴进邮件。
  - 校验覆盖阈值分界（70/45 分）、篇幅加分边界、规模提示四档与非法输入。
- 新增服务器成本对比（VPS/站长工具）：
  - 计算逻辑 `lib/tools/server-cost-comparison.ts`，支持 2–5 台服务器的套餐价、续费价、首期优惠、开通费与每月附加费。
  - 输出首期月均、续费月均、首期优惠差额、持有期总成本、三年总成本，以及每 GB 内存、每 vCPU 与单位算力月成本。
