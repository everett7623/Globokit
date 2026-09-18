// 名称: 目标市场电压与插头数据
// 描述: 主要贸易国家和地区的电压、频率与插头类型速查数据
// 路径: Globokit/app/tools/voltage-plug-guide/voltage-plug-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-16

export interface VoltagePlugEntry {
  country: string
  region: string
  voltage: string
  frequency: string
  plugs: string[]
}

/**
 * 覆盖主要出口目标市场。电压/频率以民用市电为准，个别国家存在区域差异。
 * 出货前仍需以客户所在地实测或当地官方信息为准。
 */
export const VOLTAGE_PLUG_ENTRIES: VoltagePlugEntry[] = [
  { country: '中国大陆', region: '东亚', voltage: '220V', frequency: '50Hz', plugs: ['I', 'A'] },
  { country: '中国香港', region: '东亚', voltage: '220V', frequency: '50Hz', plugs: ['G', 'D', 'M'] },
  { country: '中国台湾', region: '东亚', voltage: '110V', frequency: '60Hz', plugs: ['A', 'B'] },
  { country: '日本', region: '东亚', voltage: '100V', frequency: '50/60Hz', plugs: ['A', 'B'] },
  { country: '韩国', region: '东亚', voltage: '220V', frequency: '60Hz', plugs: ['C', 'E', 'F', 'SE'] },
  { country: '越南', region: '东南亚', voltage: '220V', frequency: '50Hz', plugs: ['A', 'C', 'D'] },
  { country: '泰国', region: '东南亚', voltage: '220V', frequency: '50Hz', plugs: ['A', 'B', 'C', 'O'] },
  { country: '马来西亚', region: '东南亚', voltage: '240V', frequency: '50Hz', plugs: ['G'] },
  { country: '新加坡', region: '东南亚', voltage: '230V', frequency: '50Hz', plugs: ['G'] },
  { country: '印度尼西亚', region: '东南亚', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F', 'G'] },
  { country: '菲律宾', region: '东南亚', voltage: '220V', frequency: '60Hz', plugs: ['A', 'B', 'C'] },
  { country: '印度', region: '南亚', voltage: '230V', frequency: '50Hz', plugs: ['C', 'D', 'M'] },
  { country: '巴基斯坦', region: '南亚', voltage: '230V', frequency: '50Hz', plugs: ['C', 'D'] },
  { country: '孟加拉国', region: '南亚', voltage: '220V', frequency: '50Hz', plugs: ['C', 'D', 'G', 'K'] },
  { country: '阿联酋', region: '中东', voltage: '230V', frequency: '50Hz', plugs: ['G'] },
  { country: '沙特阿拉伯', region: '中东', voltage: '230V', frequency: '60Hz', plugs: ['G'] },
  { country: '土耳其', region: '中东', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '以色列', region: '中东', voltage: '230V', frequency: '50Hz', plugs: ['C', 'H', 'M'] },
  { country: '英国', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['G'] },
  { country: '德国', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '法国', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'E'] },
  { country: '意大利', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F', 'L'] },
  { country: '西班牙', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '荷兰', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '波兰', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'E'] },
  { country: '俄罗斯', region: '欧洲', voltage: '220V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '乌克兰', region: '欧洲', voltage: '230V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '美国', region: '北美', voltage: '120V', frequency: '60Hz', plugs: ['A', 'B'] },
  { country: '加拿大', region: '北美', voltage: '120V', frequency: '60Hz', plugs: ['A', 'B'] },
  { country: '墨西哥', region: '北美', voltage: '127V', frequency: '60Hz', plugs: ['A', 'B'] },
  { country: '巴西', region: '南美', voltage: '127/220V', frequency: '60Hz', plugs: ['C', 'N'] },
  { country: '阿根廷', region: '南美', voltage: '220V', frequency: '50Hz', plugs: ['C', 'I'] },
  { country: '智利', region: '南美', voltage: '220V', frequency: '50Hz', plugs: ['C', 'L'] },
  { country: '哥伦比亚', region: '南美', voltage: '110V', frequency: '60Hz', plugs: ['A', 'B'] },
  { country: '秘鲁', region: '南美', voltage: '220V', frequency: '60Hz', plugs: ['A', 'C'] },
  { country: '澳大利亚', region: '大洋洲', voltage: '230V', frequency: '50Hz', plugs: ['I'] },
  { country: '新西兰', region: '大洋洲', voltage: '230V', frequency: '50Hz', plugs: ['I'] },
  { country: '埃及', region: '非洲', voltage: '220V', frequency: '50Hz', plugs: ['C', 'F'] },
  { country: '南非', region: '非洲', voltage: '230V', frequency: '50Hz', plugs: ['M', 'N', 'C'] },
  { country: '尼日利亚', region: '非洲', voltage: '230V', frequency: '50Hz', plugs: ['D', 'G'] },
  { country: '肯尼亚', region: '非洲', voltage: '240V', frequency: '50Hz', plugs: ['G'] },
  { country: '摩洛哥', region: '非洲', voltage: '127/220V', frequency: '50Hz', plugs: ['C', 'E'] },
]

/** 常见插头类型说明，用于表格尾部图例 */
export const PLUG_TYPE_NOTES: Record<string, string> = {
  A: '两脚扁型（美标）',
  B: '三脚扁型（美标带地线）',
  C: '两脚圆型（欧标）',
  D: '三脚三角（印度旧标）',
  E: '两圆脚带孔（法标）',
  F: '两圆脚夹片（德标 Schuko）',
  G: '三方脚（英标）',
  H: '三圆脚（以色列）',
  I: '八字扁脚（中/澳标）',
  K: '丹麦标',
  L: '三圆排（意标）',
  M: '大三角（南非旧标）',
  N: '两圆+地（巴西/南非 IEC 60906）',
  O: '泰标（兼容 B/C）',
  SE: '韩标安全加强型',
}

/** 按国家名或区域关键词过滤，大小写不敏感 */
export function filterEntries(entries: VoltagePlugEntry[], keyword: string): VoltagePlugEntry[] {
  const query = keyword.trim().toLowerCase()
  if (!query) return entries
  return entries.filter((entry) =>
    [entry.country, entry.region, entry.voltage, entry.frequency, entry.plugs.join('/')]
      .join(' ')
      .toLowerCase()
      .includes(query)
  )
}
