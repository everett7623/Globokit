'use client'

import { useState } from 'react'
import { toPinyin, getFirstLetters, getTextStats, presets } from '@/lib/tools/pinyin';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'

interface Example {
  text: string;
  label: string;
}

interface ConversionHistory {
  input: string;
  output: string;
  options: any;
  timestamp: Date;
}

export default function PinyinToolPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [firstLetters, setFirstLetters] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  
  // 转换选项
  const [toneType, setToneType] = useState<'none' | 'symbol' | 'num'>('none');
  const [separator, setSeparator] = useState(' ');
  const [enableSurname, setEnableSurname] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);

  // 示例文本
  const examples: Example[] = [
    { text: '中国人', label: '基础示例' },
    { text: '你好吗', label: '常用问候' },
    { text: '我爱北京天安门', label: '经典句子' },
    { text: '今天天气真好', label: '日常用语' },
    { text: '张三李四王五', label: '常见姓名' },
    { text: '重庆市渝中区', label: '地址示例' },
    { text: '银行行长', label: '多音字示例' },
    { text: '音乐会很精彩', label: '混合文本' }
  ];

  // 转换函数
  const handleConvert = () => {
    if (!inputText.trim()) return;

    const options = {
      toneType,
      separator,
      surname: enableSurname,
      multiple: showMultiple,
      keepOriginal: true
    };

    // 转换拼音
    const result = toPinyin(inputText, options);
    setOutputText(result);

    // 获取首字母
    const firstLetterResult = getFirstLetters(inputText);
    setFirstLetters(firstLetterResult);

    // 获取统计信息
    const textStats = getTextStats(inputText);
    setStats(textStats);

    // 添加到历史记录
    const newHistory: ConversionHistory = {
      input: inputText,
      output: result,
      options,
      timestamp: new Date()
    };
    setHistory(prev => [newHistory, ...prev.slice(0, 4)]); // 保留最近5条
  };

  // 快速设置预设
  const applyPreset = (presetName: keyof typeof presets) => {
    const preset = presets[presetName];
    if ('toneType' in preset) {
      setToneType(preset.toneType);
    }
    if ('separator' in preset) {
      setSeparator(preset.separator);
    }
  };

  // 导出结果
  const exportResult = () => {
    const data = {
      input: inputText,
      pinyin: outputText,
      firstLetters: firstLetters,
      options: {
        toneType,
        separator,
        surname: enableSurname,
        multiple: showMultiple
      },
      stats: stats,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinyin-result-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <span className="text-5xl">🌱</span>
            <span>中文转拼音工具</span>
          </h1>
          <p className="text-gray-600">
            基于 pinyin-pro，支持20000+汉字，准确率高达99.9%
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要转换区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 输入区域 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">输入文本</h2>
              
              {/* 示例按钮 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(example.text)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {example.label}
                  </button>
                ))}
              </div>

              {/* 输入框 */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="请输入要转换的中文文本..."
              />

              {/* 选项设置 */}
              <div className="mt-4 space-y-3">
                {/* 音调类型 */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">音调格式:</label>
                  <div className="flex gap-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="none"
                        checked={toneType === 'none'}
                        onChange={(e) => setToneType(e.target.value as any)}
                        className="mr-1"
                      />
                      <span className="text-sm">无音调</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="symbol"
                        checked={toneType === 'symbol'}
                        onChange={(e) => setToneType(e.target.value as any)}
                        className="mr-1"
                      />
                      <span className="text-sm">符号音调</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="num"
                        checked={toneType === 'num'}
                        onChange={(e) => setToneType(e.target.value as any)}
                        className="mr-1"
                      />
                      <span className="text-sm">数字音调</span>
                    </label>
                  </div>
                </div>

                {/* 分隔符 */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">分隔符:</label>
                  <select
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value=" ">空格</option>
                    <option value="-">连字符 (-)</option>
                    <option value="_">下划线 (_)</option>
                    <option value="">无分隔</option>
                  </select>
                </div>

                {/* 其他选项 */}
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={enableSurname}
                      onChange={(e) => setEnableSurname(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">姓氏模式</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showMultiple}
                      onChange={(e) => setShowMultiple(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">显示多音字</span>
                  </label>
                </div>

                {/* 预设按钮 */}
                <div className="flex gap-2 pt-2">
                  <span className="text-sm text-gray-600">快速预设:</span>
                  <button
                    onClick={() => applyPreset('standard')}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    标准
                  </button>
                  <button
                    onClick={() => applyPreset('withTone')}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    带音调
                  </button>
                  <button
                    onClick={() => applyPreset('numeric')}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    数字音调
                  </button>
                  <button
                    onClick={() => applyPreset('continuous')}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    连续
                  </button>
                </div>
              </div>

              {/* 转换按钮 */}
              <button
                onClick={handleConvert}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                转换拼音
              </button>
            </div>

            {/* 输出区域 */}
            {outputText && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">转换结果</h2>
                  <button
                    onClick={exportResult}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    导出结果
                  </button>
                </div>

                {/* 拼音结果 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">完整拼音</label>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-lg font-mono break-all">{outputText}</p>
                  </div>
                </div>

                {/* 首字母 */}
                {firstLetters && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">拼音首字母</label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-lg font-mono">{firstLetters}</p>
                    </div>
                  </div>
                )}

                {/* 统计信息 */}
                {stats && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-xs text-gray-600">总字符数</p>
                      <p className="text-lg font-semibold">{stats.totalChars}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-xs text-gray-600">中文字符</p>
                      <p className="text-lg font-semibold">{stats.chineseChars}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-xs text-gray-600">转换率</p>
                      <p className="text-lg font-semibold">{stats.conversionRate}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="text-xs text-gray-600">独立汉字</p>
                      <p className="text-lg font-semibold">{stats.uniqueChineseChars}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 转换历史 */}
            {history.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">转换历史</h2>
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{item.input}</p>
                          <p className="font-mono text-sm mt-1">{item.output}</p>
                        </div>
                        <button
                          onClick={() => {
                            setInputText(item.input);
                            setToneType(item.options.toneType);
                            setSeparator(item.options.separator);
                            setEnableSurname(item.options.surname);
                            setShowMultiple(item.options.multiple);
                          }}
                          className="ml-3 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          重用
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 侧边栏信息 */}
          <div className="space-y-6">
            {/* 功能特点 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">功能特点</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>支持20000+汉字，覆盖率99.9%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>智能多音字识别</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>支持姓氏特殊读音</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>三种音调格式可选</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>保留英文、数字和标点</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>支持拼音匹配搜索</span>
                </li>
              </ul>
            </div>

            {/* 字库信息 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">字库信息</h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">支持汉字数</p>
                  <p className="text-2xl font-bold text-green-600">20000+</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>• 通用规范汉字表: 8105字</p>
                    <p>• GB2312: 6763字</p>
                    <p>• 扩展汉字: 5000+字</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">准确率</p>
                  <p className="text-2xl font-bold text-blue-600">99.9%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    基于大规模语料库训练
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">性能</p>
                  <p className="text-2xl font-bold text-purple-600">极速</p>
                  <p className="text-xs text-gray-500 mt-1">
                    毫秒级响应，支持批量转换
                  </p>
                </div>
              </div>
            </div>

            {/* 使用说明 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">使用说明</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold mb-1">基础使用</h3>
                  <p className="text-xs">直接输入中文文本，点击转换即可获得拼音。</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">音调格式</h3>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• 无音调: han yu pin yin</li>
                    <li>• 符号音调: hàn yǔ pīn yīn</li>
                    <li>• 数字音调: han4 yu3 pin1 yin1</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">特殊功能</h3>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• 姓氏模式: 识别姓氏特殊读音</li>
                    <li>• 多音字: 显示所有可能的读音</li>
                    <li>• 首字母: 提取拼音首字母缩写</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 技术支持 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
              <h3 className="font-semibold mb-2">技术支持</h3>
              <p className="text-sm text-gray-600 mb-3">
                基于 pinyin-pro 开源库
              </p>
              <div className="space-y-2">
                <a
                  href="https://pinyin-pro.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  访问 pinyin-pro 官网
                </a>
                <a
                  href="https://www.npmjs.com/package/pinyin-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  NPM 包地址
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>基于《通用规范汉字表》标准，提供专业的中文拼音转换服务</p>
        </footer>
      </div>
    </div>
  );
}
