// 名称: 国际条码生成器核心配置
// 描述: 定义条码格式、示例及 GS1/数字型条码输入规范化规则
// 路径: Globokit/lib/tools/barcode-generator.ts
// 作者: wwj
// 更新时间: 2026-07-15

export const BARCODE_FORMAT_IDS = [
  'gs1datamatrix',
  'gs1-128',
  'qrcode',
  'datamatrix',
  'code128',
  'code39',
  'ean13',
  'ean8',
  'upca',
  'itf14',
  'isbn13',
] as const

export type BarcodeFormatId = (typeof BARCODE_FORMAT_IDS)[number]
export type BarcodeScale = 2 | 3 | 4

export interface BarcodeFormat {
  id: BarcodeFormatId
  label: string
  description: string
  bcid: string
  example: string
  placeholder: string
  isGs1: boolean
  is2D: boolean
  numericOnly?: boolean
}

export interface PreparedBarcode {
  encodedText: string
  displayText: string
}

export interface BarcodeRenderRequest extends PreparedBarcode {
  formatId: BarcodeFormatId
  scale: BarcodeScale
  revision: number
}

export const BARCODE_FORMATS: BarcodeFormat[] = [
  {
    id: 'gs1datamatrix', label: 'GS1 DataMatrix', bcid: 'gs1datamatrix', isGs1: true, is2D: true,
    description: 'GS1 AI 元素串、首位 FNC1 与 Data Matrix ECC 200',
    example: '0126976244651064173106291020260630303000',
    placeholder: '推荐：(01)26976244651064(17)310629(10)20260630303000',
  },
  {
    id: 'gs1-128', label: 'GS1-128', bcid: 'gs1-128', isGs1: true, is2D: false,
    description: '物流标签常用的一维 GS1 应用标识符条码',
    example: '(00)123456789012345675', placeholder: '例如：(00)123456789012345675',
  },
  {
    id: 'qrcode', label: 'QR Code', bcid: 'qrcode', isGs1: false, is2D: true,
    description: '网址、文本和移动端扫码场景', example: 'https://globokit.com',
    placeholder: '输入网址或文本',
  },
  {
    id: 'datamatrix', label: 'Data Matrix ECC 200', bcid: 'datamatrix', isGs1: false, is2D: true,
    description: '零件、单据和小面积标识，不自动加入 GS1 FNC1',
    example: 'PO-2026-0630|SKU-A1024|QTY-48', placeholder: '输入普通 Data Matrix 数据',
  },
  {
    id: 'code128', label: 'Code 128', bcid: 'code128', isGs1: false, is2D: false,
    description: '高密度字母数字编码', example: 'PO-20260714-0001', placeholder: '输入字母、数字或符号',
  },
  {
    id: 'code39', label: 'Code 39', bcid: 'code39', isGs1: false, is2D: false,
    description: '工业、资产和内部料号标识', example: 'SKU-A1024', placeholder: '输入大写字母、数字及 -.$/+% 空格',
  },
  {
    id: 'ean13', label: 'EAN-13 / GTIN-13', bcid: 'ean13', isGs1: false, is2D: false, numericOnly: true,
    description: '全球零售商品常用的 13 位条码', example: '4006381333931', placeholder: '输入 12 位数据或完整 13 位 GTIN',
  },
  {
    id: 'ean8', label: 'EAN-8 / GTIN-8', bcid: 'ean8', isGs1: false, is2D: false, numericOnly: true,
    description: '小包装商品使用的 8 位零售条码', example: '96385074', placeholder: '输入 7 位数据或完整 8 位 GTIN',
  },
  {
    id: 'upca', label: 'UPC-A / GTIN-12', bcid: 'upca', isGs1: false, is2D: false, numericOnly: true,
    description: '北美零售常用的 12 位条码', example: '036000291452', placeholder: '输入 11 位数据或完整 12 位 GTIN',
  },
  {
    id: 'itf14', label: 'ITF-14 / GTIN-14', bcid: 'itf14', isGs1: false, is2D: false, numericOnly: true,
    description: '外箱和非零售物流包装标识', example: '10012345000017', placeholder: '输入 13 位数据或完整 14 位 GTIN',
  },
  {
    id: 'isbn13', label: 'ISBN-13', bcid: 'ean13', isGs1: false, is2D: false, numericOnly: true,
    description: '978/979 开头的图书编号 EAN-13 表示', example: '9781565812314', placeholder: '输入 12 位数据或完整 13 位 ISBN',
  },
]

const FIXED_AI_LENGTHS: Record<string, number> = {
  '00': 18, '01': 14, '02': 14, '03': 14,
  '11': 6, '12': 6, '13': 6, '15': 6, '16': 6, '17': 6, '20': 2,
  '410': 13, '411': 13, '412': 13, '413': 13, '414': 13, '415': 13, '416': 13, '417': 13,
  '422': 3, '424': 3, '425': 3, '426': 3, '7001': 13, '7003': 10,
  '8001': 14, '8005': 6, '8006': 18, '8017': 18, '8018': 18,
}

const VARIABLE_AI_MAX_LENGTHS: Record<string, number> = {
  '10': 20, '21': 20, '22': 20, '235': 28, '240': 30, '241': 30, '242': 6,
  '243': 20, '250': 30, '251': 30, '254': 20, '30': 8, '37': 8,
  '400': 30, '401': 30, '403': 30, '420': 20, '421': 12, '423': 15, '427': 3,
  '7002': 30, '8002': 20, '8003': 30, '8004': 30, '8007': 34, '8008': 12,
  '8010': 30, '8011': 12, '8019': 10, '8020': 25, '8112': 70, '8200': 70,
}

