import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [updatedNote, setUpdatedNote] = useState({ title: "", body: "" });

  useEffect(() => {
    // Fetch the note data and update both note and updatedNote states
    fetch(`https://crudapp-be.onrender.com/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNote(data);
        setUpdatedNote({
          title: data.title,
          body: data.body,
        });
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [id]);

  const handleUpdate = () => {
    const updatedData = {
      title: updatedNote.title,
      body: updatedNote.body,
    };

    // Update the note on the server and handle success/failure
    fetch(`https://crudapp-be.onrender.com/notes/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          alert("Note Updated!!");
        } else {
          // Handle update failure
          throw new Error("Failed to update note.");
        }
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <div className="edit-note-container">
      <h2 className="edit-note-title">Edit Note</h2>
      <div className="edit-note-form">
        <input
          className="note-title-input"
          type="text"
          placeholder="Title"
          value={updatedNote.title}
          onChange={(e) =>
            setUpdatedNote({ ...updatedNote, title: e.target.value })
          }
        />
        <textarea
          className="note-body-input"
          placeholder="Body"
          value={updatedNote.body}
          onChange={(e) =>
            setUpdatedNote({ ...updatedNote, body: e.target.value })
          }
        />
        <button className="update-note-button" onClick={handleUpdate}>
          Update Note
        </button>
      </div>
    </div>
  );
}
