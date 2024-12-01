"use client"

import { createSlice } from "@reduxjs/toolkit";
const intitalproductState = {
  items: [],
};
export const userCart = createSlice({
  name: "products",
  initialState: intitalproductState,
  reducers: {
    addproduct(state, actions) {
      const found = state.items.findIndex((item) => {
        return item._id === actions.payload._id;
      });
      if (found === -1) {
        state.items.push({
          ...actions.payload,
          quantity: 1,
        });
      } else {
        state.items[found].quantity += 1;
      }
    },
    removeAllproducts(state) {
      state.items = [];
    },
  },
});
export default userCart.reducer;
