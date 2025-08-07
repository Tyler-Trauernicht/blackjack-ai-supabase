// /components/CountTrainingWindow.tsx

'use client';

import { useState } from 'react';

export default function CountTrainingWindow() {
  const [countInput, setCountInput] = useState('');
  const [result, setResult] = useState('');
  const correctCount = 3; // Example placeholder

  const handleSubmit = () => {
    const submitted = parseInt(countInput);
    if (isNaN(submitted)) {
      setResult('❌ Please enter a number');
    } else if (submitted === correctCount) {
      setResult('✅ Correct Count!');
    } else {
      setResult(`❌ Incorrect. Actual count was ${correctCount}`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Card Counting Drill</h2>
      <p className="text-sm">Simulate a sequence of cards, then enter your running count:</p>

      {/* Placeholder for card sequence */}
      <div className="bg-gray-200 dark:bg-neutral-800 p-2 rounded">
        <p className="text-center italic">[9♦] [5♠] [10♥] [3♣] [A♠] ...</p>
      </div>

      <input
        type="text"
        value={countInput}
        onChange={(e) => setCountInput(e.target.value)}
        placeholder="Enter your count"
        className="px-4 py-2 rounded border dark:border-neutral-700 w-full"
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
      >
        Submit Count
      </button>

      {result && (
        <div className="mt-2 p-2 bg-gray-100 dark:bg-neutral-900 rounded">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
