// src/pages/Signup.jsx
import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { setSessionId, setUserName } from "../util/LocalStorageUtil.js";
import Address from "../components/Address.jsx"; // Make sure the path is correct

export default function Signup() {
    const [form, setForm] = useState({
        user_name: "",
        email_id: "",
        password: "",
        mobile_number: "",
        address: {
            street: "",
            city: "",
            postal_code: "",
        },
    });
    const navigate = useNavigate();

    // Handler for top-level form fields
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ New handler specifically for the nested address fields
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            address: {
                ...prevForm.address,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/signUp", form);
            if (res.status === 200 || res.status === 201) {
                const sessionId = res.headers["x-session-id"];
                setSessionId(sessionId);
                setUserName(form.user_name);
                navigate("/");
            }
        } catch (error) {
            console.error("Error during signup:", error.response);
            alert(`Signup failed: ${error.response?.data[0]?.message || 'Please try again.'}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-8">
            <form
                className="bg-white shadow-lg p-6 rounded-lg w-96"
                onSubmit={handleSubmit}
            >
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                {["user_name", "email_id", "password", "mobile_number"].map((field) => (
                    <input
                        key={field}
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        value={form[field]}
                        onChange={handleChange} // This uses the original handler
                        className="w-full p-2 border rounded mb-3"
                        required
                    />
                ))}

                {/* ✅ Pass the state and the new handler down as props */}
                <Address
                    form={form}
                    handleChange={handleAddressChange}
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}