import React, { useEffect } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror";
import CodeMirror from 'codemirror';

const Editor = () => {
  useEffect(() => {
    const init= async ()=> {
      CodeMirror.fromTextArea();
    }
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <textarea
        style={{ height: "100%", width: "100%" }}
        id="editor_pane00"
      ></textarea>
    </div>
  );
};

export default Editor;
