import { SearchRepositoriesActionTypes } from "../action-types";
import { SearchRepositoriesActions } from "../actions";

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState: RepositoriesState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: SearchRepositoriesActions
): RepositoriesState => {
  switch (action.type) {
    case SearchRepositoriesActionTypes.SEARCH_REPOSITORIES: {
      return { loading: true, error: null, data: [] };
    }
    case SearchRepositoriesActionTypes.SEARCH_REPOSITORIES_SUCCESS: {
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    }
    case SearchRepositoriesActionTypes.SEARCH_REPOSITORIES_FAILED: {
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
    }
    default:
      return state;
  }
};

export default reducer;
