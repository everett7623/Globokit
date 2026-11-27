<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Globokit 统一工程规范

本文件是仓库面向所有 AI 编码助手（Antigravity、Codex、Claude Code、Cursor、GitHub Copilot）与开发者的**单一权威规范**。完整架构、新增工具流水线、SEO/GEO 维护与增长路线详见 [`DEVELOPMENT.md`](DEVELOPMENT.md)。

## 项目真相

- **定位**：面向外贸与跨境贸易从业者的纯前端免费在线工具平台（`https://globokit.com`），收录 53+ 工具与 171 国外贸档案页。
- **技术栈**：Next.js 16（App Router + Turbopack）、React 19、TypeScript 严格模式、Tailwind CSS v4（CSS-first `@theme` 于 `app/globals.css`，无 `tailwind.config.ts`）、Radix UI / Shadcn UI、ESLint 10（Flat Config）。
- **隐私红线**：纯前端浏览器本地运算，无后端数据库与账号体系；除汇率公开接口（`open.er-api.com`）与匿名 GA4 统计外，严禁上传用户输入。新增任何 `localStorage` 键时，必须同步更新 `app/privacy/page.tsx` 的存储清单。

## 核心架构铁律

1. **工具注册表为唯一入口**：所有工具元数据集中定义在 `lib/tools/registry-{finance|logistics|general|barcode}.ts`，经 `lib/tools/registry.ts` 导出，自动驱动首页目录、导航栏、`Ctrl+K` 速搜、`/tools`、`sitemap.xml`、`/llms.txt`、`/llms-full.txt` 与 `/api/og`。**禁止在任何页面硬编码工具列表**。
2. **工具路由标准接线**：每个 `app/tools/{slug}/` 必须同时具备 `layout.tsx`（调用 `createToolMetadata(slug)` 与 `createToolLayout(slug)`，自动注入 JSON-LD、专属 OG 图与服务端 `ToolGuideSection`）与 `page.tsx`。
3. **算法与 UI 分离**：纯计算逻辑放 `lib/tools/{slug}.ts`（无副作用、可单测），页面与交互组件放 `app/tools/{slug}/`，超过 1000 行的静态数据抽离至 `lib/tools/data/*.json`。
4. **React 19 & ESLint 10 约束**：严格遵守 `react-hooks/set-state-in-effect`，禁止在 `useEffect` 内同步调用 `setState`；订阅 `localStorage` 等外部状态必须使用 `useSyncExternalStore`（参见 `lib/client-hooks.ts`、`lib/recent-tools.ts`）。
5. **Next.js 16 约束**：使用 `useSearchParams()` 的客户端组件必须包裹在 `<Suspense>` 中；动态路由 `params` 为 `Promise`，需 `await params`。
6. **代码风格与体积**：代码注释与 Git commit 使用简体中文（技术术语保持英文），变量与函数名使用英文；新文件带结构化中文头注释；单文件保持简洁可维护（TSX 建议 ≤ 200 行，TS ≤ 300 行），优先复用 `components/ui/` 组件，保持克制的企业级风格。

## 必跑验证门禁

提交前必须按变更范围运行并通过：

```bash
npm run typecheck      # TypeScript 严格类型检查
npm run lint           # ESLint 10 静态检查
npm run test:catalog   # 工具注册表、路由、图标、配色与 SEO 接线一致性校验
npm test               # 全量专项算法与版本一致性测试
npm run validate:data  # 修改 lib/tools/data/*.json 后必跑
npm run build          # 生产构建与静态预渲染验证
```

## 版本发布约束

- `package.json` 的 `version` 是唯一版本源，严禁手工维护第二套版本号。
- 发布流程详见 [`DEVELOPMENT.md`](DEVELOPMENT.md#七版本与发布规范)，提交前必跑 `npm run test:version`。
