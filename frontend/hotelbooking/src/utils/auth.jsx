import { getToken as tokenFunc, setToken as setTokenFunc, removeToken, getUserRole, getUserEmail } from "./constants";

// Check if user is authenticated
export const isAuthenticated = () => !!tokenFunc();

// Logout user
export const logout = () => {
  removeToken();
  window.location.href = "/login";
};

// Get current user role
export const getRole = () => getUserRole();

// Get current user email
export const getEmail = () => getUserEmail();

// Set token after login/signup
export const setToken = (token) => setTokenFunc(token);

// Get token
export const getToken = () => tokenFunc();

// Decode role from token
export const decodeRole = (token) => {
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
  return decoded ? decoded.role : null;
};
