'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/Card';
import { createShoe, getCorrectAction, formatCard } from '@/lib/game/basicStrategy';
import { type Card as CardType, type Hand } from '@/lib/game/types';

const UpgradePrompt = () => (
  <div className="text-center p-8 bg-neutral-900/60 rounded-2xl border border-neutral-800">
    <h3 className="text-2xl font-bold text-white mb-4">You&apos;ve reached your daily limit!</h3>
    <p className="text-neutral-300 mb-6">Upgrade to Pro for unlimited hands, card counting drills, and more.</p>
    <a href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow">
      Upgrade to Pro
    </a>
  </div>
);

export default function PracticeWindow() {
  const [shoe, setShoe] = useState<CardType[]>(() => createShoe());
  const [playerHand, setPlayerHand] = useState<Hand>([]);
  const [dealerCard, setDealerCard] = useState<CardType | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dealNewHand = useCallback(() => {
    setFeedback('');
    setShoe(prev => {
      let current = [...prev];
      if (current.length < 52) {
        current = createShoe();
      }
      const newPlayerHand = [current.pop()!, current.pop()!];
      const newDealerCard = current.pop()!;
      setPlayerHand(newPlayerHand);
      setDealerCard(newDealerCard);
      return current;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function checkUserStatus() {
      try {
        const statusResponse = await fetch('/api/user/status');
        if (!statusResponse.ok) throw new Error('status failed');
        const { isPro: proStatus } = await statusResponse.json();

        if (!proStatus) {
          const response = await fetch('/api/practice/usage');
          if (response.ok) {
            const data = await response.json();
            if (!cancelled && data.count >= 10) {
              setIsBlocked(true);
            }
          }
        }
      } catch (_) {
        // Non-fatal; allow trainer to load
      } finally {
        if (!cancelled) {
          dealNewHand();
          setIsLoading(false);
        }
      }
    }
    checkUserStatus();
    return () => {
      cancelled = true;
    };
  }, [dealNewHand]);

  const handleAction = async (action: string) => {
    if (!playerHand.length || !dealerCard) return;

    const correctAction = getCorrectAction(playerHand, dealerCard);
    const isCorrect = action === correctAction;
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. The book says to ${correctAction}.`);

    try {
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
    } catch (_) {}

    setTimeout(() => {
      if (isBlocked) return;
      dealNewHand();
    }, 900);
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading trainer...</div>;
  }

  if (isBlocked) {
    return <UpgradePrompt />;
  }

  return (
    <div className="rounded-3xl p-4 sm:p-8 max-w-4xl mx-auto bg-gradient-to-br from-green-900/70 via-emerald-900/60 to-green-950/70 border border-emerald-800 shadow-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white text-center mb-4">Dealer&apos;s Hand</h2>
        <div className="flex justify-center items-center space-x-4 h-40">
          {dealerCard && <Card card={formatCard(dealerCard)} />}
          <div className="rounded-xl border border-neutral-700/70 bg-neutral-800/40 backdrop-blur w-24 h-36 flex items-center justify-center text-neutral-300 font-bold">
            [HIDDEN]
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

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2">
        {['Hit', 'Stand', 'Double', 'Split', 'Surrender'].map((action) => (
          <button
            key={action}
            onClick={() => handleAction(action)}
            className="px-4 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white font-semibold transition-colors shadow-md w-28"
          >
            {action}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-4 p-3 bg-black/40 rounded-lg text-center border border-neutral-700">
          <p className="text-white font-medium text-lg">{feedback}</p>
        </div>
      )}
    </div>
  );
} 