import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import { RootState } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { Flashcard } from '../../shared/interfaces';
import FinishPage from '../FinishPage/FinishPage';
import { getNextCard } from '../../services/flashcardLogic'; // Import the function
import { updateConfidence } from '../../state/currentSet/currenSetSlice';

const StudyPage = () => {


  const dispatch = useDispatch();
  const cardset: Flashcard[] = useSelector((state: RootState) => state.currentSet); // Assume this is an array of Flashcards
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [previousCard, setPreviousCard] = useState<Flashcard | null>(null); // Previous card

     // Function to set the confidence of the current card
  const setConfidence = (newConfidence: 0 | 1 | 2) => {
    if (!currentCard) return;

    // Dispatch action to update confidence in Redux state
    const cardIndex = cardset.findIndex(card => card.cardId === currentCard.cardId);
    if (cardIndex !== -1) {
      dispatch(updateConfidence({ index: cardIndex, newConfidence }));
    }

    // Set the previous card to the current card (updated with new confidence)
    const updatedPreviousCard = { ...currentCard, confidence: newConfidence };
    setPreviousCard(updatedPreviousCard);

    // Get the next card by passing in the updated previous card
    const nextCard = getNextCard(updatedPreviousCard, cardset);
    setCurrentCard(nextCard);
  };

  // Load the first card initially
  useEffect(() => {
    if (!currentCard) {
      // When there's no previous card, pass null and get the first card from the card set
      const firstCard = getNextCard(null, cardset);
      setCurrentCard(firstCard);
    }
  }, [currentCard, cardset]);

  return (
    <div>
      <h1>Study Page</h1>
      {currentCard ? (
        <div>
          <h2>{currentCard.question}</h2>
          <button onClick={() => setConfidence(0)}>Idk?</button>
          <button onClick={() => setConfidence(1)}>Ehhh</button>
          <button onClick={() => setConfidence(2)}>I know it!</button>
        </div>
      ) : (
        <FinishPage />
      )}
    </div>
  );
};

export default StudyPage;


