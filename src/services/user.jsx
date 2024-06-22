import { baseInstance } from "./api";
import { setCookie } from "./cookie";

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

export const checkPhoneNum = async (phoneNum) => {
  try {
    const response = await baseInstance.post("/auth/useful-phone", phoneNum);

    return response.data.response.success;
  } catch (error) {
    throw error;
  }
};

export const fetchUserInfo = async (sn, accessToken) => {
  try {
    const response = await baseInstance.get(`/users/${sn}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (accessToken, newData) => {
  try {
    const response = await baseInstance.put(`/users`, newData, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchPhoneNum = async (accessToken) => {
  try {
    const response = await baseInstance.get(`/users/phones`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const deleteParent = async (sn, accessToken) => {
  try {
    const response = await axios.delete(`/users/${sn}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.response;
  } catch (error) {
    throw error;
  }
};
