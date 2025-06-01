'use client';

import { useState } from 'react';

interface WorkPeriod {
  startDate: string;
  endDate: string;
}

interface SeveranceResult {
  years: number;
  months: number;
  days: number;
  severancePay: number;
  averageMonthlyWage: number;
}

export default function SeveranceCalculator() {
  const [workPeriod, setWorkPeriod] = useState<WorkPeriod>({
    startDate: '',
    endDate: '',
  });
  const [monthlyWage, setMonthlyWage] = useState('');
  const [result, setResult] = useState<SeveranceResult | null>(null);

  const calculateWorkPeriod = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    return { years, months, days };
  };

  const calculateSeverancePay = () => {
    if (!workPeriod.startDate || !workPeriod.endDate || !monthlyWage) return;

    const startDate = new Date(workPeriod.startDate);
    const endDate = new Date(workPeriod.endDate);
    const averageMonthlyWage = parseFloat(monthlyWage);

    if (endDate <= startDate) {
      alert('퇴사일이 입사일보다 빠를 수 없습니다.');
      return;
    }

    const { years, months, days } = calculateWorkPeriod(startDate, endDate);
    const totalYears = years + (months / 12) + (days / 365);

    // 1년 미만 근무시 퇴직금 없음
    if (totalYears < 1) {
      setResult({
        years,
        months,
        days,
        severancePay: 0,
        averageMonthlyWage
      });
      return;
    }

    // 퇴직금 = 평균임금 30일분 × 근속연수
    const severancePay = Math.round((averageMonthlyWage / 30) * 30 * totalYears);

    setResult({
      years,
      months,
      days,
      severancePay,
      averageMonthlyWage
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">퇴직금 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">입사일</label>
              <input
                type="date"
                value={workPeriod.startDate}
                onChange={(e) => setWorkPeriod({ ...workPeriod, startDate: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">퇴사일</label>
              <input
                type="date"
                value={workPeriod.endDate}
                onChange={(e) => setWorkPeriod({ ...workPeriod, endDate: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">평균임금 (원/월)</label>
              <input
                type="number"
                value={monthlyWage}
                onChange={(e) => setMonthlyWage(e.target.value)}
                placeholder="예: 3000000"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateSeverancePay}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">퇴직금 내역</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>근속기간:</span>
                        <span>{result.years}년 {result.months}개월 {result.days}일</span>
                      </div>
                      <div className="flex justify-between">
                        <span>평균임금(월):</span>
                        <span>{result.averageMonthlyWage.toLocaleString()}원</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between font-semibold">
                        <span>예상 퇴직금:</span>
                        <span className="text-blue-600">{result.severancePay.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">퇴직금 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">퇴직금 계산방법</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>퇴직금 = 평균임금 30일분 × 근속연수</li>
                  <li>1년 이상 근무한 근로자에게 지급</li>
                  <li>근속연수는 일할 계산 적용</li>
                  <li>평균임금은 퇴직 전 3개월 기준</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">평균임금 산정기준</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>정기적으로 지급되는 임금</li>
                  <li>상여금 (정기적 지급분)</li>
                  <li>연차수당, 연장근로수당</li>
                  <li>식대, 교통비 등 복리후생비</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">주의사항</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>근로기간이 1년 미만인 경우 퇴직금 미발생</li>
                  <li>실제 퇴직금은 회사 정책에 따라 다를 수 있음</li>
                  <li>중간정산 이력이 있는 경우 별도 계산 필요</li>
                  <li>특수직역 종사자는 별도 기준 적용</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.moel.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">고용노동부</span>
                <span className="text-gray-500 text-sm ml-2">- 퇴직금 제도 안내</span>
              </a>
              <a
                href="https://www.eps.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">고용보험</span>
                <span className="text-gray-500 text-sm ml-2">- 실업급여 안내</span>
              </a>
              <a
                href="https://www.nps.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국민연금공단</span>
                <span className="text-gray-500 text-sm ml-2">- 퇴직연금 제도</span>
              </a>
              <a
                href="https://www.comwel.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">근로복지공단</span>
                <span className="text-gray-500 text-sm ml-2">- 체당금 지원</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 