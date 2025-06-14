'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'

// 基础拼音映射表
const pinyinMap: { [key: string]: string } = {
  '一': 'yi', '二': 'er', '三': 'san', '四': 'si', '五': 'wu',
  '六': 'liu', '七': 'qi', '八': 'ba', '九': 'jiu', '十': 'shi',
  '中': 'zhong', '文': 'wen', '转': 'zhuan', '拼': 'pin', '音': 'yin',
  '的': 'de', '是': 'shi', '在': 'zai', '有': 'you', '和': 'he',
  '了': 'le', '不': 'bu', '我': 'wo', '你': 'ni', '他': 'ta',
  '这': 'zhe', '那': 'na', '个': 'ge', '到': 'dao', '大': 'da',
  '小': 'xiao', '来': 'lai', '去': 'qu', '上': 'shang', '下': 'xia',
  '好': 'hao', '天': 'tian', '地': 'di', '人': 'ren', '国': 'guo',
  '家': 'jia', '年': 'nian', '月': 'yue', '日': 'ri', '时': 'shi',
  '分': 'fen', '秒': 'miao', '今': 'jin', '明': 'ming', '昨': 'zuo',
  '前': 'qian', '后': 'hou', '左': 'zuo', '右': 'you', '东': 'dong',
  '西': 'xi', '南': 'nan', '北': 'bei', '京': 'jing', '海': 'hai',
  '公': 'gong', '司': 'si', '电': 'dian', '话': 'hua', '号': 'hao',
  '码': 'ma', '名': 'ming', '字': 'zi', '学': 'xue', '生': 'sheng',
  '老': 'lao', '师': 'shi', '工': 'gong', '作': 'zuo', '钱': 'qian',
  '元': 'yuan', '买': 'mai', '卖': 'mai', '吃': 'chi', '喝': 'he',
  '说': 'shuo', '做': 'zuo', '想': 'xiang', '看': 'kan', '听': 'ting',
  '读': 'du', '写': 'xie', '走': 'zou', '跑': 'pao', '飞': 'fei',
  '开': 'kai', '关': 'guan', '门': 'men', '窗': 'chuang', '桌': 'zhuo',
  '椅': 'yi', '床': 'chuang', '书': 'shu', '本': 'ben', '笔': 'bi',
  '纸': 'zhi', '画': 'hua', '红': 'hong', '黄': 'huang', '蓝': 'lan',
  '绿': 'lv', '白': 'bai', '黑': 'hei', '多': 'duo', '少': 'shao',
  '长': 'chang', '短': 'duan', '高': 'gao', '低': 'di', '快': 'kuai',
  '慢': 'man', '新': 'xin', '旧': 'jiu', '早': 'zao', '晚': 'wan',
  '对': 'dui', '错': 'cuo', '男': 'nan', '女': 'nv', '爱': 'ai',
  '情': 'qing', '心': 'xin', '手': 'shou', '脚': 'jiao', '头': 'tou',
  '眼': 'yan', '耳': 'er', '口': 'kou', '鼻': 'bi', '身': 'shen',
  '体': 'ti', '健': 'jian', '康': 'kang', '病': 'bing', '医': 'yi',
  '院': 'yuan', '药': 'yao', '吗': 'ma', '呢': 'ne', '吧': 'ba',
  '啊': 'a', '哦': 'o', '哈': 'ha', '嗯': 'en', '唉': 'ai',
  '呀': 'ya', '哇': 'wa', '嘿': 'hei', '喂': 'wei', '谢': 'xie',
  '请': 'qing', '您': 'nin', '再': 'zai', '见': 'jian', '欢': 'huan',
  '迎': 'ying', '光': 'guang', '临': 'lin', '很': 'hen', '非': 'fei',
  '常': 'chang', '太': 'tai', '真': 'zhen', '最': 'zui', '都': 'dou',
  '会': 'hui', '能': 'neng', '可': 'ke', '以': 'yi', '要': 'yao',
  '就': 'jiu', '还': 'hai', '没': 'mei', '给': 'gei', '用': 'yong',
  '让': 'rang', '被': 'bei', '把': 'ba', '得': 'de', '地': 'de',
  '着': 'zhe', '过': 'guo', '而': 'er', '且': 'qie', '但': 'dan',
  '因': 'yin', '为': 'wei', '所': 'suo', '如': 'ru', '果': 'guo',
  '然': 'ran', '虽': 'sui', '或': 'huo', '者': 'zhe', '与': 'yu',
  '及': 'ji', '其': 'qi', '此': 'ci', '之': 'zhi', '于': 'yu',
  '从': 'cong', '向': 'xiang', '往': 'wang', '把': 'ba', '将': 'jiang',
  '无': 'wu', '法': 'fa', '道': 'dao', '理': 'li', '事': 'shi',
  '物': 'wu', '主': 'zhu', '义': 'yi', '社': 'she', '世': 'shi',
  '界': 'jie', '美': 'mei', '丽': 'li', '朋': 'peng', '友': 'you',
  '父': 'fu', '母': 'mu', '亲': 'qin', '子': 'zi', '女': 'nv',
  '儿': 'er', '孩': 'hai', '哥': 'ge', '姐': 'jie', '弟': 'di',
  '妹': 'mei', '夫': 'fu', '妻': 'qi', '丈': 'zhang', '妇': 'fu',
  '爸': 'ba', '妈': 'ma', '爷': 'ye', '奶': 'nai', '外': 'wai',
};

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [pinyinResult, setPinyinResult] = useState('')
  const [initialsResult, setInitialsResult] = useState('')

  const handleConvert = () => {
    if (!input.trim()) {
      setPinyinResult('')
      setInitialsResult('')
      return
    }

    const chars = input.split('')
    const pinyinArray: string[] = []
    const initials: string[] = []
    let unknownCount = 0

    chars.forEach(char => {
      if (pinyinMap[char]) {
        // 已知的汉字
        pinyinArray.push(pinyinMap[char])
        initials.push(pinyinMap[char][0].toUpperCase())
      } else if (/[a-zA-Z0-9]/.test(char)) {
        // 英文和数字保持原样
        pinyinArray.push(char)
        if (/[a-zA-Z]/.test(char)) {
          initials.push(char.toUpperCase())
        }
      } else if (/[\s]/.test(char)) {
        // 空格
        pinyinArray.push(' ')
      } else if (/[\u4e00-\u9fa5]/.test(char)) {
        // 未知的汉字
        pinyinArray.push(`[${char}]`)
        initials.push('?')
        unknownCount++
      } else {
        // 其他字符（标点等）保持原样
        pinyinArray.push(char)
      }
    })

    const result = pinyinArray.join(' ').replace(/\s+/g, ' ').trim()
    setPinyinResult(result)
    setInitialsResult(initials.join(''))
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>中文转拼音</CardTitle>
            <CardDescription>
              将中文文本转换为拼音（简化版，支持常用汉字）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900 mb-1">提示</p>
              <p className="text-blue-700">
                当前版本包含约200个常用汉字。未收录的汉字将显示为[原字]格式。
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="input">输入中文文本</Label>
              <Textarea
                id="input"
                placeholder="请输入需要转换的中文..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
              />
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
                  <div className="rounded-md border bg-gray-50 p-4">
                    <p className="text-lg break-words">{pinyinResult}</p>
                  </div>
                </div>

                {initialsResult && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>拼音首字母</Label>
                      <CopyButton text={initialsResult} />
                    </div>
                    <div className="rounded-md border bg-gray-50 p-4">
                      <p className="text-lg font-mono">{initialsResult}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-100 p-4 text-sm">
                <p className="font-medium mb-2">功能特点：</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>支持常用汉字转换</li>
                  <li>保留英文和数字</li>
                  <li>提取拼音首字母</li>
                  <li>未知汉字明确标记</li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-gray-100 p-4 text-sm">
                <p className="font-medium mb-2">使用场景：</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>姓名拼音标注</li>
                  <li>地址翻译参考</li>
                  <li>拼音首字母缩写</li>
                  <li>学习拼音辅助</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
