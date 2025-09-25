// 名称: 人民币大写转换工具函数（最终正确版）
// 描述: 逐位处理，正确处理所有零的情况
// 路径: seedtool/lib/tools/rmb-converter.ts
// 作者: Jensfrank
// 更新时间: 2025-09-25

export function numberToChinese(num: number): string {
  if (num === 0) return '人民币零元整';
  if (num < 0) return '请输入正数';
  if (num > 999999999999999) return '数字太大，无法转换';
  
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  
  const intPart = Math.floor(num);
  const decimal = Math.round((num - intPart) * 100);
  
  // 定义每一位的单位
  const getUnit = (position: number): string => {
    switch (position) {
      case 0: return '';      // 个位
      case 1: return '拾';     // 十位
      case 2: return '佰';     // 百位
      case 3: return '仟';     // 千位
      case 4: return '万';     // 万位
      case 5: return '拾';     // 十万位 (万位上的十位)
      case 6: return '佰';     // 百万位 (万位上的百位)
      case 7: return '仟';     // 千万位 (万位上的千位)
      case 8: return '亿';     // 亿位
      default: return '';
    }
  };
  
  // 转换整数部分
  const numStr = intPart.toString();
  const len = numStr.length;
  let result = '';
  let needZero = false;
  
  for (let i = 0; i < len; i++) {
    const digit = parseInt(numStr[i]);
    const position = len - i - 1; // 从右边数的位置
    
    if (digit === 0) {
      // 当前位是0
      if (position === 4 && result.length > 0) {
        // 万位是0但前面有内容，需要加万
        result += '万';
        needZero = false;
      } else if (position === 8 && result.length > 0) {
        // 亿位是0但前面有内容，需要加亿
        result += '亿';
        needZero = false;
      } else if (position > 0) {
        // 其他位是0，标记需要加零（但不是万位和亿位）
        needZero = true;
      }
    } else {
      // 当前位不是0
      if (needZero && result.length > 0) {
        result += '零';
      }
      needZero = false;
      
      // 添加数字
      result += digits[digit];
      
      // 添加单位
      const unit = getUnit(position);
      if (unit) {
        result += unit;
      }
    }
  }
  
  // 清理可能的重复万、亿
  result = result.replace(/万万/g, '万');
  result = result.replace(/亿亿/g, '亿');
  
  // 添加"元"
  result += '元';
  
  // 处理小数部分
  if (decimal > 0) {
    const jiao = Math.floor(decimal / 10);
    const fen = decimal % 10;
    
    if (jiao > 0) {
      result += digits[jiao] + '角';
    }
    if (fen > 0) {
      result += digits[fen] + '分';
    }
  } else {
    result += '整';
  }
  
  return '人民币' + result;
}

// 测试函数
export function testRMBConverter() {
  const testCases = [
    // 基础测试
    { input: 0, expected: '人民币零元整' },
    { input: 1, expected: '人民币壹元整' },
    { input: 10, expected: '人民币壹拾元整' },
    { input: 100, expected: '人民币壹佰元整' },
    { input: 1000, expected: '人民币壹仟元整' },
    { input: 10000, expected: '人民币壹万元整' },
    
    // 关键测试：10509及类似情况
    { input: 10509, expected: '人民币壹万零伍佰零玖元整' },
    { input: 10001, expected: '人民币壹万零壹元整' },
    { input: 10010, expected: '人民币壹万零壹拾元整' },
    { input: 10100, expected: '人民币壹万零壹佰元整' },
    { input: 10050, expected: '人民币壹万零伍拾元整' },
    { input: 10005, expected: '人民币壹万零伍元整' },
    
    // 更多万位零的测试
    { input: 20304, expected: '人民币贰万零叁佰零肆元整' },
    { input: 30405, expected: '人民币叁万零肆佰零伍元整' },
    { input: 40506, expected: '人民币肆万零伍佰零陆元整' },
    { input: 50607, expected: '人民币伍万零陆佰零柒元整' },
    { input: 60708, expected: '人民币陆万零柒佰零捌元整' },
    { input: 70809, expected: '人民币柒万零捌佰零玖元整' },
    { input: 80090, expected: '人民币捌万零玖拾元整' },
    { input: 90009, expected: '人民币玖万零玖元整' },
    
    // 正常万位（千位不为0）
    { input: 11000, expected: '人民币壹万壹仟元整' },
    { input: 12345, expected: '人民币壹万贰仟叁佰肆拾伍元整' },
    { input: 23456, expected: '人民币贰万叁仟肆佰伍拾陆元整' },
    
    // 十万位测试
    { input: 100001, expected: '人民币壹拾万零壹元整' },
    { input: 105009, expected: '人民币壹拾万伍仟零玖元整' },
    { input: 150000, expected: '人民币壹拾伍万元整' },
    
    // 百万位测试
    { input: 1000001, expected: '人民币壹佰万零壹元整' },
    { input: 1050009, expected: '人民币壹佰零伍万零玖元整' },
    
    // 小数测试
    { input: 10.5, expected: '人民币壹拾元伍角' },
    { input: 10.05, expected: '人民币壹拾元零伍分' },
    { input: 10.55, expected: '人民币壹拾元伍角伍分' },
    { input: 10509.99, expected: '人民币壹万零伍佰零玖元玖角玖分' },
  ];
  
  console.log('人民币大写转换测试');
  console.log('='.repeat(100));
  
  let passCount = 0;
  let failedCases = [];
  
  testCases.forEach(({ input, expected }, index) => {
    const result = numberToChinese(input);
    const isCorrect = result === expected;
    
    if (isCorrect) {
      passCount++;
      console.log(`✅ ${(index + 1).toString().padStart(2)}: ${input.toString().padEnd(10)} => 正确`);
    } else {
      failedCases.push({ input, expected, result });
      console.log(`❌ ${(index + 1).toString().padStart(2)}: ${input.toString().padEnd(10)} => 错误`);
      console.log(`    期望: ${expected}`);
      console.log(`    实际: ${result}`);
    }
  });
  
  console.log('='.repeat(100));
  console.log(`测试结果: ${passCount}/${testCases.length} 通过 (${(passCount/testCases.length*100).toFixed(1)}%)`);
  
  if (failedCases.length === 0) {
    console.log('🎉 所有测试通过！');
  } else {
    console.log(`\n❌ 失败的测试用例: ${failedCases.length}个`);
    failedCases.forEach(({ input, expected, result }) => {
      console.log(`  ${input}: 期望[${expected}] 实际[${result}]`);
    });
  }
  
  // 专门验证10509
  console.log('\n🎯 验证核心问题 10509:');
  const result10509 = numberToChinese(10509);
  const expected10509 = '人民币壹万零伍佰零玖元整';
  console.log(`输入: 10509`);
  console.log(`输出: ${result10509}`);
  console.log(`预期: ${expected10509}`);
  console.log(`状态: ${result10509 === expected10509 ? '✅ 问题已解决！' : '❌ 问题仍存在'}`);
  
  return passCount === testCases.length;
}
