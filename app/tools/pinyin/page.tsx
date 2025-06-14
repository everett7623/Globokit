'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// 基础拼音映射表（包含常用汉字）
const pinyinMap: { [key: string]: string } = {
  '一': 'yi', '二': 'er', '三': 'san', '四': 'si', '五': 'wu',
  '六': 'liu', '七': 'qi', '八': 'ba', '九': 'jiu', '十': 'shi',
  '百': 'bai', '千': 'qian', '万': 'wan', '亿': 'yi',
  '中': 'zhong', '文': 'wen', '转': 'zhuan', '拼': 'pin', '音': 'yin',
  '的': 'de', '是': 'shi', '在': 'zai', '有': 'you', '和': 'he',
  '了': 'le', '不': 'bu', '我': 'wo', '你': 'ni', '他': 'ta',
  '她': 'ta', '它': 'ta', '们': 'men', '这': 'zhe', '那': 'na',
  '个': 'ge', '到': 'dao', '大': 'da', '小': 'xiao', '来': 'lai',
  '去': 'qu', '上': 'shang', '下': 'xia', '左': 'zuo', '右': 'you',
  '前': 'qian', '后': 'hou', '里': 'li', '外': 'wai', '多': 'duo',
  '少': 'shao', '好': 'hao', '坏': 'huai', '高': 'gao', '低': 'di',
  '长': 'chang', '短': 'duan', '新': 'xin', '旧': 'jiu', '快': 'kuai',
  '慢': 'man', '早': 'zao', '晚': 'wan', '天': 'tian', '地': 'di',
  '人': 'ren', '民': 'min', '国': 'guo', '家': 'jia', '公': 'gong',
  '司': 'si', '工': 'gong', '作': 'zuo', '学': 'xue', '校': 'xiao',
  '生': 'sheng', '活': 'huo', '用': 'yong', '品': 'pin', '电': 'dian',
  '脑': 'nao', '话': 'hua', '机': 'ji', '器': 'qi', '车': 'che',
  '路': 'lu', '水': 'shui', '火': 'huo', '山': 'shan', '河': 'he',
  '海': 'hai', '空': 'kong', '气': 'qi', '风': 'feng', '雨': 'yu',
  '雪': 'xue', '云': 'yun', '日': 'ri', '月': 'yue', '星': 'xing',
  '春': 'chun', '夏': 'xia', '秋': 'qiu', '冬': 'dong', '年': 'nian',
  '时': 'shi', '分': 'fen', '秒': 'miao', '今': 'jin', '明': 'ming',
  '昨': 'zuo', '东': 'dong', '西': 'xi', '南': 'nan', '北': 'bei',
  '京': 'jing', '州': 'zhou', '市': 'shi', '区': 'qu', '县': 'xian',
  '村': 'cun', '街': 'jie', '道': 'dao', '号': 'hao', '楼': 'lou',
  '层': 'ceng', '室': 'shi', '门': 'men', '窗': 'chuang', '桌': 'zhuo',
  '椅': 'yi', '床': 'chuang', '书': 'shu', '本': 'ben', '笔': 'bi',
  '纸': 'zhi', '画': 'hua', '图': 'tu', '色': 'se', '红': 'hong',
  '黄': 'huang', '蓝': 'lan', '绿': 'lv', '白': 'bai', '黑': 'hei',
  '名': 'ming', '字': 'zi', '号': 'hao', '码': 'ma', '价': 'jia',
  '钱': 'qian', '元': 'yuan', '角': 'jiao', '分': 'fen', '买': 'mai',
  '卖': 'mai', '贵': 'gui', '便': 'bian', '宜': 'yi', '货': 'huo',
  '物': 'wu', '食': 'shi', '饭': 'fan', '菜': 'cai', '汤': 'tang',
  '茶': 'cha', '酒': 'jiu', '肉': 'rou', '鱼': 'yu', '鸡': 'ji',
  '蛋': 'dan', '面': 'mian', '包': 'bao', '米': 'mi', '油': 'you',
  '盐': 'yan', '糖': 'tang', '果': 'guo', '瓜': 'gua', '豆': 'dou',
  '菜': 'cai', '花': 'hua', '草': 'cao', '树': 'shu', '林': 'lin',
  '对': 'dui', '错': 'cuo', '真': 'zhen', '假': 'jia', '美': 'mei',
  '丑': 'chou', '爱': 'ai', '恨': 'hen', '情': 'qing', '意': 'yi',
  '心': 'xin', '想': 'xiang', '思': 'si', '念': 'nian', '忘': 'wang',
  '记': 'ji', '忆': 'yi', '梦': 'meng', '醒': 'xing', '睡': 'shui',
  '觉': 'jue', '看': 'kan', '见': 'jian', '听': 'ting', '说': 'shuo',
  '读': 'du', '写': 'xie', '唱': 'chang', '跳': 'tiao', '舞': 'wu',
  '走': 'zou', '跑': 'pao', '飞': 'fei', '游': 'you', '泳': 'yong',
  '打': 'da', '球': 'qiu', '玩': 'wan', '乐': 'le', '笑': 'xiao',
  '哭': 'ku', '喊': 'han', '叫': 'jiao', '问': 'wen', '答': 'da',
  '请': 'qing', '谢': 'xie', '对': 'dui', '起': 'qi', '再': 'zai',
  '见': 'jian', '您': 'nin', '先': 'xian', '生': 'sheng', '女': 'nv',
  '士': 'shi', '老': 'lao', '师': 'shi', '同': 'tong', '事': 'shi',
  '朋': 'peng', '友': 'you', '父': 'fu', '母': 'mu', '亲': 'qin',
  '子': 'zi', '儿': 'er', '孩': 'hai', '哥': 'ge', '姐': 'jie',
  '弟': 'di', '妹': 'mei', '夫': 'fu', '妻': 'qi', '爸': 'ba',
  '妈': 'ma', '爷': 'ye', '奶': 'nai', '叔': 'shu', '姨': 'yi',
  '伯': 'bo', '姑': 'gu', '婶': 'shen', '舅': 'jiu', '姥': 'lao',
};

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [pinyinResult, setPinyinResult] = useState('')
  const [initialsResult, setInitialsResult] = useState('')
  const [unknownChars, setUnknownChars] = useState<string[]>([])

  const handleConvert = () => {
    if (!input.trim()) {
      setPinyinResult('')
      setInitialsResult('')
      setUnknownChars([])
      return
    }

    const chars = input.split('')
    const pinyinArray: string[] = []
    const initials: string[] = []
    const unknown: string[] = []

    chars.forEach(char => {
      if (pinyinMap[char]) {
        // 已知的汉字
        pinyinArray.push(pinyinMap[char])
        initials.push(pinyinMap[char][0].toUpperCase())
      } else if (/[a-zA-Z0-9]/.test(char)) {
        // 英文和数字保持原样
        pinyinArray.push(char)
        initials.push(char.toUpperCase())
      } else if (/[\s\.,!?;:'"，。！？；：""''（）]/.test(char)) {
        // 标点和空格
        pinyinArray.push(char)
      } else if (/[\u4e00-\u9fa5]/.test(char)) {
        // 未知的汉字
        pinyinArray.push(`[${char}]`)
        initials.push('?')
        if (!unknown.includes(char)) {
          unknown.push(char)
        }
      } else {
        // 其他字符
        pinyinArray.push(char)
      }
    })

    setPinyinResult(pinyinArray.join(' ').replace(/\s+/g, ' ').trim())
    setInitialsResult(initials.join(''))
    setUnknownChars(unknown)
  }

  const sampleTexts = [
    { text: '中文转拼音', label: '简单示例' },
    { text: '你好世界', label: '常用问候' },
    { text: '我爱中国', label: '常用短语' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>中文转拼音（简化版）</CardTitle>
            <CardDescription>
              将中文文本转换为拼音，当前版本包含常用汉字
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>简化版说明</AlertTitle>
              <AlertDescription>
                当前为简化版本，仅支持约300个常用汉字的转换。未收录的汉字将显示为 [原字]。
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="input">输入中文文本</Label>
              <Textarea
                id="input"
                placeholder="请输入需要转换的中文..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
              />
              
              {/* 示例文本 */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-muted-foreground">快速填充：</span>
                {sampleTexts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(sample.text)
                      handleConvert()
                    }}
                  >
                    {sample.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleConvert} className="w-full">
              转换拼音
            </Button>

            {pinyinResult && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>完整拼音</Label>
                    <CopyButton text={pinyinResult} />
                  </div>
                  <div className="rounded-md border bg-muted p-4">
                    <p className="text-lg">{pinyinResult}</p>
                  </div>
                </div>

                {initialsResult && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>拼音首字母</Label>
                      <CopyButton text={initialsResult} />
                    </div>
                    <div className="rounded-md border bg-muted p-4">
                      <p className="text-lg font-mono">{initialsResult}</p>
                    </div>
                  </div>
                )}

                {unknownChars.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      以下汉字暂未收录：{unknownChars.join('、')}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900 mb-2">使用说明：</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>支持约300个常用汉字</li>
                <li>保留英文、数字和标点符号</li>
                <li>未收录的汉字会用方括号标记</li>
                <li>首字母缩写中，未知汉字显示为 ?</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
