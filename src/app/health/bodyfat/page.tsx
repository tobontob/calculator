'use client';

import React from 'react';
import { useState } from 'react';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateBodyFat = () => {
    if (!age || !height || !weight || !neck || !waist || (gender === 'female' && !hip)) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const heightNum = parseFloat(height);
      const waistNum = parseFloat(waist);
      const neckNum = parseFloat(neck);
      const hipNum = gender === 'female' ? parseFloat(hip) : 0;

      if (isNaN(heightNum) || isNaN(waistNum) || isNaN(neckNum) || (gender === 'female' && isNaN(hipNum))) {
        alert('올바른 숫자를 입력해주세요.');
        return;
      }

      // 입력값 유효성 검사
      if (waistNum <= neckNum) {
        alert('허리둘레는 목둘레보다 커야 합니다.');
        return;
      }

      let bodyFat = 0;
      if (gender === 'male') {
        // 남성 체지방률 계산식
        const logValue = Math.log10(waistNum - neckNum);
        const logHeight = Math.log10(heightNum);
        bodyFat = 86.010 * logValue - 70.041 * logHeight + 36.76;
      } else {
        // 여성 체지방률 계산식
        const logValue = Math.log10(waistNum + hipNum - neckNum);
        const logHeight = Math.log10(heightNum);
        bodyFat = 163.205 * logValue - 97.684 * logHeight - 78.387;
      }

      if (isNaN(bodyFat) || !isFinite(bodyFat)) {
        alert('측정값이 올바르지 않습니다. 입력한 값을 확인해주세요.');
        return;
      }

      // 체지방률이 음수이거나 비현실적으로 높은 경우 처리
      if (bodyFat < 0 || bodyFat > 100) {
        alert('계산된 체지방률이 유효 범위를 벗어났습니다. 입력값을 확인해주세요.');
        return;
      }

      setResult(Math.round(bodyFat * 10) / 10);
    } catch (error) {
      console.error('계산 오류:', error);
      alert('계산 중 오류가 발생했습니다. 입력한 값을 확인해주세요.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">체지방률 계산기</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            성별
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            나이 (세)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="나이를 입력하세요"
            min="0"
            max="150"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            키 (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="키를 입력하세요"
            min="0"
            max="300"
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
            className="w-full p-2 border rounded"
            placeholder="체중을 입력하세요"
            min="0"
            max="500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            목둘레 (cm)
          </label>
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="목둘레를 입력하세요"
            min="0"
            max="100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            허리둘레 (cm)
          </label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="허리둘레를 입력하세요"
            min="0"
            max="300"
          />
        </div>

        {gender === 'female' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              엉덩이둘레 (cm)
            </label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="엉덩이둘레를 입력하세요"
              min="0"
              max="300"
            />
          </div>
        )}

        <button
          onClick={calculateBodyFat}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
        >
          체지방률 계산하기
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-bold text-center">결과</h3>
            <p className="text-center mt-2">
              체지방률: {result}%
            </p>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-bold">체지방률 범위 (성인 기준):</p>
              {gender === 'male' ? (
                <ul className="list-disc pl-5 mt-2">
                  <li>필수 지방: 2-5%</li>
                  <li>운동선수: 6-13%</li>
                  <li>적정: 14-17%</li>
                  <li>보통: 18-24%</li>
                  <li>과다: 25% 이상</li>
                </ul>
              ) : (
                <ul className="list-disc pl-5 mt-2">
                  <li>필수 지방: 10-13%</li>
                  <li>운동선수: 14-20%</li>
                  <li>적정: 21-24%</li>
                  <li>보통: 25-31%</li>
                  <li>과다: 32% 이상</li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">체지방률 계산기 안내</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">체지방률이란?</h3>
              <p className="text-gray-600 mb-4">
                체지방률은 전체 체중에서 체지방이 차지하는 비율을 의미합니다. 체지방은 우리 몸에 필요한 에너지를 저장하고, 장기를 보호하는 등의 중요한 역할을 합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">측정 방법 안내</h3>
              <div className="bg-gray-50 p-4 rounded">
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>목둘레: 목의 가장 가는 부위를 측정</li>
                  <li>허리둘레: 배꼽 위치에서 수평으로 측정</li>
                  <li>엉덩이둘레(여성): 엉덩이의 가장 돌출된 부위를 수평으로 측정</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">주의사항</h3>
              <div className="bg-gray-50 p-4 rounded">
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>이 계산기는 미 해군 체지방 측정법을 사용합니다.</li>
                  <li>정확한 측정을 위해 아침 공복 시에 측정하는 것이 좋습니다.</li>
                  <li>전문적인 체성분 분석을 위해서는 의료기관이나 보건소를 방문하시기 바랍니다.</li>
                  <li>운동선수나 근육량이 많은 경우 실제 체지방률과 차이가 있을 수 있습니다.</li>
                </ul>
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