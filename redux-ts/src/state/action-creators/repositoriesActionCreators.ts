import axios from "axios";
import { Dispatch } from "redux";

import { SearchRepositoriesActionTypes } from "../action-types";
import { SearchRepositoriesActions } from "../actions";

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<SearchRepositoriesActions>) => {
    dispatch({
      type: SearchRepositoriesActionTypes.SEARCH_REPOSITORIES,
    });
    try {
      const { data } = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${term}`
      );
      const result = data.objects.map((result: any) => result.package.name);
      dispatch({
        type: SearchRepositoriesActionTypes.SEARCH_REPOSITORIES_SUCCESS,
        payload: result,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: SearchRepositoriesActionTypes.SEARCH_REPOSITORIES_FAILED,
          payload: err.message,
        });
      }
    }
  };
};
