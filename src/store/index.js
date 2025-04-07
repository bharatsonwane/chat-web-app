import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default Store;
