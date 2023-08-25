import Editor from "@monaco-editor/react";

function CodeEditor({ value }: { value: string }) {
  const editorOptions = {
    minimap: { enabled: false },
    quickSuggestions: false,
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="java"
      defaultValue={value}
      theme="vs-dark"
      options={editorOptions}
    />
  );
}

export default CodeEditor;
