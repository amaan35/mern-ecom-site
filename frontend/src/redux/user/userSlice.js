import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signedIn: (state, action) => {
      state.currentUser = action.payload;
    },
    signedUp: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signedIn, signedUp, signOut } = userSlice.actions;

export default userSlice.reducer;
