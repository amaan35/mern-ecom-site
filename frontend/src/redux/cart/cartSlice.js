import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = state.items.find(
        (item) => item.currentProduct._id === action.payload.currentProduct._id
      );
      if (item) {
        item.quantity = action.payload.quantity;
        return;
      }

      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.currentProduct._id !== action.payload.currentProduct._id
      );
    },
    removeAllItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
