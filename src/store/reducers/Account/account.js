import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchMyAccount as reqFetchMyAccount,
  fetchInvestAccount as reqFetchInvestAccount,
} from "../../../services/account";

const initialState = {
  accountNum1: null,
  balance1: null, // 용돈
  accountNum2: null,
  balance2: null, // 투자
  accountType: 0,
};

export const fetchMyAccount = createAsyncThunk(
  "account/fetchMyAccount",
  async (data, thunkAPI) => {
    const response = await reqFetchMyAccount();
    console.log("response", response);
    return response;
  }
);

export const fetchInvestAccount = createAsyncThunk(
  "account/fetchInvestAccount",
  async (data, thunkAPI) => {
    const response = await reqFetchInvestAccount();
    console.log("gd", response);
    return response;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setAccountType(state, action) {
      state.accountType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAccount.fulfilled, (state, action) => {
        console.log(action.payload);
        state.accountNum1 = action.payload.response.accountNum;
        state.balance1 = action.payload.response.balance;
      })
      .addCase(fetchMyAccount.pending, (state) => {})
      .addCase(fetchMyAccount.rejected, (state) => {})
      .addCase(fetchInvestAccount.fulfilled, (state, action) => {
        console.log(action.payload);
        state.accountNum2 = action.payload.response.accountNum;
        state.balance2 = action.payload.response.balance;
      })
      .addCase(fetchInvestAccount.pending, (state) => {})
      .addCase(fetchInvestAccount.rejected, (state) => {});
  },
});

export const { setAccountType } = accountSlice.actions;

export default accountSlice.reducer;
