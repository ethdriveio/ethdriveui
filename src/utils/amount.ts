import Big from 'big.js';

/**
 * 按照千分位格式化金额
 * @param str 金额字符串
 */
export function toThousandsString(str: number | string): string {
  if (!str) {
    return '';
  }
  const splitNumber = str.toString().split('.');
  let integer = splitNumber[0];
  const decimal = splitNumber[1] || '';

  let result = '';
  while (integer.length > 3) {
    result = ',' + integer.slice(-3) + result;
    integer = integer.slice(0, integer.length - 3);
  }
  if (integer) {
    result = integer + result;
  }

  // 补零
  if (decimal === '') {
    return result.toString() + '.00';
  } else if (decimal !== '' && decimal.length < 2) {
    result = result.toString() + '.' + decimal + '0';
  }

  return result + '.' + decimal;
}

export function toAmount (value, decimal = 18): any {
  return new Big(value).div(new Big(10).pow(decimal));
}

export function toSpecialAmount (value, decimals = 18, showDecimals = 4): any {
  const b = toAmount(value, decimals);
  if (b.gt(1)) {
    return b.toFixed(2, 0);
  } else if (b.lte(0)) {
    return b.toFixed(0);
  } else if (showDecimals) {
    return b.toFixed(showDecimals);
  }
  return b.toString();
}

export function fromAmount (value, decimals = 18): any {
  return (new Big(value)).times(new Big(10).pow(decimals)).toFixed(0);
}