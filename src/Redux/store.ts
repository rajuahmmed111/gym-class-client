import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
// import trainerReducer from "./trainerSlice";
// import scheduleReducer from "./scheduleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // trainer: trainerReducer,
    // schedule: scheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
