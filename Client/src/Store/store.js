import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Slice/user.slice.js";
import updateUserReducer from "../Slice/updateUser.slice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
   userdata: UserReducer,
   updateUser: updateUserReducer,
});

const persistConfig = {
   key: "root",
   storage,
   version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
});

export const persistStor = persistStore(store);
