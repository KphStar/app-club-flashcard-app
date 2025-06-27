import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { setCurrentSet } from '../../state/currentSet/currenSetSlice';
import styles from './cardsetList.module.css';

const CardsetList = () => {
  const cardsetsList = useSelector((state: RootState) => state.cardsets);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to load flashcards for a specific setId
  const loadFlashcards = async (setId: string) => {
    const flashcards = await window.electron.readFlashcards(setId); // Use IPC to read the file
    dispatch(setCurrentSet(flashcards)); // Dispatch action to set the flashcards into Redux
    navigate(`/study/${setId}`);
  };

  const getRandomColor = () => {
    const colors = ['#FF6347', '#FFA500', '#00FF00', '#9370DB'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={styles.cardsetContainer}>
      <h1 className={styles.header}>Recent Card Sets</h1>
      <div className={styles.fixedHeightDiv}>
        <ul>
          {cardsetsList.slice(0, 3).map((cardset: any) => (
            <li key={cardset.setId}>
              <h2
                onClick={() => loadFlashcards(cardset.setId)} // Trigger the loading of flashcards on click
                style={{ cursor: 'pointer', color: getRandomColor() }} // Random color for each cardset
              >
                {cardset.title}
              </h2>
              <p>{cardset.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardsetList;