const EXACT_AI_KEYS = [...Object.keys(FIXED_AI_LENGTHS), ...Object.keys(VARIABLE_AI_MAX_LENGTHS)]
  .sort((left, right) => right.length - left.length)
const GROUP_SEPARATOR = '\u001d'

function resolveAiRule(source: string) {
  const exact = EXACT_AI_KEYS.find((ai) => source.startsWith(ai))
  if (exact) {
    const fixedLength = FIXED_AI_LENGTHS[exact]
    return { ai: exact, fixedLength, maxLength: fixedLength ?? VARIABLE_AI_MAX_LENGTHS[exact] }
  }

  const ai4 = source.slice(0, 4)
  if (/^3[1-3]\d\d$/.test(ai4) || /^394\d$/.test(ai4) || /^395\d$/.test(ai4)) {
    return { ai: ai4, fixedLength: /^394\d$/.test(ai4) ? 4 : 6, maxLength: 6 }
  }
  if (/^39[0-3]\d$/.test(ai4) || /^703\d$/.test(ai4) || /^723\d$/.test(ai4)) {
    return { ai: ai4, fixedLength: undefined, maxLength: 30 }
  }
  const ai2 = source.slice(0, 2)
  if (/^9\d$/.test(ai2)) return { ai: ai2, fixedLength: undefined, maxLength: 90 }

  return undefined
}

function normalizeGs1Input(input: string) {
  const source = input
    .trim()
    .replace(/^\]C1|^\]d2/i, '')
    .replace(/\\F|\^FNC1|<GS>/gi, GROUP_SEPARATOR)
    .replace(new RegExp(`^${GROUP_SEPARATOR}`), '')

  if (source.startsWith('(')) return source.replaceAll(GROUP_SEPARATOR, '')

  let cursor = 0
  const elements: string[] = []
  while (cursor < source.length) {
    if (source[cursor] === GROUP_SEPARATOR) {
      cursor += 1
      continue
    }

    const rule = resolveAiRule(source.slice(cursor))
    if (!rule) {
      throw new Error(`无法从第 ${cursor + 1} 位识别 GS1 应用标识符，请改用 (AI)数据 格式`)
    }
    cursor += rule.ai.length

    const separatorIndex = source.indexOf(GROUP_SEPARATOR, cursor)
    const dataEnd = rule.fixedLength
      ? cursor + rule.fixedLength
      : separatorIndex >= 0 ? separatorIndex : source.length
    const value = source.slice(cursor, dataEnd)
    if (!value || value.length > rule.maxLength || (rule.fixedLength && value.length !== rule.fixedLength)) {
      throw new Error(`AI (${rule.ai}) 的数据长度不符合要求`)
    }
    elements.push(`(${rule.ai})${value}`)
    cursor = dataEnd
  }

  return elements.join('')
}

function normalizeNumeric(input: string, lengths: number[], label: string) {
  const value = input.replace(/[\s-]/g, '')
  if (!/^\d+$/.test(value) || !lengths.includes(value.length)) {
    throw new Error(`${label} 仅支持 ${lengths.join(' 或 ')} 位数字`)
  }
  return value
}

export function getBarcodeFormat(id: BarcodeFormatId) {
  return BARCODE_FORMATS.find((format) => format.id === id) ?? BARCODE_FORMATS[0]
}

export function prepareBarcodeData(formatId: BarcodeFormatId, input: string): PreparedBarcode {
  if (!input.trim()) throw new Error('请输入需要编码的数据')

  if (formatId === 'gs1datamatrix' || formatId === 'gs1-128') {
    const value = normalizeGs1Input(input)
    return { encodedText: value, displayText: value }
  }
  if (formatId === 'ean13') {
    const value = normalizeNumeric(input, [12, 13], 'EAN-13')
    return { encodedText: value, displayText: value }
  }
  if (formatId === 'ean8') {
    const value = normalizeNumeric(input, [7, 8], 'EAN-8')
    return { encodedText: value, displayText: value }
  }
  if (formatId === 'upca') {
    const value = normalizeNumeric(input, [11, 12], 'UPC-A')
    return { encodedText: value, displayText: value }
  }
  if (formatId === 'itf14') {
    const value = normalizeNumeric(input, [13, 14], 'ITF-14')
    return { encodedText: value, displayText: value }
  }
  if (formatId === 'isbn13') {
    const value = normalizeNumeric(input, [12, 13], 'ISBN-13')
    if (!value.startsWith('978') && !value.startsWith('979')) throw new Error('ISBN-13 必须以 978 或 979 开头')
    return { encodedText: value, displayText: value }
  }
  if (formatId === 'code39' && !/^[0-9A-Z .\-$/+%]+$/.test(input.trim())) {
    throw new Error('Code 39 仅支持大写字母、数字、空格及 - . $ / + %')
  }

  const value = input.trim()
  return { encodedText: value, displayText: value }
}

export function formatBarcodeError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  if (/GS1badChecksum|badCheckDigit|incorrect check digit|Bad checksum/i.test(message)) return '校验位错误，请核对 GS1 标识键或商品编号'
  if (/GS1badMonth|GS1badDay|invalid (month|day|date)/i.test(message)) return 'GS1 日期无效，请按 YYMMDD 输入真实日期'
  if (/GS1valueTooShort|GS1valueTooLong|too short|too long/i.test(message)) return '数据长度不符合所选条码或应用标识符要求'
  if (/GS1missingAIs|requisite AIs/i.test(message)) return 'GS1 应用标识符组合不完整，请补充必需的主标识符（通常为 AI 01）'
  return `无法生成条码：${message.replace(/^Error:\s*/, '')}`
}
