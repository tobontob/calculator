import axios from 'axios';

// 한국수출입은행 환율 API 응답 타입
interface ExchangeRateResponse {
  result: number;
  cur_unit: string;
  ttb: string;  // 전신환 매입률
  tts: string;  // 전신환 매도률
  deal_bas_r: string;  // 기준율
  bkpr: string;  // 장부가격
  yy_efee_r: string;  // 연환가료율
  ten_dd_efee_r: string;  // 10일환가료율
  kftc_bkpr: string;  // 서울외국환중개 매매기준율
  kftc_deal_bas_r: string;  // 서울외국환중개 장부가격
  cur_nm: string;  // 통화명
}

// 환율 정보 타입
export interface ExchangeRateInfo {
  rate: number;
  name: string;
  buy: number;  // 매입률
  sell: number; // 매도률
  lastUpdate?: string; // 마지막 업데이트 시간
}

export interface ExchangeRates {
  [key: string]: ExchangeRateInfo;
}

// API 키 확인
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
if (!API_KEY) {
  console.error('환율 API 키가 설정되지 않았습니다. (.env.local 파일에 NEXT_PUBLIC_EXCHANGE_API_KEY를 설정해주세요)');
}

// API 호출 함수
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await axios.get('/api/exchange');
    
    if (!response.data) {
      throw new Error('유효하지 않은 API 응답');
    }

    // 현재 시간을 lastUpdate로 추가
    const currentTime = new Date().toISOString();
    const exchangeRates: ExchangeRates = {};
    
    Object.entries(response.data).forEach(([currency, info]: [string, any]) => {
      exchangeRates[currency] = {
        ...info,
        lastUpdate: currentTime
      };
    });

    return exchangeRates;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    console.error('환율 정보를 가져오는데 실패했습니다:', errorMessage);
    throw error;
  }
} 