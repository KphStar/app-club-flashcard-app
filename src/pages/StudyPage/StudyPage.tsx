import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import { RootState } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { Flashcard } from '../../shared/interfaces';
import FinishPage from '../FinishPage/FinishPage';
import { getNextCard } from '../../services/flashcardLogic';
import { updateConfidence } from '../../state/currentSet/currenSetSlice';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import styles from './StudyPage.module.css';
         

const StudyPage = () => {


  const dispatch = useDispatch();
  const cardset: Flashcard[] = useSelector((state: RootState) => state.currentSet); // Assume this is an array of Flashcards
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [previousCard, setPreviousCard] = useState<Flashcard | null>(null); // Previous card

     // Function to set the confidence of the current card
  const setConfidence = (newConfidence: 0 | 1 | 2) => {
    if (!currentCard) return;

    // Dispatch action to update confidence in Redux state
    dispatch(updateConfidence({ cardId: currentCard.cardId, newConfidence }));
    

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
    <div className={styles.studyPageContainer}>
      <h1 className={styles.studyPageTitle}>Study Page</h1>
      {currentCard ? (
        <div className={styles.studyPageContent}>
          <h2 className={styles.questionTitle}>{currentCard.question}</h2>
          <Accordion activeIndex={0} className={styles.customAccordion}>
            <AccordionTab header="Click to reveal answer">
              <p>{currentCard.answer}</p>
            </AccordionTab>
          </Accordion>
          <div className={styles.buttonGroup}>
            <Button label="Idk?" onClick={() => setConfidence(0)} className="p-button-danger" />
            <Button label="Ehhh" onClick={() => setConfidence(1)} className="p-button-warning" />
            <Button label="I know it!" onClick={() => setConfidence(2)} className="p-button-success" />
          </div>
        </div>
      ) : (
        <FinishPage />
      )}
    </div>
  );
};

export default StudyPage;


