import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

interface ExchangeRate {
  rate: number;
  name: string;
  lastUpdate?: string;
}

interface ExchangeRates {
  [key: string]: ExchangeRate;
}

const CURRENCY_NAMES: { [key: string]: string } = {
  USD: '미국 달러',
  JPY: '일본 엔',
  EUR: '유로',
  CNY: '중국 위안',
  GBP: '영국 파운드'
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
});

export async function GET() {
  try {
    const response = await axiosInstance.get(BASE_URL);
    const data = response.data;
    
    if (!data || !data.rates) {
      console.error('Invalid API response structure:', data);
      return NextResponse.json(
        { error: '유효하지 않은 응답 형식입니다.' },
        { status: 400 }
      );
    }

    // USD/KRW 환율을 기준으로 다른 통화들의 환율을 계산
    const krwRate = data.rates.KRW;
    const exchangeRates: ExchangeRates = {};

    Object.entries(CURRENCY_NAMES).forEach(([currency, name]) => {
      const rate = data.rates[currency];
      if (rate) {
        exchangeRates[currency] = {
          rate: Math.round(krwRate / rate), // 소수점 제거
          name,
          lastUpdate: new Date(data.time_last_update_utc).toISOString()
        };
      }
    });

    if (Object.keys(exchangeRates).length === 0) {
      return NextResponse.json(
        { error: '환율 정보를 계산할 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(exchangeRates);
    
  } catch (error: any) {
    console.error('Exchange rate fetch failed:', error.message);
    
    return NextResponse.json(
      { error: '환율 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 