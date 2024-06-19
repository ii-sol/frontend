import { baseInstance } from "./api";

export const join = async (userData) => {
  try {
    const response = await baseInstance.post("/auth/join", userData);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const login = async (phoneNum, accountInfo) => {
  try {
    const response = await baseInstance.post("/auth/login", {
      phoneNum,
      accountInfo,
    });
    const { userInfo, accessToken, refreshToken } = response.data.response;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return userInfo;
  } catch (error) {
    throw error;
  }
};

export const setAuthHeaders = (accessToken) => {
  baseInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

setAuthHeaders(localStorage.getItem("accessToken"));
