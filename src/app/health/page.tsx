import React from 'react';
import Link from 'next/link';

export default function HealthCalculators() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Health Calculators</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
          <p className="text-gray-600 mb-4">Calculate your Body Mass Index and check your weight category.</p>
          <Link 
            href="/health/bmi" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calorie Calculator</h2>
          <p className="text-gray-600 mb-4">Calculate your daily caloric needs based on your activity level.</p>
          <Link 
            href="/health/calorie" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Body Fat Calculator</h2>
          <p className="text-gray-600 mb-4">Estimate your body fat percentage using various methods.</p>
          <Link 
            href="/health/bodyfat" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Calculator
          </Link>
        </div>
      </div>
    </div>
  );
} 