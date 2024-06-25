import { baseInstance } from "./api";

export const fetchMyInfo = async () => {
  const baseUrl = `/users/child-manage`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
