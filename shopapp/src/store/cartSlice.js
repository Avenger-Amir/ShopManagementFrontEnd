// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            }else{
                state.items.push({ ...item, quantity: 1 });
            }

            state.totalPrice += item.price;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i.id === itemId);

            if (item) {
                state.totalPrice -= item.price;
                if (item.quantity === 1) {
                    state.items = state.items.filter((i) => i.id !== itemId);
                } else {
                    item.quantity -= 1;
                }
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalPrice');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
