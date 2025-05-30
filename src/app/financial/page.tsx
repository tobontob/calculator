import React from 'react';
import Link from 'next/link';

export default function FinancialCalculators() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Financial Calculators</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Loan Calculator</h2>
          <p className="text-gray-600 mb-4">Calculate loan payments, interest, and amortization schedules.</p>
          <Link 
            href="/financial/loan" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Interest Calculator</h2>
          <p className="text-gray-600 mb-4">Calculate simple and compound interest for your investments.</p>
          <Link 
            href="/financial/interest" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Investment Calculator</h2>
          <p className="text-gray-600 mb-4">Plan your investments and calculate potential returns.</p>
          <Link 
            href="/financial/investment" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>
      </div>
    </div>
  );
} 