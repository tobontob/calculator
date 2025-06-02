import axios from 'axios';

// 환율 정보 타입
export interface ExchangeRateInfo {
  rate: number;
  name: string;
  lastUpdate?: string; // 마지막 업데이트 시간
}

export interface ExchangeRates {
  [key: string]: ExchangeRateInfo;
}

const CACHE_KEY = 'exchangeRates';
const CACHE_DURATION = 60 * 60 * 1000; // 1시간

// 캐시된 환율 정보 가져오기
const getCachedRates = (): ExchangeRates | null => {
  if (typeof window === 'undefined') return null;
  
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch (error) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

// 환율 정보 캐시에 저장
const cacheRates = (rates: ExchangeRates) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: rates,
    timestamp: Date.now()
  }));
};

// 환율 정보 가져오기
export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    // 캐시된 데이터 확인
    const cached = getCachedRates();
    if (cached) {
      return cached;
    }

    // API 호출
    const response = await axios.get('/api/exchange');
    
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('유효하지 않은 응답 데이터');
    }

    // 응답에 error 필드가 있는지 확인
    if ('error' in response.data) {
      throw new Error(response.data.error);
    }

    // 데이터 캐시에 저장
    cacheRates(response.data);
    
    return response.data;
  } catch (error) {
    console.error('환율 정보 조회 실패:', error);
    
    // 캐시된 데이터가 있다면 사용
    const cached = getCachedRates();
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}; 