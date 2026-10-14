<div align="center">
  <h1 align="center">GloboKit - 外贸实用工具集</h1>

  <p align="center">
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-GPL--3.0--only-blue.svg" alt="License">
    </a>
    <a href="https://github.com/everett7623/Globokit/releases/tag/v0.10.0">
      <img src="https://img.shields.io/badge/version-v0.10.0-brightgreen.svg" alt="Version v0.8.0">
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Built%20with-Next.js%2016-black" alt="Next.js">
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Styled%20with-Tailwind%20CSS%20v4-38B2AC" alt="Tailwind CSS">
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
    <a href="https://seedloc.com">Seedloc博客</a>
    ·
    <a href="https://vpsknow.com">VPSKnow站点</a>
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
- **外贸报价利润计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>
  
  - 根据采购成本、费用、汇率、佣金和目标利润率反推出报价单价。
  - 支持 EXW、FCA、FAS、FOB、CFR、CIF、CPT、CIP、DAP、DPU、DDP 等 Incoterms 2020 常见报价口径。
  - 按条款自动判断卖方计入成本，含运费/到门/完税条款会提示补充运费、保险、目的地费用或进口税费。
  - 可按已知售价快速核算销售利润率，展示盈亏平衡价、订单利润与成本拆分。
- **外贸阶梯报价计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 同时比较 2–5 个订购数量档位，并允许每档使用不同的采购单价。
  - 按数量摊薄每单固定费用，结合汇率、佣金、收款费和目标利润率反算外币建议价。
  - 支持报价步长向上取整，展示盈亏平衡单价、订单总额、实际利润率和相对试单价降幅。
- **外贸订单保本销量计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 从已知售价反推覆盖订单固定成本所需的最低销量，以及达到目标利润所需的销量。
  - 将佣金、收款费和售后损耗预留从销售额中扣除，输出单件贡献毛利和贡献毛利率。
  - 对照计划销量展示订单利润、安全余量，并测算计划数量下的保本单价和目标利润单价。
- **供应商报价对比** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 同时比较 2–5 家供应商，将含税与未税报价统一为含 VAT 的现金采购口径。
  - 按计划合格品数量、次品预留率和 MOQ 反推实际采购量，再叠加固定费用与国内运费。
  - 分别展示现金成本、交期和货款首付排名，并提示 MOQ 抬量与预期剩余合格品。
- **外贸收款账期成本对比** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持 T/T 预付、发货前/提单副本付尾款、即期/远期 L/C、D/P 和 OA 等常用收款条件。
  - 将预付款、生产周期、资金年化成本、收款手续费和风险准备金折算为条款总成本。
  - 对比各方案的资金缺口、加权回款天数、实际利润与利润率，并生成可复制的谈判摘要。
- **外贸汇率敏感性分析** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 输入外币订单金额、CNY 成本、收款手续费率和基准汇率，比较人民币升值、基准和贬值三个情景。
  - 输出 CNY 收入、收款手续费、实际利润、利润率、利润波动范围和盈亏平衡汇率。
  - 所有汇率均由用户输入，不依赖实时外部数据，适合报价预算、结汇谈判和汇兑风险评估。
- **进口到岸成本计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>
  
  - 按货值、运费、保险、关税、进口增值税和清关/本地费用汇总到岸成本。
  - 支持输入外币货值与汇率，自动折算 CIF、税费合计、每件到岸成本。
  - 可输入目标销售单价，快速评估订单毛利和毛利率。
- **出口退税计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持含税与未税采购口径，拆分进项税、退税额和征退税差。
  - 结合 FOB 收入与出口费用，测算退税后利润和利润率。
  - 提供 `13%退13%`、`13%退9%`、`13%退6%`、`9%退9%` 常用税率组合，不覆盖已录入的订单金额。
- **人民币大写转换**
  
  - 将数字金额一键转换为标准的中文大写（壹, 贰, 叁...），适用于合同、发票及财务报表。
- **全球货币符号大全**
  
  - 汇集全球主要贸易国家的货币代码 (ISO 4217)、符号及其中英文名称对照。

- **国际收款渠道费用对比**

  - 按订单金额与汇率折算，比较电汇、信用证、托收与第三方渠道的手续费、电报费、汇损与资金占用。
  - 输出实际到手金额、成本率、回款周期与渠道排名，并区分卖方承担还是买方承担渠道费用。

