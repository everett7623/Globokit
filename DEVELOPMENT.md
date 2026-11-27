# Globokit 开发与增长工程手册

> 适用版本：Next.js 16（Turbopack）· React 19 · TypeScript 5 · Tailwind CSS v4 · ESLint 10  
> 线上地址：<https://globokit.com> ｜ 协议：GPL-3.0-only

本手册是 **Globokit** 面向开发者的唯一权威开发文档，覆盖架构设计、新增工具标准流水线、SEO/GEO 双轨优化、数据资产治理、隐私与性能规范、测试与发布流程，以及站点流量增长路线图。

---

## 一、架构全景与目录规范

Globokit 采用 **纯前端本地优先（Local-First）** 架构：所有报价核算、装柜计算、单证生成、图片压缩均在用户浏览器本地完成，无后端数据库与账号体系。

```text
Globokit/
├── app/
│   ├── layout.tsx                  # 根布局（主题初始化、GA4、站级 Organization/WebSite JSON-LD）
│   ├── page.tsx                    # 首页（主视觉、业务流、可筛选目录、精选资源、核心优势）
│   ├── tools/
│   │   ├── layout.tsx              # 工具公共外壳（面包屑 ToolBreadcrumb + 底部 RelatedTools）
│   │   ├── page.tsx                # 全部工具目录（支持 ?q= 实时筛选与分类锚点）
│   │   └── {slug}/                 # 53 个工具路由（每个目录含 layout.tsx + page.tsx + 拆分组件）
│   ├── country/
│   │   ├── page.tsx                # 全球 171 国外贸档案索引页（pSEO）
│   │   └── [code]/page.tsx         # 单国外贸档案静态页（时差、节假日、货币、电压插头、工具互链）
│   ├── api/og/route.tsx            # 按工具/国家动态生成 1200×630 OG 分享图
│   ├── opengraph-image.tsx         # 全站默认 OG 分享图
│   ├── manifest.ts                 # PWA Web App Manifest
│   ├── robots.ts                   # 搜索引擎与 AI 爬虫放行策略
│   ├── sitemap.ts                  # 基于工具注册表与国家库自动生成站点地图
│   ├── llms.txt/route.ts           # GEO 精简索引（llmstxt.org 规范）
│   ├── llms-full.txt/route.ts      # GEO 完整工具与场景知识索引
│   └── faq / about / privacy / resources
├── components/
│   ├── home/                       # 首页模块与图标映射（home-data.ts）
│   ├── layout/                     # Header、Footer、桌面/移动导航、Ctrl+K 全局速搜弹窗
│   ├── tools/                      # ToolBreadcrumb、ToolGuideSection、RelatedTools、复制按钮等
│   └── ui/                         # Radix UI / Shadcn 基础组件
├── lib/
│   ├── tools/
│   │   ├── registry.ts             # 工具注册表聚合入口（单一事实源）
│   │   ├── registry-*.ts           # 分类注册表、类型定义、配色映射（registry-ui.ts）
│   │   ├── tool-seo.tsx            # createToolMetadata + createToolLayout 工厂
│   │   ├── {slug}.ts               # 纯函数算法层（无副作用、可单测）
│   │   └── data/                   # 国家与 2025–2027 节假日 JSON 数据资产
│   ├── seo-schema.ts               # 全站 JSON-LD 构建工具
│   ├── analytics.ts                # GA4 轻量交互事件封装（无个人数据）
│   ├── recent-tools.ts             # 最近使用工具存储（useSyncExternalStore）
│   ├── pinned-tools.ts             # 常用工具置顶收藏存储（useSyncExternalStore）
│   ├── client-hooks.ts             # 客户端通用 Hooks（本地时区、收藏订阅等）
│   └── partner-resources.ts        # 外贸业务资源清单
└── scripts/                        # 33+ 专项算法/目录一致性/版本/数据/浏览器回归测试脚本
```

---

## 二、快速上手与常用命令

要求 **Node.js 24.x**（见 `.nvmrc` 与 `package.json`）。

```bash
npm install                # 安装依赖
npm run dev                # 启动本地开发服务器 (http://localhost:3000)
npm run typecheck          # TypeScript 严格检查 (tsc --noEmit)
npm run lint               # ESLint 10 检查 (app / components / lib)
npm run test:catalog       # 工具注册表、路由、图标与配色一致性校验
npm test                   # 全量专项算法测试 + 版本号一致性测试
npm run validate:data      # 校验 lib/tools/data/*.json 数据完整性
npm run build              # Next.js 16 Turbopack 生产构建与静态预渲染
```

