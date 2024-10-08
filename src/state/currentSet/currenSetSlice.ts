import { Flashcard } from "../../shared/interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//mock example Spanish Cards
const initialState: Flashcard[] = [
    // {
    //     cardId: "0",
    //     question: "How do you say \"programming\"",
    //     answer: "programación",
    //     confidence: 0
    // },
    // {
    //     cardId: "1",
    //     question: "How do you say \"dog\"",
    //     answer: "perro/perra",
    //     confidence: 0
    // },
    // {
    //     cardId: "2",
    //     question: "How do you say \"I go\"",
    //     answer: "voy",
    //     confidence: 0
    // },
    // {
    //     cardId: "3",
    //     question: "How do you say \"You need?\"",
    //     answer: "necesitas",
    //     confidence: 0
    // },
]

const currentSetSlice = createSlice( {
    name: "currentSet",
    initialState,
    reducers: {

        setCurrentSet: (state, action: PayloadAction<Flashcard[]>) => {
            return action.payload; // Set the new flashcards for the selected set
          },

        updateConfidence: (state, action: PayloadAction<{ cardId: string; newConfidence: 0 | 1 | 2}>) => {
            const { cardId, newConfidence } = action.payload;

            return state.map((card) =>
                card.cardId === cardId ? { ...card, confidence: newConfidence } : card
              );
        }
    },
});

export const { updateConfidence, setCurrentSet } = currentSetSlice.actions;

export default currentSetSlice.reducer;