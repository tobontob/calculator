'use client';

import { useState } from 'react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, category?: string) => {
    const { name, value } = e.target;
    
    if (category) {
      setInputs(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof StartupCostInputs],
          [name]: value
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

  const calculateCost = () => {
    // 초기 비용 계산
    const initialCostValues = Object.entries(inputs.initialCosts).map(([key, value]) => ({
      category: key,
      amount: parseFloat(value.replace(/,/g, '')) || 0
    }));
    
    const totalInitialCost = initialCostValues.reduce((sum, item) => sum + item.amount, 0);

    // 월 고정비용 계산
    const monthlyExpenseValues = Object.entries(inputs.monthlyExpenses).map(([key, value]) => ({
      category: key,
      amount: parseFloat(value.replace(/,/g, '')) || 0
    }));
    
    const totalMonthlyExpense = monthlyExpenseValues.reduce((sum, item) => sum + item.amount, 0);

    // 준비기간 동안의 비용 계산
    const preparationPeriod = parseInt(inputs.preparationPeriod) || 3;
    const totalPreparationCost = totalMonthlyExpense * preparationPeriod;

    // 총 창업비용
    const totalStartupCost = totalInitialCost + totalPreparationCost;

    // 비용 항목별 비중 계산
    const breakdown = [
      ...initialCostValues.map(item => ({
        category: getCategoryName(item.category),
        amount: item.amount,
        percentage: (item.amount / totalStartupCost) * 100
      })),
      ...monthlyExpenseValues.map(item => ({
        category: getCategoryName(item.category),
        amount: item.amount * preparationPeriod,
        percentage: (item.amount * preparationPeriod / totalStartupCost) * 100
      }))
    ];

    setResult({
      totalInitialCost,
      totalMonthlyExpense,
      totalPreparationCost,
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">창업비용 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">초기 투자비용</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              보증금 (원)
            </label>
            <input
              type="text"
              name="deposit"
              value={inputs.initialCosts.deposit}
              onChange={(e) => handleInputChange(e, 'initialCosts')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="보증금을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              인테리어 비용 (원)
            </label>
            <input
              type="text"
              name="interiorCost"
              value={inputs.initialCosts.interiorCost}
              onChange={(e) => handleInputChange(e, 'initialCosts')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="인테리어 비용을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설비/장비 구입비 (원)
            </label>
            <input
              type="text"
              name="equipmentCost"
              value={inputs.initialCosts.equipmentCost}
              onChange={(e) => handleInputChange(e, 'initialCosts')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="설비/장비 구입비를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              인허가/등록비용 (원)
            </label>
            <input
              type="text"
              name="licenseFee"
              value={inputs.initialCosts.licenseFee}
              onChange={(e) => handleInputChange(e, 'initialCosts')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="인허가/등록비용을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              초기 재고비용 (원)
            </label>
            <input
              type="text"
              name="initialInventory"
              value={inputs.initialCosts.initialInventory}
              onChange={(e) => handleInputChange(e, 'initialCosts')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="초기 재고비용을 입력하세요"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">월 고정비용</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              임대료 (원/월)
            </label>
            <input
              type="text"
              name="rent"
              value={inputs.monthlyExpenses.rent}
              onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="월 임대료를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공과금 (원/월)
            </label>
            <input
              type="text"
              name="utilities"
              value={inputs.monthlyExpenses.utilities}
              onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="월 공과금을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              인건비 (원/월)
            </label>
            <input
              type="text"
              name="laborCost"
              value={inputs.monthlyExpenses.laborCost}
              onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="월 인건비를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              보험료 (원/월)
            </label>
            <input
              type="text"
              name="insurance"
              value={inputs.monthlyExpenses.insurance}
              onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="월 보험료를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              마케팅비 (원/월)
            </label>
            <input
              type="text"
              name="marketing"
              value={inputs.monthlyExpenses.marketing}
              onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="월 마케팅비를 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기타 경비 (원/월)
            </label>
            <input
              type="text"
              name="miscellaneous"
              value={inputs.monthlyExpenses.miscellaneous}
              onChange={(e) => handleInputChange(e, 'monthlyExpenses')}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="월 기타 경비를 입력하세요"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            준비기간 (개월)
          </label>
          <select
            name="preparationPeriod"
            value={inputs.preparationPeriod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
              <option key={num} value={num}>{num}개월</option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateCost}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">창업비용 계산 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">총 초기 투자비용</p>
              <p className="text-xl font-bold text-blue-600">{formatNumber(result.totalInitialCost)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">월 고정비용</p>
              <p className="text-xl font-bold text-green-600">{formatNumber(result.totalMonthlyExpense)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">준비기간 운영비용</p>
              <p className="text-xl font-bold text-purple-600">{formatNumber(result.totalPreparationCost)}원</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">총 창업비용</p>
              <p className="text-xl font-bold text-red-600">{formatNumber(result.totalStartupCost)}원</p>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3">비용 항목별 비중</h3>
          <div className="space-y-2">
            {result.breakdown.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-1/3">{item.category}</div>
                <div className="w-1/3 text-right">{formatNumber(item.amount)}원</div>
                <div className="w-1/3 text-right">{item.percentage.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>초기 투자비용은 사업 시작 전 한 번 들어가는 비용입니다.</li>
          <li>월 고정비용은 매월 반복적으로 발생하는 비용입니다.</li>
          <li>준비기간은 매출이 발생하기 전까지 필요한 기간입니다.</li>
          <li>업종과 규모에 따라 실제 비용은 크게 달라질 수 있습니다.</li>
          <li>예상치 못한 비용이 발생할 수 있으니 여유자금을 확보하세요.</li>
          <li>정확한 비용 산정을 위해 전문가와 상담하시기 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
} 