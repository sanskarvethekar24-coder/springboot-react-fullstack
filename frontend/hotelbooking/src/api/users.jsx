import axios from "axios";
import { BASE_URL, getToken } from "../utils/constants";

const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`, config());
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`, config());
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, user, config());
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`, config());
  return response.data;
};
