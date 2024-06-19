import { notiInstance } from "./api";

export const fetchNoti = async (usn) => {
  const baseUrl = `/${usn}`;
  try {
    const response = await notiInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
