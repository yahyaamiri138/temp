import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchTransactionItems = createAsyncThunk(
  "transactionItem/fetch",
  async () => {
    const res = await axiosInstance.get("/transaction-items");
    return res.data;
  },
);

const slice = createSlice({
  name: "transactionItem",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionItems.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default slice.reducer;
