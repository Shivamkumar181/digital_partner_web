import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import contributionReducer from "./slices/contributionSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    contributions: contributionReducer,
    chat: chatReducer,
  },
});
