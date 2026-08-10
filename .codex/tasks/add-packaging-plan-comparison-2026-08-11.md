# 新增纸箱包装方案对比工具

- 日期：2026-08-11
- 状态：功能完成，待浏览器补测

## TODO

- [x] 核对远程、本地任务与现有装柜、空运和海运工具，确认包装方案选择属于独立业务环节。
- [x] 确定空运计费重、海运 CBM、尾箱余量、包装成本与运输成本的比较口径。
- [x] 实现 2–4 个方案的纯函数计算、成本/体积/计费重排名和输入校验。
- [x] 实现可增删方案的响应式表单、场景预设、结果明细、复制摘要、异常提示和重置操作。
- [x] 接入物流注册表、首页出货执行工作流、UI 配置、README、CHANGELOG、PROGRESS 与 sitemap 自动链路。
- [ ] 完成定向断言、数据校验、Lint、TypeScript、生产构建、HTTP 和浏览器桌面/390px 验收（仅浏览器交互与移动视口待补测）。

## 计算边界

- 纸箱数量按产品总件数除以每箱装量向上取整，尾箱余量为最后一箱未使用的件位。
- 空运计费重取总毛重与总体积重的较大值，再乘以用户输入的每公斤运价。
- 海运费用按总 CBM 乘以用户输入的每 CBM 运价，不自动应用最低计费体积。
- 总成本仅合并纸箱包装成本和基础运输成本，不含燃油、最低收费、港杂、托盘及其他附加费。

## 当前验证

- `npm run test:packaging-plans`：22 条定向断言通过，覆盖空运/海运排名、尾箱余量、体积重、模式切换和非法输入。
- `npm run test:demurrage-detention`、`npm run test:fx-sensitivity`、`npm run test:payment-terms`、`npm run validate:data`、`npm run lint`、`npx tsc --noEmit` 和 `git diff --check` 均通过。
- `npm run build` 通过，生产构建生成 36 个静态页面，新路由 `/tools/packaging-plan-comparison` 已进入页面列表。
- 本地 HTTP 烟测返回 200，页面包含默认推荐方案、`17,900 CNY` 总成本和复制入口；首页与 sitemap 均包含新工具。
- 应用内浏览器因 `failed to write kernel assets: 系统找不到指定的路径。 (os error 3)` 无法初始化，真实点击和 390px 视口待环境恢复后补测。