- **商业发票/形式发票生成器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 填写买卖双方、付款条款、贸易术语与最多 20 行明细，实时生成 A4 版式的商业发票（CI）或形式发票（PI）。
  - 金额按分位整数运算避免浮点误差，自动生成英文金额大写（SAY US DOLLARS ... ONLY）。
  - 支持一键复制纯文本粘贴到邮件，或直接打印/导出 PDF，内置 CI 与 PI 的使用要点和常用条款速查。

- **阶梯佣金计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按累计销售额 2–5 档超额累进分段计提佣金，末档可设为不封顶。
  - 折算回款率与达标奖金，输出分段明细、有效费率、回款后实得与合计发放。

### 🚢 物流与出货工具

- **外贸单位换算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持物流与产品规格常用的公制、英制长度、重量和体积单位换算。
  - 提供 CBM、立方英尺、千克、磅、厘米、英寸等同量纲速览和结果复制。

- **纸箱包装方案对比** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 同时比较 2–4 个纸箱方案的箱数、尾箱余量、总 CBM、总毛重和体积重。
  - 支持空运/快递按计费重估算，以及海运/拼箱按 CBM 估算。
  - 将单箱包装成本与预估运输成本合并排名，并输出单件物流成本和可复制摘要。

- **托盘装载计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持中国标准、欧标与北美标准托盘，按纸箱尺寸估算每层码放数量。
  - 综合托盘限高和含托限重，计算单托箱数、托盘数量、毛重与空间利用率。
  - 提供国内/海运托、EUR 欧标托、北美 48×40 与空运低托场景，切换时保留纸箱和货量。

- **空运/快递计费重计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 根据外箱尺寸、毛重、净重、泡重系数和箱数计算体积重、计费重与抛重差。
  - 支持快递 5000、空运 6000、经济 7000 和自定义泡重口径。
  - 可录入每公斤运价、最低收费、燃油附加和操作费，快速估算总费用与单箱费用。
- **海运费用拆分计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 汇总海运费、起运港杂费、拖车、报关、文件、保险和目的港费用。
  - 支持整柜 FCL 与拼箱 LCL 两种测算口径，拼箱可设置最低计费 CBM。
  - 自动折算每件、每公斤、每 CBM 与每柜成本，便于报价前拆分物流费用。
- **FOB/CIF 货代收费核对** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持出口卖方与海外客户两种账单对象，区分 FOB/CIF 下卖方、买方及需核对约定的费用责任。
  - 将货代实际收费与同港口、同票型或柜型、同货量的同行价或约定价逐项比较。
  - FOB 默认核对指定货代卖方账单，CIF 默认核对目的港向客户收取的换单、拆箱、操作、清关与派送费用。
  - 识别高于基准、责任不匹配和缺少基准的项目，并生成可复制的复核清单。
  - 可一键恢复默认账单，方便连续核对不同货代报价。
- **集装箱滞箱/滞港费计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 分开估算码头或堆场内的滞港费，以及提柜到还空柜期间的滞箱费。
  - 支持免费天数、第一/第二阶梯和后续日费率，按柜量汇总总费用与平均每柜费用。
  - 提供港区拥堵、延长免费期和美元账单场景，最终以船公司条款与正式账单为准。
- **装箱单生成器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持从 Excel 直接粘贴批量导入明细（品名/箱数/每箱数量/单位/毛重/净重/尺寸），自动汇总箱数、数量、毛净重与 CBM。
  - 生成 A4 版式 PACKING LIST，可打印导出 PDF 或导出带 BOM 的 CSV 给 Excel，与商业发票、唛头生成器凑齐出货单证三件套。
  - 填写内容自动保存为浏览器本地草稿，刷新或误关页面后可一键恢复。
- **国际快递/专线报价对比** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按箱规、毛重和渠道泡重系数自动判断按实重或体积重计费。
  - 支持空运、商业快递及 DDP 专线，区分按公斤、整票基础价和整票一口价。
  - 展示报价范围、每公斤/每箱成本以及费用与时效排名。
- **报关费用估算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 支持出口报关与进口清关，汇总单证、代理、查验、港区操作和本地运输等费用。
  - 按查验概率估算期望成本，并输出每票、每件摊费和货值占比。
  - 提供出口普货、多品名、进口清关与高查验预算场景，切换时保留票数、数量和货值。
- **装柜/箱规计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按纸箱尺寸、毛重、数量和柜型估算整柜装载数量、柜数与利用率。
  - 支持 20GP、40GP、40HQ、45HQ 等常见柜型参数。
