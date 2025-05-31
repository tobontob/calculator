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
    <div className="max-w-md mx-auto mt-10 mb-20 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">기본 계산기</h1>
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
  );
} 