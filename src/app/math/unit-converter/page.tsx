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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">단위 변환기</h1>
      
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
    </div>
  );
} 