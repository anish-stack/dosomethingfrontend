// cartReducer.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    // Add other cart-related reducers (e.g., remove from cart).
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
