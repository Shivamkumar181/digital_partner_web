import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api";

export const submitContribution = createAsyncThunk(
  "contributions/submit",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(`${API_URL}/contributions`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchProjectContributions = createAsyncThunk(
  "contributions/fetchByProject",
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/contributions/project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchMyContributions = createAsyncThunk(
  "contributions/fetchMy",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${API_URL}/contributions/my-contributions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const reviewContribution = createAsyncThunk(
  "contributions/review",
  async ({ id, status, feedback, rating }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        `${API_URL}/contributions/${id}/review`,
        { status, feedback, rating },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  contributions: [],
  myContributions: [],
  loading: false,
  error: null,
};

const contributionSlice = createSlice({
  name: "contributions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContribution.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContribution.fulfilled, (state, action) => {
        state.loading = false;
        state.contributions.push(action.payload);
      })
      .addCase(submitContribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjectContributions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectContributions.fulfilled, (state, action) => {
        state.loading = false;
        state.contributions = action.payload;
      })
      .addCase(fetchProjectContributions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyContributions.fulfilled, (state, action) => {
        state.myContributions = action.payload;
      })
      .addCase(reviewContribution.fulfilled, (state, action) => {
        const index = state.contributions.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (index !== -1) {
          state.contributions[index] = action.payload;
        }
      });
  },
});

export const { clearError } = contributionSlice.actions;
export default contributionSlice.reducer;
