import React from 'react';

interface CardProps {
  card: string;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const suit = card.slice(-1);
  const rank = card.slice(0, -1);

  const suitColor = (suit === '♥' || suit === '♦') ? 'text-red-500' : 'text-black';

  return (
    <div className={`bg-white rounded-lg shadow-md w-24 h-36 flex flex-col justify-between p-2 font-bold text-2xl ${suitColor}`}>
      <div className="text-left">
        <div>{rank}</div>
        <div>{suit}</div>
      </div>
      <div className="text-right transform rotate-180">
        <div>{rank}</div>
        <div>{suit}</div>
      </div>
    </div>
  );
};

export default Card;
