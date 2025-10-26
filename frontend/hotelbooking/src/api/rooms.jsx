import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const API_URL = `${API_BASE_URL}/rooms`;

// Create room
export const createRoom = async (roomData) => {
  const response = await axios.post(API_URL, roomData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Get all rooms
export const getAllRooms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get room by ID
export const getRoomById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Get rooms by hotel ID
export const getRoomsByHotelId = async (hotelId) => {
  const response = await axios.get(`${API_URL}/hotel/${hotelId}`);
  return response.data;
};

// Update room (including image)
export const updateRoom = async (id, roomData) => {
  const response = await axios.put(`${API_URL}/${id}`, roomData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Delete room
export const deleteRoom = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
