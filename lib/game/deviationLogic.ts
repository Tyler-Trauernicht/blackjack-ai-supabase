import { type Hand, type Card, type Action } from './types';
import { getHandValue, getCorrectAction } from './basicStrategy';
import deviations from '@/public/data/countDeviations.json';

/**
 * Determines the correct action for a hand, considering deviations based on true count.
 * If a deviation is met, it returns the deviation action.
 * Otherwise, it falls back to the standard basic strategy action.
 *
 * @param playerHand - The player's hand.
 * @param dealerCard - The dealer's up-card.
 * @param trueCount - The current true count.
 * @returns The correct action to take.
 */
export function getDeviationAction(playerHand: Hand, dealerCard: Card, trueCount: number): Action {
  const { value: playerValue } = getHandValue(playerHand);
  const dealerValue = getHandValue([dealerCard]).value;

  // Find a potential deviation. We should find the one with the highest trueCount threshold that we meet.
  const applicableDeviations = deviations
    .filter(dev =>
      parseInt(dev.player) === playerValue &&
      parseInt(dev.dealer) === dealerValue &&
      trueCount >= dev.trueCount
    )
    .sort((a, b) => b.trueCount - a.trueCount); // Sort by highest trueCount first

  if (applicableDeviations.length > 0) {
    // The most specific deviation is the one with the highest true count requirement we meet
    return applicableDeviations[0].deviation as Action;
  }

  // If no deviation is found, fall back to basic strategy
  return getCorrectAction(playerHand, dealerCard);
}

/**
 * Creates a random scenario for deviation practice.
 * For simplicity, this will just pick a random deviation from the list for now.
 * A more advanced implementation could generate more varied scenarios.
 */
export function createDeviationDrill(): { playerHand: Hand, dealerCard: Card, trueCount: number } {
    const drill = deviations[Math.floor(Math.random() * deviations.length)];

    // This is a simplification. We aren't creating a "real" hand that adds up to the value,
    // as the visual representation is what matters. We'll create a common hand for that value.
    // e.g., for 16, we'll use 10 and 6.
    const playerValue = parseInt(drill.player);
    let playerHand: Hand;
    if (playerValue === 16) playerHand = [{rank: '10', suit: '♠'}, {rank: '6', suit: '♦'}];
    else if (playerValue === 15) playerHand = [{rank: '9', suit: '♠'}, {rank: '6', suit: '♦'}];
    else if (playerValue === 13) playerHand = [{rank: '8', suit: '♠'}, {rank: '5', suit: '♦'}];
    else if (playerValue === 12) playerHand = [{rank: '10', suit: '♠'}, {rank: '2', suit: '♦'}];
    else if (playerValue === 11) playerHand = [{rank: '5', suit: '♠'}, {rank: '6', suit: '♦'}];
    else if (playerValue === 10) playerHand = [{rank: '4', suit: '♠'}, {rank: '6', suit: '♦'}];
    else playerHand = [{rank: '10', suit: '♠'}, {rank: '6', suit: '♦'}]; // Default

    const dealerRank = drill.dealer === '10' ? '10' : 'A'; // Simplify for now
    const dealerCard: Card = {rank: dealerRank as any, suit: '♣'};

    // Use a true count that is at or just above the threshold to make it a clear drill
    const trueCount = drill.trueCount + Math.floor(Math.random() * 2);

    return { playerHand, dealerCard, trueCount };
}
