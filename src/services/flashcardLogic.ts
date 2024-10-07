import { Flashcard } from '../shared/interfaces'; // Adjust the path based on your structure

export const getNextCard = (previousCard: Flashcard | null, cardSet: Flashcard[]): Flashcard | null => {
  // If all cards are confidence level 2, return null (finish)
  if (cardSet.every(card => card.confidence === 2)) {
    return null;
  }

  const otherCards = cardSet.filter(card => previousCard ? card.cardId !== previousCard.cardId : true);

  if (previousCard?.confidence === 0) {
    return (
      otherCards.find(card => card.confidence === 1) ||
      otherCards.find(card => card.confidence === 2) ||
      otherCards.find(card => card.confidence === 0) ||
      null
    );
  } else if (previousCard?.confidence === 2) {
    return (
      otherCards.find(card => card.confidence === 1) ||
      otherCards.find(card => card.confidence === 0) ||
      null
    );
  } else if (previousCard?.confidence === 1) {
    return (
      otherCards.find(card => card.confidence === 0) ||
      otherCards.find(card => card.confidence === 2) ||
      otherCards.find(card => card.confidence === 1) ||
      null
    );
  }

  return cardSet.find(card => card.confidence === 0) || cardSet.find(card => card.confidence === 1) || cardSet.find(card => card.confidence === 2) || null;
};
