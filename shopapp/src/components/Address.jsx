// src/components/Address.jsx

// ✅ Destructure props to get 'form' and 'handleChange'
export default function Address({ form, handleChange }) {
    return (
        <div>
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
        </div>
    );
}