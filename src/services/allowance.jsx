import { baseInstance } from "./api";

export const fetchHistory = async (sn, year, month, status) => {
  try {
    const response = await baseInstance.get(`/account/history?sn=${sn}&year=${year}&month=${month}&status=${status}`);
    console.log(222, response);
    if (response.data.success) {
      return response.data.response.accountHistorys;
    } else {
      throw new Error("Failed to fetch account history");
    }
  } catch (error) {
    throw error;
  }
};
