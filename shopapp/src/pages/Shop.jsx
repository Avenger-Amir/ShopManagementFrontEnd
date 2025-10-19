// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
// import { useAuth } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";
// import { AuthenticationInfo } from "../App";
import Profile from "../components/Profile.jsx";
import Cart from "./Cart.jsx";
import { Link } from "react-router-dom";
import {getSessionId, getUserName} from "../util/LocalStorageUtil.js";


export default function Shop() {
  const [items, setItems] = useState([]);
  const [shopIdToName, setShops] = useState([{ id: '0', name: 'All Shops' }]);
  const [selectedShopId, setSelectedShopId] = useState('0');

  const sessionId = getSessionId();
  const userName = getUserName();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await api.get("/shop/");
        // Merge new shops without duplicates
        const uniqueShops = res.data.map((shop) => ({
          id: shop.id.toString(),
          name: shop.name
        }));
        setShops((prev) => {
          const allShops = [...prev, ...uniqueShops];
          return Array.from(new Map(allShops.map(s => [s.id, s])).values());
        });
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/shop/items", {
          params: { name: "all" }
          // headers: { "x-session-id": sessionId }
        });
        setItems(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchItems();
  }, [sessionId]);

  return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex justify-end items-center gap-4 mb-4">
          <Profile userName={userName} />
          <Link
              to="/cart"
              className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cart
          </Link>
        </div>
        <select value={selectedShopId} onChange={(e) => setSelectedShopId(e.target.value)}>
          {shopIdToName.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
          ))}
        </select>

        {items
            .filter((item) =>
                selectedShopId === '0' || item.shop_id.toString() === selectedShopId
            )
            .map((item) => {
              const shopName =
                  shopIdToName.find((shop) => shop.id === item.shop_id.toString())
                      ?.name || 'Unknown Shop';
              return <ItemCard key={item.id} item={item} shopName={shopName} />;
            })}
      </div>
  );
}

