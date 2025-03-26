import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${base_url}/api/auth/signup`, userData);
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${base_url}/api/auth/login`, credentials);
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
  
    await axios.get(`${base_url}/api/auth/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    localStorage.removeItem("token");
});
  

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
