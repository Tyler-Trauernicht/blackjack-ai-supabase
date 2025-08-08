'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import { type Card as CardType } from '@/lib/game/types';
import { formatCard } from '@/lib/game/basicStrategy';
import { createCountingDrill } from '@/lib/game/countingLogic';

type DrillState = 'idle' | 'playing' | 'waiting_for_input' | 'finished';

export default function CountTrainingWindow() {
  const [drillState, setDrillState] = useState<DrillState>('idle');
  const [cards, setCards] = useState<CardType[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [countInput, setCountInput] = useState('');
  const [result, setResult] = useState('');

  const startDrill = () => {
    const { cards: drillCards, finalCount } = createCountingDrill(30); // 30 cards per drill
    setCards(drillCards);
    setCorrectCount(finalCount);
    setCurrentCardIndex(0);
    setCountInput('');
    setResult('');
    setDrillState('playing');
  };

  useEffect(() => {
    if (drillState === 'playing' && currentCardIndex < cards.length) {
      const timer = setTimeout(() => {
        setCurrentCardIndex(prevIndex => prevIndex + 1);
      }, 750); // 750ms per card
      return () => clearTimeout(timer);
    } else if (drillState === 'playing' && currentCardIndex >= cards.length) {
      setDrillState('waiting_for_input');
    }
  }, [drillState, currentCardIndex, cards.length]);

  const handleSubmit = () => {
    const submitted = parseInt(countInput);
    if (isNaN(submitted)) {
      setResult('❌ Please enter a number.');
    } else if (submitted === correctCount) {
      setResult(`✅ Correct! The final count was ${correctCount}.`);
    } else {
      setResult(`❌ Incorrect. Your count was ${submitted}, but the actual count was ${correctCount}.`);
    }
    setDrillState('finished');

    // Log the drill session result
    fetch('/api/counting/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            totalHands: cards.length,
            correctCount: correctCount,
            submittedCount: submitted,
        }),
    });
  };

  const renderContent = () => {
    switch (drillState) {
      case 'playing':
        return (
          <div className="flex justify-center items-center h-48">
            <Card card={formatCard(cards[currentCardIndex])} />
          </div>
        );
      case 'waiting_for_input':
      case 'finished':
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-semibold">The sequence is complete.</p>
            <p>What is your final count?</p>
            <input
              type="number"
              value={countInput}
              onChange={(e) => setCountInput(e.target.value)}
              placeholder="Enter final count"
              className="px-4 py-2 rounded border dark:border-neutral-700 w-full max-w-xs text-black"
              disabled={drillState === 'finished'}
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-500"
              disabled={drillState === 'finished'}
            >
              Submit Count
            </button>
            {result && (
              <p className="mt-4 text-xl font-bold text-center">{result}</p>
            )}
            {drillState === 'finished' && (
                <button onClick={startDrill} className="text-blue-400 hover:underline mt-4">
                    Start a New Drill
                </button>
            )}
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Hi-Lo Counting Drill</h2>
            <p className="mb-6">A sequence of cards will be shown. Keep a running count. When the sequence ends, enter your final count.</p>
            <button
              onClick={startDrill}
              className="px-8 py-3 rounded bg-blue-600 text-white font-bold text-lg hover:bg-blue-700"
            >
              Start Drill
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-8 max-w-2xl mx-auto min-h-[300px] flex items-center justify-center">
      {renderContent()}
    </div>
  );
}
