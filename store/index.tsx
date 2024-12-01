import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsstore";
import userCart from "./userCart";
const store = configureStore({
  reducer: {
    products: productReducer,
    userCart: userCart,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
