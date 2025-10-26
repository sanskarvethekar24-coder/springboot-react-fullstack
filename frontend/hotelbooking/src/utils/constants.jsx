// Backend base URL
export const BASE_URL = "http://localhost:8080";

// API base URL for hotels/rooms
export const API_BASE_URL = BASE_URL; // you can change if needed

// JWT helper functions
export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

export const getUserRole = () => {
  const decoded = decodeToken();
  return decoded ? decoded.role : null;
};

export const getUserEmail = () => {
  const decoded = decodeToken();
  return decoded ? decoded.sub : null;
};
