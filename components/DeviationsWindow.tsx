'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import { type Card as CardType, type Hand, type Action } from '@/lib/game/types';
import { formatCard } from '@/lib/game/basicStrategy';
import { createDeviationDrill, getDeviationAction } from '@/lib/game/deviationLogic';

export default function DeviationsWindow() {
  const [playerHand, setPlayerHand] = useState<Hand>([]);
  const [dealerCard, setDealerCard] = useState<CardType | null>(null);
  const [trueCount, setTrueCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const newDrill = () => {
    const { playerHand, dealerCard, trueCount } = createDeviationDrill();
    setPlayerHand(playerHand);
    setDealerCard(dealerCard);
    setTrueCount(trueCount);
    setFeedback('');
    setIsFinished(false);
  };

  useEffect(() => {
    newDrill();
  }, []);

  const handleAction = (action: Action) => {
    if (!playerHand.length || !dealerCard) return;

    const correctAction = getDeviationAction(playerHand, dealerCard, trueCount);
    const isCorrect = action === correctAction;

    if (isCorrect) {
      setFeedback('✅ Correct! That is the right move for this count.');
    } else {
      setFeedback(`❌ Incorrect. At a true count of ${trueCount > 0 ? '+' : ''}${trueCount}, the correct play is to ${correctAction}.`);
    }
    setIsFinished(true);

    // Log the deviation drill result to the hand_history table
    fetch('/api/practice/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerHand: playerHand.map(formatCard).join(','),
            dealerCard: formatCard(dealerCard!),
            userAction: action,
            correctAction: correctAction,
            result: isCorrect,
            trueCount: trueCount,
        }),
    });
  };

  return (
    <div className="bg-purple-900 border-4 border-yellow-700 rounded-3xl p-4 sm:p-8 max-w-4xl mx-auto">

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">True Count: <span className="text-yellow-400">{trueCount > 0 ? `+${trueCount}` : trueCount}</span></h2>
        <p className="text-purple-200">Based on the count, should you deviate from basic strategy?</p>
      </div>

      {/* Dealer's Area */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white text-center mb-4">Dealer's Hand</h3>
        <div className="flex justify-center items-center space-x-4 h-40">
          {dealerCard && <Card card={formatCard(dealerCard)} />}
        </div>
      </div>

      {/* Player's Area */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white text-center mb-4">Your Hand</h3>
        <div className="flex justify-center items-center space-x-4 h-40">
          {playerHand.map((card, index) => (
            <Card key={index} card={formatCard(card)} />
          ))}
        </div>
      </div>

      {/* Action Buttons or Next Drill Button */}
      {isFinished ? (
        <div className="text-center">
            <button onClick={newDrill} className="px-8 py-3 rounded bg-blue-600 text-white font-bold text-lg hover:bg-blue-700">
                Next Scenario
            </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
          {['Hit', 'Stand', 'Double', 'Split', 'Surrender'].map((action) => (
            <button
              key={action}
              onClick={() => handleAction(action as Action)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg w-24"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Feedback Area */}
      {feedback && (
        <div className="mt-4 p-3 bg-gray-900 bg-opacity-70 rounded-lg text-center">
          <p className="text-white font-semibold text-lg">{feedback}</p>
        </div>
      )}
    </div>
  );
}
