import MonacoEditor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorPropsType {
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorPropsType> = ({ value, onChange }) => {
  const onFormat = async () => {
    // format
    const newValue = await prettier.format(value, {
      plugins: [parser],
      parser: "babel",
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    onChange(newValue);
  };

  return (
    <div>
      <button onClick={onFormat}>Format</button>
      <MonacoEditor
        value={value}
        onChange={onChange}
        height={500}
        theme="vs-dark"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
        }}
      />
    </div>
  );
};

export default CodeEditor;
