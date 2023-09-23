import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchAndRender = () => {
    fetch(`https://crudapp-be.onrender.com/notes/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNotes(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchAndRender();
  }, []);

  const handleDelete = (noteId) => {
    fetch(`https://crudapp-be.onrender.com/notes/delete/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Note Deleted!!");
          fetchAndRender();
        } else {
          alert("Error deleting note");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title">Notes List</h2>
      <div className="notes-list">
        {notes.map((el) => (
          <div className="note-card" key={el._id}>
            <h3 className="note-title">{el.title}</h3>
            <p className="note-body">{el.body}</p>
            <div className="note-actions">
              <button
                className="delete-button"
                onClick={() => handleDelete(el._id)}
              >
                Delete
              </button>
              <Link to={`/edit/${el._id}`} className="edit-button">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
