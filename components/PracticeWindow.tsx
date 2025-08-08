'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { createShoe, getCorrectAction, formatCard } from '@/lib/game/basicStrategy';
import { type Card as CardType, type Hand } from '@/lib/game/types';

// A simple component to show an upgrade message
const UpgradePrompt = () => (
  <div className="text-center p-8 bg-gray-800 rounded-lg">
    <h3 className="text-2xl font-bold text-white mb-4">You've reached your daily limit!</h3>
    <p className="text-gray-400 mb-6">Upgrade to Pro for unlimited hands, card counting drills, and more.</p>
    <a href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
      Upgrade to Pro
    </a>
  </div>
);

export default function PracticeWindow() {
  const [shoe, setShoe] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<Hand>([]);
  const [dealerCard, setDealerCard] = useState<CardType | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dealNewHand = useCallback(() => {
    setFeedback('');
    let currentShoe = shoe;
    if (currentShoe.length < 52) { // Reshuffle if deck is low
      currentShoe = createShoe();
    }

    const newPlayerHand = [currentShoe.pop()!, currentShoe.pop()!];
    const newDealerCard = currentShoe.pop()!;

    setPlayerHand(newPlayerHand);
    setDealerCard(newDealerCard);
    setShoe(currentShoe);
  }, [shoe]);

  useEffect(() => {
    async function checkUserStatus() {
      const statusResponse = await fetch('/api/user/status');
      const { isPro: proStatus } = await statusResponse.json();
      setIsPro(proStatus);

      if (!proStatus) {
        const response = await fetch('/api/practice/usage');
        const data = await response.json();
        if (data.count >= 10) {
          setIsBlocked(true);
        }
      }
      dealNewHand();
      setIsLoading(false);
    }

    setShoe(createShoe());
    checkUserStatus();
  }, [dealNewHand]);

  const handleAction = async (action: string) => {
    if (!playerHand.length || !dealerCard) return;

    const correctAction = getCorrectAction(playerHand, dealerCard);
    const isCorrect = action === correctAction;
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. The book says to ${correctAction}.`);

    // Log the hand
    await fetch('/api/practice/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerHand: playerHand.map(formatCard).join(','),
        dealerCard: formatCard(dealerCard),
        userAction: action,
        correctAction: correctAction,
        result: isCorrect,
      }),
    });

    // Deal a new hand after a delay
    setTimeout(() => {
        if (isBlocked) return;
        dealNewHand();
    }, 2000);
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading trainer...</div>;
  }

  if (isBlocked) {
    return <UpgradePrompt />;
  }

  return (
    <div className="bg-green-800 border-4 border-yellow-700 rounded-3xl p-4 sm:p-8 max-w-4xl mx-auto">
      {/* ... (rest of the UI is the same as before) ... */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white text-center mb-4">Dealer's Hand</h2>
        <div className="flex justify-center items-center space-x-4 h-40">
          {dealerCard && <Card card={formatCard(dealerCard)} />}
          <div className="bg-gray-200 rounded-lg shadow-md w-24 h-36 flex items-center justify-center text-gray-600 font-bold">
            [HOLE CARD]
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white text-center mb-4">Your Hand</h2>
        <div className="flex justify-center items-center space-x-4 h-40">
          {playerHand.map((card, index) => (
            <Card key={index} card={formatCard(card)} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
        {['Hit', 'Stand', 'Double', 'Split', 'Surrender'].map((action) => (
          <button
            key={action}
            onClick={() => handleAction(action)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg w-24"
          >
            {action}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-4 p-3 bg-gray-900 bg-opacity-70 rounded-lg text-center">
          <p className="text-white font-semibold text-lg">{feedback}</p>
        </div>
      )}
    </div>
  );
}
