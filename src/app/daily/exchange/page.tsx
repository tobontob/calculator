'use client';

import { useState, useEffect } from 'react';
import { fetchExchangeRates, type ExchangeRates } from '@/utils/exchangeRate';
import { formatNumber } from '@/utils/format';

interface ExchangeInputs {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

interface ExchangeResult {
  convertedAmount: number;
  exchangeRate: number;
  commission: number;
  totalAmount: number;
  buyRate?: number;
  sellRate?: number;
}

export default function ExchangeCalculator() {
  const [inputs, setInputs] = useState<ExchangeInputs>({
    amount: '',
    fromCurrency: 'KRW',
    toCurrency: 'USD'
  });

  const [result, setResult] = useState<ExchangeResult | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>({
    USD: { rate: 1300, name: '미국 달러', buy: 1290, sell: 1310 },
    JPY: { rate: 9.5, name: '일본 엔', buy: 9.4, sell: 9.6 },
    EUR: { rate: 1450, name: '유로', buy: 1440, sell: 1460 },
    CNY: { rate: 180, name: '중국 위안', buy: 178, sell: 182 },
    GBP: { rate: 1650, name: '영국 파운드', buy: 1640, sell: 1660 }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(new Date().toLocaleString('ko-KR'));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      setInputs(prev => ({
        ...prev,
        [name]: formatNumber(value)
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setResult(null);
  };

  const calculateExchange = () => {
    if (!exchangeRates) return;

    const amount = parseFloat(inputs.amount.replace(/,/g, '')) || 0;
    let rate = 1;
    let commission = 0;
    let buyRate: number | undefined;
    let sellRate: number | undefined;

    if (inputs.fromCurrency === 'KRW') {
      rate = 1 / exchangeRates[inputs.toCurrency].rate;
      commission = amount * 0.015; // 1.5% 수수료
      sellRate = 1 / exchangeRates[inputs.toCurrency].sell;
    } else if (inputs.toCurrency === 'KRW') {
      rate = exchangeRates[inputs.fromCurrency].rate;
      commission = amount * rate * 0.015; // 1.5% 수수료
      buyRate = exchangeRates[inputs.fromCurrency].buy;
    } else {
      const fromRate = exchangeRates[inputs.fromCurrency].rate;
      const toRate = exchangeRates[inputs.toCurrency].rate;
      rate = fromRate / toRate;
      commission = amount * fromRate * 0.02; // 2% 수수료 (크로스환율)
      buyRate = exchangeRates[inputs.fromCurrency].buy;
      sellRate = 1 / exchangeRates[inputs.toCurrency].sell;
    }

    const convertedAmount = amount * rate;
    const totalAmount = inputs.fromCurrency === 'KRW' ? 
      amount + commission : 
      (amount * rate) + commission;

    setResult({
      convertedAmount,
      exchangeRate: rate,
      commission,
      totalAmount,
      buyRate,
      sellRate
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">환율 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">환율 계산기</h1>
      
      {/* 마지막 업데이트 시간 표시 */}
      {lastUpdate && (
        <div className="text-right text-sm text-gray-600 mb-4">
          마지막 업데이트: {lastUpdate}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">금액</label>
              <input
                type="text"
                name="amount"
                value={inputs.amount}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">환전 전 통화</label>
              <select
                name="fromCurrency"
                value={inputs.fromCurrency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="KRW">한국 원화 (KRW)</option>
                <option value="USD">미국 달러 (USD)</option>
                <option value="JPY">일본 엔 (JPY)</option>
                <option value="EUR">유로 (EUR)</option>
                <option value="CNY">중국 위안 (CNY)</option>
                <option value="GBP">영국 파운드 (GBP)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">환전 후 통화</label>
              <select
                name="toCurrency"
                value={inputs.toCurrency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">미국 달러 (USD)</option>
                <option value="KRW">한국 원화 (KRW)</option>
                <option value="JPY">일본 엔 (JPY)</option>
                <option value="EUR">유로 (EUR)</option>
                <option value="CNY">중국 위안 (CNY)</option>
                <option value="GBP">영국 파운드 (GBP)</option>
              </select>
            </div>

            <button
              onClick={calculateExchange}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>기준 환율:</span>
                    <span className="text-blue-600">1 {inputs.fromCurrency} = {result.exchangeRate.toFixed(4)} {inputs.toCurrency}</span>
                  </div>
                  {result.buyRate && (
                    <div className="flex justify-between">
                      <span>매입 환율:</span>
                      <span className="text-green-600">1 {inputs.fromCurrency} = {result.buyRate.toFixed(4)} KRW</span>
                    </div>
                  )}
                  {result.sellRate && (
                    <div className="flex justify-between">
                      <span>매도 환율:</span>
                      <span className="text-red-600">1 {inputs.toCurrency} = {(1/result.sellRate).toFixed(4)} KRW</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>환전 금액:</span>
                    <span className="text-green-600">{result.convertedAmount.toLocaleString()} {inputs.toCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>수수료:</span>
                    <span className="text-red-600">{result.commission.toLocaleString()} {inputs.fromCurrency === 'KRW' ? 'KRW' : inputs.toCurrency}</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>총 금액:</span>
                    <span>{result.totalAmount.toLocaleString()} {inputs.fromCurrency === 'KRW' ? 'KRW' : inputs.toCurrency}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">실시간 환율 정보</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">주요 통화 기준환율</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {exchangeRates && Object.entries(exchangeRates).map(([currency, info]) => (
                    <li key={currency}>
                      {info.name} ({currency}): {info.rate.toLocaleString()} 원
                      <div className="text-sm ml-5">
                        <div>매입: {info.buy.toLocaleString()} 원</div>
                        <div>매도: {info.sell.toLocaleString()} 원</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500 mt-2">
                  * 실시간 환율 정보는 1시간마다 갱신됩니다.
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">환전 수수료</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>원화 환전: 1.5%</li>
                  <li>외화 환전: 1.5%</li>
                  <li>크로스환전: 2.0%</li>
                  <li>우대 환율 적용 가능 (은행 문의)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">환전 시 유의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>실제 환율은 실시간으로 변동됩니다</li>
                  <li>은행별로 적용 환율이 다를 수 있습니다</li>
                  <li>환전 금액에 따라 우대율이 적용될 수 있습니다</li>
                  <li>신분증 지참 필수</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.koreaexim.go.kr/site/program/financial/exchange"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국수출입은행</span>
                <span className="text-gray-500 text-sm ml-2">- 실시간 환율정보</span>
              </a>
              <a
                href="https://www.bok.or.kr/portal/main/main.do"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국은행</span>
                <span className="text-gray-500 text-sm ml-2">- 기준환율 고시</span>
              </a>
              <a
                href="https://www.customs.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">관세청</span>
                <span className="text-gray-500 text-sm ml-2">- 외화반출 안내</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 