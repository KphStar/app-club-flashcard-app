import { combineReducers } from "redux";
import { flashcardReducer } from "./flashcardReducer";
import { studySessionReducer } from "./studySessionReducer";


const rootReducer = combineReducers({
    flashcards: flashcardReducer,
    studySession: studySessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;