// 名称: 数字转英文函数
// 描述: 实现阿拉伯数字到英文单词的转换逻辑
// 路径: Globokit/lib/tools/number-english.ts
// 作者: Jensfrank
// 更新时间: 2026-01-08

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

export function numberToEnglish(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'negative ' + numberToEnglish(-num);
  
  return convertToWords(num).trim();
}

function convertToWords(num: number): string {
  if (num === 0) return '';
  
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' and ' + convertToWords(num % 100) : '');
  if (num < 1000000) return convertToWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 !== 0 ? ' ' + convertToWords(num % 1000) : '');
  if (num < 1000000000) return convertToWords(Math.floor(num / 1000000)) + ' million' + (num % 1000000 !== 0 ? ' ' + convertToWords(num % 1000000) : '');
  if (num < 1000000000000) return convertToWords(Math.floor(num / 1000000000)) + ' billion' + (num % 1000000000 !== 0 ? ' ' + convertToWords(num % 1000000000) : '');
  
  return convertToWords(Math.floor(num / 1000000000000)) + ' trillion' + (num % 1000000000000 !== 0 ? ' ' + convertToWords(num % 1000000000000) : '');
}

export function convertOrdinal(num: number): string {
  const word = numberToEnglish(num);
  const lastWord = word.split(' ').pop() || '';
  
  let ordinal = word;
  if (lastWord.endsWith('one')) {
    ordinal = word.replace(/one$/, 'first');
  } else if (lastWord.endsWith('two')) {
    ordinal = word.replace(/two$/, 'second');
  } else if (lastWord.endsWith('three')) {
    ordinal = word.replace(/three$/, 'third');
  } else if (lastWord.endsWith('ve')) {
    ordinal = word.replace(/ve$/, 'fth');
  } else if (lastWord.endsWith('t')) {
    ordinal = word + 'h';
  } else if (lastWord.endsWith('y')) {
    ordinal = word.replace(/y$/, 'ieth');
  } else {
    ordinal = word + 'th';
  }
  
  return ordinal;
}
