import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export interface Party {
  id: number;
  name: string;
  phone?: string;
}

interface PartyState {
  list: Party[];
  loading: boolean;
}

const initialState: PartyState = {
  list: [],
  loading: false,
};

// ================= GET ALL =================
export const fetchParties = createAsyncThunk("party/fetchAll", async () => {
  const res = await axiosInstance.get("/parties");
  return res.data;
});

// ================= CREATE =================
export const createParty = createAsyncThunk(
  "party/create",
  async (data: Partial<Party>) => {
    const res = await axiosInstance.post("/parties", data);
    return res.data;
  },
);

// ================= UPDATE =================
export const updateParty = createAsyncThunk(
  "party/update",
  async (data: Party) => {
    const res = await axiosInstance.put(`/parties/${data.id}`, data);
    return res.data;
  },
);

// ================= DELETE =================
export const deleteParty = createAsyncThunk(
  "party/delete",
  async (id: number) => {
    await axiosInstance.delete(`/parties/${id}`);
    return id;
  },
);

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔄 FETCH
      .addCase(fetchParties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // ➕ CREATE
      .addCase(createParty.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // ✏️ UPDATE (خیلی مهم)
      .addCase(updateParty.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // ❌ DELETE
      .addCase(deleteParty.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default partySlice.reducer;
