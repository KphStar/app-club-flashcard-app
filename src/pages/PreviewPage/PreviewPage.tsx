import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { Flashcard } from '../../shared/interfaces';
import { RootState } from '@reduxjs/toolkit/query';
import { setCurrentSet } from '../../state/currentSet/currenSetSlice'; // Import the action to set current cards
import { Button } from 'primereact/button'; // Import PrimeReact Button
import styles from './PreviewPage.module.css';

const PreviewPage = () => {
  const { setId } = useParams<{ setId: string }>(); // Dynamically get the setId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigate to study page when needed

  const cardset: Flashcard[] = useSelector((state: RootState) => state.currentSet); // Fetch current flashcards

  useEffect(() => {
    // Simulating fetching flashcards based on setId. In a real scenario, you'd load from a file.
    const fetchFlashcardsForSet = async (setId: string) => {
      // Replace with your logic to fetch flashcards based on setId
      const flashcards = await window.electron.readFlashcards(setId);
      dispatch(setCurrentSet(flashcards));
    };

    if (setId) {
      fetchFlashcardsForSet(setId);
    }
  }, [setId, dispatch]);

  const randomColor = () => {
    const colors = ['#ff6347', '#ffa500', '#00ff00', '#1e90ff', '#9370db'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const greenColor = '#00ff00';

  if (cardset.length === 0) {
    return <h1>No flashcards available for this set!</h1>;
  }

  return (
    <div className={styles.previewPageContainer}>
      <h1 className={styles.pageTitle}>Preview of Flashcards</h1>

      {/* Study, Edit, and Overview Buttons at the bottom */}
      <div className={styles.buttonGroup}>
        <Button label="Study" onClick={() => navigate(`/study/${setId}`)} className="p-button-success" />
        <Button label="Edit" className="p-button-warning" style={{ marginLeft: '15px' }} />
        <Button label="Back" onClick={() => navigate('/overview')} style={{ marginLeft: '15px' }} />
      </div>

      <div className="container mt-4">
        <div className="row">
          {cardset.map((card, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Card className={styles.cardStyle} style={{ margin: '10px', padding: '20px' }}>
                <h5 className={styles.questionTitle} style={{ color: randomColor() }}>Question</h5>
                <p className={styles.questionText}>{card.question}</p>
                <hr />
                <h5 className={styles.answerTitle} style={{ color: greenColor }}>Answer</h5>
                <p className={styles.answerText}>{card.answer}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default PreviewPage;
