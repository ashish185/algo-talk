import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import ACTIONS from "../../client-actions";

function Editor({ socketRef = {}, roomId, onCodeChange }) {
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
        editorRef.current.setSize(null, "100%");
      }
      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes", instance ,  changes );
        const { origin } = changes; // type btayega type of event
        const code = instance.getValue(); // code has value which we write
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    initCodeMirror();

    // Cleanup CodeMirror instance and event listeners on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE , ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div style={{ height: "100%" }}>
      <textarea id="realtimeEditor" style={{ height: "100%" }}></textarea>
    </div>
  );
}

export default Editor;
