'use client';

import { useState } from 'react';
import { formatNumber } from '@/utils/format';

interface StartupCostInputs {
  initialCosts: {
    deposit: string;
    interiorCost: string;
    equipmentCost: string;
    licenseFee: string;
    initialInventory: string;
  };
  monthlyExpenses: {
    rent: string;
    utilities: string;
    laborCost: string;
    insurance: string;
    marketing: string;
    miscellaneous: string;
  };
  preparationPeriod: string;
}

interface StartupCostResult {
  totalInitialCost: number;
  totalMonthlyExpense: number;
  totalPreparationCost: number;
  totalStartupCost: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export default function StartupCostCalculator() {
  const [inputs, setInputs] = useState<StartupCostInputs>({
    initialCosts: {
      deposit: '',
      interiorCost: '',
      equipmentCost: '',
      licenseFee: '',
      initialInventory: '',
    },
    monthlyExpenses: {
      rent: '',
      utilities: '',
      laborCost: '',
      insurance: '',
      marketing: '',
      miscellaneous: '',
    },
    preparationPeriod: '3',
  });

  const [result, setResult] = useState<StartupCostResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, category?: 'initialCosts' | 'monthlyExpenses') => {
    const { name, value } = e.target;
    
    if (category) {
      setInputs(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [name]: formatNumber(value)
        }
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setResult(null);
  };

  const calculateStartupCost = () => {
    // 초기 투자비용 계산
    const initialCosts = Object.values(inputs.initialCosts).reduce((acc, curr) => {
      return acc + (parseFloat(curr.replace(/,/g, '')) || 0);
    }, 0);

    // 월 운영비용 계산
    const monthlyExpenses = Object.values(inputs.monthlyExpenses).reduce((acc, curr) => {
      return acc + (parseFloat(curr.replace(/,/g, '')) || 0);
    }, 0);

    // 준비기간 동안의 비용 계산
    const preparationPeriod = parseInt(inputs.preparationPeriod) || 3;
    const preparationCost = monthlyExpenses * preparationPeriod;

    // 총 창업비용
    const totalStartupCost = initialCosts + preparationCost;

    // 비용 항목별 비중 계산
    const breakdown = [
      ...Object.entries(inputs.initialCosts).map(([key, value]) => ({
        category: getCategoryName(key),
        amount: parseFloat(value.replace(/,/g, '')) || 0,
        percentage: ((parseFloat(value.replace(/,/g, '')) || 0) / totalStartupCost) * 100
      })),
      ...Object.entries(inputs.monthlyExpenses).map(([key, value]) => ({
        category: getCategoryName(key),
        amount: (parseFloat(value.replace(/,/g, '')) || 0) * preparationPeriod,
        percentage: ((parseFloat(value.replace(/,/g, '')) || 0) * preparationPeriod / totalStartupCost) * 100
      }))
    ];

    setResult({
      totalInitialCost: initialCosts,
      totalMonthlyExpense: monthlyExpenses,
      totalPreparationCost: preparationCost,
      totalStartupCost,
      breakdown
    });
  };

  const getCategoryName = (key: string): string => {
    const categoryNames: { [key: string]: string } = {
      deposit: '보증금',
      interiorCost: '인테리어 비용',
      equipmentCost: '설비/장비 구입비',
      licenseFee: '인허가/등록비용',
      initialInventory: '초기 재고비용',
      rent: '임대료',
      utilities: '공과금',
      laborCost: '인건비',
      insurance: '보험료',
      marketing: '마케팅비',
      miscellaneous: '기타 경비'
    };
    return categoryNames[key] || key;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">창업비용 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">초기 투자비용</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">보증금 (원)</label>
                  <input
                    type="text"
                    name="deposit"
                    value={inputs.initialCosts.deposit}
                    onChange={(e) => handleInputChange(e, 'initialCosts')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">인테리어 비용 (원)</label>
                  <input
                    type="text"
                    name="interiorCost"
                    value={inputs.initialCosts.interiorCost}
                    onChange={(e) => handleInputChange(e, 'initialCosts')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">설비/장비 구입비 (원)</label>
                  <input
                    type="text"
                    name="equipmentCost"
                    value={inputs.initialCosts.equipmentCost}
                    onChange={(e) => handleInputChange(e, 'initialCosts')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">인허가/등록비용 (원)</label>
                  <input
                    type="text"
                    name="licenseFee"
                    value={inputs.initialCosts.licenseFee}
                    onChange={(e) => handleInputChange(e, 'initialCosts')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">초기 재고비용 (원)</label>
                  <input
                    type="text"
                    name="initialInventory"
                    value={inputs.initialCosts.initialInventory}
                    onChange={(e) => handleInputChange(e, 'initialCosts')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">월 운영비용</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">임대료 (원)</label>
                  <input
                    type="text"
                    name="rent"
                    value={inputs.monthlyExpenses.rent}
                    onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">공과금 (원)</label>
                  <input
                    type="text"
                    name="utilities"
                    value={inputs.monthlyExpenses.utilities}
                    onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">인건비 (원)</label>
                  <input
                    type="text"
                    name="laborCost"
                    value={inputs.monthlyExpenses.laborCost}
                    onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">보험료 (원)</label>
                  <input
                    type="text"
                    name="insurance"
                    value={inputs.monthlyExpenses.insurance}
                    onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">마케팅비 (원)</label>
                  <input
                    type="text"
                    name="marketing"
                    value={inputs.monthlyExpenses.marketing}
                    onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">기타 경비 (원)</label>
                  <input
                    type="text"
                    name="miscellaneous"
                    value={inputs.monthlyExpenses.miscellaneous}
                    onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
                    placeholder="0"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">준비기간 (개월)</label>
              <input
                type="text"
                name="preparationPeriod"
                value={inputs.preparationPeriod}
                onChange={handleInputChange}
                placeholder="3"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={calculateStartupCost}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">계산 결과</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>초기 투자비용:</span>
                    <span className="text-blue-600">{result.totalInitialCost.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월 운영비용:</span>
                    <span className="text-green-600">{result.totalMonthlyExpense.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>준비기간 운영비용:</span>
                    <span className="text-purple-600">{result.totalPreparationCost.toLocaleString()}원</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>총 창업비용:</span>
                    <span className="text-red-600">{result.totalStartupCost.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">비용 항목별 비중</h3>
                  <div className="space-y-1 text-sm">
                    {result.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.category}:</span>
                        <span>
                          {item.amount.toLocaleString()}원 ({item.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 정보 및 안내 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">창업비용 안내</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">초기 투자비용</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>보증금: 임대차 계약 시 필요한 보증금</li>
                  <li>인테리어: 매장/사무실 인테리어 공사비용</li>
                  <li>설비/장비: 영업에 필요한 설비 및 장비 구입비</li>
                  <li>인허가/등록: 사업자등록, 인허가 등 행정비용</li>
                  <li>초기재고: 영업 시작을 위한 초기 재고 구입비</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">월 운영비용</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>임대료: 월 임대료 및 관리비</li>
                  <li>공과금: 전기, 수도, 가스, 통신비 등</li>
                  <li>인건비: 직원 급여 및 4대보험료</li>
                  <li>보험료: 화재보험, 영업배상책임보험 등</li>
                  <li>마케팅비: 광고, 판촉, 홍보 비용</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-blue-600 mb-2">준비기간</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>오픈 전 준비기간 동안의 운영비용 고려</li>
                  <li>일반적으로 3~6개월 준비기간 필요</li>
                  <li>업종별로 준비기간이 다를 수 있음</li>
                  <li>초기 수익 창출까지 운영자금 확보 필요</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.k-startup.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">K-스타트업</span>
                <span className="text-gray-500 text-sm ml-2">- 창업지원 정보</span>
              </a>
              <a
                href="https://www.semas.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">소상공인진흥공단</span>
                <span className="text-gray-500 text-sm ml-2">- 자금지원</span>
              </a>
              <a
                href="https://www.mss.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">중소벤처기업부</span>
                <span className="text-gray-500 text-sm ml-2">- 정책정보</span>
              </a>
              <a
                href="https://www.sbiz.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">기업마당</span>
                <span className="text-gray-500 text-sm ml-2">- 창업교육</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 