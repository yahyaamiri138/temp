import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

interface Product {
  id: number;
  name: string;
  type: string;
  size: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

//
// ✅ GET ALL PRODUCTS
//
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
});

//
// ✅ DELETE PRODUCT
//
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await axiosInstance.delete(`/products/${id}`);
    return id;
  },
);

//
// ✅ UPDATE PRODUCT
//
export const updateProduct = createAsyncThunk(
  "products/update",
  async (data: {
    id: number;
    name: string;
    type: string;
    size: string;
    description: string;
    categoryId: number;
  }) => {
    const res = await axiosInstance.put(`/products/${data.id}`, data);
    return res.data;
  },
);

//
// ✅ CREATE PRODUCT
//
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: {
    name: string;
    type: string;
    size: string;
    description: string;
    categoryId: number;
  }) => {
    const res = await axiosInstance.post("/products", productData);
    return res.data;
  },
);

//
// 🧠 SLICE
//
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      // CREATE
      //   .addCase(createProduct.fulfilled, (state, action) => {
      //     state.products.push(action.payload);
      //   })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products];
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
