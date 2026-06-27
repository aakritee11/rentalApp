import axios from "axios";

const API = import.meta.env.PROD 
  ? "https://rentalapp-backend.onrender.com"
  : "http://localhost:5000";

export const deleteRoom = async (roomId, token) => {
  const response = await axios.delete(`${API}/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};