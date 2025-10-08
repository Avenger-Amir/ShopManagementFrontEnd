import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice.js';
import { Link } from 'react-router-dom';
import api from "../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const { items, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const placeOrder = () => {
        const sessionId = localStorage.getItem("sessionId");
        if (items.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        if (!sessionId) {
            alert("Please log in to place an order.");
            navigate("/");
            return;
        }
        try {
            const res = api.post("/shop/order", {
                    "shop_id": items[0].shop_id, "status": "ORDERED", "shop_order_list": items.map((item) => ({
                        item_id: item.id,
                        quantity: item.quantity
                    }))
                },
                {
                    headers: {"x-session-id": sessionId}
                });
        }
        catch (error) {
            console.error("Error placing order:", error);
            alert(`Order failed. Please try again. ${error.response.data[0].message}`);
            return;
        }
    }
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <Link to="/shop" className="text-blue-500 underline mb-4 inline-block">Shop</Link>
            <h2 className="text-xl font-bold mb-2">Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between">
                                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h3 className="font-bold mt-2">Total: ₹{totalPrice}</h3>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                    >
                        Clear Cart
                    </button>
                    <button onClick={() => placeOrder()}>Order </button>
                </>
            )}
        </div>
    );
}
