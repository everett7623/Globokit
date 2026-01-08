<div align="center">
  <h1 align="center">GloboKit - 外贸实用工具集</h1>

  <p align="center">
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Built%20with-Next.js%2014-black" alt="Next.js">
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC" alt="Tailwind CSS">
    </a>
  </p>

  <p align="center">
    <strong>GloboKit</strong> 是一个专为外贸从业者和开发者打造的现代化在线工具平台。<br/>
    我们致力于解决国际贸易工作中的痛点，提供从文本处理、财务计算到全球信息查询的一站式解决方案。
  </p>

  <p align="center">
    <a href="https://globokit.com">在线演示</a>
    ·
    <a href="https://github.com/everett7623/Globokit/issues">报告问题</a>
    ·
    <a href="https://seedloc.com">博客</a>
  </p>

  <p align="center">
    <a href="https://vercel.com/new/clone?repository-url=https://github.com/everett7623/Globokit">
      <img src="https://vercel.com/button" alt="Deploy with Vercel">
    </a>
  </p>
</div>

---

## ✨ 功能特性

### 📊 财务与计算工具

- **VPS剩余价值计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>
  
  - 基于购买日期与续费周期，精确计算服务器剩余残值。
  - 支持 **多币种自动汇率** (USD, CNY, EUR等) 换算。
  - 智能推算剩余天数与日均价值，直观的进度条展示。
- **人民币大写转换**
  
  - 将数字金额一键转换为标准的中文大写（壹, 贰, 叁...），适用于合同、发票及财务报表。
- **全球货币符号大全**
  
  - 汇集全球主要贸易国家的货币代码 (ISO 4217)、符号及其中英文名称对照。

### 📝 文本与效率工具

- **专业级英文大小写转换**
  
  - 支持 **15种** 转换模式，包括基础格式 (UPPERCASE, lowercase)。
  - **开发者友好**：支持 `camelCase`, `snake_case`, `kebab-case` 等编程命名规范。
  - **外贸/PT场景**：特有的 `dot.case` 模式，保留原始大小写（如 `S01.HDTV`），完美适配文件名生成。
- **特殊字符检查与清洗**
  
  - 快速识别文本中的非标准字符、乱码及不可见字符，防止邮件传输乱码。
- **数字转英文**
  
  - 将阿拉伯数字转换为标准的英文拼写（支持基数词与序数词），适用于外贸报价单。
- **中文转拼音**
  
  - 支持多音字识别、声调标注及多种输出格式配置。

### 🌍 全球信息查询

- **全球国家信息库**
  
  - 包含世界各国的 **中英文名称**、**ISO代码** (2位/3位)、**国际区号**、**顶级域名后缀**及所属时区。
- **世界时间与时区**
  
  - 实时查看全球主要贸易城市（纽约、伦敦、东京等）的当地时间，辅助跨时区会议安排。
- **国际节假日查询**
  
  - 查询全球主要贸易伙伴的公共假期安排，避免在客户休息日发送重要邮件。

---

## 🛠️ 技术栈

本项目基于现代化的前端技术栈构建，注重性能与用户体验：

- **核心框架**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件库**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **工具库**: `date-fns`, `clsx`, `tailwind-merge`

---

## 📦 目录结构

```bash
Globokit/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD 部署配置
├── app/                        # Next.js App Router 页面
│   ├── tools/                  # 工具页面路由
│   │   ├── currency-symbols/   # 全球货币符号
│   │   ├── global-country-info/# 全球国家信息
│   │   ├── holiday-query/      # 国际节假日
│   │   ├── number-to-english/  # 数字转英文
│   │   ├── pinyin/             # 中文转拼音
│   │   ├── rmb-converter/      # 人民币大写转换
│   │   ├── special-char/       # 特殊字符检查
│   │   ├── text-case/          # 英文大小写转换
│   │   ├── vps-calculator/     # VPS剩余价值计算器
│   │   ├── world-time/         # 世界时间
│   │   └── layout.tsx          # 工具页通用布局
│   ├── globals.css             # 全局样式文件
│   ├── layout.tsx              # 根布局 (RootLayout)
│   └── page.tsx                # 首页入口
├── components/                 # React 组件库
│   ├── layout/                 # 全局布局组件
│   │   ├── footer.tsx          # 页脚
│   │   ├── header.tsx          # 页头
│   │   └── navigation.tsx      # 导航栏
│   ├── tools/                  # 工具页专用组件
│   │   ├── copy-button.tsx     # 复制按钮
│   │   └── tool-card.tsx       # 工具入口卡片
│   └── ui/                     # 基础 UI 组件 (Shadcn/Radix)
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
├── lib/                        # 核心逻辑与工具函数
│   ├── tools/                  # 纯函数算法实现
│   │   ├── currency-symbols.ts
│   │   ├── global-country-info.ts
│   │   ├── holiday-query.ts
│   │   ├── number-english.ts
│   │   ├── pinyin.ts
│   │   ├── rmb-converter.ts
│   │   ├── special-char.ts
│   │   ├── text-case.ts
│   │   ├── vps-calculator.ts
│   │   └── world-time.ts
│   └── utils.ts                # 通用工具 (cn 类名合并)
├── public/                     # 静态资源
│   └── favicon.ico
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖配置
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.ts          # Tailwind CSS 配置
└── tsconfig.json               # TypeScript 配置
```

---

## 🚀 快速开始

想要在本地运行本项目？请遵循以下步骤：

想要拥有自己的外贸工具站？你可以一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/everett7623/Globokit)

或者在本地运行：

1. **克隆项目**
```bash
git clone https://github.com/everett7623/Globokit.git
cd Globokit
```

2. **安装依赖**

```bash
npm install
# 或者使用 pnpm (推荐)
pnpm install
```

3. **启动开发服务器**

```bash
npm run dev
# 或者
pnpm dev
```

4. **访问**
   打开浏览器访问 http://localhost:3000 即可看到效果。

---

## 📄 开源协议

本项目采用 **MIT 协议** 开源。这意味着你可以免费地使用、复制、修改、合并、出版发行、散布、再授权及贩售软件的副本。

Built with ❤️ by **[Jensfrank](https://github.com/everett7623)**.
