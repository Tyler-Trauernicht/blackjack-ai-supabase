import { type Suit, type Rank, type Card, type Hand, type Action } from './types';
import strategy from '@/data/basicStrategy.json';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createSingleDeck(): Card[] {
  return SUITS.flatMap(suit => RANKS.map(rank => ({ rank, suit })));
}

export function createShoe(numDecks: number = 6): Card[] {
  const shoe: Card[] = [];
  for (let i = 0; i < numDecks; i++) {
    shoe.push(...createSingleDeck());
  }

  for (let i = shoe.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shoe[i], shoe[j]] = [shoe[j], shoe[i]];
  }

  return shoe;
}

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

export function getCorrectAction(playerHand: Hand, dealerCard: Card): Action {
  const { value: playerValue, isSoft } = getHandValue(playerHand);
  const dealerRank = dealerCard.rank;

  if (playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank) {
    const pair = playerHand[0].rank;
    const pairKey = `${pair}${pair}` as keyof typeof strategy.pairs;
    if (pairKey in strategy.pairs) {
      return strategy.pairs[pairKey][dealerRank as keyof typeof strategy.pairs['22']] as Action;
    }
  }

  if (isSoft && playerHand.length === 2) {
    const nonAceCard = playerHand.find(c => c.rank !== 'A')!;
    const softKey = `A${nonAceCard.rank}` as keyof typeof strategy.softTotals;
    if (softKey in strategy.softTotals) {
      return strategy.softTotals[softKey][dealerRank as keyof typeof strategy.softTotals['A2']] as Action;
    }
  }

  if (playerValue <= 21) {
    const hardKey = playerValue.toString() as keyof typeof strategy.hardTotals;
    if (hardKey in strategy.hardTotals) {
      return strategy.hardTotals[hardKey][dealerRank as keyof typeof strategy.hardTotals['8']] as Action;
    }
  }

  return 'Stand';
}

export function formatCard(card: Card): string {
  return `${card.rank}${card.suit}`;
} 