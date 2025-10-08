import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice.js';

export default function ItemCard({ item, shopName, ownerLogin=false }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const cartItem = cartItems.find((i) => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const subtotal = quantity * item.price;

    const handleAddToCart = () => {
        if(cartItems.length >0) {
            // const firstItemShopId = cartItems[0].shop_id;
            if (cartItems[0].shop_id !== item.shop_id) {
                // Clear cart if adding item from a different shop
                alert("You can only add items from one shop at a time. ");
                return;
            }
        }
        dispatch(addToCart(item));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(item.id));
    };

    const handleRemoveItemFromShop = async () => {
        try {
            const sessionId = localStorage.getItem("sessionId");
            const response = await fetch(`http://localhost:9098/shop/items/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'X-Session-Id': sessionId
                }
            });
            if (response.ok) {
                alert('Item removed successfully');
                // Optionally, you can trigger a refresh of the item list here
            } else {
                alert('Failed to remove item');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            alert('An error occurred while removing the item');
        }
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col">
            <img
                src={`http://localhost:9098${item.image_url}`}
                alt={item.name}
                className="picture"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-600 font-bold">Price: ₹{item.price}</p>
            <p className="text-gray-500 text-sm">Shop: {shopName}</p>

            {!ownerLogin && quantity > 0 && (
                <p className="text-blue-600 font-semibold">
                    Quantity: {quantity} | Subtotal: ₹{subtotal}
                </p>
            )}

            {!ownerLogin && (
            <div className="flex gap-2 mt-2">
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                    +
                </button>
                <button
                    onClick={handleRemoveFromCart}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                >
                    -
                </button>
            </div>)};

            {ownerLogin && (
                <>
                    <img
                        src={`http://localhost:9098${item.image_url}`}
                        alt={item.name}
                        className="picture"
                    />
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-green-600 font-bold">Price: ₹{item.price}</p>
                    <p className="text-gray-500 text-sm">Shop: {shopName}</p>
                    <button onClick={() => handleRemoveItemFromShop()}>Remove Item</button>
                </>
            )}

            {ownerLogin && <input id={item.id} type="text" placeholder="Enter Price" value={item.price}/>}
        </div>
    );
}
