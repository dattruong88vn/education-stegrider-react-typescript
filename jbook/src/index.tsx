import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

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

    // const data = await serviceRef.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });

    const data = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
    });

    setCode(data.outputFiles[0].text);
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
