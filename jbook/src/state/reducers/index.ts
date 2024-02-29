import { combineReducers } from "redux";
import CellsReducer from "./cellsReducer";

const reducers = combineReducers({
  cells: CellsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
