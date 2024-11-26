import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "./baseURL";

const api = axios.create({
  baseURL: baseURL,
});

const createAsyncThunkHandler = (actionType, endpoint, method = "get") => {
  return createAsyncThunk(
    actionType,
    async (data, { rejectWithValue }) => {
      try {
        const url = typeof endpoint === "function" ? endpoint(data) : endpoint;
        const response = await api[method](url, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    }
  );
};

export default createAsyncThunkHandler;
