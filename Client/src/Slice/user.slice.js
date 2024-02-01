import { createSlice } from "@reduxjs/toolkit";
const User = createSlice({
   name: "userData",
   initialState: {
      currentuser: null,
      error: false,
      loading: false,
   },

   reducers: {
      signInStart: (state) => {
         state.loading = true;
      },

      signInSucsess: (state, action) => {
         state.currentuser = action.payload;
         state.loading = false;
         state.error = null;
      },
      signInFailed: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },

      signOut: (state, action) => {
         state.currentuser = action.payload;
      },
   },
});

export const { signInFailed, signInStart, signInSucsess, signOut } =
   User.actions;
export default User.reducer;
