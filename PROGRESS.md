# 开发进度记录


## 2026-10-09（v0.5.0：站点框架全量升级）

### 已完成

- 依赖全量升级至当前最新：Next.js 15.5 → 16.4（Turbopack 构建引擎）、React 19.2 → 19.3、Tailwind CSS 3.4 → 4.3、ESLint 8 → 10、lucide-react 0.475 → 1.54、tailwind-merge 2 → 3、Radix UI 全家桶、@bwip-js/browser、pinyin-pro、postcss。@types/node 保持 24.x 与运行时对齐（npm latest 为 26，故意不跟）。
- Next.js 16 迁移：接受官方自动变更（`jsx: react-jsx`、`next-env.d.ts` 路由类型）；构建走 Turbopack 后全部 46 条路由保持静态预渲染。
- Tailwind CSS v4 迁移：官方 `@tailwindcss/upgrade` 完成 62 个文件类名迁移（比例类 shadow-sm → shadow-xs 等），`tailwind.config.ts` 内联为 `globals.css` 的 `@theme`/`@custom-variant dark`/`@utility container`，PostCSS 切换 `@tailwindcss/postcss` 并移除 autoprefixer。
- ESLint flat config：`.eslintrc.json` → `eslint.config.mjs`（原生 import `eslint-config-next/core-web-vitals`，无需 FlatCompat）。
- react-hooks v7 新规则 `set-state-in-effect` 达标：新增 `lib/client-hooks.ts`（useSyncExternalStore 封装 localStorage 收藏、本地时区、客户端时钟），重构 7 处 effect 内 setState（主题、货币符号、交期、国家资料、节假日、世界时间、VPS），彻底消除级联渲染且保持 SSR 首帧一致。
- lucide-react 1.x 品牌图标移除：页脚 Github 图标改内联 SVG。
- 版本推进 0.5.0，CHANGELOG/README（徽章、当前版本、技术栈 Next.js 16 / Tailwind v4）/CLAUDE.md 同步。

### 踩坑记录

- `@tailwindcss/upgrade` 会把源码里的业务字符串字面量 `'outline'`（Button/Badge 的 variant 名）误当 Tailwind 类替换为 `'outline-solid'`，产生约 20 处类型错误；已按「仅还原带引号的 variant 字面量」批量修复，className 中的真实类不受影响。
- Windows Git Bash 下 `grep -rl | xargs sed` 会因反斜杠路径失败，需用 `find -exec sed`。
- 本机 Chrome 自动化（MCP 截图/DOM 快照）在本环境持续超时，沿用 HTTP 层验证：CSS 产物含 `--color-primary`/`.bg-primary`/`.dark`/`.text-muted-foreground` 等令牌、44 个工具链接与工具页标题渲染正常。

### 验证结果

- `npx tsc --noEmit`、`npm run lint`（flat config）、`npm test`（23 组）、`npm run test:ui`（56 条交互断言）、`test:catalog`（44 工具）、`npm run build`（Next 16 + Tailwind 4，46 路由静态输出）全部通过。

## 2026-10-08（v0.4.0：单证与风险工具补齐）

### 已完成

- 盘点 40 个工具的分类与能力分布后，补齐四个此前缺失的外贸单证与风险场景：
  - 商业发票/形式发票生成器（invoice-generator）：明细动态增删、分位整数运算、英文金额大写复用 number-english、A4 版式实时预览、复制纯文本与打印导出；
  - 外贸唛头生成器（shipping-mark-generator）：区间/逐箱/不输出三种箱号风格、毛重尺寸开关、逐箱标签预览、三种场景预设；
  - 信用证交单自查清单（lc-discrepancy-checklist）：六组 27 项审单要点、10/5/2 加权计分、三档风险分级、英文改证片段生成；
  - 出口货物保险费计算器（cargo-insurance-calculator）：FOB/CFR/CIF 闭式换算 CIF、110% 投保加成、基础险与战争险保费拆分、ICC 条款速查。
- 四组专项测试（共 133 条断言）接入 `npm test` 与独立 npm scripts；工具总数 40 → 44，目录一致性校验 15 条通过。
- 版本推进 0.4.0：package.json/package-lock、CHANGELOG 0.4.0 段落、README 徽章/版本/功能/目录结构同步更新。

### 协同冲突处理

- 会话期间另一台机器经 Syncthing 同步提交了 d30605e（同一批四工具的混合版本：本机实现为主，但发票/唛头算法层被替换为无文件头、弱校验的精简版，并在 registry-finance/registry-logistics 重复注册）。
- 处理方式：从 `.sync-conflict-*` 副本恢复完整算法层与富 SEO 注册表条目，移除 registry-finance 与 registry-logistics 中的重复精简条目，删除全部冲突副本文件；保留 d30605e 中的 UI 页面与 CHANGELOG 思路并扩写为正式 0.4.0 段落。
- 建议：多机同步场景下避免两台机器同时改动同一批文件；同步工具应排除 `.git/` 目录。

### 验证结果

- `npx tsc --noEmit`、`npm run lint`、`npm test`（23 组）、`test:catalog`（44 工具）、`test:version` 通过；`npm run build` 通过。

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
