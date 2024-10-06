import { FlashcardActionTypes, FlashcardSet, ADD_FLASHCARD_SET, UPDATE_FLASHCARD_SET } from '../actions/flashcardActions';

export interface FlashcardState {
  flashcardSets: {
    [key: string]: FlashcardSet;
  };
}

const initialState: FlashcardState = {
    flashcardSets: {
        "1": { title: "Math Flashcards", description: "Math problems", cards: ["What is 2 + 2?", "What is 10 / 5?"] },
        "2": { title: "History Flashcards", description: "Historical facts", cards: ["Who was the first president?", "When was the Declaration signed?"] }
      }
};

export const flashcardReducer = (state = initialState, action: FlashcardActionTypes): FlashcardState => {
  switch (action.type) {
    case ADD_FLASHCARD_SET:
      return {
        ...state,
        flashcardSets: {
          ...state.flashcardSets,
          [action.payload.setId]: action.payload.setData,
        },
      };
    case UPDATE_FLASHCARD_SET:
      return {
        ...state,
        flashcardSets: {
          ...state.flashcardSets,
          [action.payload.setId]: action.payload.setData,
        },
      };
    default:
      return state;
  }
};
