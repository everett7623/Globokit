// 名称: 特殊字符说明面板
// 描述: 展示功能、使用场景和常见字符类型
// 路径: Globokit/app/tools/special-char/special-char-info.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const INFO_GROUPS = [
  {
    title: '功能说明',
    items: ['自动检测中英文标点、特殊符号等', '智能替换：将特殊字符替换为相近的标准字符', '完全清理：只保留标准ASCII字符，适合纯英文环境', '支持批量文本处理，无长度限制', '实时统计各类特殊字符数量', '保存最近5次检查历史记录'],
  },
  {
    title: '使用场景',
    items: ['邮件发送前的文本检查', '跨系统文档传输', '数据库录入前的清理', 'API接口数据处理', 'Excel/CSV文件导入', '国际化内容处理'],
  },
]

const CHARACTER_GROUPS = [
  ['中文标点符号', '，。！？、；：""\'\'（）【】《》'],
  ['货币符号', '￥ $ € £ ¥ ₹ ₽ ₩ ₪'],
  ['商标版权符号', '™ ® © ℃ ℉ § † ‡ № '],
  ['其他特殊符号', '… — – ° ± × ÷ ≈ ≠ ≤ ≥'],
]

export function SpecialCharInfo() {
  return (
    <>
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        {INFO_GROUPS.map((group) => (
          <Card key={group.title} className="bg-muted/50">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />{group.title}</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {group.items.map((item) => <p key={item}>• {item}</p>)}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-4 bg-muted/50">
        <CardHeader><CardTitle className="text-lg">常见特殊字符类型</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {CHARACTER_GROUPS.map(([title, content]) => (
              <div key={title}>
                <p className="font-medium mb-2">{title}</p>
                <p className="text-muted-foreground">{content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
