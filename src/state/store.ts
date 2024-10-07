import { configureStore } from "@reduxjs/toolkit";
import cardsetsReducer from "./cardsets/cardsetsSlice";
import currentSetReducer from "./currentSet/currenSetSlice";

export const store = configureStore({
    reducer: {
        cardsets: cardsetsReducer,
        currentSet: currentSetReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
