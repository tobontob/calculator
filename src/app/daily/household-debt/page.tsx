'use client';

import { useState } from 'react';

interface DebtItem {
  id: string;
  name: string;
  amount: number;
  interestRate: number;
  monthlyPayment: number;
}

interface CalculationResult {
  totalDebt: number;
  totalMonthlyPayment: number;
  debtToIncomeRatio: number;
  payoffSchedule: {
    month: number;
    remainingDebt: number;
    totalInterest: number;
    monthlyPayment: number;
  }[];
}

export default function HouseholdDebtCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [debts, setDebts] = useState<DebtItem[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // 새로운 부채 입력을 위한 상태
  const [newDebt, setNewDebt] = useState({
    name: '',
    amount: '',
    interestRate: '',
    monthlyPayment: ''
  });

  const addDebt = () => {
    if (!newDebt.name || !newDebt.amount || !newDebt.interestRate || !newDebt.monthlyPayment) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const debtItem: DebtItem = {
      id: Date.now().toString(),
      name: newDebt.name,
      amount: parseFloat(newDebt.amount),
      interestRate: parseFloat(newDebt.interestRate),
      monthlyPayment: parseFloat(newDebt.monthlyPayment)
    };

    setDebts([...debts, debtItem]);
    setNewDebt({ name: '', amount: '', interestRate: '', monthlyPayment: '' });
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const calculateDebtRepayment = () => {
    const income = parseFloat(monthlyIncome);
    if (isNaN(income) || debts.length === 0) {
      alert('월 소득과 부채 정보를 입력해주세요.');
      return;
    }

    const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
    const totalMonthlyPayment = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
    const debtToIncomeRatio = (totalMonthlyPayment / income) * 100;

    // 부채 상환 스케줄 계산
    const payoffSchedule = [];
    let remainingDebts = [...debts];
    let month = 1;
    let totalRemainingDebt = totalDebt;
    let accumulatedInterest = 0;

    while (totalRemainingDebt > 0 && month <= 360) { // 최대 30년
      let monthlyInterest = 0;
      remainingDebts = remainingDebts.map(debt => {
        const monthlyRate = debt.interestRate / 12 / 100;
        const interest = debt.amount * monthlyRate;
        monthlyInterest += interest;
        
        const principal = Math.min(debt.monthlyPayment - interest, debt.amount);
        return {
          ...debt,
          amount: Math.max(0, debt.amount - principal)
        };
      });

      totalRemainingDebt = remainingDebts.reduce((sum, debt) => sum + debt.amount, 0);
      accumulatedInterest += monthlyInterest;

      payoffSchedule.push({
        month,
        remainingDebt: totalRemainingDebt,
        totalInterest: accumulatedInterest,
        monthlyPayment: totalMonthlyPayment
      });

      month++;
    }

    setResult({
      totalDebt,
      totalMonthlyPayment,
      debtToIncomeRatio,
      payoffSchedule
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">가계부채 상환 계산기</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            월 소득 (원)
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="월 소득을 입력하세요"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">부채 정보 입력</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                부채 종류
              </label>
              <input
                type="text"
                value={newDebt.name}
                onChange={(e) => setNewDebt({...newDebt, name: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 주택담보대출"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대출금액 (원)
              </label>
              <input
                type="number"
                value={newDebt.amount}
                onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="대출금액을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연이자율 (%)
              </label>
              <input
                type="number"
                value={newDebt.interestRate}
                onChange={(e) => setNewDebt({...newDebt, interestRate: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="연이자율을 입력하세요"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월 상환금액 (원)
              </label>
              <input
                type="number"
                value={newDebt.monthlyPayment}
                onChange={(e) => setNewDebt({...newDebt, monthlyPayment: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="월 상환금액을 입력하세요"
              />
            </div>
          </div>
          <button
            onClick={addDebt}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            부채 추가
          </button>
        </div>

        {debts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">등록된 부채 목록</h3>
            <div className="space-y-3">
              {debts.map(debt => (
                <div key={debt.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <p className="font-medium">{debt.name}</p>
                    <p className="text-sm text-gray-600">
                      {formatNumber(debt.amount)}원 / {debt.interestRate}% / 
                      월 {formatNumber(debt.monthlyPayment)}원
                    </p>
                  </div>
                  <button
                    onClick={() => removeDebt(debt.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={calculateDebtRepayment}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">부채 분석 결과</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총 부채액</p>
                <p className="text-xl font-bold">{formatNumber(result.totalDebt)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">월 상환금액</p>
                <p className="text-xl font-bold text-blue-600">{formatNumber(result.totalMonthlyPayment)}원</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">총부채원리금상환비율</p>
                <p className="text-xl font-bold text-red-600">{result.debtToIncomeRatio.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">상환 스케줄</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">기간</th>
                    <th className="px-4 py-2 text-right">잔여 부채</th>
                    <th className="px-4 py-2 text-right">누적 이자</th>
                    <th className="px-4 py-2 text-right">월 상환금액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.payoffSchedule.map((schedule) => (
                    <tr key={schedule.month} className="border-b">
                      <td className="px-4 py-2">{schedule.month}개월</td>
                      <td className="px-4 py-2 text-right">{formatNumber(schedule.remainingDebt)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(schedule.totalInterest)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(schedule.monthlyPayment)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">참고사항</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>총부채원리금상환비율(DSR)은 월 상환금액을 월 소득으로 나눈 비율입니다.</li>
          <li>일반적으로 DSR이 40%를 초과하면 과도한 부채로 간주됩니다.</li>
          <li>여러 부채가 있는 경우, 고금리 부채부터 상환하는 것이 유리합니다.</li>
          <li>실제 대출 상환기간은 중도상환 여부에 따라 달라질 수 있습니다.</li>
          <li>이 계산기는 참고용이며, 실제 대출 조건은 금융기관과 상담하세요.</li>
        </ul>
      </div>
    </div>
  );
} 