import { configureStore } from "@reduxjs/toolkit";
import cardsetsReducer from "./cardsets/cardsetsSlice";

export const store = configureStore({
    reducer: {
        cardsets: cardsetsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
