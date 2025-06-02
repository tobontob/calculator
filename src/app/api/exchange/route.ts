import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;

if (!API_KEY) {
  console.error('환율 API 키가 설정되지 않았습니다. (.env.local 파일에 NEXT_PUBLIC_EXCHANGE_API_KEY를 설정해주세요)');
}

export async function GET() {
  try {
    console.log('API route started - Checking API key...');
    if (!API_KEY) {
      console.error('API key is not set in environment variables');
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const searchDate = `${year}${month}${day}`;

    console.log('Making API request with params:', {
      searchdate: searchDate,
      data: 'AP01',
      authkey: API_KEY.substring(0, 4) + '...' // Log only first 4 chars of API key for security
    });

    const response = await axios.get(
      'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON',
      {
        params: {
          authkey: API_KEY,
          searchdate: searchDate,
          data: 'AP01'
        },
        timeout: 5000,
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      }
    );

    console.log('API Response status:', response.status);
    console.log('API Response type:', typeof response.data);
    console.log('API Response data:', JSON.stringify(response.data, null, 2));

    if (!response.data) {
      console.error('API response data is null or undefined');
      return NextResponse.json(
        { error: '응답 데이터가 없습니다.' },
        { status: 500 }
      );
    }

    if (!Array.isArray(response.data)) {
      console.error('API response is not an array:', response.data);
      return NextResponse.json(
        { error: '응답 데이터가 배열 형식이 아닙니다.' },
        { status: 500 }
      );
    }

    if (response.data.length === 0) {
      console.error('API response array is empty');
      return NextResponse.json(
        { error: '응답 데이터가 비어있습니다.' },
        { status: 500 }
      );
    }

    if (response.data[0]?.result === 3) {
      console.error('API returned result code 3:', response.data[0]);
      return NextResponse.json(
        { error: 'API 인증 실패 또는 유효하지 않은 응답' },
        { status: 500 }
      );
    }

    const exchangeRates: Record<string, any> = {};
    
    response.data.forEach((item: any) => {
      console.log('Processing currency item:', item.cur_unit);
      
      const rate = parseFloat(item.deal_bas_r.replace(/,/g, ''));
      const buy = parseFloat(item.ttb.replace(/,/g, ''));
      const sell = parseFloat(item.tts.replace(/,/g, ''));
      
      if (isNaN(rate) || isNaN(buy) || isNaN(sell)) {
        console.error(`유효하지 않은 환율 데이터: ${item.cur_unit}`, {
          original: { rate: item.deal_bas_r, buy: item.ttb, sell: item.tts },
          parsed: { rate, buy, sell }
        });
        return;
      }

      switch(item.cur_unit) {
        case 'USD':
          exchangeRates.USD = { rate, name: '미국 달러', buy, sell };
          break;
        case 'JPY(100)':
          exchangeRates.JPY = { rate: rate / 100, name: '일본 엔', buy: buy / 100, sell: sell / 100 };
          break;
        case 'EUR':
          exchangeRates.EUR = { rate, name: '유로', buy, sell };
          break;
        case 'CNH':
          exchangeRates.CNY = { rate, name: '중국 위안', buy, sell };
          break;
        case 'GBP':
          exchangeRates.GBP = { rate, name: '영국 파운드', buy, sell };
          break;
      }
    });

    console.log('Processed exchange rates:', exchangeRates);

    if (Object.keys(exchangeRates).length === 0) {
      console.error('No exchange rates were processed successfully');
      return NextResponse.json(
        { error: '환율 데이터를 처리할 수 없습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(exchangeRates);
  } catch (error) {
    console.error('환율 정보를 가져오는데 실패했습니다:', error);
    
    let errorMessage = '알 수 없는 오류';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error stack:', error.stack);
    }
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }
    
    return NextResponse.json(
      { error: `환율 정보를 가져오는데 실패했습니다: ${errorMessage}` },
      { status: 500 }
    );
  }
} 