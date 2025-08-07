// /components/PracticeWindow.tsx

'use client';

import { useState } from 'react';

export default function PracticeWindow() {
  const [playerHand, setPlayerHand] = useState(['9♠', '7♦']);
  const [dealerCard, setDealerCard] = useState('J♣');
  const [feedback, setFeedback] = useState('');

  const handleAction = (action: string) => {
    const correctAction = 'Stand'; // Replace with basic strategy logic later
    const isCorrect = action === correctAction;
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. Try: ${correctAction}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Practice a Hand</h2>

      <div className="flex gap-8 text-lg">
        <div>
          <p className="font-semibold">Your Hand:</p>
          <p>{playerHand.join(', ')}</p>
        </div>
        <div>
          <p className="font-semibold">Dealer Shows:</p>
          <p>{dealerCard}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Hit', 'Stand', 'Double', 'Split', 'Surrender'].map((action) => (
          <button
            key={action}
            onClick={() => handleAction(action)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {action}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-neutral-900 rounded">
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
