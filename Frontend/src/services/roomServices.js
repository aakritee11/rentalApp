import axios from "axios";

const API = "http://localhost:5000/api/rooms";

export const deleteRoom = async (roomId, token) => {
  const response = await axios.delete(`${API}/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};