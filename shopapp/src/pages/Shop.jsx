// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ItemCard from "../components/ItemCard";
import Profile from "../components/Profile";
import { Link } from "react-router-dom";
import { getSessionId, getUserName } from "../util/LocalStorageUtil";
import FiltersBar from "../components/FiltersBar";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [shopIdToName, setShops] = useState([{ id: "0", name: "All Shops" }]);
  const [selectedShopId, setSelectedShopId] = useState("0");
  const [filters, setFilters] = useState({});

  const sessionId = getSessionId();
  const userName = getUserName();

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

  // 🧮 Apply all filters dynamically
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Profile userName={userName} />
          <Link to="/cart" className="bg-blue-500 text-white px-4 py-2 rounded">
            Cart
          </Link>
        </div>

        {/* 🧩 Add the Filters */}
        <FiltersBar onApply={setFilters} />

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
  );
}
