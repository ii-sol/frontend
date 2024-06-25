import { baseInstance } from "./api";

export const fetchHistory = async (year, month, status) => {
  try {
    const response = await baseInstance.get(
      `/account/history?year=${year}&month=${month}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
