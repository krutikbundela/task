import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "./baseURL";

const api = axios.create({
  baseURL: baseURL,
});


const createAsyncThunkHandler = (endpoint, method = "get") => {
  return createAsyncThunk(
    `product/${endpoint}`,
    async (data, { rejectWithValue }) => {
      try {
        console.log("Request URL:", api.defaults.baseURL + endpoint);

        const response = await api[method](endpoint, data);
        console.log("response:", response);
        console.log("api[method](endpoint, data):", api[method](endpoint, data));
        console.log("response:", response);
        return response.data;
      } catch (error) {
          console.log("error:", error);
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    }
  );
};

export default createAsyncThunkHandler;
