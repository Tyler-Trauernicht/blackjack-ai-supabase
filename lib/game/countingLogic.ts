import { type Card } from './types';
import { createShoe } from './basicStrategy';

/**
 * Gets the Hi-Lo value for a single card.
 * Low cards (2-6) are +1.
 * High cards (10, J, Q, K, A) are -1.
 * Neutral cards (7-9) are 0.
 * @param card - The card to evaluate.
 */
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

/**
 * Creates a card counting drill.
 * @param numCards - The number of cards to show in the drill.
 * @returns An object containing the array of cards for the drill and the correct final running count.
 */
export function createCountingDrill(numCards: number = 25): { cards: Card[], finalCount: number } {
  const shoe = createShoe(1); // Use a single deck for a more volatile count
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
