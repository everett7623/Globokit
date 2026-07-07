// 名称: 工具注册表
// 描述: 集中管理所有工具的元数据，作为导航、首页、SEO 和结构化数据的单一数据源
// 路径: Globokit/lib/tools/registry.ts
// 作者: Jensfrank
// 更新时间: 2026-01-12

/**
 * Tool category union type — fixed set of categories.
 * Categories with zero associated tools are valid in the type
 * but will not appear in user-facing navigation or filtering.
 */
export type ToolCategory =
  | '财务报价'
  | '文本处理'
  | '时间与节假日'
  | '国家与货币'
  | '物流与装柜'
  | 'VPS/站长工具'
  | '外贸沟通'
  | '文件与格式转换'

/**
 * Metadata for a single tool in the registry.
 * All required fields must be present — TypeScript strict mode
 * will report a compile error if any are missing.
 */
export interface ToolMeta {
  /** Unique identifier */
  id: string
  /** URL path segment under /tools/ */
  slug: string
  /** Full display title (max 60 chars for SEO) */
  title: string
  /** Short title for nav items */
  shortTitle: string
  /** Tool description (max 160 chars for SEO) */
  description: string
  /** Classification category */
  category: ToolCategory
  /** lucide-react icon name string */
  iconName: string
  /** Full href path e.g. /tools/rmb-converter */
  href: string
  /** Last content update date ISO string */
  updatedAt: string
  /** Optional badge text e.g. "热门", "新增" */
  badge?: string
  /** Search keywords for nav search */
  keywords?: string[]
  /** SEO page title override */
  seoTitle?: string
  /** SEO meta description override */
  seoDescription?: string
  /** Use case descriptions for FAQ/structured data */
  useCases?: string[]
  /** IDs of related tools */
  relatedTools?: string[]
}

/**
 * The single source of truth for all tool metadata.
 * Adding a tool here automatically includes it in navigation,
 * homepage grid, sitemap, and structured data upon next build.
 */
