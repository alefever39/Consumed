import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Components/Slices/userSlice";
import mediaReducer from "./Components/Slices/mediaSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    media: mediaReducer,
  },
});
