import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllowanceRequestHistory as reqFetchAllowanceRequestHistory } from "../../../services/allowance";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchAllowanceRequestHistory = createAsyncThunk("allowance/fetchAllowanceRequestHistory", async ({ year, month }, thunkAPI) => {
  try {
    const response = await reqFetchAllowanceRequestHistory(year, month);
    console.log("rd", response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const allowanceSlice = createSlice({
  name: "allowance",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllowanceRequestHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllowanceRequestHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllowanceRequestHistory.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export default allowanceSlice.reducer;
