import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// ================= TYPES =================
export interface TransactionItem {
  productId: number;
  productName?: string;
  quantity: number;
}

export interface Transaction {
  id: number;
  partyId: number;
  totalAmount?: number;
  paymentType?: string;
  items: TransactionItem[];
}

interface TransactionState {
  list: Transaction[];
  loading: boolean;
}

const initialState: TransactionState = {
  list: [],
  loading: false,
};

// ================= GET ALL =================
export const fetchTransactions = createAsyncThunk(
  "transaction/fetch",
  async () => {
    const res = await axiosInstance.get("/transactions");
    return res.data;
  },
);

// ================= CREATE =================
export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (data: {
    partyId: number;
    items: { productId: number; quantity: number }[];
  }) => {
    const res = await axiosInstance.post("/transactions", data);
    return res.data;
  },
);

// ================= DELETE =================
export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (id: number) => {
    await axiosInstance.delete(`/transactions/${id}`);
    return id;
  },
);

// ================= SLICE =================
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔄 FETCH
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // ➕ CREATE
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // ❌ DELETE
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;
