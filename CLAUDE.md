# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**Globokit** 是一个专为外贸从业者打造的现代化在线工具平台，基于 Next.js 14 App Router 构建。项目采用纯前端架构，所有计算逻辑在浏览器本地执行，无后端服务依赖。

- **技术栈**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, Radix UI
- **部署**: Vercel
- **许可**: GPL-3.0-only

## 开发命令

```bash
# 启动开发服务器 (默认 http://localhost:3000)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# ESLint 检查
npm run lint

# TypeScript 类型检查
npx tsc --noEmit

# 验证国家与节假日 JSON 数据资产
npm run validate:data
```

## 核心架构

### 工具注册表系统

项目采用**中心化注册表模式**管理所有工具的元数据，避免在多处硬编码工具列表：

- **注册表入口**: `lib/tools/registry.ts` - 聚合所有工具元数据
- **分类注册表**: `lib/tools/registry-{finance|logistics|general|barcode}.ts` - 按业务域分组
- **类型定义**: `lib/tools/registry-types.ts` - 定义工具分类和元数据字段

**工具分类** (`TOOL_CATEGORIES`):
- 财务报价
- 文本处理
- 时间与节假日
- 国家与货币
- 物流与装柜
- VPS/站长工具
- 外贸沟通
- 文件与格式转换

**新增工具流程**:
1. 在对应分类注册表中添加元数据（`registry-{category}.ts`）
2. 元数据必须包含: `id`, `slug`, `title`, `shortTitle`, `description`, `category`, `iconName`, `href`, `updatedAt`
3. 注册表会自动驱动：首页工具目录、导航菜单、sitemap 生成、SEO 元数据

### 目录结构约定

```
app/
├── tools/{tool-slug}/        # 工具页面路由
│   ├── page.tsx             # 页面入口（组合状态容器、表单、结果组件）
│   ├── {tool}-form.tsx      # 表单输入组件
│   ├── {tool}-result.tsx    # 结果展示组件
│   └── {tool}-data.ts       # 静态数据（可选）
├── resources/               # 业务资源推荐页面
├── page.tsx                 # 首页
└── layout.tsx               # 根布局

lib/
├── tools/
│   ├── registry.ts          # 工具注册表入口
│   ├── registry-*.ts        # 分类注册表
│   ├── {tool-name}.ts       # 纯函数算法实现
│   └── data/                # JSON 数据资产（国家、节假日）
├── partner-resources.ts     # 业务资源数据
├── site.ts                  # 站点配置（域名、品牌名）
└── utils.ts                 # 通用工具函数

components/
├── layout/                  # 全局布局组件（header、footer、navigation）
├── home/                    # 首页专用组件
├── tools/                   # 工具页共用组件
└── ui/                      # Shadcn/Radix 基础组件
```

### 算法与 UI 分离

- **算法层** (`lib/tools/{tool-name}.ts`): 纯函数实现，无副作用，便于单元测试
- **UI 层** (`app/tools/{tool-slug}/`): React 组件，负责状态管理和用户交互
- **数据资产** (`lib/tools/data/`): 大型静态数据以 JSON 存储，通过 TypeScript 门面导出

### 数据资产校验

项目包含结构化的国家信息和节假日数据（2025-2027），存储在 `lib/tools/data/` 目录：

- `global-country-info.json` - 171 个国家的基础信息
- `holidays-{year}.json` / `holidays-curated-{year}.json` - 年度节假日数据
- `holiday-country-overrides.json` - 人工校正的国家信息
- `holiday-observances.json` - 国际与宗教节日
- `holiday-query-generated.json` - 自动生成的节假日数据

**修改数据资产后必须运行**:
```bash
npm run validate:data
```

校验器会检查国家代码格式、日期格式、字段类型、节假日枚举等约束。

## 开发约束

### 路径别名

使用 `@/*` 指向项目根目录：
```typescript
import { SITE_NAME } from '@/lib/site'
import { Button } from '@/components/ui/button'
```

### 样式系统

- 使用 Tailwind CSS utility classes
- 深色模式通过 `dark:` 前缀实现
- 自定义颜色通过 CSS 变量 (`hsl(var(--primary))`)
- 复用 Shadcn UI 组件而非从头构建

### 组件命名

- 页面组件: `{ToolName}Page` 或直接 `export default function`
- 表单组件: `{ToolName}Form`
- 结果组件: `{ToolName}Result`
- 数据文件: `{tool-name}-data.ts`

### TypeScript 严格模式

项目启用了 TypeScript 严格模式，所有新代码必须：
- 显式定义类型，避免 `any`
- 导出的函数和组件必须有明确的返回类型

### 文件头注释

每个新文件应包含结构化的头注释：
```typescript
// 名称: {组件/模块名称}
// 描述: {功能说明}
// 路径: Globokit/{相对路径}
// 作者: everettlabs
// 更新时间: YYYY-MM-DD
```

## 业务资源管理

外贸业务资源（代理、主机、AI 工具等）集中管理在 `lib/partner-resources.ts`：

```typescript
export interface PartnerResource {
  id: string
  name: string
  type: PartnerResourceType  // 客户开发、代理网络、AI 工具等
  href: string               // 推荐链接
  description: string
  bestFor: string[]          // 适用场景标签
  badge?: string             // 可选徽章（如"首推"、"企业级"）
}
```

新增资源后会自动出现在 `/resources` 页面对应分类中。

## 版本发布流程

每次发布必须同步完成：
1. 更新 `package.json` 和 `package-lock.json` 版本号（遵循 SemVer）
2. 在 `CHANGELOG.md` 记录新增、优化、修复
3. 更新 `README.md` 的版本号和功能说明
4. 运行 `npm run validate:data` 和 `npm run build` 验证
5. 创建同版本 Git tag 和 GitHub Release

## 注意事项

- 所有工具的计算逻辑在浏览器本地执行，无后端 API
- 不要在代码中硬编码工具列表，使用注册表系统
- 新增工具时确保更新注册表、导航、README 和 CHANGELOG
- 大型数据集（> 1000 行）应提取为 JSON 数据资产
- 修改数据资产后必须运行 `npm run validate:data`
- Git commit message 使用简体中文，技术术语保持英文