可选进阶回归：

```bash
npm run test:ui            # jsdom 真实组件交互测试
npm run test:web           # Playwright 生产构建端到端验证
npm run test:release       # 校验远端 Git tag 与 GitHub Release（需网络与 gh CLI）
```

---

## 三、新增一个工具的标准 6 步流水线

1. **编写纯函数算法层** `lib/tools/{slug}.ts`
   - 保持纯函数与严格 TypeScript 类型，所有边界校验与错误信息清晰明确。
2. **注册工具元数据**
   - 在 `lib/tools/registry-{finance|logistics|general|barcode}.ts` 添加条目，必填：`id`（与 `slug` 一致）、`slug`、`title`、`shortTitle`、`description`、`category`、`iconName`、`href`（`/tools/{slug}`）、`updatedAt`；强烈建议补齐 `keywords`、`seoTitle`、`seoDescription`、`useCases`、`relatedTools`。
   - 在 `lib/tools/registry-ui.ts` 配置该工具的图标配色；若使用了新 Lucide 图标，同步在 `components/home/home-data.ts` 的 `ICON_MAP` 登记。
   - 注册表将自动驱动：首页目录、导航栏、`Ctrl+K` 速搜、`/tools`、`sitemap.xml`、`/llms.txt`、`/llms-full.txt` 与 `/api/og`。
3. **创建路由布局** `app/tools/{slug}/layout.tsx`
   ```tsx
   import { createToolLayout, createToolMetadata } from '@/lib/tools/tool-seo'

   export const metadata = createToolMetadata('{slug}')
   export default createToolLayout('{slug}')
   ```
   该方法会自动注入 `Metadata`（canonical / OG / Twitter / 专属动态 OG 图）、`WebApplication` + 4 级 `BreadcrumbList` JSON-LD，以及服务端直出的 `ToolGuideSection`。
4. **创建页面与拆分组件** `app/tools/{slug}/page.tsx`
   - 推荐按职责拆分为 `page.tsx`、`{tool}-form.tsx`、`{tool}-result.tsx`，保持单文件精简（TSX ≤ 200 行）。
   - 使用 `MobileFriendlyWrapper` 与 `EnhancedCopyButton` / `CopyButton`，自动获得移动端适配与复制事件埋点。
5. **编写专项单元测试**
   - 新增 `scripts/assert-{slug}.cjs` 覆盖核心公式与异常边界，并挂载至 `scripts/run-tests.cjs` 与 `package.json`。
6. **运行全量门禁**
   - 执行 `npm run typecheck && npm run lint && npm run test:catalog && npm test && npm run build`。

---

## 四、SEO & GEO 双轨优化规范

Globokit 同时面向传统搜索引擎（Google / Bing / 百度）与生成式 AI 引擎（ChatGPT Search / Perplexity / Claude / Google AI Overviews）：

- **结构化数据（JSON-LD）**：集中由 `lib/seo-schema.ts` 与 `lib/tools/tool-seo.tsx` 生成：
  - 根布局：`Organization` + `WebSite`（含 `SearchAction` 指向 `/tools?q={search_term_string}`）。
  - 工具页：`WebApplication`（含 `featureList`、`keywords`、`offers: 0 CNY`）+ 4 级 `BreadcrumbList`。
  - 目录与专题页：`CollectionPage` / `FAQPage` / `AboutPage` / `WebPage` + `BreadcrumbList`。
- **AI 索引与爬虫策略**：
  - `app/robots.ts` 显式放行 `OAI-SearchBot`、`ChatGPT-User`、`ClaudeBot`、`Claude-SearchBot`、`PerplexityBot`、`Google-Extended`、`Applebot-Extended`。
  - `app/llms.txt/route.ts` 与 `app/llms-full.txt/route.ts` 由注册表与国家库自动派生，无需手动维护。
- **社交分享卡片**：
  - 站级默认图：`app/opengraph-image.tsx`。
  - 工具/国家专属图：`app/api/og/route.tsx`（1200×630，零外部字体依赖，带 CDN 长缓存）。
- **程序化 SEO（pSEO）**：
  - `/country` 与 `/country/[code]` 基于 `lib/tools/data/global-country-info.json`（171 国）与 2025–2027 节假日数据静态预渲染，并自动写入 `sitemap.xml`。

---

## 五、数据资产与隐私合规

