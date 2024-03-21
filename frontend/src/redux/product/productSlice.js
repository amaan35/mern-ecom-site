import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clickedProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
});

export const {clickedProduct} = productSlice.actions

export default productSlice.reducer;