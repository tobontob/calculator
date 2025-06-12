import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

// Vercel KV Storage 대신 파일 시스템을 사용
let cachedData: any = null;

export async function GET(request: Request) {
  try {
    // Authorization 헤더 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await axios.get(BASE_URL);
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
    const exchangeRates: any = {};

    const CURRENCY_NAMES: { [key: string]: string } = {
      USD: '미국 달러',
      JPY: '일본 엔',
      EUR: '유로',
      CNY: '중국 위안',
      GBP: '영국 파운드'
    };

    Object.entries(CURRENCY_NAMES).forEach(([currency, name]) => {
      const rate = data.rates[currency];
      if (rate) {
        exchangeRates[currency] = {
          rate: Math.round(krwRate / rate),
          name,
          lastUpdate: new Date(data.time_last_update_utc).toISOString()
        };
      }
    });

    // 데이터 캐시 업데이트
    cachedData = {
      ...exchangeRates,
      lastCronUpdate: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Exchange rates updated successfully',
      lastUpdate: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Cron job failed:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: '환율 정보 업데이트에 실패했습니다.',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 