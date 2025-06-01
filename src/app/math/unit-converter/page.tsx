'use client';

import { useState } from 'react';

type UnitCategory = {
  name: string;
  units: {
    name: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
  }[];
};

const unitCategories: UnitCategory[] = [
  {
    name: '길이',
    units: [
      {
        name: '밀리미터 (mm)',
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      {
        name: '센티미터 (cm)',
        toBase: (v) => v / 100,
        fromBase: (v) => v * 100,
      },
      {
        name: '미터 (m)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '킬로미터 (km)',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
    ],
  },
  {
    name: '무게',
    units: [
      {
        name: '그램 (g)',
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      {
        name: '킬로그램 (kg)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '톤 (t)',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
    ],
  },
  {
    name: '넓이',
    units: [
      {
        name: '제곱미터 (m²)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '제곱킬로미터 (km²)',
        toBase: (v) => v * 1000000,
        fromBase: (v) => v / 1000000,
      },
      {
        name: '헥타르 (ha)',
        toBase: (v) => v * 10000,
        fromBase: (v) => v / 10000,
      },
      {
        name: '평',
        toBase: (v) => v * 3.3058,
        fromBase: (v) => v / 3.3058,
      },
    ],
  },
  {
    name: '부피',
    units: [
      {
        name: '밀리리터 (mL)',
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      {
        name: '리터 (L)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '세제곱미터 (m³)',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
    ],
  },
  {
    name: '온도',
    units: [
      {
        name: '섭씨 (°C)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '화씨 (°F)',
        toBase: (v) => (v - 32) * 5/9,
        fromBase: (v) => (v * 9/5) + 32,
      },
      {
        name: '켈빈 (K)',
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
  },
  {
    name: '압력',
    units: [
      {
        name: '파스칼 (Pa)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '기압 (atm)',
        toBase: (v) => v * 101325,
        fromBase: (v) => v / 101325,
      },
      {
        name: '바 (bar)',
        toBase: (v) => v * 100000,
        fromBase: (v) => v / 100000,
      },
      {
        name: '수은주 밀리미터 (mmHg)',
        toBase: (v) => v * 133.322,
        fromBase: (v) => v / 133.322,
      },
    ],
  },
  {
    name: '속도',
    units: [
      {
        name: '미터/초 (m/s)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '킬로미터/시 (km/h)',
        toBase: (v) => v / 3.6,
        fromBase: (v) => v * 3.6,
      },
      {
        name: '마일/시 (mph)',
        toBase: (v) => v / 2.237,
        fromBase: (v) => v * 2.237,
      },
    ],
  },
  {
    name: '연비',
    units: [
      {
        name: 'km/L',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: 'L/100km',
        toBase: (v) => 100 / v,
        fromBase: (v) => 100 / v,
      },
      {
        name: 'MPG(미국)',
        toBase: (v) => v * 0.425144,
        fromBase: (v) => v / 0.425144,
      },
    ],
  },
  {
    name: '데이터량',
    units: [
      {
        name: '바이트 (B)',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        name: '킬로바이트 (KB)',
        toBase: (v) => v * 1024,
        fromBase: (v) => v / 1024,
      },
      {
        name: '메가바이트 (MB)',
        toBase: (v) => v * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024),
      },
      {
        name: '기가바이트 (GB)',
        toBase: (v) => v * 1024 * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024 * 1024),
      },
      {
        name: '테라바이트 (TB)',
        toBase: (v) => v * 1024 * 1024 * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024 * 1024 * 1024),
      },
    ],
  },
];

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    if (!value) return;

    const category = unitCategories[selectedCategory];
    const inputValue = parseFloat(value);
    
    // 기준 단위로 변환 후 목표 단위로 변환
    const baseValue = category.units[fromUnit].toBase(inputValue);
    const convertedValue = category.units[toUnit].fromBase(baseValue);
    
    setResult(parseFloat(convertedValue.toFixed(6)));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">단위 변환기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            변환 종류
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(parseInt(e.target.value));
              setFromUnit(0);
              setToUnit(1);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {unitCategories.map((category, index) => (
              <option key={category.name} value={index}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            변환할 단위
          </label>
          <select
            value={fromUnit}
            onChange={(e) => {
              setFromUnit(parseInt(e.target.value));
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {unitCategories[selectedCategory].units.map((unit, index) => (
              <option key={unit.name} value={index}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            변환될 단위
          </label>
          <select
            value={toUnit}
            onChange={(e) => {
              setToUnit(parseInt(e.target.value));
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {unitCategories[selectedCategory].units.map((unit, index) => (
              <option key={unit.name} value={index}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            값 입력
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setResult(null);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="변환할 값을 입력하세요"
          />
        </div>

        <button
          onClick={handleConvert}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          변환하기
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg">
              결과: <span className="font-semibold">{result}</span>{' '}
              {unitCategories[selectedCategory].units[toUnit].name}
            </p>
          </div>
        )}
      </div>

        <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">단위 변환기 이용 안내</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">사용 방법</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>변환하고자 하는 단위의 종류를 선택합니다 (길이, 무게, 넓이 등)</li>
              <li>변환할 단위와 변환될 단위를 각각 선택합니다</li>
              <li>변환하고자 하는 값을 입력합니다</li>
              <li>'변환하기' 버튼을 클릭하면 결과가 표시됩니다</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-blue-600 mb-2">지원하는 단위 변환</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>길이: mm, cm, m, km</li>
              <li>무게: g, kg, t</li>
              <li>넓이: m², km², ha, 평</li>
              <li>부피: mL, L, m³</li>
              <li>온도: °C, °F, K</li>
              <li>압력: Pa, atm, bar, mmHg</li>
              <li>속도: m/s, km/h, mph</li>
              <li>연비: km/L, L/100km, MPG</li>
              <li>데이터량: B, KB, MB, GB, TB</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-600 mb-2">주요 변환 정보</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>넓이 변환: 1평 = 3.3058m²</li>
              <li>온도 변환: °C = (°F - 32) × 5/9</li>
              <li>데이터 단위: 1KB = 1024B, 1MB = 1024KB</li>
            </ul>
              </div>
            </div>
          </div>

          {/* 관련 사이트 링크 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">단위 변환 관련 사이트</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.nist.gov/pml/weights-and-measures"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">NIST</span>
                <span className="text-gray-500 text-sm ml-2">- 국제 표준 단위</span>
              </a>
              <a
                href="https://www.bipm.org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">BIPM</span>
                <span className="text-gray-500 text-sm ml-2">- 국제도량형국</span>
              </a>
              <a
                href="https://www.ktc.re.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국기술표준원</span>
                <span className="text-gray-500 text-sm ml-2">- 국가표준</span>
              </a>
              <a
                href="https://www.kriss.re.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">한국표준과학연구원</span>
                <span className="text-gray-500 text-sm ml-2">- 측정표준</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 