import { baseInstance } from "./api";

// // 포트번호 8081
// export const fetchHistory = async (accessToken, year, month, status) => {
//   try {
//     const response = await baseInstance.get(`/account/history?year=${year}&month=${month}&status=${status}`, {
//       headers: {
//         Authorization: accessToken,
//       },
//     });

//     if (response.data.success) {
//       return response.data.response.accountHistorys;
//     } else {
//       return response.data.error.message;
//     }
//   } catch (error) {
//     throw response.data.error;
//   }
// };

export const createAllowanceRequest = async (accessToken, psn, data) => {
  try {
    const response = await baseInstance.post(`/allowance/temporal/${psn}`, data, {
      headers: {
        Authorization: accessToken,
      },
    });

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
    const response = await baseInstance.delete(`/allowance/temporal/cancle/${id}`);

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
    const response = await baseInstance.get(`/allowance/temporal/history?year=${year}&month=${month}`);
    console.log("야야야야ㅑ야ㅑ야야야", response);
    if (response.data.success) {
      return response.data.response;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw response.data.error;
  }
};
