import ReactDOM from "react-dom/client";
import CodeCell from "./components/CodeCell";
import "./styles/base.css";

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
