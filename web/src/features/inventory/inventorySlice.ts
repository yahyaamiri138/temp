import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchInventory = createAsyncThunk("inventory/fetch", async () => {
  const res = await axiosInstance.get("/inventory");
  return res.data;
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default inventorySlice.reducer;
