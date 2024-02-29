import { useEffect, useState } from "react";
import bundle from "../../bundler";
import { useActions } from "../../hooks/useAction";
import { Cell } from "../../state";
import Resizable from "../resizable/Resizable";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

let timer: ReturnType<typeof setTimeout>;

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      const output = await bundle(cell.content);

      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <div>
      <Resizable axis="y">
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <Resizable axis="x">
            <CodeEditor
              value={cell.content}
              onChange={(value) => updateCell(cell.id, value || "")}
            />
          </Resizable>
          <Preview code={code} bundleErr={err} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
