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

export const deleteAllNoti = async (rsn) => {
  const baseUrl = `/all/${rsn}`;
  try {
    const response = await notiInstance.delete(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const deleteNoti = async (nsn) => {
  const baseUrl = `/${nsn}`;
  try {
    const response = await notiInstance.delete(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
  }
};
