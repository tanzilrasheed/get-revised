import React, { useRef } from "react";
import "./TextEditor.module.css";

const TextEditor = () => {
  const editorRef = useRef(null);

  const formatText = function(command, value = null) {
    if (command === "removeHighlight") {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const content = range.extractContents();
        const span = document.createElement("span");
        span.style.backgroundColor = "transparent";
        span.appendChild(content);
        range.insertNode(span);
      }
    } else {
      document.execCommand(command, false, value);
    }
    console.log(this);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "40%";
        img.style.maxWidth = "100%";
        img.style.margin = "10px 0";
        img.style.display = "block";
        img.setAttribute("contenteditable", "false");
        img.onclick = () => {resizeImage(img)};
        editorRef.current.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (img) => {
    const newSize = prompt("type 'delete' to delete or Enter new width as percentage (e.g., 40%):", img.style.width);
    if (newSize === "delete") {
      img.remove()
    }
    
    if (newSize.includes('%') && parseInt(newSize) > 20) {
      img.style.width = newSize;
    }
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => formatText("bold")}>Bold</button>
        <select
          onChange={(e) => formatText("foreColor", e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Text Color
          </option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </select>
        <select
          onChange={(e) => {
            if (e.target.value === "remove") {
              formatText("removeHighlight");
            } else {
              formatText("hiliteColor", e.target.value);
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Highlight
          </option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="lightgreen">Green</option>
          <option value="white">Remove Highlight</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="imageUpload"
        />
        <label htmlFor="imageUpload" className="upload-btn">
          Add Image
        </label>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="editor"
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
          padding: "10px",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
        }}
      ></div>
    </div>
  );
};

export default TextEditor;
