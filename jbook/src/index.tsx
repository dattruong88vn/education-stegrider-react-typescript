import ReactDOM from "react-dom/client";
import "../src/styles/base.css";
import TextEditor from "./components/textEditor/TextEditor";

const App = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
