import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import * as fromHome from "./home.reducer";
import { AppConfig } from "../../../environments/environment";

export interface State {
  home: fromHome.State;
}

export const reducers: ActionReducerMap<State> = {
  home: fromHome.reducer
};

export const metaReducers: MetaReducer<State>[] = !AppConfig.production
  ? []
  : [];

export const selectHomeState = createFeatureSelector<fromHome.State>("home");

export const selectStatus = createSelector(
  selectHomeState,
  fromHome.getStatus
);

export const selectProgress = createSelector(
  selectHomeState,
  fromHome.getProgress
);
