import { configureStore } from "@reduxjs/toolkit";
import storage from "../lib/storage"
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import basketSlice from "./basketSlice";
import authSlice from "./authSlice";

const reducers = combineReducers({
    basket: basketSlice.reducer 
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
})

export default store