import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";

const CodeCell = () => {
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

export default CodeCell;
