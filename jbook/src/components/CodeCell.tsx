import { useEffect, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resizable from "./Resizable";

let timer: ReturnType<typeof setTimeout>;

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  // const handleTranspile = async () => {
  //   const data = await bundle(input);

  //   setCode(data);
  // };

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      const output = await bundle(input);

      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <Resizable axis="y">
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <Resizable axis="x">
            <CodeEditor
              value={input}
              onChange={(value) => setInput(value || "")}
            />
          </Resizable>
          <Preview code={code} bundleErr={err} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
