import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../../../services/cookie";

const initialState = {
  isLoggedIn: false,
  userInfo: { sn: "null", familyInfo: [] },
  accessToken: null,
  refreshToken: null,
};

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
      state.userInfo.familyInfo = [...state.userInfo.familyInfo, action.payload];
    },
  },
});

export const { loginSuccess, logout, setFamilyInfo } = userSlice.actions;

export default userSlice.reducer;
