import axiosClient from "./apiClient.js";

const userAPI = {
  getAllFlights: (flights) => {
    const url = "api/v1/flights";
    return axiosClient.get(url, flights);
  },
};

export default userAPI;
