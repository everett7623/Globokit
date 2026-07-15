# 新增国际条码生成器

- 日期：2026-07-14
- 状态：已完成

## TODO

- [x] 阅读 `README.md`、`PROGRESS.md`、工具注册表及现有工具页面模式。
- [x] 核对 TEC-IT 参考页面、GS1 General Specifications 26.0 与 GS1 DataMatrix 指南。
- [x] 实现 GS1 DataMatrix、GS1-128 与常用非 GS1 条码生成及输入校验。
- [x] 接入工具注册表、首页图标、导航、相关工具与 sitemap 自动链路。
- [x] 更新 `README.md`、`PROGRESS.md` 并执行 lint、类型检查、构建和浏览器验证。

## 功能边界

- 所有条码均在浏览器本地生成，不上传用户输入。
- GS1 数据采用应用标识符（AI）结构，支持带括号的可读格式与常见原始元素串。
- GS1 DataMatrix 使用 ISO/IEC 16022:2024 定义的 Data Matrix ECC 200 符号制，并在首位编码 FNC1。
- 下载格式提供 PNG 与 SVG；生成结果仍需结合实际材料、尺寸和打印设备做条码质量验证。
