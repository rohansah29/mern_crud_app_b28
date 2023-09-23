import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = () => {
    const payload = {
      email,
      username,
      pass,
    };

    fetch("https://crudapp-be.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          // Registration successful
          alert("Registration successful! Please log in.");
          navigate("/login"); // Navigate to the login page
        } else {
          // Registration failed
          alert("Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during registration.");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h3 className="signup-title">Registration Page</h3>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="signup-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
