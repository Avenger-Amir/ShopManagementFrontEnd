// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import ItemCard from "../components/ItemCard";
import Profile from "../components/Profile";
import FiltersBar from "../components/FiltersBar";
import { getSessionId, getUserName } from "../util/LocalStorageUtil";
import Navbar from "../components/Navbar.jsx";

export default function Shop() {
    const [items, setItems] = useState([]);
    const [shopIdToName, setShops] = useState([{ id: "0", name: "All Shops" }]);
    const [selectedShopId, setSelectedShopId] = useState("0");
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    const sessionId = getSessionId();
    // const userName = getUserName();

    useEffect(() => {
        const fetchShops = async () => {
            const res = await api.get("/shop");
            const uniqueShops = res.data.map((shop) => ({
                id: shop.id.toString(),
                name: shop.name,
            }));
            setShops((prev) => [
                ...prev,
                ...uniqueShops.filter((s) => !prev.find((p) => p.id === s.id)),
            ]);
        };
        fetchShops();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await api.get("/shop/items", { params: { name: "all" } });
            setItems(res.data);
        };
        fetchItems();
    }, [sessionId]);

    // 🧮 Apply filters dynamically
    const filteredItems = items.filter((item) => {
        const matchesShop =
            selectedShopId === "0" || item.shop_id.toString() === selectedShopId;
        const matchesPrice =
            (!filters.priceMin || item.price >= +filters.priceMin) &&
            (!filters.priceMax || item.price <= +filters.priceMax);
        const matchesWeight =
            !filters.weight || item.weight?.toString() === filters.weight;
        const matchesVolume =
            !filters.volume || item.volume?.toString() === filters.volume;
        const matchesBrand =
            !filters.brand ||
            item.brand?.toLowerCase().includes(filters.brand.toLowerCase());
        return (
            matchesShop &&
            matchesPrice &&
            matchesWeight &&
            matchesVolume &&
            matchesBrand
        );
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 🧭 Navbar */}
           <Navbar setShowFilters={setShowFilters} />

            {/* 🧩 Filters dropdown popup */}
            {showFilters && (
                <div className="fixed top-16 right-6 bg-white shadow-lg border rounded-lg p-6 z-50 w-80 animate-fadeIn">
                    <h3 className="text-lg font-bold mb-3 text-gray-700">Apply Filters</h3>
                    <FiltersBar
                        onApply={(appliedFilters) => {
                            setFilters(appliedFilters);
                            setShowFilters(false);
                        }}
                    />
                    <div className="text-right mt-2">
                        <button
                            onClick={() => setShowFilters(false)}
                            className="text-sm text-gray-600 hover:text-gray-900 underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* 🛒 Main content */}
            <div className="max-w-7xl mx-auto p-6">
                {/* Shop dropdown */}
                <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="border rounded p-2 mb-4"
                >
                    {shopIdToName.map((shop) => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name}
                        </option>
                    ))}
                </select>

                {/* Items grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredItems.map((item) => {
                        const shopName =
                            shopIdToName.find((shop) => shop.id === item.shop_id.toString())
                                ?.name || "Unknown Shop";
                        return <ItemCard key={item.id} item={item} shopName={shopName} />;
                    })}
                </div>
            </div>
        </div>
    );
}
