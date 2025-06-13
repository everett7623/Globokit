import { pinyin } from 'pinyin-pro';

export interface PinyinOptions {
  toneType?: 'symbol' | 'num' | 'none';
  type?: 'array' | 'string';
  separator?: string;
}

export function convertToPinyin(text: string, options: PinyinOptions = {}): string {
  const defaultOptions = {
    toneType: 'symbol' as const,
    separator: ' ',
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  return pinyin(text, {
    toneType: finalOptions.toneType,
    separator: finalOptions.separator,
  });
}

export function getInitials(text: string): string {
  const pinyinArray = pinyin(text, { 
    pattern: 'first',
    toneType: 'none',
    type: 'array' 
  }) as string[];
  
  return pinyinArray.join('').toUpperCase();
}