- **出口货物保险费计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按 FOB/CFR/CIF 口径自动换算 CIF 价值与 110% 投保金额，公式为 CIF = (FOB + 运费) / (1 − 投保加成 × 总费率)。
  - 拆分基础险与战争险附加保费，输出口径说明、保费占 CIF 比例与风险提示。
  - 附 ICC (A)/(B)/(C) 条款承保范围速查与投保注意事项。
- **信用证交单自查清单** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按信用证条款、商业发票、提单、保险、附加单证与跨单一致性六组核对 27 项审单要点。
  - 按致命 10 分/重要 5 分/次要 2 分加权计分，输出完成度、自查得分、风险等级与下一步建议。
  - 为未通过的致命项自动生成带信用证号的英文改证片段，可直接粘贴进邮件。
- **国际贸易术语速查**

  - 快速查询 Incoterms 2020 条款，明确风险转移点、费用责任和交付边界。

- **外贸询盘优先级评估**

  - 按信息完整度、客户可信度与商务价值三个维度给询盘打分，输出优先级、建议回应时限与跟进节奏。
  - 列出待补齐信息清单，并生成可直接粘贴的中英文追问话术。

- **催款邮件生成器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按逾期天数自动推荐友好提醒、首次催款、二次严肃、最后通牒四档语气，也可手动切换。
  - 一键生成含发票号、金额与付款条款的英文催款邮件，支持复制全文或仅复制正文。
  - 附四阶段催收节奏表与本档注意事项（含信用保险报损提醒）。

### 📝 文本与效率工具

- **国际条码生成器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 依据 GS1 General Specifications 26.0 与 ISO/IEC 16022:2024，校验 GS1 应用标识符、日期与校验位，生成 GS1 DataMatrix 和 GS1-128。
  - 支持 QR Code、Data Matrix、Code 128/39、EAN-13/EAN-8、UPC-A、ITF-14、ISBN-13，并可下载 PNG/SVG。

- **外贸唛头生成器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按收货人代号、订单号、目的港与箱号风格（区间 1-50 / 逐箱 1 OF 50 / 不输出）生成外箱印刷唛头。
  - 支持毛重 G.W.、外箱尺寸、MADE IN CHINA 开关与自定义附加行，右侧实时模拟纸箱印刷面预览。
  - 生成逐箱标签预览并可复制全文到标签软件，内置标准外箱、亚马逊 FBA、带毛重尺寸三种预设。

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

- **外贸邮件签名生成器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 生成 Outlook、Foxmail、Gmail 兼容的 table 内联样式 HTML 签名，复制源码到签名设置即可使用。
  - 支持 logo、座机/手机/WhatsApp/邮箱/网址/地址多行联系方式与纯文本版本。
  - 输入自动 HTML 转义防注入，无协议网址自动补全 https。

### 🌍 全球信息查询

- **全球国家信息库**
  
  - 包含世界各国的 **中英文名称**、**ISO代码** (2位/3位)、**国际区号**、**顶级域名后缀**及所属时区。
- **多币种报价换算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 基于实时汇率在人民币、美元、欧元等 10 个常用贸易币种间交叉换算。
  - 支持渠道点差模拟与手动锁定 1 USD 汇率，汇率获取失败自动降级内置参考值。
  - 输出全币种换算表，便于报价单多币种标注。
- **世界时间与时区**
  
  - 实时查看全球主要贸易城市（纽约、伦敦、东京等）的当地时间，辅助跨时区会议安排。
- **外贸交期计算器** <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span>

  - 按生产、运输和缓冲周期依次推算阶段里程碑及最终交付日期。
  - 支持自然日、工作日，以及排除指定国家法定公共假日的计算口径。
  - 提供快递小单、空运订单、海运订单与工作日承诺场景，切换时保留起始日和国家。
- **国际节假日查询**
  
  - 查询全球主要贸易伙伴的公共假期安排，避免在客户休息日发送重要邮件。

---

## 🏷️ 版本与发布

