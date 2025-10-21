// src/pages/Login.jsx
import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { setSessionId, setUserName } from "../util/LocalStorageUtil.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ number: "", password: "" });

  const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      const sessionId = res.headers["x-session-id"];
      setSessionId(sessionId);
      setUserName(form.user_name);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
      <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1470&q=80')",
          }}
      >
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-md w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Login to continue shopping and explore amazing products.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="number"
                placeholder="Mobile Number"
                value={form.number}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                required
            />
            <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-md"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-700">Don't have an account? </span>
            <button
                onClick={() => navigate("/consumer/signup")}
                className="text-green-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
  );
}
