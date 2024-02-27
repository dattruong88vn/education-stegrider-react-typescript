import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const serviceRef = useRef<esbuild.Service | null>(null);

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
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
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
    });

    setCode(data.outputFiles[0].text);

    // create message
    iframeRef.current?.contentWindow?.postMessage(
      data.outputFiles[0].text,
      "*"
    );
  };

  // Cách 1: dùng thuộc tính srcDoc của thẻ iframe để truyền dữ liệu. Cách này có nguy cơ gây 2 lỗi như sau:
  // 1. content của thẻ script quá dài
  // 2. content của thẻ script có chứa thẻ đóng <script> --> ngắt content thành 2 phần --> gây lỗi
  // const html = `
  //   <script>
  //     ${code}
  //   </script>
  // `;

  // Cách 2: dùng postMessage để gửi data vào iframe
  // 1. Thêm event vào content của iframe
  // 2. Khi bấm submit, bundle code và tạo message event. Sử dụng useRef để tham chiếu đến thẻ iframe để tạo postMessage
  const html = `
    <html>
      <head>
        <script>
          window.addEventListener('message', event => {
            window.eval(event.data);
          }, false)
        </script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `;

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
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
        title="execute-code"
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
