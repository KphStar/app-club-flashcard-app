import React from 'react';
import { Link } from 'react-router-dom';
import styles from './cardsetList.module.css';
import { Menubar } from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem/menuitem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { setCurrentSet } from '../../state/currentSet/currenSetSlice';



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

  return (
    <div className="cardset-container">
      <h1>Recent Card Sets</h1>
      <div className="scrollable-div">
        <ul>
          {cardsetsList.map((cardset: any) => (
            <li key={cardset.setId}>
              <h2
                onClick={() => loadFlashcards(cardset.setId)} // Trigger the loading of flashcards on click
                style={{ cursor: 'pointer', color: 'blue' }}
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