import { baseInstance } from "./api";

export const createAllowanceRequest = async (psn, data) => {
  try {
    const response = await baseInstance.post(
      `/allowance/temporal/${psn}`,
      data
    );

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchAllowanceRequest = async () => {
  try {
    const response = await baseInstance.get(`/allowance/temporal`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAllowanceRequest = async (id) => {
  try {
    const response = await baseInstance.post(
      `/allowance/temporal/cancle/${id}`
    );

    console.log(response);
    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchRegularAllowance = async () => {
  try {
    const response = await baseInstance.get(`/allowance/monthly`);

    if (response.data.success) {
      return response.data.response;
    } else {
      return response.data.error.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchAllowanceRequestHistory = async (year, month) => {
  try {
    const response = await baseInstance.get(
      `/allowance/temporal/history?year=${year}&month=${month}`
    );
    if (response.data.success) {
      return response.data.response;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw response.data.error;
  }
};

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
