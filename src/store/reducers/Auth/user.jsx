import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../../../services/cookie";
import { fetchFamilyInfo as reqFetchFamilyInfo } from "../../../services/user";

const initialState = {
  isLoggedIn: false,
  userInfo: { sn: "null", familyInfo: [] },
  accessToken: null,
  refreshToken: null,
};

export const fetchFamilyInfo = createAsyncThunk(
  "user/fetchFamilyInfo",
  async (data, thunkAPI) => {
    const response = await reqFetchFamilyInfo();
    console.log(response);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
      removeCookie("accessToken");
      removeCookie("refreshToken");
    },
    setFamilyInfo(state, action) {
      state.userInfo.familyInfo = [
        ...state.userInfo.familyInfo,
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyInfo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.userInfo.familyInfo = action.payload.response;
      })
      .addCase(fetchFamilyInfo.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFamilyInfo.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { loginSuccess, logout, setFamilyInfo } = userSlice.actions;

export default userSlice.reducer;
