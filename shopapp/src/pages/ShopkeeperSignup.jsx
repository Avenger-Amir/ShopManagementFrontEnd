import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { setSessionId, setUserName } from "../util/LocalStorageUtil.js";

export default function Signup() {
    // 1. Updated the state to have a nested address object
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

    // 2. Updated handleChange to handle both top-level and nested address fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the field is part of the address
        if (["street", "city", "postal_code"].includes(name)) {
            setForm((prevForm) => ({
                ...prevForm,
                address: {
                    ...prevForm.address,
                    [name]: value,
                },
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/shopkeeper/sign_up", form);
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                const sessionId = res.headers["x-session-id"];
                setSessionId(sessionId);
                setUserName(form.user_name);
                navigate("/shop"); // 🚀 redirect to shop page
            }
        } catch (error) {
            console.error("Error during signup:", error.response);
            const errorMessage = error.response?.data?.[0]?.message || "An unknown error occurred.";
            alert(`Signup failed. Please try again. ${errorMessage}`); // Display error message from backend
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                className="bg-white shadow-2xl p-8 rounded-xl w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Your Account</h2>

                {/* --- Standard Inputs --- */}
                <input
                    key="user_name"
                    type="text"
                    name="user_name"
                    placeholder="Username"
                    value={form.user_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
                <input
                    key="email_id"
                    type="email"
                    name="email_id"
                    placeholder="Email Address"
                    value={form.email_id}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
                <input
                    key="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
                <input
                    key="number"
                    type="tel"
                    name="number"
                    placeholder="Mobile Number"
                    value={form.number}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />

                {/* --- 3. Replaced single address input with three separate inputs --- */}
                <h3 className="text-lg font-semibold mb-2 text-gray-600">Address</h3>
                <input
                    key="street"
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={form.address.street}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
                <input
                    key="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.address.city}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
                <input
                    key="postal_code"
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={form.address.postal_code}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500 transition"
                    required
                />

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
