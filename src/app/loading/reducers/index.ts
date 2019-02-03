import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import * as fromLoading from "./loading.reducer";
import { AppConfig } from "../../../environments/environment";

export interface State {
  loading: fromLoading.State;
}

export const reducers: ActionReducerMap<State> = {
  loading: fromLoading.reducer
};

export const metaReducers: MetaReducer<State>[] = !AppConfig.production
  ? []
  : [];

export const selectLoadingState = createFeatureSelector<fromLoading.State>(
  "loading"
);

export const selectLoadingsArray = createSelector(
  selectLoadingState,
  fromLoading.selectAll
);
