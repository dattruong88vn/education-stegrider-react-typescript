import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "../src/styles/base.css";
import CellList from "./components/cellList/cellList";
import store from "./state/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
