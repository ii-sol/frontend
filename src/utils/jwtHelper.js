import { jwtDecode } from "jwt-decode";

export const getFamilyInfoFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.familyInfo || [];
  } catch (error) {
    console.error("Invalid token", error);
    return [];
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
