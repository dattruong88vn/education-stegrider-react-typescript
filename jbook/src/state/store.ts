import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { ActionType } from "./action-types";
import reducers from "./reducers";

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { type: "code" },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { type: "text" },
});

export default store;
