import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/auth/signup`, userData);
      return response.data;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      const message = errors?.length ? errors[0].message : null;
      return rejectWithValue(message || "Signup failed");
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      const message = errors?.length ? errors[0].message : null;
      return rejectWithValue(message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;

  await axios.get(`${base_url}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });

  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload.data;
        state.user = user;
        state.token = user?.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        const error = (action.payload as { errors?: { message: string }[] })?.errors?.length
          ? (action.payload as { errors: { message: string }[] }).errors[0].message
          : null;
        state.error = error;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload.data;
        state.user = user;
        state.token = user?.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        const error = (action.payload as { errors?: { message: string }[] })?.errors?.length
          ? (action.payload as { errors: { message: string }[] }).errors[0].message
          : null;
        state.error = error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
