import { createSlice } from "@reduxjs/toolkit";
import createAsyncThunkHandler from "./utils/createAsyncThunkHandler";

export const fetchProducts = createAsyncThunkHandler("products");

const initialState = {
  isLoading: false,
  products: [],
  isError: null,
  ProductDetails: {},
//   currentPage: 1,
//   totalPages: 2,
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
        console.log(".addCase ~ action.payload:", action.payload);
        state.isLoading = false;

        return state;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = action.payload;
        console.log(".addCase ~ action.payload:", action.payload);
      })
      // =========================================================
     
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
