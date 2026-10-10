// 名称: 装箱单计算逻辑
// 描述: 汇总明细行的箱数、数量、毛净重与体积，解析 Excel 粘贴表格并生成导出数据
// 路径: Globokit/lib/tools/packing-list-generator.ts
// 作者: everettlabs
// 更新时间: 2026-10-10

export interface PackingLineInput {
  id: string
  description: string
  cartons: number
  qtyPerCarton: number
  unit: string
  gwPerCarton: number
  nwPerCarton: number
  /** 每箱尺寸，格式 长×宽×高（cm），如 60x40x40 */
  dimensions: string
}

export interface PackingLineTotal extends PackingLineInput {
  qtyTotal: number
  gwTotal: number
  nwTotal: number
  cbm: number
  dimensionsLabel: string
}

export interface PackingListTotals {
  lines: PackingLineTotal[]
  totalCartons: number
  totalQty: number
  totalGw: number
  totalNw: number
  totalCbm: number
  lineCount: number
}

export const MAX_PACKING_LINES = 40

function toCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100)
}

function fromCents(cents: number): number {
  return cents / 100
}

function round6(value: number): number {
  return Math.round((value + Number.EPSILON) * 1e6) / 1e6
}

export function parseDimensions(raw: string): { length: number; width: number; height: number } | null {
  const match = raw.trim().match(/^(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)$/)
  if (!match) return null
  const length = Number.parseFloat(match[1])
  const width = Number.parseFloat(match[2])
  const height = Number.parseFloat(match[3])
  if (![length, width, height].every((value) => Number.isFinite(value) && value > 0 && value <= 500)) return null
  return { length, width, height }
}

/**
 * 解析从 Excel/表格复制的粘贴文本（TAB 分隔，一行一条）。
 * 列序：品名、箱数、每箱数量、单位、每箱毛重、每箱净重、尺寸(长x宽x高)。
 * 至少需要品名、箱数、每箱数量三列，其余缺失按 0 或 PCS 处理。
 */
