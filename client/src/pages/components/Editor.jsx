import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const initCodeMirror = () => {
      const textarea = document.getElementById("realtimeEditor");
      editorRef.current = CodeMirror.fromTextArea(textarea, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
      if (editorRef.current) {
        editorRef.current.setSize(null, '100%');
      }
    };
  

    initCodeMirror();

    // Cleanup CodeMirror instance and event listeners on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
    };
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <textarea id="realtimeEditor" style={{ height: "100%" }}></textarea>
    </div>
  );
}

export default Editor;
