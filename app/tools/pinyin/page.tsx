'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'

// 扩展的拼音映射表
const pinyinMap: { [key: string]: string } = {
  // 数字
  '零': 'ling', '一': 'yi', '二': 'er', '三': 'san', '四': 'si', 
  '五': 'wu', '六': 'liu', '七': 'qi', '八': 'ba', '九': 'jiu', '十': 'shi',
  '百': 'bai', '千': 'qian', '万': 'wan', '亿': 'yi',
  
  // 常用字
  '的': 'de', '是': 'shi', '在': 'zai', '有': 'you', '和': 'he',
  '了': 'le', '不': 'bu', '我': 'wo', '你': 'ni', '他': 'ta',
  '她': 'ta', '它': 'ta', '们': 'men', '这': 'zhe', '那': 'na',
  '个': 'ge', '到': 'dao', '大': 'da', '小': 'xiao', '来': 'lai',
  '去': 'qu', '上': 'shang', '下': 'xia', '左': 'zuo', '右': 'you',
  '前': 'qian', '后': 'hou', '里': 'li', '外': 'wai', '多': 'duo',
  '少': 'shao', '好': 'hao', '坏': 'huai', '高': 'gao', '低': 'di',
  '长': 'chang', '短': 'duan', '新': 'xin', '旧': 'jiu', '快': 'kuai',
  '慢': 'man', '早': 'zao', '晚': 'wan', '很': 'hen', '太': 'tai',
  
  // 时间
  '天': 'tian', '地': 'di', '年': 'nian', '月': 'yue', '日': 'ri',
  '时': 'shi', '分': 'fen', '秒': 'miao', '今': 'jin', '明': 'ming',
  '昨': 'zuo', '前': 'qian', '后': 'hou', '春': 'chun', '夏': 'xia',
  '秋': 'qiu', '冬': 'dong', '周': 'zhou', '星': 'xing', '期': 'qi',
  
  // 人物
  '人': 'ren', '民': 'min', '国': 'guo', '家': 'jia', '男': 'nan',
  '女': 'nv', '老': 'lao', '少': 'shao', '师': 'shi', '生': 'sheng',
  '父': 'fu', '母': 'mu', '子': 'zi', '儿': 'er', '孩': 'hai',
  '友': 'you', '朋': 'peng', '哥': 'ge', '姐': 'jie', '弟': 'di',
  '妹': 'mei', '夫': 'fu', '妻': 'qi', '爸': 'ba', '妈': 'ma',
  '爷': 'ye', '奶': 'nai', '公': 'gong', '婆': 'po', '孙': 'sun',
  
  // 地点
  '中': 'zhong', '文': 'wen', '北': 'bei', '京': 'jing', '东': 'dong',
  '西': 'xi', '南': 'nan', '海': 'hai', '广': 'guang', '州': 'zhou',
  '深': 'shen', '圳': 'zhen', '香': 'xiang', '港': 'gang', '台': 'tai',
  '湾': 'wan', '美': 'mei', '英': 'ying', '法': 'fa', '德': 'de',
  '城': 'cheng', '市': 'shi', '区': 'qu', '县': 'xian', '省': 'sheng',
  '路': 'lu', '街': 'jie', '道': 'dao', '号': 'hao', '楼': 'lou',
  '门': 'men', '店': 'dian', '馆': 'guan', '院': 'yuan', '校': 'xiao',
  
  // 动作
  '说': 'shuo', '话': 'hua', '看': 'kan', '见': 'jian', '听': 'ting',
  '写': 'xie', '读': 'du', '做': 'zuo', '想': 'xiang', '要': 'yao',
  '会': 'hui', '能': 'neng', '可': 'ke', '以': 'yi', '用': 'yong',
  '吃': 'chi', '喝': 'he', '走': 'zou', '跑': 'pao', '飞': 'fei',
  '坐': 'zuo', '站': 'zhan', '躺': 'tang', '睡': 'shui', '醒': 'xing',
  '笑': 'xiao', '哭': 'ku', '唱': 'chang', '跳': 'tiao', '玩': 'wan',
  '学': 'xue', '习': 'xi', '工': 'gong', '作': 'zuo', '休': 'xiu',
  '息': 'xi', '开': 'kai', '关': 'guan', '始': 'shi', '终': 'zhong',
  '买': 'mai', '卖': 'mai', '给': 'gei', '送': 'song', '拿': 'na',
  
  // 物品
  '书': 'shu', '本': 'ben', '笔': 'bi', '纸': 'zhi', '包': 'bao',
  '电': 'dian', '脑': 'nao', '手': 'shou', '机': 'ji', '车': 'che',
  '船': 'chuan', '飞': 'fei', '机': 'ji', '火': 'huo', '车': 'che',
  '桌': 'zhuo', '椅': 'yi', '床': 'chuang', '灯': 'deng', '窗': 'chuang',
  '衣': 'yi', '服': 'fu', '鞋': 'xie', '帽': 'mao', '裤': 'ku',
  
  // 自然
  '山': 'shan', '水': 'shui', '河': 'he', '湖': 'hu', '江': 'jiang',
  '海': 'hai', '云': 'yun', '雨': 'yu', '雪': 'xue', '风': 'feng',
  '花': 'hua', '草': 'cao', '树': 'shu', '林': 'lin', '森': 'sen',
  '太': 'tai', '阳': 'yang', '月': 'yue', '亮': 'liang', '星': 'xing',
  
  // 食物
  '饭': 'fan', '菜': 'cai', '汤': 'tang', '面': 'mian', '包': 'bao',
  '水': 'shui', '茶': 'cha', '酒': 'jiu', '奶': 'nai', '咖': 'ka',
  '啡': 'fei', '果': 'guo', '肉': 'rou', '鱼': 'yu', '鸡': 'ji',
  '蛋': 'dan', '米': 'mi', '油': 'you', '盐': 'yan', '糖': 'tang',
  
  // 颜色
  '红': 'hong', '黄': 'huang', '蓝': 'lan', '绿': 'lv', '白': 'bai',
  '黑': 'hei', '灰': 'hui', '紫': 'zi', '橙': 'cheng', '粉': 'fen',
  '棕': 'zong', '色': 'se', '彩': 'cai', '光': 'guang', '明': 'ming',
  '暗': 'an', '亮': 'liang', '深': 'shen', '浅': 'qian', '淡': 'dan',
  
  // 其他常用字
  '请': 'qing', '谢': 'xie', '对': 'dui', '起': 'qi', '再': 'zai',
  '见': 'jian', '您': 'nin', '先': 'xian', '士': 'shi', '什': 'shen',
  '么': 'me', '怎': 'zen', '样': 'yang', '为': 'wei', '因': 'yin',
  '所': 'suo', '就': 'jiu', '都': 'dou', '也': 'ye', '还': 'hai',
  '只': 'zhi', '才': 'cai', '刚': 'gang', '已': 'yi', '经': 'jing',
  '被': 'bei', '把': 'ba', '让': 'rang', '叫': 'jiao', '像': 'xiang',
  '如': 'ru', '比': 'bi', '但': 'dan', '而': 'er', '且': 'qie',
  '或': 'huo', '者': 'zhe', '与': 'yu', '及': 'ji', '等': 'deng',
  '第': 'di', '次': 'ci', '些': 'xie', '每': 'mei', '该': 'gai',
  '当': 'dang', '应': 'ying', '必': 'bi', '须': 'xu', '得': 'de',
  '着': 'zhe', '过': 'guo', '正': 'zheng', '反': 'fan', '从': 'cong',
  '向': 'xiang', '往': 'wang', '进': 'jin', '出': 'chu', '回': 'hui',
  '转': 'zhuan', '变': 'bian', '成': 'cheng', '为': 'wei', '化': 'hua',
  '无': 'wu', '非': 'fei', '同': 'tong', '意': 'yi', '思': 'si',
  '情': 'qing', '理': 'li', '事': 'shi', '物': 'wu', '件': 'jian',
  '名': 'ming', '字': 'zi', '号': 'hao', '码': 'ma', '数': 'shu',
  '量': 'liang', '位': 'wei', '种': 'zhong', '类': 'lei', '别': 'bie',
  '方': 'fang', '法': 'fa', '式': 'shi', '面': 'mian', '点': 'dian',
  '线': 'xian', '间': 'jian', '内': 'nei', '部': 'bu', '分': 'fen',
  '全': 'quan', '共': 'gong', '总': 'zong', '主': 'zhu', '次': 'ci',
  '真': 'zhen', '假': 'jia', '错': 'cuo', '题': 'ti', '问': 'wen',
  '答': 'da', '考': 'kao', '试': 'shi', '教': 'jiao', '室': 'shi',
  '课': 'ke', '本': 'ben', '页': 'ye', '行': 'xing', '列': 'lie',
  '表': 'biao', '单': 'dan', '双': 'shuang', '半': 'ban', '满': 'man',
  '空': 'kong', '实': 'shi', '虚': 'xu', '静': 'jing', '动': 'dong',
  '安': 'an', '全': 'quan', '危': 'wei', '险': 'xian', '急': 'ji',
  '忙': 'mang', '闲': 'xian', '重': 'zhong', '轻': 'qing', '松': 'song',
  '紧': 'jin', '难': 'nan', '易': 'yi', '简': 'jian', '单': 'dan',
  '复': 'fu', '杂': 'za', '特': 'te', '别': 'bie', '常': 'chang',
  '通': 'tong', '普': 'pu', '遍': 'bian', '近': 'jin', '远': 'yuan',
  '直': 'zhi', '曲': 'qu', '平': 'ping', '斜': 'xie', '横': 'heng',
  '竖': 'shu', '立': 'li', '卧': 'wo', '放': 'fang', '置': 'zhi',
  '定': 'ding', '活': 'huo', '死': 'si', '病': 'bing', '健': 'jian',
  '康': 'kang', '强': 'qiang', '弱': 'ruo', '胖': 'pang', '瘦': 'shou',
  '美': 'mei', '丑': 'chou', '善': 'shan', '恶': 'e', '爱': 'ai',
  '恨': 'hen', '喜': 'xi', '欢': 'huan', '怒': 'nu', '哀': 'ai',
  '乐': 'le', '惊': 'jing', '恐': 'kong', '怕': 'pa', '担': 'dan',
  '心': 'xin', '放': 'fang', '心': 'xin', '信': 'xin', '任': 'ren',
  '务': 'wu', '服': 'fu', '帮': 'bang', '助': 'zhu', '救': 'jiu',
  '治': 'zhi', '医': 'yi', '药': 'yao', '店': 'dian', '商': 'shang',
  '场': 'chang', '超': 'chao', '市': 'shi', '银': 'yin', '行': 'hang',
  '钱': 'qian', '币': 'bi', '元': 'yuan', '角': 'jiao', '分': 'fen',
  '价': 'jia', '格': 'ge', '费': 'fei', '贵': 'gui', '便': 'bian',
  '宜': 'yi', '折': 'zhe', '扣': 'kou', '赚': 'zhuan', '赔': 'pei',
  '输': 'shu', '赢': 'ying', '胜': 'sheng', '败': 'bai', '平': 'ping',
  '局': 'ju', '棋': 'qi', '牌': 'pai', '球': 'qiu', '赛': 'sai',
  '运': 'yun', '动': 'dong', '体': 'ti', '育': 'yu', '音': 'yin',
  '乐': 'yue', '歌': 'ge', '舞': 'wu', '蹈': 'dao', '画': 'hua',
  '图': 'tu', '片': 'pian', '照': 'zhao', '相': 'xiang', '影': 'ying',
  '视': 'shi', '频': 'pin', '网': 'wang', '络': 'luo', '站': 'zhan',
  '址': 'zhi', '邮': 'you', '箱': 'xiang', '密': 'mi', '码': 'ma',
  '账': 'zhang', '户': 'hu', '注': 'zhu', '册': 'ce', '登': 'deng',
  '录': 'lu', '退': 'tui', '出': 'chu', '保': 'bao', '存': 'cun',
  '删': 'shan', '除': 'chu', '修': 'xiu', '改': 'gai', '查': 'cha',
  '找': 'zhao', '搜': 'sou', '索': 'suo', '下': 'xia', '载': 'zai',
  '上': 'shang', '传': 'chuan', '发': 'fa', '送': 'song', '收': 'shou',
  '取': 'qu', '打': 'da', '印': 'yin', '复': 'fu', '制': 'zhi',
  '粘': 'zhan', '贴': 'tie', '剪': 'jian', '切': 'qie', '移': 'yi',
  '动': 'dong', '拖': 'tuo', '拉': 'la', '推': 'tui', '拉': 'la',
  '按': 'an', '钮': 'niu', '键': 'jian', '盘': 'pan', '鼠': 'shu',
  '标': 'biao', '屏': 'ping', '幕': 'mu', '显': 'xian', '示': 'shi',
  '器': 'qi', '主': 'zhu', '板': 'ban', '硬': 'ying', '盘': 'pan',
  '内': 'nei', '存': 'cun', '软': 'ruan', '件': 'jian', '系': 'xi',
  '统': 'tong', '程': 'cheng', '序': 'xu', '代': 'dai', '码': 'ma',
  '错': 'cuo', '误': 'wu', '警': 'jing', '告': 'gao', '提': 'ti',
  '示': 'shi', '确': 'que', '认': 'ren', '取': 'qu', '消': 'xiao',
  '完': 'wan', '成': 'cheng', '功': 'gong', '失': 'shi', '败': 'bai',
  '重': 'zhong', '试': 'shi', '刷': 'shua', '新': 'xin', '更': 'geng',
  '新': 'xin', '升': 'sheng', '级': 'ji', '版': 'ban', '本': 'ben',
  '用': 'yong', '户': 'hu', '管': 'guan', '理': 'li', '员': 'yuan',
  '权': 'quan', '限': 'xian', '设': 'she', '置': 'zhi', '配': 'pei',
  '置': 'zhi', '选': 'xuan', '项': 'xiang', '菜': 'cai', '单': 'dan',
  '工': 'gong', '具': 'ju', '栏': 'lan', '状': 'zhuang', '态': 'tai',
  '栏': 'lan', '任': 'ren', '务': 'wu', '栏': 'lan', '桌': 'zhuo',
  '面': 'mian', '壁': 'bi', '纸': 'zhi', '主': 'zhu', '题': 'ti',
  '皮': 'pi', '肤': 'fu', '字': 'zi', '体': 'ti', '大': 'da',
  '小': 'xiao', '粗': 'cu', '细': 'xi', '斜': 'xie', '体': 'ti',
  '下': 'xia', '划': 'hua', '线': 'xian', '颜': 'yan', '色': 'se',
  '背': 'bei', '景': 'jing', '边': 'bian', '框': 'kuang', '阴': 'yin',
  '影': 'ying', '透': 'tou', '明': 'ming', '度': 'du', '亮': 'liang',
  '度': 'du', '对': 'dui', '比': 'bi', '度': 'du', '饱': 'bao',
  '和': 'he', '度': 'du', '清': 'qing', '晰': 'xi', '度': 'du',
  '分': 'fen', '辨': 'bian', '率': 'lv', '像': 'xiang', '素': 'su',
  '尺': 'chi', '寸': 'cun', '宽': 'kuan', '度': 'du', '高': 'gao',
  '度': 'du', '长': 'chang', '度': 'du', '厚': 'hou', '度': 'du',
  '重': 'zhong', '量': 'liang', '质': 'zhi', '量': 'liang', '数': 'shu',
  '量': 'liang', '容': 'rong', '量': 'liang', '速': 'su', '度': 'du',
  '时': 'shi', '间': 'jian', '日': 'ri', '期': 'qi', '星': 'xing',
  '期': 'qi', '月': 'yue', '份': 'fen', '年': 'nian', '份': 'fen',
  '季': 'ji', '度': 'du', '世': 'shi', '纪': 'ji', '年': 'nian',
  '代': 'dai', '时': 'shi', '代': 'dai', '现': 'xian', '代': 'dai',
  '当': 'dang', '代': 'dai', '古': 'gu', '代': 'dai', '未': 'wei',
  '来': 'lai', '过': 'guo', '去': 'qu', '现': 'xian', '在': 'zai',
  '永': 'yong', '远': 'yuan', '永': 'yong', '恒': 'heng', '瞬': 'shun',
  '间': 'jian', '片': 'pian', '刻': 'ke', '须': 'xu', '臾': 'yu',
  '刹': 'sha', '那': 'na', '霎': 'sha', '时': 'shi', '顷': 'qing',
  '刻': 'ke', '秒': 'miao', '钟': 'zhong', '分': 'fen', '钟': 'zhong',
  '小': 'xiao', '时': 'shi', '天': 'tian', '周': 'zhou', '月': 'yue',
  '年': 'nian', '十': 'shi', '年': 'nian', '百': 'bai', '年': 'nian',
  '千': 'qian', '年': 'nian', '万': 'wan', '年': 'nian', '亿': 'yi',
  '年': 'nian', '光': 'guang', '年': 'nian', '纪': 'ji', '元': 'yuan',
  '公': 'gong', '元': 'yuan', '前': 'qian', '后': 'hou', '初': 'chu',
  '末': 'mo', '早': 'zao', '晚': 'wan', '晨': 'chen', '午': 'wu',
  '夜': 'ye', '宵': 'xiao', '旦': 'dan', '暮': 'mu', '朝': 'zhao',
  '夕': 'xi', '昼': 'zhou', '夜': 'ye', '白': 'bai', '天': 'tian',
  '黑': 'hei', '夜': 'ye', '凌': 'ling', '晨': 'chen', '拂': 'fu',
  '晓': 'xiao', '黎': 'li', '明': 'ming', '清': 'qing', '晨': 'chen',
  '早': 'zao', '晨': 'chen', '早': 'zao', '上': 'shang', '上': 'shang',
  '午': 'wu', '中': 'zhong', '午': 'wu', '下': 'xia', '午': 'wu',
  '傍': 'bang', '晚': 'wan', '黄': 'huang', '昏': 'hun', '夜': 'ye',
  '晚': 'wan', '深': 'shen', '夜': 'ye', '半': 'ban', '夜': 'ye',
  '子': 'zi', '夜': 'ye', '丑': 'chou', '时': 'shi', '寅': 'yin',
  '时': 'shi', '卯': 'mao', '时': 'shi', '辰': 'chen', '时': 'shi',
  '巳': 'si', '时': 'shi', '午': 'wu', '时': 'shi', '未': 'wei',
  '时': 'shi', '申': 'shen', '时': 'shi', '酉': 'you', '时': 'shi',
  '戌': 'xu', '时': 'shi', '亥': 'hai', '时': 'shi', '甲': 'jia',
  '乙': 'yi', '丙': 'bing', '丁': 'ding', '戊': 'wu', '己': 'ji',
  '庚': 'geng', '辛': 'xin', '壬': 'ren', '癸': 'gui', '子': 'zi',
  '丑': 'chou', '寅': 'yin', '卯': 'mao', '辰': 'chen', '巳': 'si',
  '午': 'wu', '未': 'wei', '申': 'shen', '酉': 'you', '戌': 'xu',
  '亥': 'hai', '鼠': 'shu', '牛': 'niu', '虎': 'hu', '兔': 'tu',
  '龙': 'long', '蛇': 'she', '马': 'ma', '羊': 'yang', '猴': 'hou',
  '鸡': 'ji', '狗': 'gou', '猪': 'zhu',
};

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
              将中文文本转换为拼音，支持600+常用汉字
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
              
              {/* 示例文本按钮 */}
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
                <li>支持600+个常用汉字转换</li>
                <li>保留英文、数字和标点符号</li>
                <li>未收录的汉字会用 [原字] 标记</li>
                <li>拼音首字母中，未知汉字显示为 ?</li>
                <li>适用于姓名、地址、日常用语等转换</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
