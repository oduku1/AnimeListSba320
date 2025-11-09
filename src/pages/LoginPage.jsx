import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage({setLoggedIn,setUser}) {
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
  
      if (res.status === 200) {
        setUser(username)
        setLoggedIn(true)
        setUsername("");
        setPassword("");
        setError("");
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate(`/profile/${username}`), 2000);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("User not found");
      } else if (err.response && err.response.status === 401) {
        setError("Invalid password");
      } else {
        setError("Something went wrong. Please try again.");
        console.error(err)
      }
    }
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}


      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>Dont have an account? <Link to ="/register">Register Here</Link></p>
    </form>
  );
}