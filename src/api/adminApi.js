// src/api/adminApi.js
import apiClient from "./apiClient";

// Lấy danh sách tất cả đơn hàng
const getOrders = () => {
  const url = "/v1/orders";
  return apiClient.get(url);
};

// Lấy danh sách nhân viên giao hàng
const getDeliveryStaff = () => {
  const url = "/v1/users/delivery-staff";
  return apiClient.get(url);
};

// Giao đơn cho nhân viên
const assignOrderToStaff = (orderCode, staffUsername) => {
  const url = `/v1/orders/by-code/${orderCode}/assign`;
  return apiClient.put(url, { staffUsername });
};

// Export theo object
const adminAPI = {
  getOrders,
  getDeliveryStaff,
  assignOrderToStaff,
};

export default adminAPI;
