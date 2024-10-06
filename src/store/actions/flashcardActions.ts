// Action types
export const ADD_FLASHCARD_SET = 'ADD_FLASHCARD_SET';
export const UPDATE_FLASHCARD_SET = 'UPDATE_FLASHCARD_SET';
export const DELETE_FLASHCARD_SET = 'DELETE_FLASHCARD_SET';

// Define the structure of a flashcard set
export interface FlashcardSet {
  title: string;
  description: string;
  cards: string[];
}

// Action interfaces
interface AddFlashcardSetAction {
  type: typeof ADD_FLASHCARD_SET;
  payload: {
    setId: string;
    setData: FlashcardSet;
  };
}

interface UpdateFlashcardSetAction {
  type: typeof UPDATE_FLASHCARD_SET;
  payload: {
    setId: string;
    setData: FlashcardSet;
  };
}

interface DeleteFlashcardSetAction {
  type: typeof DELETE_FLASHCARD_SET;
  payload: {
    setId: string;
  };
}

// Union type for all flashcard actions
export type FlashcardActionTypes = AddFlashcardSetAction | UpdateFlashcardSetAction | DeleteFlashcardSetAction;

// Action creators

// Add a new flashcard set
export const addFlashcardSet = (setId: string, setData: FlashcardSet): AddFlashcardSetAction => ({
  type: ADD_FLASHCARD_SET,
  payload: { setId, setData },
});

// Update an existing flashcard set
export const updateFlashcardSet = (setId: string, setData: FlashcardSet): UpdateFlashcardSetAction => ({
  type: UPDATE_FLASHCARD_SET,
  payload: { setId, setData },
});

// Delete a flashcard set
export const deleteFlashcardSet = (setId: string): DeleteFlashcardSetAction => ({
  type: DELETE_FLASHCARD_SET,
  payload: { setId },
});
