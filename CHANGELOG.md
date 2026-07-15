# 更新日志

本项目的重要变更均记录于此。版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [0.2.0] - 2026-07-15

### 新增

- 新增国际条码生成器，支持 GS1 DataMatrix、GS1-128、QR Code、Data Matrix、Code 128/39、EAN-13/8、UPC-A、ITF-14 与 ISBN-13。
- 支持 GS1 应用标识符、日期与校验位验证，以及 PNG、SVG 下载。
- 新增国家与节假日 JSON 数据资产校验命令 `npm run validate:data`。

### 优化

- 将首页、导航、工具注册表和主要工具页面按状态、表单、结果与数据职责拆分。
- 将大型国家资料和 2025–2027 节假日静态对象迁移为独立数据资产。
- 全项目代码文件超限数量由 24 个降为 0，并保持原有路由、字段、交互和计算口径。
- 建立版本号、CHANGELOG、README、Git tag 与 GitHub Release 同步发布流程。

### 修复

- 统一国际条码生成器在搜索结果和页面中的展示名称。
- 将条码载入示例替换为不关联外部供应商的虚构 GS1 受限流通测试数据。

[0.2.0]: https://github.com/everett7623/Globokit/releases/tag/v0.2.0
