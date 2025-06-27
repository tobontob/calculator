/**
 * 숫자를 천 단위로 구분하여 포맷팅합니다.
 * @param value - 포맷팅할 숫자 또는 문자열
 * @returns 포맷팅된 문자열
 */
export function formatNumber(value: string | number | undefined | null): string {
  if (value === undefined || value === null) {
    return '0';
  }
  // 소숫점 이하 버리고 정수만 반환
  const num = typeof value === 'string' ? Math.round(Number(value.replace(/[^0-9.]/g, ''))) : Math.round(Number(value));
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 문자열에서 숫자와 소수점만 추출합니다.
 * @param value - 처리할 문자열
 * @returns 숫자와 소수점만 포함된 문자열
 */
export function parseNumber(value: string): string {
  return value.replace(/[^\d.]/g, '');
} 