import { type Card } from './types';
import { createShoe } from './basicStrategy';

export function getHiLoCountValue(card: Card): number {
  const rank = card.rank;
  if (['2', '3', '4', '5', '6'].includes(rank)) {
    return 1;
  }
  if (['10', 'J', 'Q', 'K', 'A'].includes(rank)) {
    return -1;
  }
  return 0;
}

export function createCountingDrill(numCards: number = 25): { cards: Card[], finalCount: number } {
  const shoe = createShoe(1);
  const drillCards = shoe.slice(0, numCards);

  let runningCount = 0;
  for (const card of drillCards) {
    runningCount += getHiLoCountValue(card);
  }

  return {
    cards: drillCards,
    finalCount: runningCount,
  };
} 