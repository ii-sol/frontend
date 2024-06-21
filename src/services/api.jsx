import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookie";

export const BASE_URL = "http://127.0.0.1:8080";

export const baseInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const notiInstance = axios.create({
  baseURL: BASE_URL + "/notifications",
});

export const authInstance = axios.create({
  baseURL: BASE_URL + "/auth",
});

baseInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          removeCookie("accessToken");
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_HOST}/api/auth/token`,
          null,
          {
            params: {
              accountId: "1",
              token: refreshToken,
            },
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = refreshResponse.data.result.accessToken;
        setCookie("accessToken", newAccessToken, {
          path: "/",
        });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(error.config);
      } catch (err) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
