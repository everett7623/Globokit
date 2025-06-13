import pinyin from 'pinyin';

export function convertToPinyin(text) {
  if (!text) return '';
  
  try {
    const result = pinyin(text, {
      style: pinyin.STYLE_NORMAL,
      heteronym: false,
      segment: true,
      compact: true
    });
    
    return result.flat().join(' ');
  } catch (error) {
    console.error('拼音转换失败:', error);
    return text;
  }
}    
