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

export const updateDebt = createAsyncThunk("debt/update", async (data: any) => {
  const res = await axiosInstance.put(`/debts/${data.id}`, data);

  return res.data;
});

const debtSlice = createSlice({
  name: "debt",
  initialState: { list: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createDebt.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateDebt.fulfilled, (state, action) => {
        const index = state.list.findIndex((d) => d.id === action.payload.id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteDebt.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export default debtSlice.reducer;
