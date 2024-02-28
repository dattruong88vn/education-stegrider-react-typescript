import { useState } from "react";
import ReactDOM from "react-dom/client";
import bundle from "./bundler";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleTranspile = async () => {
    const data = await bundle(input);

    setCode(data);
  };

  return (
    <div>
      <CodeEditor value={input} onChange={(value) => setInput(value || "")} />
      <div>
        <button onClick={handleTranspile}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
