// src/api/userApi.js
import apiClient from "./apiClient";

const createOrder = (orderData) => {
  const url = "/v1/orders";
  return apiClient.post(url, orderData);
};

// const getMyOrders = (page = 0, size = 10) => {
//   const url = `/v1/orders/my?page=${page}&size=${size}`;
//   return apiClient.get(url);
// };

const getMyOrders = (params) => {
  const url = "/v1/orders/my";
  return apiClient.get(url, { params });
};

const userAPI = {
  createOrder,
  getMyOrders,
};

export default userAPI;
