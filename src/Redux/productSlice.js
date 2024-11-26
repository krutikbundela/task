import { createSlice } from "@reduxjs/toolkit";
import createAsyncThunkHandler from "./utils/createAsyncThunkHandler";

export const fetchProducts = createAsyncThunkHandler("fetchProducts","products");
export const fetchProductdetails = createAsyncThunkHandler(
  "product/fetchProductdetails",
  (id) => `/products/${id}`
);
const initialState = {
  isLoading: false,
  products: [],
  isError: null,
  ProductDetails: {},
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload || [];
        state.isLoading = false;
        return state;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = action.payload;
      })
      // =========================================================
      .addCase(fetchProductdetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductdetails.fulfilled, (state, action) => {
        state.ProductDetails = action.payload || {};
        state.isLoading = false;

        return state;
      })
      .addCase(fetchProductdetails.rejected, (state, action) => {
        state.isError = action.payload;
      });
  },
});

export default productSlice.reducer;
