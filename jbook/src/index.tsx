import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const serviceRef = useRef<esbuild.Service | null>(null);

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const handleTranspile = async () => {
    if (!serviceRef.current) return;

    const data = await serviceRef.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(data.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>
      <div>
        <button onClick={handleTranspile}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
