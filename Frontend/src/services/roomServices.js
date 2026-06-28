import axios from "axios";
import server from "../environment";


export const deleteRoom = async (roomId, token) => {
  const response = await axios.delete(`${server}/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};