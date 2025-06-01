'use client';

import React, { useState } from 'react';

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (previousValue === null || operation === null) return;

    const current = parseFloat(display);
    const result = calculate(previousValue, current, operation);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">기본 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 계산기 섹션 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <input
          type="text"
          value={display}
          readOnly
          className="w-full p-2 text-right text-xl border rounded"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={handleClear}
          className="col-span-4 p-4 text-lg bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          C
        </button>

        {buttons.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === '=') handleEqual();
                  else if (btn === '.') handleDecimal();
                  else if ('+-×÷'.includes(btn)) handleOperation(btn);
                  else handleNumber(btn);
                }}
                className={`p-4 text-lg rounded transition-colors ${
                  '+-×÷='.includes(btn)
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {btn}
              </button>
            ))}
          </React.Fragment>
        ))}
          </div>
        </div>

        {/* 사용법 및 링크 섹션 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">기본 계산기 사용법</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">기본 기능</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>숫자 입력: 0-9</li>
                  <li>사칙연산: +, -, ×, ÷</li>
                  <li>소수점: .</li>
                  <li>계산하기: =</li>
                  <li>초기화: C</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">사용 팁</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>연속 계산이 가능합니다</li>
                  <li>결과값에 이어서 계산할 수 있습니다</li>
                  <li>초기화는 'C' 버튼을 누르세요</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">수학 학습 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.khanacademy.org/math"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">Khan Academy</span>
                <span className="text-gray-500 text-sm ml-2">- 수학 강의</span>
              </a>
              <a
                href="https://www.mathsisfun.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">Math is Fun</span>
                <span className="text-gray-500 text-sm ml-2">- 수학 개념</span>
              </a>
              <a
                href="https://www.ixl.com/math"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">IXL Math</span>
                <span className="text-gray-500 text-sm ml-2">- 수학 연습</span>
              </a>
              <a
                href="https://www.coolmath.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">Cool Math</span>
                <span className="text-gray-500 text-sm ml-2">- 수학 게임</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 