import { type Hand, type Card, type Action } from './types';
import { getHandValue, getCorrectAction } from './basicStrategy';
import deviations from '@/data/countDeviations.json';

export function getDeviationAction(playerHand: Hand, dealerCard: Card, trueCount: number): Action {
  const { value: playerValue } = getHandValue(playerHand);

  const applicableDeviations = deviations
    .filter(dev =>
      parseInt(dev.player) === playerValue &&
      dev.dealer === dealerCard.rank &&
      trueCount >= dev.trueCount
    )
    .sort((a, b) => b.trueCount - a.trueCount);

  if (applicableDeviations.length > 0) {
    return applicableDeviations[0].deviation as Action;
  }

  return getCorrectAction(playerHand, dealerCard);
}

export function createDeviationDrill(): { playerHand: Hand, dealerCard: Card, trueCount: number } {
  const drill = deviations[Math.floor(Math.random() * deviations.length)];

  const playerValue = parseInt(drill.player);
  let playerHand: Hand;
  if (playerValue === 16) playerHand = [{rank: '10', suit: '♠'}, {rank: '6', suit: '♦'}];
  else if (playerValue === 15) playerHand = [{rank: '9', suit: '♠'}, {rank: '6', suit: '♦'}];
  else if (playerValue === 13) playerHand = [{rank: '8', suit: '♠'}, {rank: '5', suit: '♦'}];
  else if (playerValue === 12) playerHand = [{rank: '10', suit: '♠'}, {rank: '2', suit: '♦'}];
  else if (playerValue === 11) playerHand = [{rank: '5', suit: '♠'}, {rank: '6', suit: '♦'}];
  else if (playerValue === 10) playerHand = [{rank: '4', suit: '♠'}, {rank: '6', suit: '♦'}];
  else playerHand = [{rank: '10', suit: '♠'}, {rank: '6', suit: '♦'}];

  const dealerRank = drill.dealer as Card['rank'];
  const dealerCard: Card = {rank: dealerRank, suit: '♣'};

  const trueCount = drill.trueCount + Math.floor(Math.random() * 2);

  return { playerHand, dealerCard, trueCount };
} 