export const TOOL_REGISTRY: ToolMeta[] = [
  {
    id: 'rmb-converter',
    slug: 'rmb-converter',
    title: '人民币大写转换',
    shortTitle: '人民币大写',
    description: '将数字金额转换为中文大写形式，适用于发票、合同等正式文件',
    category: '财务报价',
    iconName: 'Calculator',
    href: '/tools/rmb-converter',
    updatedAt: '2026-01-08',
    badge: '热门',
    keywords: ['rmb', '人民币', '大写', '金额', '发票', '合同'],
    seoTitle: '人民币大写转换 - 在线数字转中文大写 | Globokit',
    seoDescription: '免费在线人民币大写转换工具，将数字金额转换为中文大写形式，适用于发票合同等正式文件',
    useCases: ['开具发票', '填写合同', '财务报销单'],
    relatedTools: ['number-to-english', 'currency-symbols', 'quote-calculator'],
  },
  {
    id: 'number-to-english',
    slug: 'number-to-english',
    title: '数字转英文',
    shortTitle: '数字转英文',
    description: '将数字转换为英文表达形式，支持基数词和序数词',
    category: '财务报价',
    iconName: 'Hash',
    href: '/tools/number-to-english',
    updatedAt: '2026-01-08',
    keywords: ['number', 'english', '数字', '英文', '基数词', '序数词'],
    seoTitle: '数字转英文 - 在线数字英文转换 | Globokit',
    seoDescription: '免费在线数字转英文工具，将数字转换为英文表达形式，支持基数词和序数词转换',
    useCases: ['外贸合同金额', '英文支票填写', '商务邮件数字表达'],
    relatedTools: ['rmb-converter', 'currency-symbols'],
  },
  {
    id: 'currency-symbols',
    slug: 'currency-symbols',
    title: '全球货币符号大全',
    shortTitle: '货币符号',
    description: '查看和复制全球货币符号，覆盖国家资料库中的常用和长尾货币',
    category: '财务报价',
    iconName: 'CircleDollarSign',
    href: '/tools/currency-symbols',
    updatedAt: '2026-07-06',
    keywords: ['currency', '货币', '符号', '外贸', '报价', '汇率'],
    seoTitle: '全球货币符号大全 - 一键复制货币符号 | Globokit',
    seoDescription: '查看和复制全球货币符号，涵盖主要贸易国家和长尾国家货币，便于外贸报价和合同编写',
    useCases: ['外贸报价单', '合同编写', '邮件中引用货币'],
    relatedTools: ['rmb-converter', 'number-to-english', 'global-country-info', 'quote-calculator'],
  },
  {
    id: 'quote-calculator',
    slug: 'quote-calculator',
    title: '外贸报价利润计算器',
    shortTitle: '报价利润',
    description: '按成本、运费、汇率和利润率测算外贸报价与毛利',
    category: '财务报价',
    iconName: 'ReceiptText',
    href: '/tools/quote-calculator',
    updatedAt: '2026-07-06',
    badge: '新增',
    keywords: ['quote', 'quotation', '报价', '利润', 'FOB', 'CIF', '汇率', '外贸'],
    seoTitle: '外贸报价利润计算器 - FOB/CIF 报价测算 | Globokit',
    seoDescription: '免费在线外贸报价利润计算器，支持采购成本、运费、佣金、汇率和目标利润率测算，快速反推出 FOB/CIF 报价',
    useCases: ['外贸报价核算', '订单利润测算', 'FOB/CIF 价格评估'],
    relatedTools: ['currency-symbols', 'container-load-calculator', 'air-freight-calculator', 'incoterms'],
  },
  {
    id: 'container-load-calculator',
    slug: 'container-load-calculator',
    title: '装柜/箱规计算器',
    shortTitle: '装柜计算',
    description: '按纸箱尺寸、毛重、数量和柜型估算整柜装载数量、柜数与利用率',
    category: '物流与装柜',
    iconName: 'Container',
    href: '/tools/container-load-calculator',
    updatedAt: '2026-07-06',
    badge: '新增',
    keywords: ['container', '装柜', '箱规', 'CBM', '柜型', '物流', '20GP', '40HQ'],
    seoTitle: '装柜/箱规计算器 - 纸箱 CBM 与整柜装载估算 | Globokit',
    seoDescription: '免费在线装柜/箱规计算器，按纸箱尺寸、毛重、箱数和 20GP/40GP/40HQ/45HQ 柜型估算装载数量、柜数和利用率',
    useCases: ['报价前估算装柜量', '核对纸箱 CBM', '评估整柜数量和载重限制'],
    relatedTools: ['quote-calculator', 'air-freight-calculator', 'incoterms', 'currency-symbols'],
  },
  {
    id: 'air-freight-calculator',
    slug: 'air-freight-calculator',
    title: '空运/快递计费重计算器',
    shortTitle: '空运计费重',
    description: '按箱规、实重、泡重系数和运价测算空运快递计费重量与费用',
    category: '物流与装柜',
    iconName: 'Plane',
    href: '/tools/air-freight-calculator',
    updatedAt: '2026-07-07',
    badge: '新增',
    keywords: ['air freight', 'express', '空运', '快递', '计费重', '泡重', '体积重', 'DHL', 'FedEx', 'UPS'],
    seoTitle: '空运/快递计费重计算器 - 泡重体积重费用测算 | Globokit',
    seoDescription: '免费在线空运/快递计费重计算器，按纸箱尺寸、实重、泡重系数、每公斤运价、燃油附加和操作费估算计费重量与费用',
    useCases: ['空运快递报价核算', '判断实重或体积重计费', '比较不同泡重系数费用'],
    relatedTools: ['container-load-calculator', 'quote-calculator', 'incoterms', 'currency-symbols'],
  },
  {
    id: 'text-case',
    slug: 'text-case',
    title: '英文大小写转换',
    shortTitle: '大小写转换',
    description: '快速转换英文文本的大小写格式，支持多种转换模式',
    category: '文本处理',
    iconName: 'Type',
    href: '/tools/text-case',
    updatedAt: '2026-01-13',
    keywords: ['text', 'case', '大小写', '英文', '转换', 'uppercase', 'lowercase'],
    seoTitle: '英文大小写转换 - 在线文本格式转换 | Globokit',
    seoDescription: '免费在线英文大小写转换工具，支持全大写、全小写、首字母大写等多种转换模式',
    useCases: ['邮件标题格式化', '产品名称规范', '代码变量命名'],
    relatedTools: ['pinyin', 'special-char'],
  },
  {
    id: 'pinyin',
    slug: 'pinyin',
    title: '中文转拼音',
    shortTitle: '中文转拼音',
    description: '将中文文本转换为汉语拼音，支持声调和多种格式',
    category: '文本处理',
    iconName: 'Languages',
    href: '/tools/pinyin',
    updatedAt: '2026-01-08',
    keywords: ['pinyin', '拼音', '中文', '汉语', '声调', '转换'],
    seoTitle: '中文转拼音 - 在线汉字拼音转换 | Globokit',
    seoDescription: '免费在线中文转拼音工具，将中文文本转换为汉语拼音，支持声调标注和多种输出格式',
    useCases: ['客户姓名拼音标注', '产品名称国际化', '地址拼音转写'],
    relatedTools: ['text-case', 'special-char'],
  },
  {
    id: 'special-char',
    slug: 'special-char',
    title: '特殊字符检查与转换',
    shortTitle: '特殊字符',
    description: '检查并转换文本中的特殊字符，避免邮件或文档中的乱码',
    category: '文本处理',
    iconName: 'AlertCircle',
    href: '/tools/special-char',
    updatedAt: '2026-01-08',
    keywords: ['special', 'character', '特殊字符', '乱码', '编码', '转换'],
    seoTitle: '特殊字符检查与转换 - 在线字符检测 | Globokit',
    seoDescription: '免费在线特殊字符检查与转换工具，检测并转换文本中的特殊字符，避免邮件或文档乱码',
    useCases: ['邮件内容检查', '文档格式清理', '代码字符排查'],
    relatedTools: ['text-case', 'pinyin'],
  },
  {
    id: 'world-time',
    slug: 'world-time',
    title: '世界时间',
    shortTitle: '世界时间',
    description: '查看全球主要贸易城市和各国首都实时时间，便于安排国际业务',
    category: '时间与节假日',
    iconName: 'Clock',
    href: '/tools/world-time',
    updatedAt: '2026-07-06',
    keywords: ['time', '时间', '时区', '世界', '城市', 'UTC', '时差'],
    seoTitle: '世界时间 - 全球城市实时时钟 | Globokit',
    seoDescription: '免费在线世界时间工具，查看全球主要贸易城市和各国首都实时时间，便于安排国际业务沟通',
    useCases: ['安排国际电话会议', '计算时差', '确认客户工作时间'],
    relatedTools: ['holiday-query', 'global-country-info'],
  },
  {
    id: 'holiday-query',
    slug: 'holiday-query',
    title: '国际节假日查询',
    shortTitle: '节假日查询',
    description: '查询全球国家目录和主要贸易国家节假日安排，便于外贸业务安排',
    category: '时间与节假日',
    iconName: 'Calendar',
    href: '/tools/holiday-query',
    updatedAt: '2026-07-06',
    keywords: ['holiday', '节假日', '假期', '贸易', '国际', '日历'],
    seoTitle: '国际节假日查询 - 全球贸易国节假日 | Globokit',
    seoDescription: '免费在线国际节假日查询工具，查询全球国家目录和主要贸易国家节假日安排，便于外贸业务规划',
    useCases: ['规避节假日发货', '安排拜访客户时间', '制定年度贸易计划'],
    relatedTools: ['world-time', 'global-country-info'],
  },
  {
    id: 'global-country-info',
    slug: 'global-country-info',
    title: '全球国家信息查询',
    shortTitle: '国家信息',
    description: '查询世界各国的中英文名称、区号、代码、时区、域名等信息',
    category: '国家与货币',
    iconName: 'Globe',
    href: '/tools/global-country-info',
    updatedAt: '2026-07-06',
    keywords: ['country', '国家', '区号', '代码', '时区', '域名', 'ISO'],
    seoTitle: '全球国家信息查询 - 各国区号代码时区 | Globokit',
    seoDescription: '免费在线全球国家信息查询，查询世界各国中英文名称、国际区号、ISO代码、时区等信息',
    useCases: ['查询客户国家区号', '确认国家代码', '了解目标市场基本信息'],
    relatedTools: ['world-time', 'holiday-query', 'currency-symbols'],
  },
  {
    id: 'vps-calculator',
    slug: 'vps-calculator',
    title: 'VPS剩余价值计算器',
    shortTitle: 'VPS计算器',
    description: '基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换',
    category: 'VPS/站长工具',
    iconName: 'Server',
    href: '/tools/vps-calculator',
    updatedAt: '2026-03-16',
    keywords: ['vps', '服务器', '剩余价值', '计算器', '站长', '主机'],
    seoTitle: 'VPS剩余价值计算器 - 精确计算VPS残值 | Globokit',
    seoDescription: '免费在线VPS剩余价值计算器，基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换',
    useCases: ['VPS转让定价', '续费决策参考', '多台VPS价值对比'],
    relatedTools: [],
  },
  {
    id: 'incoterms',
    slug: 'incoterms',
    title: '国际贸易术语速查',
    shortTitle: '贸易术语',
    description: '快速查询 Incoterms 2020 条款，明确风险转移点与费用责任边界',
    category: '外贸沟通',
    iconName: 'FileSearch',
    href: '/tools/incoterms',
    updatedAt: '2026-06-30',
    badge: '新增',
    keywords: ['incoterms', '贸易术语', 'FOB', 'CIF', 'DDP', 'EXW'],
    seoTitle: '国际贸易术语速查 - Incoterms 2020 在线查询 | Globokit',
    seoDescription: '免费在线 Incoterms 2020 术语速查工具，快速查看 FOB/CIF/DDP 等条款的风险与费用责任划分',
    useCases: ['报价条款确认', '合同条款核对', '新业务员培训'],
    relatedTools: ['container-load-calculator', 'air-freight-calculator', 'quote-calculator', 'holiday-query', 'world-time'],
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON 格式化与转换',
    shortTitle: 'JSON 工具',
    description: '验证、格式化、压缩 JSON，支持与 CSV 互相转换，便于数据处理',
    category: '文件与格式转换',
    iconName: 'Code2',
    href: '/tools/json-formatter',
    updatedAt: '2026-07-01',
    badge: '新增',
    keywords: ['json', 'format', '格式化', '压缩', 'csv', '转换', '验证'],
    seoTitle: 'JSON 格式化与转换 - 在线 JSON 编辑工具 | Globokit',
    seoDescription: '免费在线 JSON 格式化工具，支持验证、压缩、转换为 CSV 及数据处理，适合开发和数据分析',
    useCases: ['API 数据处理', 'Excel 数据导入', '前端开发调试'],
    relatedTools: ['text-case', 'special-char'],
  },
]

