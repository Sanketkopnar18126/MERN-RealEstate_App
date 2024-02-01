import { createSlice } from "@reduxjs/toolkit";

const updateUser = createSlice({
   name: "updateUser",
   initialState: {
      currentUser: null,
      error: "false",
      loading: false,
   },

   reducers: {
      updateUserLoading: (state) => {
         state.loading = true;
      },
      updateUserSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = null;
      },
      updateUserFailed: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
   },
});

export const { updateUserLoading, updateUserFailed, updateUserSuccess } =
   updateUser.actions;
export default updateUser.reducer;
