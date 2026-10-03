// 名称: 唛头预设与规范数据
// 描述: 常用唛头场景预设与印刷规范提示
// 路径: Globokit/app/tools/shipping-mark-generator/shipping-mark-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

import type { ShippingMarkInput } from '@/lib/tools/shipping-mark-generator'

export interface ShippingMarkPreset {
  id: string
  name: string
  description: string
  input: ShippingMarkInput
}

export const SHIPPING_MARK_PRESETS: ShippingMarkPreset[] = [
  {
    id: 'standard',
    name: '标准外箱唛头',
    description: '收货人代号 + 订单号 + 目的港 + 区间箱号 + MADE IN CHINA',
    input: {
      consigneeMark: 'ABC',
      orderNo: 'PO-2026-0930',
      destinationPort: 'HAMBURG',
      cartonCount: 50,
      cartonNumberStyle: 'range',
      startCartonNo: 1,
      extraLines: [],
      showMadeIn: true,
      showGrossWeight: false,
      grossWeightKg: 0,
      showDimensions: false,
      dimensionsCm: '',
    },
  },
  {
    id: 'fba',
    name: '亚马逊 FBA 简化',
    description: 'FBA Shipment ID + Reference + 箱号逐箱 OF 风格',
    input: {
      consigneeMark: 'FBA15K2D9XYZ',
      orderNo: 'BXT-2026-771',
      destinationPort: 'LAX8V',
      cartonCount: 30,
      cartonNumberStyle: 'each',
      startCartonNo: 1,
      extraLines: ['Ship To: FBA-LAX8V'],
      showMadeIn: true,
      showGrossWeight: false,
      grossWeightKg: 0,
      showDimensions: false,
      dimensionsCm: '',
    },
  },
  {
    id: 'heavy-carton',
    name: '带毛重尺寸唛头',
    description: '适合重型设备类外箱，含 G.W. 与外箱尺寸',
    input: {
      consigneeMark: 'NORDIC',
      orderNo: 'SO-88121',
      destinationPort: 'GOTHENBURG',
      cartonCount: 12,
      cartonNumberStyle: 'range',
      startCartonNo: 1,
      extraLines: ['THIS SIDE UP'],
      showMadeIn: true,
      showGrossWeight: true,
      grossWeightKg: 28.5,
      showDimensions: true,
      dimensionsCm: '60x40x40',
    },
  },
]

export const SHIPPING_MARK_TIPS: string[] = [
  '唛头印刷在外箱两个相邻侧面，字体高度建议不小于 2cm，确保仓储与分拨扫码可视。',
  '使用防水油墨或覆膜标签，避免海运高湿环境下字迹晕染。',
  '箱号风格与客户确认：整批区间（1-50）适合人工分拣，逐箱 OF 风格（3 OF 50）适合自动化流水线。',
  'FBA 货件按亚马逊要求粘贴 Shipment 标签时，唛头信息不得遮挡箱唛与条码区。',
  '信用证项下唛头必须与信用证规定及全套单据（发票、箱单、提单）完全一致。',
]
