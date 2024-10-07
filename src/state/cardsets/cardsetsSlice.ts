interface Cardset {
    title: string;
    setId: string;
    description: string;
    reminderTime: Date | null;
    cardIds: string[]; //the card ids that belong to this set
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Cardset[] = [
    {
        title: "Spanish Cards",
        setId: "0",
        description: "Spanish Vocab for my upcoming final",
        reminderTime: new Date('2024-09-27T00:00:00'),
        cardIds: ["0-0", "0-1", "0-2"],
    },
    {
        title: "Math Cards",
        setId: "1",
        description: "Math definitions for my discrete math final",
        reminderTime: new Date('2024-10-09T00:00:00'),
        cardIds: ["1-0", "1-1", "1-2"],
    },
    {
        title: "Physics Cards",
        setId: "2",
        description: "Phsyics Formula for my final",
        reminderTime: new Date('2024-10-27T00:00:00'),
        cardIds: ["2-0", "2-1", "2-2"],
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