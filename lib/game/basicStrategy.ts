import { type Suit, type Rank, type Card, type Hand, type Action } from './types';
import strategy from '@/public/data/basicStrategy.json';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

/**
 * Creates a standard 52-card deck.
 */
function createSingleDeck(): Card[] {
  return SUITS.flatMap(suit => RANKS.map(rank => ({ rank, suit })));
}

/**
 * Creates a shuffled shoe of cards from multiple decks.
 * @param numDecks - The number of decks to include in the shoe.
 */
export function createShoe(numDecks: number = 6): Card[] {
  let shoe: Card[] = [];
  for (let i = 0; i < numDecks; i++) {
    shoe.push(...createSingleDeck());
  }

  // Shuffle the shoe using Fisher-Yates algorithm
  for (let i = shoe.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shoe[i], shoe[j]] = [shoe[j], shoe[i]];
  }

  return shoe;
}

/**
 * Calculates the value of a blackjack hand.
 * Aces are counted as 11 unless it causes a bust, then they are 1.
 */
export function getHandValue(hand: Hand): { value: number, isSoft: boolean } {
  let value = 0;
  let numAces = 0;

  for (const card of hand) {
    if (card.rank === 'A') {
      numAces++;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank, 10);
    }
  }

  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }

  const isSoft = numAces > 0 && value - 11 < 11;

  return { value, isSoft };
}

function getCardValue(card: Card): number {
    if (card.rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(card.rank)) return 10;
    return parseInt(card.rank, 10);
}

/**
 * Determines the correct basic strategy action for a given hand.
 * @param playerHand - The player's hand.
 * @param dealerCard - The dealer's up-card.
 */
export function getCorrectAction(playerHand: Hand, dealerCard: Card): Action {
  const { value: playerValue, isSoft } = getHandValue(playerHand);
  const dealerValue = getCardValue(dealerCard);
  const dealerRank = dealerCard.rank;

  // Check for pairs
  if (playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank) {
    const pair = playerHand[0].rank;
    const pairKey = `${pair}${pair}`;
    if (pairKey in strategy.pairs) {
        return strategy.pairs[pairKey as keyof typeof strategy.pairs][dealerRank as keyof typeof strategy.pairs['22']] as Action;
    }
  }

  // Check for soft totals
  if (isSoft && playerHand.length === 2) {
    const nonAceCard = playerHand.find(c => c.rank !== 'A')!;
    const softKey = `A${nonAceCard.rank}`;
     if (softKey in strategy.softTotals) {
        return strategy.softTotals[softKey as keyof typeof strategy.softTotals][dealerRank as keyof typeof strategy.softTotals['A2']] as Action;
    }
  }

  // Check for hard totals
  if (playerValue <= 21) {
    const hardKey = playerValue.toString();
     if (hardKey in strategy.hardTotals) {
        return strategy.hardTotals[hardKey as keyof typeof strategy.hardTotals][dealerRank as keyof typeof strategy.hardTotals['8']] as Action;
    }
  }

  // Default to Stand if no other rule applies (e.g., total > 17) or something is wrong
  return 'Stand';
}

/**
 * Formats a card object into a string representation.
 */
export function formatCard(card: Card): string {
    return `${card.rank}${card.suit}`;
}
