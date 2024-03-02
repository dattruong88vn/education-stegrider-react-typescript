import { useEffect } from "react";
import { useActions } from "../hooks/useAction";
import { Cell } from "../state";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useTypedSelector } from "src/hooks/useTypeSelector";
import "src/styles/code-cell.css";

let timer: ReturnType<typeof setTimeout>;

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, createBundle]);

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
          <div className="progress-wrapper">
            {!bundle || bundle.loading ? (
              <div className="progress-cover">
                <progress className="progress is-small is-primary">
                  Loading
                </progress>
              </div>
            ) : (
              <Preview code={bundle.code} bundleErr={bundle.err} />
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
