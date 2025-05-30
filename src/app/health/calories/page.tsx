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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">칼로리 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            성별
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="mr-2"
              />
              남성
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="mr-2"
              />
              여성
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            나이
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="나이를 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            체중 (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="체중을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            신장 (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="신장을 입력하세요"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            활동량
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="text-lg">
              기초대사량: <span className="font-semibold">{result.bmr} kcal</span>
            </p>
            <p className="text-lg">
              유지 칼로리: <span className="font-semibold">{result.maintenance} kcal</span>
            </p>
            <p className="text-lg">
              감량 칼로리: <span className="font-semibold">{result.weightLoss} kcal</span>
              <span className="text-sm text-gray-500 ml-2">(주당 0.5kg 감량)</span>
            </p>
            <p className="text-lg">
              증량 칼로리: <span className="font-semibold">{result.weightGain} kcal</span>
              <span className="text-sm text-gray-500 ml-2">(주당 0.5kg 증량)</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 