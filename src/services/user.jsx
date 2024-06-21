import { authInstance } from "./api";
import { setCookie } from "./cookie";

export const join = async (userData) => {
  try {
    const response = await authInstance.post("/join", userData);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const login = async (phoneNum, accountInfo) => {
  try {
    const response = await authInstance.post("/login", {
      phoneNum,
      accountInfo,
    });

    const accessToken = response.headers.authorization;
    const refreshToken = response.headers.get("refresh-token");
    const userInfo = response.data.response;

    setCookie("accessToken", accessToken, { path: "/" });
    setCookie("refreshToken", refreshToken, { path: "/" });

    return { userInfo, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

// export const setAuthHeaders = (accessToken) => {
//   authInstance.defaults.headers.common["Authorization"] = `${accessToken}`;
// };
