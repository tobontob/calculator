'use client';

import React, { useState } from 'react';

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [calories, setCalories] = useState<number | null>(null);

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
    const dailyCalories = bmr * activityLevels[activityLevel as keyof typeof activityLevels].factor;
    setCalories(Math.round(dailyCalories));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">칼로리 계산기</h1>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
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
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
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

          {calories !== null && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">일일 필요 칼로리</h2>
              <p className="text-gray-700">
                하루에 약 <span className="font-bold text-xl">{calories}</span> kcal가 필요합니다.
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <p>• 체중 감량을 위해서는: {calories - 500} kcal</p>
                <p>• 체중 증가를 위해서는: {calories + 500} kcal</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 