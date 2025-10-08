import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard.jsx";
import UploadItem from "./UploadItem.jsx";
import api from "../api/axiosConfig.js";
import {getSessionId} from "../util/LocalStorageUtil.js";

export default function ItemUpdate() {
    // const sessionId = localStorage.getItem("sessionId");
    const sessionId = getSessionId();
    const [shop, setShop] = useState(null);
    const [items, setItems] = useState([]);

    if (!sessionId) {
        return <p>Only shop owners can update items. Please log in.</p>;
    }

    // Fetch shop details
    useEffect(() => {
        const fetchShopId = async () => {
            try {
                const res = await api.get("/shop", {
                    headers: { "x-session-id": sessionId }
                });
                setShop({
                    shop_id: res.data.id,
                    shop_name: res.data.name
                });
            } catch (err) {
                console.error("API Error:", err);
            }
        };
        fetchShopId();
    }, [sessionId]);

    // Fetch items when shop is loaded
    useEffect(() => {
        if (!shop?.shop_id) return; // ✅ Prevent API call before shop is loaded
        const fetchItems = async () => {
            try {
                const res = await api.get("/shop/items", {
                    params: { shopId: shop.shop_id },
                    headers: { "x-session-id": sessionId }
                });
                setItems(res.data);
            } catch (err) {
                console.error("API Error:", err);
            }
        };
        fetchItems();
    }, [shop?.shop_id, sessionId]); // ✅ Now runs when shop ID is set

    return (
        <>
            {items.map((item) => (
                <ItemCard
                    item={item}
                    key={item.id}
                    shopName={shop?.shop_name}
                    ownerLogin={true}
                />
            ))}
            <br />
            {shop && (
                <UploadItem
                    shopId={shop.shop_id}
                    onItemAdded={(newItem) => setItems([...items, newItem])}
                    itemNames={items.map((item) => item.name)}
                />
            )}
        </>
    );
}
