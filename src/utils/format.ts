/**
 * 숫자를 천단위 구분 기호가 있는 문자열로 변환합니다.
 * @param value - 포맷할 숫자 또는 문자열
 * @returns 포맷된 문자열
 */
export function formatNumber(value: string | number): string {
  if (typeof value === 'string' && value === '') return '';
  
  // Remove existing commas and get only numbers and decimal point
  const num = typeof value === 'string' ? value.replace(/[^\d.]/g, '') : value.toString();
  
  // Handle decimal numbers
  const parts = num.split('.');
  parts[0] = new Intl.NumberFormat('ko-KR').format(parseInt(parts[0]) || 0);
  
  return parts.length > 1 ? parts.join('.') : parts[0];
}

/**
 * 문자열에서 숫자와 소수점만 추출합니다.
 * @param value - 처리할 문자열
 * @returns 숫자와 소수점만 포함된 문자열
 */
export function parseNumber(value: string): string {
  return value.replace(/[^\d.]/g, '');
} 