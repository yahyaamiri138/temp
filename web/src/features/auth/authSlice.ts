import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import type { RegisterRequest } from "./authType";

interface User {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("username")
    ? {
        username: localStorage.getItem("username") || "",
        firstName: localStorage.getItem("firstName") || "",
        lastName: localStorage.getItem("lastName") || "",
        email: localStorage.getItem("email") || "",
        gender: localStorage.getItem("gender") || "",
        role: localStorage.getItem("role") || "",
      }
    : null,
  loading: false,
  error: null,
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data; // 👈 کل response برگردد
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  },
);

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          username: action.payload.username,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          gender: action.payload.gender,
          role: action.payload.role,
        };

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("firstName", action.payload.firstName);
        localStorage.setItem("lastName", action.payload.lastName);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("gender", action.payload.gender);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          username: action.payload.username,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          gender: action.payload.gender,
          role: "ROLE_USER", // همیشه USER
        };

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("role", "ROLE_USER");
        localStorage.setItem("firstName", action.payload.firstName);
        localStorage.setItem("lastName", action.payload.lastName);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("gender", action.payload.gender);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
