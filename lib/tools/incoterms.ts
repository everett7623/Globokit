// 名称: 国际贸易术语速查数据与检索
// 描述: 提供 Incoterms 2020 术语数据、搜索与筛选能力
// 路径: Globokit/lib/tools/incoterms.ts
// 作者: Jensfrank
// 更新时间: 2026-06-30

export type IncotermTransportMode = 'any' | 'sea'

export interface IncotermItem {
  code: string
  nameEn: string
  nameCn: string
  mode: IncotermTransportMode
  summary: string
  riskTransfer: string
  sellerCost: string
  buyerCost: string
  typicalUse: string
}

export const INCOTERMS_2020: IncotermItem[] = [
  {
    code: 'EXW',
    nameEn: 'Ex Works',
    nameCn: '工厂交货',
    mode: 'any',
    summary: '卖方在其场所交货，买方承担几乎全部后续责任。',
    riskTransfer: '卖方场所交货时',
    sellerCost: '最低，通常仅完成备货与交货',
    buyerCost: '最高，承担装运、出口、运输与清关',
    typicalUse: '买方有强物流能力，且可自行安排全链路运输',
  },
  {
    code: 'FCA',
    nameEn: 'Free Carrier',
    nameCn: '货交承运人',
    mode: 'any',
    summary: '卖方在指定地点将货物交给买方指定承运人。',
    riskTransfer: '货交第一承运人时',
    sellerCost: '承担出口手续及交货前费用',
    buyerCost: '承担主运费与后续费用',
    typicalUse: '集装箱贸易常用，责任边界清晰',
  },
  {
    code: 'CPT',
    nameEn: 'Carriage Paid To',
    nameCn: '运费付至',
    mode: 'any',
    summary: '卖方支付运费至目的地，但风险在起运地交承运人时转移。',
    riskTransfer: '货交第一承运人时',
    sellerCost: '承担主运费',
    buyerCost: '承担目的地后的费用与风险',
    typicalUse: '卖方愿意支付运费，但不承担运输风险',
  },
  {
    code: 'CIP',
    nameEn: 'Carriage and Insurance Paid To',
    nameCn: '运费和保险费付至',
    mode: 'any',
    summary: '在 CPT 基础上，卖方还需投保较高标准货运险。',
    riskTransfer: '货交第一承运人时',
    sellerCost: '承担主运费和保险费',
    buyerCost: '承担目的地后费用与部分风险',
    typicalUse: '高价值货物，对保险要求更高',
  },
  {
    code: 'DAP',
    nameEn: 'Delivered At Place',
    nameCn: '目的地交货',
    mode: 'any',
    summary: '卖方将货送至指定目的地并可供卸货，未办理进口清关。',
    riskTransfer: '目的地交货时',
    sellerCost: '承担到目的地前的大部分费用',
    buyerCost: '承担进口清关与税费及卸货',
    typicalUse: '门到门场景，买方负责进口环节',
  },
  {
    code: 'DPU',
    nameEn: 'Delivered at Place Unloaded',
    nameCn: '目的地卸货后交货',
    mode: 'any',
    summary: '卖方在目的地完成卸货后交货。',
    riskTransfer: '目的地卸货完成时',
    sellerCost: '承担运输与卸货费用',
    buyerCost: '承担进口清关与税费',
    typicalUse: '项目货或需卖方负责卸货的场景',
  },
  {
    code: 'DDP',
    nameEn: 'Delivered Duty Paid',
    nameCn: '完税后交货',
    mode: 'any',
    summary: '卖方承担最大责任，直至目的地并完成进口税费。',
    riskTransfer: '目的地交货时',
    sellerCost: '最高，含进口清关和税费',
    buyerCost: '最低，通常仅接货',
    typicalUse: '买方希望简化流程，卖方具备本地清关能力',
  },
  {
    code: 'FAS',
    nameEn: 'Free Alongside Ship',
    nameCn: '船边交货',
    mode: 'sea',
    summary: '卖方将货交至装运港船边，买方负责装船及后续。',
    riskTransfer: '货到船边时',
    sellerCost: '承担到船边前费用',
    buyerCost: '承担装船、海运、保险及后续费用',
    typicalUse: '散杂货和大宗商品海运',
  },
  {
    code: 'FOB',
    nameEn: 'Free On Board',
    nameCn: '船上交货',
    mode: 'sea',
    summary: '卖方负责装船，货物越过船舷后风险转移。',
    riskTransfer: '装运港装船完成时',
    sellerCost: '承担出口及装船前费用',
    buyerCost: '承担海运、保险及目的港费用',
    typicalUse: '传统海运条款，常见于大宗货物',
  },
  {
    code: 'CFR',
    nameEn: 'Cost and Freight',
    nameCn: '成本加运费',
    mode: 'sea',
    summary: '卖方支付运费至目的港，但风险在装船时转移。',
    riskTransfer: '装运港装船完成时',
    sellerCost: '承担海运费',
    buyerCost: '承担保险与目的港后费用',
    typicalUse: '海运报价常用，买方自行投保',
  },
  {
    code: 'CIF',
    nameEn: 'Cost Insurance and Freight',
    nameCn: '成本加保险费加运费',
    mode: 'sea',
    summary: '在 CFR 基础上，卖方增加最低限度海运保险。',
    riskTransfer: '装运港装船完成时',
    sellerCost: '承担海运费及最低保险费',
    buyerCost: '承担目的港后费用和部分风险',
    typicalUse: '海运贸易经典条款，适合标准货物',
  },
]

export function filterIncoterms(mode: IncotermTransportMode): IncotermItem[] {
  if (mode === 'any') {
    return INCOTERMS_2020
  }
  return INCOTERMS_2020.filter((item) => item.mode === mode)
}

export function searchIncoterms(query: string, mode: IncotermTransportMode = 'any'): IncotermItem[] {
  const trimmed = query.trim().toLowerCase()
  const source = filterIncoterms(mode)

  if (!trimmed) {
    return source
  }

  return source.filter((item) => {
    const keyword = `${item.code} ${item.nameEn} ${item.nameCn} ${item.summary}`.toLowerCase()
    return keyword.includes(trimmed)
  })
}
