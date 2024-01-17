import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Slice/user.slice.js";
export const store = configureStore({
   reducer: {
      userdata: UserReducer,
   },
});
