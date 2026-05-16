import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// ================= TYPES =================
export interface Inventory {
  id: number;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
  };
}

interface InventoryState {
  list: Inventory[];
  loading: boolean;
}

const initialState: InventoryState = {
  list: [],
  loading: false,
};

// ================= FETCH =================
export const fetchInventory = createAsyncThunk("inventory/fetch", async () => {
  const res = await axiosInstance.get("/inventory");
  return res.data;
});

// ================= CREATE =================
export const createInventory = createAsyncThunk(
  "inventory/create",
  async (data: { productId: number; quantity: number }) => {
    const res = await axiosInstance.post("/inventory", data);
    return res.data;
  },
);

// ================= UPDATE =================
export const updateInventory = createAsyncThunk(
  "inventory/update",
  async (data: Inventory) => {
    const res = await axiosInstance.put(`/inventory/${data.id}`, data);
    return res.data;
  },
);

// ================= DELETE =================
export const deleteInventory = createAsyncThunk(
  "inventory/delete",
  async (id: number) => {
    await axiosInstance.delete(`/inventory/${id}`);
    return id;
  },
);

// ================= SLICE =================
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // CREATE
      .addCase(createInventory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateInventory.fulfilled, (state, action) => {
        const index = state.list.findIndex((i) => i.id === action.payload.id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i.id !== action.payload);
      });
  },
});

export default inventorySlice.reducer;
