// components/TextTools.tsx
import { chineseToPinyin } from '@/lib/tools/pinyin';

const PinyinConverter = ({ inputText }: { inputText: string }) => {
  const pinyinResult = chineseToPinyin(inputText, { tone: false });
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">中文转拼音</h3>
      <p className="text-gray-600">{pinyinResult || '请输入中文文本'}</p>
    </div>
  );
};
