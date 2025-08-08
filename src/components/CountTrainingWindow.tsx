'use client';

import { useState, useEffect, useMemo } from 'react';
import Card from '@/components/Card';
import { type Card as CardType } from '@/lib/game/types';
import { formatCard } from '@/lib/game/basicStrategy';
import { createCountingDrill } from '@/lib/game/countingLogic';

type DrillState = 'idle' | 'playing' | 'waiting_for_input' | 'finished';

type Speed = 'slow' | 'medium' | 'fast';

export default function CountTrainingWindow() {
  const [drillState, setDrillState] = useState<DrillState>('idle');
  const [cards, setCards] = useState<CardType[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [countInput, setCountInput] = useState('');
  const [result, setResult] = useState('');

  const [numCards, setNumCards] = useState<number>(25);
  const [speed, setSpeed] = useState<Speed>('fast');

  const isAdjustable = drillState !== 'playing' && drillState !== 'waiting_for_input';

  const delayMs = useMemo(() => {
    switch (speed) {
      case 'slow':
        return 1800;
      case 'medium':
        return 1200;
      case 'fast':
      default:
        return 750;
    }
  }, [speed]);

  const startDrill = () => {
    const { cards: drillCards, finalCount } = createCountingDrill(numCards);
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
      }, delayMs);
      return () => clearTimeout(timer);
    } else if (drillState === 'playing' && currentCardIndex >= cards.length) {
      setDrillState('waiting_for_input');
    }
  }, [drillState, currentCardIndex, cards.length, delayMs]);

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

  const renderControls = () => (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between w-full mb-6">
      <div className="flex items-center gap-3">
        <label className="text-sm text-neutral-300">Cards:</label>
        <select
          value={numCards}
          onChange={(e) => setNumCards(parseInt(e.target.value))}
          disabled={!isAdjustable}
          className="bg-neutral-900/60 border border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-100 disabled:opacity-60"
        >
          {[25, 50, 75, 100, 200].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-300">Speed:</span>
        <div className="flex gap-1 bg-neutral-900/60 border border-neutral-700 rounded-lg p-1">
          {(['slow','medium','fast'] as Speed[]).map(s => (
            <button
              key={s}
              onClick={() => isAdjustable && setSpeed(s)}
              disabled={!isAdjustable}
              className={`px-3 py-1 rounded-md text-sm capitalize ${speed===s ? 'bg-blue-600 text-white' : 'text-neutral-200 hover:bg-neutral-800'} disabled:opacity-60`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (drillState) {
      case 'playing': {
        const current = cards[currentCardIndex];
        return (
          <div className="flex flex-col w-full">
            {renderControls()}
            <div className="flex justify-center items-center h-48">
              {current ? (
                <Card card={formatCard(current)} />
              ) : (
                <div className="w-24 h-36 rounded-xl border border-neutral-700/70 bg-neutral-800/40" />)
              }
            </div>
          </div>
        );
      }
      case 'waiting_for_input':
      case 'finished':
        return (
          <div className="flex flex-col items-center w-full">
            {renderControls()}
            <div className="flex flex-col items-center space-y-4 w-full">
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
                <button onClick={startDrill} className="text-blue-400 hover:underline mt-2">
                  Start a New Drill
                </button>
              )}
            </div>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="flex flex-col items-center w-full">
            {renderControls()}
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
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto min-h-[300px] flex items-center justify-center w-full">
      {renderContent()}
    </div>
  );
} 