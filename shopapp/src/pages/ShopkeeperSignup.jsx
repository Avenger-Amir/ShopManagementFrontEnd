// src/pages/Signup.jsx
import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
// import { AuthenticationInfo } from "../App";
import {setSessionId, setUserName} from "../util/LocalStorageUtil.js";

export default function Signup() {
  const [form, setForm] = useState({
    user_name: "",
    email_id: "",
    password: "",
    number: "",
    address: "",
  });
  const navigate = useNavigate();
  // const { login } = useAuth();
  // const {userName, sessionId, expiryTime, setUserName, setSessionId, setExpiryTime } = useContext(AuthenticationInfo);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res=await api.post("/shopkeeper/sign_up", form);
        // alert("Signup successful! Please login.");
        console.log(res);
        if (res.status === 200 || res.status === 201) {
        // alert("Signup successful!");
        const sessionId = res.headers["x-session-id"];
        setSessionId(sessionId);
        setUserName(form.user_name);
        // localStorage.setItem("sessionId", sessionId);
        // localStorage.setItem("userName", form.user_name);
        // const expiry = new Date();
        // expiry.setHours(expiry.getHours() + 0.1);
        // setExpiryTime(expiry);
        // login(sessionId, res.data);
        
        navigate("/shop");  // 🚀 redirect to shop page
      }
    } catch (error) {
        console.error("Error during signup:", error.response);
        alert(`Signup failed. Please try again. ${error.response.data[0].message}`); // Display error message from backend
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-lg p-6 rounded-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        {["user_name", "email_id", "password", "number", "address"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
        ))}
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
