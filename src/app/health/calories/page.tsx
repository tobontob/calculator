'use client';

import { useState } from 'react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const activityMultipliers = {
    sedentary: 1.2, // 거의 운동하지 않음
    light: 1.375, // 가벼운 운동 (주 1-3회)
    moderate: 1.55, // 보통 수준 (주 3-5회)
    active: 1.725, // 활동적 (주 6-7회)
    very_active: 1.9, // 매우 활동적 (하루 2회 이상)
  };

  const activityLabels = {
    sedentary: '거의 운동하지 않음',
    light: '가벼운 운동 (주 1-3회)',
    moderate: '보통 수준 (주 3-5회)',
    active: '활동적 (주 6-7회)',
    very_active: '매우 활동적 (하루 2회 이상)',
  };

  const calculateCalories = () => {
    if (!age || !weight || !height) return;

    // Harris-Benedict 공식 사용
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);

    // BMR (기초대사량) 계산
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears);
    }

    // 활동량에 따른 일일 필요 칼로리
    const maintenance = bmr * activityMultipliers[activityLevel];

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
              <label className="block text-gray-700 mb-2">나이</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="나이를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">체중 (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="체중을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">신장 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="신장을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">활동량</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(activityLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
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
                    <li>보통 수준: 주 3-5회 적절한 운동을 하는 경우</li>
                    <li>활동적: 주 6-7회 강도 높은 운동을 하는 경우</li>
                    <li>매우 활동적: 하루 2회 이상 운동하거나 육체노동을 하는 경우</li>
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
                href="https://www.dietitian.or.kr"
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