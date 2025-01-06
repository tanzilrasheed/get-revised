import React, { useRef, useEffect, useState } from "react";
import styles from './TextEditor.module.css';

const TextEditor = ({
  editMode,
  description,
  setDescription,
  selectedSubject,
  selectedChapter,
  topicName,
  subjectsObj,
  setSubjectsObj,
}) => {
  const editorRef = useRef(null);
  const [selectionCoords, setSelectionCoords] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);

  useEffect(() => {
    editorRef.current.innerHTML = description;
  }, [editMode, selectedChapter]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (
        selection.rangeCount > 0 &&
        !selection.isCollapsed &&
        editorRef.current.contains(selection.anchorNode)
      ) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionCoords({
          top: rect.bottom + window.scrollY + 10,
          left: rect.left + window.scrollX,
        });
        setShowToolbar(true);
      } else {
        setShowToolbar(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleInput = () => {
    const content = editorRef.current.innerHTML;
    setDescription(content);
    subjectsObj[selectedSubject][selectedChapter][topicName]["description"] = content;
    localStorage.setItem("subjects", JSON.stringify(subjectsObj));
    setSubjectsObj({ ...subjectsObj });
  };

  const textColors = ["black", "blue", "red"];
  const highlightColors = ["yellow", "orange", "lightgreen", "transparent"];

  return (
    <div>
      {editMode && showToolbar && selectionCoords && (
        <div
          className={styles.floatingToolbar}
          style={{
            top: `${selectionCoords.top}px`,
            left: `${selectionCoords.left}px`,
          }}
        >
          <button onClick={() => formatText("bold")}>B</button>
          {textColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color === "black" ? "white" : color,
                color: color === "black" ? "black" : "white",
              }}
              onClick={() => formatText("foreColor", color)}
            >
              T
            </button>
          ))}
          {highlightColors.map((color) => (
            <button
              key={color}
              style={{
                backgroundColor: color,
                border: color === "transparent" ? "1px solid black" : "none",
              }}
              onClick={() => formatText("hiliteColor", color)}
            ></button>
          ))}
        </div>
      )}
      {editMode ? (
        <div
          ref={editorRef}
          contentEditable
          className={styles.editor}
          onInput={handleInput}
        ></div>
      ) : (
        <div
          ref={editorRef}
          className={description ? styles.editor : styles.hidden}
        ></div>
      )}
    </div>
  );
};

export default TextEditor;
