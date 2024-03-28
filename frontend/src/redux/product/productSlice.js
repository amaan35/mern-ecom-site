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
    removeClickedProduct : (state)=>{
      state.currentProduct = null
    }
  },
});

export const {clickedProduct, removeClickedProduct} = productSlice.actions

export default productSlice.reducer;