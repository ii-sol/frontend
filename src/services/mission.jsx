import { baseInstance } from "./api";

export const fetchMissionDetail = async (id) => {
  try {
    const response = await baseInstance.get(`/missions/${id}`);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchMissions = async (status) => {
  try {
    const response = await baseInstance.get(
      `/missions/filter?status=${status}`
    );

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchPendingMissions = async () => {
  try {
    const response = await baseInstance.get(`/missions/pending`);
    console.log(response);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchOngoingMissions = async () => {
  try {
    const response = await baseInstance.get(`/missions/ongoing`);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const fetchMissionHistory = async (year, month, status) => {
  try {
    let response;
    if (status === 0) {
      response = await baseInstance.get(
        `/missions/history?year=${year}&month=${month}`
      );
    } else if (status === 1) {
      response = await baseInstance.get(
        `/missions/history?year=${year}&month=${month}&status=4`
      );
    } else if (status === 2) {
      response = await baseInstance.get(
        `/missions/history?year=${year}&month=${month}&status=5`
      );
    }

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const createMissionRequest = async (data) => {
  try {
    const response = await baseInstance.post(`/missions`, data);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const acceptMissionRequest = async (data) => {
  try {
    const response = await baseInstance.put(`/missions`, data);

    return response.data.response;
  } catch (error) {
    throw error;
  }
};
