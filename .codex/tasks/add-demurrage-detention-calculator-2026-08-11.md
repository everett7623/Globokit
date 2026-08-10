# 新增集装箱滞箱滞港费计算器

- 日期：2026-08-11
- 状态：功能完成，待浏览器补测

## TODO

- [x] 核对远程、本地分支和现有物流工具，确认滞箱滞港费用不是现有海运费用拆分或货代收费核对的重复功能。
- [x] 确定场内/场外占用、免费期与三段费率的预算模型和计费边界。
- [x] 实现纯函数计算、多柜汇总、免费期状态、阶梯拆分和输入校验。
- [x] 实现响应式表单、场景预设、结果卡片、复制摘要、异常提示和重置操作。
- [x] 接入物流注册表、首页出货执行工作流、UI 配置、README、CHANGELOG、PROGRESS 与 sitemap 自动链路。
- [ ] 完成定向断言、数据校验、Lint、TypeScript、生产构建、HTTP 和浏览器桌面/390px 验收（仅浏览器交互与移动视口待补测）。

## 计算边界

- 滞港费按集装箱仍在码头或堆场内的场内占用天数估算。
- 滞箱费按提柜后到还空柜前的场外占用天数估算。
- 先从用户输入的总占用天数中扣除免费天数，再按两段阶梯和后续日费率计费。
- 工具不自动推断起算日、周末、节假日或船公司特殊合并免费期，最终以正式账单与合同条款为准。

## 当前验证

- `npm run test:demurrage-detention`：19 条定向断言通过，覆盖免费期、两段及后续阶梯、多柜汇总、零费用和非法输入。
- `npm run test:fx-sensitivity`、`npm run test:payment-terms`、`npm run validate:data`、`npm run lint`、`npx tsc --noEmit` 和 `git diff --check` 均通过。
- `npm run build` 通过，生产构建生成 35 个静态页面，新路由 `/tools/demurrage-detention-calculator` 已进入页面列表。
- 本地 HTTP 烟测返回 200，页面包含标题、默认费用 `5,820 CNY` 和复制入口；首页与 sitemap 均包含新工具。
- 应用内浏览器因 `failed to write kernel assets: 系统找不到指定的路径。 (os error 3)` 无法初始化，真实点击和 390px 视口待环境恢复后补测。
