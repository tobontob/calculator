'use client';

import React, { useState } from 'react';

type UnitCategory = {
  name: string;
  units: {
    [key: string]: number;
  };
};

const unitCategories: { [key: string]: UnitCategory } = {
  length: {
    name: '길이',
    units: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      inch: 0.0254,
      feet: 0.3048,
      yard: 0.9144,
      mile: 1609.344
    }
  },
  weight: {
    name: '무게',
    units: {
      mg: 0.001,
      g: 1,
      kg: 1000,
      oz: 28.3495,
      lb: 453.592
    }
  },
  area: {
    name: '면적',
    units: {
      'm²': 1,
      'km²': 1000000,
      'ha': 10000,
      'acre': 4046.86,
      'ft²': 0.092903
    }
  },
  volume: {
    name: '부피',
    units: {
      ml: 0.001,
      l: 1,
      'm³': 1000,
      'gal': 3.78541,
      'qt': 0.946353
    }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleConvert = () => {
    if (!value) return;

    const fromValue = parseFloat(value);
    const fromFactor = unitCategories[category].units[fromUnit];
    const toFactor = unitCategories[category].units[toUnit];
    
    // 기준 단위로 변환 후 목표 단위로 변환
    const baseValue = fromValue * fromFactor;
    const resultValue = baseValue / toFactor;
    
    setResult(resultValue.toLocaleString('ko-KR', {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">단위 변환기</h1>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">변환 종류</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFromUnit(Object.keys(unitCategories[e.target.value].units)[0]);
                setToUnit(Object.keys(unitCategories[e.target.value].units)[1]);
                setResult('');
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(unitCategories).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">변환할 단위</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(unitCategories[category].units).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">변환될 단위</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(unitCategories[category].units).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">값</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`숫자를 입력하세요`}
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            변환하기
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">변환 결과</h2>
              <p className="text-gray-700">
                {value} {fromUnit} = <span className="font-bold">{result}</span> {toUnit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 