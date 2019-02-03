import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Loading } from "../models/loading.model";
import { LoadingActions, LoadingActionTypes } from "../actions/loading.actions";

export interface State extends EntityState<Loading> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Loading> = createEntityAdapter<Loading>({
  sortComparer: (a: Loading, b: Loading) => b.date - a.date
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: LoadingActions): State {
  switch (action.type) {
    case LoadingActionTypes.AddLoading: {
      return adapter.addOne(action.payload.loading, state);
    }

    case LoadingActionTypes.UpsertLoading: {
      return adapter.upsertOne(action.payload, state);
    }

    case LoadingActionTypes.AddLoadings: {
      return adapter.addMany(action.payload.loadings, state);
    }

    case LoadingActionTypes.UpsertLoadings: {
      return adapter.upsertMany(action.payload.loadings, state);
    }

    case LoadingActionTypes.UpdateLoading: {
      return adapter.updateOne(action.payload.loading, state);
    }

    case LoadingActionTypes.UpdateLoadings: {
      return adapter.updateMany(action.payload.loadings, state);
    }

    case LoadingActionTypes.DeleteLoading: {
      return adapter.removeOne(action.payload, state);
    }

    case LoadingActionTypes.DeleteLoadings: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case LoadingActionTypes.LoadLoadings: {
      return adapter.addAll(action.payload.loadings, state);
    }

    case LoadingActionTypes.ClearLoadings: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
