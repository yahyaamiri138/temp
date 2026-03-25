import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  list: Category[];
  loading: boolean;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
};

//
// ✅ GET ALL
//
export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const res = await axiosInstance.get("/categories");
  return res.data;
});

//
// ✅ CREATE
//
export const createCategory = createAsyncThunk(
  "category/create",
  async (data: { name: string }) => {
    const res = await axiosInstance.post("/categories", data);
    return res.data;
  },
);

//
// ✅ UPDATE
//
export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: { id: number; name: string }) => {
    const res = await axiosInstance.put(`/categories/${data.id}`, data);
    return res.data;
  },
);

//
// ✅ DELETE
//
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: number) => {
    await axiosInstance.delete(`/categories/${id}`);
    return id;
  },
);

//
// 🧠 SLICE
//
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // CREATE
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })

      // UPDATE
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
