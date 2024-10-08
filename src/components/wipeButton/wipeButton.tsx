import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { updateConfidence } from "../../state/currentSet/currenSetSlice"; // Import the action
import { Flashcard } from "../../shared/interfaces";
import { Button } from 'primereact/button'; // Import PrimeNG Button

const WipeButton = () => {
  const dispatch = useDispatch();
  const currSet: Flashcard[] = useSelector((state: RootState) => state.currentSet); // Assume this is an array of Flashcards

  // Function to wipe the confidence of all cards
  const wipeConfidence = () => {
    currSet.forEach((card: Flashcard) => {
        let cardId: string = card.cardId;
        dispatch(updateConfidence({ cardId, newConfidence: 0 })); // Dispatch to reset confidence for each card
    });
  };

  return (
    <div>
      {/* PrimeNG Button */}
      <Button label='Review Again' onClick={wipeConfidence} /> {/* Call wipeConfidence on button click */}
    </div>
  );
};

export default WipeButton;