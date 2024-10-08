import { Flashcard } from "../../shared/interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//mock example Spanish Cards
const initialState: Flashcard[] = [
    {
        cardId: "0",
        question: "How do you say \"programming\"",
        answer: "programación",
        confidence: 0
    },
    {
        cardId: "1",
        question: "How do you say \"dog\"",
        answer: "perro/perra",
        confidence: 0
    },
    {
        cardId: "2",
        question: "How do you say \"I go\"",
        answer: "voy",
        confidence: 0
    },
    {
        cardId: "3",
        question: "How do you say \"You need?\"",
        answer: "necesitas",
        confidence: 0
    },
]

const currentSetSlice = createSlice( {
    name: "currentSet",
    initialState,
    reducers: {
        updateConfidence: (state, action: PayloadAction<{ cardId: string; newConfidence: 0 | 1 | 2}>) => {
            const { cardId, newConfidence } = action.payload;

            // const cardIndex = state.findIndex(card => card.cardId === cardId);

            // if (cardIndex !== -1) {
            //     state[cardIndex].confidence = newConfidence; // Update the confidence of the found card
            //   } else {
            //     console.error('Cardsets Slicer: Invalid cardId provided');
            // }
            return state.map((card) =>
                card.cardId === cardId ? { ...card, confidence: newConfidence } : card
              );
        }
    },
});

export const { updateConfidence } = currentSetSlice.actions;

export default currentSetSlice.reducer;