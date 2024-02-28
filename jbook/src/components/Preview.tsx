import React, { useEffect, useRef } from "react";

interface PreviewPropsType {
  code: string;
}

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

const Preview: React.FC<PreviewPropsType> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // reset DOM
    iframeRef.current.srcdoc = html;

    // create message
    iframeRef.current.contentWindow?.postMessage(code, "*");
  }, [code]);

  return <iframe ref={iframeRef} sandbox="allow-scripts" title="preview" />;
};

export default Preview;