- 当前版本：[`v0.10.0`](https://github.com/everett7623/Globokit/releases/tag/v0.10.0)
- 完整更新记录：[CHANGELOG.md](CHANGELOG.md)
- 所有历史版本：[GitHub Releases](https://github.com/everett7623/Globokit/releases)

每次发布必须同步完成以下事项：

1. 按 SemVer 更新 `package.json` 与 `package-lock.json` 版本号。
2. 在 `CHANGELOG.md` 记录新增、优化、修复及重要兼容性变化。
3. 更新 README 当前版本、功能说明和目录结构。
4. 通过专项测试、数据校验、Lint、TypeScript 与生产构建后，再创建同版本 Git tag 和 GitHub Release。

---

## 🛠️ 技术栈

本项目基于现代化的前端技术栈构建，注重性能与用户体验：

- **核心框架**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Components)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式方案**: [Tailwind CSS v4](https://tailwindcss.com/)（CSS-first `@theme` 配置）
- **UI 组件库**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **工具库**: `clsx`, `tailwind-merge`

---

## 📦 目录结构

```bash
Globokit/
├── .github/
│   └── workflows/
│       └── ci.yml              # 测试、Lint、类型检查与构建
├── app/                        # Next.js App Router 页面
│   ├── resources/              # 外贸业务资源页
│   ├── tools/                  # 工具页面路由
│   │   ├── air-freight-calculator/ # 空运/快递计费重计算
│   │   ├── barcode-generator/   # 国际条码生成器
│   │   ├── cargo-insurance-calculator/ # 出口货物保险费计算
│   │   ├── container-load-calculator/ # 装柜/箱规计算
│   │   ├── csv-to-markdown/    # CSV 与 Markdown 表格互转
│   │   ├── yaml-json-converter/ # YAML 与 JSON 互转
│   │   ├── remittance-cost-calculator/ # 国际收款渠道费用对比
│   │   ├── inquiry-priority-scorer/ # 外贸询盘优先级评估
│   │   ├── invoice-generator/  # 商业发票/形式发票生成
│   │   ├── lc-discrepancy-checklist/ # 信用证交单自查清单
│   │   ├── shipping-mark-generator/ # 外贸唛头生成
│   │   ├── server-cost-comparison/ # 服务器成本对比
│   │   ├── currency-symbols/   # 全球货币符号
│   │   ├── customs-cost-calculator/ # 报关费用估算
│   │   ├── demurrage-detention-calculator/ # 集装箱滞箱滞港费
│   │   ├── delivery-date-calculator/ # 外贸交期计算
│   │   ├── email-phrase-library/ # 外贸邮件话术库
│   │   ├── export-tax-rebate-calculator/ # 出口退税计算
│   │   ├── express-channel-comparison/ # 快递渠道价格对比
│   │   ├── freight-charge-audit/ # FOB/CIF 货代收费核对
│   │   ├── fx-sensitivity-calculator/ # 外贸汇率敏感性分析
│   │   ├── global-country-info/# 全球国家信息
│   │   ├── holiday-query/      # 国际节假日
│   │   ├── import-landed-cost-calculator/ # 进口到岸成本计算
│   │   ├── incoterms/          # 国际贸易术语速查
│   │   ├── json-formatter/     # JSON 格式化与转换
│   │   ├── number-to-english/  # 数字转英文
│   │   ├── ocean-freight-calculator/ # 海运费用拆分计算
│   │   ├── order-break-even-calculator/ # 外贸订单保本销量计算
│   │   ├── packaging-plan-comparison/ # 纸箱包装方案对比
│   │   ├── pallet-load-calculator/ # 托盘装载计算
│   │   ├── payment-terms-calculator/ # 外贸收款账期成本对比
│   │   ├── pinyin/             # 中文转拼音
│   │   ├── quote-calculator/   # 外贸报价利润计算
│   │   ├── rmb-converter/      # 人民币大写转换
│   │   ├── special-char/       # 特殊字符检查
│   │   ├── supplier-quote-comparison/ # 供应商报价对比
│   │   ├── text-case/          # 英文大小写转换
│   │   ├── tiered-quote-calculator/ # 外贸阶梯报价计算
│   │   ├── timestamp-converter/ # Unix 时间戳转换
│   │   ├── unit-converter/     # 外贸单位换算
│   │   ├── voltage-plug-guide/ # 目标市场电压与插头速查
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
│   │   ├── air-freight-calculator.ts
│   │   ├── barcode-generator.ts
│   │   ├── container-load-calculator.ts
│   │   ├── yaml-json-converter.ts
│   │   ├── remittance-cost-calculator.ts
│   │   ├── inquiry-priority-scorer.ts
│   │   ├── server-cost-comparison.ts
│   │   ├── csv-to-markdown.ts
│   │   ├── currency-symbols.ts
│   │   ├── data/               # 国家与节假日 JSON 数据资产
│   │   ├── customs-cost-calculator.ts
│   │   ├── demurrage-detention-calculator.ts
│   │   ├── delivery-date-calculator.ts
│   │   ├── export-tax-rebate-calculator.ts
│   │   ├── express-channel-comparison.ts
│   │   ├── freight-charge-audit.ts
│   │   ├── fx-sensitivity-calculator.ts
│   │   ├── global-country-info.ts
│   │   ├── holiday-query.ts
│   │   ├── import-landed-cost-calculator.ts
│   │   ├── incoterms.ts
│   │   ├── json-formatter.ts
│   │   ├── number-english.ts
│   │   ├── ocean-freight-calculator.ts
│   │   ├── order-break-even-calculator.ts
│   │   ├── packaging-plan-comparison.ts
│   │   ├── pallet-load-calculator.ts
│   │   ├── payment-terms-calculator.ts
│   │   ├── pinyin.ts
│   │   ├── quote-calculator.ts
│   │   ├── registry-barcode.ts
│   │   ├── registry-finance.ts
│   │   ├── registry-general.ts
│   │   ├── registry-logistics.ts
│   │   ├── registry-types.ts
│   │   ├── registry.ts
│   │   ├── registry-ui.ts
│   │   ├── rmb-converter.ts
│   │   ├── special-char.ts
│   │   ├── supplier-quote-comparison.ts
│   │   ├── text-case.ts
│   │   ├── tiered-quote-calculator.ts
│   │   ├── timestamp-converter.ts
│   │   ├── unit-converter.ts
│   │   ├── vps-calculator.ts
│   │   └── world-time.ts
│   └── utils.ts                # 通用工具 (cn 类名合并)
├── public/                     # 静态资源
│   └── favicon.ico
├── scripts/
│   └── validate-tool-data.cjs  # 国家与节假日数据契约校验
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

5. **生产环境运行**

```bash
npm run build   # 生成静态页面与构建产物
npm start       # 以生产模式启动，默认监听 3000 端口
```

6. **质量校验（提交前建议全部跑一遍）**

```bash
npm test              # 定向断言（含工具目录一致性校验）
npm run typecheck     # TypeScript 全量类型检查
npm run lint          # ESLint
npm run test:ui       # 工具页交互测试（需先安装 esbuild 与 jsdom）
npm run test:web      # 真实浏览器验证（需站点已启动 + playwright + chromium）
npm run validate:data # 国家与节假日数据资产校验
```

---

**关于交互测试**：`npm run test:ui` 会用 esbuild 把四个工具页打成 CommonJS bundle，在 jsdom 环境中渲染组件并派发真实 DOM 事件，覆盖输入联动、维度开关、方案增删、错误提示与复制入口。它需要 `esbuild` 与 `jsdom` 两个开发依赖，未安装时该命令会跳过。

## 🚢 部署

本项目是纯前端静态应用，没有数据库、环境变量或服务端依赖，任何能跑 Next.js 的平台都可以承载。

**Vercel（最省事）**：点击上方的 Deploy 按钮导入仓库即可，构建命令用默认的 `npm run build`，无需配置环境变量。

**自有服务器**：构建后以生产模式常驻，用进程管理器或系统服务托管：

```bash
git clone https://github.com/everett7623/Globokit.git && cd Globokit
npm ci && npm run build
npm start   # 默认 3000 端口，可用 PORT 环境变量覆盖
```

**Linux systemd 示例**（把路径换成实际部署目录）：

```ini
[Unit]
Description=Globokit
After=network.target

[Service]
WorkingDirectory=/opt/globokit
ExecStart=/usr/bin/npm start
Environment=PORT=3000
Restart=always

[Install]
WantedBy=multi-user.target
```

**Nginx 反向代理要点**：把 `/` 转发到 `127.0.0.1:3000`，并透传 `Host`、`X-Forwarded-For`、`X-Forwarded-Proto`；站点已自带 CSP、`X-Frame-Options`、`Referrer-Policy` 等安全响应头，反向代理层无需重复设置。

**发布流程**：遵循 [`VERSIONING.md`](VERSIONING.md)，以 `package.json` 为唯一版本来源；`npm run test:version` 会强制校验 README、锁文件、CHANGELOG 与 Release 链接一致。`main` 分支 CI 必须全绿后再创建同版本 tag 和 GitHub Release。

---

