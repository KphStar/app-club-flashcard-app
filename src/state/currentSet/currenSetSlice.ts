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
        updateConfidence: (state, action: PayloadAction<{ index: number; newConfidence: 0 | 1 | 2}>) => {
            const { index, newConfidence } = action.payload;

            if(state[index]) {
                state[index].confidence = newConfidence;
            } else {
                console.error("Cardsets Slicer: Invalid index provided");
            }
        }
    },
});

export const { updateConfidence } = currentSetSlice.actions;

export default currentSetSlice.reducer;