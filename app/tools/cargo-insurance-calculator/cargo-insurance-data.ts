// 名称: 货物保险条款速查数据
// 描述: ICC 条款承保范围对比与投保注意事项
// 路径: Globokit/app/tools/cargo-insurance-calculator/cargo-insurance-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

export interface IccClauseRow {
  name: string
  coverage: string
  typicalUse: string
}

export const ICC_CLAUSE_ROWS: IccClauseRow[] = [
  {
    name: 'ICC (A) 一切险',
    coverage: '承保除外责任以外的一切风险，含偷窃提货不着、破碎、雨淋、渗漏等外来风险',
    typicalUse: '高值易碎、易盗抢货物，如电子产成品、精密仪器',
  },
  {
    name: 'ICC (B) 水渍险',
    coverage: '承保自然灾害与运输工具意外事故导致的损失，外加洗涤、撞击、落水等列明风险',
    typicalUse: '大宗商品、普货，性价比均衡',
  },
  {
    name: 'ICC (C) 平安险',
    coverage: '仅承保重大运输事故导致的全部或部分损失，不承保一般外来风险',
    typicalUse: '低值耐运输货物，如五金建材散货',
  },
  {
    name: '战争险附加',
    coverage: '承保战争、敌对行为、捕获扣押导致的损失，常与罢工险（SRCC）捆绑',
    typicalUse: '红海、黑海等高风险航线，银行或信用证强制要求时',
  },
]

export const INSURANCE_TIPS: string[] = [
  '投保加成默认 110%，即投保金额 = CIF × 110%，10% 用于覆盖买方预期利润，信用证通常会明确该比例。',
  'FOB 与 CFR 口径必须先换算成 CIF 才能算保费，公式为 CIF = (FOB + 运费) / (1 − 投保加成 × 总费率)。',
  '保险单据日期不得晚于提单装运日期，否则银行审单将视为不符点。',
  '战争险与罢工险按附加费率逐单报价，高风险航线出运前务必向保险公司确认是否承接。',
  '免赔额（Deductible）条款会显著影响实际理赔金额，投保时应与客户约定免赔口径。',
]
