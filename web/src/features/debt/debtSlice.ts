import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchDebts = createAsyncThunk("debt/fetch", async () => {
  const res = await axiosInstance.get("/debts");
  return res.data;
});

export const createDebt = createAsyncThunk("debt/create", async (data: any) => {
  const res = await axiosInstance.post("/debts", data);
  return res.data;
});

export const deleteDebt = createAsyncThunk(
  "debt/delete",
  async (id: number) => {
    await axiosInstance.delete(`/debts/${id}`);
    return id;
  },
);

const debtSlice = createSlice({
  name: "debt",
  initialState: { list: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDebts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default debtSlice.reducer;
