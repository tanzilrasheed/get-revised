import React from "react";
import { useSlate } from "slate-react";
import { Editor, Transforms } from "slate";

const Toolbar = () => {
  const editor = useSlate();

  return (
    <div style={{ marginBottom: "10px" }}>
      <button onMouseDown={(event) => toggleMark(event, editor, "bold")}>Bold</button>
      <button onMouseDown={(event) => toggleMark(event, editor, "underline")}>
        Underline
      </button>
      <button onMouseDown={(event) => toggleMark(event, editor, "highlight")}>
        Highlight
      </button>
      <button onMouseDown={(event) => toggleColor(event, editor, "red")}>Red</button>
      <button onMouseDown={(event) => toggleColor(event, editor, "blue")}>Blue</button>
    </div>
  );
};

const toggleMark = (event, editor, format) => {
  event.preventDefault();
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleColor = (event, editor, color) => {
  event.preventDefault();
  const isActive = isMarkActive(editor, "color");
  if (isActive) {
    Editor.removeMark(editor, "color");
  }
  Editor.addMark(editor, "color", color);
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export default Toolbar;
