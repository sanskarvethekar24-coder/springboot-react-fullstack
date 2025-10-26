import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Create a new booking
export const createBooking = async (booking) => {
  try {
    const response = await axios.post(`${BASE_URL}/bookings`, booking, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Create booking error:", error.response?.data || error.message);
    throw error;
  }
};
