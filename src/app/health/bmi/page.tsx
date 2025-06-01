'use client';

import { useState } from 'react';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    // BMI 상태 판정
    if (bmiValue < 18.5) setStatus('저체중');
    else if (bmiValue < 23) setStatus('정상');
    else if (bmiValue < 25) setStatus('과체중');
    else if (bmiValue < 30) setStatus('비만');
    else setStatus('고도비만');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">체질량 지수(BMI) 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">신체 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">키 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="키를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">몸무게 (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="몸무게를 입력하세요"
              />
            </div>

            <button
              onClick={calculateBMI}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {bmi !== null && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>BMI:</span>
                    <span>{bmi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>판정:</span>
                    <span className="font-semibold text-blue-600">{status}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">BMI 지수 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">BMI 판정 기준 (아시아-태평양 기준)</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>저체중: 18.5 미만</li>
                      <li>정상: 18.5 - 22.9</li>
                      <li>과체중: 23.0 - 24.9</li>
                      <li>비만: 25.0 - 29.9</li>
                      <li>고도비만: 30.0 이상</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium mb-2">BMI 계산 방법</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>BMI = 체중(kg) ÷ (신장(m) × 신장(m))</li>
                      <li>근육량, 체지방률, 연령, 성별 등은 고려되지 않음</li>
                      <li>정확한 건강 상태 평가를 위해서는 전문의와 상담 필요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://health.kdca.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">질병관리청</span>
                <span className="text-gray-500 text-sm ml-2">- 국민건강영양조사</span>
              </a>
              <a
                href="https://www.nhis.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">국민건강보험공단</span>
                <span className="text-gray-500 text-sm ml-2">- 건강검진 정보</span>
              </a>
              <a
                href="https://general.kosso.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">대한비만학회</span>
                <span className="text-gray-500 text-sm ml-2">- 비만 관리 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 