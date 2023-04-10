import { createSlice } from "@reduxjs/toolkit";

const innitialCart = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: innitialCart,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
    },

    //Thêm giỏ hàng, nếu sp có trong giỏ, tăng SL cùng với item hiện tại
    addTocart(state, action) {
      const cartItems = state.items;
      const itemFounded = cartItems
        .filter((item) => item["id_item"] === action.payload["id_item"])
        .pop();

      if (itemFounded) {
        itemFounded.amount += action.payload.amount;
      } else {
        cartItems.unshift(action.payload);
      }
    },

    //Xóa toàn bộ 1 item
    removeEntireItem(state, action) {
      const itemId = action.payload.id;
      state.items = state.items.filter((item) => item["id_item"] !== itemId);
    },

    //Xóa khỏi giỏ đi 1, nếu sp còn 1 quantity thì xóa toàn bộ
    removeFromCart(state, action) {
      const cartItems = state.items;
      const itemFounded = cartItems
        .filter((item) => item["id_item"] === action.payload.id)
        .pop();

      if (itemFounded) {
        if (itemFounded.amount === 1) {
          state.items = cartItems.filter(
            (item) => item["id_item"] !== action.payload.id
          );
        } else {
          itemFounded.amount--;
        }
      } else {
        return;
      }
    },

    //Cập nhật quantity item
    updateQuantity(state, action) {
      const cartItems = state.items;
      const itemFounded = cartItems
        .filter((item) => item["id_item"] === action.payload.id)
        .pop();

      if (itemFounded) {
        
        itemFounded.amount = action.payload.amount;
      } else {
        return;
      }
    },

    //clear toàn bộ giỏ hàng
    clearCart(state) {
      state.items = [];
    },
  },
});

export default cartSlice;
