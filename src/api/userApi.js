// src/api/userApi.js
import apiClient from "./apiClient";

const createOrder = (orderData) => {
  const url = "/v1/orders";
  return apiClient.post(url, orderData);
};

const userAPI = {
  createOrder,
};

export default userAPI;
