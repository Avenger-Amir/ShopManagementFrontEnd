// src/components/FiltersBar.jsx
import { useState } from "react";

export default function FiltersBar({ onApply }) {
    const [localFilters, setLocalFilters] = useState({
        priceMin: "",
        priceMax: "",
        weight: "",
        volume: "",
        brand: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApply(localFilters);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg mb-4">
            {/* Price Range */}
            <div>
                <label className="block text-sm font-semibold">Price (₹)</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="priceMin"
                        placeholder="Min"
                        value={localFilters.priceMin}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-20"
                    />
                    <input
                        type="number"
                        name="priceMax"
                        placeholder="Max"
                        value={localFilters.priceMax}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
            </div>

            {/* Weight */}
            <div>
                <label className="block text-sm font-semibold">Weight (kg)</label>
                <input
                    type="number"
                    name="weight"
                    placeholder="e.g. 2"
                    value={localFilters.weight}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-24"
                />
            </div>

            {/* Volume */}
            <div>
                <label className="block text-sm font-semibold">Volume (ml)</label>
                <input
                    type="number"
                    name="volume"
                    placeholder="e.g. 500"
                    value={localFilters.volume}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-24"
                />
            </div>

            {/* Brand */}
            <div>
                <label className="block text-sm font-semibold">Brand</label>
                <input
                    type="text"
                    name="brand"
                    placeholder="e.g. Nike"
                    value={localFilters.brand}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-24"
                />
            </div>

            <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Apply
            </button>
        </div>
    );
}
