import React, { useState } from "react";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    const newNote = {
      title,
      body,
    };

    fetch("https://crudapp-be.onrender.com/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((res) => {
        setTitle("");
        setBody("");
        alert("Note Added!!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-note-container">
      <h2 className="add-note-title">Add New Note</h2>
      <div className="add-note-form">
        <input
          className="note-title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="note-body-input"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="add-note-button" onClick={handleSubmit}>
          Add Note
        </button>
      </div>
    </div>
  );
}
