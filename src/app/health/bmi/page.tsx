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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">체질량 지수(BMI) 계산기</h1>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            키 (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="키를 입력하세요"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            몸무게 (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="몸무게를 입력하세요"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {bmi !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold">
              당신의 체질량 지수(BMI): {bmi}
            </p>
            <p className="text-md mt-2">
              판정: <span className="font-semibold">{status}</span>
            </p>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">BMI 지수 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">BMI 판정 기준 (아시아-태평양 기준)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>저체중: 18.5 미만</li>
                    <li>정상: 18.5 - 22.9</li>
                    <li>과체중: 23.0 - 24.9</li>
                    <li>비만: 25.0 - 29.9</li>
                    <li>고도비만: 30.0 이상</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">
                    * BMI는 체중(kg)을 신장(m)의 제곱으로 나눈 값입니다.<br />
                    * 근육량, 체지방률, 연령, 성별 등은 고려되지 않으므로 전문의와 상담하시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">건강 정보 사이트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="https://health.kdca.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              질병관리청 국민건강영양조사
            </a>
            <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              국민건강보험공단
            </a>
            <a href="https://general.kosso.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              대한비만학회
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 