// Action types
export const START_SESSION = 'START_SESSION';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const END_SESSION = 'END_SESSION';

// Define the structure for starting a session
export interface StartSessionAction {
  type: typeof START_SESSION;
  payload: {
    setId: string;
  };
}

// Define the structure for updating progress
export interface UpdateProgressAction {
  type: typeof UPDATE_PROGRESS;
  payload: {
    progress: number;  // Percentage of progress (0-100)
  };
}

// Define the structure for ending a session
export interface EndSessionAction {
  type: typeof END_SESSION;
}

// Union type for all study session actions
export type StudySessionActionTypes = StartSessionAction | UpdateProgressAction | EndSessionAction;

// Action creators

// Start a new study session for a specific flashcard set
export const startSession = (setId: string): StartSessionAction => ({
  type: START_SESSION,
  payload: { setId },
});

// Update the progress of the current session
export const updateProgress = (progress: number): UpdateProgressAction => ({
  type: UPDATE_PROGRESS,
  payload: { progress },
});

// End the current session
export const endSession = (): EndSessionAction => ({
  type: END_SESSION,
});
