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
}

export interface ExchangeRates {
  [key: string]: ExchangeRateInfo;
}

// API 호출 함수
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const searchDate = `${year}${month}${day}`;

    const response = await axios.get(
      `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON`,
      {
        params: {
          authkey: process.env.NEXT_PUBLIC_EXCHANGE_API_KEY,
          searchdate: searchDate,
          data: 'AP01'
        }
      }
    );

    const exchangeRates: ExchangeRates = {};
    
    response.data.forEach((item: ExchangeRateResponse) => {
      const rate = parseFloat(item.deal_bas_r.replace(/,/g, ''));
      const buy = parseFloat(item.ttb.replace(/,/g, ''));
      const sell = parseFloat(item.tts.replace(/,/g, ''));
      
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

    return exchangeRates;
  } catch (error) {
    console.error('환율 정보를 가져오는데 실패했습니다:', error);
    // 기본 환율 반환
    return {
      USD: { rate: 1300, name: '미국 달러', buy: 1290, sell: 1310 },
      JPY: { rate: 9.5, name: '일본 엔', buy: 9.4, sell: 9.6 },
      EUR: { rate: 1450, name: '유로', buy: 1440, sell: 1460 },
      CNY: { rate: 185, name: '중국 위안', buy: 184, sell: 186 },
      GBP: { rate: 1700, name: '영국 파운드', buy: 1690, sell: 1710 },
    };
  }
} 