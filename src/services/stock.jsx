import { baseInstance } from "./api";

export const fetchStocks = async (code, pathVariable) => {
  const baseUrl = `/stocks/${code}/${pathVariable}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
