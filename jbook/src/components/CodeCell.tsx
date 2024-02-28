import { useEffect, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resizable from "./Resizable";

let timer: ReturnType<typeof setTimeout>;

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  // const handleTranspile = async () => {
  //   const data = await bundle(input);

  //   setCode(data);
  // };

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      const data = await bundle(input);

      setCode(data);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <Resizable
        axis="y"
        resizeHandles={["s"]}
        height={200}
        width={Infinity}
        maxConstraints={[Infinity, window.innerHeight * 0.9]}
        minConstraints={[Infinity, window.innerHeight * 0.2]}
      >
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <Resizable
            axis="x"
            resizeHandles={["e"]}
            height={Infinity}
            width={700}
            className="flex"
            maxConstraints={[window.innerWidth * 0.9, Infinity]}
            minConstraints={[window.innerWidth * 0.2, Infinity]}
          >
            <CodeEditor
              value={input}
              onChange={(value) => setInput(value || "")}
            />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
