'use client';

import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [isRadians, setIsRadians] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (operator: string) => {
    try {
      const result = eval(display);
      setDisplay(result + operator);
      setIsNewNumber(false);
    } catch (error) {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(display);
      setDisplay(String(result));
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setIsNewNumber(true);
  };

  const handleDecimal = () => {
    if (isNewNumber) {
      setDisplay('0.');
      setIsNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleScientific = (operation: string) => {
    try {
      const number = parseFloat(display);
      let result: number;

      switch (operation) {
        case 'sin':
          result = isRadians ? Math.sin(number) : Math.sin(number * Math.PI / 180);
          break;
        case 'cos':
          result = isRadians ? Math.cos(number) : Math.cos(number * Math.PI / 180);
          break;
        case 'tan':
          result = isRadians ? Math.tan(number) : Math.tan(number * Math.PI / 180);
          break;
        case 'sqrt':
          result = Math.sqrt(number);
          break;
        case 'square':
          result = Math.pow(number, 2);
          break;
        case 'cube':
          result = Math.pow(number, 3);
          break;
        case 'log':
          result = Math.log10(number);
          break;
        case 'ln':
          result = Math.log(number);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        case 'abs':
          result = Math.abs(number);
          break;
        case 'inv':
          result = 1 / number;
          break;
        default:
          result = number;
      }

      setDisplay(String(result));
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const handleMemory = (operation: string) => {
    const number = parseFloat(display);
    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setIsNewNumber(true);
        break;
      case 'M+':
        setMemory(memory + number);
        setIsNewNumber(true);
        break;
      case 'M-':
        setMemory(memory - number);
        setIsNewNumber(true);
        break;
    }
  };

  const toggleAngleUnit = () => {
    setIsRadians(!isRadians);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">공학용 계산기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-gray-100 p-4 rounded mb-4 text-right text-2xl font-mono">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => handleMemory('MC')} className="btn-memory">MC</button>
          <button onClick={() => handleMemory('MR')} className="btn-memory">MR</button>
          <button onClick={() => handleMemory('M+')} className="btn-memory">M+</button>
          <button onClick={() => handleMemory('M-')} className="btn-memory">M-</button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => handleScientific('sin')} className="btn-scientific">sin</button>
          <button onClick={() => handleScientific('cos')} className="btn-scientific">cos</button>
          <button onClick={() => handleScientific('tan')} className="btn-scientific">tan</button>
          <button onClick={toggleAngleUnit} className="btn-scientific">{isRadians ? 'RAD' : 'DEG'}</button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => handleScientific('sqrt')} className="btn-scientific">√</button>
          <button onClick={() => handleScientific('square')} className="btn-scientific">x²</button>
          <button onClick={() => handleScientific('cube')} className="btn-scientific">x³</button>
          <button onClick={() => handleScientific('inv')} className="btn-scientific">1/x</button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => handleScientific('log')} className="btn-scientific">log</button>
          <button onClick={() => handleScientific('ln')} className="btn-scientific">ln</button>
          <button onClick={() => handleScientific('pi')} className="btn-scientific">π</button>
          <button onClick={() => handleScientific('e')} className="btn-scientific">e</button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => handleNumber('7')} className="btn-number">7</button>
          <button onClick={() => handleNumber('8')} className="btn-number">8</button>
          <button onClick={() => handleNumber('9')} className="btn-number">9</button>
          <button onClick={() => handleOperator('/')} className="btn-operator">÷</button>

          <button onClick={() => handleNumber('4')} className="btn-number">4</button>
          <button onClick={() => handleNumber('5')} className="btn-number">5</button>
          <button onClick={() => handleNumber('6')} className="btn-number">6</button>
          <button onClick={() => handleOperator('*')} className="btn-operator">×</button>

          <button onClick={() => handleNumber('1')} className="btn-number">1</button>
          <button onClick={() => handleNumber('2')} className="btn-number">2</button>
          <button onClick={() => handleNumber('3')} className="btn-number">3</button>
          <button onClick={() => handleOperator('-')} className="btn-operator">-</button>

          <button onClick={() => handleNumber('0')} className="btn-number">0</button>
          <button onClick={handleDecimal} className="btn-number">.</button>
          <button onClick={handleEquals} className="btn-equals">=</button>
          <button onClick={() => handleOperator('+')} className="btn-operator">+</button>

          <button onClick={handleClear} className="btn-clear col-span-4">Clear</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">계산기 사용 안내</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">기본 기능</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>사칙연산: +, -, ×, ÷</li>
                  <li>메모리 기능: MC, MR, M+, M-</li>
                  <li>소수점 및 등호 연산</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">공학 기능</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>삼각함수: sin, cos, tan</li>
                  <li>로그함수: log, ln</li>
                  <li>지수/제곱: x², x³, √</li>
                  <li>상수: π, e</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">수학/공학 관련 사이트</h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://www.wolfram.com/mathematica"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">Wolfram Mathematica</span>
                <span className="text-gray-500 text-sm ml-2">- 수학 계산 도구</span>
              </a>
              <a
                href="https://www.geogebra.org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">GeoGebra</span>
                <span className="text-gray-500 text-sm ml-2">- 기하학 시각화</span>
              </a>
              <a
                href="https://www.desmos.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">Desmos</span>
                <span className="text-gray-500 text-sm ml-2">- 그래프 계산기</span>
              </a>
              <a
                href="https://www.mathway.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors flex items-center"
              >
                <span className="text-blue-600">Mathway</span>
                <span className="text-gray-500 text-sm ml-2">- 수학 문제 해결</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        button {
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: bold;
          transition: all 0.2s;
        }
        .btn-number {
          background-color: #f3f4f6;
          color: #1f2937;
        }
        .btn-number:hover {
          background-color: #e5e7eb;
        }
        .btn-operator {
          background-color: #dbeafe;
          color: #1e40af;
        }
        .btn-operator:hover {
          background-color: #bfdbfe;
        }
        .btn-equals {
          background-color: #93c5fd;
          color: #1e40af;
        }
        .btn-equals:hover {
          background-color: #60a5fa;
        }
        .btn-clear {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .btn-clear:hover {
          background-color: #fecaca;
        }
        .btn-scientific {
          background-color: #e0e7ff;
          color: #3730a3;
        }
        .btn-scientific:hover {
          background-color: #c7d2fe;
        }
        .btn-memory {
          background-color: #f3e8ff;
          color: #6b21a8;
        }
        .btn-memory:hover {
          background-color: #e9d5ff;
        }
      `}</style>
    </div>
  );
} 