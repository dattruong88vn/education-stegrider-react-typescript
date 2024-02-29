import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "../../styles/text-editor.css";

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState<string>("**Hello world!!!**");

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
        <MDEditor value={value} onChange={(value) => setValue(value || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setIsEdit(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
