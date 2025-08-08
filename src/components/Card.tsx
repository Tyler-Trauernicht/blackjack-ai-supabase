import React from 'react';

interface CardProps {
  card: string;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const suit = card.slice(-1);
  const rank = card.slice(0, -1);

  const suitIsRed = suit === '♥' || suit === '♦';
  const color = suitIsRed ? 'text-red-500' : 'text-white';

  return (
    <div className={`rounded-xl w-24 h-36 flex flex-col justify-between p-2 font-bold text-2xl border border-neutral-700/70 bg-neutral-900/40 backdrop-blur ${color} shadow-lg`}
         style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.25)' }}>
      <div className="text-left">
        <div>{rank}</div>
        <div className="text-xl">{suit}</div>
      </div>
      <div className="text-right rotate-180">
        <div>{rank}</div>
        <div className="text-xl">{suit}</div>
      </div>
    </div>
  );
};

export default Card; 