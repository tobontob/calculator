'use client';

import { useState } from 'react';

interface ExchangeRate {
  currency: string;
  name: string;
  rate: number;
}

const exchangeRates: ExchangeRate[] = [
  { currency: 'USD', name: '미국 달러', rate: 1340.50 },
  { currency: 'EUR', name: '유로', rate: 1450.80 },
  { currency: 'JPY', name: '일본 엔', rate: 9.15 },
  { currency: 'CNY', name: '중국 위안', rate: 186.20 },
  { currency: 'GBP', name: '영국 파운드', rate: 1690.30 },
  { currency: 'AUD', name: '호주 달러', rate: 880.50 },
  { currency: 'CAD', name: '캐나다 달러', rate: 990.40 },
  { currency: 'HKD', name: '홍콩 달러', rate: 171.30 },
  { currency: 'TWD', name: '대만 달러', rate: 42.80 },
  { currency: 'SGD', name: '싱가포르 달러', rate: 995.60 },
];

export default function ExchangeCalculator() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('KRW');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState<number | null>(null);

  const calculateExchange = () => {
    const inputAmount = parseFloat(amount);

    if (isNaN(inputAmount)) {
      alert('금액을 올바르게 입력해주세요.');
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(inputAmount);
      return;
    }

    if (fromCurrency === 'KRW') {
      const targetRate = exchangeRates.find(rate => rate.currency === toCurrency)?.rate || 1;
      setResult(inputAmount / targetRate);
    } else if (toCurrency === 'KRW') {
      const sourceRate = exchangeRates.find(rate => rate.currency === fromCurrency)?.rate || 1;
      setResult(inputAmount * sourceRate);
    } else {
      const sourceRate = exchangeRates.find(rate => rate.currency === fromCurrency)?.rate || 1;
      const targetRate = exchangeRates.find(rate => rate.currency === toCurrency)?.rate || 1;
      setResult((inputAmount * sourceRate) / targetRate);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'JPY': return '¥';
      case 'GBP': return '£';
      case 'KRW': return '₩';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">환율 계산기</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              금액
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="금액을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              환전 전 통화
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="KRW">대한민국 원화 (KRW)</option>
              {exchangeRates.map(rate => (
                <option key={rate.currency} value={rate.currency}>
                  {rate.name} ({rate.currency})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              환전 후 통화
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="KRW">대한민국 원화 (KRW)</option>
              {exchangeRates.map(rate => (
                <option key={rate.currency} value={rate.currency}>
                  {rate.name} ({rate.currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateExchange}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">환전 결과</h2>
          <div className="p-4 bg-gray-50 rounded">
            <div className="text-center">
              <p className="text-lg">
                {formatNumber(parseFloat(amount))} {getCurrencySymbol(fromCurrency)}{fromCurrency}
              </p>
              <p className="text-gray-500 my-2">↓</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(result)} {getCurrencySymbol(toCurrency)}{toCurrency}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">주요 통화 환율 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exchangeRates.map(rate => (
            <div key={rate.currency} className="p-3 bg-gray-50 rounded">
              <p className="font-medium">{rate.name} ({rate.currency})</p>
              <p className="text-lg font-semibold">₩{formatNumber(rate.rate)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          * 환율은 예시이며, 실제 환율과 다를 수 있습니다. 실제 환전 시에는 해당 금융기관의 환율을 확인하세요.
        </p>
      </div>
    </div>
  );
} 