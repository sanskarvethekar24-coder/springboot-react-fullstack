import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const API_URL = `${API_BASE_URL}/hotels`;

// Create hotel
export const createHotel = async (hotelData) => {
  const response = await axios.post(API_URL, hotelData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Get all hotels
export const getAllHotels = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get hotel by ID
export const getHotelById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Get hotels by location
export const getHotelsByLocation = async (location) => {
  const res = await fetch(`http://localhost:8080/hotels/location/${location}`);
  if (!res.ok) throw new Error("hotel not found!");
  return res.json();
};


// Get hotels by name
export const getHotelsByName = async (name) => {
  const response = await fetch(`http://localhost:8080/hotels/name/${name}`);
  if (!response.ok) throw new Error("Failed to fetch hotels by name");
  return response.json();
};


// Update hotel (including image)
export const updateHotel = async (id, hotelData) => {
  const response = await axios.put(`${API_URL}/${id}`, hotelData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Delete hotel
export const deleteHotel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
