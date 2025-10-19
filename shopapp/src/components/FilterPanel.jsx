// src/components/FilterPanel.jsx
import { useState } from "react";

export default function FilterPanel({ onFilterChange }) {
    const [filterType, setFilterType] = useState("price");
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const handleApply = () => {
        onFilterChange({
            type: filterType,
            min: minValue ? parseFloat(minValue) : null,
            max: maxValue ? parseFloat(maxValue) : null,
        });
    };

    const handleReset = () => {
        setMinValue("");
        setMaxValue("");
        onFilterChange(null); // clear filters
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow mb-4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold mb-2">Filters</h3>

            <label className="text-sm font-medium">Filter By:</label>
            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="price">Price</option>
                <option value="weight">Weight</option>
                <option value="volume">Volume</option>
            </select>

            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Min"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={handleApply}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Apply
                </button>
                <button
                    onClick={handleReset}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
