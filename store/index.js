import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import wishlistSlice from "./wishlist-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    wishList: wishlistSlice.reducer,
  },
});

export default store;

export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;
export const wishListActions = wishlistSlice.actions;