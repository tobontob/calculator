'use client';

import { useState } from 'react';
import { formatNumber, parseNumber } from '@/utils/format';

interface CalculationResult {
  overdueInterest: number;
  dailyInterest: number;
  totalAmount: number;
  dailySchedule: {
    day: number;
    interest: number;
    accumulatedInterest: number;
    totalAmount: number;
  }[];
}

export default function OverdueCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [overdueDays, setOverdueDays] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateOverdueInterest = () => {
    const amount = parseFloat(principal.replace(/,/g, ''));
    const annualRate = parseFloat(interestRate);
    const days = parseInt(overdueDays);
    const dailyRate = annualRate / 365 / 100;

    if (isNaN(amount) || isNaN(annualRate) || isNaN(days)) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const dailyInterest = amount * dailyRate;
    const overdueInterest = dailyInterest * days;
    const dailySchedule = [];
    let accumulatedInterest = 0;

    for (let i = 1; i <= days; i++) {
      accumulatedInterest += dailyInterest;
      dailySchedule.push({
        day: i,
        interest: dailyInterest,
        accumulatedInterest: accumulatedInterest,
        totalAmount: amount + accumulatedInterest
      });
    }

    setResult({
      overdueInterest,
      dailyInterest,
      totalAmount: amount + overdueInterest,
      dailySchedule
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">연체이자 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">연체금액 (원)</label>
              <input
                type="text"
                value={principal}
                onChange={(e) => setPrincipal(formatNumber(e.target.value))}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">연체이자율 (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">연체일수</label>
              <input
                type="number"
                value={overdueDays}
                onChange={(e) => setOverdueDays(e.target.value)}
                placeholder="0"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateOverdueInterest}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>일일 발생이자:</span>
                    <span className="text-blue-600">{result.dailyInterest.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 연체이자:</span>
                    <span className="text-red-600">{result.overdueInterest.toLocaleString()}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>총 납부금액:</span>
                    <span>{result.totalAmount.toLocaleString()}원</span>
                  </div>
                </div>

                {result.dailySchedule.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">일자별 이자 내역</h3>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 text-left">연체일수</th>
                            <th className="p-2 text-right">누적이자</th>
                            <th className="p-2 text-right">총 금액</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.dailySchedule.map((item) => (
                            <tr key={item.day} className="border-b">
                              <td className="p-2">{item.day}일</td>
                              <td className="p-2 text-right">{item.accumulatedInterest.toLocaleString()}원</td>
                              <td className="p-2 text-right">{item.totalAmount.toLocaleString()}원</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">연체이자 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">연체이자 계산방법</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일일 연체이자 = 연체금액 × (연체이자율 ÷ 365)</li>
                  <li>총 연체이자 = 일일 연체이자 × 연체일수</li>
                  <li>총 납부금액 = 연체금액 + 총 연체이자</li>
                  <li>연체이자는 일단위로 계산됩니다.</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">연체이자율 기준</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>일반 대출: 약정이자율 + 3%</li>
                  <li>신용카드: 연 20~24%</li>
                  <li>현금서비스: 연 20~24%</li>
                  <li>할부금: 연 20~24%</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">연체 시 불이익</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>연체정보 등록 및 신용등급 하락</li>
                  <li>추심 및 법적조치 가능성</li>
                  <li>향후 대출 및 신용카드 발급 제한</li>
                  <li>연체가산이자 추가 부과</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">금융감독원</span>
                <span className="text-gray-500 text-sm ml-2">- 금융소비자 보호</span>
              </a>
              <a
                href="https://www.credit.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">신용회복위원회</span>
                <span className="text-gray-500 text-sm ml-2">- 채무조정</span>
              </a>
              <a
                href="https://www.ccrs.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">서민금융진흥원</span>
                <span className="text-gray-500 text-sm ml-2">- 서민금융지원</span>
              </a>
              <a
                href="https://www.kfb.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">은행연합회</span>
                <span className="text-gray-500 text-sm ml-2">- 금융정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 