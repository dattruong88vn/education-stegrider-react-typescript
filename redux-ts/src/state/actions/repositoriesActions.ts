import { SearchRepositoriesActionTypes } from "../action-types";

export interface SearchRepositoriesRequest {
  type: SearchRepositoriesActionTypes.SEARCH_REPOSITORIES;
}
export interface SearchRepositoriesSuccessAction {
  type: SearchRepositoriesActionTypes.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}
export interface SearchRepositoriesFailedAction {
  type: SearchRepositoriesActionTypes.SEARCH_REPOSITORIES_FAILED;
  payload: string;
}

export type SearchRepositoriesActions =
  | SearchRepositoriesRequest
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesFailedAction;
