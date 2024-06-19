import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8080";

export const baseInstance = axios.create({
  baseURL: BASE_URL,
});

export const notiInstance = axios.create({
  baseURL: BASE_URL + "/notifications",
});
