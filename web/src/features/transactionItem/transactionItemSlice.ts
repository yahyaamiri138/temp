import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface TransactionItemState {
  list: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionItemState = {
  list: [],
  loading: false,
  error: null,
};

const BASE_URL = "/transaction-items";

/* =========================
   GET ALL
========================= */
export const fetchTransactionItems = createAsyncThunk(
  "transactionItem/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(BASE_URL);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load transaction items",
      );
    }
  },
);

/* =========================
   CREATE
   POST /transaction-items/transaction/{transactionId}
========================= */
export const createTransactionItem = createAsyncThunk(
  "transactionItem/create",
  async (data: any, thunkAPI) => {
    try {
      const { transactionId, ...payload } = data;

      const response = await axiosInstance.post(
        `${BASE_URL}/transaction/${transactionId}`,
        payload,
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create item",
      );
    }
  },
);

/* =========================
   UPDATE
   PUT /transaction-items/{id}
========================= */
export const updateTransactionItem = createAsyncThunk(
  "transactionItem/update",
  async (data: any, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${BASE_URL}/${data.id}`, data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update item",
      );
    }
  },
);

/* =========================
   DELETE
========================= */
export const deleteTransactionItem = createAsyncThunk(
  "transactionItem/delete",
  async (id: number) => {
    await axiosInstance.delete(`/transaction-items/${id}`);
    return id;
  },
);

const transactionItemSlice = createSlice({
  name: "transactionItem",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* =========================
         FETCH
      ========================= */
      .addCase(fetchTransactionItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionItems.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTransactionItems.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* =========================
         CREATE
      ========================= */
      .addCase(createTransactionItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      /* =========================
         UPDATE
      ========================= */
      .addCase(updateTransactionItem.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* =========================
         DELETE
      ========================= */
      .addCase(deleteTransactionItem.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i.id !== action.payload);
      });
  },
});

export default transactionItemSlice.reducer;
