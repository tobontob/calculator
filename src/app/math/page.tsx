import React from 'react';
import Link from 'next/link';

export default function MathCalculators() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Math Calculators</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Calculator</h2>
          <p className="text-gray-600 mb-4">Perform basic arithmetic operations with a user-friendly interface.</p>
          <Link 
            href="/math/basic" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Scientific Calculator</h2>
          <p className="text-gray-600 mb-4">Advanced calculator with scientific functions and operations.</p>
          <Link 
            href="/math/scientific" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Unit Converter</h2>
          <p className="text-gray-600 mb-4">Convert between different units of measurement.</p>
          <Link 
            href="/math/converter" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>
      </div>
    </div>
  );
} 