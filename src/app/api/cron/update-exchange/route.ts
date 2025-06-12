import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

// 환율 데이터 유효성 검사를 위한 인터페이스
interface ExchangeRateResponse {
  rates: {
    [key: string]: number;
  };
  time_last_update_utc: string;
  time_next_update_utc: string;
}

interface ExchangeRate {
  rate: number;
  name: string;
  lastUpdate: string;
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

// 환율 데이터 유효성 검사 함수
function validateExchangeRateData(data: any): data is ExchangeRateResponse {
  if (!data || typeof data !== 'object') return false;
  if (!data.rates || typeof data.rates !== 'object') return false;
  if (!data.time_last_update_utc || typeof data.time_last_update_utc !== 'string') return false;
  if (!data.time_next_update_utc || typeof data.time_next_update_utc !== 'string') return false;
  
  // 필수 통화 확인
  const requiredCurrencies = ['USD', 'KRW', 'JPY', 'EUR', 'CNY', 'GBP'];
  return requiredCurrencies.every(currency => 
    typeof data.rates[currency] === 'number' && !isNaN(data.rates[currency])
  );
}

export async function GET(request: Request) {
  try {
    // Authorization 헤더 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await axios.get(BASE_URL);
    const data = response.data;
    
    if (!validateExchangeRateData(data)) {
      console.error('Invalid API response structure:', data);
      return NextResponse.json(
        { 
          error: '유효하지 않은 응답 형식입니다.',
          details: '필수 환율 데이터가 누락되었거나 형식이 올바르지 않습니다.'
        },
        { status: 400 }
      );
    }

    // USD/KRW 환율을 기준으로 다른 통화들의 환율을 계산
    const krwRate = data.rates.KRW;
    const exchangeRates: ExchangeRates = {};

    Object.entries(CURRENCY_NAMES).forEach(([currency, name]) => {
      const rate = data.rates[currency];
      if (rate && !isNaN(rate)) {
        exchangeRates[currency] = {
          rate: Math.round(krwRate / rate),
          name,
          lastUpdate: new Date(data.time_last_update_utc).toISOString()
        };
      }
    });

    // 모든 필수 통화가 포함되어 있는지 확인
    const missingCurrencies = Object.keys(CURRENCY_NAMES).filter(
      currency => !exchangeRates[currency]
    );

    if (missingCurrencies.length > 0) {
      return NextResponse.json(
        {
          error: '일부 통화 정보가 누락되었습니다.',
          details: `누락된 통화: ${missingCurrencies.join(', ')}`
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: exchangeRates,
      message: 'Exchange rates updated successfully',
      lastUpdate: new Date(data.time_last_update_utc).toISOString(),
      nextUpdate: new Date(data.time_next_update_utc).toISOString()
    });
    
  } catch (error: any) {
    console.error('Cron job failed:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: '환율 정보 업데이트에 실패했습니다.',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 