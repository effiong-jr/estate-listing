import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    deleteCurrentUser: (state) => {
      state.currentUser = {};
    },
  },
});

export const { setCurrentUser, deleteCurrentUser } = userSlice.actions;

export default userSlice.reducer;