### 1. 数据资产治理
- 国家与节假日静态数据统一存放于 `lib/tools/data/`（详见 [`lib/tools/data/README.md`](lib/tools/data/README.md)）。
- 每年 Q4 提前补齐次年节假日数据（`holidays-{year}.json` / `holiday-observances.json` / `holiday-query-generated.ts`）。
- 任何 JSON 修改后必须运行 `npm run validate:data` 与 `npm run test:time-data`。

### 2. 纯前端隐私与本地存储规范
- 所有 `localStorage` 读写必须通过 `useSyncExternalStore` 订阅（符合 React 19 `react-hooks/set-state-in-effect` 规范），并做好隐私模式 `try/catch` 兜底。
- **强制同步规则**：每新增一个 `localStorage` 键名，必须同步登记到 `app/privacy/page.tsx` 的 `STORAGE_KEYS` 表格中。
- **CSP 边界**：外部网络请求受 `next.config.js` 的 `Content-Security-Policy` 严格限制（当前仅放行 `open.er-api.com` 与 GA4 统计域）。

---

## 六、性能与代码质量规范

- **首屏与 LCP**：关键大图统一使用 `next/image`（`priority` + `sizes`），自动输出 AVIF/WebP；避免在 `app/layout.tsx` 外层使用 `overflow-hidden`（应使用 `overflow-x-clip` 以保留 `position: sticky`）。
- **PWA 清单**：`app/manifest.ts` 声明的图标尺寸必须与 `public/` 实际图片像素完全一致。
- **代码风格**：
  - 使用 Tailwind CSS v4 令牌（`app/globals.css`），保持克制简洁的企业工作台风格，避免高饱和霓虹渐变与重装饰动画。
  - 新文件顶部统一使用中文结构化注释（名称 / 描述 / 路径 / 作者 / 更新时间）。
  - 避免在渲染循环中进行 `O(n)` 查找（优先使用 `Map` 预索引）。

---

## 七、版本与发布规范

> 整合自原 `VERSIONING.md`

项目版本号**唯一来源**是 `package.json` 的 `version` 字段，严禁手工维护第二套版本号。发布时严格按以下顺序执行：

1. 仅修改 `package.json` 的 `version`（遵循 SemVer），运行 `npm install --package-lock-only` 同步 `package-lock.json`。
2. 在 `CHANGELOG.md` 的 `[Unreleased]` 下归档同版本小节，并补充对应 GitHub Release 链接。
3. 同步更新 `README.md` 的版本徽章与当前版本链接。
4. 运行全量校验：`npm run test:version && npm run validate:data && npm run typecheck && npm run lint && npm test && npm run build`。
5. 推送主分支后创建同版本 Git tag（`v<version>`）与 GitHub Release，并通过 `npm run test:release` 校验远端一致性。

---

## 八、站点流量增长与演进路线图

面向持续稳步的自然流量增长，按阶段推进以下 6 大高杠杆方向：

| 阶段 | 方向 | 核心动作与预期收益 | 状态 |
| :--- | :--- | :--- | :--- |
| **P0 · 已落地** | SEO/GEO 技术底座 | `llms.txt`、JSON-LD 图谱、动态 `/api/og`、服务端 `ToolGuideSection`、`Ctrl+K` 速搜 | ✅ 已上线 |
| **P0 · 本轮落地** | 程序化 SEO 国家档案 | `/country` + 171 个 `/country/[code]` 静态页，收割国家节假日/时差/插头/货币长尾词 | 🚧 实施中 |
| **P0 · 本轮落地** | 数据闭环与留存 | GA4 轻量交互事件（复制/速搜/收藏）+ 首页/速搜「置顶常用工具」 | 🚧 实施中 |
| **P1 · 下一阶段** | 收录提速与外链建设 | 接入 Bing Webmaster + IndexNow、Google Search Console、百度资源平台；外贸社区与 GitHub 外链冷启动 | ⏳ 规划中 |
| **P1 · 下一阶段** | 决策型实操指南 `/guides` | 10–15 篇外贸高频问题指南（FOB/CIF、装柜、L/C 审单、催款模板），双吃长尾 SEO 与 AI 引用 | ⏳ 规划中 |
| **P2 · 规模放量** | 裂变分享与英文版 `/en` | 核心计算器「一键分享链接」（URL 参数还原）+ 单证抬头本地记忆 + Top 10 工具 `/en` 英文版（`hreflang`） | ⏳ 规划中 |
