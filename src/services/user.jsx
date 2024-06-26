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
    console.log("dsss", response);
    const accessToken = response.headers.authorization;
    const refreshToken = response.headers.get("refresh-token");
    const userInfo = response.data.response;
    console.log(accessToken);
    setCookie("accessToken", accessToken, { path: "/" });
    setCookie("refreshToken", refreshToken, { path: "/" });
    console.log("dsss", response);
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

export const fetchUserInfo = async (sn) => {
  try {
    const response = await baseInstance.get(`/users/${sn}`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (newData) => {
  try {
    const response = await baseInstance.put(`/users`, newData);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchContacts = async () => {
  try {
    const response = await baseInstance.get(`/users/contacts`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const deleteParent = async (sn) => {
  try {
    const response = await baseInstance.delete(`/users/${sn}`);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const addMember = async (requestData) => {
  try {
    const response = await baseInstance.post("/users", requestData);
    return response.data.response;
  } catch (error) {
    throw response.data.error;
  }
};

export const fetchFamilyInfo = async () => {
  const baseUrl = `/users/my-family`;
  try {
    const response = await baseInstance.get(baseUrl);

    return response.data;
  } catch (error) {
    throw error;
  }
};
