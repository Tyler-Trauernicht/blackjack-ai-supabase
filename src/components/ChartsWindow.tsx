'use client';

import { useState, useEffect } from 'react';
import basicStrategy from '@/data/basicStrategy.json';
import countDeviations from '@/data/countDeviations.json';

const StrategyTable = ({ title, data }: { title: string, data: Record<string, Record<string, string>> }) => (
  <div className="overflow-x-auto">
    <h3 className="text-2xl font-bold mt-8 mb-4 text-center">{title}</h3>
    <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-2 border-r border-gray-600">Player Hand</th>
          <th colSpan={10} className="p-2">Dealer&apos;s Up Card</th>
        </tr>
        <tr className="bg-gray-600">
          <th className="p-2 border-r border-gray-600"></th>
          {Object.keys(Object.values(data)[0]).map(dealerCard => (
            <th key={dealerCard} className="p-2 w-12">{dealerCard}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([playerHand, decisions]) => (
          <tr key={playerHand} className="border-t border-gray-700">
            <td className="p-2 font-bold border-r border-gray-600 text-center">{playerHand}</td>
            {Object.values(decisions).map((action, index) => (
              <td key={index} className={`p-2 text-center font-semibold ${
                action === 'Hit' ? 'bg-red-800' :
                action === 'Stand' ? 'bg-blue-800' :
                action === 'Double' ? 'bg-green-800' :
                action === 'Split' ? 'bg-yellow-800' : ''
              }`}>{action.charAt(0)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DeviationsTable = () => (
  <div className="overflow-x-auto">
    <h3 className="text-2xl font-bold mt-8 mb-4 text-center">Illustrious 18 Deviations</h3>
    <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-2">Player Hand</th>
          <th className="p-2">Dealer Card</th>
          <th className="p-2">Basic Play</th>
          <th className="p-2">Deviation</th>
          <th className="p-2">True Count Index</th>
        </tr>
      </thead>
      <tbody>
        {countDeviations.map((dev, index) => (
          <tr key={index} className="border-t border-gray-700 text-center">
            <td className="p-2">{dev.player}</td>
            <td className="p-2">{dev.dealer}</td>
            <td className="p-2">{dev.basic}</td>
            <td className="p-2 font-bold text-yellow-400">{dev.deviation}</td>
            <td className="p-2 font-bold text-yellow-400">{`≥ ${dev.trueCount}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function ChartsWindow() {
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserStatus() {
      const response = await fetch('/api/user/status');
      const { isPro } = await response.json();
      setIsPro(isPro);
      setIsLoading(false);
    }
    checkUserStatus();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading charts...</div>;
  }

  return (
    <div className="space-y-12">
      <StrategyTable title="Hard Totals" data={basicStrategy.hardTotals} />
      <StrategyTable title="Soft Totals" data={basicStrategy.softTotals} />
      <StrategyTable title="Pairs" data={basicStrategy.pairs} />

      {isPro ? (
        <DeviationsTable />
      ) : (
        <div className="text-center p-8 bg-gray-800 rounded-lg max-w-2xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Unlock Deviation Charts</h3>
          <p className="text-gray-400 mb-6">Upgrade to Pro to see the charts for when to deviate from basic strategy based on the true count.</p>
          <a href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Upgrade to Pro
          </a>
        </div>
      )}
    </div>
  );
} 