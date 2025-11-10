import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedin: false,
    username: "",
  },
  reducers: {
    updateLogin(state, action) {
      if (action.payload) return { loggedin: true, username: action.payload };
      else return { loggedin: false, username: "" };
    },
  },
});

export const { updateLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;
