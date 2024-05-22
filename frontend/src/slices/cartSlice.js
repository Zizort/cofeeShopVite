import { createSlice } from "@reduxjs/toolkit";
//we dont need createApi just createSlice because we wont be using async
import { updateCart } from "../utils/cartUtils";


const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): {cartItems: []};



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            //return all the item that dont equal the one we want to delete
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;