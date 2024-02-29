import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../../hooks/useAction";
import { Cell } from "../../state";
import "../../styles/text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        event.target &&
        editorRef.current &&
        editorRef.current.contains(event.target as Node)
      ) {
        // user click inside editor
        return;
      } else {
        setIsEdit(false);
      }
    };

    window.addEventListener("click", listener, { capture: true });

    return () => {
      window.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (isEdit) {
    return (
      <div className="text-editor" ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setIsEdit(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
