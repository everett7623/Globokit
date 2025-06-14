'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'

// 使用函数创建拼音映射，避免重复键错误
function createPinyinMap(): { [key: string]: string } {
  const data = [
    // 数字
    ['零', 'ling'], ['一', 'yi'], ['二', 'er'], ['三', 'san'], ['四', 'si'], 
    ['五', 'wu'], ['六', 'liu'], ['七', 'qi'], ['八', 'ba'], ['九', 'jiu'], 
    ['十', 'shi'], ['百', 'bai'], ['千', 'qian'], ['万', 'wan'], ['亿', 'yi'],
    
    // 最常用字TOP100
    ['的', 'de'], ['是', 'shi'], ['在', 'zai'], ['有', 'you'], ['和', 'he'],
    ['了', 'le'], ['不', 'bu'], ['我', 'wo'], ['你', 'ni'], ['他', 'ta'],
    ['她', 'ta'], ['它', 'ta'], ['们', 'men'], ['这', 'zhe'], ['那', 'na'],
    ['个', 'ge'], ['到', 'dao'], ['大', 'da'], ['小', 'xiao'], ['来', 'lai'],
    ['去', 'qu'], ['上', 'shang'], ['下', 'xia'], ['左', 'zuo'], ['右', 'you'],
    ['前', 'qian'], ['后', 'hou'], ['里', 'li'], ['外', 'wai'], ['多', 'duo'],
    ['少', 'shao'], ['好', 'hao'], ['很', 'hen'], ['太', 'tai'], ['都', 'dou'],
    ['天', 'tian'], ['地', 'di'], ['年', 'nian'], ['月', 'yue'], ['日', 'ri'],
    ['时', 'shi'], ['分', 'fen'], ['秒', 'miao'], ['今', 'jin'], ['明', 'ming'],
    ['昨', 'zuo'], ['春', 'chun'], ['夏', 'xia'], ['秋', 'qiu'], ['冬', 'dong'],
    ['人', 'ren'], ['民', 'min'], ['国', 'guo'], ['家', 'jia'], ['中', 'zhong'],
    ['北', 'bei'], ['京', 'jing'], ['东', 'dong'], ['西', 'xi'], ['南', 'nan'],
    ['说', 'shuo'], ['话', 'hua'], ['看', 'kan'], ['见', 'jian'], ['听', 'ting'],
    ['写', 'xie'], ['读', 'du'], ['做', 'zuo'], ['想', 'xiang'], ['要', 'yao'],
    ['会', 'hui'], ['能', 'neng'], ['可', 'ke'], ['以', 'yi'], ['用', 'yong'],
    ['吃', 'chi'], ['喝', 'he'], ['走', 'zou'], ['跑', 'pao'], ['飞', 'fei'],
    ['学', 'xue'], ['习', 'xi'], ['工', 'gong'], ['作', 'zuo'], ['电', 'dian'],
    ['脑', 'nao'], ['手', 'shou'], ['机', 'ji'], ['车', 'che'], ['水', 'shui'],
    ['火', 'huo'], ['山', 'shan'], ['河', 'he'], ['云', 'yun'], ['雨', 'yu'],
    ['风', 'feng'], ['花', 'hua'], ['草', 'cao'], ['树', 'shu'], ['爱', 'ai'],
    
    // 其他常用字
    ['文', 'wen'], ['字', 'zi'], ['词', 'ci'], ['语', 'yu'], ['言', 'yan'],
    ['书', 'shu'], ['本', 'ben'], ['页', 'ye'], ['章', 'zhang'], ['节', 'jie'],
    ['句', 'ju'], ['段', 'duan'], ['篇', 'pian'], ['课', 'ke'], ['题', 'ti'],
    ['问', 'wen'], ['答', 'da'], ['对', 'dui'], ['错', 'cuo'], ['真', 'zhen'],
    ['假', 'jia'], ['新', 'xin'], ['旧', 'jiu'], ['快', 'kuai'], ['慢', 'man'],
    ['高', 'gao'], ['低', 'di'], ['长', 'chang'], ['短', 'duan'], ['远', 'yuan'],
    ['近', 'jin'], ['早', 'zao'], ['晚', 'wan'], ['先', 'xian'], ['生', 'sheng'],
    ['老', 'lao'], ['师', 'shi'], ['同', 'tong'], ['友', 'you'], ['朋', 'peng'],
    ['父', 'fu'], ['母', 'mu'], ['子', 'zi'], ['女', 'nv'], ['儿', 'er'],
    ['男', 'nan'], ['孩', 'hai'], ['哥', 'ge'], ['姐', 'jie'], ['弟', 'di'],
    ['妹', 'mei'], ['夫', 'fu'], ['妻', 'qi'], ['爸', 'ba'], ['妈', 'ma'],
    ['爷', 'ye'], ['奶', 'nai'], ['公', 'gong'], ['司', 'si'], ['店', 'dian'],
    ['馆', 'guan'], ['院', 'yuan'], ['校', 'xiao'], ['站', 'zhan'], ['港', 'gang'],
    ['路', 'lu'], ['街', 'jie'], ['道', 'dao'], ['桥', 'qiao'], ['门', 'men'],
    ['窗', 'chuang'], ['户', 'hu'], ['房', 'fang'], ['间', 'jian'], ['楼', 'lou'],
    ['层', 'ceng'], ['室', 'shi'], ['厅', 'ting'], ['堂', 'tang'], ['台', 'tai'],
    ['红', 'hong'], ['黄', 'huang'], ['蓝', 'lan'], ['绿', 'lv'], ['白', 'bai'],
    ['黑', 'hei'], ['灰', 'hui'], ['色', 'se'], ['光', 'guang'], ['明', 'ming'],
    ['暗', 'an'], ['亮', 'liang'], ['深', 'shen'], ['浅', 'qian'], ['淡', 'dan'],
    ['您', 'nin'], ['请', 'qing'], ['谢', 'xie'], ['再', 'zai'], ['见', 'jian'],
    ['什', 'shen'], ['么', 'me'], ['怎', 'zen'], ['样', 'yang'], ['为', 'wei'],
    ['因', 'yin'], ['所', 'suo'], ['就', 'jiu'], ['也', 'ye'], ['还', 'hai'],
    ['只', 'zhi'], ['才', 'cai'], ['刚', 'gang'], ['已', 'yi'], ['经', 'jing'],
    ['被', 'bei'], ['把', 'ba'], ['让', 'rang'], ['叫', 'jiao'], ['给', 'gei'],
    ['向', 'xiang'], ['往', 'wang'], ['从', 'cong'], ['过', 'guo'], ['出', 'chu'],
    ['进', 'jin'], ['回', 'hui'], ['开', 'kai'], ['关', 'guan'], ['起', 'qi'],
    ['放', 'fang'], ['收', 'shou'], ['发', 'fa'], ['打', 'da'], ['拿', 'na'],
    ['找', 'zhao'], ['换', 'huan'], ['买', 'mai'], ['卖', 'mai'], ['送', 'song'],
    ['钱', 'qian'], ['元', 'yuan'], ['块', 'kuai'], ['角', 'jiao'], ['分', 'fen'],
    ['饭', 'fan'], ['菜', 'cai'], ['汤', 'tang'], ['茶', 'cha'], ['酒', 'jiu'],
    ['肉', 'rou'], ['鱼', 'yu'], ['蛋', 'dan'], ['面', 'mian'], ['包', 'bao'],
    ['米', 'mi'], ['油', 'you'], ['盐', 'yan'], ['糖', 'tang'], ['果', 'guo'],
    ['奶', 'nai'], ['咖', 'ka'], ['啡', 'fei'], ['鸡', 'ji'], ['鸭', 'ya'],
    ['桌', 'zhuo'], ['椅', 'yi'], ['床', 'chuang'], ['灯', 'deng'], ['笔', 'bi'],
    ['纸', 'zhi'], ['墨', 'mo'], ['画', 'hua'], ['图', 'tu'], ['照', 'zhao'],
    ['片', 'pian'], ['相', 'xiang'], ['影', 'ying'], ['视', 'shi'], ['音', 'yin'],
    ['声', 'sheng'], ['歌', 'ge'], ['舞', 'wu'], ['曲', 'qu'], ['乐', 'le'],
    ['琴', 'qin'], ['棋', 'qi'], ['球', 'qiu'], ['运', 'yun'], ['动', 'dong'],
    ['体', 'ti'], ['育', 'yu'], ['赛', 'sai'], ['场', 'chang'], ['队', 'dui'],
    ['员', 'yuan'], ['官', 'guan'], ['兵', 'bing'], ['士', 'shi'], ['医', 'yi'],
    ['药', 'yao'], ['病', 'bing'], ['死', 'si'], ['活', 'huo'], ['健', 'jian'],
    ['康', 'kang'], ['强', 'qiang'], ['弱', 'ruo'], ['胖', 'pang'], ['瘦', 'shou'],
    ['美', 'mei'], ['丑', 'chou'], ['善', 'shan'], ['恶', 'e'], ['喜', 'xi'],
    ['欢', 'huan'], ['怒', 'nu'], ['哀', 'ai'], ['乐', 'le'], ['哭', 'ku'],
    ['笑', 'xiao'], ['情', 'qing'], ['心', 'xin'], ['意', 'yi'], ['思', 'si'],
    ['想', 'xiang'], ['念', 'nian'], ['忘', 'wang'], ['记', 'ji'], ['忆', 'yi'],
    ['梦', 'meng'], ['醒', 'xing'], ['睡', 'shui'], ['觉', 'jue'], ['知', 'zhi'],
    ['道', 'dao'], ['理', 'li'], ['由', 'you'], ['原', 'yuan'], ['因', 'yin'],
    ['果', 'guo'], ['如', 'ru'], ['若', 'ruo'], ['比', 'bi'], ['较', 'jiao'],
    ['更', 'geng'], ['最', 'zui'], ['非', 'fei'], ['常', 'chang'], ['特', 'te'],
    ['别', 'bie'], ['样', 'yang'], ['种', 'zhong'], ['类', 'lei'], ['型', 'xing'],
    ['式', 'shi'], ['法', 'fa'], ['方', 'fang'], ['向', 'xiang'], ['位', 'wei'],
    ['置', 'zhi'], ['处', 'chu'], ['界', 'jie'], ['世', 'shi'], ['纪', 'ji'],
    ['代', 'dai'], ['现', 'xian'], ['在', 'zai'], ['过', 'guo'], ['去', 'qu'],
    ['未', 'wei'], ['来', 'lai'], ['始', 'shi'], ['终', 'zhong'], ['结', 'jie'],
    ['束', 'shu'], ['完', 'wan'], ['成', 'cheng'], ['功', 'gong'], ['败', 'bai'],
    ['失', 'shi'], ['得', 'de'], ['利', 'li'], ['害', 'hai'], ['益', 'yi'],
    ['损', 'sun'], ['伤', 'shang'], ['痛', 'tong'], ['苦', 'ku'], ['难', 'nan'],
    ['易', 'yi'], ['简', 'jian'], ['单', 'dan'], ['复', 'fu'], ['杂', 'za'],
    ['直', 'zhi'], ['曲', 'qu'], ['正', 'zheng'], ['反', 'fan'], ['顺', 'shun'],
    ['逆', 'ni'], ['横', 'heng'], ['竖', 'shu'], ['斜', 'xie'], ['平', 'ping'],
    ['等', 'deng'], ['第', 'di'], ['次', 'ci'], ['些', 'xie'], ['每', 'mei'],
    ['各', 'ge'], ['自', 'zi'], ['己', 'ji'], ['其', 'qi'], ['他', 'ta'],
    ['她', 'ta'], ['它', 'ta'], ['此', 'ci'], ['彼', 'bi'], ['某', 'mou'],
    ['全', 'quan'], ['部', 'bu'], ['分', 'fen'], ['半', 'ban'], ['双', 'shuang'],
    ['两', 'liang'], ['几', 'ji'], ['许', 'xu'], ['些', 'xie'], ['点', 'dian'],
    ['线', 'xian'], ['面', 'mian'], ['积', 'ji'], ['量', 'liang'], ['数', 'shu'],
    ['度', 'du'], ['率', 'lv'], ['比', 'bi'], ['例', 'li'], ['份', 'fen'],
    ['股', 'gu'], ['张', 'zhang'], ['片', 'pian'], ['块', 'kuai'], ['条', 'tiao'],
    ['根', 'gen'], ['支', 'zhi'], ['只', 'zhi'], ['头', 'tou'], ['尾', 'wei'],
    ['首', 'shou'], ['末', 'mo'], ['初', 'chu'], ['终', 'zhong'], ['始', 'shi'],
    ['末', 'mo'], ['端', 'duan'], ['头', 'tou'], ['尾', 'wei'], ['角', 'jiao'],
  ];
  
  const map: { [key: string]: string } = {};
  const seen = new Set<string>();
  
  // 使用 Set 确保没有重复键
  data.forEach(([char, pinyin]) => {
    if (!seen.has(char)) {
      map[char] = pinyin;
      seen.add(char);
    }
  });
  
  return map;
}

