'use client';

import React, { useState } from 'react';

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const activityLevels = {
    sedentary: { label: '거의 운동하지 않음', factor: 1.2 },
    light: { label: '가벼운 운동 (주 1-3회)', factor: 1.375 },
    moderate: { label: '중간 강도 운동 (주 3-5회)', factor: 1.55 },
    active: { label: '활발한 운동 (주 6-7회)', factor: 1.725 },
    veryActive: { label: '매우 활발한 운동 (매일 2회)', factor: 1.9 }
  };

  const calculateCalories = () => {
    if (!age || !weight || !height) return;

    // Harris-Benedict 공식 사용
    let bmr;
    if (gender === 'male') {
      bmr = 66 + (13.7 * parseFloat(weight)) + (5 * parseFloat(height)) - (6.8 * parseFloat(age));
    } else {
      bmr = 655 + (9.6 * parseFloat(weight)) + (1.8 * parseFloat(height)) - (4.7 * parseFloat(age));
    }

    // 활동량에 따른 일일 필요 칼로리 계산
    const maintenance = bmr * activityLevels[activityLevel as keyof typeof activityLevels].factor;

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(maintenance - 500), // 주당 0.5kg 감량
      weightGain: Math.round(maintenance + 500), // 주당 0.5kg 증량
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">칼로리 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">신체 정보 입력</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">나이</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 30"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">성별</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">남성</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">여성</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">체중 (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 70"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">신장 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 170"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">활동량</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(activityLevels).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={calculateCalories}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              계산하기
            </button>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>기초대사량:</span>
                    <span>{result.bmr.toLocaleString()} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>유지 칼로리:</span>
                    <span className="font-semibold text-blue-600">{result.maintenance.toLocaleString()} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>감량 칼로리:</span>
                    <span>{result.weightLoss.toLocaleString()} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>증량 칼로리:</span>
                    <span>{result.weightGain.toLocaleString()} kcal</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 및 정보 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">칼로리 계산 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">기초대사량(BMR)이란?</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">
                    기초대사량은 생명을 유지하는데 필요한 최소한의 에너지량으로, 심장박동, 호흡, 체온유지 등에 사용되는 열량입니다.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">활동량 수준 설명</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>거의 운동하지 않음: 사무직 등 활동량이 매우 적은 경우</li>
                    <li>가벼운 운동: 주 1-3회 가벼운 운동을 하는 경우</li>
                    <li>중간 강도 운동: 주 3-5회 적절한 운동을 하는 경우</li>
                    <li>활발한 운동: 주 6-7회 강도 높은 운동을 하는 경우</li>
                    <li>매우 활발한 운동: 하루 2회 이상 운동하거나 육체노동을 하는 경우</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">체중 조절 시 주의사항</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>일반적으로 1주일에 0.5-1kg의 감량이 건강한 속도입니다.</li>
                    <li>하루 500kcal 감소 시 일주일에 약 0.5kg 감량이 가능합니다.</li>
                    <li>급격한 칼로리 제한은 건강에 해로울 수 있으니 전문가와 상담하세요.</li>
                    <li>운동과 균형 잡힌 식단을 함께 병행하는 것이 좋습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.foodsafetykorea.go.kr/main.do"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">식품안전나라</span>
                <span className="text-gray-500 text-sm ml-2">- 영양성분 데이터베이스</span>
              </a>
              <a
                href="https://www.kdca.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">질병관리청</span>
                <span className="text-gray-500 text-sm ml-2">- 영양 섭취 기준</span>
              </a>
              <a
                href="https://www.kdaedu.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">대한영양사협회</span>
                <span className="text-gray-500 text-sm ml-2">- 영양 정보</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 