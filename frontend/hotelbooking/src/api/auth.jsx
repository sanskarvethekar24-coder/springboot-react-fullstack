import axios from "axios";
import { BASE_URL } from "../utils/constants";

// Signup / Register
export const signup = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, user);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Signin / Login
export const signin = async (loginRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, loginRequest);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