// 创建拼音映射
const pinyinMap = createPinyinMap();

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{
    pinyin: string;
    initials: string;
    unknownCount: number;
  } | null>(null)

  const convertToPinyin = () => {
    if (!input.trim()) {
      setResult(null)
      return
    }

    const chars = input.split('')
    const pinyinArray: string[] = []
    const initials: string[] = []
    let unknownCount = 0

    chars.forEach(char => {
      if (pinyinMap[char]) {
        pinyinArray.push(pinyinMap[char])
        initials.push(pinyinMap[char][0].toUpperCase())
      } else if (/[a-zA-Z0-9]/.test(char)) {
        pinyinArray.push(char)
        if (/[a-zA-Z]/.test(char)) {
          initials.push(char.toUpperCase())
        }
      } else if (/[\s\.,!?;:'"，。！？；：""''（）【】《》\-_、]/.test(char)) {
        pinyinArray.push(char)
      } else if (/[\u4e00-\u9fa5]/.test(char)) {
        pinyinArray.push(`[${char}]`)
        initials.push('?')
        unknownCount++
      } else {
        pinyinArray.push(char)
      }
    })

    setResult({
      pinyin: pinyinArray.join(' ').replace(/\s+/g, ' ').trim(),
      initials: initials.join(''),
      unknownCount
    })
  }

  const sampleTexts = [
    { text: '中文转拼音', label: '基础示例' },
    { text: '你好世界', label: '常用问候' },
    { text: '我爱北京天安门', label: '经典句子' },
    { text: '今天天气真好', label: '日常用语' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>中文转拼音</CardTitle>
            <CardDescription>
              将中文文本转换为拼音，支持常用汉字
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">输入中文文本</Label>
              <Textarea
                id="input"
                placeholder="请输入需要转换的中文..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
              />
              
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(sample.text)
                    }}
                  >
                    {sample.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={convertToPinyin} className="w-full">
              转换拼音
            </Button>

            {result && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>完整拼音</Label>
                    <CopyButton text={result.pinyin} />
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="break-all">{result.pinyin}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>拼音首字母</Label>
                    <CopyButton text={result.initials} />
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono break-all">{result.initials}</p>
                  </div>
                </div>

                {result.unknownCount > 0 && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                    <p className="text-sm text-orange-800">
                      有 {result.unknownCount} 个汉字未被收录，已用 [ ] 标记
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">使用说明：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>支持300+常用汉字转换</li>
                <li>保留英文、数字和标点符号</li>
                <li>未收录的汉字会用 [原字] 标记</li>
                <li>适用于姓名、地址、日常用语等转换</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
