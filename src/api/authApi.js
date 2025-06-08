// src/api/authApi.jsx
import apiClient from "./apiClient";

const authAPI = {
  register: (registerRequest) => {
    const url = "/v1/auth/register";
    return apiClient.post(url, registerRequest);
  },

  login: (username, password) => {
    const url = "/v1/auth/login";
    return apiClient.post(url, { username, password }).then((data) => {
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("isLogin", "true");
      }
      if (data.user) {
        localStorage.setItem("current_user", JSON.stringify(data.user));
      }
      return data.user;
    });
  },

  logout: () => {
    const url = "/v1/auth/logout";
    return apiClient.post(url).finally(() => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("current_user");
    });
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("current_user");
    return user ? JSON.parse(user) : null;
  },
};

export default authAPI;