/**
 * Find a tool by its URL slug.
 * Returns undefined if no tool matches the given slug.
 */
export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOL_REGISTRY.find((tool) => tool.slug === slug)
}

/**
 * Group all tools by their category.
 * Returns a record where each key is a ToolCategory and the value
 * is the array of tools in that category (preserving registry order).
 */
export function getToolsByCategory(): Record<ToolCategory, ToolMeta[]> {
  const categories: Record<ToolCategory, ToolMeta[]> = {
    '财务报价': [],
    '文本处理': [],
    '时间与节假日': [],
    '国家与货币': [],
    '物流与装柜': [],
    'VPS/站长工具': [],
    '外贸沟通': [],
    '文件与格式转换': [],
  }

  for (const tool of TOOL_REGISTRY) {
    categories[tool.category].push(tool)
  }

  return categories
}

/**
 * Get only categories that have at least one tool assigned.
 * Categories with zero tools are excluded from navigation/display.
 * Preserves the declaration order of ToolCategory.
 */
export function getActiveCategories(): ToolCategory[] {
  const allCategories: ToolCategory[] = [
    '财务报价',
    '文本处理',
    '时间与节假日',
    '国家与货币',
    '物流与装柜',
    'VPS/站长工具',
    '外贸沟通',
    '文件与格式转换',
  ]

  const grouped = getToolsByCategory()
  return allCategories.filter((cat) => grouped[cat].length > 0)
}
