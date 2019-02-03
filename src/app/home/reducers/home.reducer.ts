import { Action } from "@ngrx/store";
import { HomeActions, HomeActionTypes } from "../actions/home.actions";

export interface State {
  status: string;
  progress: number;
}

export const initialState: State = {
  status: "nothing",
  progress: null
};

export function reducer(state = initialState, action: HomeActions): State {
  switch (action.type) {
    case HomeActionTypes.DownloadFile:
      return {
        ...state,
        status: "downloading...",
        progress: 0
      };

    case HomeActionTypes.DownloadFileSuccess:
      return {
        ...state,
        status: action.payload.message,
        progress: 100
      };

    case HomeActionTypes.DownloadMultipleFilesSuccess:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}

export const getStatus = (state: State) => state.status;
export const getProgress = (state: State) => state.progress;
