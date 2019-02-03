import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Loading } from "../models/loading.model";

export enum LoadingActionTypes {
  LoadLoadings = "[Loading] Load Loadings",
  AddLoading = "[Loading] Add Loading",
  UpsertLoading = "[Loading] Upsert Loading",
  AddLoadings = "[Loading] Add Loadings",
  UpsertLoadings = "[Loading] Upsert Loadings",
  UpdateLoading = "[Loading] Update Loading",
  UpdateLoadings = "[Loading] Update Loadings",
  DeleteLoading = "[Loading] Delete Loading",
  DeleteLoadings = "[Loading] Delete Loadings",
  ClearLoadings = "[Loading] Clear Loadings"
}

export class LoadLoadings implements Action {
  readonly type = LoadingActionTypes.LoadLoadings;

  constructor(public payload: { loadings: Loading[] }) {}
}

export class AddLoading implements Action {
  readonly type = LoadingActionTypes.AddLoading;

  constructor(public payload: { loading: Loading }) {}
}

export class UpsertLoading implements Action {
  readonly type = LoadingActionTypes.UpsertLoading;

  constructor(public payload: Loading) {}
}

export class AddLoadings implements Action {
  readonly type = LoadingActionTypes.AddLoadings;

  constructor(public payload: { loadings: Loading[] }) {}
}

export class UpsertLoadings implements Action {
  readonly type = LoadingActionTypes.UpsertLoadings;

  constructor(public payload: { loadings: Loading[] }) {}
}

export class UpdateLoading implements Action {
  readonly type = LoadingActionTypes.UpdateLoading;

  constructor(public payload: { loading: Update<Loading> }) {}
}

export class UpdateLoadings implements Action {
  readonly type = LoadingActionTypes.UpdateLoadings;

  constructor(public payload: { loadings: Update<Loading>[] }) {}
}

export class DeleteLoading implements Action {
  readonly type = LoadingActionTypes.DeleteLoading;

  constructor(public payload: string) {}
}

export class DeleteLoadings implements Action {
  readonly type = LoadingActionTypes.DeleteLoadings;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearLoadings implements Action {
  readonly type = LoadingActionTypes.ClearLoadings;
}

export type LoadingActions =
  | LoadLoadings
  | AddLoading
  | UpsertLoading
  | AddLoadings
  | UpsertLoadings
  | UpdateLoading
  | UpdateLoadings
  | DeleteLoading
  | DeleteLoadings
  | ClearLoadings;
