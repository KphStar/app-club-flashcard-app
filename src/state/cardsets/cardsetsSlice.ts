import { Cardset } from "../../shared/interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Cardset[] = [
    {
        title: "Spanish Cards",
        setId: "4b9cfd4e-9cb7-4d10-b19d-52bb48a857f8",
        description: "Spanish Vocab for my upcoming final",
        reminderTime: new Date('2024-09-27T00:00:00'),
        numCards: 4,
    },
    {
        title: "Math Cards",
        setId: "a69d7a63-9bc2-40ae-8e9a-56d7d21fa0b7",
        description: "Math definitions for my discrete math final",
        reminderTime: new Date('2024-10-09T00:00:00'),
        numCards: 3,
    },
    {
        title: "Physics Cards",
        setId: "318f3cbb-2d9c-47d2-84e1-87461f73c57c",
        description: "Phsyics Formula for my final",
        reminderTime: new Date('2024-10-27T00:00:00'),
        numCards: 5,
    },
]

const cardsetSlice = createSlice( {
    name: "cardsets",
    initialState,
    reducers: {
        updateTitle: (state, action: PayloadAction<{ index: number; newTitle: string}>) => {
            const { index, newTitle } = action.payload;

            if(state[index]) {
                state[index].title = newTitle;
            } else {
                console.error("Cardsets Slicer: Invalid index provided");
            }
        }
    },
});

export const { updateTitle } = cardsetSlice.actions;

export default cardsetSlice.reducer;