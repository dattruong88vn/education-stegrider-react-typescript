import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "../src/styles/base.css";
import TextEditor from "./components/textEditor/TextEditor";
import store from "./state/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
