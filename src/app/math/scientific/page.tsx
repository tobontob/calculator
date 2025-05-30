'use client';

import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [newNumber, setNewNumber] = useState(true);
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

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
      case 'y^x': return Math.pow(a, b);
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

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(current * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(current * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(current * Math.PI / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case '1/x':
        result = 1 / current;
        break;
      case 'x^2':
        result = Math.pow(current, 2);
        break;
      default:
        return;
    }

    setDisplay(String(parseFloat(result.toFixed(8))));
    setNewNumber(true);
  };

  const handleMemory = (action: string) => {
    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setNewNumber(true);
        break;
      case 'M+':
        setMemory(memory + parseFloat(display));
        setNewNumber(true);
        break;
      case 'M-':
        setMemory(memory - parseFloat(display));
        setNewNumber(true);
        break;
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const scientificButtons = [
    ['MC', 'MR', 'M+', 'M-'],
    ['sin', 'cos', 'tan', 'log'],
    ['sqrt', 'x^2', 'y^x', 'ln'],
  ];

  const numberButtons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">공학용 계산기</h1>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
        <div className="bg-gray-100 p-4 rounded mb-4">
          <div className="text-right text-2xl font-mono overflow-x-auto">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleClear}
            className="col-span-4 p-4 text-lg bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            C
          </button>

          {scientificButtons.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (['MC', 'MR', 'M+', 'M-'].includes(btn)) {
                      handleMemory(btn);
                    } else if (['y^x'].includes(btn)) {
                      handleOperation(btn);
                    } else {
                      handleScientific(btn);
                    }
                  }}
                  className="p-4 text-sm bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  {btn}
                </button>
              ))}
            </React.Fragment>
          ))}

          {numberButtons.map((row, i) => (
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
    </div>
  );
} 