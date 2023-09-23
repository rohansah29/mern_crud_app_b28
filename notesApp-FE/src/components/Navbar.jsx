/* Navbar.js */
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Notes App
        </Link>
        <div className="nav-links">
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/notes" className="nav-link">
            Notes
          </Link>
          <Link to="/add" className="nav-link">
            Add Notes
          </Link>
        </div>
      </div>
    </nav>
  );
}
