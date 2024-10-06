import { StudySessionActionTypes, START_SESSION, END_SESSION, UPDATE_PROGRESS } from '../actions/studySessionActions';

export interface StudySessionState {
  activeSessionId: string | null;
  progress: number;
}

const initialState: StudySessionState = {
  activeSessionId: null,
  progress: 0,
};

export const studySessionReducer = (state = initialState, action: StudySessionActionTypes): StudySessionState => {
  switch (action.type) {
    case START_SESSION:
      return {
        ...state,
        activeSessionId: action.payload.setId,
        progress: 0,
      };
    case UPDATE_PROGRESS:
      return {
        ...state,
        progress: action.payload.progress,
      };
    case END_SESSION:
      return {
        ...state,
        activeSessionId: null,
        progress: 0,
      };
    default:
      return state;
  }
};
