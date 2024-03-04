import { combineReducers } from "redux";
import CellsReducer from "./cellsReducer";
import BundleReducer from "./bundlesReducers";

const reducers = combineReducers({
  cells: CellsReducer,
  bundle: BundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
