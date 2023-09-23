// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // Add login success state
  const [loginError, setLoginError] = useState(""); // Add login error state

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = () => {
    const payload = {
      email,
      pass,
    };

    fetch("https://crudapp-be.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Login failed. Please check your credentials.");
        }
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoginSuccess(true);
          setTimeout(() => {
            navigate("/notes");
          }, 2000);
        } else {
          throw new Error("Token is undefined.");
        }
      })
      .catch((err) => {
        if (err.message === "Token is undefined.") {
          setLoginError("Wrong Credentials. Please check your credentials again.");
        } else {
          setLoginError("An error occurred during login.");
        }
      });
  };

  return (
    <div className="login-container">
      <h3>Login Page</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button className="login-button" onClick={handleSubmit}>
        Submit
      </button>

      {loginSuccess && (
        <p className="success-message">Login successful! Redirecting...</p>
      )}

      {loginError && <p className="error-message">{loginError}</p>}
    </div>
  );
}
