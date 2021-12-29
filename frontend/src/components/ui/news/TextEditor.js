import React, { useState, useCallback, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../../../styles/News.css";
import { useSelector, useDispatch } from "react-redux";

const TextEditor = ({ setDescription, placeholder }) => {
  const [quill, setQuill] = useState("");

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) {
      return;
    }
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const toolbarOptions = [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ];

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder,
    });

    setQuill(q);
  }, []);

  //   useEffect(() => {
  //     quill?.on("text-change", function (delta, oldDelta, source) {
  //       if (source == "api") {
  //         console.log("An API call triggered this change.");
  //       } else if (source == "user") {
  //         console.log("A user action triggered this change.");
  //       }
  //     });
  //   }, [quill]);

  return (
    <div className="text-editor-container">
      <div
        ref={wrapperRef}
        className="text-editor-wrapper"
        // onChange={handleChange}
      ></div>
    </div>
  );
};

export default TextEditor;
