import { baseInstance } from "./api";

export const fetchMyAccount = async () => {
  const baseUrl = `/account/1`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchInvestAccount = async () => {
  const baseUrl = `/account/2`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