export function parsePastedLines(text: string): Array<Omit<PackingLineInput, 'id'>> {
  const rows = text.split(/\r?\n/).map((row) => row.trim()).filter((row) => row.length > 0)
  const lines: Array<Omit<PackingLineInput, 'id'>> = []
  for (const row of rows) {
    const cells = row.split(/\t|,|,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((cell) => cell.trim().replace(/^"|"$/g, ''))
    if (cells.length < 3) throw new Error(`粘贴内容每行至少需要 3 列（品名、箱数、每箱数量），遇到：${row.slice(0, 40)}`)
    const description = cells[0]
    const cartons = Number.parseFloat(cells[1])
    const qtyPerCarton = Number.parseFloat(cells[2])
    if (!description) throw new Error('粘贴内容存在品名为空的行')
    if (!Number.isFinite(cartons) || cartons <= 0) throw new Error(`「${description}」的箱数必须大于 0`)
    if (!Number.isFinite(qtyPerCarton) || qtyPerCarton <= 0) throw new Error(`「${description}」的每箱数量必须大于 0`)
    lines.push({
      description,
      cartons: Math.round(cartons),
      qtyPerCarton,
      unit: cells[3] || 'PCS',
      gwPerCarton: Number.parseFloat(cells[4]) || 0,
      nwPerCarton: Number.parseFloat(cells[5]) || 0,
      dimensions: cells[6] || '',
    })
  }
  if (lines.length === 0) throw new Error('粘贴内容为空')
  if (lines.length > MAX_PACKING_LINES) throw new Error(`一次最多导入 ${MAX_PACKING_LINES} 行`)
  return lines
}

export function normalizePackingLines(rawLines: PackingLineInput[]): PackingLineInput[] {
  return rawLines
    .map((line) => ({ ...line, description: line.description.trim(), unit: line.unit.trim() || 'PCS', dimensions: line.dimensions.trim() }))
    .filter((line) => line.description.length > 0 && line.cartons > 0)
}

export function calculatePackingList(rawLines: PackingLineInput[]): PackingListTotals {
  const lines = normalizePackingLines(rawLines)
  if (lines.length === 0) throw new Error('至少需要一行有效明细（品名非空且箱数大于 0）')
  if (lines.length > MAX_PACKING_LINES) throw new Error(`明细行数不能超过 ${MAX_PACKING_LINES} 行`)

  const totals = lines.map((line) => {
    if (!Number.isInteger(line.cartons) || line.cartons <= 0 || line.cartons > 100000) {
      throw new Error(`明细「${line.description}」的箱数必须是大于 0 的整数`)
    }
    if (!Number.isFinite(line.qtyPerCarton) || line.qtyPerCarton <= 0) {
      throw new Error(`明细「${line.description}」的每箱数量必须大于 0`)
    }
    if (line.gwPerCarton < 0 || line.nwPerCarton < 0 || !Number.isFinite(line.gwPerCarton) || !Number.isFinite(line.nwPerCarton)) {
      throw new Error(`明细「${line.description}」的重量不能为负`)
    }
    if (line.nwPerCarton > 0 && line.gwPerCarton > 0 && line.nwPerCarton > line.gwPerCarton) {
      throw new Error(`明细「${line.description}」的净重不能大于毛重`)
    }
    const dims = line.dimensions ? parseDimensions(line.dimensions) : null
    if (line.dimensions && !dims) {
      throw new Error(`明细「${line.description}」的尺寸格式应为 长×宽×高，如 60x40x40`)
    }
    const cbm = dims ? round6((line.cartons * dims.length * dims.width * dims.height) / 1_000_000) : 0
    return {
      ...line,
      qtyTotal: fromCents(toCents(line.cartons * line.qtyPerCarton)),
      gwTotal: fromCents(toCents(line.cartons * line.gwPerCarton)),
      nwTotal: fromCents(toCents(line.cartons * line.nwPerCarton)),
      cbm,
      dimensionsLabel: dims ? `${dims.length}x${dims.width}x${dims.height} cm` : '',
    }
  })

  return {
    lines: totals,
    totalCartons: totals.reduce((sum, line) => sum + line.cartons, 0),
    totalQty: fromCents(totals.reduce((sum, line) => sum + toCents(line.qtyTotal), 0)),
    totalGw: fromCents(totals.reduce((sum, line) => sum + toCents(line.gwTotal), 0)),
    totalNw: fromCents(totals.reduce((sum, line) => sum + toCents(line.nwTotal), 0)),
    totalCbm: round6(totals.reduce((sum, line) => sum + line.cbm, 0)),
    lineCount: totals.length,
  }
}

export function buildPackingListPlainText(totals: PackingListTotals, header: { exporter: string; consignee: string; invoiceNo: string; date: string }): string {
  const rows = totals.lines.map((line, index) =>
    `${String(index + 1).padStart(2, ' ')}. ${line.description} | ${line.cartons} CTNS x ${line.qtyPerCarton} ${line.unit} = ${line.qtyTotal.toLocaleString('en-US')} ${line.unit} | GW ${line.gwTotal.toLocaleString('en-US')} KG | NW ${line.nwTotal.toLocaleString('en-US')} KG${line.dimensionsLabel ? ` | ${line.dimensionsLabel}` : ''}`
  )
  return [
    'PACKING LIST',
    `INVOICE NO.: ${header.invoiceNo}    DATE: ${header.date}`,
    `EXPORTER: ${header.exporter}`,
    `CONSIGNEE: ${header.consignee}`,
    '',
    ...rows,
    '',
    `TOTAL: ${totals.totalCartons} CTNS, ${totals.totalQty.toLocaleString('en-US')} PCS`,
    `GROSS WEIGHT: ${totals.totalGw.toLocaleString('en-US')} KG`,
    `NET WEIGHT: ${totals.totalNw.toLocaleString('en-US')} KG`,
    `TOTAL VOLUME: ${totals.totalCbm.toLocaleString('en-US', { maximumFractionDigits: 4 })} CBM`,
  ].join('\n')
}

/** 生成带 BOM 的 CSV 内容，Excel 直接打开中文不乱码。 */
export function buildPackingListCsv(totals: PackingListTotals): string {
  const escape = (value: string | number): string => {
    const text = String(value)
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const rows: Array<Array<string | number>> = [
    ['No.', 'Description', 'Cartons', 'Qty/Carton', 'Unit', 'Total Qty', 'GW/Carton (KG)', 'Total GW (KG)', 'NW/Carton (KG)', 'Total NW (KG)', 'Dimensions (cm)', 'CBM'],
    ...totals.lines.map((line, index) => [
      index + 1, line.description, line.cartons, line.qtyPerCarton, line.unit, line.qtyTotal,
      line.gwPerCarton, line.gwTotal, line.nwPerCarton, line.nwTotal, line.dimensionsLabel, line.cbm,
    ]),
    ['', 'TOTAL', totals.totalCartons, '', '', totals.totalQty, '', totals.totalGw, '', totals.totalNw, '', totals.totalCbm],
  ]
  return '\uFEFF' + rows.map((row) => row.map(escape).join(',')).join('\r\n')
}
