import { baseInstance } from "./api";

export const fetchHistory = async (year, month, status) => {
  try {
    const response = await baseInstance.get(`/account/history?year=${year}&month=${month}&status=${status}`);

    if (response.data.success) {
      return response.data.response.accountHistorys;
    } else {
      throw new Error("Failed to fetch account history");
    }
  } catch (error) {
    throw error;
  }
};
