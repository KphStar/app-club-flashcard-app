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
import { Dialog } from 'primereact/dialog';
         

const StudyPage = () => {
  const dispatch = useDispatch();
  const cardset: Flashcard[] = useSelector((state: RootState) => state.currentSet); 
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [previousCard, setPreviousCard] = useState<Flashcard | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | number[]>(-1); // Use `number | number[]` for activeIndex type
  const [visible, setVisible] = useState<boolean>(false);

  const setConfidence = (newConfidence: 0 | 1 | 2) => {
    // Collapse the accordion after setting the confidence
    setActiveIndex(-1); // Use -1 to collapse the accordion
    
    if (!currentCard) return;

    dispatch(updateConfidence({ cardId: currentCard.cardId, newConfidence }));

    const updatedPreviousCard = { ...currentCard, confidence: newConfidence };
    setPreviousCard(updatedPreviousCard);

    const nextCard = getNextCard(updatedPreviousCard, cardset);
    setCurrentCard(nextCard);

    setVisible(false);    
  };

  const onTabChangeAcc = (eIndex: any) => {
    setActiveIndex(eIndex); 
    setVisible(true);
  }

  useEffect(() => {
    if (!currentCard) {
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
          <Accordion 
            activeIndex={activeIndex} 
            onTabChange={(e) => onTabChangeAcc(e.index)} 
            className={styles.customAccordion}
            
          >
            <AccordionTab header="Click to reveal answer">
              {visible && <p>{currentCard.answer}</p>}
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


