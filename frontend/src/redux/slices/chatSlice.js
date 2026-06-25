import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/chat/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { projectId, messages: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchUserChats = createAsyncThunk(
  "chat/fetchUserChats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/chat/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  messages: {},
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { projectId, message } = action.payload;
      if (!state.messages[projectId]) {
        state.messages[projectId] = [];
      }
      state.messages[projectId].push(message);
    },
    clearMessages: (state, action) => {
      delete state.messages[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages[action.payload.projectId] = action.payload.messages;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
