import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import CodeEditor from "./components/CodeEditor";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [input, setInput] = useState("");

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
    if (!serviceRef.current || !iframeRef.current) return;

    // const data = await serviceRef.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });

    iframeRef.current.srcdoc = html;

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
            try {
              window.eval(event.data);
            } catch(err) {
              const ele = document.querySelector('#root');
              ele.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
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
      <CodeEditor />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>
      <div>
        <button onClick={handleTranspile}>Submit</button>
      </div>
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
