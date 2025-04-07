import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "../helpers/axiosIntercepter";
import axios from "axios";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (user, { rejectWithValue }) => {
    try {
      debugger;
      const response = await axios.post(
        `http://localhost:8000/user/signup`,
        user,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/login`,
        user,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
