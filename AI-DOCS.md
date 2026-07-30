# AI 开发工具配置指南

本项目为不同的 AI 开发助手提供了统一的配置文档，确保一致的开发体验。

## 📁 文档位置

| AI 工具 | 配置文件 | 状态 |
|---------|---------|------|
| **Claude Code** | `CLAUDE.md` | ✅ 已配置 |
| **Cursor AI** | `.cursorrules` | ✅ 已配置 |
| **GitHub Copilot** | `.github/copilot-instructions.md` | ✅ 已配置 |

## 🎯 统一内容

所有 AI 工具配置文档包含以下统一内容：

### 1. 项目概述
- 技术栈：Next.js 14, TypeScript, Tailwind CSS
- 架构：纯前端，无后端依赖
- 部署：Vercel

### 2. 开发命令
```bash
npm run dev              # 开发服务器
npm run build            # 生产构建
npm run lint             # 代码检查
npm run validate:data    # 数据验证
```

### 3. 核心架构
- **工具注册表系统**：中心化管理工具元数据
- **算法与 UI 分离**：纯函数 + React 组件
- **数据资产管理**：JSON 存储 + TypeScript 门面

### 4. 开发约束
- 路径别名：`@/*`
- TypeScript 严格模式
- 文件头注释规范
- 样式系统：Tailwind CSS + Shadcn UI

### 5. 新增工具流程
1. 在分类注册表中添加元数据
2. 创建算法文件（`lib/tools/`）
3. 创建页面组件（`app/tools/{slug}/`）
4. 注册表自动驱动导航、首页、sitemap

### 6. 版本发布流程
1. 更新 `package.json` 版本号
2. 记录 `CHANGELOG.md`
3. 更新 `README.md`
4. 运行 `npm run validate:data` 和 `npm run build`
5. 创建 Git tag 和 GitHub Release

## 🔄 配置同步

当项目架构或流程发生变化时，需同步更新三个配置文件：

1. `CLAUDE.md` - Claude Code 专用
2. `.cursorrules` - Cursor AI 专用
3. `.github/copilot-instructions.md` - GitHub Copilot 专用

## 📝 语言约定

- **代码注释**：简体中文
- **变量/函数名**：英文
- **Git commit**：简体中文 + 英文技术术语
- **配置文档**：英文（便于 AI 工具解析）

## 🎨 代码风格

### 文件头注释
```typescript
// 名称: 组件/模块名称
// 描述: 功能说明
// 路径: Globokit/相对路径
// 作者: everettlabs
// 更新时间: YYYY-MM-DD
```

### 响应式布局
```tsx
// 工具页面标准布局
<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
  <Card>{/* 表单区 */}</Card>
  <Card>{/* 结果区 */}</Card>
</div>
```

### 组件命名
- 页面组件：`{ToolName}Page`
- 表单组件：`{ToolName}Form`
- 结果组件：`{ToolName}Result`
- 数据文件：`{tool-name}-data.ts`

## 🚨 重要提醒

1. **不要硬编码工具列表** - 使用注册表系统
2. **修改数据资产后必须验证** - `npm run validate:data`
3. **大型数据集提取为 JSON** - >1000 行
4. **新增工具时更新多处** - 注册表、导航、README、CHANGELOG
5. **所有计算在浏览器本地执行** - 无后端 API

## 📚 相关文档

- [README.md](../README.md) - 项目介绍和功能说明
- [CHANGELOG.md](../CHANGELOG.md) - 版本更新记录
- [PROGRESS.md](../PROGRESS.md) - 开发进度记录
- [package.json](../package.json) - 依赖配置

## 🤝 贡献指南

使用任何 AI 工具开发时：
1. 阅读对应的配置文档
2. 遵循统一的代码风格和架构模式
3. 确保修改后项目能正常构建
4. 更新相关文档（如有必要）

---

**维护者**: everettlabs  
**最后更新**: 2026-07-30
