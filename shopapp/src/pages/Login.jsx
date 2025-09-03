// src/pages/Login.jsx
import { useState, useContext } from "react";
import api from "../api/axiosConfig";
// import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthenticationInfo } from "../App";


export default function Login() {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ number: "", password: "" });
  const {userName, sessionId, expiryTime, setUserName, setSessionId, setExpiryTime } = useContext(AuthenticationInfo);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      const sessionId = res.headers["x-session-id"];
      // login(sessionId);
      setSessionId(sessionId);
      setUserName(form.user_name);
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 0.1);
      setExpiryTime(expiry);
      navigate("/shop");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-lg p-6 rounded-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="number"
          placeholder="Mobile Number"
          value={form.number}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
