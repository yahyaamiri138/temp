import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface User {
  id: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

// ✅ GET
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
});

// ✅ DELETE
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: number) => {
    await axiosInstance.delete(`/users/${id}`);
    return id;
  },
);

// ✅ UPDATE
export const updateUser = createAsyncThunk(
  "users/update",
  async (data: { id: number; username: string; role: string }) => {
    const res = await axiosInstance.put(`/users/${data.id}`, data);
    return res.data;
  },
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: any) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
