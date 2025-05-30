/**
 * 숫자를 천단위 구분 기호가 있는 문자열로 변환합니다.
 * @param value - 포맷할 숫자
 * @returns 포맷된 문자열
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(Math.round(value));
} 