// src/api/userApi.js
import apiClient from "./apiClient";

const createOrder = (orderData) => {
  const url = "/v1/orders";
  return apiClient.post(url, orderData);
};

const getMyOrders = () => {
  const url = "v1/orders/my";
  return apiClient.get(url);
};

const userAPI = {
  createOrder,
  getMyOrders,
};

export default userAPI;
