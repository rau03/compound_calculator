"use client";

import { useState, FormEvent, ChangeEvent } from "react";

interface CalculatorResult {
  finalValue: string;
  regularValue: string;
  difference: string;
}

interface CalculatorInputs {
  initialAmount: string;
  monthlyContribution: string;
  numberOfYears: string;
  interestRate: string;
}

const initialInputs: CalculatorInputs = {
  initialAmount: "",
  monthlyContribution: "",
  numberOfYears: "",
  interestRate: "",
};

export default function CompoundCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateCompoundInterest = (
    initAmount: number,
    monthlyContribution: number,
    numberOfYears: number,
    interestRate: number
  ): CalculatorResult => {
    let total = initAmount;
    const annualContribution = monthlyContribution * 12;

    for (let i = 0; i < numberOfYears; i++) {
      total = total + annualContribution;
      total = total * ((100 + interestRate) / 100);
    }

    const regularValue = initAmount + monthlyContribution * 12 * numberOfYears;
    const difference = total - regularValue;

    return {
      finalValue: total.toFixed(2),
      regularValue: regularValue.toFixed(2),
      difference: difference.toFixed(2),
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = calculateCompoundInterest(
      Number(inputs.initialAmount),
      Number(inputs.monthlyContribution),
      Number(inputs.numberOfYears),
      Number(inputs.interestRate)
    );
    setResult(result);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Compound Interest Calculator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="initialAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Initial Investment ($)
            </label>
            <input
              type="number"
              id="initialAmount"
              name="initialAmount"
              value={inputs.initialAmount}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="monthlyContribution"
              className="block text-sm font-medium text-gray-700"
            >
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              id="monthlyContribution"
              name="monthlyContribution"
              value={inputs.monthlyContribution}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="numberOfYears"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Years
            </label>
            <input
              type="number"
              id="numberOfYears"
              name="numberOfYears"
              value={inputs.numberOfYears}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="interestRate"
              className="block text-sm font-medium text-gray-700"
            >
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Results</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              Final Compound Value:{" "}
              <span className="font-bold text-green-600">
                ${result.finalValue}
              </span>
            </p>
            <p className="text-gray-700">
              Regular Amount:{" "}
              <span className="font-bold">${result.regularValue}</span>
            </p>
            <p className="text-gray-700">
              Difference:{" "}
              <span className="font-bold text-blue-600">
                ${result.difference}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
