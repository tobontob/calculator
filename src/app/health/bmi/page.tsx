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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">BMI 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
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
              당신의 BMI: {bmi}
            </p>
            <p className="text-md mt-2">
              판정: <span className="font-semibold">{status}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 